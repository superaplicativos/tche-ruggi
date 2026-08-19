'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';

function CrystalMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const wireRef = useRef<THREE.LineSegments>(null);

  const crystalGeometry = useMemo(() => {
    const geo = new THREE.OctahedronGeometry(2, 1);
    const positions = geo.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const y = positions.getY(i);
      // Stretch vertically to look more pyramidal
      positions.setY(i, y * 1.5);
      const x = positions.getX(i);
      const z = positions.getZ(i);
      // Slight random displacement for organic feel
      positions.setX(i, x * (1 + (Math.random() - 0.5) * 0.05));
      positions.setZ(i, z * (1 + (Math.random() - 0.5) * 0.05));
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  const edges = useMemo(
    () => new THREE.EdgesGeometry(crystalGeometry, 15),
    [crystalGeometry],
  );

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (meshRef.current) {
      meshRef.current.rotation.y = t * 0.15;
      meshRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
    if (wireRef.current) {
      wireRef.current.rotation.y = t * 0.15;
      wireRef.current.rotation.x = Math.sin(t * 0.1) * 0.1;
      wireRef.current.position.y = Math.sin(t * 0.5) * 0.15;
    }
  });

  return (
    <group>
      {/* Main crystal body */}
      <mesh ref={meshRef} geometry={crystalGeometry}>
        <meshStandardMaterial
          color="#b87333"
          metalness={0.9}
          roughness={0.15}
          envMapIntensity={1.5}
          transparent
          opacity={0.85}
        />
      </mesh>

      {/* Wireframe edges */}
      <lineSegments ref={wireRef} geometry={edges}>
        <lineBasicMaterial color="#c9a96e" linewidth={1} transparent opacity={0.6} />
      </lineSegments>

      {/* Inner glowing core */}
      <mesh>
        <octahedronGeometry args={[0.8, 0]} />
        <meshStandardMaterial
          color="#c9a96e"
          emissive="#c9a96e"
          emissiveIntensity={0.3}
          metalness={1}
          roughness={0}
          transparent
          opacity={0.4}
        />
      </mesh>

      {/* Outer ring / orbiting element */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.02, 16, 64]} />
        <meshStandardMaterial color="#c9a96e" metalness={0.8} roughness={0.2} />
      </mesh>
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]}>
        <torusGeometry args={[3.2, 0.015, 16, 64]} />
        <meshStandardMaterial color="#b87333" metalness={0.8} roughness={0.2} />
      </mesh>
    </group>
  );
}

function FloatingParticles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
    }
  });

  return (
    <points ref={particlesRef} geometry={geometry}>
      <pointsMaterial
        color="#c9a96e"
        size={0.03}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

export default function Hero3D() {
  return (
    <section
      id="hero"
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Background gradient layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(184,115,51,0.08)_0%,transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(201,169,110,0.05)_0%,transparent_50%)]" />

      {/* Three.js Canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 0, 7], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.2} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} color="#c9a96e" />
          <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#b87333" />
          <pointLight position={[0, -3, 0]} intensity={0.3} color="#dfc08a" />
          <CrystalMesh />
          <FloatingParticles />
          <Environment preset="studio" environmentIntensity={0.4} />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            autoRotate
            autoRotateSpeed={0.3}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={(3 * Math.PI) / 4}
          />
        </Canvas>
      </div>

      {/* Text overlay */}
      <div className="relative z-10 text-center pointer-events-none select-none px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="text-gold/60 text-xs sm:text-sm uppercase tracking-[0.4em] mb-4"
        >
          Arte Contemporânea
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-gold-shimmer text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none"
        >
          TCHÉ
        </motion.h1>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9 }}
          className="text-gold-shimmer text-6xl sm:text-8xl md:text-9xl font-bold tracking-tight leading-none"
        >
          RUGGI
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-6 text-muted-foreground text-sm sm:text-base tracking-[0.2em] uppercase"
        >
          Geologiometria
        </motion.p>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-gold/40 text-[10px] uppercase tracking-[0.3em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-5 h-5 text-gold/50" />
        </motion.div>
      </motion.div>
    </section>
  );
}
