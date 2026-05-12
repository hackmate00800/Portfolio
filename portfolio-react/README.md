# Ankit - Creative Designer & Logical Developer Portfolio

An interactive portfolio built with React, Vite, Tailwind CSS v4, and Framer Motion. Features a signature split-face animation where hovering reveals the creative (left) or logical (right) side with a draggable divider.

## Tech Stack

- **React 19** — Component-based UI with hooks
- **Vite 8** — Fast dev server and optimized builds
- **Tailwind CSS v4** — Utility-first CSS with dark/light theme via `@theme` + `data-theme`
- **Framer Motion** — Scroll reveals, page transitions, spring animations
- **React Icons** — Iconography across all components

## Features

- **Split-Face Hero** — Drag or hover to reveal creative vs logical sides, smooth lerp animation via requestAnimationFrame, touch support
- **Custom Cursor** — Magnetic cursor that responds to hover states (links, buttons, sections, text)
- **Dark/Light Mode** — Persisted to localStorage, seamless toggle
- **GitHub API Integration** — Live profile stats, repo cards fetched from `api.github.com/users/hackmate00800`
- **LinkedIn Card** — Glassmorphism showcase card with animated gradient border
- **Instagram Showcase** — Gradient post grid with hover overlays
- **Particles & Floating Shapes** — Canvas-based particle system + parallax shapes for visual depth
- **Responsive** — Desktop, tablet, and mobile breakpoints
- **Contact Form** — Floating labels, inline validation, copy-to-clipboard email
- **Typing Effect** — Typewriter animation on hero subtitle

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview production build
```

## Deploy

The repo includes configs for both Vercel (`vercel.json`) and Netlify (`netlify.toml`) with SPA rewrites.

## Social Profiles

- **GitHub**: [hackmate00800](https://github.com/hackmate00800)
- **LinkedIn**: [ankit-singh-3ab014391](https://www.linkedin.com/in/ankit-singh-3ab014391)
- **Instagram**: [@_hack_mate_](https://instagram.com/_hack_mate_)

## License

MIT
