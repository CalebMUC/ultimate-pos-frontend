<template>
  <div class="bg-white rounded-lg shadow-md p-4 mb-6">
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
        <select v-model="filters.dateRange" class="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="today">Today</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
          <option value="quarter">This Quarter</option>
          <option value="year">This Year</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select v-model="filters.category" class="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="all">All Categories</option>
          <option v-for="c in categories" :key="c" :value="c">{{ c }}</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
        <select v-model="filters.branch" class="w-full rounded-md border border-gray-300 py-2 px-3 focus:outline-none focus:ring-2 focus:ring-primary">
          <option value="all">All Branches</option>
          <option v-for="b in branches" :key="b" :value="b">{{ b }}</option>
        </select>
      </div>
      <div class="flex items-end">
        <button @click="applyFilters" class="w-full bg-primary hover:bg-secondary text-white font-medium py-2 px-4 rounded-md transition duration-200">
          Apply Filters
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    categories: Array,
    branches: Array
  },
  data() {
    return {
      filters: {
        dateRange: "today",
        category: "all",
        branch: "all"
      }
    };
  },
  methods: {
    applyFilters() {
      this.$emit('apply', this.filters);
    }
  }
}
</script>