<template>
  <button 
    :disabled="disabled"
    :class="buttonClasses"
    class="text-white font-medium rounded-lg px-6 py-2.5 focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 flex items-center"
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
      validator: value => ['cash', 'mpesa', 'credit'].includes(value),
      required: true
    },
    disabled: Boolean
  },
  computed: {
    buttonClasses() {
      const baseClasses = {
        cash: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
        mpesa: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
        credit: 'bg-gray-700 hover:bg-gray-800 focus:ring-gray-500'
      };
      
      const disabledClasses = {
        cash: 'bg-blue-400 cursor-not-allowed',
        mpesa: 'bg-green-400 cursor-not-allowed',
        credit: 'bg-gray-400 cursor-not-allowed'
      };
      
      return this.disabled ? disabledClasses[this.type] : baseClasses[this.type];
    }
  },
  emits: ['click']
}
</script>