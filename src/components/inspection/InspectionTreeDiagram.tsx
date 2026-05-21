import { motion } from 'framer-motion';
import type { InspectionTechnology } from '../../data/inspectionData';
import { InspectionTechCard } from './InspectionTechCard';

interface InspectionTreeDiagramProps {
  stepName: string;
  stepColor: string;
  contactTechs: InspectionTechnology[];
  nonContactTechs: InspectionTechnology[];
}

const CONTACT_COLOR = '#ffaa00';
const NONCONTACT_COLOR = '#00f0ff';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const nodeVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } },
};

interface CategoryBranchProps {
  label: string;
  color: string;
  techs: InspectionTechnology[];
  isLast: boolean;
}

function CategoryBranch({ label, color, techs, isLast }: CategoryBranchProps) {
  return (
    <motion.div variants={nodeVariants} className="flex gap-0">
      {/* ── Vertical trunk connector ── */}
      <div className="flex flex-col items-center" style={{ width: 28, flexShrink: 0 }}>
        {/* vertical line segment */}
        <div
          className="w-px"
          style={{
            background: 'rgba(255,255,255,0.12)',
            flex: isLast ? '0 0 24px' : '1',
            minHeight: 24,
          }}
        />
        {/* elbow corner */}
        <div className="flex items-center" style={{ height: 1 }}>
          <div className="w-5 h-px" style={{ background: 'rgba(255,255,255,0.12)' }} />
        </div>
        {/* remaining vertical line (only if not last) */}
        {!isLast && (
          <div className="w-px flex-1" style={{ background: 'rgba(255,255,255,0.12)' }} />
        )}
      </div>

      {/* ── Category block ── */}
      <div className="flex-1 pb-4">
        {/* Category label */}
        <motion.div
          variants={nodeVariants}
          className="flex items-center gap-2 mb-3 mt-5"
        >
          <div
            className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
            style={{ background: color, boxShadow: `0 0 8px ${color}80` }}
          />
          <span
            className="text-xs font-mono font-semibold tracking-widest uppercase"
            style={{ color }}
          >
            {label}
          </span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-mono"
            style={{
              background: `${color}18`,
              color: `${color}cc`,
              border: `1px solid ${color}33`,
            }}
          >
            {techs.length} method{techs.length !== 1 ? 's' : ''}
          </span>
        </motion.div>

        {/* Tech cards */}
        {techs.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-2 ml-4"
          >
            {techs.map((tech) => (
              <motion.div key={tech.id} variants={nodeVariants}>
                <InspectionTechCard tech={tech} compact />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <p className="ml-4 text-xs text-gray-600 italic">
            No methods listed for this category
          </p>
        )}
      </div>
    </motion.div>
  );
}

export function InspectionTreeDiagram({
  stepName,
  stepColor,
  contactTechs,
  nonContactTechs,
}: InspectionTreeDiagramProps) {
  const hasAny = contactTechs.length + nonContactTechs.length > 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      {/* ── Root node: Manufacturing Step ── */}
      <motion.div variants={nodeVariants} className="flex items-center gap-3 mb-1">
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
          style={{
            background: `${stepColor}18`,
            border: `1px solid ${stepColor}44`,
            boxShadow: `0 0 20px ${stepColor}22`,
          }}
        >
          <div
            className="w-3 h-3 rounded-full flex-shrink-0"
            style={{ background: stepColor, boxShadow: `0 0 8px ${stepColor}` }}
          />
          <span className="font-bold text-white text-sm">{stepName}</span>
        </div>
      </motion.div>

      {/* ── Branches ── */}
      {!hasAny ? (
        <p className="ml-8 mt-4 text-sm text-gray-600 italic">
          No inspection methods mapped to this step yet.
        </p>
      ) : (
        <div className="ml-4">
          <CategoryBranch
            label="Contact Inspection"
            color={CONTACT_COLOR}
            techs={contactTechs}
            isLast={false}
          />
          <CategoryBranch
            label="Non-Contact Inspection"
            color={NONCONTACT_COLOR}
            techs={nonContactTechs}
            isLast={true}
          />
        </div>
      )}
    </motion.div>
  );
}
