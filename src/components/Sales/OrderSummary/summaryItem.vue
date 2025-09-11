<template>
  <div class="flex flex-col">
    <span class="text-xs font-medium text-gray-500">{{ label }}</span>
    <span class="text-sm font-semibold text-gray-800">{{ formattedValue }}</span>
  </div>
</template>

<script>
export default {
  name: 'SummaryItem',
  props: {
    label: {
      type: String,
      required: true
    },
    value: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    formattedValue() {
      if (typeof this.value === 'number') {
        return this.value.toFixed(2);
      }
      return this.value;
    }
  }
}
</script>