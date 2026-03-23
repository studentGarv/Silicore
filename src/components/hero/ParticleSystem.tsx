import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUIStore } from '../../stores/uiStore';

const PARTICLE_COUNT = 300;

export function ParticleSystem() {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const reducedMotion = useUIStore((s) => s.reducedMotion);

  const { positions, phases } = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    const phases: number[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 1.8 + Math.random() * 2.4;
      positions.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta),
          r * Math.cos(phi)
        )
      );
      phases.push(Math.random() * Math.PI * 2);
    }
    return { positions, phases };
  }, []);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame(({ clock }) => {
    if (!meshRef.current || reducedMotion) return;
    const t = clock.getElapsedTime();
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const p = positions[i];
      const phase = phases[i];
      dummy.position.set(
        p.x + Math.sin(t * 0.4 + phase) * 0.15,
        p.y + Math.cos(t * 0.3 + phase) * 0.15,
        p.z + Math.sin(t * 0.5 + phase) * 0.1
      );
      dummy.scale.setScalar(0.015 + Math.sin(t + phase) * 0.005);
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    }
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#00f0ff" transparent opacity={0.6} />
    </instancedMesh>
  );
}
