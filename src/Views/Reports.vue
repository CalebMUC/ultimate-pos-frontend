<template>
  <div class="bg-gray-50 min-h-screen p-4 md:p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header Section -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-gray-800">Analytics Dashboard</h1>
        <p class="text-gray-600 mt-2">Generate detailed reports to analyze your business performance</p>
      </div>

      <!-- Main Content Grid -->
      <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <!-- Sidebar Filters -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-6">
            <!-- Collapsible Filter Panel -->
            <details open class="group">
              <summary class="flex justify-between items-center cursor-pointer list-none">
                <h2 class="text-xl font-semibold text-gray-800">Report Configuration</h2>
                <svg class="w-5 h-5 text-gray-500 group-open:rotate-180 transform transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </summary>

              <div class="mt-6 space-y-6">
                <!-- Report Type Selection as Segmented Buttons -->
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
                  <div class="grid grid-cols-2 gap-2">
                    <button 
                      v-for="type in reportTypes" 
                      :key="type.value"
                      @click="reportType = type.value"
                      :class="[
                        'px-3 py-2 text-sm font-medium rounded-md transition',
                        reportType === type.value 
                          ? 'bg-blue-100 text-blue-700 border border-blue-300' 
                          : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
                      ]"
                    >
                      {{ type.label }}
                    </button>
                  </div>
                </div>

                <!-- Dynamic Filters -->
                <div class="space-y-6">
                  <!-- Date Range (Sales Report) -->
                  <div v-if="reportType === 'Sales Report'" class="space-y-4">
                    <h3 class="text-sm font-medium text-gray-700">Date Range</h3>
                    <div class="space-y-3">
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">From Date</label>
                        <input type="date" v-model="fromDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                      </div>
                      <div>
                        <label class="block text-xs text-gray-500 mb-1">To Date</label>
                        <input type="date" v-model="toDate" class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition">
                      </div>
                    </div>
                    <div class="flex space-x-2">
                      <button @click="setDateRange('week')" class="text-xs px-2 py-1 border rounded hover:bg-gray-50">This Week</button>
                      <button @click="setDateRange('month')" class="text-xs px-2 py-1 border rounded hover:bg-gray-50">This Month</button>
                      <button @click="setDateRange('year')" class="text-xs px-2 py-1 border rounded hover:bg-gray-50">This Year</button>
                    </div>
                  </div>

                  <!-- Product Report Filter -->
                  <div v-if="reportType === 'Product Report'">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Product Type</label>
                    <input
                      type="text"
                      v-model="productType"
                      placeholder="Enter Product Type"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <!-- Stock Alert Report Filter -->
                  <div v-if="reportType === 'Stock Alert Report'">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Low Stock Threshold</label>
                    <input
                      type="number"
                      v-model.number="lowStockThreshold"
                      placeholder="Enter Low Threshold"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>

                  <!-- Customer Report Filter -->
                  <div v-if="reportType === 'Customer Report'">
                    <label class="block text-sm font-medium text-gray-700 mb-2">Customer Name</label>
                    <input
                      type="text"
                      v-model="customerName"
                      placeholder="Enter Customer Name"
                      class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                    />
                  </div>
                </div>

                <!-- Action Buttons -->
                <div class="mt-8 space-y-3">
                  <button 
                    @click="handleGenerate" 
                    class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow hover:shadow-md transition-all hover:from-blue-600 hover:to-blue-700"
                  >
                    <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                    </svg>
                    Generate Report
                  </button>
                  <button 
                    @click="resetFilters" 
                    class="w-full px-4 py-2.5 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            </details>
          </div>
        </div>

        <!-- Main Content Area -->
        <div class="lg:col-span-3 space-y-6">
          <!-- Stats Cards -->
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Records</p>
                  <p class="text-2xl font-semibold text-gray-800 mt-1">{{ filteredData.length }}</p>
                </div>
                <div class="p-3 rounded-full bg-blue-50 text-blue-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                  </svg>
                </div>
              </div>
            </div>
            
            <!-- Additional stat cards can be added here -->
            <div v-if="reportType === 'Sales Report'" class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-medium text-gray-500">Total Sales</p>
                  <p class="text-2xl font-semibold text-gray-800 mt-1">
                    <!-- {{ formatCurrency(filteredData.reduce((sum, item) => sum + (item.amount || 0), 0)) }} -->
                      3000
                  </p>
                </div>
                <div class="p-3 rounded-full bg-green-50 text-green-600">
                  <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Chart Visualization Section -->
    <!-- <template v-if="filteredData.length > 0">
      <!-- Sales Trend Chart 
      <ChartComponent 
        v-if="reportType === 'Sales Report' && salesChartData"
        title="Sales Trend"
        :chart-data="salesChartData"
        chart-type="line"
      />

      <!-- Product Distribution Chart 
      <ChartComponent 
        v-if="reportType === 'Product Report' && productChartData"
        title="Product Distribution"
        :chart-data="productChartData"
        chart-type="doughnut"
      />

      <!-- Stock Level Chart 
      <ChartComponent 
        v-if="reportType === 'Stock Alert Report' && stockChartData"
        title="Stock Levels"
        :chart-data="stockChartData"
        chart-type="bar"
      />
    </template> -->

          <!-- Results Card -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
            <!-- Results Header -->
            <div class="px-6 py-4 border-b border-gray-200 flex flex-col md:flex-row md:items-center md:justify-between">
              <div>
                <h2 class="text-lg font-semibold text-gray-800">Report Results</h2>
                <p class="text-sm text-gray-500 mt-1">
                  Showing {{ (currentPage - 1) * itemsPerPage + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredData.length) }} of {{ filteredData.length }} entries
                </p>
              </div>
              
              <div class="mt-4 md:mt-0 flex space-x-3">
                <button 
                  @click="handleExport" 
                  :disabled="!reportData.length"
                  class="px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                  Export
                </button>
                <button 
                  @click="handlePrint" 
                  :disabled="!reportData.length"
                  class="px-4 py-2 text-sm font-medium rounded-lg bg-gray-800 text-white flex items-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"></path>
                  </svg>
                  Print
                </button>
              </div>
            </div>

            <!-- Results Table -->
            <div v-if="isLoading" class="flex justify-center items-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>

            <div v-else>
              <div v-if="filteredData.length > 0" class="overflow-x-auto">
                <div class="min-w-full inline-block align-middle">
                  <div class="overflow-hidden">
                    <table class="min-w-full divide-y divide-gray-200">
                      <thead class="bg-gray-50 sticky top-0">
                        <tr>
                          <th 
                            v-for="(key, index) in Object.keys(filteredData[0])" 
                            :key="index" 
                            scope="col"
                            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            <div class="flex items-center">
                              {{ key }}
                              <button @click="sortTable(key)" class="ml-1">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                                </svg>
                              </button>
                            </div>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                        <tr 
                          v-for="(row, index) in paginatedData" 
                          :key="index" 
                          class="hover:bg-gray-50 transition"
                        >
                          <td 
                            v-for="(value, i) in Object.values(row)" 
                            :key="i" 
                            class="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
                          >
                            {{ formatValue(value, Object.keys(row)[i]) }}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <!-- Pagination -->
                <div v-if="filteredData.length > itemsPerPage" class="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                  <div class="flex-1 flex justify-between sm:hidden">
                    <button 
                      @click="currentPage = Math.max(1, currentPage - 1)"
                      :disabled="currentPage === 1"
                      class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Previous
                    </button>
                    <button 
                      @click="currentPage = Math.min(totalPages, currentPage + 1)"
                      :disabled="currentPage === totalPages"
                      class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                    >
                      Next
                    </button>
                  </div>
                  <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                    <div>
                      <p class="text-sm text-gray-700">
                        Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span> to 
                        <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span> of 
                        <span class="font-medium">{{ filteredData.length }}</span> results
                      </p>
                    </div>
                    <div>
                      <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                        <button 
                          @click="currentPage = Math.max(1, currentPage - 1)"
                          :disabled="currentPage === 1"
                          class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span class="sr-only">Previous</span>
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                          </svg>
                        </button>
                        <button 
                          v-for="page in visiblePages"
                          :key="page"
                          @click="currentPage = page"
                          :class="[page === currentPage ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50']"
                          class="relative inline-flex items-center px-4 py-2 border text-sm font-medium"
                        >
                          {{ page }}
                        </button>
                        <button 
                          @click="currentPage = Math.min(totalPages, currentPage + 1)"
                          :disabled="currentPage === totalPages"
                          class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          <span class="sr-only">Next</span>
                          <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                            <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                          </svg>
                        </button>
                      </nav>
                    </div>
                  </div>
                </div>
              </div>
              <div v-else-if="reportData.length > 0 && filteredData.length === 0" class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No matching records found</h3>
                <p class="mt-1 text-sm text-gray-500">Try adjusting your filters.</p>
              </div>
              <div v-else class="text-center py-12">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
                <h3 class="mt-2 text-sm font-medium text-gray-900">No records found</h3>
                <p class="mt-1 text-sm text-gray-500">Generate a report to see data here.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import Swal from 'sweetalert2';
import { useReportStore } from '../store/ReportStore';
// import ChartComponent from './charts.vue'

export default {
  name: "ReportPage",
  setup() {
    const ReportStore = useReportStore();

    // Report types for segmented buttons
    const reportTypes = [
      { value: 'Sales Report', label: 'Sales' },
      { value: 'Product Report', label: 'Products' },
      { value: 'Stock Alert Report', label: 'Stock' },
      { value: 'Customer Report', label: 'Customers' },
      { value: 'Suppliers Report', label: 'Suppliers' },
      { value: 'Supplies Report', label: 'Supplies' }
    ];

    // Reactive state
    const fromDate = ref("");
    const toDate = ref("");
    const reportType = ref("Sales Report");
    const productType = ref("");
    const customerName = ref("");
    const lowStockThreshold = ref(0);
    const reportData = ref([]);
    const isLoading = ref(false);
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const sortKey = ref(null);
    const sortDirection = ref('asc');

    // Computed properties
    const filteredData = computed(() => {
      if (!reportData.value || reportData.value.length === 0) return [];
      
      let data = [...reportData.value];
      
      // Apply filters based on report type
      switch (reportType.value) {
        case "Sales Report":
          if (fromDate.value && toDate.value) {
            data = data.filter(item => {
              const itemDate = new Date(item.date);
              return itemDate >= new Date(fromDate.value) && itemDate <= new Date(toDate.value);
            });
          }
          break;
          
        case "Product Report":
          if (productType.value) {
            const searchTerm = productType.value.toLowerCase();
            data = data.filter(item => 
              (item.category?.toLowerCase().includes(searchTerm) || 
              item.name?.toLowerCase().includes(searchTerm)
            ))
          }
          break;
          
        case "Customer Report":
          if (customerName.value) {
            const searchTerm = customerName.value.toLowerCase();
            data = data.filter(item => 
              item.customerName?.toLowerCase().includes(searchTerm)
            );
          }
          break;
          
        case "Stock Alert Report":
          if (lowStockThreshold.value) {
            data = data.filter(item => 
              item.quantity <= parseFloat(lowStockThreshold.value)
            );
          }
          break;
      }
      
      return data;
    });

    const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value));
    
    const visiblePages = computed(() => {
      const pages = [];
      const maxVisible = 5;
      let start = Math.max(1, currentPage.value - Math.floor(maxVisible / 2));
      let end = Math.min(totalPages.value, start + maxVisible - 1);
      
      if (end - start + 1 < maxVisible) {
        start = Math.max(1, end - maxVisible + 1);
      }
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
      
      return pages;
    });

    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      let data = [...filteredData.value];
      
      if (sortKey.value) {
        data.sort((a, b) => {
          if (a[sortKey.value] < b[sortKey.value]) return sortDirection.value === 'asc' ? -1 : 1;
          if (a[sortKey.value] > b[sortKey.value]) return sortDirection.value === 'asc' ? 1 : -1;
          return 0;
        });
      }
      
      return data.slice(start, end);
    });

    // Methods
    const handleGenerate = async () => {
      isLoading.value = true;
      try {
        const payLoad = {
          reportType: reportType.value,
          format: "JSON",
          parameters: {}
        };

        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          payLoad.parameters = {
            FromDate: fromDate.value,
            ToDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          payLoad.parameters = {
            ProductType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          payLoad.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          payLoad.parameters = {
            LowStockThreshold: lowStockThreshold.value
          };
        }

        const response = await ReportStore.FetchReportData(payLoad);
        reportData.value = response || [];
        currentPage.value = 1;

        if (reportData.value.length === 0) {
          showToast('info', 'Your search criteria did not match any records');
        }
      } catch (error) {
        showToast('error', error.message || 'Failed to generate report. Please try again.');
      } finally {
        isLoading.value = false;
      }
    };

    const handlePrint = async () => {
      if (filteredData.value.length === 0) {
        showToast('warning', 'Please generate a report first.');
        return false;
      } else {
        const requestData = {
          reportType: reportType.value,
          format: "pdf",
          parameters: {}
        };

        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          requestData.parameters = {
            fromDate: fromDate.value,
            toDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          requestData.parameters = {
            productType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          requestData.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          requestData.parameters = {
            lowStockThreshold: lowStockThreshold.value
          };
        }

        try {
          await ReportStore.ExportReportData(requestData);
          showToast('success', 'Your report has been generated and downloaded successfully.');
          return true;
        } catch (error) {
          showToast('error', error.message || 'An error occurred while downloading the report.');
          return false;
        }
      }
    };

    const handleExport = async () => {
      if (filteredData.value.length === 0) {
        showToast('warning', 'Please generate a report first.');
        return false;
      } else {
        const requestData = {
          reportType: reportType.value,
          format: "xlsx",
          parameters: {}
        };

        // Set parameters based on report type
        if (reportType.value === "Sales Report") {
          requestData.parameters = {
            fromDate: fromDate.value,
            toDate: toDate.value
          };
        } else if (reportType.value === "Product Report") {
          requestData.parameters = {
            productType: productType.value
          };
        } else if (reportType.value === "Customer Report") {
          requestData.parameters = {
            customerName: customerName.value
          };
        } else if (reportType.value === "Stock Alert Report") {
          requestData.parameters = {
            lowStockThreshold: lowStockThreshold.value
          };
        }

        try {
          await ReportStore.ExportReportData(requestData);
          showToast('success', 'Your report has been generated and downloaded successfully.');
          return true;
        } catch (error) {
          showToast('error', error.message || 'An error occurred while downloading the report.');
          return false;
        }
      }
    };

    const resetFilters = () => {
      fromDate.value = "";
      toDate.value = "";
      productType.value = "";
      customerName.value = "";
      lowStockThreshold.value = 0;
      reportData.value = [];
      currentPage.value = 1;
      sortKey.value = null;
      sortDirection.value = 'asc';
      ReportStore.clearReportData();
    };

    const sortTable = (key) => {
      if (sortKey.value === key) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortKey.value = key;
        sortDirection.value = 'asc';
      }
    };

    const showToast = (icon, message) => {
      Swal.fire({
        position: 'top-end',
        icon,
        title: message,
        showConfirmButton: false,
        timer: 3000,
        toast: true,
        timerProgressBar: true
      });
    };

    const setDateRange = (range) => {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      
      switch (range) {
        case 'week':
          const day = today.getDay();
          const diff = today.getDate() - day + (day === 0 ? -6 : 1); // adjust when day is Sunday
          fromDate.value = formatDate(new Date(today.setDate(diff)));
          toDate.value = formatDate(today);
          break;
        case 'month':
          fromDate.value = formatDate(firstDay);
          toDate.value = formatDate(today);
          break;
        case 'year':
          fromDate.value = formatDate(new Date(today.getFullYear(), 0, 1));
          toDate.value = formatDate(today);
          break;
      }
    };

    const formatDate = (date) => {
      return date.toISOString().split('T')[0];
    };

    const formatCurrency = (value) => {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
    };

    const formatValue = (value, key) => {
      if (key.toLowerCase().includes('date')) {
        return new Date(value).toLocaleDateString();
      }
      if (key.toLowerCase().includes('amount') || key.toLowerCase().includes('price')) {
        return formatCurrency(value);
      }
      return value;
    };

    // Watchers
    watch([reportType, fromDate, toDate, productType, customerName, lowStockThreshold], () => {
      currentPage.value = 1;
    });

    return {
      reportTypes,
      fromDate,
      toDate,
      reportType,
      productType,
      customerName,
      lowStockThreshold,
      reportData,
      filteredData,
      isLoading,
      currentPage,
      itemsPerPage,
      totalPages,
      visiblePages,
      paginatedData,
      handleGenerate,
      handlePrint,
      handleExport,
      resetFilters,
      sortTable,
      setDateRange,
      formatValue
    };
  },
};
</script>

<style scoped>
/* Print-specific styles */
@media print {
  body * {
    visibility: hidden;
  }
  .bg-white, .bg-white * {
    visibility: visible;
  }
  .bg-white {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
  /* Hide buttons and other non-essential elements when printing */
  button, .flex, .hidden {
    display: none !important;
  }
}

/* Smooth transitions for interactive elements */
button, select, input {
  transition: all 0.2s ease;
}

/* Better focus states */
input:focus, select:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}

/* Sticky table header */
thead.sticky th {
  position: sticky;
  top: 0;
  z-index: 10;
  background-color: #f9fafb;
}

/* Collapsible panel animation */
details[open] summary ~ * {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>