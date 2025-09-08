<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
  >
    <div class="bg-white rounded-lg shadow-md w-full max-w-lg p-4">
      <!-- Header -->
      <div class="flex justify-between items-center border-b pb-2">
        <h2 class="text-lg font-medium">
          Manage Permissions - {{ role?.roleName }}
        </h2>
        <button @click="closeModal" class="text-gray-500 hover:text-gray-700 text-sm">
          ✕
        </button>
      </div>

      <!-- Body -->
      <div class="mt-3 max-h-[55vh] overflow-y-auto">
        <div v-for="group in permissions" :key="group.name" class="mb-3">
          <h3 class="font-medium text-gray-700 text-sm">{{ group.name }}</h3>
          <div class="grid grid-cols-2 gap-1 mt-1">
            <div
              v-for="perm in group.items"
              :key="perm.key"
              class="flex items-center space-x-1"
            >
              <input
                type="checkbox"
                :id="perm.key"
                v-model="selectedPermissions"
                :value="perm.key"
                class="h-3 w-3 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <label :for="perm.key" class="text-gray-600 text-xs">
                {{ perm.label }}
              </label>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-2 mt-4">
        <button
          @click="closeModal"
          class="px-3 py-1 text-sm bg-gray-200 rounded-md hover:bg-gray-300"
        >
          Cancel
        </button>
        <button
          @click="savePermissions"
          class="px-3 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
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

// Sync with parent modelValue
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
    roleId: props.role?.roleId,
    permissions: selectedPermissions.value
  });
};
</script>
