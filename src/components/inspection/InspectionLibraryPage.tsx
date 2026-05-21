import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  INSPECTION_TECHNOLOGIES,
  type InspectionCategory,
} from '../../data/inspectionData';
import { PROCESS_STEPS } from '../../data/processSteps';
import { InspectionTechCard } from './InspectionTechCard';
import { Breadcrumb } from '../ui/Breadcrumb';

interface InspectionLibraryPageProps {
  onGoHome: () => void;
}

type FilterTab = 'All' | InspectionCategory;

const FILTER_TABS: FilterTab[] = ['All', 'Contact', 'Non-Contact'];

export function InspectionLibraryPage({ onGoHome }: InspectionLibraryPageProps) {
  const [activeFilter, setActiveFilter] = useState<FilterTab>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeStepFilter, setActiveStepFilter] = useState<string>('');

  const breadcrumbs = [
    { label: 'Home', onClick: onGoHome },
    { label: 'Inspection Library' },
  ];

  const filtered = useMemo(() => {
    return INSPECTION_TECHNOLOGIES.filter((tech) => {
      // Category filter
      if (activeFilter !== 'All' && tech.category !== activeFilter) return false;
      // Step filter
      if (activeStepFilter && !tech.applicableSteps.includes(activeStepFilter)) return false;
      // Search
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          tech.name.toLowerCase().includes(q) ||
          tech.shortDefinition.toLowerCase().includes(q) ||
          tech.definition.toLowerCase().includes(q) ||
          tech.techniques.some((t) => t.toLowerCase().includes(q)) ||
          tech.applicableSteps.some((s) => s.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [activeFilter, searchQuery, activeStepFilter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen"
      style={{ background: '#0a0a0f' }}
    >
      {/* ── Page Header ── */}
      <div
        className="relative w-full pt-24 pb-10 px-6 md:px-16 overflow-hidden"
        style={{
          background:
            'linear-gradient(135deg, rgba(0,240,255,0.08) 0%, rgba(176,0,255,0.05) 50%, #0a0a0f 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        {/* Decorative glows */}
        <div
          className="absolute top-0 left-0 w-80 h-80 rounded-full pointer-events-none opacity-15"
          style={{
            background: 'radial-gradient(circle, #00f0ff, transparent 70%)',
            transform: 'translate(-30%, -30%)',
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-96 h-96 rounded-full pointer-events-none opacity-10"
          style={{
            background: 'radial-gradient(circle, #b000ff, transparent 70%)',
            transform: 'translate(30%, 40%)',
          }}
        />

        <div className="relative max-w-5xl mx-auto">
          <div className="mb-6">
            <Breadcrumb items={breadcrumbs} />
          </div>

          <div className="flex items-start justify-between gap-6 flex-wrap">
            <div>
              <p className="text-xs font-mono tracking-widest uppercase text-gray-500 mb-2">
                Reference Database
              </p>
              <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3">
                Inspection{' '}
                <span
                  style={{
                    background: 'linear-gradient(135deg, #00f0ff, #b000ff)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                  }}
                >
                  Technologies
                </span>
              </h1>
              <p className="text-gray-400 text-sm max-w-xl">
                Explore all contact and non-contact inspection methods used across the semiconductor
                manufacturing workflow. Filter by category or manufacturing step.
              </p>
            </div>

            {/* Stats row */}
            <div className="flex gap-4">
              <StatBadge value={INSPECTION_TECHNOLOGIES.length} label="Total Methods" color="#fff" />
              <StatBadge
                value={INSPECTION_TECHNOLOGIES.filter((t) => t.category === 'Contact').length}
                label="Contact"
                color="#ffaa00"
              />
              <StatBadge
                value={INSPECTION_TECHNOLOGIES.filter((t) => t.category === 'Non-Contact').length}
                label="Non-Contact"
                color="#00f0ff"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Filter & Search Bar ── */}
      <div
        className="sticky top-16 z-20 px-6 md:px-16 py-4"
        style={{
          background: 'rgba(10,10,15,0.92)',
          backdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 text-sm pointer-events-none">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search by name, technique, or step…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm text-white placeholder-gray-600 outline-none focus:ring-1"
              style={{
                background: 'rgba(30,30,44,0.8)',
                border: '1px solid rgba(255,255,255,0.1)',
                focusRingColor: '#00f0ff',
              }}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs"
              >
                ✕
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div
            className="flex gap-1 p-1 rounded-xl"
            style={{ background: 'rgba(30,30,44,0.8)', border: '1px solid rgba(255,255,255,0.08)' }}
          >
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className="px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200"
                style={{
                  background: activeFilter === tab ? (tab === 'Contact' ? '#ffaa0022' : tab === 'Non-Contact' ? '#00f0ff22' : 'rgba(255,255,255,0.1)') : 'transparent',
                  color: activeFilter === tab ? (tab === 'Contact' ? '#ffaa00' : tab === 'Non-Contact' ? '#00f0ff' : '#fff') : '#666',
                  border: activeFilter === tab ? `1px solid ${tab === 'Contact' ? '#ffaa0044' : tab === 'Non-Contact' ? '#00f0ff44' : 'rgba(255,255,255,0.2)'}` : '1px solid transparent',
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Step filter dropdown */}
          <select
            value={activeStepFilter}
            onChange={(e) => setActiveStepFilter(e.target.value)}
            className="px-3 py-2.5 rounded-xl text-sm outline-none cursor-pointer"
            style={{
              background: 'rgba(30,30,44,0.8)',
              border: '1px solid rgba(255,255,255,0.1)',
              color: activeStepFilter ? '#00f0ff' : '#666',
            }}
          >
            <option value="">All Steps</option>
            {PROCESS_STEPS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Active filters display */}
        {(searchQuery || activeStepFilter) && (
          <div className="max-w-5xl mx-auto mt-2 flex items-center gap-2">
            <span className="text-xs text-gray-600">
              Showing {filtered.length} of {INSPECTION_TECHNOLOGIES.length} methods
            </span>
            <button
              onClick={() => { setSearchQuery(''); setActiveStepFilter(''); setActiveFilter('All'); }}
              className="text-xs text-gray-500 hover:text-neon-cyan underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </div>

      {/* ── Technology Grid ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-16 py-10">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="py-20 text-center"
            >
              <p className="text-gray-600 text-lg">No technologies match your filters.</p>
              <button
                onClick={() => { setSearchQuery(''); setActiveFilter('All'); setActiveStepFilter(''); }}
                className="mt-3 text-sm text-neon-cyan hover:underline"
              >
                Clear all filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-4"
            >
              {filtered.map((tech, i) => (
                <motion.div
                  key={tech.id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.3 }}
                >
                  <InspectionTechCard tech={tech} />
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

function StatBadge({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div
      className="text-center px-4 py-2 rounded-xl"
      style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
    >
      <div className="text-2xl font-black" style={{ color }}>
        {value}
      </div>
      <div className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{label}</div>
    </div>
  );
}
