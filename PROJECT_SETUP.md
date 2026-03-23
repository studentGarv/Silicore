# Semiconductor 3D Website - Project Setup

## Overview
This project is an interactive 3D educational website about semiconductor IC manufacturing processes. It uses modern web technologies to deliver an immersive learning experience through 3D visualizations, scroll-based storytelling, and interactive simulations.

## Technology Stack

### Core Framework
- **Vite 8.0.1** - Fast build tool and dev server
- **React 19.2.4** - UI framework
- **TypeScript 5.9.3** - Type safety

### 3D Rendering
- **Three.js 0.183.2** - WebGL 3D library
- **React Three Fiber 9.5.0** - React renderer for Three.js
- **React Three Drei 10.7.7** - Useful helpers for R3F

### Animation
- **GSAP 3.14.2** - Professional-grade animation
- **Framer Motion 12.38.0** - React animation library

### State Management
- **Zustand 5.0.12** - Lightweight state management

### Styling
- **Tailwind CSS 4.2.2** - Utility-first CSS framework
- **PostCSS 8.5.8** - CSS processing
- **Autoprefixer 10.4.27** - CSS vendor prefixing

## Project Structure

```
project_web/
├── public/
│   ├── config/           # JSON configuration files
│   │   ├── process-steps.json
│   │   ├── tooltips.json
│   │   └── defects.json
│   └── models/           # 3D model files (.glb/.gltf)
├── src/
│   ├── components/       # React components
│   ├── stores/          # Zustand state stores
│   ├── hooks/           # Custom React hooks
│   ├── utils/           # Utility functions
│   ├── assets/          # Images, icons, etc.
│   ├── App.tsx          # Main app component
│   ├── main.tsx         # Entry point
│   └── index.css        # Global styles
├── vite.config.ts       # Vite configuration
├── tailwind.config.js   # Tailwind configuration
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies
```

## Configuration

### Path Aliases
The following path aliases are configured:
- `@/` → `./src/`
- `@components/` → `./src/components/`
- `@stores/` → `./src/stores/`
- `@hooks/` → `./src/hooks/`
- `@utils/` → `./src/utils/`
- `@assets/` → `./src/assets/`

### Tailwind Theme
Custom theme colors:
- **Neon Cyan**: `#00f0ff`
- **Neon Purple**: `#b000ff`
- **Neon Blue**: `#0080ff`
- **Dark BG**: `#0a0a0f`
- **Dark Surface**: `#14141a`
- **Dark Elevated**: `#1e1e28`

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## Development

### Starting Development
1. Install dependencies: `npm install`
2. Start dev server: `npm run dev`
3. Open browser to `http://localhost:5173`

### Building for Production
1. Run build: `npm run build`
2. Output will be in `dist/` directory
3. Preview with: `npm run preview`

## Performance Optimizations

### Build Optimizations
- Code splitting for Three.js, React Three Fiber, and animation libraries
- Asset optimization for 3D models (.glb, .gltf, .hdr)
- Tree shaking and minification

### Runtime Optimizations
- Lazy loading of 3D models
- Level of Detail (LOD) for complex models
- Texture compression
- Adaptive performance based on GPU capabilities

## Requirements Addressed
This setup addresses the following requirements:
- **13.1**: Fast loading with optimized build configuration
- **13.3**: Lazy loading support for 3D assets
- **13.4**: Asset optimization pipeline for textures

## Next Steps
1. Implement hero section with 3D wafer visualization
2. Create process flow pipeline component
3. Build photolithography simulator
4. Develop WLI visualizer
5. Implement surface map renderer
6. Add defect detection overlay
