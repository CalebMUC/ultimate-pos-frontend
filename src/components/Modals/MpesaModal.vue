<template>
  <Modal :is-open="isOpen" @close="$emit('close')">
    <template #header>
      <h3 class="text-xl font-semibold text-gray-900">Pay via M-PESA</h3>
    </template>
    
    <form @submit.prevent="$emit('submit', phoneNumber)">
      <div class="mb-5">
        <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <div class="mt-1 relative rounded-md shadow-sm">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span class="text-gray-500 sm:text-sm">+254</span>
          </div>
          <input
            id="phone"
            type="tel"
            placeholder="700123456"
            v-model="phoneNumber"
            class="focus:ring-green-500 focus:border-green-500 block w-full pl-16 py-3 sm:text-sm border-gray-300 rounded-md"
            required
            pattern="[0-9]{9}"
            maxlength="9"
          />
        </div>
      </div>
      <div class="flex justify-between items-center pt-4 border-t border-gray-200">
        <button type="button" @click="$emit('close')" class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Cancel
        </button>
        <button type="submit" class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
          Confirm Payment
        </button>
      </div>
    </form>
  </Modal>
</template>

<script>
import Modal from '../Modals/BaseModal.vue';

export default {
  name: 'MpesaModal',
  components: {
    Modal
  },
  props: {
    isOpen: Boolean
  },
  emits: ['close', 'submit'],
  data() {
    return {
      phoneNumber: ''
    }
  }
}
</script>