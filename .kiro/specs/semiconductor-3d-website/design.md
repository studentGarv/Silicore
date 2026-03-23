# Design Document: Semiconductor 3D Website

## Overview

This design document specifies the technical architecture for an interactive 3D educational website that teaches semiconductor IC manufacturing processes. The application delivers an immersive learning experience through 3D visualizations, scroll-based storytelling, and interactive simulations.

### Technology Stack

- **Frontend Framework**: React 18+ with TypeScript for type safety and component-based architecture
- **3D Rendering**: React Three Fiber (R3F) + Three.js for declarative WebGL rendering
- **Animation**: GSAP (GreenSock Animation Platform) for scroll-based animations, Framer Motion for UI transitions
- **State Management**: Zustand for lightweight, performant state management
- **Styling**: Tailwind CSS with custom theme extensions for rapid UI development
- **Build Tool**: Vite for fast development and optimized production builds
- **3D Model Format**: GLTF/GLB for optimized 3D asset delivery

### Design Principles

1. **Performance First**: Maintain 30+ FPS across all interactions through lazy loading, Level of Detail (LOD), and GPU optimization
2. **Progressive Enhancement**: Core educational content accessible without WebGL, enhanced with 3D when available
3. **Modular Architecture**: Isolated components for each manufacturing step and visualization type
4. **Declarative 3D**: Leverage R3F's declarative approach to manage Three.js complexity
5. **Responsive by Default**: Mobile-first design with touch-optimized interactions

## Visual Design and Layout

### Hero Section - "Inside Semiconductor Manufacturing"

**Visual Composition**:
- Full viewport height (100vh) dark background with deep space aesthetic
- Large hero title "Inside Semiconductor Manufacturing" positioned in upper left
  - "Inside" in white, "Semiconductor Manufacturing" in bold white
  - Subtitle "From Wafer to Microchip" below in smaller cyan text
- Prominent 3D rotating silicon wafer in center-right, taking up 50% of viewport
  - Wafer rendered with realistic metallic surface showing circuit patterns
  - Glowing cyan and purple edge lighting
  - Floating in space with subtle rotation animation
  - Surrounded by floating particle effects (small glowing dots)
- "Explore Process" button in upper left with arrow icon, glassmorphism style
- Curved flowing lines connecting from wafer to bottom of screen
- Smooth gradient background from dark blue-black at top to pure black at bottom

**3D Wafer Details**:
- Circular silicon wafer with visible die grid pattern on surface
- Reflective metallic material with blue/purple environmental reflections
- Glowing cyan rim light around edge
- Gentle continuous rotation (Y-axis, ~10 seconds per rotation)
- Depth of field effect making background particles slightly blurred

### Process Flow Section - Manufacturing Steps

**Visual Composition**:
- Horizontal scrollable timeline showing 8 manufacturing steps
- Each step represented as a 3D isometric icon/model on a dark platform
- Steps arranged in a line from left to right with connecting flow lines
- Current/selected step highlighted with bright cyan glow
- Other steps dimmed with subtle purple accent lighting

**Individual Step Cards** (8 total):
1. **Wafer Manufacturing**: Cylindrical ingot being sliced
2. **Oxidation**: Wafer in furnace with heat glow
3. **Photolithography**: UV light projecting onto wafer (highlighted in image)
4. **Etching**: Plasma chamber with wafer inside
5. **Deposition & Ion Implantation**: Particle beam hitting wafer surface
6. **Metal Wiring**: Layered wafer showing metal interconnects
7. **Electrical Die Sorting**: Probe testing individual dies
8. **Packaging**: Completed chip in protective package

**Step Card Design**:
- 3D model floating above dark platform with cyan edge glow
- Step name label below in white text
- Glassmorphism card background when expanded
- Hover effect: model lifts slightly, glow intensifies
- Click to expand: card grows, shows detailed description panel

### Photolithography Deep Dive Section

**Visual Composition**:
- Section title "Photolithography Deep Dive" in upper left with cyan accent
- Large 3D visualization showing the photolithography process
- Left side: Equipment setup (UV light source, photomask, wafer stage)
- Right side: Close-up view of pattern transfer in action

**3D Equipment Visualization**:
- UV light source at top emitting bright cyan beam downward
- Photomask (rectangular plate with circuit pattern) suspended in middle
- Silicon wafer on stage at bottom
- Light rays visible passing through mask creating pattern
- Animated: light pulses, pattern gradually appears on wafer surface

**Interactive Controls**:
- "Learn More" button with arrow icon
- Progress bar showing animation timeline
- Play/pause controls
- Text overlay: "Controls UV light exposure and pattern transfer onto the silicon wafer"

**Visual Effects**:
- Volumetric light rays from UV source
- Glowing photoresist on wafer surface where exposed
- Particle effects around light beam
- Scan lines moving across wafer during exposure

### White Light Interferometry Section

**Visual Composition**:
- Section title "Advanced Chip Inspection: White Light Interferometry"
- Split layout: Left shows 3D interferometer setup, Right shows results

**Left Side - Interferometer Setup**:
- 3D model of WLI equipment with labeled components
- Light source at top with beam splitter
- Reference mirror on one path, wafer on measurement path
- Animated light beams showing split and recombination
- Interference fringes visualization (colorful wave patterns)

**Feature Callouts** (floating badges):
- "Non-contact measurement" with checkmark icon
- "Nanometer resolution" with precision icon  
- "3D surface mapping" with grid icon

**Right Side - Surface Visualization**:
- 3D height map of wafer surface
- Color-coded elevation (blue = low, red = high)
- Smooth gradient showing surface topology
- Defects visible as anomalies in height map
- Rotating slowly to show 3D perspective

**Visual Effects**:
- Animated interference fringes (rainbow wave patterns)
- Light beams with glow effect
- Pulsing highlights on measurement points
- Smooth color transitions on height map

### 3D Surface Visualization Section

**Visual Composition**:
- Section title "3D Surface Visualization" in upper left
- Toggle buttons in upper right: "Raw Surface" and "Processed Map"
- Large interactive 3D height map taking up most of viewport

**Left Side - 3D Height Map**:
- Wafer surface rendered as 3D mesh with height variations
- Color gradient from blue (valleys) through green/yellow to red (peaks)
- Visible grid lines showing measurement resolution
- Defect areas highlighted with glowing red/orange markers
- User can rotate and zoom with mouse/touch

**Right Side - Defect Detection Overlay**:
- Same wafer view with AI-style scanning overlay
- Animated scan lines moving across surface
- Detected defects marked with circles and labels
- Defect severity indicated by color (yellow = low, orange = medium, red = high)
- Statistics panel showing defect count and yield impact

**Interactive Controls**:
- View mode toggle (Raw/Processed)
- Rotation controls (orbit camera)
- Zoom slider
- Reset view button
- Defect filter checkboxes

**Visual Effects**:
- Smooth color interpolation on height map
- Pulsing glow on defect markers
- Animated scanning grid overlay
- Particle effects on high-severity defects
- Smooth camera transitions when rotating

### Common UI Elements Across All Sections

**Navigation**:
- Fixed header with logo and section links (fades in on scroll)
- Progress indicator showing current section
- Smooth scroll to section on click

**Glassmorphism Panels**:
- Semi-transparent dark background (rgba(20, 20, 40, 0.6))
- Backdrop blur effect (20px)
- Subtle cyan border glow (1px, 50% opacity)
- Rounded corners (12px border-radius)
- Inner shadow for depth

**Buttons**:
- Primary: Cyan background with white text, glow effect on hover
- Secondary: Transparent with cyan border, fills on hover
- Icon buttons: Circular with glassmorphism, icon in center

**Tooltips**:
- Small glassmorphism cards appearing on hover
- Cyan accent border on left side
- White title text, gray description text
- Smooth fade-in animation (200ms)

**Loading States**:
- Animated chip assembly visualization
- Progress bar with percentage
- Glowing particles assembling into chip shape
- Cyan and purple color scheme


## Architecture

### High-Level Architecture

The application follows a layered component-based architecture with clear separation of concerns:

- **Presentation Layer**: React components handle UI rendering, layout, and user interactions
- **3D Rendering Layer**: React Three Fiber components manage WebGL scenes and 3D objects
- **Animation Layer**: GSAP timelines control scroll-based animations, Framer Motion handles UI transitions
- **State Layer**: Zustand stores manage application state with minimal boilerplate
- **Data Layer**: JSON configuration files provide content that can be updated without code changes

**Architecture Diagram:**
```
┌─────────────────────────────────────────────────────────┐
│                     React App Root                       │
├─────────────────────────────────────────────────────────┤
│  ┌───────────────┐  ┌──────────────┐  ┌──────────────┐ │
│  │  UI Layer     │  │  3D Layer    │  │  State Layer │ │
│  │  (Components) │◄─┤  (R3F/Three) │◄─┤  (Zustand)   │ │
│  └───────────────┘  └──────────────┘  └──────────────┘ │
│         ▲                  ▲                  ▲          │
│         │                  │                  │          │
│  ┌──────┴──────────────────┴──────────────────┴──────┐  │
│  │           Animation Controller (GSAP)             │  │
│  └───────────────────────────────────────────────────┘  │
│         ▲                                                │
│         │                                                │
│  ┌──────┴──────────────────────────────────────────┐   │
│  │         Scroll Observer (Intersection API)       │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

### Rendering Pipeline

The application follows three main rendering flows:

1. **Initial Load Flow**: 
   - Display loading screen with chip assembly animation
   - Preload critical assets (hero section models, textures)
   - Update loading progress indicator
   - Reveal hero section with fade-in transition

2. **Scroll-Based Progression Flow**: 
   - User scrolls → Intersection Observer detects section visibility
   - GSAP ScrollTrigger updates timeline progress
   - State updates trigger React re-renders
   - R3F updates 3D scene transforms
   - WebGL renders updated frame

3. **Interactive Sections Flow**: 
   - User interacts (click, drag, slider)
   - Event handler captures input
   - State management updates relevant slice
   - Animation system triggers appropriate timeline
   - 3D scene updates in response
   - Visual feedback rendered

### State Management Architecture

The application uses Zustand for state management, organized into logical slices:

**UI State Slice**: Manages overall application UI state including current section, loading status, audio preferences, reduced motion settings, and mobile detection.

**Process Flow State Slice**: Tracks which manufacturing step is expanded, which steps have been completed by the user, and handles step expansion/collapse logic.

**Simulation State Slices**: Each interactive simulation (photolithography, WLI, surface map, defect overlay) has its own state slice managing playback status, timeline position, view modes, and interaction states.

**Performance State Slice**: Monitors FPS, GPU tier detection, and dynamically adjusts effects quality based on device capabilities.


## Component Architecture

### Core Component Hierarchy

The application is organized into a tree of specialized components:

```
App (Root)
├── LoadingScreen
├── CustomCursor
├── AudioController
├── ScrollContainer
│   ├── HeroSection
│   │   ├── WaferModel3D
│   │   ├── ParticleSystem
│   │   └── ScrollIndicator
│   ├── ProcessFlowSection
│   │   ├── ProcessPipeline3D
│   │   └── ProcessStepCard (×8)
│   │       ├── StepModel3D
│   │       ├── StepAnimation
│   │       └── StepDescription
│   ├── PhotolithographySection
│   │   ├── PhotolithographySimulator
│   │   │   ├── UVLightSource3D
│   │   │   ├── MaskLayer3D
│   │   │   ├── WaferSurface3D
│   │   │   └── SimulationControls
│   │   └── TooltipOverlay
│   ├── WLISection
│   │   ├── WLIVisualizer
│   │   │   ├── InterferometerSetup3D
│   │   │   ├── LightBeamAnimation
│   │   │   └── InterferencePattern3D
│   │   └── TooltipOverlay
│   ├── SurfaceMapSection
│   │   ├── SurfaceMapRenderer
│   │   │   ├── HeightMapMesh3D
│   │   │   └── OrbitControls
│   │   ├── ViewModeToggle
│   │   └── DefectOverlay
│   └── FooterSection
└── AudioToggle
```

### Component Descriptions

#### App (Root Component)
The main application container that initializes the state management, loads configuration files, sets up global event listeners, and renders the top-level layout. It handles initial asset preloading and manages the loading screen visibility.

#### LoadingScreen Component
Displays an animated chip assembly visualization while critical assets load. Shows loading progress as a percentage and includes a timeout message if loading exceeds 10 seconds. Fades out smoothly once loading completes.

#### CustomCursor Component
Renders a custom glowing cursor effect that follows the mouse pointer. Increases glow intensity when hovering over interactive elements and adds a trailing effect. Automatically disabled on touch devices.

#### AudioController Component
Manages audio playback for interaction sound effects. Loads audio files, controls volume levels, and respects user audio preferences stored in local storage. Provides methods for playing click, transition, and ambient sounds.

#### ScrollContainer Component
The main scrollable container that wraps all content sections. Integrates with GSAP ScrollTrigger to manage scroll-based animations and section transitions. Implements smooth scrolling with snap points at section boundaries.

#### HeroSection Component
The landing section featuring the main 3D wafer visualization. Handles scroll-based parallax effects and transitions to the next section. Contains the title, subtitle, and animated scroll indicator.

**WaferModel3D**: Renders a 3D silicon wafer model that continuously rotates. Responds to scroll progress by adjusting rotation speed and opacity. Uses LOD (Level of Detail) to maintain performance.

**ParticleSystem**: Generates and animates particle effects representing atoms or electrons around the wafer. Uses instanced rendering for performance with hundreds of particles.

**ScrollIndicator**: An animated arrow or icon that prompts users to scroll. Includes bounce animation and click handler to smoothly scroll to the next section.

#### ProcessFlowSection Component
Displays the 8-step semiconductor manufacturing process as an interactive 3D pipeline. Manages step expansion state and handles click-outside-to-collapse logic.

**ProcessPipeline3D**: Renders the 3D pipeline structure connecting all manufacturing steps. Positions step nodes in 3D space (horizontal or vertical layout) and handles camera positioning.

**ProcessStepCard**: Individual step component that can expand to show detailed information. Each of the 8 steps (Wafer Manufacturing, Oxidation, Photolithography, Etching, Deposition & Ion Implantation, Metal Wiring, Electrical Die Sorting, Packaging) is represented by one card.

- **StepModel3D**: The 3D model representing the specific manufacturing step
- **StepAnimation**: Plays step-specific animations (rotation, scaling, custom sequences) when expanded
- **StepDescription**: Text panel with glassmorphism styling showing step explanation

#### PhotolithographySection Component
An interactive deep-dive into the photolithography process with controllable simulation.

**PhotolithographySimulator**: The main simulation component managing the UV light projection and pattern transfer animation.

- **UVLightSource3D**: 3D representation of the UV light source with animated intensity
- **MaskLayer3D**: The photomask layer positioned above the wafer, showing circuit patterns
- **WaferSurface3D**: The wafer surface that receives the pattern transfer, with animated photoresist exposure
- **SimulationControls**: UI controls for play/pause and timeline scrubbing with a slider

**TooltipOverlay**: Displays contextual tooltips when hovering over simulation elements, explaining each component's function.

#### WLISection Component
Visualizes White Light Interferometry inspection technology.

**WLIVisualizer**: The main WLI visualization component showing the interferometer setup and operation.

- **InterferometerSetup3D**: 3D model of the interferometer including light source, beam splitter, reference mirror, and wafer stage
- **LightBeamAnimation**: Animated light beams showing the split between reference and measurement paths, with reflection visualization
- **InterferencePattern3D**: Visual representation of interference fringes forming as the scanner moves vertically

**TooltipOverlay**: Provides tooltips for "Non-contact measurement", "Nanometer resolution", and "3D surface mapping" when hovering over relevant components.

#### SurfaceMapSection Component
Displays interactive 3D height maps of wafer surfaces.

**SurfaceMapRenderer**: The main renderer for the 3D height map visualization.

- **HeightMapMesh3D**: A mesh generated from height data, using color gradients (blue to red) to represent elevation differences. Supports both raw and processed data modes.
- **OrbitControls**: Enables user interaction for rotating and zooming the 3D height map using mouse/touch gestures

**ViewModeToggle**: UI toggle switch to alternate between "Raw surface" and "Processed map" visualization modes.

**DefectOverlay**: AI-style overlay showing defect detection with scanning line animations, defect markers with pulsing glow effects, and yield improvement insights displayed as text overlays.

#### FooterSection Component
Simple footer with credits, links, and additional information about the educational content.

#### AudioToggle Component
A persistent UI control (typically in a corner) that allows users to enable/disable sound effects. Displays current audio state and persists preference to local storage.


## Data Models and Configuration

### Configuration System

The application uses JSON configuration files to separate content from code, enabling updates without redeployment.

#### Process Steps Configuration
Defines the 8 manufacturing steps with metadata including:
- Step identification (ID, name)
- Educational content (description, detailed information)
- 3D positioning coordinates for pipeline layout
- Model file paths for 3D assets
- Animation specifications (type, duration, easing function)
- Visual effects flags (glow, scan lines, particles)

#### Tooltips Configuration
Centralized tooltip content including:
- Unique tooltip identifiers
- Title and description text
- Preferred positioning (top, bottom, left, right)

#### Surface Map Data
Height map data structure containing:
- Metadata (dimensions, resolution in nanometers, scan date)
- Raw height data as floating-point arrays
- Processed/filtered height data
- Color scale configuration (min/max values, gradient color stops)

#### Defect Detection Data
Defect scenario definitions including:
- Scenario identification and naming
- Defect locations and classifications
- Severity levels (low, medium, high)
- Defect types (particle, scratch, void, residue)
- Confidence scores
- Yield impact metrics (before/after percentages, improvement descriptions)

### State Data Models

#### Application State Structure
The global application state is organized into logical domains:

**UI State**: Tracks current section, loading status and progress, audio enabled flag, reduced motion preference, and mobile device detection.

**Navigation State**: Maintains scroll position and per-section progress values (0-1 range) for animation synchronization.

**Process Flow State**: Stores which step is currently expanded (if any) and a set of completed step IDs for progress tracking.

**Simulation States**: Each interactive simulation maintains its own state including playback status, timeline position, view modes, rotation/zoom values, and scanning progress.

**Performance State**: Monitors real-time FPS, detected GPU tier (low/medium/high), and current effects quality level for adaptive performance.

#### Animation State Management
Tracks active GSAP timelines by ID, maintains a set of currently running animations, and manages ScrollTrigger instances for cleanup and coordination.

### Asset Management Strategy

#### Asset Registry
Maintains a registry of all 3D models, textures, and audio files with metadata:
- Asset URLs and loading status
- Priority levels (critical, high, low) for load ordering
- File sizes for progress calculation
- Texture compression status and format (JPG, PNG, WebP, KTX2)
- Audio volume levels

#### Loading Strategy
- **Critical Assets**: Hero section models and textures loaded first during initial loading screen
- **High Priority**: Process flow models loaded as user approaches that section
- **Low Priority**: Later section assets lazy-loaded based on scroll position
- **Caching**: All loaded assets cached in memory to prevent re-fetching


## 3D Rendering Architecture

### React Three Fiber Integration

The application uses React Three Fiber (R3F) as a declarative wrapper around Three.js, allowing 3D scenes to be composed using React components. This approach simplifies state management and lifecycle handling for complex 3D visualizations.

#### Canvas Organization Strategy

Each major section (Hero, Process Flow, Photolithography, WLI, Surface Map) contains its own R3F Canvas component. This isolation provides several benefits:
- Independent rendering contexts prevent performance interference
- Section-specific camera and lighting configurations
- Easier memory management and cleanup
- Ability to unmount/remount canvases based on visibility

#### Canvas Configuration

All canvases share a common configuration approach:
- Camera positioned at appropriate distance with field of view optimized for the content
- WebGL renderer configured for high performance with antialiasing and alpha transparency
- Adaptive pixel ratio (1x to 2x) based on device capabilities
- Adaptive performance monitoring that reduces quality if frame rate drops

#### Scene Organization Pattern

Each 3D scene follows a consistent structure:
- **Suspense Boundary**: Wraps 3D content to handle async model loading with fallback loader
- **Scene Lighting**: Ambient, directional, and point lights configured for the section
- **Scene Environment**: Optional environment maps for realistic reflections
- **Main Content**: The primary 3D objects and interactive elements
- **Post-Processing Effects**: Optional bloom, depth of field, or other effects
- **Performance Monitor**: Tracks FPS and adjusts quality dynamically

### Lighting System Design

The application uses a consistent lighting approach across all 3D scenes to maintain visual coherence:

**Ambient Lighting**: Low-intensity ambient light (dark blue-gray color) provides base illumination without washing out the neon aesthetic.

**Directional Lighting**: A single directional light simulates sunlight, positioned at an angle to create depth through shadows. Shadow mapping enabled for realism.

**Point Lights**: Multiple colored point lights (cyan and purple) create the neon glow effect. Positioned strategically around key objects to highlight important elements.

**Dynamic Lighting**: Light intensity and color can be animated in response to user interactions or scroll position for dramatic effect.

### Material System

The application defines reusable material configurations for consistent visual styling:

**Glassmorphism Materials**: Used for UI panels and overlays with high transmission, low roughness, and clearcoat for glossy finish. Creates the frosted glass effect characteristic of modern UI design.

**Neon Glow Materials**: High emissive intensity with tone mapping disabled to create bright, glowing accents. Used for interactive elements and highlights.

**Silicon Wafer Materials**: Metallic materials with high metalness and low roughness to simulate polished silicon surfaces. Environment map intensity increased for realistic reflections.

**Custom Shader Materials**: For special effects like interference patterns, scanning lines, and particle systems that require custom GLSL shaders.

### Performance Optimization Strategies

#### Level of Detail (LOD)
Complex 3D models use LOD to maintain performance:
- **High Detail**: Full geometry shown when camera is close (e.g., 50k triangles)
- **Medium Detail**: Reduced polygon count for mid-range distances (e.g., 10k triangles)
- **Low Detail**: Minimal geometry for distant objects (e.g., 2k triangles)

LOD switching happens automatically based on camera distance, invisible to the user but significantly improving performance.

#### Instanced Rendering
For repeated elements (particles, defect markers), instanced rendering draws many copies of the same geometry in a single draw call. This technique is used for:
- Particle systems (hundreds of particles)
- Defect markers on surface maps
- Repeated structural elements in the process pipeline

#### Texture Optimization
- Compressed texture formats (KTX2) for smaller file sizes
- Mipmaps generated for better performance at distance
- Texture atlasing to reduce draw calls
- Lazy loading of textures for sections not yet visible


## Animation System Design

### GSAP for Scroll-Based Animations

GSAP (GreenSock Animation Platform) with the ScrollTrigger plugin drives the main narrative flow through scroll-based animations.

#### ScrollTrigger Configuration

Each section registers a ScrollTrigger that defines:
- **Trigger Element**: The DOM element that activates the animation
- **Start/End Points**: When the animation begins and ends relative to viewport position (e.g., "top center" means animation starts when element's top reaches viewport center)
- **Scrub Mode**: Whether animation progress is tied directly to scroll position (creates smooth, synchronized animations)
- **Pin Option**: Whether to pin the element in place during animation
- **Callbacks**: Functions to execute on enter, leave, or progress update

#### Scroll Animation Flow

As the user scrolls:
1. Intersection Observer detects which sections are visible
2. ScrollTrigger calculates progress (0 to 1) based on scroll position
3. Progress value updates state management
4. React components re-render with new values
5. R3F updates 3D object transforms (position, rotation, scale, opacity)
6. WebGL renders the updated frame

This creates smooth, performant animations tied to scroll without janky frame drops.

### Timeline Management

Each interactive section (photolithography simulator, WLI visualizer) has its own GSAP timeline that can be controlled independently:

**Timeline Features**:
- Paused by default, controlled by user interaction
- Progress can be set directly for scrubbing (slider control)
- Sequences multiple animations with precise timing
- Callbacks on completion for state updates
- Can be played forward, reversed, or jumped to specific points

**Example Timeline Sequence** (Photolithography):
1. UV light intensity increases over 1 second
2. Mask opacity fades in simultaneously (parallel animation)
3. Pattern transfer progresses over 2 seconds
4. UV light fades out over 1 second

### Framer Motion for UI Transitions

Framer Motion handles component-level animations for UI elements (not 3D content):

**Animation Variants**:
- **Fade In Up**: Elements enter from below with opacity fade
- **Scale In**: Elements scale from 80% to 100% with opacity
- **Glow Pulse**: Continuous pulsing glow effect for interactive elements
- **Slide**: Panels slide in from edges

**Transition Configuration**:
- Duration typically 200-600ms for snappy feel
- Easing functions (easeOut, easeInOut, backOut) for natural motion
- Stagger delays for sequential element animations

### Animation Coordination

The application coordinates between GSAP (3D animations) and Framer Motion (UI animations) to create cohesive experiences:

**Process Step Expansion Example**:
1. User clicks step → Event handler fires
2. State updates (expandedStep ID)
3. GSAP timeline plays 3D model animation
4. Framer Motion animates description panel sliding in
5. Audio feedback plays (if enabled)
6. All animations synchronized to feel like single interaction

### Reduced Motion Support

The application respects the user's `prefers-reduced-motion` system preference:

**When Reduced Motion is Enabled**:
- Animation durations set to 0 (instant transitions)
- Particle systems disabled
- Continuous animations (rotation, pulsing) disabled
- Only essential state changes shown
- Scroll-based animations simplified to fade-only

This ensures accessibility for users with vestibular disorders or motion sensitivity.


## State Management with Zustand

### Store Architecture

Zustand provides lightweight state management with a simple API and minimal boilerplate. The application organizes state into logical slices that can be composed together.

#### Store Slice Pattern

Each domain of the application (UI, process flow, simulations) has its own slice containing:
- State variables for that domain
- Action functions to update state
- Derived state (computed values)
- No reducers or action types needed (simpler than Redux)

#### UI State Slice

Manages overall application UI concerns:
- Current section identifier for navigation highlighting
- Loading status and progress percentage
- Audio enabled/disabled flag
- Reduced motion preference detection
- Mobile device detection for touch interactions

Actions include setting current section, updating loading progress, and toggling audio.

#### Process Flow State Slice

Manages the interactive manufacturing process pipeline:
- Currently expanded step ID (null if none expanded)
- Set of completed step IDs for progress tracking
- Actions to expand a step, collapse all steps, and mark steps complete

Ensures only one step can be expanded at a time.

#### Simulation State Slices

Each interactive simulation has its own slice:

**Photolithography Slice**: Playback status (playing/paused), timeline position (0-1), actions to play/pause and seek to position.

**WLI Slice**: Active status, scan progress (0-1), actions to start/stop scanning and update progress.

**Surface Map Slice**: View mode (raw/processed), rotation angles (x, y, z), zoom level, actions to toggle view mode and update camera transform.

**Defect Overlay Slice**: Current scenario index, scanning status, actions to cycle scenarios and control scanning animation.

#### Performance State Slice

Monitors and adapts to device capabilities:
- Real-time FPS counter
- GPU tier detection (low/medium/high) based on benchmarking
- Effects quality level (can be reduced if FPS drops)
- Actions to update FPS and adjust quality

### Local Storage Persistence

User preferences are persisted to browser local storage:

**Persisted Data**:
- Audio enabled preference
- Completed steps array
- Last visited section

**Persistence Strategy**:
- Load from local storage on app initialization
- Save to local storage whenever relevant state changes
- Graceful fallback if local storage unavailable
- JSON serialization with error handling

**Benefits**:
- User preferences maintained across sessions
- Progress tracking persists
- Improved user experience on return visits


## Data Flow and Configuration Management

### Configuration Loading System

The application loads educational content from JSON configuration files, enabling content updates without code changes.

#### Configuration Loader

A centralized configuration loader handles:
- Fetching JSON files from the public directory
- Validating configuration structure against schemas
- Providing fallback default content if loading fails
- Caching loaded configurations in memory

#### Validation Strategy

Each configuration type has a JSON schema defining required fields and data types. The loader validates configurations on load and logs errors if validation fails, then falls back to default content to prevent application crashes.

#### Configuration Types

**Process Steps**: Loaded on app initialization, defines all 8 manufacturing steps with their 3D models, animations, and educational content.

**Tooltips**: Loaded on app initialization, provides all tooltip text for hover interactions.

**Surface Map Data**: Lazy loaded when user reaches surface map section, contains height data arrays and visualization settings.

**Defect Detection Data**: Lazy loaded with surface map section, defines defect scenarios for the AI overlay demonstration.

### Data Flow Patterns

#### Scroll-Driven Update Flow

```
User Scrolls
  ↓
Intersection Observer (detects visible sections)
  ↓
GSAP ScrollTrigger (calculates progress 0-1)
  ↓
Zustand Store Update (scroll position, section progress)
  ↓
React Component Re-render (with new props)
  ↓
R3F Scene Update (3D transforms)
  ↓
WebGL Render (new frame)
```

This unidirectional flow ensures predictable state updates and smooth animations.

#### Interactive Simulation Flow

```
User Interaction (click button, drag slider)
  ↓
Event Handler (captures input)
  ↓
Zustand Store Update (simulation state)
  ↓
GSAP Timeline Control (play/pause/seek)
  ↓
Animation Frame Update (requestAnimationFrame)
  ↓
3D Object Transform Update (position, rotation, material properties)
  ↓
WebGL Render (new frame)
```

User interactions immediately update state, which drives animation playback.

#### Asset Loading Flow

```
App Initialization
  ↓
Identify Critical Assets (hero section models/textures)
  ↓
Start Preload (parallel fetch)
  ↓
Update Loading Progress (percentage calculation)
  ↓
Display Hero Section (when critical assets loaded)
  ↓
Lazy Load Remaining Assets (triggered by scroll position)
  ↓
Cache in Asset Registry (prevent re-fetching)
```

Progressive loading ensures fast initial display while loading remaining content in background.

### Performance Monitoring

#### Real-Time Metrics

The application continuously monitors:
- **FPS (Frames Per Second)**: Measured every second using requestAnimationFrame timestamps
- **Frame Time**: Time taken to render each frame in milliseconds
- **Draw Calls**: Number of WebGL draw calls per frame
- **Triangle Count**: Total triangles being rendered
- **Memory Usage**: Geometry and texture memory consumption

#### Adaptive Quality System

Based on monitored metrics, the application automatically adjusts quality:

**If FPS drops below 30**:
1. Reduce particle count
2. Disable post-processing effects
3. Lower texture resolution
4. Switch to lower LOD models
5. Reduce shadow quality

**If FPS recovers above 45**:
1. Gradually restore quality settings
2. Monitor for stability before further increases

This ensures smooth experience across device capabilities from mobile to high-end desktops.

