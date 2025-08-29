<template>
  <div class="bg-white shadow-sm px-6 py-4 border-b border-gray-200">
    <h1 class="text-2xl font-semibold text-gray-800">
      <slot>Make Sale</slot>
    </h1>
  </div>
</template>

<script>
export default {
  name: 'HeaderComponent'
}
</script>