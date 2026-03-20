import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Text, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import { ORB_SKILLS } from "../../utils/constants.ts";

const SkillText = ({ position, text }: { position: [number, number, number], text: string }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Text
        position={position}
        fontSize={0.3}
        color={hovered ? "#4f46e5" : "white"}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.5 : 1}
      >
        {text}
      </Text>
    </Float>
  );
};

const SkillsGroup = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
  });

  return (
    <group ref={groupRef}>
      {ORB_SKILLS.map((skill, index) => {
        const phi = Math.acos(-1 + (2 * index) / ORB_SKILLS.length);
        const theta = Math.sqrt(ORB_SKILLS.length * Math.PI) * phi;
        const radius = 4;
        
        const x = radius * Math.cos(theta) * Math.sin(phi);
        const y = radius * Math.sin(theta) * Math.sin(phi);
        const z = radius * Math.cos(phi);
        
        return <SkillText key={skill} position={[x, y, z]} text={skill} />;
      })}
    </group>
  );
};

export const SkillsOrb = () => {
  return (
    <div className="w-full h-[500px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        <SkillsGroup />
        
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono pointer-events-none">
        DRAG TO EXPLORE · SCROLL TO ZOOM
      </div>
    </div>
  );
};
