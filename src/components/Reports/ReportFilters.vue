<template>
  <div class="flex flex-wrap gap-4 items-end bg-white p-4 rounded-lg shadow text-sm">
    <!-- Render Filters Dynamically -->
    <div
      v-for="(filter, index) in filters"
      :key="index"
      class="flex flex-col"
    >
      <label class="text-sm font-medium mb-1">{{ filter.label }}</label>

      <!-- Date Range Picker -->
      <!-- <DatePicker
  v-if="filter.type === 'date-range'"
  v-model:value="formValues[filter.key]"
  type="daterange"
  format="DD/MM/YYYY"         
  range-separator=" - "
  unlink-panels
  :shortcuts="shortCuts"
  placeholder="Select date range"
  class="text-sm border rounded-lg px-3 py-2 w-64"
  @change="emitFilters"
/> -->

 <VueDatePicker
        v-if="filter.type === 'date-range'"
        v-model="formValues[filter.key]"
        range
        :format="format"
        :enable-time-picker="false"
        :preset-dates="presetDates"
        :preset-ranges="presetRanges"
        placeholder="Select date range"
        class="text-sm border rounded-lg px-3 py-2 w-64"
        @update:model-value="emitFilters"
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
import DatePicker from "vue-datepicker-next";
import 'vue-datepicker-next/index.css';
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css';

const emit = defineEmits(['generate']);

const props = defineProps({
  filters: {
    type: Array,
    default: () => [],
    validator: (value) => {
      return value.every(filter => {
        const validTypes = ['date-range', 'select', 'text'];
        return validTypes.includes(filter.type) && 
               typeof filter.key === 'string' && 
               typeof filter.label === 'string';
      });
    }
  }
});

const formValues = reactive({});

// Preset dates for quick selection
const presetDates = [
  { label: 'Today', value: [new Date(), new Date()] },
  { label: 'Yesterday', value: (() => { const d = new Date(); d.setDate(d.getDate()-1); return [d, d]; })()}
];

// Preset ranges
const presetRanges = [
  { label: 'Last 7 Days', range: (() => { const end = new Date(); const start = new Date(); start.setDate(end.getDate()-6); return [start, end]; })() },
  { label: 'Last 30 Days', range: (() => { const end = new Date(); const start = new Date(); start.setDate(end.getDate()-29); return [start, end]; })() },
  { label: 'This Month', range: (() => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); return [start, new Date()]; })() },
  { label: 'Last Month', range: (() => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth()-1, 1); const end = new Date(now.getFullYear(), now.getMonth(), 0); return [start, end]; })() }
];

// init defaults
watchEffect(() => {
  props.filters.forEach(f => {
    if (!Object.prototype.hasOwnProperty.call(formValues, f.key)) {
      if (f.type === 'select') formValues[f.key] = '';
      else if (f.type === 'date-range') formValues[f.key] = [null, null]; // <-- key bit
      else formValues[f.key] = null;
    }
  });
});

// shortcuts (must return Date objects)
// const shortCuts = [
//   { text: 'Today', onClick: () => { const d = new Date(); return [d, d]; } },
//   { text: 'Yesterday', onClick: () => { const d = new Date(); d.setDate(d.getDate()-1); return [d, d]; } },
//   { text: 'Last 7 Days', onClick: () => { const end = new Date(); const start = new Date(); start.setDate(end.getDate()-6); return [start, end]; } },
//   { text: 'Last 30 Days', onClick: () => { const end = new Date(); const start = new Date(); start.setDate(end.getDate()-29); return [start, end]; } },
//   { text: 'This Month', onClick: () => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth(), 1); return [start, new Date()]; } },
//   { text: 'Last Month', onClick: () => { const now = new Date(); const start = new Date(now.getFullYear(), now.getMonth()-1, 1); const end = new Date(now.getFullYear(), now.getMonth(), 0); return [start, end]; } },
// ];

// Initialize form values with defaults
// watchEffect(() => {
//   props.filters.forEach(f => {
//     if (!formValues.hasOwnProperty(f.key)) {
//       if (f.type === 'select') {
//         formValues[f.key] = '';
//       } else if (f.type === 'date-range') {
//         formValues[f.key] = []; // array for range mode
//       } else {
//         formValues[f.key] = null;
//       }
//     }
//   }); 
// });
// Date range shortcuts
// Date range shortcuts
// const shortCuts = [
//   {
//     text: 'Today',
//     onClick: () => {
//       const today = new Date();
//       return [today, today];
//     }
//   },
//   {
//     text: 'Yesterday',
//     onClick: () => {
//       const yesterday = new Date();
//       yesterday.setDate(yesterday.getDate() - 1);
//       return [yesterday, yesterday];
//     }
//   },
//   {
//     text: 'Last 7 Days',
//     onClick: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(end.getDate() - 6);
//       return [start, end];
//     }
//   },
//   {
//     text: 'Last 30 Days',
//     onClick: () => {
//       const end = new Date();
//       const start = new Date();
//       start.setDate(end.getDate() - 29);
//       return [start, end];
//     }
//   },
//   {
//     text: 'This Month',
//     onClick: () => {
//       const start = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
//       const end = new Date();
//       return [start, end];
//     }
//   },
//   {
//     text: 'Last Month',
//     onClick: () => {
//       const start = new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1);
//       const end = new Date(new Date().getFullYear(), new Date().getMonth(), 0);
//       return [start, end];
//     }
//   }
// ];


// function emitFilters() {
//   // Clean up the data before emitting
//   // const cleanedValues = {};
//   // Object.keys(formValues).forEach(key => {
//   //   if (formValues[key] !== null && formValues[key] !== '') {
//   //     cleanedValues[key] = formValues[key];
//   //   }
//   // });
//   const updatedValues = {...this.formValues};

//   //loop through filters to check for data range type
//   this.filters.forEach(filter=>{
//     if(filter.type === "data-range" && Array.isArray(updatedValues[filter.key])){
//       const [start,end] = updatedValues[filter.key] || [];

//     }

//   })
//   emit('generate', cleanedValues);
// }


const emitFilters = () => {
  const payload = {};

  for (const key in formValues) {
    const value = formValues[key];

    if (key === 'dateRange' && Array.isArray(value) && value.length === 2) {
      // Store as named fields
      payload.startDate = value[0] ? value[0].toISOString().split('T')[0] : null;
      payload.endDate = value[1] ? value[1].toISOString().split('T')[0] : null;
    } 
    else {
      payload[key] = value;
    }
  }

  // Emit or send payload
  emit('generate', payload);
};


</script>
<style>
.text-sm.border.rounded-lg.px-3.py-2.w-64 {
  width: 280px; /* Slightly wider to accommodate the full date range */
}
</style>

<style>
/* Date picker styling */
.dp__input {
  border: 1px solid #d1d5db !important;
  border-radius: 0.5rem !important;
  padding: 0.5rem 0.75rem !important;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  width: 100% !important;
}

/* Calendar popup styling */
.dp__menu {
  position: absolute !important;
  z-index: 99999 !important;
  margin-top: 5px !important;
  background: white !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

/* Range selection styling */
.dp__range_between {
  background: #f59e0b !important;
  color: white !important;
}

.dp__range_start, .dp__range_end {
  background: #f59e0b !important;
  color: white !important;
}

.text-sm.border.rounded-lg.px-3.py-2.w-64 {
  width: 280px;
}
</style>