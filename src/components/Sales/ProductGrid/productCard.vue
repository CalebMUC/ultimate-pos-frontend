<template>
  <div 
    class="relative bg-white rounded-xl border border-gray-200 shadow-sm p-4 cursor-pointer 
           hover:shadow-md hover:border-green-400 transition transform hover:-translate-y-1 active:scale-95 duration-150"
    @click="$emit('select-product', product)"
  >
    <!-- ✅ Checkmark Badge -->
    <div v-if="selected" 
         class="absolute top-2 right-2 bg-green-500 text-white rounded-full p-1 shadow-md">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Category -->
    <p class="text-xs text-gray-500 mb-1">{{ product.categoryName }}</p>

    <!-- Product Name -->
    <h3 class="text-sm font-semibold text-gray-800 mb-3 leading-snug line-clamp-2">
    {{ product.productName }}
    </h3>

    <!-- Stock + Price Row -->
    <div class="flex items-center justify-between mt-auto">
      <!-- Stock -->
      <span class="text-xs font-medium text-pink-600">
        {{ product.quantity }} Pcs
      </span>

      <!-- Price -->
      <span class="text-sm font-bold text-green-600">
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
