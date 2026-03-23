/**
 * Configuration Loader with Validation and Caching
 * 
 * Provides async configuration loading with JSON schema validation,
 * fallback to default content on validation failure, and in-memory caching.
 * 
 * Implements Requirements 15.4 and 15.5:
 * - 15.4: Validates configuration file structure on initialization
 * - 15.5: Falls back to default content if configuration is invalid
 */

import type {
  ProcessStepConfig,
  TooltipConfig,
  DefectScenario,
} from './types';

import {
  validateProcessStepConfig,
  validateTooltipConfig,
  validateDefectScenario,
} from './configValidator';

// Configuration cache
const configCache = new Map<string, unknown>();

// Default fallback configurations
const DEFAULT_PROCESS_STEPS: ProcessStepConfig[] = [
  {
    id: 'wafer-manufacturing',
    name: 'Wafer Manufacturing',
    description: 'Silicon ingots are sliced into thin wafers.',
    position: { x: 0, y: 0, z: 0 },
    modelPath: '/models/wafer-manufacturing.glb',
  },
];

const DEFAULT_TOOLTIPS: TooltipConfig[] = [
  {
    id: 'default-tooltip',
    title: 'Information',
    description: 'Tooltip content unavailable',
  },
];

const DEFAULT_DEFECT_SCENARIOS: DefectScenario[] = [
  {
    id: 'default-scenario',
    name: 'Default Scenario',
    defects: [],
    yieldImpact: {
      before: 0,
      after: 0,
      improvement: 'No data available',
    },
  },
];

/**
 * Generic configuration loader with validation and caching
 */
async function loadConfig<T>(
  url: string,
  cacheKey: string,
  validator: (item: unknown) => boolean,
  arrayKey: string,
  defaultValue: T[]
): Promise<T[]> {
  // Check cache first
  if (configCache.has(cacheKey)) {
    return configCache.get(cacheKey) as T[];
  }

  try {
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
      console.warn(`Using default ${cacheKey} configuration`);
      return defaultValue;
    }

    const data = await response.json();

    // Validate structure
    if (!data[arrayKey] || !Array.isArray(data[arrayKey])) {
      console.error(`Invalid ${cacheKey} configuration: missing ${arrayKey} array`);
      console.warn(`Using default ${cacheKey} configuration`);
      return defaultValue;
    }

    // Validate each item
    const items = data[arrayKey] as unknown[];
    const validItems: T[] = [];
    const invalidItems: unknown[] = [];

    for (const item of items) {
      if (validator(item)) {
        validItems.push(item as T);
      } else {
        invalidItems.push(item);
      }
    }

    // Log validation results
    if (invalidItems.length > 0) {
      console.error(
        `Found ${invalidItems.length} invalid items in ${cacheKey} configuration`,
        invalidItems
      );
    }

    // If no valid items, use default
    if (validItems.length === 0) {
      console.error(`No valid items found in ${cacheKey} configuration`);
      console.warn(`Using default ${cacheKey} configuration`);
      return defaultValue;
    }

    // Cache the valid configuration
    configCache.set(cacheKey, validItems);
    
    return validItems;
  } catch (error) {
    console.error(`Error loading ${cacheKey} configuration:`, error);
    console.warn(`Using default ${cacheKey} configuration`);
    return defaultValue;
  }
}

/**
 * Loads and validates process steps configuration
 * Falls back to default content on validation failure
 */
export async function loadProcessSteps(): Promise<ProcessStepConfig[]> {
  return loadConfig<ProcessStepConfig>(
    '/config/process-steps.json',
    'process-steps',
    validateProcessStepConfig,
    'steps',
    DEFAULT_PROCESS_STEPS
  );
}

/**
 * Loads and validates tooltips configuration
 * Falls back to default content on validation failure
 */
export async function loadTooltips(): Promise<TooltipConfig[]> {
  return loadConfig<TooltipConfig>(
    '/config/tooltips.json',
    'tooltips',
    validateTooltipConfig,
    'tooltips',
    DEFAULT_TOOLTIPS
  );
}

/**
 * Loads and validates defect scenarios configuration
 * Falls back to default content on validation failure
 */
export async function loadDefectScenarios(): Promise<DefectScenario[]> {
  return loadConfig<DefectScenario>(
    '/config/defects.json',
    'defect-scenarios',
    validateDefectScenario,
    'scenarios',
    DEFAULT_DEFECT_SCENARIOS
  );
}

/**
 * Clears the configuration cache
 * Useful for testing or forcing a reload
 */
export function clearConfigCache(): void {
  configCache.clear();
}

/**
 * Gets the current cache status
 * Useful for debugging
 */
export function getConfigCacheStatus(): Record<string, boolean> {
  return {
    'process-steps': configCache.has('process-steps'),
    'tooltips': configCache.has('tooltips'),
    'defect-scenarios': configCache.has('defect-scenarios'),
  };
}
