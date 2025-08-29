<template>
  <Modal :is-open="isOpen" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-semibold text-gray-900">Pay via Credit</h3>
    </template>
    
    <form @submit.prevent="$emit('submit', { amount: creditAmount, customerName })">
      <div class="mb-5">
        <label for="creditAmount" class="block text-sm font-medium text-gray-700 mb-1">Credit Amount</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">KSh</span>
          </div>
          <input
            id="creditAmount"
            type="number"
            v-model.number="creditAmount"
            :min="totalCost"
            class="focus:ring-gray-500 focus:border-gray-500 block w-full pl-12 py-3 sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div v-if="creditAmount > 0" class="mt-2 text-sm">
          <p class="text-gray-600">Total: <span class="font-medium">{{ totalCost }} KSh</span></p>
          <p class="text-gray-600">Balance: <span class="font-medium">{{ creditAmount - totalCost }} KSh</span></p>
        </div>
      </div>
      <div class="mb-4">
        <label for="customerName" class="block text-sm font-medium text-gray-700 mb-1">Customer Name</label>
        <input
          id="customerName"
          type="text"
          v-model="customerName"
          class="focus:ring-gray-500 focus:border-gray-500 block w-full py-2 px-3 sm:text-sm border-gray-300 rounded-md"
          required
        />
      </div>
      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-700 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
          Confirm Credit
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from '../Modals/BaseModal.vue';

export default {
  name: 'CreditModal',
  components: {
    Modal
  },
  props: {
    isOpen: Boolean,
    totalCost: Number
  },
  emits: ['close', 'submit'],
  data() {
    return {
      creditAmount: 0,
      customerName: ''
    }
  },
  watch: {
    totalCost: {
      immediate: true,
      handler(newVal) {
        this.creditAmount = newVal;
      }
    }
  }
}
</script>