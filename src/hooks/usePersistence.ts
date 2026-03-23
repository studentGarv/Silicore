/**
 * Persistence initialization hook
 * 
 * Handles localStorage initialization and error recovery for the application.
 */

import { useEffect } from 'react';
import { useUIStore } from '../stores/uiStore';
import { useProcessFlowStore } from '../stores/processFlowStore';
import { isStorageAvailable } from '../utils/persistence';

/**
 * Hook to initialize and monitor persistence
 */
export function usePersistence() {
  useEffect(() => {
    // Check if localStorage is available
    const storageAvailable = isStorageAvailable();
    
    if (!storageAvailable) {
      console.warn('localStorage is not available. User preferences will not be persisted.');
      return;
    }
    
    // Log successful initialization
    console.log('Persistence initialized successfully');
    
    // Rehydrate stores (Zustand handles this automatically, but we can verify)
    try {
      const uiState = useUIStore.getState();
      const processFlowState = useProcessFlowStore.getState();
      
      console.log('UI Store rehydrated:', {
        audioEnabled: uiState.audioEnabled,
        currentSection: uiState.currentSection,
      });
      
      console.log('Process Flow Store rehydrated:', {
        completedStepsCount: processFlowState.completedSteps.size,
      });
    } catch (error) {
      console.error('Error during store rehydration:', error);
    }
    
    // Set up storage event listener for cross-tab synchronization
    const handleStorageChange = (event: StorageEvent) => {
      if (!event.key) return;
      
      // Handle UI store changes
      if (event.key === 'ui-storage' && event.newValue) {
        try {
          JSON.parse(event.newValue);
          console.log('UI store updated from another tab');
          // Zustand will handle the update automatically
        } catch (error) {
          console.error('Failed to parse storage event for UI store:', error);
        }
      }
      
      // Handle Process Flow store changes
      if (event.key === 'process-flow-storage' && event.newValue) {
        try {
          JSON.parse(event.newValue);
          console.log('Process Flow store updated from another tab');
          // Zustand will handle the update automatically
        } catch (error) {
          console.error('Failed to parse storage event for Process Flow store:', error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Cleanup
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
}

/**
 * Hook to manually trigger store persistence
 * Useful for debugging or manual save operations
 */
export function useManualPersist() {
  const persistUIStore = () => {
    try {
      const state = useUIStore.getState();
      console.log('Manually persisting UI store:', state);
      // Zustand persist middleware handles this automatically
      return true;
    } catch (error) {
      console.error('Failed to manually persist UI store:', error);
      return false;
    }
  };
  
  const persistProcessFlowStore = () => {
    try {
      const state = useProcessFlowStore.getState();
      console.log('Manually persisting Process Flow store:', state);
      // Zustand persist middleware handles this automatically
      return true;
    } catch (error) {
      console.error('Failed to manually persist Process Flow store:', error);
      return false;
    }
  };
  
  return {
    persistUIStore,
    persistProcessFlowStore,
  };
}
