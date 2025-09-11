<template>
  <tr class="hover:bg-gray-50">
    <td class="px-2 py-1.5 whitespace-nowrap text-xs text-gray-600">
      {{ index + 1 }}
    </td>
    <td class="px-2 py-1.5 text-xs font-medium text-gray-900 truncate max-w-xs" :title="item.productName">
      {{ item.productName }}
    </td>
    <td class="px-2 py-1.5 whitespace-nowrap">
      <div class="flex items-center justify-end space-x-1">
        <button 
          @click="decrement"
          class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-600"
          :disabled="item.count <= 1"
        >
          -
        </button>
        <input
          type="number"
          :value="item.count"
          @input="updateQuantity($event.target.value)"
          @blur="validateQuantity"
          class="w-12 h-6 text-xs text-center border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-green-500"
          min="1"
          :max="item.quantity"
        />
        <button 
          @click="increment"
          class="w-6 h-6 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded text-xs font-bold text-gray-600"
          :disabled="item.count >= item.quantity"
        >
          +
        </button>
      </div>
    </td>
    <td class="px-2 py-1.5 whitespace-nowrap text-xs text-right text-gray-600">
      {{ formatCurrency(item.sellingPrice) }}
    </td>
    <td class="px-2 py-1.5 whitespace-nowrap text-xs text-right font-medium text-green-600">
      {{ formatCurrency(item.subtotal) }}
    </td>
    <td class="px-2 py-1.5 whitespace-nowrap text-right">
      <button
        @click="$emit('remove-item')"
        class="text-red-500 hover:text-red-700 text-xs font-medium"
        title="Remove item"
      >
        ✕
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
  emits: ['update-quantity', 'remove-item'],
  methods: {
    increment() {
      if (this.item.count < this.item.quantity) {
        this.$emit('update-quantity', this.item.count + 1);
      }
    },
    decrement() {
      if (this.item.count > 1) {
        this.$emit('update-quantity', this.item.count - 1);
      }
    },
    updateQuantity(value) {
      const quantity = parseInt(value);
      if (!isNaN(quantity) && quantity >= 1 && quantity <= this.item.quantity) {
        this.$emit('update-quantity', quantity);
      }
    },
    validateQuantity(event) {
      const value = parseInt(event.target.value);
      if (isNaN(value) || value < 1) {
        this.$emit('update-quantity', 1);
      } else if (value > this.item.quantity) {
        this.$emit('update-quantity', this.item.quantity);
      }
    },
    formatCurrency(amount) {
      return new Intl.NumberFormat('en-KE', {
        style: 'currency',
        currency: 'KES'
      }).format(amount);
    }
  }
}
</script>