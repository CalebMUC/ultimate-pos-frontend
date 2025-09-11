<template>
  <div 
    class="relative bg-white rounded-lg border border-gray-200 p-3 cursor-pointer 
           hover:shadow-md hover:border-green-400 transition-all duration-150 ease-in-out
           hover:scale-[1.02] active:scale-100"
    @click="$emit('select-product', product)"
  >
    <!-- ✅ Checkmark Badge - Smaller and more subtle -->
    <div v-if="selected" 
         class="absolute top-1 right-1 bg-green-500 text-white rounded-full p-0.5 shadow-sm">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-2.5 w-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Category - Smaller and lighter -->
    <p class="text-[11px] text-gray-400 mb-1 leading-tight">{{ product.categoryName }}</p>

    <!-- Product Name - More compact -->
    <h3 class="text-xs font-semibold text-gray-800 mb-2 leading-tight line-clamp-2 min-h-[2rem]">
      {{ product.productName }}
    </h3>

    <!-- Stock + Price Row - More compact -->
    <div class="flex items-center justify-between mt-2">
      <!-- Stock -->
      <span class="text-[11px] font-medium" :class="product.quantity > 0 ? 'text-pink-600' : 'text-red-500'">
        {{ product.quantity }} Pcs
      </span>

      <!-- Price -->
      <span class="text-xs font-bold text-green-600">
        ${{ product.sellingPrice }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProductCard',
  props: {
    product: {
      type: Object,
      required: true
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  emits: ['select-product']
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>