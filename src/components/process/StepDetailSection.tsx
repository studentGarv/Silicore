import { useRef } from 'react';
import { motion } from 'framer-motion';
import { type ProcessStep } from '../../data/processSteps';

interface StepDetailSectionProps {
  step: ProcessStep;
  isVisible: boolean;
}

export function StepDetailSection({ step, isVisible }: StepDetailSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

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

        {/* Left: Step image */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={isVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="relative"
        >
          <div
            className="relative w-full max-w-md mx-auto rounded-2xl overflow-hidden group"
            style={{
              aspectRatio: '4/3',
              background: `radial-gradient(ellipse at center, ${step.color}12 0%, #080810 70%)`,
              border: `1px solid ${step.color}55`,
              boxShadow: `0 0 60px ${step.color}30, inset 0 0 40px rgba(0,0,0,0.5)`,
            }}
          >
            {/* Step image */}
            <img
              src={`${import.meta.env.BASE_URL}${step.index + 1}.png`}
              alt={step.name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
              style={{ display: 'block', padding: '8px' }}
            />

            {/* Colour-tinted overlay for visual consistency */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(135deg, ${step.color}15 0%, transparent 50%, ${step.secondaryColor}10 100%)`,
              }}
            />

            {/* Corner decorations */}
            <div className="absolute top-4 left-4 w-8 h-8" style={{ borderTop: `2px solid ${step.color}80`, borderLeft: `2px solid ${step.color}80` }} />
            <div className="absolute bottom-4 right-4 w-8 h-8" style={{ borderBottom: `2px solid ${step.color}80`, borderRight: `2px solid ${step.color}80` }} />

            {/* Bottom label bar */}
            <div
              className="absolute bottom-0 left-0 right-0 px-5 py-3 flex items-center gap-2"
              style={{
                background: `linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 100%)`,
              }}
            >
              <span className="text-xs font-mono tracking-widest uppercase" style={{ color: step.color }}>
                Step {step.index + 1}
              </span>
              <span className="text-xs text-gray-400">— {step.shortName}</span>
            </div>
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
