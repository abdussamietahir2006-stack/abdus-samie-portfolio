import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Float } from "@react-three/drei";
import { ProjectCard3D } from "./ProjectCard3D.tsx";
import { Project } from "../../types.ts";

interface ProjectsSceneProps {
  projects: Project[];
  onProjectClick: (project: Project) => void;
}

export const ProjectsScene = ({ projects, onProjectClick }: ProjectsSceneProps) => {
  return (
    <div className="w-full h-[600px] relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl">
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        
        {/* Project Cards in a Carousel */}
        <group>
          {Array.isArray(projects) && projects.map((project, index) => {
            const angle = (index / projects.length) * Math.PI * 2;
            const radius = 6;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            
            return (
              <ProjectCard3D
                key={project._id}
                position={[x, 0, z]}
                title={project.title}
                image={project.image}
                onClick={() => onProjectClick(project)}
              />
            );
          })}
        </group>
        
        <OrbitControls enableZoom={true} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
      
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/50 text-sm font-mono pointer-events-none">
        DRAG TO ROTATE · SCROLL TO ZOOM · CLICK TO VIEW
      </div>
    </div>
  );
};
