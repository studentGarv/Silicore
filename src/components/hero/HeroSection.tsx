import { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion, useScroll, useTransform } from 'framer-motion';
import { WaferModel3D } from './WaferModel3D';
import { ParticleSystem } from './ParticleSystem';
import { ScrollIndicator } from '../ui/ScrollIndicator';

export function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setScrollProgress(v));
    return unsub;
  }, [scrollYProgress]);

  const textY = useTransform(scrollYProgress, [0, 0.6], ['0%', '-20%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="hidden md:block relative h-screen w-full overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at 70% 40%, #0e0e22 0%, #0a0a0f 55%, #06060c 100%)',
      }}
    >
      {/* Star field */}
      <Stars />

      {/* Full-page R3F canvas */}
      <div className="absolute inset-0">
        <Canvas
          camera={{ position: [0, 2.8, 5.2], fov: 45 }}
          gl={{ antialias: true, alpha: true }}
        >
          <ambientLight intensity={0.15} />
          <pointLight position={[4, 4, 3]} color="#00f0ff" intensity={6} />
          <pointLight position={[-4, -2, 2]} color="#b000ff" intensity={5} />
          <pointLight position={[0, 6, -2]} color="#ffffff" intensity={1} />
          <group position={[1.8, 0, 0]}>
            {!isMobile && <WaferModel3D scrollProgress={scrollProgress} />}
            <ParticleSystem />
          </group>
        </Canvas>
      </div>

      {/* Left-aligned text content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-center -mt-24 md:mt-0 px-8 md:px-16 lg:px-24 max-w-2xl"
        style={{ y: textY, opacity: textOpacity }}
      >
        {/* Subtitle tag */}
        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm font-mono tracking-widest text-gray-400 mb-3 uppercase"
        >
          From Wafer to Microchip
        </motion.p>

        {/* Main heading — matches reference layout */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="font-extrabold leading-tight mb-6"
          style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}
        >
          <span className="text-white font-light">Inside </span>
          <span
            className="font-black"
            style={{
              background: 'linear-gradient(135deg, #00f0ff 10%, #aa44ff 60%, #ff44aa 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Semiconductor
          </span>
          <br />
          <span className="text-white">Manufacturing</span>
        </motion.h1>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="hidden md:block"
        >
          <ExploreButton />
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 hidden md:block"
        style={{ opacity: textOpacity }}
      >
        <ScrollIndicator />
      </motion.div>

      {/* Bottom fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-40 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #0a0a0f)' }}
      />
    </section>
  );
}

// — Helper components —

function Stars() {
  // Generate stable star positions (not random on each render)
  const stars = Array.from({ length: 80 }, (_, i) => ({
    w: ((i * 13) % 2) + 1,
    h: ((i * 7) % 2) + 1,
    left: ((i * 17 + 3) % 100),
    top: ((i * 11 + 7) % 100),
    opacity: ((i * 7) % 5) * 0.1 + 0.1,
    dur: 2 + ((i * 3) % 4),
    delay: (i * 5) % 4,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${s.w}px`,
            height: `${s.h}px`,
            left: `${s.left}%`,
            top: `${s.top}%`,
            opacity: s.opacity,
            animation: `pulse-glow ${s.dur}s ease-in-out infinite`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

function ExploreButton() {
  return (
    <button
      onClick={() => document.getElementById('process-flow')?.scrollIntoView({ behavior: 'smooth' })}
      className="group flex items-center gap-3 px-7 py-3 rounded-full text-sm font-semibold transition-all duration-300"
      style={{
        background: 'rgba(0,240,255,0.08)',
        border: '1px solid rgba(0,240,255,0.45)',
        color: '#00f0ff',
        backdropFilter: 'blur(12px)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(0,240,255,0.18)';
        el.style.boxShadow = '0 0 24px rgba(0,240,255,0.3)';
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.background = 'rgba(0,240,255,0.08)';
        el.style.boxShadow = 'none';
      }}
    >
      Explore Process
      <span
        className="inline-flex items-center justify-center w-5 h-5 rounded-full transition-colors"
        style={{ background: 'rgba(0,240,255,0.15)' }}
      >
        ›
      </span>
    </button>
  );
}
