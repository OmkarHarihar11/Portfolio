import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function StarField({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref = useRef<THREE.Points>(null!);

  const positions = useMemo(() => {
    const count = 3000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.x = state.clock.elapsedTime * 0.05 + mouseY * 0.0003;
      ref.current.rotation.y = state.clock.elapsedTime * 0.03 + mouseX * 0.0003;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#a855f7"
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.8}
      />
    </Points>
  );
}

function RotatingTorus({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
  const ref = useRef<THREE.Mesh>(null!);
  const innerRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x = t * 0.3 + mouseY * 0.001;
      ref.current.rotation.y = t * 0.5 + mouseX * 0.001;
      const scale = 1 + Math.sin(t * 0.8) * 0.05;
      ref.current.scale.setScalar(scale);
    }
    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.5;
      innerRef.current.rotation.z = t * 0.3;
    }
  });

  return (
    <group>
      {/* Outer Torus */}
      <mesh ref={ref}>
        <torusGeometry args={[1.5, 0.3, 32, 100]} />
        <meshStandardMaterial
          color="#a855f7"
          emissive="#a855f7"
          emissiveIntensity={0.5}
          wireframe={false}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Inner rotating ring */}
      <mesh ref={innerRef}>
        <torusGeometry args={[1.0, 0.08, 16, 60]} />
        <meshStandardMaterial
          color="#06b6d4"
          emissive="#06b6d4"
          emissiveIntensity={0.8}
          wireframe={false}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>
      {/* Center sphere */}
      <mesh>
        <sphereGeometry args={[0.4, 32, 32]} />
        <meshStandardMaterial
          color="#ec4899"
          emissive="#ec4899"
          emissiveIntensity={0.6}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>
      {/* Ambient lights */}
      <ambientLight intensity={0.2} />
      <pointLight color="#a855f7" intensity={2} position={[3, 3, 3]} />
      <pointLight color="#06b6d4" intensity={2} position={[-3, -3, 3]} />
      <pointLight color="#ec4899" intensity={1.5} position={[0, 3, -3]} />
    </group>
  );
}

interface HeroCanvasProps {
  mouseX: number;
  mouseY: number;
}

export default function HeroCanvas({ mouseX, mouseY }: HeroCanvasProps) {
  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 60 }} style={{ background: "transparent" }}>
      <StarField mouseX={mouseX} mouseY={mouseY} />
      <RotatingTorus mouseX={mouseX} mouseY={mouseY} />
    </Canvas>
  );
}
