import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isStorageAvailable } from '../utils/persistence';

// UI State Types
export type SectionId = 
  | 'hero'
  | 'process-flow'
  | 'photolithography'
  | 'wli'
  | 'surface-map'
  | 'footer';

export type LoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

export interface UIState {
  // State
  currentSection: SectionId;
  loadingStatus: LoadingStatus;
  loadingProgress: number; // 0-100
  audioEnabled: boolean;
  reducedMotion: boolean;
  isMobile: boolean;
  
  // Actions
  setCurrentSection: (section: SectionId) => void;
  setLoadingStatus: (status: LoadingStatus) => void;
  setLoadingProgress: (progress: number) => void;
  toggleAudio: () => void;
  setReducedMotion: (enabled: boolean) => void;
  setIsMobile: (isMobile: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      // Initial state
      currentSection: 'hero',
      loadingStatus: 'idle',
      loadingProgress: 0,
      audioEnabled: false,
      reducedMotion: false,
      isMobile: false,

      // Actions
      setCurrentSection: (section) => set({ currentSection: section }),
      setLoadingStatus: (status) => set({ loadingStatus: status }),
      setLoadingProgress: (progress) => set({ loadingProgress: Math.min(100, Math.max(0, progress)) }),
      toggleAudio: () => set((state) => ({ audioEnabled: !state.audioEnabled })),
      setReducedMotion: (enabled) => set({ reducedMotion: enabled }),
      setIsMobile: (isMobile) => set({ isMobile }),
    }),
    {
      name: 'ui-storage',
      storage: createJSONStorage(() => localStorage, {
        reviver: (_key, value) => {
          // Handle any special deserialization if needed
          return value;
        },
        replacer: (_key, value) => {
          // Handle any special serialization if needed
          return value;
        },
      }),
      partialize: (state) => ({
        audioEnabled: state.audioEnabled,
        currentSection: state.currentSection,
      }),
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Failed to rehydrate UI store:', error);
          } else if (state) {
            console.log('UI store rehydrated successfully');
          }
        };
      },
      skipHydration: !isStorageAvailable(),
    }
  )
);
