import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useUIStore } from '../../stores/uiStore';
import * as THREE from 'three';

interface WaferModelProps {
  scrollProgress?: number;
}

// Rainbow die colors matching the reference image
const DIE_COLORS = [
  '#ff3366', '#ff6633', '#ffaa00', '#ffdd00',
  '#66ff33', '#00ffaa', '#00ccff', '#aa33ff',
  '#ff33cc', '#33aaff', '#ff8800', '#00ff88',
];

function getDieColor(row: number, col: number): string {
  return DIE_COLORS[(row * 7 + col * 3) % DIE_COLORS.length];
}

export function WaferModel3D({ scrollProgress = 0 }: WaferModelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const waferRef = useRef<THREE.Group>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const reducedMotion = useUIStore((s) => s.reducedMotion);

  // Build die grid: only show dies within circular wafer boundary
  const dies = useMemo(() => {
    const result: { row: number; col: number; x: number; z: number; color: string }[] = [];
    const cols = 9, rows = 9;
    const size = 0.22, gap = 0.02;
    const step = size + gap;
    const offsetX = -(cols * step) / 2 + step / 2;
    const offsetZ = -(rows * step) / 2 + step / 2;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const x = offsetX + c * step;
        const z = offsetZ + r * step;
        // Circle clip (wafer radius = 1.15)
        if (Math.sqrt(x * x + z * z) < 1.05) {
          result.push({ row: r, col: c, x, z, color: getDieColor(r, c) });
        }
      }
    }
    return result;
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();

    if (!reducedMotion) {
      const speed = Math.max(0.12, 0.5 - scrollProgress * 0.4);
      if (waferRef.current) waferRef.current.rotation.y += speed * 0.008;

      // Orbital rings rotate in opposite directions
      if (ring1Ref.current) ring1Ref.current.rotation.z += 0.003;
      if (ring2Ref.current) ring2Ref.current.rotation.z -= 0.005;

      // Subtle tilt
      groupRef.current.rotation.x = -0.35 + Math.sin(t * 0.25) * 0.04;
    }

    // Fade on scroll
    const opacity = Math.max(0, 1 - scrollProgress * 2);
    groupRef.current.traverse((obj) => {
      if (obj instanceof THREE.Mesh) {
        const mat = obj.material as THREE.MeshStandardMaterial;
        if (mat.transparent) mat.opacity = opacity;
      }
    });
  });

  return (
    <group ref={groupRef} rotation={[-0.35, 0.3, 0]}>
      {/* Wafer body group */}
      <group ref={waferRef}>
        {/* Base silicon disc */}
        <mesh>
          <cylinderGeometry args={[1.18, 1.18, 0.06, 80]} />
          <meshStandardMaterial
            color="#0a0a18"
            metalness={1}
            roughness={0.1}
            transparent
          />
        </mesh>

        {/* Colorful die grid on top */}
        {dies.map(({ row, col, x, z, color }) => (
          <mesh key={`die-${row}-${col}`} position={[x, 0.034, z]}>
            <boxGeometry args={[0.20, 0.008, 0.20]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.7}
              transparent
              roughness={0.2}
              metalness={0.8}
            />
          </mesh>
        ))}

        {/* Grid lines between dies */}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`gl-h-${i}`} position={[-1.08 + i * 0.248, 0.038, 0]}>
            <boxGeometry args={[0.006, 0.002, 2.16]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.4} />
          </mesh>
        ))}
        {Array.from({ length: 10 }).map((_, i) => (
          <mesh key={`gl-v-${i}`} position={[0, 0.038, -1.08 + i * 0.248]}>
            <boxGeometry args={[2.16, 0.002, 0.006]} />
            <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.4} />
          </mesh>
        ))}

        {/* Cyan top rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0.03, 0]}>
          <torusGeometry args={[1.18, 0.018, 16, 128]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={3} transparent />
        </mesh>
        {/* Purple bottom rim */}
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.03, 0]}>
          <torusGeometry args={[1.18, 0.014, 16, 128]} />
          <meshStandardMaterial color="#b000ff" emissive="#b000ff" emissiveIntensity={3} transparent />
        </mesh>
      </group>

      {/* Orbital ring 1 — cyan, tilted */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2 + 0.3, 0.5, 0.2]}>
        <torusGeometry args={[1.55, 0.012, 12, 120]} />
        <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2} transparent />
      </mesh>

      {/* Orbital ring 2 — purple, tilted other way */}
      <mesh ref={ring2Ref} rotation={[Math.PI / 2 - 0.5, -0.3, 0.6]}>
        <torusGeometry args={[1.72, 0.008, 12, 120]} />
        <meshStandardMaterial color="#b000ff" emissive="#b000ff" emissiveIntensity={2} transparent />
      </mesh>

      {/* Glow halo under wafer */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, -0.1, 0]}>
        <ringGeometry args={[1.0, 1.6, 64]} />
        <meshBasicMaterial
          color="#00f0ff"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}
