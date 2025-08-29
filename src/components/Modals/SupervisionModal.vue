<!-- SupervisionModal.vue -->
<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
    <div class="bg-white rounded-xl shadow-lg w-[400px] p-6">
      <h2 class="text-lg font-semibold mb-4">Till Supervision</h2>

      <!-- Details -->
      <div class="space-y-2 text-sm">
        <p><strong>Cashier:</strong> {{ item.cashierName }}</p>
        <p><strong>Till:</strong> {{ item.tillId }}</p>
        <p><strong>Expected:</strong> {{ formatCurrency(item.expectedCash) }}</p>
        <p><strong>Counted:</strong> {{ formatCurrency(item.countedCash) }}</p>
        <p><strong>Variance:</strong> 
          <span :class="item.variance < 0 ? 'text-red-600' : 'text-green-600'">
            {{ formatCurrency(item.variance) }}
          </span>
        </p>
        <p><strong>Status:</strong> {{ item.status }}</p>
      </div>

      <!-- Actions -->
      <div class="flex justify-end gap-3 mt-6">
        <button @click="onReject" class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600">
          Reject
        </button>
        <button @click="onApprove" class="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
          Approve
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  item: Object,
});
const emits = defineEmits(["approve", "reject", "close"]);

const formatCurrency = (val) => `KES ${val.toLocaleString()}`;
const onApprove = () => emits("approve", props.item);
const onReject = () => emits("reject", props.item);
</script>
