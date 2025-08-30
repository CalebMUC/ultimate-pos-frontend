<template>
  <div class="bg-white px-6 py-4 mx-4 mt-4 rounded-lg border border-gray-200 shadow-sm">
    <div class="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
      <div class="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <SummaryItem label="ITEMS" :value="itemsCount" />
        <SummaryItem label="DISCOUNT" :value="discount" />
        <SummaryItem label="SHIPPING" :value="shipping" />
        <SummaryItem label="VAT" :value="vat" />
        <div class="flex flex-col">
          <span class="text-sm font-medium text-gray-500">TOTAL</span>
          <span class="text-xl font-bold text-green-600">{{ total }} KSH</span>
        </div>
      </div>
      
      <div class="flex space-x-3">
        <PaymentButton 
          type="cash" 
          :disabled="itemsCount === 0"
          @click="$emit('open-cash')"
        >
          CASH
        </PaymentButton>
        
        <PaymentButton 
          type="mpesa" 
          :disabled="itemsCount === 0"
          @click="$emit('open-mpesa')"
        >
          M-PESA
        </PaymentButton>
        
        <PaymentButton 
          type="credit" 
          :disabled="itemsCount === 0"
          @click="$emit('open-credit')"
        >
          CREDIT
        </PaymentButton>
      </div>
    </div>
  </div>
</template>

<script>
import SummaryItem from './summaryItem.vue'
import PaymentButton from '../Buttons/paymentButton.vue';

export default {
  name: 'OrderSummary',
  components: {
    SummaryItem,
    PaymentButton
  },
  props: {
    itemsCount: Number,
    discount: [Number, String],
    shipping: [Number, String],
    vat: [Number, String],
    total: [Number, String]
  },
  emits: ['open-cash', 'open-mpesa', 'open-credit']
}
</script>