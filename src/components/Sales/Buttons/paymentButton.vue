<template>
  <button
    :class="[
      'px-3 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1',
      disabled ? 'bg-gray-200 text-gray-400 cursor-not-allowed' : 
      type === 'cash' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200 focus:ring-blue-500' :
      type === 'mpesa' ? 'bg-orange-100 text-orange-700 hover:bg-orange-200 focus:ring-orange-500' :
      'bg-purple-100 text-purple-700 hover:bg-purple-200 focus:ring-purple-500'
    ]"
    :disabled="disabled"
    @click="$emit('click')"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'PaymentButton',
  props: {
    type: {
      type: String,
      default: 'cash',
      validator: (value) => ['cash', 'mpesa', 'credit'].includes(value)
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click']
}
</script>