import { create } from 'zustand';

// Performance Types
export type GPUTier = 'low' | 'medium' | 'high';
export type EffectsQuality = 'low' | 'medium' | 'high' | 'ultra';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number; // milliseconds
  drawCalls: number;
  triangleCount: number;
}

export interface PerformanceState {
  // State
  fps: number;
  gpuTier: GPUTier;
  effectsQuality: EffectsQuality;
  metrics: PerformanceMetrics;
  
  // Actions
  updateFPS: (fps: number) => void;
  setGPUTier: (tier: GPUTier) => void;
  setEffectsQuality: (quality: EffectsQuality) => void;
  updateMetrics: (metrics: Partial<PerformanceMetrics>) => void;
  autoAdjustQuality: () => void;
}

const DEFAULT_METRICS: PerformanceMetrics = {
  fps: 60,
  frameTime: 16.67,
  drawCalls: 0,
  triangleCount: 0,
};

export const usePerformanceStore = create<PerformanceState>((set, get) => ({
  // Initial state
  fps: 60,
  gpuTier: 'medium',
  effectsQuality: 'high',
  metrics: DEFAULT_METRICS,

  // Actions
  updateFPS: (fps) => {
    set({ fps });
    // Auto-adjust quality if FPS drops significantly
    const state = get();
    if (fps < 30 && state.effectsQuality !== 'low') {
      get().autoAdjustQuality();
    }
  },

  setGPUTier: (tier) => {
    set({ gpuTier: tier });
    // Set initial quality based on GPU tier
    const qualityMap: Record<GPUTier, EffectsQuality> = {
      low: 'low',
      medium: 'medium',
      high: 'ultra',
    };
    set({ effectsQuality: qualityMap[tier] });
  },

  setEffectsQuality: (quality) => set({ effectsQuality: quality }),

  updateMetrics: (metrics) =>
    set((state) => ({
      metrics: { ...state.metrics, ...metrics },
    })),

  autoAdjustQuality: () => {
    const state = get();
    const { fps, effectsQuality } = state;

    // Reduce quality if FPS is too low
    if (fps < 30) {
      if (effectsQuality === 'ultra') {
        set({ effectsQuality: 'high' });
      } else if (effectsQuality === 'high') {
        set({ effectsQuality: 'medium' });
      } else if (effectsQuality === 'medium') {
        set({ effectsQuality: 'low' });
      }
    }
    // Increase quality if FPS is stable and high
    else if (fps > 50) {
      if (effectsQuality === 'low') {
        set({ effectsQuality: 'medium' });
      } else if (effectsQuality === 'medium') {
        set({ effectsQuality: 'high' });
      } else if (effectsQuality === 'high' && state.gpuTier === 'high') {
        set({ effectsQuality: 'ultra' });
      }
    }
  },
}));
