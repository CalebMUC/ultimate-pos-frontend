<template>
  <div class="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow text-sm">
    <!-- Render Filters Dynamically -->
    <div
      v-for="(filter, index) in filters"
      :key="index"
      class="flex flex-col"
    >
      <label class="text-sm font-medium mb-1">{{ filter.label }}</label>

      <!-- Native Date Input -->
      <input
        v-if="filter.type === 'date'"
        type="date"
        v-model="formValues[filter.key]"
        class="text-sm border rounded-lg px-3 py-2 w-48"
        :placeholder="filter.placeholder || 'Select date'"
        @input="emitFilters"
      />

      <!-- Dynamic Dropdown Filters -->
      <select
        v-else-if="filter.type === 'select'"
        v-model="formValues[filter.key]"
        @change="emitFilters"
        class="border rounded-lg px-3 py-2 w-48"
      >
        <option value="">All</option>
        <option
          v-for="option in filter.options"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>

      <!-- Text Input -->
      <input
        v-else-if="filter.type === 'text'"
        type="text"
        v-model="formValues[filter.key]"
        class="text-sm border rounded-lg px-3 py-2 w-48"
        :placeholder="filter.placeholder || ''"
        @input="emitFilters"
      />
      
      <!-- Numeric Input -->
      <input
        v-else-if="filter.type === 'number'"
        type="number"
        v-model.number="formValues[filter.key]"
        class="text-sm border rounded-lg px-3 py-2 w-48"
        :placeholder="filter.placeholder || ''"
        @input="emitFilters"
      />
    </div>

    <!-- Generate Button -->
    <button
      @click="emitFilters"
      class="bg-orange-400 hover:bg-orange-500 text-white px-6 py-2 rounded-lg font-medium transition"
    >
      Generate Report
    </button>
  </div>
</template>

<script setup>
import { reactive, watchEffect } from "vue";

const emit = defineEmits(['generate']);

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
    validator: (value) => {
      const validTypes = ['date', 'select', 'text', 'number'];
      return value.every(filter => {
        return validTypes.includes(filter.type) && 
               typeof filter.key === 'string' && 
               typeof filter.label === 'string';
      });
    }
  }
});

const formValues = reactive({});

// Initialize form values with defaults
watchEffect(() => {
  props.filters.forEach(f => {
    if (!Object.prototype.hasOwnProperty.call(formValues, f.key)) {
      if (f.type === 'select') formValues[f.key] = '';
      else if (f.type === 'date') formValues[f.key] = '';
      else formValues[f.key] = null;
    }
  });
});

const emitFilters = () => {
  const payload = { ...formValues };
  emit('generate', payload);
};
</script>
