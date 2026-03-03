# Stage 7 — Real API Integration (Replacing Placeholder Data)

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🔴 Critical

---

## Problem

Four views had hardcoded dummy data instead of real API calls:

| View | Problem |
|------|---------|
| `PurchaseInvoices.vue` | Hardcoded invoice array, no store |
| `OutgoingInvoice.vue` | Hardcoded invoice array with `console.log` stubs |
| `SystemAudit.vue` | Hardcoded audit log array, dummy filter handler |
| `TillClosure.vue` | Hardcoded tills array, `alert()` instead of API call |

---

## New Stores Created

### `src/store/PurchaseInvoiceStore.js`
Full CRUD store with `fetchInvoices`, `addInvoice`, `updateInvoice`, `deleteInvoice`.  
Calls: `GET /PurchaseInvoices/GetPurchaseInvoices`, `POST /PurchaseInvoices/AddPurchaseInvoice`, etc.

### `src/store/OutgoingInvoiceStore.js`
Full CRUD store with the same pattern.  
Calls: `GET /OutgoingInvoices/GetOutgoingInvoices`, etc.

### `src/store/SystemAuditStore.js`
Read-only store with `fetchAuditLogs(filters)`.  
Calls: `POST /Audit/GetAuditLogs`

---

## New API Endpoints Added to `axios.js`

```js
// Purchase Invoices
getPurchaseInvoices()
addPurchaseInvoice(postData)
updatePurchaseInvoice(postData)
deletePurchaseInvoice(id)

// Outgoing Invoices
getOutgoingInvoices()
addOutgoingInvoice(postData)
updateOutgoingInvoice(postData)
deleteOutgoingInvoice(id)

// System Audit
getAuditLogs(filters)
```

> **Backend Note:** Ensure the API endpoints above exist on the server. The URL paths should match the backend controller routes. Update the paths in `axios.js` if they differ.

---

## Views Updated

### `PurchaseInvoices.vue`
- Now uses `usePurchaseInvoiceStore` via Pinia
- `storeToRefs` ensures reactivity
- All CRUD operations call the store

### `OutgoingInvoice.vue`
- Now uses `useOutgoingInvoiceStore` via Pinia
- Added `invoiceNo` field to form (was missing)
- Status options now use `{ value, label }` format for proper select binding

### `SystemAudit.vue`
- Now uses `useSystemAuditStore`
- Calls `fetchAuditLogs(filters)` on mount and when "Generate" is clicked
- Loading state from store available for future spinner

### `TillClosure.vue`
- Now uses `useTillManagementStore` (already existed and had full API integration)
- `submitClosure` now calls `tillStore.SubmitClosure(payload)` instead of `alert()`
- Uses Swal for success/error feedback
- Tills loaded from store instead of hardcoded

---

## Backend Endpoint Contract

The frontend expects the following response shapes:

**GET /PurchaseInvoices/GetPurchaseInvoices**
```json
[
  {
    "invoiceId": "abc-123",
    "invoiceNo": "INV-1001",
    "invoiceDate": "2025-09-01",
    "supplier": "ABC Supplies",
    "refNo": "PO-555",
    "totalAmount": 2500.00,
    "taxAmount": 400.00,
    "status": "Pending",
    "createdOn": "2025-09-05",
    "createdBy": "Admin"
  }
]
```

**POST /Audit/GetAuditLogs** (with filters)
```json
// Request:
{ "fromDate": "2025-08-01", "toDate": "2025-08-31", "modules": "till" }

// Response:
[
  {
    "date": "2025-08-26 18:21",
    "module": "Till",
    "user": "Cashier1",
    "action": "Close Till",
    "details": "Variance: -100 KES",
    "ipAddress": "192.168.1.5",
    "device": "POS #01"
  }
]
```
