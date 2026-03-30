# ⚡ SiliCore3D

An interactive 3D web application that visualizes the complete semiconductor manufacturing process — from raw silicon wafer to finished chip packaging.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-0.183-black?logo=three.js&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)

---

## 🔍 Overview

SiliCore3D makes chip fabrication education engaging and visual. Users can explore each manufacturing step through rich 3D animations, particle effects, and interactive UI — all running in the browser with no plugins required.

---

## ✨ Features

- **Interactive 3D Wafer Visualization** — A rotating, animated silicon wafer rendered with Three.js and React Three Fiber, complete with a dynamic particle system and star-field background.
- **8-Step Manufacturing Process Flow** — Explore every major step of chip production:
  1. Wafer Manufacturing
  2. Oxidation
  3. Photolithography
  4. Etching
  5. Deposition & Ion Implantation
  6. Metal Wiring
  7. Electrical Die Sorting
  8. Packaging
- **Per-Step Animations & Effects** — Each step features custom animations (rotation, scale, custom), glow effects, scan lines, and particle effects driven by configurable JSON.
- **Glassmorphism UI** — Dark-themed interface with neon cyan/purple accents, backdrop blur, and smooth scroll-based transitions.
- **Responsive Layout** — Fixed glassmorphism header with desktop and mobile navigation.
- **Config-Driven Architecture** — Process steps, defect scenarios, and UI tooltips are all defined in external JSON files under `public/config/`, making the app easy to extend.
- **Persistent State** — Zustand stores with a custom persistence hook keep UI and simulation state across navigation.

---

## 🛠️ Tech Stack

| Layer            | Library / Tool                          | Version  |
| ---------------- | --------------------------------------- | -------- |
| UI Framework     | React                                   | 19       |
| Language         | TypeScript                              | ~5.9     |
| 3D Rendering     | Three.js + React Three Fiber + Drei     | 0.183 / 9.5 / 10.7 |
| Animation        | Framer Motion + GSAP                    | 12 / 3   |
| Styling          | Tailwind CSS + PostCSS + Autoprefixer   | 4        |
| State Management | Zustand                                 | 5        |
| Build Tool       | Vite                                    | 8        |
| Linting          | ESLint + typescript-eslint              | 9        |
| Deployment       | GitHub Pages (`gh-pages`)               | 6        |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or later
- npm v9 or later

### Installation

```bash
# Clone the repository
git clone https://github.com/studentGarv/Silicore.git
cd Silicore

# Install dependencies
npm install
```

### Running locally

```bash
npm run dev
```

Open [http://localhost:5173/Silicore/](http://localhost:5173/Silicore/) in your browser.

---

## 📜 Available Scripts

| Script            | Description                                      |
| ----------------- | ------------------------------------------------ |
| `npm run dev`     | Start the Vite dev server with hot-reload        |
| `npm run build`   | Type-check and build for production (`dist/`)    |
| `npm run preview` | Preview the production build locally             |
| `npm run lint`    | Run ESLint across the entire codebase            |
| `npm run deploy`  | Build and deploy to GitHub Pages                 |

---

## 📁 Project Structure

```
Silicore/
├── public/
│   ├── config/
│   │   ├── defects.json          # Defect scenarios & yield impact data
│   │   ├── process-steps.json    # 8-step manufacturing process config
│   │   └── tooltips.json         # UI tooltip definitions
│   ├── models/                   # 3D GLB model assets
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── hero/                 # HeroSection, ParticleSystem, WaferModel3D
│   │   ├── process/              # ProcessPipelineStrip, StepDetailSection, StepIcon3D
│   │   ├── sections/             # ProcessFlowSection
│   │   └── ui/                   # ScrollIndicator
│   ├── data/
│   │   └── processSteps.ts       # Static step definitions
│   ├── hooks/
│   │   └── usePersistence.ts     # Custom Zustand persistence hook
│   ├── stores/                   # Zustand stores (UI, simulation, process flow, performance)
│   ├── utils/
│   │   ├── configLoader.ts       # Loads & caches JSON configs from public/config/
│   │   ├── configValidator.ts    # Validates loaded configs
│   │   ├── persistence.ts        # LocalStorage persistence helpers
│   │   └── types.ts              # Shared TypeScript types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── index.html
├── vite.config.ts
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

---

## 🌐 Deployment

The project is pre-configured for **GitHub Pages** deployment:

```bash
npm run deploy
```

This runs `npm run build` followed by `gh-pages -d dist`, publishing the `dist/` folder to the `gh-pages` branch. The Vite base path is set to `/Silicore/` to match the GitHub Pages URL.

Live site: **[https://studentgarv.github.io/Silicore/](https://studentgarv.github.io/Silicore/)**

---

## 📄 License

This project is open-source. See the repository for details.
