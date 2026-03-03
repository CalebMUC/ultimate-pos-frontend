# Stage 2 — Style.css Dark Mode Conflict Fix

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟠 High

---

## Problem

The default Vite scaffold `src/style.css` contained dark-mode styles that conflicted with the Tailwind CSS light design of the application:

```css
/* ❌ Was causing these problems: */
color-scheme: light dark;
color: rgba(255, 255, 255, 0.87);  /* White text on all elements */
background-color: #242424;          /* Dark gray page background */

background-color: #1a1a1a;          /* Dark button background */

body {
  display: flex;
  place-items: center;  /* Centered all content in the viewport — breaks full-height layouts */
}
```

**Symptoms:**
- Page background was dark gray instead of white
- Text appeared white-on-white in some places
- Buttons had dark backgrounds overriding Tailwind button classes  
- The layout was vertically centered in the viewport, breaking the sidebar/main content layout

---

## Changes Made

### `src/style.css`

| Property | Before | After |
|----------|--------|-------|
| `color-scheme` | `light dark` | `light` |
| `color` | `rgba(255,255,255,0.87)` | `#213547` (dark gray) |
| `background-color` | `#242424` | `#ffffff` |
| `body display` | `flex` with `place-items: center` | Removed — no centering |
| `button background-color` | `#1a1a1a` | Removed — Tailwind handles it |

---

## Why This Matters

`src/style.css` is imported in `main.js` **before** Tailwind. However, because the Vite default styles use high-specificity selectors like `button { background-color: ... }`, they could override Tailwind's utility classes. Tailwind's `bg-orange-500` on a button wouldn't work correctly because the cascade gave priority to the base style.

Fixing this ensures all Tailwind classes work as expected throughout the app.
