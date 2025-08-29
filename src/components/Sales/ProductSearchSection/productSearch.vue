<template>
  <div class="p-4">
    <div class="flex flex-col space-y-3 md:flex-row md:space-y-0 md:space-x-3 md:items-center">
      <div class="relative flex-grow">
        <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input 
          :value="searchQuery" 
          @input="$emit('update:searchQuery', $event.target.value)"
          @keyup.enter="$emit('search-enter')"
          ref="searchInput"
          type="text"  
          placeholder="Search products..."  
          class="pl-10 w-full rounded-lg border border-gray-300 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
        />
      </div>
      <select 
        :value="selectedCategory" 
        @input="$emit('update:selectedCategory', $event.target.value)"
        class="w-full md:w-48 rounded-lg border border-gray-300 py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white"
      >
        <option value="" disabled selected>Filter by category</option>
        <option v-for="option in categories" :key="option.categoryID" :value="option.categoryID">
          {{ option.categoryName }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductSearchSection',
  props: {
    searchQuery: String,
    selectedCategory: [String, Number],
    categories: Array
  },
  emits: ['update:searchQuery', 'update:selectedCategory', 'search-enter'],
  methods: {
    focus() {
      this.$refs.searchInput.focus();
      this.$refs.searchInput.select();
    }
  }
}
</script>