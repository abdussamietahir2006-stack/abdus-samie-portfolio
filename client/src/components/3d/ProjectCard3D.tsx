import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Text, Image, Float } from "@react-three/drei";
import * as THREE from "three";

interface ProjectCard3DProps {
  position: [number, number, number];
  title: string;
  image: string;
  onClick: () => void;
}

export const ProjectCard3D = ({ position, title, image, onClick }: ProjectCard3DProps) => {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <group
        position={position}
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        {/* Card Background */}
        <mesh scale={hovered ? 1.05 : 1}>
          <planeGeometry args={[3, 2]} />
          <meshStandardMaterial color={hovered ? "#4f46e5" : "#1e1b4b"} transparent opacity={0.8} />
        </mesh>

        {/* Project Image */}
        <Image
          url={image}
          position={[0, 0.2, 0.01]}
          scale={[2.8, 1.5]}
          transparent
          opacity={hovered ? 1 : 0.8}
        />

        {/* Project Title */}
        <Text
          position={[0, -0.7, 0.02]}
          fontSize={0.2}
          color="white"
          anchorX="center"
          anchorY="middle"
          maxWidth={2.8}
        >
          {title}
        </Text>

        {/* Border */}
        <mesh position={[0, 0, -0.01]}>
          <planeGeometry args={[3.1, 2.1]} />
          <meshBasicMaterial color="#4f46e5" transparent opacity={hovered ? 1 : 0.3} />
        </mesh>
      </group>
    </Float>
  );
};
