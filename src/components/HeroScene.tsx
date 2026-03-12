import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Environment, MeshDistortMaterial, MeshTransmissionMaterial } from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";

function GlassJar({ mousePos }: { mousePos: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null);
  const jarRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const targetRotY = mousePos.x * 0.3;
      const targetRotX = mousePos.y * 0.15;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.05;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.05;
    }
    if (jarRef.current) {
      jarRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1}>
      <group ref={groupRef} scale={1.8}>
        {/* Glass jar body */}
        <mesh ref={jarRef}>
          <cylinderGeometry args={[0.55, 0.65, 1.4, 64]} />
          <meshPhysicalMaterial
            color="#4a6741"
            roughness={0.05}
            metalness={0.1}
            transparent
            opacity={0.35}
            transmission={0.6}
            thickness={0.5}
            envMapIntensity={2}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </mesh>
        {/* Inner glow */}
        <mesh scale={[0.95, 0.95, 0.95]}>
          <cylinderGeometry args={[0.5, 0.6, 1.3, 64]} />
          <meshStandardMaterial
            color="#7CB342"
            transparent
            opacity={0.15}
            emissive="#4A7C59"
            emissiveIntensity={0.5}
          />
        </mesh>
        {/* Wooden lid */}
        <mesh position={[0, 0.85, 0]}>
          <cylinderGeometry args={[0.6, 0.6, 0.18, 64]} />
          <meshStandardMaterial color="#5C4033" roughness={0.7} metalness={0.05} />
        </mesh>
        <mesh position={[0, 0.95, 0]}>
          <cylinderGeometry args={[0.35, 0.35, 0.06, 32]} />
          <meshStandardMaterial color="#4A3728" roughness={0.8} />
        </mesh>
        {/* Powder inside */}
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.48, 0.55, 0.6, 64]} />
          <MeshDistortMaterial
            color="#D4A017"
            speed={1.5}
            distort={0.2}
            roughness={0.9}
            emissive="#D4A017"
            emissiveIntensity={0.15}
          />
        </mesh>
        {/* Label ring */}
        <mesh position={[0, 0.1, 0]}>
          <torusGeometry args={[0.58, 0.015, 16, 64]} />
          <meshStandardMaterial color="#D4A017" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </Float>
  );
}

function PowderParticles({ mousePos }: { mousePos: { x: number; y: number } }) {
  const count = 150;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const radius = 2 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      temp.push({
        position: [
          radius * Math.sin(phi) * Math.cos(theta),
          radius * Math.sin(phi) * Math.sin(theta) - 1,
          radius * Math.cos(phi),
        ],
        scale: Math.random() * 0.06 + 0.015,
        speed: Math.random() * 0.4 + 0.1,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime * p.speed + p.offset;
      dummy.position.set(
        p.position[0] + Math.sin(t) * 0.8 + mousePos.x * 0.5,
        p.position[1] + Math.cos(t * 0.7) * 1.2,
        p.position[2] + Math.cos(t * 0.5) * 0.4
      );
      dummy.scale.setScalar(p.scale * (1 + Math.sin(t * 2) * 0.3));
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#7CB342"
        transparent
        opacity={0.5}
        emissive="#4A7C59"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
}

function GoldenDust() {
  const count = 60;
  const mesh = useRef<THREE.InstancedMesh>(null);

  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      temp.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
        ],
        scale: Math.random() * 0.04 + 0.01,
        speed: Math.random() * 0.3 + 0.05,
        offset: Math.random() * Math.PI * 2,
      });
    }
    return temp;
  }, []);

  useFrame((state) => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    particles.forEach((p, i) => {
      const t = state.clock.elapsedTime * p.speed + p.offset;
      dummy.position.set(
        p.position[0] + Math.sin(t * 1.3) * 0.6,
        p.position[1] + Math.sin(t) * 1.5,
        p.position[2]
      );
      const flicker = 0.5 + Math.sin(t * 3) * 0.5;
      dummy.scale.setScalar(p.scale * flicker);
      dummy.updateMatrix();
      mesh.current!.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 6, 6]} />
      <meshStandardMaterial
        color="#D4A017"
        transparent
        opacity={0.7}
        emissive="#D4A017"
        emissiveIntensity={1}
      />
    </instancedMesh>
  );
}

function FloatingLeaf({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation: number; scale?: number }) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.4 + rotation) * 0.4;
      ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3 + rotation * 0.5) * 0.2;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.25 + rotation) * 0.6;
    }
  });

  const leafShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.35 * scale);
    shape.quadraticCurveTo(0.2 * scale, -0.1 * scale, 0.15 * scale, 0.15 * scale);
    shape.quadraticCurveTo(0.05 * scale, 0.35 * scale, 0, 0.4 * scale);
    shape.quadraticCurveTo(-0.05 * scale, 0.35 * scale, -0.15 * scale, 0.15 * scale);
    shape.quadraticCurveTo(-0.2 * scale, -0.1 * scale, 0, -0.35 * scale);
    return shape;
  }, [scale]);

  return (
    <Float speed={1} rotationIntensity={0.4} floatIntensity={1}>
      <mesh ref={ref} position={position} rotation={[0.3, rotation, 0]}>
        <shapeGeometry args={[leafShape]} />
        <meshStandardMaterial
          color="#3D6B35"
          side={THREE.DoubleSide}
          transparent
          opacity={0.75}
          emissive="#2D5A27"
          emissiveIntensity={0.1}
        />
      </mesh>
    </Float>
  );
}

function SceneLighting() {
  return (
    <>
      <ambientLight intensity={0.3} />
      <directionalLight position={[5, 8, 5]} intensity={1} color="#FFF8E7" castShadow />
      <pointLight position={[-4, 3, 4]} intensity={0.8} color="#D4A017" distance={15} />
      <pointLight position={[3, -2, 3]} intensity={0.4} color="#4A7C59" distance={12} />
      <pointLight position={[0, 5, -3]} intensity={0.3} color="#FFF8E7" distance={10} />
      <spotLight
        position={[0, 8, 0]}
        angle={0.4}
        penumbra={0.8}
        intensity={0.6}
        color="#D4A017"
        castShadow
      />
    </>
  );
}

function MouseTracker({ onMouseMove }: { onMouseMove: (pos: { x: number; y: number }) => void }) {
  const { viewport } = useThree();

  useFrame(({ pointer }) => {
    onMouseMove({ x: pointer.x, y: pointer.y });
  });

  return null;
}

export default function HeroScene() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  return (
    <div className="absolute inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0.5, 7], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={["#0f1a0a", 8, 20]} />
        <SceneLighting />
        <MouseTracker onMouseMove={setMousePos} />

        <GlassJar mousePos={mousePos} />
        <PowderParticles mousePos={mousePos} />
        <GoldenDust />

        <FloatingLeaf position={[-3, 2.5, 1]} rotation={0} scale={1.2} />
        <FloatingLeaf position={[3.5, 1.8, 2]} rotation={2} scale={0.9} />
        <FloatingLeaf position={[0.5, 3, 1.5]} rotation={4} scale={1} />
        <FloatingLeaf position={[-4, -0.5, 1]} rotation={1.5} scale={1.1} />
        <FloatingLeaf position={[4, -1, 0.5]} rotation={3} scale={0.8} />
        <FloatingLeaf position={[-1.5, -2, 2]} rotation={5} scale={0.7} />

        {/* Ambient environment light instead of HDR preset */}
        <hemisphereLight args={["#FFF8E7", "#2D5A27", 0.4]} />
      </Canvas>
    </div>
  );
}
