import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { InspectionTechnology } from '../../data/inspectionData';

interface InspectionTechCardProps {
  tech: InspectionTechnology;
  /** If true, renders a compact inline card (for tree view). Default = false (library view). */
  compact?: boolean;
}

const CATEGORY_STYLES = {
  Contact: {
    badge: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
    glow: 'rgba(255,170,0,0.25)',
    accent: '#ffaa00',
    dot: 'bg-amber-400',
  },
  'Non-Contact': {
    badge: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30',
    glow: 'rgba(0,240,255,0.25)',
    accent: '#00f0ff',
    dot: 'bg-cyan-400',
  },
};

export function InspectionTechCard({ tech, compact = false }: InspectionTechCardProps) {
  const [expanded, setExpanded] = useState(false);
  const styles = CATEGORY_STYLES[tech.category];

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.25 }}
      className="rounded-xl overflow-hidden cursor-pointer group"
      style={{
        background: 'rgba(20, 20, 30, 0.7)',
        border: `1px solid ${expanded ? styles.accent + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: expanded ? `0 0 24px ${styles.glow}` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
      onClick={() => setExpanded((v) => !v)}
    >
      {/* ── Card Header ── */}
      <div
        className={`flex items-start gap-3 p-4 ${compact ? '' : 'p-5'}`}
        style={{ background: expanded ? `linear-gradient(135deg, ${styles.glow}, transparent)` : undefined }}
      >
        {/* Category dot */}
        <div className="flex-shrink-0 mt-0.5">
          <div className={`w-2 h-2 rounded-full ${styles.dot} mt-1.5`} />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h4 className={`font-semibold text-white leading-snug ${compact ? 'text-sm' : 'text-base'}`}>
              {tech.name}
            </h4>
            <div className="flex items-center gap-2 flex-shrink-0">
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${styles.badge}`}>
                {tech.category}
              </span>
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-gray-500 text-sm select-none"
              >
                ▾
              </motion.span>
            </div>
          </div>

          <p className={`text-gray-400 leading-relaxed ${compact ? 'text-xs' : 'text-sm'}`}>
            {tech.shortDefinition}
          </p>
        </div>
      </div>

      {/* ── Expandable Detail Panel ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div
              className="px-5 pb-5 pt-0 border-t"
              style={{ borderColor: 'rgba(255,255,255,0.06)' }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Image */}
              {tech.image && (
                <div className="mt-4 mb-4 rounded-lg overflow-hidden h-36 bg-gray-900 flex items-center justify-center">
                  <img
                    src={tech.image}
                    alt={tech.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  {/* Fallback gradient placeholder */}
                  <div
                    className="absolute inset-0 flex items-center justify-center text-xs text-gray-600 font-mono"
                    style={{
                      background: `linear-gradient(135deg, rgba(20,20,30,0.9), ${styles.glow})`,
                    }}
                  >
                    {tech.name}
                  </div>
                </div>
              )}

              {/* Full definition */}
              <p className="text-gray-300 text-sm leading-relaxed mb-4">{tech.definition}</p>

              {/* Techniques list */}
              <div>
                <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                  Key Techniques
                </p>
                <ul className="space-y-1.5">
                  {tech.techniques.map((t, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-300">
                      <span style={{ color: styles.accent }} className="mt-0.5 flex-shrink-0">
                        ▸
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Related steps */}
              {tech.applicableSteps.length > 0 && (
                <div className="mt-4 pt-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                  <p className="text-[11px] font-mono uppercase tracking-widest text-gray-500 mb-2">
                    Used In
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {tech.applicableSteps.map((stepId) => (
                      <span
                        key={stepId}
                        className="text-[11px] px-2 py-0.5 rounded-full font-mono"
                        style={{
                          background: 'rgba(255,255,255,0.06)',
                          color: '#aaa',
                          border: '1px solid rgba(255,255,255,0.1)',
                        }}
                      >
                        {stepId}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
