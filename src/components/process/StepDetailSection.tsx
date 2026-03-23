import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import { OrbitControls } from '@react-three/drei';
import { type ProcessStep } from '../../data/processSteps';
import { StepIcon3D } from './StepIcon3D';

interface StepDetailSectionProps {
  step: ProcessStep;
  isVisible: boolean;
}

export function StepDetailSection({ step, isVisible }: StepDetailSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Only mount the Canvas when near viewport — avoids wasting WebGL contexts
  const [canvasReady, setCanvasReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCanvasReady(true);
          obs.disconnect(); // only need to trigger once — stays mounted after
        }
      },
      { rootMargin: '200px' } // start loading 200px before entering viewport
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <motion.div
      id={`step-${step.id}`}
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0.3, y: 20 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="min-h-screen w-full flex items-center px-6 md:px-16 lg:px-24 py-24"
      style={{ background: 'linear-gradient(180deg, #0a0a0f 0%, #0d0d1a 100%)' }}
    >
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

        {/* Left: 3D visualization — only mounted when near viewport */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <div
            className="relative w-full aspect-square max-w-md mx-auto rounded-2xl overflow-hidden"
            style={{
              background: `radial-gradient(ellipse at 40% 40%, ${step.color}18 0%, rgba(10,10,20,0.95) 70%)`,
              border: `1px solid ${step.color}33`,
              boxShadow: `0 0 60px ${step.color}20, inset 0 0 40px rgba(0,0,0,0.5)`,
            }}
          >
            {canvasReady ? (
              <Canvas
                camera={{ position: [0, 0.8, 2.8], fov: 45 }}
                gl={{ antialias: true, alpha: true }}
              >
                <ambientLight intensity={0.4} />
                <pointLight position={[3, 3, 3]} color={step.color} intensity={6} />
                <pointLight position={[-2, -1, 2]} color={step.secondaryColor} intensity={4} />
                <group scale={2.2}>
                  <StepIcon3D
                    color={step.color}
                    secondaryColor={step.secondaryColor}
                    stepIndex={step.index}
                    active={true}
                  />
                </group>
                <OrbitControls
                  enableZoom={false}
                  enablePan={false}
                  autoRotate
                  autoRotateSpeed={2}
                />
              </Canvas>
            ) : (
              /* Placeholder while canvas hasn't loaded yet */
              <div className="w-full h-full flex items-center justify-center">
                <div
                  className="w-16 h-16 rounded-full animate-pulse"
                  style={{ background: `${step.color}30`, border: `2px solid ${step.color}50` }}
                />
              </div>
            )}

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8" style={{ borderTop: `2px solid ${step.color}80`, borderLeft: `2px solid ${step.color}80` }} />
            <div className="absolute bottom-4 right-4 w-8 h-8" style={{ borderBottom: `2px solid ${step.color}80`, borderRight: `2px solid ${step.color}80` }} />
          </div>

          {/* Background step number */}
          <div
            className="absolute -top-6 -left-6 text-8xl font-black select-none pointer-events-none"
            style={{ color: `${step.color}12`, lineHeight: 1 }}
          >
            {String(step.index + 1).padStart(2, '0')}
          </div>
        </motion.div>

        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-1 h-12 rounded-full"
              style={{ background: `linear-gradient(to bottom, ${step.color}, ${step.secondaryColor})` }}
            />
            <div>
              <p className="text-xs font-mono tracking-widest uppercase" style={{ color: step.color }}>
                Step {step.index + 1} of 8
              </p>
              <h2 className="text-3xl md:text-4xl font-bold text-white mt-0.5">{step.name}</h2>
            </div>
          </div>

          <p className="text-gray-300 text-lg leading-relaxed mb-8">{step.detail}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {step.facts.map((fact, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                className="flex items-start gap-3 px-4 py-3 rounded-xl"
                style={{ background: `${step.color}0d`, border: `1px solid ${step.color}25` }}
              >
                <span className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: step.color }} />
                <span className="text-gray-300 text-sm">{fact}</span>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 flex items-center gap-4">
            <div className="h-px flex-1" style={{ background: `linear-gradient(to right, ${step.color}40, transparent)` }} />
            <span className="text-xs text-gray-500 font-mono tracking-wider">SCROLL TO CONTINUE</span>
          </div>
        </motion.div>

      </div>
    </motion.div>
  );
}
