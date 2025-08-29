<!-- src/components/DashboardComponents/TopProductsTable.vue -->
<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex flex-col">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold text-gray-800">{{ title }}</h2>
      <div class="flex space-x-2 text-sm">
        <span class="text-gray-500">Period:</span>
        <select v-model="selectedPeriod" class="border rounded px-2 py-1 text-sm bg-gray-50">
          <option v-for="period in periods" :key="period" :value="period">{{ period }}</option>
        </select>
      </div>
    </div>
    <div class="overflow-x-auto">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-50/80">
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
            <th class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trend</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="(product, index) in productsWithChange" :key="index" 
              :class="index % 2 === 0 ? 'bg-white' : 'bg-gray-50/30'"
              class="hover:bg-blue-50/30 transition-colors duration-150">
            <td class="px-4 py-3 text-sm font-medium text-gray-900">{{ product.product }}</td>
            <td class="px-4 py-3 text-sm text-gray-900">${{ formatNumber(product.Total_Sales) }}</td>
            <td class="px-4 py-3 text-sm" :class="getChangeColor(product.change)">
              {{ formatChange(product.change) }}
            </td>
            <td class="px-4 py-3 text-sm">
              <span v-if="product.change > 0" class="text-green-600">↗</span>
              <span v-else-if="product.change < 0" class="text-red-600">↘</span>
              <span v-else class="text-gray-400">→</span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Top Products"
    },
    products: {
      type: Array,
      default: () => []
    },
    periods: {
      type: Array,
      default: () => ['This Week', 'This Month', 'This Quarter', 'This Year']
    }
  },
  data() {
    return {
      selectedPeriod: 'This Week',
      previousData: {
        'Ceramic Tiles': 160,
        'Nail Clippers': 180,
        'mallet': 220,
        'Light Bulbs': 150,
        'Screws': 190
      }
    };
  },
  computed: {
    productsWithChange() {
      return this.products.map(product => {
        const previousSales = this.previousData[product.product] || 0;
        const currentSales = parseInt(product.Total_Sales);
        const change = previousSales > 0 
          ? ((currentSales - previousSales) / previousSales) * 100 
          : 0;
        
        return {
          ...product,
          change: Math.round(change)
        };
      }).sort((a, b) => parseInt(b.Total_Sales) - parseInt(a.Total_Sales));
    }
  },
  methods: {
    formatNumber(num) {
      return parseInt(num).toLocaleString();
    },
    formatChange(change) {
      return change > 0 ? `+${change}%` : `${change}%`;
    },
    getChangeColor(change) {
      if (change > 0) return 'text-green-600';
      if (change < 0) return 'text-red-600';
      return 'text-gray-500';
    }
  }
};
</script>