# Stage 6 — Loading & Error States in Stores

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟠 High

---

## Problem

`src/store/DocumentsStore.js` was missing `loading` and `error` in its state, yet the action code referenced `this.loading = false` — causing a Vue reactive mutation warning and the loading state never persisted correctly.

Additional issues in `DocumentsStore`:
- All actions passed `token` as a parameter, but the auth interceptor (Stage 1) handles that automatically
- `upload`, `fetchDocuments`, `preview`, `download` had no try/catch, causing unhandled promise rejections

---

## Changes Made

### `src/store/DocumentsStore.js`

**Before:**
```js
state: () => ({
  uploadedFileId: null,
  previewBlobUrl: null,
  data: [],
  // ❌ loading and error not declared
}),
actions: {
  async upload({ fileName, file }, token) {  // ❌ token param not needed
    axios.uploadFile(formData, token)         // ❌ no try/catch
      .then(response => { this.data = response.data })
      .catch(error => { this.error = error; this.loading = false }) // ❌ loading never set to true
  }
}
```

**After:**
```js
state: () => ({
  uploadedFileId: null,
  previewBlobUrl: null,
  data: [],
  loading: false,  // ✅ declared
  error: null,     // ✅ declared
}),
actions: {
  async upload({ fileName, file }) {  // ✅ no token param
    this.loading = true
    this.error = null
    try {
      const response = await axios.uploadFile(formData)
      this.data = response.data
    } catch (error) {
      this.error = error?.message || 'Upload failed'
    } finally {
      this.loading = false  // ✅ always resets
    }
  }
}
```

---

## Standard Store Pattern

All stores in the project should follow this pattern:

```js
state: () => ({
  data: [],
  loading: false,   // ← show spinner/skeleton
  error: null,      // ← show error message if not null
}),

actions: {
  async fetchData() {
    this.loading = true
    this.error = null
    try {
      const res = await axios.getSomeData()
      this.data = res.data
    } catch (err) {
      this.error = err?.message || 'Failed to load data'
      throw err  // re-throw so views/ModuleComponent can also catch
    } finally {
      this.loading = false
    }
  }
}
```

---

## Stores Already Compliant

The following stores already had proper loading/error patterns before this fix:
- `TillManagementStore.js` ✅
- `SaleStore.js` ✅
- `PurchaseStore.js` ✅

---

## New Stores Created (all with loading/error)

| Store | File |
|-------|------|
| Purchase Invoices | `src/store/PurchaseInvoiceStore.js` |
| Outgoing Invoices | `src/store/OutgoingInvoiceStore.js` |
| System Audit Logs | `src/store/SystemAuditStore.js` |
