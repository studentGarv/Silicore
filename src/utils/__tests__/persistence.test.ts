/**
 * Manual tests for persistence utility
 * 
 * These tests verify localStorage operations with error handling.
 * Run these in a browser console or add a test framework to automate.
 */

import {
  loadFromStorage,
  saveToStorage,
  removeFromStorage,
  isStorageAvailable,
  clearAppStorage,
} from '../persistence';

// Test data
interface TestData {
  name: string;
  value: number;
  nested: { key: string };
}

const testData: TestData = {
  name: 'test',
  value: 42,
  nested: { key: 'value' },
};

/**
 * Test: isStorageAvailable
 */
export function testIsStorageAvailable(): boolean {
  console.log('Testing isStorageAvailable...');
  const result = isStorageAvailable();
  console.log(`✓ Storage available: ${result}`);
  return result;
}

/**
 * Test: saveToStorage and loadFromStorage
 */
export function testSaveAndLoad(): boolean {
  console.log('Testing saveToStorage and loadFromStorage...');
  
  const key = 'test-key';
  
  // Save
  const saveResult = saveToStorage(key, testData);
  if (!saveResult) {
    console.error('✗ Failed to save data');
    return false;
  }
  console.log('✓ Data saved successfully');
  
  // Load
  const loadedData = loadFromStorage<TestData>(key);
  if (!loadedData) {
    console.error('✗ Failed to load data');
    return false;
  }
  
  // Verify
  if (
    loadedData.name === testData.name &&
    loadedData.value === testData.value &&
    loadedData.nested.key === testData.nested.key
  ) {
    console.log('✓ Data loaded and verified successfully');
    removeFromStorage(key);
    return true;
  } else {
    console.error('✗ Loaded data does not match original');
    return false;
  }
}

/**
 * Test: loadFromStorage with non-existent key
 */
export function testLoadNonExistent(): boolean {
  console.log('Testing loadFromStorage with non-existent key...');
  
  const result = loadFromStorage('non-existent-key');
  if (result === null) {
    console.log('✓ Correctly returned null for non-existent key');
    return true;
  } else {
    console.error('✗ Should have returned null');
    return false;
  }
}

/**
 * Test: removeFromStorage
 */
export function testRemove(): boolean {
  console.log('Testing removeFromStorage...');
  
  const key = 'test-remove-key';
  
  // Save first
  saveToStorage(key, testData);
  
  // Remove
  const removeResult = removeFromStorage(key);
  if (!removeResult) {
    console.error('✗ Failed to remove data');
    return false;
  }
  
  // Verify removal
  const loadedData = loadFromStorage(key);
  if (loadedData === null) {
    console.log('✓ Data removed successfully');
    return true;
  } else {
    console.error('✗ Data still exists after removal');
    return false;
  }
}

/**
 * Test: clearAppStorage
 */
export function testClearAppStorage(): boolean {
  console.log('Testing clearAppStorage...');
  
  // Save multiple items with prefix
  saveToStorage('semiconductor-test-1', { value: 1 });
  saveToStorage('semiconductor-test-2', { value: 2 });
  saveToStorage('other-test', { value: 3 });
  
  // Clear app storage
  const clearResult = clearAppStorage('semiconductor-');
  if (!clearResult) {
    console.error('✗ Failed to clear app storage');
    return false;
  }
  
  // Verify semiconductor items are cleared
  const item1 = loadFromStorage('semiconductor-test-1');
  const item2 = loadFromStorage('semiconductor-test-2');
  const item3 = loadFromStorage('other-test');
  
  if (item1 === null && item2 === null && item3 !== null) {
    console.log('✓ App storage cleared successfully (prefix-based)');
    removeFromStorage('other-test');
    return true;
  } else {
    console.error('✗ Clear operation did not work as expected');
    return false;
  }
}

/**
 * Test: Error handling with invalid JSON
 */
export function testInvalidJSON(): boolean {
  console.log('Testing error handling with invalid JSON...');
  
  const key = 'test-invalid-json';
  
  // Manually set invalid JSON
  try {
    localStorage.setItem(key, '{invalid json}');
  } catch {
    console.log('✓ Cannot test invalid JSON (localStorage not available)');
    return true;
  }
  
  // Try to load
  const result = loadFromStorage(key);
  
  // Clean up
  removeFromStorage(key);
  
  if (result === null) {
    console.log('✓ Correctly handled invalid JSON');
    return true;
  } else {
    console.error('✗ Should have returned null for invalid JSON');
    return false;
  }
}

/**
 * Run all tests
 */
export function runAllTests(): void {
  console.log('=== Running Persistence Utility Tests ===\n');
  
  const tests = [
    testIsStorageAvailable,
    testSaveAndLoad,
    testLoadNonExistent,
    testRemove,
    testClearAppStorage,
    testInvalidJSON,
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
}
