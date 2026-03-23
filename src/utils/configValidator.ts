/**
 * Configuration Validator
 * 
 * Validates JSON configuration files against TypeScript interfaces.
 * This ensures runtime data matches the expected structure.
 * 
 * NOTE: For production use, prefer configLoader.ts which provides:
 * - In-memory caching
 * - Fallback to default content on validation failure
 * - Better error handling
 * 
 * This file provides the core validation functions used by configLoader.
 */

import type {
  ProcessStepConfig,
  TooltipConfig,
  SurfaceMapData,
  DefectScenario,
  DefectData,
} from './types';

/**
 * Validates a ProcessStepConfig object
 */
export function validateProcessStepConfig(config: unknown): config is ProcessStepConfig {
  if (typeof config !== 'object' || config === null) return false;
  
  const c = config as Record<string, unknown>;
  
  return (
    typeof c.id === 'string' &&
    typeof c.name === 'string' &&
    typeof c.description === 'string' &&
    typeof c.modelPath === 'string' &&
    typeof c.position === 'object' &&
    c.position !== null &&
    'x' in c.position &&
    'y' in c.position &&
    'z' in c.position
  );
}

/**
 * Validates a TooltipConfig object
 */
export function validateTooltipConfig(config: unknown): config is TooltipConfig {
  if (typeof config !== 'object' || config === null) return false;
  
  const c = config as Record<string, unknown>;
  
  return (
    typeof c.id === 'string' &&
    typeof c.title === 'string' &&
    typeof c.description === 'string' &&
    (c.position === undefined || 
     c.position === 'top' || 
     c.position === 'bottom' || 
     c.position === 'left' || 
     c.position === 'right')
  );
}

/**
 * Validates a DefectData object
 */
export function validateDefectData(defect: unknown): defect is DefectData {
  if (typeof defect !== 'object' || defect === null) return false;
  
  const d = defect as Record<string, unknown>;
  
  return (
    typeof d.id === 'string' &&
    typeof d.position === 'object' &&
    d.position !== null &&
    'x' in d.position &&
    'y' in d.position &&
    (d.type === 'particle' || d.type === 'scratch' || d.type === 'void' || d.type === 'residue') &&
    (d.severity === 'low' || d.severity === 'medium' || d.severity === 'high') &&
    typeof d.confidence === 'number'
  );
}

/**
 * Validates a DefectScenario object
 */
export function validateDefectScenario(scenario: unknown): scenario is DefectScenario {
  if (typeof scenario !== 'object' || scenario === null) return false;
  
  const s = scenario as Record<string, unknown>;
  
  return (
    typeof s.id === 'string' &&
    typeof s.name === 'string' &&
    Array.isArray(s.defects) &&
    s.defects.every(validateDefectData) &&
    typeof s.yieldImpact === 'object' &&
    s.yieldImpact !== null &&
    'before' in s.yieldImpact &&
    'after' in s.yieldImpact &&
    'improvement' in s.yieldImpact
  );
}

/**
 * Validates a SurfaceMapData object
 */
export function validateSurfaceMapData(data: unknown): data is SurfaceMapData {
  if (typeof data !== 'object' || data === null) return false;
  
  const d = data as Record<string, unknown>;
  
  return (
    typeof d.metadata === 'object' &&
    d.metadata !== null &&
    'width' in d.metadata &&
    'height' in d.metadata &&
    'resolution' in d.metadata &&
    'scanDate' in d.metadata &&
    Array.isArray(d.rawHeightData) &&
    Array.isArray(d.processedHeightData) &&
    typeof d.colorScale === 'object' &&
    d.colorScale !== null &&
    'min' in d.colorScale &&
    'max' in d.colorScale &&
    'gradient' in d.colorScale
  );
}

/**
 * Loads and validates process steps configuration
 */
export async function loadProcessSteps(): Promise<ProcessStepConfig[]> {
  const response = await fetch('/config/process-steps.json');
  const data = await response.json();
  
  if (!data.steps || !Array.isArray(data.steps)) {
    throw new Error('Invalid process steps configuration: missing steps array');
  }
  
  const invalidSteps = data.steps.filter((step: unknown) => !validateProcessStepConfig(step));
  if (invalidSteps.length > 0) {
    throw new Error(`Invalid process step configurations found: ${invalidSteps.length} steps`);
  }
  
  return data.steps as ProcessStepConfig[];
}

/**
 * Loads and validates tooltips configuration
 */
export async function loadTooltips(): Promise<TooltipConfig[]> {
  const response = await fetch('/config/tooltips.json');
  const data = await response.json();
  
  if (!data.tooltips || !Array.isArray(data.tooltips)) {
    throw new Error('Invalid tooltips configuration: missing tooltips array');
  }
  
  const invalidTooltips = data.tooltips.filter((tooltip: unknown) => !validateTooltipConfig(tooltip));
  if (invalidTooltips.length > 0) {
    throw new Error(`Invalid tooltip configurations found: ${invalidTooltips.length} tooltips`);
  }
  
  return data.tooltips as TooltipConfig[];
}

/**
 * Loads and validates defect scenarios configuration
 */
export async function loadDefectScenarios(): Promise<DefectScenario[]> {
  const response = await fetch('/config/defects.json');
  const data = await response.json();
  
  if (!data.scenarios || !Array.isArray(data.scenarios)) {
    throw new Error('Invalid defects configuration: missing scenarios array');
  }
  
  const invalidScenarios = data.scenarios.filter((scenario: unknown) => !validateDefectScenario(scenario));
  if (invalidScenarios.length > 0) {
    throw new Error(`Invalid defect scenario configurations found: ${invalidScenarios.length} scenarios`);
  }
  
  return data.scenarios as DefectScenario[];
}
