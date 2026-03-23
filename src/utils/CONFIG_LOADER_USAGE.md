# Configuration Loader Usage Guide

## Overview

The configuration loader provides async loading of JSON configuration files with:
- **JSON schema validation** for each config type
- **Fallback to default content** on validation failure
- **In-memory caching** to prevent redundant fetches
- **Error handling** with detailed logging

## Implementation Details

### Features

1. **Validation**: Each configuration item is validated against its TypeScript interface
2. **Caching**: Loaded configurations are cached in memory for subsequent requests
3. **Fallback**: If loading or validation fails, default content is returned
4. **Error Logging**: Detailed error messages help debug configuration issues

### API

```typescript
import {
  loadProcessSteps,
  loadTooltips,
  loadDefectScenarios,
  clearConfigCache,
  getConfigCacheStatus,
} from './utils/configLoader';

// Load configurations
const steps = await loadProcessSteps();
const tooltips = await loadTooltips();
const scenarios = await loadDefectScenarios();

// Clear cache (useful for testing or forcing reload)
clearConfigCache();

// Check cache status
const status = getConfigCacheStatus();
// Returns: { 'process-steps': true, 'tooltips': true, 'defect-scenarios': false }
```

## Usage Examples

### Example 1: Load Configuration on App Initialization

```typescript
// In your App.tsx or main component
import { useEffect, useState } from 'react';
import { loadProcessSteps, loadTooltips } from './utils/configLoader';
import type { ProcessStepConfig, TooltipConfig } from './utils/types';

function App() {
  const [processSteps, setProcessSteps] = useState<ProcessStepConfig[]>([]);
  const [tooltips, setTooltips] = useState<TooltipConfig[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadConfigs() {
      try {
        const [steps, tips] = await Promise.all([
          loadProcessSteps(),
          loadTooltips(),
        ]);
        
        setProcessSteps(steps);
        setTooltips(tips);
      } catch (error) {
        console.error('Failed to load configurations:', error);
      } finally {
        setLoading(false);
      }
    }

    loadConfigs();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Your app content */}
    </div>
  );
}
```

### Example 2: Lazy Load Configuration for Specific Section

```typescript
// In a section component that needs defect scenarios
import { useEffect, useState } from 'react';
import { loadDefectScenarios } from './utils/configLoader';
import type { DefectScenario } from './utils/types';

function SurfaceMapSection() {
  const [scenarios, setScenarios] = useState<DefectScenario[]>([]);

  useEffect(() => {
    // Only load when this section is mounted
    loadDefectScenarios().then(setScenarios);
  }, []);

  return (
    <div>
      {scenarios.map(scenario => (
        <div key={scenario.id}>{scenario.name}</div>
      ))}
    </div>
  );
}
```

### Example 3: Using with Zustand Store

```typescript
// In your store
import { create } from 'zustand';
import { loadProcessSteps } from './utils/configLoader';
import type { ProcessStepConfig } from './utils/types';

interface ConfigState {
  processSteps: ProcessStepConfig[];
  loadProcessSteps: () => Promise<void>;
}

export const useConfigStore = create<ConfigState>((set) => ({
  processSteps: [],
  
  loadProcessSteps: async () => {
    const steps = await loadProcessSteps();
    set({ processSteps: steps });
  },
}));
```

## Validation Behavior

### Valid Configuration
If all items in the configuration file pass validation:
- All valid items are returned
- Configuration is cached for future requests
- No console warnings

### Partially Invalid Configuration
If some items fail validation:
- Valid items are returned
- Invalid items are logged to console with details
- Configuration is cached with only valid items
- Application continues with partial data

### Completely Invalid Configuration
If no items pass validation or file is missing:
- Default fallback content is returned
- Error is logged to console
- Warning message indicates fallback is being used
- Application continues with minimal default data

## Default Fallback Content

### Process Steps
```typescript
[
  {
    id: 'wafer-manufacturing',
    name: 'Wafer Manufacturing',
    description: 'Silicon ingots are sliced into thin wafers.',
    position: { x: 0, y: 0, z: 0 },
    modelPath: '/models/wafer-manufacturing.glb',
  }
]
```

### Tooltips
```typescript
[
  {
    id: 'default-tooltip',
    title: 'Information',
    description: 'Tooltip content unavailable',
  }
]
```

### Defect Scenarios
```typescript
[
  {
    id: 'default-scenario',
    name: 'Default Scenario',
    defects: [],
    yieldImpact: {
      before: 0,
      after: 0,
      improvement: 'No data available',
    },
  }
]
```

## Testing

### Manual Browser Test
1. Start the dev server: `npm run dev`
2. Navigate to `/src/utils/__tests__/configLoader.manual-test.html`
3. Run each test to verify:
   - Configuration loading
   - Validation
   - Caching
   - Fallback behavior
   - Cache clearing

### Console Testing
```typescript
// In browser console
import { loadProcessSteps, getConfigCacheStatus } from './utils/configLoader';

// Load and inspect
const steps = await loadProcessSteps();
console.log(steps);

// Check cache
console.log(getConfigCacheStatus());
```

## Requirements Satisfied

✅ **Requirement 15.4**: Configuration file structure validated on initialization
- Each configuration type has schema validation
- Invalid items are detected and logged
- Validation happens automatically on load

✅ **Requirement 15.5**: Fallback to default content if invalid
- Default configurations defined for each type
- Automatic fallback on validation failure
- Application never crashes due to bad config

## Additional Features

- **In-memory caching**: Prevents redundant network requests
- **Detailed error logging**: Helps debug configuration issues
- **Type safety**: Full TypeScript support with proper types
- **Extensible**: Easy to add new configuration types
