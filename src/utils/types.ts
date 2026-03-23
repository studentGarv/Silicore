// Central type definitions for the Semiconductor 3D Website

// Re-export store types for convenience
export type {
  // UI Store
  UIState,
  SectionId,
  LoadingStatus,
  
  // Process Flow Store
  ProcessFlowState,
  ProcessStepId,
  
  // Simulation Stores
  PhotolithographyState,
  WLIState,
  SurfaceMapState,
  DefectOverlayState,
  PlaybackStatus,
  ViewMode,
  Vector3,
  
  // Performance Store
  PerformanceState,
  PerformanceMetrics,
  GPUTier,
  EffectsQuality,
} from '../stores';

// Configuration Types
export interface ProcessStepConfig {
  id: string;
  name: string;
  description: string;
  detailedInfo?: string;
  position: { x: number; y: number; z: number };
  modelPath: string;
  animation?: {
    type: string;
    duration: number;
    easing?: string;
  };
  effects?: {
    glow?: boolean;
    scanLines?: boolean;
    particles?: boolean;
  };
}

export interface TooltipConfig {
  id: string;
  title: string;
  description: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface SurfaceMapData {
  metadata: {
    width: number;
    height: number;
    resolution: number; // nanometers
    scanDate: string;
  };
  rawHeightData: number[][];
  processedHeightData: number[][];
  colorScale: {
    min: number;
    max: number;
    gradient: string[];
  };
}

export interface DefectData {
  id: string;
  position: { x: number; y: number };
  type: 'particle' | 'scratch' | 'void' | 'residue';
  severity: 'low' | 'medium' | 'high';
  confidence: number; // 0-1
}

export interface DefectScenario {
  id: string;
  name: string;
  defects: DefectData[];
  yieldImpact: {
    before: number;
    after: number;
    improvement: string;
  };
}

// Asset Types
export interface AssetMetadata {
  url: string;
  status: 'pending' | 'loading' | 'loaded' | 'error';
  priority: 'critical' | 'high' | 'low';
  size?: number;
  format?: string;
}

export interface ModelAsset extends AssetMetadata {
  type: 'model';
  format: 'gltf' | 'glb';
}

export interface TextureAsset extends AssetMetadata {
  type: 'texture';
  format: 'jpg' | 'png' | 'webp' | 'ktx2';
  compressed?: boolean;
}

export interface AudioAsset extends AssetMetadata {
  type: 'audio';
  format: 'mp3' | 'ogg' | 'wav';
  volume?: number;
}

// Animation Types
export interface AnimationTimeline {
  id: string;
  duration: number;
  progress: number; // 0-1
  isPlaying: boolean;
  loop?: boolean;
}

export interface ScrollTriggerConfig {
  trigger: string;
  start: string;
  end: string;
  scrub?: boolean | number;
  pin?: boolean;
  onEnter?: () => void;
  onLeave?: () => void;
  onUpdate?: (progress: number) => void;
}
