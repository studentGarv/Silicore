import { motion } from 'framer-motion';
import { PROCESS_STEPS } from '../../data/processSteps';
import {
  getInspectionForStep,
  groupByCategory,
} from '../../data/inspectionData';
import { Breadcrumb } from '../ui/Breadcrumb';
import { InspectionTreeDiagram } from './InspectionTreeDiagram';

interface StepInspectionViewProps {
  stepId: string;
  onBack: () => void;
  onGoHome: () => void;
}

export function StepInspectionView({ stepId, onBack, onGoHome }: StepInspectionViewProps) {
  const step = PROCESS_STEPS.find((s) => s.id === stepId);
  if (!step) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Step not found.
      </div>
    );
  }

  const allTechs = getInspectionForStep(stepId);
  const grouped = groupByCategory(allTechs);
  const totalTechs = allTechs.length;

  const breadcrumbs = [
    { label: 'Home', onClick: onGoHome },
    { label: 'Process Flow', onClick: onBack },
    { label: step.name },
  ];

  return (
    <motion.div
      key={stepId}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="min-h-screen"
      style={{ background: '#0a0a0f' }}
    >
      {/* ── Hero banner for this step ── */}
      <div
        className="relative w-full pt-24 pb-10 px-6 md:px-16 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${step.color}18 0%, #0a0a0f 60%)`,
          borderBottom: `1px solid ${step.color}22`,
        }}
      >
        {/* background accent glow */}
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{
            background: `radial-gradient(circle, ${step.color}, transparent 70%)`,
            transform: 'translate(30%, -30%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} />
          </div>

          {/* Step header */}
          <div className="flex items-start gap-4">
            <div
              className="text-4xl w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
              style={{
                background: `${step.color}22`,
                border: `1px solid ${step.color}44`,
                boxShadow: `0 0 32px ${step.color}33`,
              }}
            >
              {step.icon}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="text-xs font-mono tracking-widest uppercase"
                  style={{ color: step.color }}
                >
                  Step {step.index + 1} of {PROCESS_STEPS.length}
                </span>
                <span
                  className="text-[10px] px-2 py-0.5 rounded-full font-mono"
                  style={{
                    background: `${step.color}18`,
                    color: `${step.color}cc`,
                    border: `1px solid ${step.color}33`,
                  }}
                >
                  {totalTechs} inspection method{totalTechs !== 1 ? 's' : ''}
                </span>
              </div>
              <h1
                className="text-3xl md:text-4xl font-extrabold text-white mb-2"
              >
                {step.name}
              </h1>
              <p className="text-gray-400 text-sm md:text-base max-w-2xl">
                {step.detail}
              </p>
            </div>
          </div>

          {/* Key Facts row */}
          <div className="mt-6 flex flex-wrap gap-2">
            {step.facts.map((fact, i) => (
              <span
                key={i}
                className="text-xs px-3 py-1 rounded-full font-mono"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#bbb',
                }}
              >
                {fact}
              </span>
            ))}
          </div>

          {/* Nav between steps */}
          <div className="mt-6 flex items-center gap-3">
            {step.index > 0 && (
              <button
                onClick={onBack}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
              >
                ← Back to Process Flow
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── Inspection Tree ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-12">
        <div className="mb-8">
          <p className="text-xs font-mono uppercase tracking-widest text-gray-500 mb-2">
            Inspection Methods
          </p>
          <h2 className="text-2xl font-bold text-white mb-1">
            Quality Control for{' '}
            <span
              style={{
                background: `linear-gradient(90deg, ${step.color}, ${step.secondaryColor})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {step.name}
            </span>
          </h2>
          <p className="text-gray-500 text-sm">
            Click any method to expand and learn about techniques and applications.
          </p>
        </div>

        {/* Split layout: tree on left, summary on right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Tree diagram */}
          <div className="lg:col-span-2">
            <InspectionTreeDiagram
              stepName={step.name}
              stepColor={step.color}
              contactTechs={grouped['Contact']}
              nonContactTechs={grouped['Non-Contact']}
            />
          </div>

          {/* Right sidebar: stats */}
          <div className="space-y-3">
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(20,20,30,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-3">
                Summary
              </p>
              <div className="space-y-3">
                <StatRow
                  label="Total Methods"
                  value={String(totalTechs)}
                  color="#fff"
                />
                <StatRow
                  label="Contact"
                  value={String(grouped['Contact'].length)}
                  color="#ffaa00"
                />
                <StatRow
                  label="Non-Contact"
                  value={String(grouped['Non-Contact'].length)}
                  color="#00f0ff"
                />
              </div>
            </div>

            {/* Legend */}
            <div
              className="rounded-xl p-4"
              style={{
                background: 'rgba(20,20,30,0.8)',
                border: '1px solid rgba(255,255,255,0.07)',
              }}
            >
              <p className="text-[10px] font-mono uppercase tracking-widest text-gray-600 mb-3">
                Legend
              </p>
              <div className="space-y-2">
                <LegendItem color="#ffaa00" label="Contact Inspection" desc="Physical probe contact required" />
                <LegendItem color="#00f0ff" label="Non-Contact" desc="Optical / acoustic / X-ray based" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatRow({ label, value, color }: { label: string; value: string; color: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-gray-500">{label}</span>
      <span className="text-sm font-bold" style={{ color }}>
        {value}
      </span>
    </div>
  );
}

function LegendItem({ color, label, desc }: { color: string; label: string; desc: string }) {
  return (
    <div className="flex items-start gap-2">
      <div
        className="w-2.5 h-2.5 rounded-sm mt-0.5 flex-shrink-0"
        style={{ background: color, boxShadow: `0 0 6px ${color}80` }}
      />
      <div>
        <p className="text-xs font-medium text-gray-300">{label}</p>
        <p className="text-[10px] text-gray-600">{desc}</p>
      </div>
    </div>
  );
}
