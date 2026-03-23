import { create } from 'zustand';

// Photolithography Simulation State
export type PlaybackStatus = 'idle' | 'playing' | 'paused' | 'completed';

export interface PhotolithographyState {
  // State
  playbackStatus: PlaybackStatus;
  timelinePosition: number; // 0-1 normalized timeline position
  
  // Actions
  play: () => void;
  pause: () => void;
  reset: () => void;
  seekTo: (position: number) => void;
  setPlaybackStatus: (status: PlaybackStatus) => void;
}

export const usePhotolithographyStore = create<PhotolithographyState>((set) => ({
  // Initial state
  playbackStatus: 'idle',
  timelinePosition: 0,

  // Actions
  play: () => set({ playbackStatus: 'playing' }),
  pause: () => set({ playbackStatus: 'paused' }),
  reset: () => set({ playbackStatus: 'idle', timelinePosition: 0 }),
  seekTo: (position) => set({ timelinePosition: Math.min(1, Math.max(0, position)) }),
  setPlaybackStatus: (status) => set({ playbackStatus: status }),
}));

// White Light Interferometry (WLI) State
export interface WLIState {
  // State
  isActive: boolean;
  scanProgress: number; // 0-1 normalized scan progress
  
  // Actions
  startScanning: () => void;
  stopScanning: () => void;
  updateScanProgress: (progress: number) => void;
  resetScan: () => void;
}

export const useWLIStore = create<WLIState>((set) => ({
  // Initial state
  isActive: false,
  scanProgress: 0,

  // Actions
  startScanning: () => set({ isActive: true }),
  stopScanning: () => set({ isActive: false }),
  updateScanProgress: (progress) => set({ scanProgress: Math.min(1, Math.max(0, progress)) }),
  resetScan: () => set({ isActive: false, scanProgress: 0 }),
}));

// Surface Map State
export type ViewMode = 'raw' | 'processed';

export interface Vector3 {
  x: number;
  y: number;
  z: number;
}

export interface SurfaceMapState {
  // State
  viewMode: ViewMode;
  rotation: Vector3;
  zoom: number;
  
  // Actions
  setViewMode: (mode: ViewMode) => void;
  toggleViewMode: () => void;
  setRotation: (rotation: Vector3) => void;
  updateRotation: (delta: Partial<Vector3>) => void;
  setZoom: (zoom: number) => void;
  resetCamera: () => void;
}

const DEFAULT_ROTATION: Vector3 = { x: 0, y: 0, z: 0 };
const DEFAULT_ZOOM = 1;

export const useSurfaceMapStore = create<SurfaceMapState>((set) => ({
  // Initial state
  viewMode: 'raw',
  rotation: DEFAULT_ROTATION,
  zoom: DEFAULT_ZOOM,

  // Actions
  setViewMode: (mode) => set({ viewMode: mode }),
  toggleViewMode: () => set((state) => ({ viewMode: state.viewMode === 'raw' ? 'processed' : 'raw' })),
  setRotation: (rotation) => set({ rotation }),
  updateRotation: (delta) =>
    set((state) => ({
      rotation: {
        x: state.rotation.x + (delta.x || 0),
        y: state.rotation.y + (delta.y || 0),
        z: state.rotation.z + (delta.z || 0),
      },
    })),
  setZoom: (zoom) => set({ zoom: Math.min(5, Math.max(0.5, zoom)) }),
  resetCamera: () => set({ rotation: DEFAULT_ROTATION, zoom: DEFAULT_ZOOM }),
}));

// Defect Overlay State
export interface DefectOverlayState {
  // State
  currentScenarioIndex: number;
  isScanning: boolean;
  scanProgress: number; // 0-1 normalized scan progress
  
  // Actions
  nextScenario: () => void;
  previousScenario: () => void;
  setScenario: (index: number) => void;
  startScanning: () => void;
  stopScanning: () => void;
  updateScanProgress: (progress: number) => void;
  resetScan: () => void;
}

export const useDefectOverlayStore = create<DefectOverlayState>((set) => ({
  // Initial state
  currentScenarioIndex: 0,
  isScanning: false,
  scanProgress: 0,

  // Actions
  nextScenario: () => set((state) => ({ currentScenarioIndex: state.currentScenarioIndex + 1 })),
  previousScenario: () =>
    set((state) => ({
      currentScenarioIndex: Math.max(0, state.currentScenarioIndex - 1),
    })),
  setScenario: (index) => set({ currentScenarioIndex: Math.max(0, index) }),
  startScanning: () => set({ isScanning: true }),
  stopScanning: () => set({ isScanning: false }),
  updateScanProgress: (progress) => set({ scanProgress: Math.min(1, Math.max(0, progress)) }),
  resetScan: () => set({ isScanning: false, scanProgress: 0 }),
}));
