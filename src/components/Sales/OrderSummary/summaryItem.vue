<template>
  <div class="flex flex-col">
    <span class="text-sm font-medium text-gray-500">{{ label }}</span>
    <span class="text-lg font-semibold text-gray-800">{{ value }}</span>
  </div>
</template>

<script>
export default {
  name: 'SummaryItem',
  props: {
    label: String,
    value: [Number, String]
  }
}
</script>