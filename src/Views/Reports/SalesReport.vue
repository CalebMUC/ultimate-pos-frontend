<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Sales Report</h1>
    <h4 class="text-sm text-slate-400 font-semi-bold px-2 py-2">
      Manage your Sales
    </h4>

    <ReportFilters 
      :filters="salesFilters"
      @generate="generateSalesReport"
    />

    <ReportsTable
        :headers="tableHeaders"
        :rows="tableRows"
        :per-page="10"
    />


  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import ReportFilters from '../../components/Reports/ReportFilters.vue'
import ReportsTable from '../../components/Reports/ReportsTables.vue'
import { useCategoryStore } from '../../store/categoryStore'
import { UseInventoryStore } from '../../store/InventoryStore'

const categoryStore = useCategoryStore()
const inventoryStore = UseInventoryStore()

 // Lifecycle hooks
    onMounted(() => {
      const token = localStorage.getItem('token')
      categoryStore.fetchCategories(token)
      inventoryStore.getallproducts(token);
    })

// Computed values from store
const categories = computed(() => categoryStore.getData || [])
const products = computed(() => inventoryStore.filterProducts || [])

const selectedColumns = [
    {
        key : "productName",
        label : "Product Name"
    },
    {
        key : "categoryName",
        label : "Product Name"
    },
    {
        key : "sellingPrice",
        label : "Price"
    },
    {
        key : "quantity",
        label : "Quantity"
    },
    {
        key : "supplierName",
        label : "Supplier Name"
    },
    

]

const tableHeaders = computed( () =>  selectedColumns.map(col=> col.label))

// Table Rows
const tableRows = computed(()=> products.value.map(product=>{
    return selectedColumns.map(col => product[col.key])
}))

// Log store data for debugging
watch([categories, products], ([catVal, prodVal]) => {
  console.log("Categories from store:", catVal)
  console.log("Products from store:", prodVal)
})

// Default filters state
const salesFilters = ref([
  {
    label: "Date Range",
    key: "dateRange",
    type: "date-range"
  },
  {
    label: "Category",
    key: "category",
    type: "select",
    options: []
  },
  {
    label: "Product",
    key: "product",
    type: "select",
    options: []
  }
])

// Update filter options whenever store data changes
watch([categories, products], ([catVal, prodVal]) => {
  salesFilters.value = [
    {
      label: "Date Range",
      key: "dateRange",
      type: "date-range"
    },
    {
      label: "Category",
      key: "category",
      type: "select",
      options: catVal.map(cat => ({
        value: cat.categoryID, 
        label: cat.categoryName
      }))
    },
    {
      label: "Product",
      key: "product",
      type: "select",
      options: prodVal.map(prod => ({
        value: prod.productID, 
        label: prod.productName
      }))
    }
  ]
}, { immediate: true })

// Fetch store data on mount
onMounted(async () => {
  await categoryStore.fetchCategories?.()
  await inventoryStore.fetchProducts?.()
})

function generateSalesReport(filters) {
  console.log('Generating report with filters:', filters)
  // Implement your report generation logic here
}
</script>
