<template>
  <div class="border-t border-gray-200 flex-grow overflow-hidden flex flex-col">
    <div class="p-4 overflow-y-auto flex grow">
      <div v-if="hasProducts" class="w-full">
        <!-- Product Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ProductCard 
            v-for="product in paginatedProducts" 
            :key="product.productID" 
            :product="product"
            @select-product="$emit('select-product', product)"
          />
        </div>

        <!-- Pagination -->
        <div class="flex justify-center mt-6 space-x-2">
          <button 
            class="px-3 py-1 rounded-lg border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            :disabled="currentPage === 1"
            @click="currentPage--"
          >
            Prev
          </button>

          <button 
            v-for="page in totalPages" 
            :key="page" 
            class="px-3 py-1 rounded-lg border"
            :class="page === currentPage 
              ? 'bg-green-500 text-white border-green-500' 
              : 'bg-white text-gray-700 hover:bg-gray-100'"
            @click="currentPage = page"
          >
            {{ page }}
          </button>

          <button 
            class="px-3 py-1 rounded-lg border bg-gray-100 text-gray-700 hover:bg-gray-200 disabled:opacity-50"
            :disabled="currentPage === totalPages"
            @click="currentPage++"
          >
            Next
          </button>
        </div>
      </div>

      <!-- No Products -->
      <div v-else class="flex items-center justify-center w-full text-gray-500">
        No products found
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
    hasProducts: Boolean
  },
  emits: ['select-product'],
  data() {
    return {
      currentPage: 1,
      perPage: 9 // 9 items per page (3x3 grid)
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.perPage)
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.perPage
      return this.products.slice(start, start + this.perPage)
    }
  },
  watch: {
    products() {
      this.currentPage = 1 // reset to first page if products change
    }
  }
}
</script>
