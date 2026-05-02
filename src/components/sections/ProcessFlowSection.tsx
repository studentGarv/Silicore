import { useState, useEffect, useRef, useCallback } from 'react';
import { PROCESS_STEPS } from '../../data/processSteps';
import { ProcessPipelineStrip } from '../process/ProcessPipelineStrip';
import { StepDetailSection } from '../process/StepDetailSection';


/**
 * Main Process Flow section — contains:
 *  1. A sticky horizontal pipeline strip showing all 8 steps
 *  2. 8 scrollable full-screen detail sections (one per step)
 *
 * Clicking a step in the strip scrolls to that step's detail section.
 * Scrolling through sections updates the active step in the strip.
 */
export function ProcessFlowSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [visibleStep, setVisibleStep] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);


  // Intersection observer to track which step detail is on screen
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    PROCESS_STEPS.forEach((step, idx) => {
      const el = document.getElementById(`step-${step.id}`);
      if (!el) return;

      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setActiveStep(idx);
            setVisibleStep(idx);
          }
        },
        { threshold: 0.35 }
      );
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  // Scroll to a step's detail section, offsetting for the fixed navbar (64px) + sticky strip (~90px)
  const handleStepClick = useCallback((index: number) => {
    const el = document.getElementById(`step-${PROCESS_STEPS[index].id}`);
    if (el) {
      const OFFSET = 160; // navbar 64px + pipeline strip ~90px + 6px breathing room
      const top = el.getBoundingClientRect().top + window.scrollY - OFFSET;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    setActiveStep(index);
  }, []);

  return (
    <div id="process-flow" ref={containerRef}>
      {/* Section header */}
      <div
        className="w-full py-16 px-6 md:px-16 text-center"
        style={{ background: '#0a0a0f' }}
      >
        <p className="text-xs font-mono tracking-widest uppercase text-gray-500 mb-3">
          From Silicon to System
        </p>
        <h2
          className="text-3xl md:text-5xl font-bold mb-4"
          style={{ color: '#fff' }}
        >
          Manufacturing{' '}
          <span
            style={{
              background: 'linear-gradient(135deg, #00f0ff, #b000ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Process Flow
          </span>
        </h2>
        <p className="text-gray-400 max-w-xl mx-auto text-sm">
          Click any step below to dive into the details. Scroll through each stage to explore
          how raw silicon becomes a finished microchip.
        </p>
      </div>

      {/* Sticky pipeline strip */}
      <div
        className="relative md:sticky md:top-16 z-30"
        style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.5)' }}
      >
        <ProcessPipelineStrip
          activeStep={activeStep}
          onStepClick={handleStepClick}
        />
      </div>

      {/* Detail sections — one per step */}
      {PROCESS_STEPS.map((step, idx) => (
        <StepDetailSection
          key={step.id}
          step={step}
          isVisible={visibleStep === idx}
        />
      ))}
    </div>
  );
}
