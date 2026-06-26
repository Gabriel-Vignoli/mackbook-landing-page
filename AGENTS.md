# MacBook GSAP Landing Page - Agent Guide

## Project Overview

A high-performance 3D interactive landing page for MacBooks featuring smooth scroll animations, dynamic 3D model manipulation, and responsive design. Built with React, Vite, Three.js, GSAP, and Tailwind CSS.

### Tech Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Build** | Vite 8 | Fast HMR and optimized builds |
| **UI Framework** | React 19 | Component-based architecture |
| **3D Rendering** | Three.js + React Three Fiber | 3D model rendering |
| **Animations** | GSAP (Greensock) | Scroll-triggered and timeline animations |
| **Styling** | Tailwind CSS 4 + Vite plugin | Utility-first styling |
| **State** | Zustand 5 | Lightweight global state (MacBook color/scale) |
| **Responsiveness** | React Responsive | Mobile/tablet breakpoint handling |

## Quick Start

```bash
npm install       # Install dependencies
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```

## Project Structure

### Core Organization

```
src/
├── App.jsx                    # Entry component, imports all sections
├── index.css                  # Global styles
├── components/                # Feature sections
│   ├── Feature.jsx            # Individual feature components
│   ├── Hero.jsx               # Hero section with video
│   ├── NavBar.jsx             # Navigation
│   ├── ProductViewer.jsx      # Main 3D interactive viewer
│   ├── Showcase.jsx           # Product showcase section
│   ├── Performance.jsx        # Performance specs section
│   ├── models/                # React Three Fiber model components
│   │   ├── Macbook.jsx        # Auto-generated from macbook.glb
│   │   ├── Macbook-14.jsx     # 14" variant
│   │   └── Macbook-16.jsx     # 16" variant
│   └── three/                 # 3D utilities
│       ├── ModelSwitcher.jsx  # Handles model switching logic
│       └── StudioLights.jsx   # 3D lighting setup
├── constants/
│   └── index.js               # UI data (nav links, image configs, etc.)
├── store/
│   └── index.js               # Zustand store for MacBook state
└── public/
    ├── models/                # .glb 3D model files
    ├── videos/                # MP4 video assets
    └── fonts/                 # Custom fonts (if any)
```

### Key Files & Their Purpose

| File | Purpose | Edit When |
|------|---------|-----------|
| [src/App.jsx](src/App.jsx) | Section composition and GSAP setup | Adding new sections or animations |
| [src/store/index.js](src/store/index.js) | MacBook color/scale state | Changing interactive properties |
| [src/constants/index.js](src/constants/index.js) | Navigation links, images, positions | Updating UI content |
| [src/components/ProductViewer.jsx](src/components/ProductViewer.jsx) | 3D canvas and model interactions | Modifying 3D behavior |
| [src/components/models/Macbook.jsx](src/components/models/Macbook.jsx) | 3D model mesh configuration | Changing model appearance (rarely) |

## Architecture & Patterns

### 1. Section-Based Component Structure

Each feature is a self-contained section component. Flow:

```
App.jsx
  ├─ NavBar
  ├─ Hero (video section)
  ├─ ProductViewer (3D canvas)
  ├─ Showcase (gallery)
  └─ Performance (specs)
```

**Pattern**: Sections handle their own layout and internal state; global state lives in Zustand.

### 2. State Management with Zustand

Global state is minimal and managed by `useMacbookStore`:

```javascript
// src/store/index.js
{
  color: '#2e2c2e',      // MacBook color (hex)
  setColor: (color) => {},
  scale: 0.08,           // 3D model scale
  setScale: (scale) => {},
  reset: () => {}        // Reset to defaults
}
```

**Pattern**: Use this store only for properties affecting the 3D model. UI-specific state stays local in components.

### 3. GSAP Scroll Animations

GSAP is registered with ScrollTrigger plugin in [App.jsx](src/App.jsx):

```javascript
gsap.registerPlugin(ScrollTrigger)
```

**Pattern**: Animations are typically defined in component-level `useEffect` hooks, triggered by scroll:

```javascript
useEffect(() => {
  gsap.to(elementRef.current, {
    scrollTrigger: {
      trigger: elementRef.current,
      start: "top center",
      end: "bottom center",
      scrub: true,
      // ...
    },
    // animation properties
  });
}, []);
```

### 4. 3D Model Loading & Manipulation

Models are auto-generated React components from .glb files using [gltfjsx](https://github.com/pmndrs/gltfjsx):

- Models stored in `public/models/`
- Model components generated from `.glb` → `.jsx` via CLI
- Loaded via `useGLTF()` hook from `@react-three/drei`
- Wrapped in `Canvas` from `@react-three/fiber`

**Pattern**: Don't edit generated model components manually; regenerate if you update the .glb file:

```bash
npx gltfjsx@6.5.3 yourmodel.glb -T
```

### 5. Responsive Design

Uses **react-responsive** for breakpoints and **Tailwind CSS** for utility styles:

```javascript
import { useMediaQuery } from 'react-responsive'

const isMobile = useMediaQuery({ maxWidth: 768 })
```

## Common Development Tasks

### Adding a New Section

1. Create `src/components/YourSection.jsx`
2. Import it in [src/App.jsx](src/App.jsx)
3. Add to the JSX tree in App
4. Add GSAP animations if needed

### Modifying 3D Model Appearance

Edit material/color in [src/components/models/Macbook.jsx](src/components/models/Macbook.jsx), **or** use Zustand store to dynamically change `color` property:

```javascript
const { color, setColor } = useMacbookStore()
// Update color via UI control
setColor('#ff0000')
```

### Updating Navigation or Content

Edit [src/constants/index.js](src/constants/index.js) — this is the single source of truth for UI data.

### Adding GSAP Animations

- For scroll-triggered animations: Use `ScrollTrigger` in `useEffect`
- For timeline animations: Create a timeline and trigger on events
- Always clean up animations on component unmount

## Conventions

### File Naming

- Components: PascalCase (e.g., `Hero.jsx`, `ProductViewer.jsx`)
- Utilities: camelCase (e.g., `index.js`)
- Constants: UPPER_SNAKE_CASE for arrays/constants

### Component Structure

```javascript
import { useEffect, useRef } from 'react'

const ComponentName = () => {
  const elementRef = useRef()
  
  useEffect(() => {
    // Setup animations, listeners
    return () => {
      // Cleanup (important for GSAP!)
    }
  }, [])

  return <section>...</section>
}

export default ComponentName
```

### Asset Organization

- 3D Models: `public/models/` (.glb files)
- Videos: `public/videos/` (.mp4)
- Images: `public/` (root)
- Fonts: `public/fonts/`

## Important Considerations

### Performance

- **GSAP cleanup**: Always clean up ScrollTrigger instances in useEffect cleanup to prevent memory leaks
- **3D rendering**: The Canvas component is expensive; keep it contained in ProductViewer
- **Animations**: Use `will-change` CSS sparingly; rely on GSAP for heavy lifting

### Mobile Responsiveness

- Test animations on mobile — GSAP ScrollTrigger behaves differently on touch devices
- Use `react-responsive` hooks to conditionally render heavy 3D scenes

### GSAP ScrollTrigger Gotchas

1. ScrollTrigger must be registered: `gsap.registerPlugin(ScrollTrigger)`
2. Always clean up on unmount: `ScrollTrigger.getAll().forEach(t => t.kill())`
3. Test with different scroll speeds and mobile devices

### 3D Model Parts

- Certain model parts are marked as `noChangeParts` in [src/constants/index.js](src/constants/index.js) — these shouldn't change color
- Reference the `noChangeParts` array when applying material updates

## Related Documentation

- **Vite**: [vite.config.js](vite.config.js) — Build and plugin configuration
- **Tailwind**: Configured in `vite.config.js` with `@tailwindcss/vite` plugin
- **ESLint**: [eslint.config.js](eslint.config.js) — Code quality rules

## When to Extend vs. Refactor

| Scenario | Action |
|----------|--------|
| Add new section | Create new component, import in App.jsx |
| Modify animation timing | Edit GSAP config in respective component |
| Add new interactive property | Add to Zustand store, update model component |
| Add new 3D model | Place .glb in public/models/, generate .jsx, create wrapper component |
| Refactor state | Ensure Zustand store remains focused on 3D properties only |

---

**Last Updated**: 2026-06-25  
**Project Version**: 0.0.0 (Development)
