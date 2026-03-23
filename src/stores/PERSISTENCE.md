# Local Storage Persistence

This document describes the local storage persistence implementation for the Semiconductor 3D Website.

## Overview

The application uses Zustand's `persist` middleware to automatically save and restore user preferences and progress across browser sessions. All persistence operations include comprehensive error handling to ensure graceful degradation when localStorage is unavailable.

## Persisted Data

### UI Store (`ui-storage`)

**Persisted State:**
- `audioEnabled`: User's audio preference (boolean)
- `currentSection`: Last visited section (SectionId)

**Requirements Satisfied:**
- Requirement 11.5: Store the User's audio preference in browser local storage

**Storage Key:** `ui-storage`

### Process Flow Store (`process-flow-storage`)

**Persisted State:**
- `completedSteps`: Array of completed process step IDs

**Requirements Satisfied:**
- Requirement 15.1: Load Process_Step descriptions from a JSON configuration file (progress tracking)

**Storage Key:** `process-flow-storage`

**Special Handling:**
- `completedSteps` is stored as an array but rehydrated as a Set
- Custom merge function ensures proper Set reconstruction

## Architecture

### Persistence Utility (`src/utils/persistence.ts`)

Provides safe localStorage operations with error handling:

- `loadFromStorage<T>(key: string): T | null` - Safely reads and parses JSON from localStorage
- `saveToStorage<T>(key: string, value: T): boolean` - Safely writes JSON to localStorage
- `removeFromStorage(key: string): boolean` - Safely removes items from localStorage
- `isStorageAvailable(): boolean` - Checks if localStorage is available and functional
- `clearAppStorage(prefix: string): boolean` - Clears all app-specific storage

### Persistence Hook (`src/hooks/usePersistence.ts`)

Initializes persistence on app startup:

- Checks localStorage availability
- Logs rehydration status
- Sets up cross-tab synchronization via storage events
- Provides manual persist functions for debugging

### Store Configuration

Both stores use Zustand's `persist` middleware with:

1. **Custom Storage:** `createJSONStorage(() => localStorage)` with error handling
2. **Partialize:** Selects which state properties to persist
3. **Merge:** Custom merge logic for complex data types (Sets, Maps)
4. **onRehydrateStorage:** Callback for logging rehydration success/failure
5. **skipHydration:** Skips hydration if localStorage is unavailable

## Error Handling

### Storage Unavailable

If localStorage is not available (private browsing, disabled, etc.):
- `skipHydration: !isStorageAvailable()` prevents errors
- Application continues with default state
- Warning logged to console

### Quota Exceeded

If localStorage quota is exceeded:
- `saveToStorage` catches the error and returns `false`
- Error logged to console
- Application continues without persistence

### Invalid JSON

If stored data is corrupted:
- `loadFromStorage` catches parse errors and returns `null`
- Warning logged to console
- Store uses default state

### Cross-Tab Synchronization

Storage events are monitored to sync state across tabs:
- Changes in one tab trigger storage events in other tabs
- Zustand automatically updates state when storage changes
- Error handling prevents crashes from invalid events

## Usage

### Automatic Persistence

Persistence is automatic once configured. No manual intervention needed:

```typescript
// State changes are automatically persisted
useUIStore.getState().toggleAudio(); // Saved to localStorage
useProcessFlowStore.getState().markStepComplete('oxidation'); // Saved to localStorage
```

### Manual Testing

Use the test utilities to verify persistence:

```typescript
// In browser console
import { runAllTests } from './utils/__tests__/persistence.test';
runAllTests();

import { runAllIntegrationTests } from './stores/__tests__/persistence.integration.test';
runAllIntegrationTests();
```

### Debugging

Use the manual persist hook for debugging:

```typescript
import { useManualPersist } from './hooks/usePersistence';

function DebugComponent() {
  const { persistUIStore, persistProcessFlowStore } = useManualPersist();
  
  return (
    <button onClick={() => {
      persistUIStore();
      persistProcessFlowStore();
    }}>
      Force Save
    </button>
  );
}
```

## Testing

### Unit Tests

Located in `src/utils/__tests__/persistence.test.ts`:
- Tests all persistence utility functions
- Verifies error handling
- Tests edge cases (invalid JSON, non-existent keys)

### Integration Tests

Located in `src/stores/__tests__/persistence.integration.test.ts`:
- Tests store persistence end-to-end
- Verifies data serialization/deserialization
- Tests rehydration (requires page reload)

### Manual Testing

1. Open the application
2. Change audio preference (toggle audio)
3. Complete some process steps
4. Reload the page
5. Verify preferences and progress are restored

## Browser Compatibility

Persistence works in all modern browsers that support:
- localStorage API
- JSON.parse/stringify
- Storage events (for cross-tab sync)

Gracefully degrades in:
- Private/Incognito mode (may have limited storage)
- Browsers with localStorage disabled
- Environments without localStorage (SSR, Node.js)

## Performance

- Persistence operations are synchronous but fast (< 1ms typically)
- State changes trigger immediate saves (no debouncing needed for small data)
- Rehydration happens once on app initialization
- No performance impact on runtime after initialization

## Security

- Only stores non-sensitive user preferences
- No personal data or authentication tokens stored
- Data is stored in plain text (localStorage is not encrypted)
- Follows principle of least privilege (only necessary data persisted)

## Future Enhancements

Potential improvements for future iterations:

1. **Versioning:** Add version numbers to detect schema changes
2. **Migration:** Implement migration logic for breaking changes
3. **Compression:** Compress large data before storing
4. **IndexedDB:** Use IndexedDB for larger datasets
5. **Encryption:** Encrypt sensitive data before storing
6. **Debouncing:** Debounce rapid state changes to reduce writes
7. **Selective Sync:** Allow users to disable cross-tab sync
