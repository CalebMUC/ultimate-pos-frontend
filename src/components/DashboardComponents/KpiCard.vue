<template>
  <div class="bg-white rounded-lg shadow-md p-5">
    <div class="flex justify-between items-start mb-4">
      <h3 class="text-gray-500 font-medium">{{ title }}</h3>
      <div
        class="w-10 h-10 rounded-lg flex items-center justify-center"
        :class="color"
      >
        <i class="text-white text-lg" :class="icon"></i>
      </div>
    </div>

    <p class="text-2xl font-bold mb-1">{{ value }}</p>

    <!-- safe check for trend -->
    <p
      v-if="trend"
      class="text-sm"
      :class="isPositive ? 'text-green-500' : 'text-red-500'"
    >
      <i
        class="mr-1"
        :class="isPositive ? 'fas fa-arrow-up' : 'fas fa-arrow-down'"
      ></i>
      {{ trend }} from previous period
    </p>

    <!-- fallback if no trend passed -->
    <p v-else class="text-sm text-gray-400">
      No trend data available
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, required: true },
    value: { type: [String, Number], required: true },
    trend: { type: String, default: "" },
    icon: { type: String, default: "fas fa-chart-line" },
    color: { type: String, default: "bg-blue-500" },
  },
  computed: {
    isPositive() {
      return this.trend?.includes("+");
    },
  },
};
</script>
