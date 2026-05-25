# Citron Caviar

Freelance website project for Citron Caviar. Built with Nuxt 4, Tailwind CSS 4, and GSAP.

## Tech Stack

- **Framework:** Nuxt 4 (Vue 3)
- **Styling:** Tailwind CSS 4 (via `@tailwindcss/vite` plugin)
- **Animation:** GSAP
- **Package Manager:** pnpm

## Rules

- **Never run the dev server.** Use Claude in Chrome to view the site at `http://localhost:3000`. The user manages the dev server themselves.
- Use Tailwind 4 CSS-first configuration (`@import 'tailwindcss'` in `assets/css/tailwind.css`). No `tailwind.config.js` — use `@theme` directives in CSS instead.
- Use Nuxt 4 conventions: file-based routing, auto-imports, `app/` directory structure.
- Use Tailwind utility classes for styling. Avoid custom CSS unless necessary for complex components or animations.
- Use theme-aware color classes (`text-fg`, `bg-bg`, `bg-fg`, `border-fg/20`, `opacity-70`) instead of hardcoded `text-white` / `bg-black`. The theme swaps via CSS variables in `tailwind.css` — most elements just inherit `color` from `body`.
