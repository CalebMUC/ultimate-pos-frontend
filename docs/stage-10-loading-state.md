# Stage 10 — Loading State Overlay in ModuleComponent

**Date:** 2026-03-03  
**Status:** ✅ Implemented  
**Priority:** 🟡 Medium

---

## Problem

`ModuleComponent.vue` had no visual feedback while data was being fetched. The table simply showed "No records found" during the API call, which users could mistake for an empty dataset.

Additionally, `onMounted` was called synchronously without awaiting, so loading states from the parent store weren't propagated:
```js
// ❌ Before
onMounted(() => { props.fetchData() }) // fire and forget
```

---

## Implementation

### Loading Overlay

A semi-transparent white overlay with an animated spinner is positioned absolutely over the entire component:

```html
<div class="rounded-xl ... relative">
  <!-- Loading Overlay -->
  <div v-if="isLoading" class="absolute inset-0 bg-white/70 flex items-center justify-center z-20 rounded-xl">
    <div class="flex flex-col items-center gap-2">
      <svg class="animate-spin h-8 w-8 text-orange-500" ...>...</svg>
      <span class="text-xs text-gray-500">Loading...</span>
    </div>
  </div>
  <!-- rest of component -->
```

### `isLoading` Internal Ref

An internal `isLoading` ref is managed for:
- **Initial mount:** Set to `true` before `fetchData()`, reset in `finally`
- **Add/Update:** Set to `true` during `handleConfirm`, reset in `finally`
- **Delete:** Set to `true` during `confirmDelete`, reset in `finally`

```js
const isLoading = ref(false)

onMounted(async () => {
  isLoading.value = true
  try {
    await props.fetchData()
  } finally {
    isLoading.value = false
  }
})
```

### `loading` Prop (Optional)

A `loading` prop was also added for parent components that want to control the loading state externally:

```js
props: {
  loading: { type: Boolean, default: false },
  ...
}
```

This is useful when a parent view wants to show loading during its own data fetching operations.

---

## User Experience

| State | Visual |
|-------|--------|
| Fetching data | Semi-transparent overlay + orange spinning circle + "Loading..." text |
| Adding/Updating | Same overlay while API call is in flight |
| Deleting | Same overlay |
| Idle | No overlay, normal table |

The overlay:
- Uses `z-20` to appear above all table content
- `bg-white/70` maintains component context visibility (blurred-glass look)
- `rounded-xl` matches the card border radius
