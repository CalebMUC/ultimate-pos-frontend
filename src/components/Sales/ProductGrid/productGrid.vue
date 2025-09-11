<template>
  <div class="border-t border-gray-200 flex-grow overflow-hidden flex flex-col">
    <div class="p-3 overflow-y-auto flex grow">
      <div v-if="hasProducts" class="w-full">
        <!-- Product Grid - Tighter spacing -->
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.productID" 
            :product="product"
            :selected="isProductSelected(product)"
            @select-product="$emit('select-product', product)"
          />
        </div>

        <!-- Pagination - More compact -->
        <div class="flex justify-center mt-4 space-x-1">
          <button 
            class="px-2 py-1 text-xs rounded border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            ←
          </button>

          <button 
            v-for="page in visiblePages" 
            :key="page" 
            class="px-2 py-1 text-xs rounded border min-w-[2rem] transition-colors"
            :class="page === currentPage 
              ? 'bg-green-500 text-white border-green-500' 
              : 'bg-white text-gray-700 hover:bg-gray-100'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button 
            class="px-2 py-1 text-xs rounded border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50 transition-colors"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            →
          </button>
        </div>
      </div>

      <!-- No Products - More compact -->
      <div v-else class="flex items-center justify-center w-full text-gray-400 text-sm py-8">
        <div class="text-center">
          <svg class="mx-auto h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No products found</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductCard from './productCard.vue'

export default {
  name: 'ProductGrid',
  components: {
    ProductCard
  },
  props: {
    products: {
      type: Array,
      default: () => []
    },
    hasProducts: Boolean,
    selectedItems: {
      type: Array,
      default: () => []
    }
  },
  emits: ['select-product'],
  data() {
    return {
      currentPage: 1,
      perPage: 12 // Increased to 12 items per page (4x3 grid)
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.products.slice(start, start + this.perPage)
    },
    visiblePages() {
      const maxVisible = 5;
      const start = Math.max(1, this.currentPage - Math.floor(maxVisible / 2));
      const end = Math.min(this.totalPages, start + maxVisible - 1);
      
      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      return pages;
    }
  },
  methods: {
    isProductSelected(product) {
      return this.selectedItems.some(item => item.productID === product.productID);
    }
  },
  watch: {
    products() {
      this.currentPage = 1 // reset to first page if products change
    }
  }
}
</script>