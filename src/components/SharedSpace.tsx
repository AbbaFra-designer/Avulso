import { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';
import type { AvatarData } from '../types';
import { mockAvatars } from '../utils/mockAvatars';

interface SharedSpaceProps {
  userAvatar: AvatarData;
}

interface AvatarMeshProps {
  avatar: AvatarData;
  isUser?: boolean;
}

function AvatarMesh({ avatar, isUser = false }: AvatarMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const t = clock.getElapsedTime();
      const freq = 1 / avatar.pulseSpeed;
      meshRef.current.position.y = avatar.position[1] + Math.sin(t * freq) * 0.15;
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1.0);
    }
  });

  const geometry = useMemo(() => {
    if (avatar.shapeType === 'round') return new THREE.SphereGeometry(0.4, 32, 32);
    if (avatar.shapeType === 'angular') return new THREE.OctahedronGeometry(0.4);
    return new THREE.BoxGeometry(0.5, 0.5, 0.5);
  }, [avatar.shapeType]);

  const color = new THREE.Color(avatar.color);

  return (
    <mesh
      ref={meshRef}
      position={[avatar.position[0], avatar.position[1], avatar.position[2]]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <primitive object={geometry} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={isUser ? 0.6 : 0.3}
        roughness={0.3}
        metalness={0.1}
      />
      {hovered && (
        <Html distanceFactor={8} center>
          <div
            style={{
              background: 'rgba(10,10,15,0.92)',
              border: '1px solid rgba(201,169,110,0.4)',
              borderRadius: '8px',
              padding: '12px 16px',
              maxWidth: '220px',
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '14px',
              color: '#f0ede8',
              fontStyle: 'italic',
              lineHeight: 1.6,
              pointerEvents: 'none',
              whiteSpace: 'normal',
            }}
          >
            {avatar.poeticReading}
          </div>
        </Html>
      )}
    </mesh>
  );
}

function ConnectionLines({ avatars }: { avatars: AvatarData[] }) {
  const lines = useMemo(() => {
    const result: Array<{ points: THREE.Vector3[] }> = [];
    for (let i = 0; i < avatars.length; i++) {
      for (let j = i + 1; j < avatars.length; j++) {
        const a = avatars[i];
        const b = avatars[j];
        const topA = [...a.emotionAnswers].sort((x, y) => x.rank - y.rank)[0]?.emotion;
        const topB = [...b.emotionAnswers].sort((x, y) => x.rank - y.rank)[0]?.emotion;
        if (topA && topB && topA === topB) {
          result.push({
            points: [
              new THREE.Vector3(...a.position),
              new THREE.Vector3(...b.position),
            ]
          });
        }
      }
    }
    return result;
  }, [avatars]);

  return (
    <>
      {lines.map((line) => {
        const geom = new THREE.BufferGeometry().setFromPoints(line.points);
        const mat = new THREE.LineBasicMaterial({ color: 'white', transparent: true, opacity: 0.15 });
        const lineObj = new THREE.Line(geom, mat);
        return (
          <primitive key={Math.random()} object={lineObj} />
        );
      })}
    </>
  );
}

function Scene({ userAvatar }: { userAvatar: AvatarData }) {
  const allAvatars = useMemo(() => [...mockAvatars, userAvatar], [userAvatar]);

  return (
    <>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} />
      <fog attach="fog" args={['#0a0a0f', 10, 30]} />

      <OrbitControls
        enablePan={false}
        enableZoom={true}
        enableRotate={true}
        minDistance={3}
        maxDistance={25}
      />

      {allAvatars.map((av) => (
        <AvatarMesh
          key={av.id}
          avatar={av}
          isUser={av.id === userAvatar.id}
        />
      ))}

      <ConnectionLines avatars={allAvatars} />
    </>
  );
}

export default function SharedSpace({ userAvatar }: SharedSpaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{ position: 'fixed', inset: 0, background: '#0a0a0f' }}
    >
      <Canvas
        camera={{ position: [0, 2, 12], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
      >
        <Scene userAvatar={userAvatar} />
      </Canvas>

      {/* Watermark */}
      <div
        className="font-cormorant"
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '24px',
          fontSize: '14px',
          color: 'rgba(240,237,232,0.3)',
          pointerEvents: 'none',
          fontFamily: 'Cormorant Garamond, serif',
          letterSpacing: '0.05em',
        }}
      >
        Doppia Libertà
      </div>
    </motion.div>
  );
}
