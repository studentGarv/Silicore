import { motion } from 'framer-motion';

export function ScrollIndicator() {
  return (
    <motion.div
      className="flex flex-col items-center gap-2 cursor-pointer"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.6 }}
      onClick={() => {
        const el = document.getElementById('process-flow');
        el?.scrollIntoView({ behavior: 'smooth' });
      }}
    >
      <span className="text-xs tracking-[0.2em] uppercase text-neon-cyan/60 font-mono">
        Scroll to Explore
      </span>
      <motion.div
        className="w-6 h-10 rounded-full border-2 border-neon-cyan/40 flex items-start justify-center p-1"
        animate={{ borderColor: ['rgba(0,240,255,0.4)', 'rgba(0,240,255,0.9)', 'rgba(0,240,255,0.4)'] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full bg-neon-cyan"
          animate={{ y: [0, 18, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
}
