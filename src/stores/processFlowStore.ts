import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { isStorageAvailable } from '../utils/persistence';

// Process Step Types
export type ProcessStepId =
  | 'wafer-manufacturing'
  | 'oxidation'
  | 'photolithography'
  | 'etching'
  | 'deposition-ion-implantation'
  | 'metal-wiring'
  | 'electrical-die-sorting'
  | 'packaging';

export interface ProcessFlowState {
  // State
  expandedStepId: ProcessStepId | null;
  completedSteps: Set<ProcessStepId>;
  
  // Actions
  expandStep: (stepId: ProcessStepId) => void;
  collapseStep: () => void;
  toggleStep: (stepId: ProcessStepId) => void;
  markStepComplete: (stepId: ProcessStepId) => void;
  markStepIncomplete: (stepId: ProcessStepId) => void;
  resetProgress: () => void;
}

export const useProcessFlowStore = create<ProcessFlowState>()(
  persist(
    (set) => ({
      // Initial state
      expandedStepId: null,
      completedSteps: new Set<ProcessStepId>(),

      // Actions
      expandStep: (stepId) => set({ expandedStepId: stepId }),
      
      collapseStep: () => set({ expandedStepId: null }),
      
      toggleStep: (stepId) =>
        set((state) => ({
          expandedStepId: state.expandedStepId === stepId ? null : stepId,
        })),
      
      markStepComplete: (stepId) =>
        set((state) => ({
          completedSteps: new Set(state.completedSteps).add(stepId),
        })),
      
      markStepIncomplete: (stepId) =>
        set((state) => {
          const newCompleted = new Set(state.completedSteps);
          newCompleted.delete(stepId);
          return { completedSteps: newCompleted };
        }),
      
      resetProgress: () =>
        set({
          expandedStepId: null,
          completedSteps: new Set<ProcessStepId>(),
        }),
    }),
    {
      name: 'process-flow-storage',
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
        completedSteps: Array.from(state.completedSteps),
      }),
      merge: (persistedState, currentState) => {
        try {
          const persisted = persistedState as any;
          return {
            ...currentState,
            ...persisted,
            completedSteps: new Set(
              Array.isArray(persisted?.completedSteps) ? persisted.completedSteps : []
            ),
          };
        } catch (error) {
          console.error('Failed to merge persisted process flow state:', error);
          return currentState;
        }
      },
      onRehydrateStorage: () => {
        return (state, error) => {
          if (error) {
            console.error('Failed to rehydrate process flow store:', error);
          } else if (state) {
            console.log('Process flow store rehydrated successfully');
          }
        };
      },
      skipHydration: !isStorageAvailable(),
    }
  )
);
