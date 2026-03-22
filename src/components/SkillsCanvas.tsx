import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

const SKILL_COLORS = [
  "#a855f7", "#06b6d4", "#ec4899", "#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6",
];

function SkillOrb({ position, color, size = 0.3 }: { position: [number, number, number]; color: string; size?: number }) {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.5;
      ref.current.rotation.y = state.clock.elapsedTime * 0.3;
      const s = size + Math.sin(state.clock.elapsedTime * 2 + position[0]) * 0.03;
      ref.current.scale.setScalar(s / size);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
      <mesh ref={ref} position={position}>
        <icosahedronGeometry args={[size, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          wireframe={true}
        />
      </mesh>
    </Float>
  );
}

export default function SkillsCanvas() {
  const orbPositions: Array<[number, number, number]> = [
    [-2.5, 1.5, 0], [0, 1.8, 0], [2.5, 1.5, 0],
    [-2, -0.5, 0.5], [2, -0.5, 0.5],
    [-1.2, -2, 0], [1.2, -2, 0], [0, 0, -1],
  ];

  return (
    <Canvas camera={{ position: [0, 0, 6], fov: 65 }} style={{ background: "transparent" }}>
      <ambientLight intensity={0.4} />
      <pointLight color="#a855f7" intensity={3} position={[4, 4, 4]} />
      <pointLight color="#06b6d4" intensity={3} position={[-4, -4, 4]} />
      {orbPositions.map((pos, i) => (
        <SkillOrb
          key={i}
          position={pos}
          color={SKILL_COLORS[i % SKILL_COLORS.length]}
          size={0.25 + (i % 3) * 0.1}
        />
      ))}
    </Canvas>
  );
}
