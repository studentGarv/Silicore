/**
 * Configuration Loader Tests
 * 
 * These tests verify the configuration loader functionality.
 * Note: This file uses a simple test structure since no testing framework is installed.
 * To run: Import and execute in browser console or add a proper test framework.
 */

import {
  loadProcessSteps,
  loadTooltips,
  loadDefectScenarios,
  clearConfigCache,
  getConfigCacheStatus,
} from '../configLoader';

/**
 * Test helper to log results
 */
function logTest(name: string, passed: boolean, message: string) {
  const icon = passed ? '✓' : '✗';
  const style = passed ? 'color: green' : 'color: red';
  console.log(`%c${icon} ${name}: ${message}`, style);
}

/**
 * Test 1: Load process steps configuration
 */
export async function testLoadProcessSteps() {
  try {
    const steps = await loadProcessSteps();
    const passed = Array.isArray(steps) && steps.length > 0;
    logTest(
      'Load Process Steps',
      passed,
      passed ? `Loaded ${steps.length} steps` : 'Failed to load steps'
    );
    return passed;
  } catch (error) {
    logTest('Load Process Steps', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Test 2: Load tooltips configuration
 */
export async function testLoadTooltips() {
  try {
    const tooltips = await loadTooltips();
    const passed = Array.isArray(tooltips) && tooltips.length > 0;
    logTest(
      'Load Tooltips',
      passed,
      passed ? `Loaded ${tooltips.length} tooltips` : 'Failed to load tooltips'
    );
    return passed;
  } catch (error) {
    logTest('Load Tooltips', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Test 3: Load defect scenarios configuration
 */
export async function testLoadDefectScenarios() {
  try {
    const scenarios = await loadDefectScenarios();
    const passed = Array.isArray(scenarios) && scenarios.length > 0;
    logTest(
      'Load Defect Scenarios',
      passed,
      passed ? `Loaded ${scenarios.length} scenarios` : 'Failed to load scenarios'
    );
    return passed;
  } catch (error) {
    logTest('Load Defect Scenarios', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Test 4: Verify caching works
 */
export async function testCaching() {
  try {
    // Clear cache first
    clearConfigCache();
    
    // First load
    const start1 = performance.now();
    await loadProcessSteps();
    const time1 = performance.now() - start1;
    
    // Second load (should be cached)
    const start2 = performance.now();
    await loadProcessSteps();
    const time2 = performance.now() - start2;
    
    const cacheStatus = getConfigCacheStatus();
    const isCached = cacheStatus['process-steps'] === true && time2 < time1;
    
    logTest(
      'Caching',
      isCached,
      isCached
        ? `First: ${time1.toFixed(2)}ms, Cached: ${time2.toFixed(2)}ms`
        : `Caching may not be working`
    );
    return isCached;
  } catch (error) {
    logTest('Caching', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Test 5: Verify cache clearing
 */
export async function testClearCache() {
  try {
    // Load something to populate cache
    await loadProcessSteps();
    
    const beforeClear = getConfigCacheStatus();
    clearConfigCache();
    const afterClear = getConfigCacheStatus();
    
    const passed = 
      beforeClear['process-steps'] === true &&
      afterClear['process-steps'] === false;
    
    logTest(
      'Clear Cache',
      passed,
      passed ? 'Cache cleared successfully' : 'Cache not cleared properly'
    );
    return passed;
  } catch (error) {
    logTest('Clear Cache', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Test 6: Verify validation works
 */
export async function testValidation() {
  try {
    const steps = await loadProcessSteps();
    
    // Check that loaded steps have required properties
    const firstStep = steps[0];
    const hasRequiredProps = 
      firstStep &&
      typeof firstStep.id === 'string' &&
      typeof firstStep.name === 'string' &&
      typeof firstStep.description === 'string' &&
      typeof firstStep.modelPath === 'string' &&
      firstStep.position &&
      typeof firstStep.position.x === 'number';
    
    logTest(
      'Validation',
      hasRequiredProps,
      hasRequiredProps ? 'Configuration validated correctly' : 'Validation failed'
    );
    return hasRequiredProps;
  } catch (error) {
    logTest('Validation', false, `Error: ${error}`);
    return false;
  }
}

/**
 * Run all tests
 */
export async function runAllTests() {
  console.log('%c=== Configuration Loader Tests ===', 'font-weight: bold; font-size: 14px');
  
  const results = await Promise.all([
    testLoadProcessSteps(),
    testLoadTooltips(),
    testLoadDefectScenarios(),
    testCaching(),
    testClearCache(),
    testValidation(),
  ]);
  
  const passed = results.filter(r => r).length;
  const total = results.length;
  
  console.log(
    `%c\n=== Results: ${passed}/${total} tests passed ===`,
    'font-weight: bold; font-size: 14px'
  );
  
  return passed === total;
}

// Auto-run tests if in browser console
if (typeof window !== 'undefined') {
  console.log('Configuration Loader Tests loaded. Run runAllTests() to execute.');
}
