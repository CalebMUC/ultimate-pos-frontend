<template>
  <div
    v-if="show"
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
  >
    <div class="bg-white rounded-lg shadow-lg w-96 p-4">
      <h2 class="text-lg font-semibold mb-3">Open Till - {{ till?.name }}</h2>

      <!-- Opening Amount -->
      <div class="mb-2">
        <label class="block text-xs font-medium mb-1">Opening Amount</label>
        <input
          v-model="form.openingAmount"
          type="number"
          class="w-full border px-2 py-1 rounded text-sm"
        />
      </div>

      <!-- Expected Amount -->
      <div class="mb-2">
        <label class="block text-xs font-medium mb-1">Expected Amount</label>
        <input
          v-model="form.expectedAmount"
          type="number"
          class="w-full border px-2 py-1 rounded text-sm"
        />
      </div>

      <!-- Supervisor Notes -->
      <div class="mb-3">
        <label class="block text-xs font-medium mb-1">Notes</label>
        <textarea
          v-model="form.notes"
          rows="2"
          class="w-full border px-2 py-1 rounded text-sm"
        ></textarea>
      </div>

      <!-- Buttons -->
      <div class="flex justify-end gap-2">
        <button
          @click="$emit('close')"
          class="px-3 py-1.5 bg-gray-200 rounded text-sm hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="submitForm"
          class="px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700"
        >
          Confirm
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  name: "TillOpenModal",
  props: {
    show: Boolean,
    till: Object, // The till being opened
  },
  setup(props, { emit }) {
    const form = ref({
      openingAmount: "",
      expectedAmount: "",
      notes: "",
    });

    // Reset form when modal is opened
    watch(
      () => props.show,
      (val) => {
        if (val) {
          form.value = { openingAmount: "", expectedAmount: "", notes: "" };
        }
      }
    );

    const submitForm = () => {
      emit("confirm", {
        tillId: props.till.tillId,
        ...form.value,
      });
    };

    return { form, submitForm };
  },
};
</script>