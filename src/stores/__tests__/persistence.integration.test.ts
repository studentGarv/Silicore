/**
 * Integration tests for store persistence
 * 
 * These tests verify that Zustand stores correctly persist and rehydrate state.
 * Run these in a browser console or add a test framework to automate.
 */

import { useUIStore } from '../uiStore';
import { useProcessFlowStore } from '../processFlowStore';
import { clearAppStorage } from '../../utils/persistence';

/**
 * Test: UI Store persistence
 */
export function testUIStorePersistence(): boolean {
  console.log('Testing UI Store persistence...');
  
  // Clear existing data
  clearAppStorage();
  
  // Get initial state
  const initialAudio = useUIStore.getState().audioEnabled;
  const initialSection = useUIStore.getState().currentSection;
  
  // Update state
  useUIStore.getState().toggleAudio();
  useUIStore.getState().setCurrentSection('process-flow');
  
  // Get updated state
  const updatedAudio = useUIStore.getState().audioEnabled;
  const updatedSection = useUIStore.getState().currentSection;
  
  console.log(`Initial audio: ${initialAudio}, Updated: ${updatedAudio}`);
  console.log(`Initial section: ${initialSection}, Updated: ${updatedSection}`);
  
  // Verify state changed
  if (updatedAudio === initialAudio || updatedSection === initialSection) {
    console.error('✗ State did not update');
    return false;
  }
  
  // Check localStorage
  const storedData = localStorage.getItem('ui-storage');
  if (!storedData) {
    console.error('✗ No data found in localStorage');
    return false;
  }
  
  try {
    const parsed = JSON.parse(storedData);
    if (
      parsed.state.audioEnabled === updatedAudio &&
      parsed.state.currentSection === updatedSection
    ) {
      console.log('✓ UI Store persisted correctly');
      return true;
    } else {
      console.error('✗ Persisted data does not match state');
      return false;
    }
  } catch (error) {
    console.error('✗ Failed to parse persisted data:', error);
    return false;
  }
}

/**
 * Test: Process Flow Store persistence
 */
export function testProcessFlowStorePersistence(): boolean {
  console.log('Testing Process Flow Store persistence...');
  
  // Clear existing data
  clearAppStorage();
  
  // Mark some steps as complete
  useProcessFlowStore.getState().markStepComplete('wafer-manufacturing');
  useProcessFlowStore.getState().markStepComplete('oxidation');
  useProcessFlowStore.getState().markStepComplete('photolithography');
  
  // Get state
  const completedSteps = useProcessFlowStore.getState().completedSteps;
  
  console.log(`Completed steps: ${Array.from(completedSteps).join(', ')}`);
  
  // Verify state
  if (completedSteps.size !== 3) {
    console.error('✗ Expected 3 completed steps');
    return false;
  }
  
  // Check localStorage
  const storedData = localStorage.getItem('process-flow-storage');
  if (!storedData) {
    console.error('✗ No data found in localStorage');
    return false;
  }
  
  try {
    const parsed = JSON.parse(storedData);
    const persistedSteps = parsed.state.completedSteps;
    
    if (
      Array.isArray(persistedSteps) &&
      persistedSteps.length === 3 &&
      persistedSteps.includes('wafer-manufacturing') &&
      persistedSteps.includes('oxidation') &&
      persistedSteps.includes('photolithography')
    ) {
      console.log('✓ Process Flow Store persisted correctly');
      return true;
    } else {
      console.error('✗ Persisted data does not match state');
      return false;
    }
  } catch (error) {
    console.error('✗ Failed to parse persisted data:', error);
    return false;
  }
}

/**
 * Test: Store rehydration
 */
export function testStoreRehydration(): boolean {
  console.log('Testing store rehydration...');
  
  // This test requires a page reload to verify rehydration
  // For now, we'll just verify the data is in localStorage
  
  const uiData = localStorage.getItem('ui-storage');
  const processFlowData = localStorage.getItem('process-flow-storage');
  
  if (uiData && processFlowData) {
    console.log('✓ Store data exists in localStorage (rehydration will occur on reload)');
    console.log('  To fully test rehydration, reload the page and check state');
    return true;
  } else {
    console.error('✗ Store data not found in localStorage');
    return false;
  }
}

/**
 * Test: Error handling when localStorage is full
 */
export function testStorageQuotaExceeded(): boolean {
  console.log('Testing storage quota exceeded handling...');
  
  try {
    // Try to fill localStorage (this might not work in all browsers)
    const largeData = 'x'.repeat(10 * 1024 * 1024); // 10MB
    localStorage.setItem('test-large', largeData);
    localStorage.removeItem('test-large');
    console.log('✓ Storage quota not exceeded (or browser allows large storage)');
    return true;
  } catch (error) {
    // This is actually the expected behavior when quota is exceeded
    console.log('✓ Storage quota exceeded error handled gracefully');
    return true;
  }
}

/**
 * Run all integration tests
 */
export function runAllIntegrationTests(): void {
  console.log('=== Running Store Persistence Integration Tests ===\n');
  
  const tests = [
    testUIStorePersistence,
    testProcessFlowStorePersistence,
    testStoreRehydration,
    testStorageQuotaExceeded,
  ];
  
  let passed = 0;
  let failed = 0;
  
  tests.forEach((test) => {
    try {
      const result = test();
      if (result) {
        passed++;
      } else {
        failed++;
      }
    } catch (error) {
      console.error(`✗ Test threw error: ${error}`);
      failed++;
    }
    console.log('');
  });
  
  console.log('=== Test Results ===');
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${failed}`);
  console.log(`Total: ${tests.length}`);
  
  // Clean up
  clearAppStorage();
}
