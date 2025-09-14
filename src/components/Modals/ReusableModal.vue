<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
    @click.self="closeModal"
  >
    <div
      class="bg-white p-6 rounded-xl shadow-xl w-full max-h-[90vh] overflow-y-auto transition-all"
      :class="{
        'max-w-sm': size === 'sm',
        'max-w-md': size === 'md',
        'max-w-lg': size === 'lg',
        'max-w-2xl': size === 'xl',
        'max-w-5xl': size === 'full'
      }"
    >
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-lg font-semibold text-slate-800">{{ title }}</h3>
        <button
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <!-- Content Slot -->
      <div>
        <slot />
      </div>

      <!-- Footer -->
      <div class="mt-6 flex justify-end gap-3">
        <slot name="footer">
          <button
            @click="closeModal"
            class="px-4 py-2.5 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button
            @click="$emit('confirm')"
            :disabled="!isFormValid"
            class="px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {{ confirmText }}
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReusableModal",
  props: {
    isOpen: { type: Boolean, default: false },
    title: { type: String, default: "Modal" },
    confirmText: { type: String, default: "Confirm" },
    isFormValid: { type: Boolean, default: true },
    size: { type: String, default: "md" } // ✅ only handles modal width
  },
  emits: ["update:isOpen", "confirm"],
  methods: {
    closeModal() {
      this.$emit("update:isOpen", false);
    }
  }
};
</script>
