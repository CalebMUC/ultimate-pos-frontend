<template>
  <div class="p-4 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="flex justify-between items-center mb-6">
      <div>
        <h1 class="text-2xl font-bold text-gray-800">Low Stocks</h1>
        <h4 class="text-sm text-gray-500">Manage your low stocks</h4>
      </div>
      <button
        @click="notifyAdmin"
        class="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        Send Email
      </button>
    </div>

    <!-- Stock Type Buttons -->
    <div class="flex gap-4 mb-6 border-b pb-2">
      <button
        @click="getLowStock"
        :class="buttonClass('low')"
        class="flex items-center gap-2"
      >
        <span v-if="activeStockType === 'low'" class="w-2 h-2 bg-orange-500 rounded-full"></span>
        Low Stock
      </button>

      <button
        @click="getOutOfStock"
        :class="buttonClass('out')"
        class="flex items-center gap-2"
      >
        <span v-if="activeStockType === 'out'" class="w-2 h-2 bg-orange-500 rounded-full"></span>
        Out Of Stock
      </button>
    </div>

    <ReportFilter
      :filters="stockfilters"
      @generate="generateStockReport"
    />
    
    <ReportsTable
      :headers="tableHeaders"
      :rows="activeStockType === 'low' ? lowStockData : outOfStockData"
      :per-page="10"
      @export="handleExport"
      @print="handlePrint"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue'
import ReportFilter from '../../components/Reports/ReportFilters.vue'
import { useCategoryStore } from '../../store/categoryStore'
import { UseInventoryStore } from '../../store/InventoryStore'
import { useReportStore } from '../../store/ReportStore'
import ReportsTable from '../../components/Reports/ReportsTables.vue'
import Swal from 'sweetalert2';

const categoryStore = useCategoryStore()
const inventoryStore = UseInventoryStore()
const reportStore = useReportStore();

// Lifecycle hooks
onMounted(() => {
  const token = localStorage.getItem('token')
  categoryStore.fetchCategories(token)
  inventoryStore.getallproducts(token);
})

const activeStockType = ref('low')
const lowStockData = ref([])
const outOfStockData = ref([])

const currentValue = ref({});

const categories = computed(() => categoryStore.getData || [])

const selectedColumns = [
  { key: "productName", label: "Product Name" },
  { key: "quantity", label: "Quantity" },
  { key: "reOrderLevel", label: "ReOrder Level" },
  { key: "category", label: "Category" },
  { key: "supplier", label: "Supplier" }
];

const tableHeaders = computed(() => selectedColumns.map(col=>col.label))

const stockfilters = ref([

  // {
  //   label: "Date Range",
  //   key: "dateRange",
  //   type: "date-range",
  // },

   {
    label: "LowStock Thereshold",
    key: "lowStockThreshold",
    type: "number",
  },

  // {
  //   label: "Category",
  //   key: "category",
  //   type: "select",
  //   options: []
  // }
])

// Update filter options whenever store data changes
watch([categories], ([catVal]) => {
  stockfilters.value = [
    // {
    //   label: "Date Range",
    //   key: "dateRange",
    //   type: "date-range"
    // },
    {
    label: "LowStock Thereshold",
    key: "lowStockThreshold",
    type: "number",
    },
    // {
    //   label: "Category",
    //   key: "category",
    //   type: "select",
    //   options: catVal.map(cat => ({
    //     value: cat.categoryID, 
    //     label: cat.categoryName
    //   }))
    // }
  ]
}, { immediate: true })

const  getLowStock = async() =>  {
  activeStockType.value = 'low'
  const defaultLowStockThreshold = 100;

  const lowStockPayload = {
    lowStockThreshold : defaultLowStockThreshold
  };

  const response = await reportStore.GenerateLowStockReport(lowStockPayload);

  lowStockData.value = response || [];

  // Set LowStockData
  // lowStockData.value = [
  //   {
  //     "productName": "Blue Triangle",
  //     "quantity": 10.00,
  //     "reOrderLevel": 0,
  //     "category": "Hardware",
  //     "supplier": "MinimartKe"
  //   },
  //   {
  //     "productName": "Repair Kit Including Hammers Screwdrivers for Home Use Real OEM",
  //     "quantity": 72.00,
  //     "reOrderLevel": 10,
  //     "category": "Hardware",
  //     "supplier": "MinimartKe"
  //   },
  //   {
  //     "productName": "Carbon steel Garden shovel spade",
  //     "quantity": 100.00,
  //     "reOrderLevel": 10,
  //     "category": "Hardware",
  //     "supplier": "MinimartKe"
  //   }
  // ]
  console.log('Fetching Low Stock data...')
}

const  generateStockReport = async(filters) => {

  currentValue.value = filters;

  const response = await reportStore.GenerateLowStockReport(filters);

  lowStockData.value = response || [];
}

function getOutOfStock() {
  activeStockType.value = 'out'
  // Set OutOfStockData
  outOfStockData.value = [
    {
      "productName": "HRB 500 Deformed Steel Rebars",
      "quantity": 0.00,
      "reOrderLevel": 10,
      "category": "Hardware",
      "supplier": "MinimartKe"
    },
    {
      "productName": "Synthetic Resin Temple Style Weatherproof Roof Sheet Tiles",
      "quantity": 0.00,
      "reOrderLevel": 10,
      "category": "Hardware",
      "supplier": "MinimartKe"
    },
    {
      "productName": "Bamburi Cement",
      "quantity": 0.00,
      "reOrderLevel": 0,
      "category": "Hardware",
      "supplier": "MinimartKe"
    }
  ]
  console.log('Fetching Out of Stock data...')
}

const handlePrint = async () => {

  const lowStockThreshold = currentValue.value.lowStockThreshold || 10;

  const payLoad={
    lowStockThreshold,
    format : "pdf"
    // reportType : "stockReport"
  }
  try{
    await reportStore.ExportReportData(payLoad,activeStockType == 'low' ? "LowStockReport" : "OutOfStockReport");

    showToast("success", "Your report has been generated and downloaded successfully.")

    return true;

  }catch(error){
    showToast("error","Error Generating Report");
    return false;
  }
}

const handleExport = async () => {

  const lowStockThreshold = currentValue.value.lowStockThreshold || 10;

  const payLoad={
    lowStockThreshold,
    format : "xlsx"
    // reportType : "stockReport"
  }
  try{
    await reportStore.ExportReportData(payLoad,activeStockType == 'low' ? "LowStockReport" : "OutOfStockReport");

    showToast("success", "Your report has been generated and downloaded successfully.")

    return true;

  }catch(error){
    showToast("error","Error Generating Report");
    return false;
  }
}

function notifyAdmin() {
  console.log('Sending notification...')
}

// Dynamic button styling
function buttonClass(type) {
  const isActive = activeStockType.value === type
  return [
    'px-4 py-2 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'text-orange-600 border-b-2 border-blue-600'
      : 'text-gray-500 hover:text-gray-700'
  ]
}

 const showToast = (icon, message) => {
      Swal.fire({
        position: 'top-end',
        icon,
        title: message,
        showConfirmButton: false,
        timer: 5000,
        toast: true,
        timerProgressBar: true
      });
    };

// Initialize with low stock data
getLowStock()
</script>

<style>
/* Ensure date picker appears below and is visible */
.dp__menu {
  position: absolute !important;
  z-index: 99999 !important;
  margin-top: 5px !important;
  background: white !important;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06) !important;
}

/* Make the input more visible */
.dp__input {
  border: 1px solid #d1d5db !important;
  border-radius: 0.5rem !important;
  padding: 0.5rem 0.75rem !important;
  font-size: 0.875rem !important;
  line-height: 1.25rem !important;
  width: 100% !important;
  background: white !important;
}

/* Highlight selected range */
.dp__range_between {
  background: #f59e0b !important;
  color: white !important;
}
</style>