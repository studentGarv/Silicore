import { useState } from 'react';
import { PROCESS_STEPS, type ProcessStep } from '../../data/processSteps';

interface ProcessPipelineStripProps {
  activeStep: number;
  onStepClick: (index: number) => void;
}

// CSS-only animated icon shapes — no WebGL needed here
function CSSStepIcon({ step, active, hovered }: { step: ProcessStep; active: boolean; hovered: boolean }) {
  const lit = active || hovered;

  const shapes = [
    // Wafer — flat disc
    <div key="wafer" style={{
      width: 28, height: 8, borderRadius: 4,
      background: lit ? step.color : '#444',
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Oxidation — circle
    <div key="ox" style={{
      width: 26, height: 26, borderRadius: '50%',
      background: lit ? step.color : '#444',
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Photolithography — square
    <div key="photo" style={{
      width: 24, height: 24, borderRadius: 4,
      background: lit ? step.color : '#444',
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Etching — triangle (using clip-path)
    <div key="etch" style={{
      width: 28, height: 28,
      background: lit ? step.color : '#444',
      clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      filter: lit ? `drop-shadow(0 0 6px ${step.color})` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Deposition — pentagon
    <div key="dep" style={{
      width: 26, height: 26,
      background: lit ? step.color : '#444',
      clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)',
      filter: lit ? `drop-shadow(0 0 6px ${step.color})` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Metal Wiring — ring / donut
    <div key="metal" style={{
      width: 28, height: 28, borderRadius: '50%',
      border: `5px solid ${lit ? step.color : '#444'}`,
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Die Sorting — diamond
    <div key="die" style={{
      width: 22, height: 22,
      background: lit ? step.color : '#444',
      clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
      filter: lit ? `drop-shadow(0 0 6px ${step.color})` : 'none',
      transition: 'all 0.3s',
    }} />,
    // Packaging — rounded square
    <div key="pack" style={{
      width: 24, height: 24, borderRadius: 8,
      background: lit ? step.color : '#444',
      boxShadow: lit ? `0 0 12px ${step.color}` : 'none',
      transition: 'all 0.3s',
    }} />,
  ];

  return (
    <div
      className="flex items-center justify-center"
      style={{
        width: 40, height: 40,
        animation: lit ? 'float 2s ease-in-out infinite' : 'none',
      }}
    >
      {shapes[step.index]}
    </div>
  );
}

function ConnectorLine({ active }: { active: boolean }) {
  return (
    <div className="flex-1 flex items-center px-1" style={{ minWidth: 0, marginBottom: 28 }}>
      <div
        className="h-px w-full transition-all duration-500"
        style={{
          background: active
            ? 'linear-gradient(90deg, #00f0ff, #b000ff)'
            : 'rgba(255,255,255,0.1)',
          boxShadow: active ? '0 0 6px rgba(0,240,255,0.4)' : 'none',
        }}
      />
    </div>
  );
}

function StepCard({
  step, active, onClick,
}: { step: ProcessStep; active: boolean; onClick: () => void }) {
  const [hovered, setHovered] = useState(false);
  const lit = active || hovered;

  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="flex flex-col items-center gap-1.5 outline-none transition-all duration-300"
      style={{
        minWidth: 64,
        transform: lit ? 'translateY(-4px) scale(1.08)' : 'none',
      }}
      aria-label={`View ${step.name}`}
    >
      {/* Icon container */}
      <div
        className="relative flex items-center justify-center rounded-xl transition-all duration-300"
        style={{
          width: 56, height: 56,
          background: lit ? `${step.color}18` : 'rgba(255,255,255,0.04)',
          border: `1px solid ${lit ? step.color + '70' : 'rgba(255,255,255,0.08)'}`,
          boxShadow: lit ? `0 0 18px ${step.color}35` : 'none',
        }}
      >
        <CSSStepIcon step={step} active={active} hovered={hovered} />

        {/* Step number badge */}
        <div
          className="absolute -top-2 -right-2 w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold transition-all duration-300"
          style={{
            background: lit ? step.color : 'rgba(255,255,255,0.12)',
            color: lit ? '#000' : '#666',
          }}
        >
          {step.index + 1}
        </div>
      </div>

      {/* Label */}
      <span
        className="text-[10px] leading-tight font-medium text-center transition-colors duration-300"
        style={{
          color: lit ? step.color : '#4b5563',
          maxWidth: 72,
        }}
      >
        {step.shortName}
      </span>

      {/* Active dot */}
      <div
        className="w-1 h-1 rounded-full transition-all duration-300"
        style={{
          background: active ? step.color : 'transparent',
          boxShadow: active ? `0 0 6px ${step.color}` : 'none',
        }}
      />
    </button>
  );
}

export function ProcessPipelineStrip({ activeStep, onStepClick }: ProcessPipelineStripProps) {
  return (
    <div
      className="w-full py-4 px-4 md:px-8"
      style={{
        background: 'rgba(10,10,18,0.95)',
        borderTop: '1px solid rgba(0,240,255,0.1)',
        borderBottom: '1px solid rgba(176,0,255,0.1)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-6xl mx-auto flex items-end">
        {PROCESS_STEPS.map((step, idx) => (
          <div key={step.id} className="flex items-end flex-1" style={{ minWidth: 0 }}>
            <StepCard
              step={step}
              active={activeStep === idx}
              onClick={() => onStepClick(idx)}
            />
            {idx < PROCESS_STEPS.length - 1 && (
              <ConnectorLine active={activeStep > idx} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
