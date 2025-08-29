<template>
  <div v-if="isOpen" class="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
    <div class="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden">
      <div class="flex items-center justify-between p-5 border-b border-gray-200">
        <slot name="header"></slot>
        <button @click="$emit('close')" class="text-gray-400 hover:text-gray-500 focus:outline-none">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-5">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    isOpen: Boolean
  },
  emits: ['close']
}
</script>