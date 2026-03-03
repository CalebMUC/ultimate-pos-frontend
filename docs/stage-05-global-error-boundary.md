# Stage 5 — Global Error Boundary in Dashboard

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟠 High

---

## Problem

The `src/store/ErrorState.js` reactive object was only used inconsistently:
- `axios.js` correctly writes to `errorState.message` and `errorState.code` on API errors
- But almost no view components were watching `errorState` to display these errors to the user
- Individual views had no fallback — silent API failures with no user feedback

---

## Solution: Centralized Error Watcher in Dashboard

The global layout component `src/components/Dashboard.vue` now watches `errorState` and displays a non-intrusive toast notification for every API error:

```js
import { errorState } from '../store/ErrorState'

watch(() => errorState.message, (msg) => {
  if (msg) {
    Swal.fire({
      icon: errorState.code === 401 ? 'warning' : 'error',
      title: errorState.code === 401 ? 'Session Expired' : `Error ${errorState.code || ''}`,
      text: msg,
      timer: 4000,
      timerProgressBar: true,
      showConfirmButton: false,
      toast: true,
      position: 'top-end'
    })
    // Clear after display
    errorState.message = ''
    errorState.code = null
  }
})
```

---

## Behavior

| HTTP Status | Icon | Title |
|-------------|------|-------|
| 401 | ⚠️ warning | Session Expired |
| 404 | ❌ error | Error 404 |
| 500 | ❌ error | Error 500 |
| Network error | ❌ error | Error |

- The toast appears at the **top-right** corner
- Auto-dismisses after **4 seconds**
- Does **not** block the UI
- `errorState` is reset after display so the same error doesn't re-appear

---

## How It Works

Since `Dashboard.vue` wraps all authenticated routes via the router, the watcher is active for the entire logged-in session. Any API call anywhere in the app that fails will trigger the toast — no per-view error handling needed for generic API errors.

---

## Note for View Developers

For **form-specific** validation errors (e.g., "Email already taken"), you should still handle those locally in the form component using the `errors` ref. The global error boundary is for unexpected API failures, not expected validation feedback.
