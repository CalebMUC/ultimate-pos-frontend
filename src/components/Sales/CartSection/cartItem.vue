<template>
  <tr class="hover:bg-gray-50 transition-colors duration-150">
    <td class="px-4 py-3 whitespace-nowrap text-sm text-gray-500">{{ index + 1 }}</td>
    <td class="px-4 py-3 text-sm font-medium text-gray-900">
      <div class="truncate max-w-xs" :title="item.productName">{{ item.productName }}</div>
    </td>
    <td class="px-4 py-3 whitespace-nowrap text-right">
      <input 
        type="number" 
        :value="item.count" 
        @input="$emit('update-quantity', $event.target.value)"
        min="1"
        class="w-16 text-right p-1 border rounded border-gray-300 focus:outline-none focus:ring-1 focus:ring-green-500"
      />
    </td>
    <td class="px-4 py-3 whitespace-nowrap text-sm text-right text-gray-500">{{ item.sellingPrice }}.00</td>
    <td class="px-4 py-3 whitespace-nowrap text-sm text-right font-medium text-gray-900">{{ item.subtotal }}.00</td>
    <td class="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
      <button 
        @click="$emit('remove-item')"
        class="text-red-500 hover:text-red-700 focus:outline-none"
        title="Remove item"
      >
        <svg class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      </button>
    </td>
  </tr>
</template>

<script>
export default {
  name: 'CartItem',
  props: {
    item: Object,
    index: Number
  },
  emits: ['update-quantity', 'remove-item']
}
</script>