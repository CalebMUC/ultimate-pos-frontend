# Stage 12 — Production Readiness Checklist

**Date:** 2026-03-03  
**Status:** ✅ All 12 Stages Complete

---

## Summary of All Changes

| Stage | Title | File(s) Changed | Status |
|-------|-------|-----------------|--------|
| 1 | Axios fix + Environment Variables | `src/axios.js`, `.env*` | ✅ |
| 2 | Style.css dark mode fix | `src/style.css` | ✅ |
| 3 | Route guards re-enabled | `src/router/index.js` | ✅ |
| 4 | Lazy loading all routes | `src/router/index.js` | ✅ |
| 5 | Global error boundary | `src/components/Dashboard.vue` | ✅ |
| 6 | Loading/error states in stores | `src/store/DocumentsStore.js` | ✅ |
| 7 | Real API calls (4 views) | `PurchaseInvoices.vue`, `OutgoingInvoice.vue`, `SystemAudit.vue`, `TillClosure.vue` + 3 new stores | ✅ |
| 8 | DynamicForm validation fix | `src/components/Forms/DynamicForm.vue` | ✅ |
| 9 | Export (PDF/Excel) + Import | `src/components/ModuleComponent/ModuleComponent.vue` | ✅ |
| 10 | Loading overlay in ModuleComponent | `src/components/ModuleComponent/ModuleComponent.vue` | ✅ |
| 11 | Vite production build config | `vite.config.js` | ✅ |
| 12 | Documentation | `docs/` | ✅ |

---

## 5-Day Production Launch Plan

### Day 1 — Backend Verification
- [ ] Confirm all new API endpoints exist on the backend:
  - `GET /PurchaseInvoices/GetPurchaseInvoices`
  - `POST /PurchaseInvoices/AddPurchaseInvoice`
  - `POST /PurchaseInvoices/EditPurchaseInvoice`
  - `DELETE /PurchaseInvoices/DeletePurchaseInvoice/{id}`
  - Same pattern for `/OutgoingInvoices/...`
  - `POST /Audit/GetAuditLogs`
  - `POST /TillManagement/submit-closure`
- [ ] Verify CORS policy allows production frontend domain
- [ ] Confirm JWT token shape matches `auth.js` decoder (role + permissions claims)
- [ ] Update `.env.production` with real API URL

### Day 2 — Integration Testing
- [ ] Test Login → Dashboard → all main routes
- [ ] Test CRUD on: Inventory, Suppliers, Categories, Contacts, PurchaseOrders
- [ ] Test PurchaseInvoices, OutgoingInvoice with real API
- [ ] Test Till flow: Open → Close → Supervisor Review
- [ ] Test System Audit log generation
- [ ] Test Documents upload/download/preview

### Day 3 — User Acceptance Testing (UAT)
- [ ] Run through a complete sale workflow (`/sell`)
- [ ] Verify till balance matches after sale
- [ ] Test user roles: Admin, Cashier, Supervisor have correct permissions
- [ ] Test export Excel from Inventory and Sales Report
- [ ] Test import CSV/Excel
- [ ] Verify error toast appears when API is down

### Day 4 — Performance & Security Review
- [ ] Run `npm run build` — ensure no build errors
- [ ] Check bundle sizes: `ls dist/assets` — no file > 500KB (except xlsx chunk)
- [ ] Verify all routes redirect to `/login` when not authenticated
- [ ] Test session expiry: Delete token from localStorage, attempt navigation → should redirect
- [ ] Test 401 response: Should show "Session Expired" toast and redirect to login
- [ ] Smoke test the production build with `npm run preview`

### Day 5 — Production Deployment
- [ ] Set final `VITE_API_BASE_URL` in `.env.production`
- [ ] Run `npm run build`
- [ ] Upload `dist/` to web server
- [ ] Configure web server for SPA routing (index.html fallback)
- [ ] Set cache headers for `dist/assets/`
- [ ] Run final smoke test on production URL
- [ ] Monitor browser console for errors on first launch

---

## Remaining Items (Post-Launch Backlog)

These items were identified but not implemented in this sprint to meet the 5-day deadline:

| Item | Priority | Effort |
|------|----------|--------|
| Server-side pagination | Medium | 2 days |
| Role-based UI element hiding (show/hide buttons by permission) | High | 1 day |
| Low stock notification push | Medium | 1 day |
| Receipt printing improvements | Low | 0.5 day |
| `console.log` cleanup throughout codebase | Low | 0.5 day |
| Remove unused `token` parameters from all store actions | Low | 1 day |
| Add `.gitignore` for `.env.production` | High | 5 min |

---

## Files Created

```
.env
.env.development
.env.production
.env.example
src/store/PurchaseInvoiceStore.js
src/store/OutgoingInvoiceStore.js
src/store/SystemAuditStore.js
docs/stage-01-axios-env-fix.md
docs/stage-02-style-fix.md
docs/stage-03-route-guards.md
docs/stage-04-lazy-loading.md
docs/stage-05-global-error-boundary.md
docs/stage-06-store-loading-states.md
docs/stage-07-real-api-integration.md
docs/stage-08-form-validation.md
docs/stage-09-export-import.md
docs/stage-10-loading-state.md
docs/stage-11-vite-build-config.md
docs/stage-12-production-checklist.md  ← this file
```
