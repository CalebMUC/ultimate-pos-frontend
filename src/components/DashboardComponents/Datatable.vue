<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
    <div class="px-6 py-4 border-b border-gray-100 bg-gray-50/60">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50/80">
            <th v-for="header in headers" :key="header"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider first:rounded-tl-lg last:rounded-tr-lg">
              {{ formatHeader(header) }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(row, index) in rows" :key="index" 
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'"
              class="hover:bg-blue-50/30 transition-colors duration-150">
            <td v-for="header in headers" :key="header" 
                :class="getCellClasses(header, row[getKey(header)])"
                class="px-6 py-4 text-sm">
              <span v-if="isStatusColumn(header)" class="status-badge">
                {{ row[getKey(header)] }}
              </span>
              <span v-else-if="isAmountColumn(header)" class="font-mono">
                {{ formatAmount(row[getKey(header)]) }}
              </span>
              <span v-else-if="isStockColumn(header)" class="stock-value">
                {{ row[getKey(header)] }}
              </span>
              <span v-else>
                {{ row[getKey(header)] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="rows.length === 0" class="text-center py-8 text-gray-400">
        <svg class="mx-auto h-12 w-12 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p class="mt-2">No data available</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    headers: Array,
    rows: Array
  },
  methods: {
    getKey(header) {
      return header.toLowerCase().replace(/\s+/g, '_');
    },
    formatHeader(header) {
      return header.split('_').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1)
      ).join(' ');
    },
    isStatusColumn(header) {
      return header.toLowerCase().includes('status') || 
             header.toLowerCase().includes('payment_method');
    },
    isAmountColumn(header) {
      return header.toLowerCase().includes('amount');
    },
    isStockColumn(header) {
      return header.toLowerCase().includes('stock') || 
             header.toLowerCase().includes('threshold');
    },
    formatAmount(value) {
      if (typeof value === 'number' || !isNaN(value)) {
        return '$' + Number(value).toLocaleString();
      }
      return value;
    },
    getCellClasses(header, value) {
      const classes = [];
      const headerKey = header.toLowerCase();
      
      if (headerKey.includes('status')) {
        if (value?.toLowerCase().includes('low') || value?.toLowerCase().includes('warning')) {
          classes.push('text-amber-600');
        } else if (value?.toLowerCase().includes('ok') || value?.toLowerCase().includes('good')) {
          classes.push('text-green-600');
        } else if (value?.toLowerCase().includes('critical')) {
          classes.push('text-red-600');
        }
      }
      
      if (headerKey.includes('payment_method')) {
        if (value?.toLowerCase().includes('card')) {
          classes.push('text-blue-600');
        } else if (value?.toLowerCase().includes('cash')) {
          classes.push('text-green-600');
        }
      }
      
      if (headerKey.includes('stock') || headerKey.includes('threshold')) {
        if (typeof value === 'number') {
          if (value < 10) classes.push('text-red-600', 'font-medium');
          else if (value < 25) classes.push('text-amber-600');
        }
      }
      
      return classes.join(' ');
    }
  }
}
</script>

<style scoped>
.status-badge {
  @apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium;
}

.stock-value {
  @apply font-mono text-sm;
}

th {
  @apply font-semibold;
}

tbody tr {
  @apply transition-all duration-150 ease-in-out;
}

tbody tr:hover {
  @apply transform scale-[1.002] shadow-sm;
}
</style>