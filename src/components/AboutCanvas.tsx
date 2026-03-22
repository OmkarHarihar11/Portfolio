import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

function HolographicPanel() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.3;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <group>
        {/* Main panel */}
        <mesh ref={ref}>
          <boxGeometry args={[2.5, 3.5, 0.08]} />
          <meshStandardMaterial
            color="#06b6d4"
            emissive="#06b6d4"
            emissiveIntensity={0.3}
            transparent
            opacity={0.15}
            roughness={0.1}
            metalness={1}
          />
        </mesh>
        {/* Frame edges */}
        <lineSegments>
          <edgesGeometry args={[new THREE.BoxGeometry(2.5, 3.5, 0.08)]} />
          <lineBasicMaterial color="#06b6d4" />
        </lineSegments>
        {/* Floating orbits */}
        <mesh position={[0, 1.2, 0.2]}>
          <torusGeometry args={[0.5, 0.02, 8, 40]} />
          <meshStandardMaterial color="#a855f7" emissive="#a855f7" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0, 0.2]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.7, 0.02, 8, 40]} />
          <meshStandardMaterial color="#ec4899" emissive="#ec4899" emissiveIntensity={1} />
        </mesh>
        <mesh position={[0, 0, 0.2]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial color="#ffffff" emissive="#06b6d4" emissiveIntensity={2} />
        </mesh>
      </group>
      <ambientLight intensity={0.3} />
      <pointLight color="#06b6d4" intensity={3} position={[2, 2, 2]} />
      <pointLight color="#a855f7" intensity={2} position={[-2, -2, 2]} />
    </Float>
  );
}

export default function AboutCanvas() {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 55 }} style={{ background: "transparent" }}>
      <HolographicPanel />
    </Canvas>
  );
}
