# Zustand Store Architecture

This directory contains all Zustand state management stores for the Semiconductor 3D Website.

## Store Organization

The application state is organized into logical slices:

### 1. UI Store (`uiStore.ts`)
Manages overall application UI state:
- **currentSection**: Current visible section (hero, process-flow, etc.)
- **loadingStatus**: Application loading state
- **loadingProgress**: Loading percentage (0-100)
- **audioEnabled**: User audio preference
- **reducedMotion**: Accessibility preference for reduced animations
- **isMobile**: Mobile device detection

**Persistence**: Audio preference and current section are persisted to localStorage.

### 2. Process Flow Store (`processFlowStore.ts`)
Manages the interactive manufacturing process pipeline:
- **expandedStepId**: Currently expanded manufacturing step (null if none)
- **completedSteps**: Set of step IDs the user has completed

**Persistence**: Completed steps are persisted to localStorage.

### 3. Simulation Stores (`simulationStores.ts`)
Contains four separate stores for interactive simulations:

#### Photolithography Store
- **playbackStatus**: Animation playback state (idle, playing, paused, completed)
- **timelinePosition**: Normalized timeline position (0-1)

#### WLI (White Light Interferometry) Store
- **isActive**: Whether the WLI visualization is active
- **scanProgress**: Normalized scan progress (0-1)

#### Surface Map Store
- **viewMode**: Display mode (raw or processed)
- **rotation**: 3D rotation angles (x, y, z)
- **zoom**: Camera zoom level (0.5-5)

#### Defect Overlay Store
- **currentScenarioIndex**: Active defect detection scenario
- **isScanning**: Whether scanning animation is active
- **scanProgress**: Normalized scan progress (0-1)

### 4. Performance Store (`performanceStore.ts`)
Monitors and adapts to device capabilities:
- **fps**: Current frames per second
- **gpuTier**: Detected GPU capability (low, medium, high)
- **effectsQuality**: Current effects quality level (low, medium, high, ultra)
- **metrics**: Detailed performance metrics (frameTime, drawCalls, triangleCount)

**Auto-adjustment**: Automatically reduces quality when FPS drops below 30.

## Usage Examples

### Basic Usage
```typescript
import { useUIStore } from '@/stores';

function MyComponent() {
  const currentSection = useUIStore((state) => state.currentSection);
  const setCurrentSection = useUIStore((state) => state.setCurrentSection);
  
  return (
    <button onClick={() => setCurrentSection('photolithography')}>
      Go to Photolithography
    </button>
  );
}
```

### Selective Subscription
```typescript
// Only re-render when audioEnabled changes
const audioEnabled = useUIStore((state) => state.audioEnabled);

// Subscribe to multiple values
const { fps, effectsQuality } = usePerformanceStore((state) => ({
  fps: state.fps,
  effectsQuality: state.effectsQuality,
}));
```

### Actions
```typescript
// UI actions
const { toggleAudio, setLoadingProgress } = useUIStore.getState();
toggleAudio();
setLoadingProgress(75);

// Process flow actions
const { expandStep, markStepComplete } = useProcessFlowStore.getState();
expandStep('photolithography');
markStepComplete('photolithography');

// Simulation actions
const { play, pause, seekTo } = usePhotolithographyStore.getState();
play();
seekTo(0.5);
pause();
```

## Design Principles

1. **Minimal Boilerplate**: Zustand provides a simple API without reducers or action types
2. **Selective Subscriptions**: Components only re-render when their selected state changes
3. **Type Safety**: Full TypeScript support with interfaces for all state and actions
4. **Persistence**: User preferences automatically saved to localStorage
5. **Performance**: Lightweight and fast, perfect for real-time 3D applications

## Requirements Mapping

This implementation satisfies the following requirements:
- **1.1**: Hero section state management
- **2.1**: Process flow interaction state
- **3.1**: Photolithography simulation state
- **4.1**: WLI visualization state
- **5.1**: Surface map interaction state
- **6.1**: Defect overlay state
- **13.5**: Performance monitoring and adaptive quality

## File Structure

```
src/stores/
├── index.ts                 # Central exports
├── uiStore.ts              # UI state slice
├── processFlowStore.ts     # Process flow state slice
├── simulationStores.ts     # All simulation state slices
├── performanceStore.ts     # Performance monitoring slice
└── README.md               # This file
```
