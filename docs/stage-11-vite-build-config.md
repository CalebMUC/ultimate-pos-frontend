# Stage 11 — Vite Production Build Configuration

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟡 Medium

---

## Problem

`vite.config.js` was the bare minimum scaffold:
```js
export default defineConfig({ plugins: [vue()] })
```

No path aliases, no bundle splitting, no proxy, no optimization settings.

---

## Changes Made

### `vite.config.js`

#### 1. Path Alias
```js
resolve: {
  alias: { '@': resolve(__dirname, './src') }
}
```
Allows `import Foo from '@/components/Foo.vue'` instead of relative paths.

#### 2. Manual Chunk Splitting
```js
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        'vue-core': ['vue', 'vue-router', 'pinia'],
        'charts':   ['chart.js', 'vue-chartjs'],
        'ui-libs':  ['sweetalert2', 'axios'],
        'xlsx':     ['xlsx'],
      }
    }
  }
}
```

**Why this matters:**  
The `xlsx` library is ~850KB minified. Without manual chunks it would be bundled into the main app file. With this split:
- `xlsx` is only downloaded when a user visits a page that exports/imports
- `vue-core` (~90KB) is cached separately — doesn't change between deployments
- `charts` (~250KB) is cached separately

#### 3. Development Proxy
```js
server: {
  port: 5173,
  proxy: {
    '/api': {
      target: 'https://localhost:7231',
      changeOrigin: true,
      secure: false,
    }
  }
}
```
This eliminates CORS errors during development. Instead of configuring CORS on the backend, the dev server proxies `/api/*` to the backend.

---

## Running Builds

```bash
# Development
npm run dev

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## Build Output

After `npm run build`, the `dist/` folder contains:

```
dist/
  index.html
  assets/
    index-[hash].js        ← app entry
    vue-core-[hash].js     ← vue + router + pinia
    charts-[hash].js       ← chart.js
    ui-libs-[hash].js      ← sweetalert2 + axios
    xlsx-[hash].js         ← xlsx (loaded on demand)
    [page]-[hash].js       ← one file per lazy-loaded route
    [hash].css             ← all styles
```

---

## Deployment

Copy the entire `dist/` folder to your web server. Configure your web server to:

1. **Serve `index.html` for all 404s** (required for Vue Router history mode)

**Nginx example:**
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

**Apache `.htaccess` example:**
```apache
RewriteEngine On
RewriteBase /
RewriteRule ^index\.html$ - [L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]
```

2. Set **cache headers** for `assets/` folder (they have content hashes, safe to cache forever):
```nginx
location /assets/ {
  expires 1y;
  add_header Cache-Control "public, immutable";
}
```
