# Stage 4 — Lazy Loading Routes

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟡 Medium (Performance)

---

## Problem

All 30+ route components were eagerly imported at the top of `router/index.js`:

```js
// ❌ Before — ALL components loaded on first page visit
import Home from '../Views/Home.vue'
import Inventory from '../Views/Inventory.vue'
import TillManagement from '../Views/Tell/TillManagement.vue'
// ... 30 more imports
```

**Impact:**
- The initial JavaScript bundle included every page component
- A user visiting `/login` would download the code for `TillManagement`, `SystemAudit`, `RolePermissions`, etc.
- Longer Time to Interactive (TTI) on first load
- Higher data usage for end users

---

## Changes Made

### `src/router/index.js`

Every component import was converted to a **dynamic import** (lazy loading):

```js
// ✅ After — Components loaded only when the route is first visited
const Home             = () => import('../Views/Home.vue')
const Inventory        = () => import('../Views/Inventory.vue')
const TillManagement   = () => import('../Views/Tell/TillManagement.vue')
// ... all routes
```

**How it works:**
- Vite automatically creates a separate chunk file for each lazy-loaded route
- The chunk is fetched from the server only when the user navigates to that route
- Subsequent visits to the same route use the browser cache

---

## Performance Impact

| Metric | Before | After |
|--------|--------|-------|
| Initial bundle | All pages (~2MB+) | Login + Dashboard only (~200KB) |
| Time to Interactive | Slow on first load | Fast — minimal initial load |
| Cache efficiency | One large bundle | Individual page chunks cached separately |

---

## Vite Build Chunks

After running `npm run build`, you will see individual chunks generated per route group. The `vite.config.js` (Stage 11) further splits `vue-core`, `charts`, `xlsx`, and `ui-libs` into separate vendor chunks for optimal long-term caching.
