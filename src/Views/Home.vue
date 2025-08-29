<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Header -->
    <header class="flex flex-col md:flex-row justify-between items-center mb-8 border-b border-gray-200 pb-6">
      <h1 class="text-3xl font-bold text-primary">POS Dashboard</h1>
      <div class="mt-4 md:mt-0 flex items-center">
        <label for="business-type" class="mr-2 font-medium text-gray-700">Business Type:</label>
        <select 
          id="business-type" 
          v-model="businessType" 
          class="rounded-md border border-gray-300 py-2 px-4 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          <option v-for="(config, type) in businessConfigs" :key="type" :value="type">
            {{ config.label }}
          </option>
        </select>
      </div>
    </header>

    <!-- Filters -->
    <filters-bar 
      :categories="currentConfig.categories" 
      :branches="branches"
      @apply="fetchData"
    />

    <!-- KPI Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-8">
      <kpi-card 
        v-for="(kpi, index) in currentConfig.kpis" 
        :key="index"
        :title="kpi"
        :value="kpiValues[kpi]"
        :trend="kpiTrends[kpi]"
        :icon="kpiIcons[kpi]"
        :color="kpiColors[index]"
      />
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <chart-card 
        title="Sales Trend" 
        chartId="salesChart" 
        type="line"
        :labels="sales.labels" 
        :datasets="sales.datasets"
        :options="sales.options"
      />

      <top-products-table 
        title="Top Products" 
        :products="topProducts"
      />
      
      <!-- <chart-card 
        title="Top Products" 
        chartId="productsChart" 
        type="bar"
        :labels="topProducts.labels" 
        :datasets="topProducts.datasets"
      /> -->

         <ReChart
          title="Monthly Sales vs Purchases"
          :years="[2025, 2024]"
          :initialYear="2025"
          :data="monthlyData"
        />
      
      <!-- <chart-card 
        title="Category Breakdown" 
        chartId="categoryChart" 
        type="doughnut"
        :labels="categories.labels" 
        :datasets="categories.datasets"
      /> -->
      
      <chart-card 
        title="Payment Methods" 
        chartId="paymentChart" 
        type="pie"
        :labels="payments.labels" 
        :datasets="payments.datasets"
      />
    </div>




    <!-- Tables -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
     
      <data-table 
        title="Recent Transactions" 
        :headers="['id', 'time', 'amount', 'payment_method']" 
        :rows="transactions"
      />
      
      <data-table 
        :title="currentConfig.inventoryTitle" 
        :headers="['product', 'current_stock', 'threshold', 'status']" 
        :rows="inventory"
      />
    </div>
  </div>
</template>

<script>
import KpiCard from '../components/DashboardComponents/KpiCard.vue';
import ChartCard from '../components/DashboardComponents/ChartCard.vue';
import DataTable from '../components/DashboardComponents/Datatable.vue';
import FiltersBar from '../components/DashboardComponents/FilterBar.vue';
import ReChart from '../components/DashboardComponents/ReChart.vue'
import TopProductsTable from '../components/DashboardComponents/TopProductsTable.vue';
import { getDashboardData } from '../store/dashboard';

export default {
  components: { 
    KpiCard, 
    ChartCard, 
    DataTable, 
    FiltersBar,
    ReChart ,
    TopProductsTable
  },
  data() {
    return {
      businessType: 'general',
      branches: ['North Branch', 'South Branch', 'East Branch', 'West Branch'],
      businessConfigs: {
        general: {
          label: 'General Retail',
          kpis: ['Total Sales', 'Transactions', 'Customers', 'Profit Margin', 'Inventory'],
          inventoryTitle: 'Low Stock Items',
          categories: ['Electronics', 'Clothing', 'Home Goods']
        },
        supermarket: {
          label: 'Supermarket',
          kpis: ['Total Sales', 'Transactions', 'Customers', 'Profit Margin', 'Low Stock Items'],
          inventoryTitle: 'Low Stock Items',
          categories: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen Foods']
        },
        pharmacy: {
          label: 'Pharmacy',
          kpis: ['Total Sales', 'Prescriptions', 'Customers', 'Profit Margin', 'Expiring Soon'],
          inventoryTitle: 'Expiring Products',
          categories: ['Prescription Drugs', 'OTC Medication', 'Personal Care', 'Wellness']
        },
        liquor: {
          label: 'Liquor Store',
          kpis: ['Total Sales', 'Transactions', 'Customers', 'Profit Margin', 'Top Shelf Items'],
          inventoryTitle: 'Low Stock Items',
          categories: ['Beer', 'Wine', 'Spirits', 'Mixers']
        },
        hardware: {
          label: 'Hardware Store',
          kpis: ['Total Sales', 'Transactions', 'Contractors', 'Profit Margin', 'Inventory Value'],
          inventoryTitle: 'Low Stock Items',
          categories: ['Tools', 'Building Materials', 'Electrical', 'Plumbing']
        }
      },
      kpiIcons: {
        'Total Sales': 'fa-dollar-sign',
        'Transactions': 'fa-receipt',
        'Customers': 'fa-users',
        'Profit Margin': 'fa-percent',
        'Inventory': 'fa-boxes',
        'Low Stock Items': 'fa-exclamation-triangle',
        'Prescriptions': 'fa-prescription-bottle',
        'Expiring Soon': 'fa-calendar-times',
        'Top Shelf Items': 'fa-crown',
        'Inventory Value': 'fa-money-bill-wave',
        'Contractors': 'fa-hard-hat'
      },
        monthlyData: {
      2025: [
        { month: "Jan", sales: 120, purchase: -150 },
        { month: "Feb", sales: 200, purchase: -80 },
        { month: "Mar", sales: 300, purchase: -50 },
        { month: "Apr", sales: 290, purchase: -180 },
        { month: "May", sales: 150, purchase: -40 },
        { month: "Jun", sales: 70, purchase: -60 },
        { month: "Jul", sales: 210, purchase: -70 },
        { month: "Aug", sales: 280, purchase: -90 },
        { month: "Sep", sales: 100, purchase: -100 },
      ],
      2024: [
        { month: "Jan", sales: 100, purchase: -120 },
        { month: "Feb", sales: 150, purchase: -60 },
        { month: "Mar", sales: 250, purchase: -70 },
        { month: "Apr", sales: 200, purchase: -100 },
        { month: "May", sales: 180, purchase: -50 },
        { month: "Jun", sales: 60, purchase: -40 },
        { month: "Jul", sales: 190, purchase: -80 },
        { month: "Aug", sales: 250, purchase: -90 },
        { month: "Sep", sales: 120, purchase: -70 },
      ]
    },
      kpiValues: {},
      kpiTrends: {},
      kpiColors: ['bg-primary', 'bg-secondary', 'bg-success', 'bg-warning', 'bg-danger'],
      sales: { labels: [], datasets: [], options: { scales: { y: { beginAtZero: true } } } },
      topProducts: [],
      categories: { labels: [], datasets: [] },
      payments: { labels: [], datasets: [] },
      transactions: [],
      inventory: []
    };
  },
  computed: {
    currentConfig() {
      return this.businessConfigs[this.businessType];
    }
  },
  methods: {
    async fetchData(filters) {
      try {
        const data = await getDashboardData(filters, this.businessType);

        // KPIs
        this.kpiValues = Object.fromEntries(
          Object.entries(data.kpis).map(([key, val]) => [key, val.value])
        );
        this.kpiTrends = Object.fromEntries(
          Object.entries(data.kpis).map(([key, val]) => [key, val.trend])
        );

        // Charts
        this.sales = data.sales;
        
        this.categories = data.categories;
        this.payments = data.payments;

        // Tables
        this.transactions = data.transactions;
        this.inventory = data.inventory;
        this.topProducts = data.topProducts;
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      }
    }
  },
  watch: {
    businessType() {
      this.fetchData({ dateRange: 'today', category: 'all', branch: 'all' });
    }
  },
  mounted() {
    this.fetchData({ dateRange: 'today', category: 'all', branch: 'all' });
  }
};
</script>
