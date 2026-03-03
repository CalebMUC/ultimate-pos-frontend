# Stage 1 — Axios Configuration Fix & Environment Variables

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🔴 Critical

---

## Problem

Three critical bugs existed in `src/axios.js`:

1. **`useRouter()` called outside a Vue component** — `useRouter()` is a Vue Composition API hook and can only be called inside a component `setup()` function. Calling it at module level caused a Vue warning and router was `undefined`, meaning the redirect-to-login on network errors silently failed.

2. **Hardcoded base URL** — `'https://localhost:7231/api/'` was hardcoded, making it impossible to deploy to staging or production without modifying source code.

3. **Token read once at module load** — `let token = localStorage.getItem('token')` was evaluated at import time. If a user logged in, the token value was stale (always `null`) until the page was refreshed.

4. **Hardcoded document upload URL** — `uploadFile` used `axios.post('http://localhost:5134/api/...')` bypassing the configured `apiClient` entirely.

---

## Changes Made

### `src/axios.js`
- Removed `import { useRouter }` and `import Documents`
- Replaced `useRouter()` with a direct import: `import router from './router'`
- Changed `let dynamicBaseURL = 'https://...'` to:
  ```js
  const dynamicBaseURL = import.meta.env.VITE_API_BASE_URL || 'https://localhost:7231/api/'
  ```
- Removed module-level `let token = localStorage.getItem('token')`
- Added **request interceptor** that reads the token fresh from `localStorage` on every outgoing request:
  ```js
  apiClient.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  })
  ```
  This means **no individual API function needs to pass a token anymore**. The interceptor handles it automatically and always has the latest token.
- Fixed `uploadFile` to use `apiClient` instead of raw `axios`
- Added new API endpoints for PurchaseInvoices, OutgoingInvoices, and SystemAudit

### New Environment Files
| File | Purpose |
|------|---------|
| `.env` | Default fallback values |
| `.env.development` | Used by `npm run dev` |
| `.env.production` | Used by `npm run build` — **update before deploying** |
| `.env.example` | Template for new developers |

---

## Deployment Checklist

Before deploying to production:

1. Open `.env.production`
2. Set `VITE_API_BASE_URL` to your actual production API domain:
   ```
   VITE_API_BASE_URL=https://api.yourcompany.com/api/
   ```
3. Run `npm run build`
4. Never commit `.env.production` to source control — add it to `.gitignore`

---

## Side Effects

- All API functions that previously accepted `token` as a parameter still work — the parameter is simply ignored since the interceptor handles auth. No breaking changes.
- Existing `token` parameters in old function signatures can be cleaned up gradually.
