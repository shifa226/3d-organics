import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial } from "@react-three/drei";
import { useRef, useMemo } from "react";
import * as THREE from "three";

function HerbalJar({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
      <group position={position} scale={scale}>
        {/* Jar body */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.5, 0.6, 1.2, 32]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.1}
            transparent
            opacity={0.85}
          />
        </mesh>
        {/* Jar lid */}
        <mesh position={[0, 0.75, 0]}>
          <cylinderGeometry args={[0.55, 0.55, 0.2, 32]} />
          <meshStandardMaterial color="#5C4033" roughness={0.6} metalness={0.05} />
        </mesh>
        {/* Powder inside */}
        <mesh position={[0, 0.2, 0]}>
          <cylinderGeometry args={[0.45, 0.45, 0.4, 32]} />
          <MeshDistortMaterial color={color} speed={2} distort={0.15} roughness={0.8} />
        </mesh>
      </group>
    </Float>
  );
}

function Particles() {
  const count = 80;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 15,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        ],
        scale: Math.random() * 0.08 + 0.02,
        speed: Math.random() * 0.5 + 0.2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime * p.speed;
      dummy.position.set(
        p.position[0] + Math.sin(t) * 0.5,
        p.position[1] + Math.cos(t * 0.7) * 0.8,
        p.position[2]
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial color="#7CB342" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Leaf({ position, rotation }: { position: [number, number, number]; rotation: number }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5 + rotation) * 0.3;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 + rotation) * 0.5;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3}>
      <mesh ref={ref} position={position} rotation={[0.3, rotation, 0]}>
        <planeGeometry args={[0.4, 0.7]} />
        <meshStandardMaterial color="#4A7C59" side={THREE.DoubleSide} transparent opacity={0.7} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }} dpr={[1, 2]}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={0.8} />
        <pointLight position={[-3, 2, 4]} intensity={0.5} color="#D4A017" />

        <HerbalJar position={[-3, 0.5, 0]} color="#D4A017" scale={0.9} />
        <HerbalJar position={[0, -0.5, -1]} color="#4A7C59" scale={1.1} />
        <HerbalJar position={[3, 0.3, 0]} color="#8B6914" scale={0.85} />

        <Leaf position={[-2, 2, 1]} rotation={0} />
        <Leaf position={[2, 1.5, 2]} rotation={2} />
        <Leaf position={[0, 2.5, 1.5]} rotation={4} />
        <Leaf position={[-3.5, -1, 1]} rotation={1.5} />
        <Leaf position={[3.5, -1.5, 0.5]} rotation={3} />

        <Particles />
        <Environment preset="forest" />
      </Canvas>
    </div>
  );
}
