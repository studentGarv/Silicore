import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface StepIconProps {
  color: string;
  secondaryColor: string;
  stepIndex: number;
  active: boolean;
}

/**
 * Mini 3D icon for each process step in the pipeline strip.
 * Each step index renders a slightly different shape.
 */
export function StepIcon3D({ color, secondaryColor, stepIndex, active }: StepIconProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.6 + stepIndex * 0.8;
    meshRef.current.rotation.x = Math.sin(t * 0.4 + stepIndex) * 0.2;
    if (active) {
      meshRef.current.position.y = Math.sin(t * 2) * 0.06;
    }
  });

  const shapes: ('box' | 'octahedron' | 'cylinder' | 'cone' | 'torus' | 'sphere' | 'dodecahedron' | 'icosahedron')[] = [
    'cylinder',      // Wafer
    'sphere',        // Oxidation
    'box',           // Photolithography
    'cone',          // Etching
    'dodecahedron',  // Deposition
    'torus',         // Metal Wiring
    'octahedron',    // Die Sorting
    'icosahedron',   // Packaging
  ];

  const shape = shapes[stepIndex % shapes.length];

  const emissiveIntensity = active ? 1.5 : 0.5;

  return (
    <group>
      {/* Main shape */}
      <mesh ref={meshRef} scale={active ? 1.15 : 1}>
        {shape === 'box' && <boxGeometry args={[0.5, 0.5, 0.5]} />}
        {shape === 'sphere' && <sphereGeometry args={[0.3, 16, 16]} />}
        {shape === 'cylinder' && <cylinderGeometry args={[0.28, 0.28, 0.12, 32]} />}
        {shape === 'cone' && <coneGeometry args={[0.28, 0.55, 6]} />}
        {shape === 'torus' && <torusGeometry args={[0.24, 0.1, 12, 32]} />}
        {shape === 'octahedron' && <octahedronGeometry args={[0.34]} />}
        {shape === 'dodecahedron' && <dodecahedronGeometry args={[0.3]} />}
        {shape === 'icosahedron' && <icosahedronGeometry args={[0.3]} />}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={emissiveIntensity}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Glow ring when active */}
      {active && (
        <mesh ref={glowRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.45, 0.02, 8, 32]} />
          <meshStandardMaterial
            color={secondaryColor}
            emissive={secondaryColor}
            emissiveIntensity={3}
            transparent
            opacity={0.8}
          />
        </mesh>
      )}

      {/* Point light for glow */}
      <pointLight color={color} intensity={active ? 1.5 : 0.4} distance={1.5} />
    </group>
  );
}
