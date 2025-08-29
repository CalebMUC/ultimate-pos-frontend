<template>
  <div class="w-full lg:w-3/5 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col">
    <CartHeader />
    
    <div class="flex-grow overflow-hidden flex flex-col">
      <div class="overflow-y-auto flex-grow">
        <CartTable 
          :items="items" 
          @update-quantity="$emit('update-quantity', $event)"
          @remove-item="$emit('remove-item', $event)"
          v-if="items.length > 0"
        />
        <EmptyCart v-else />
      </div>
    </div>
  </div>
</template>

<script>
import CartHeader from './CartHeader.vue'
import CartTable from './CartTable.vue'
import EmptyCart from './EmptyCart.vue'

export default {
  name: 'CartSection',
  components: {
    CartHeader,
    CartTable,
    EmptyCart
  },
  props: {
    items: Array
  },
  emits: ['update-quantity', 'remove-item']
}
</script>