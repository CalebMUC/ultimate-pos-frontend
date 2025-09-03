<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
    <div class="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-3">
        <h2 class="text-xl font-semibold">Manage Permissions - {{ role?.roleName }}</h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700">✕</button>
      </div>

      <!-- Body -->
      <div class="mt-4 max-h-[60vh] overflow-y-auto">
        <div v-for="group in permissions" :key="group.name" class="mb-4">
          <h3 class="font-medium text-gray-700">{{ group.name }}</h3>
          <div class="grid grid-cols-2 gap-2 mt-2">
            <div
              v-for="perm in group.items"
              :key="perm.key"
              class="flex items-center space-x-2"
            >
              <input
                type="checkbox"
                :id="perm.key"
                v-model="selectedPermissions"
                :value="perm.key"
                class="rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label :for="perm.key" class="text-gray-600">
                {{ perm.label }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 mt-6">
        <button @click="closeModal" class="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300">
          Cancel
        </button>
        <button
          @click="savePermissions"
          class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
        >
          Save
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";

const props = defineProps({
  isOpen: Boolean,
  role: Object,
  permissions: Array,   // grouped { name, items:[{ id, key, label }] }
  modelValue: Array     // pre-selected permissionNames
});

const emits = defineEmits(["close", "save"]);

const selectedPermissions = ref([]);

// Keep checkboxes synced with parent modelValue
watch(
  () => props.modelValue,
  (newVal) => {
    selectedPermissions.value = [...newVal];
  },
  { immediate: true }
);

const closeModal = () => emits("close");

const savePermissions = () => {
  emits("save", {
    roleId: props.role?.roleId,         // ✅ use roleId
    permissions: selectedPermissions.value // ✅ names, will be converted to IDs in parent
  });
};
</script>
