<template>
  <Modal :is-open="isOpen" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-semibold text-gray-900">Pay via Cash</h3>
    </template>
    
    <form @submit.prevent="handleSubmit">
      <div class="mb-5">
        <label for="cashAmount" class="block text-sm font-medium text-gray-700 mb-1">Amount Tendered</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">KSh</span>
          </div>
          <input
            id="cashAmount"
            type="number"
            v-model.number="cashAmount"
            :min="totalCost"
            class="focus:ring-blue-500 focus:border-blue-500 block w-full pl-12 py-3 sm:text-sm border-gray-300 rounded-md"
            required
          />
        </div>
        <div v-if="cashAmount > 0" class="mt-2 text-sm">
          <p class="text-gray-600">Total: <span class="font-medium">{{ totalCost }} KSh</span></p>
          <p class="text-gray-600">Change: <span class="font-medium">{{ change }} KSh</span></p>
        </div>
      </div>
      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <button 
          type="button" 
          @click="$emit('close')" 
          class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Cancel
        </button>
        <button 
          type="submit" 
          class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          Confirm Payment
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from '../Modals/BaseModal.vue';

export default {
  name: 'CashModal',
  components: { Modal },
  props: {
    isOpen: Boolean,
    totalCost: Number
  },
  emits: ['close', 'submit'],
  data() {
    return {
      cashAmount: 0
    }
  },
  computed: {
    change() {
      return this.cashAmount - this.totalCost;
    }
  },
  watch: {
    totalCost: {
      immediate: true,
      handler(newVal) {
        this.cashAmount = newVal;
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', {
        cashAmount: this.cashAmount,
        change: this.change
      });
    }
  }
}
</script>
