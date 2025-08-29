<template>
  <div class="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden text-xs">
    <!-- Top Controls -->
    <div class="p-4 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
      <!-- Search -->
      <div class="relative w-full sm:w-64">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search..."
          class="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
        />
        <MagnifyingGlassIcon class="h-5 w-5 text-slate-400 absolute left-3 top-2.5" />
      </div>

      <!-- Export & Print -->
      <div class="flex items-center space-x-2">
        <button
          @click="$emit('export')"
          class="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
          </svg>
          Export
        </button>

        <button
          @click="$emit('print')"
          class="px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 flex items-center"
        >
          <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
          </svg>
          Print
        </button>
      </div>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-slate-100">
        <thead class="bg-slate-50">
          <tr>
            <th
              v-for="(header, index) in headers"
              :key="index"
              class="px-3 py-1 text-left text-xs text-slate-500 font-medium uppercase tracking-wider cursor-pointer hover:bg-slate-100 transition-colors"
              @click="sortBy(index)"
            >
              <div class="flex items-center">
                {{ header }}
                <span v-if="sortColumn === index" class="ml-1">
                  <ChevronUpIcon v-if="sortDirection === 'asc'" class="h-4 w-4" />
                  <ChevronDownIcon v-else class="h-4 w-4" />
                </span>
              </div>
            </th>
            <th
              v-if="hasActions"
              class="px-3 py-3 text-left text-xs text-slate-500 font-medium uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-slate-200">
          <tr
            v-for="(row, rowIndex) in paginatedRows"
            :key="rowIndex"
            class="hover:bg-slate-50 transition-colors"
          >
            <td
              v-for="(cell, cellIndex) in row"
              :key="cellIndex"
              class="px-6 py-4 text-sm text-slate-700"
            >
              <slot :name="`cell-${cellIndex}`" :value="cell" :row="row">
                {{ cell }}
              </slot>
            </td>

            <td v-if="hasActions" class="px-6 py-4 text-sm text-slate-700 whitespace-nowrap">
              <div class="flex space-x-2">
                <button
                  @click="$emit('edit', row)"
                  class="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <PencilIcon class="h-4 w-4" />
                </button>
                <button
                  @click="$emit('delete', row)"
                  class="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <TrashIcon class="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>

          <tr v-if="filteredRows.length === 0">
            <td
              :colspan="headers.length + (hasActions ? 1 : 0)"
              class="px-6 py-4 text-center text-sm text-slate-500"
            >
              No records found
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination -->
    <div
      class="px-6 py-3 flex flex-col sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 bg-slate-50"
    >
      <!-- Left -->
      <div class="mb-2 sm:mb-0 flex items-center space-x-2">
        <select
          v-model="perPage"
          class="border border-slate-300 rounded-md px-2 py-1 text-sm"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="25">25 per page</option>
          <option value="50">50 per page</option>
        </select>
        <span class="text-sm text-slate-700">
          Showing {{ currentPage * perPage + 1 }} to
          {{ Math.min((currentPage + 1) * perPage, filteredRows.length) }} of
          {{ filteredRows.length }} entries
        </span>
      </div>

      <!-- Right -->
      <div class="flex space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 0"
          class="px-3 py-1 rounded border border-slate-300 text-sm disabled:opacity-50"
        >
          Previous
        </button>
        <button
          @click="nextPage"
          :disabled="(currentPage + 1) * perPage >= filteredRows.length"
          class="px-3 py-1 rounded border border-slate-300 text-sm disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  TrashIcon
} from '@heroicons/vue/24/outline';
import { ref, computed } from 'vue';

const props = defineProps({
  headers: { type: Array, required: true },
  rows: { type: Array, required: true },
  perPage: { type: Number, default: 10 },
  hasActions: { type: Boolean, default: false }
});

const emit = defineEmits(['edit', 'delete']);

const searchQuery = ref('');
const currentPage = ref(0);
const perPage = ref(props.perPage);
const sortColumn = ref(null);
const sortDirection = ref('asc');

const filteredRows = computed(() => {
  let result = [...props.rows];

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    result = result.filter(row =>
      row.some(cell => String(cell).toLowerCase().includes(query))
    );
  }

  if (sortColumn.value !== null) {
    result.sort((a, b) => {
      const aValue = a[sortColumn.value];
      const bValue = b[sortColumn.value];
      if (!isNaN(aValue)) {
        return sortDirection.value === 'asc'
          ? Number(aValue) - Number(bValue)
          : Number(bValue) - Number(aValue);
      }
      return sortDirection.value === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }

  return result;
});

const paginatedRows = computed(() => {
  const start = currentPage.value * perPage.value;
  const end = start + perPage.value;
  return filteredRows.value.slice(start, end);
});

const sortBy = (columnIndex) => {
  if (sortColumn.value === columnIndex) {
    sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortColumn.value = columnIndex;
    sortDirection.value = 'asc';
  }
  currentPage.value = 0;
};

const nextPage = () => {
  if ((currentPage.value + 1) * perPage.value < filteredRows.value.length) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 0) {
    currentPage.value--;
  }
};

// Placeholder export/print handlers
// const handleExport = () => console.log('Export triggered');
// const handlePrint = () => console.log('Print triggered');

</script>

<style scoped>
@media (max-width: 640px) {
  table {
    display: block;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
  th,
  td {
    white-space: nowrap;
    min-width: 100px;
  }
}
</style>
