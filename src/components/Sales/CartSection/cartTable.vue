<template>
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">#</th>
          <th scope="col" class="px-2 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">Product</th>
          <th scope="col" class="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Qty</th>
          <th scope="col" class="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
          <th scope="col" class="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Subtotal</th>
          <th scope="col" class="px-2 py-2 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-16"></th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <CartItem 
          v-for="(item, index) in items" 
          :key="index" 
          :item="item" 
          :index="index"
          @update-quantity="$emit('update-quantity', { item, quantity: $event })"
          @remove-item="$emit('remove-item', index)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import CartItem from './cartItem.vue'

export default {
  name: 'CartTable',
  components: {
    CartItem
  },
  props: {
    items: Array
  },
  emits: ['update-quantity', 'remove-item']
}
</script>