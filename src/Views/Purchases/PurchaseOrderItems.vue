<template>
  <ModuleComponent
    module-name="PurchaseOrderItems"
    module-name-singular="Purchase Order Item"
    :data="purchaseData"
    :columns="columns"
    :fetch-data="fetchPurchases"
    :form-fields="[]"
    :add-item="null" 
    :update-item="null"
    :delete-item="null"
    title="Purchased Items"
    description="View all purchased items"
    :show-export-buttons="true"
    :is-purchase="false"
  >
    <!-- ✅ Filters slot -->
    <template #filters>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
        <!-- Date Range -->
        <div>
          <label class="block text-gray-600 mb-1">From Date</label>
          <input
            type="date"
            v-model="filters.fromDate"
            class="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>
        <div>
          <label class="block text-gray-600 mb-1">To Date</label>
          <input
            type="date"
            v-model="filters.toDate"
            class="w-full rounded border border-gray-300 px-2 py-1"
          />
        </div>

        <!-- Supplier -->
        <div>
          <label class="block text-gray-600 mb-1">Supplier</label>
          <select
            v-model="filters.supplierId"
            class="w-full rounded border border-gray-300 px-2 py-1"
          >
            <option value="">All</option>
            <option v-for="s in suppliers" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
        </div>

        <!-- Product -->
        <div>
          <label class="block text-gray-600 mb-1">Product</label>
          <select
            v-model="filters.productId"
            class="w-full rounded border border-gray-300 px-2 py-1"
          >
            <option value="">All</option>
            <option v-for="p in products" :key="p.id" :value="p.id">
              {{ p.name }}
            </option>
          </select>
        </div>

        <!-- Status -->
        <div>
          <label class="block text-gray-600 mb-1">Status</label>
          <select
            v-model="filters.status"
            class="w-full rounded border border-gray-300 px-2 py-1"
          >
            <option value="">All</option>
            <option value="active">Active</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>

        <!-- Apply Button -->
        <div class="flex items-end">
          <button
            @click="fetchPurchases"
            class="w-full px-3 py-2 rounded bg-blue-500 hover:bg-blue-600 text-white"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </template>
  </ModuleComponent>
</template>

<script>
import ModuleComponent from '../../components/ModuleComponent/ModuleComponent.vue'
import { usePurchasesStore } from '../../store/PurchaseStore'
import { storeToRefs } from 'pinia'
import { reactive } from 'vue'

export default {
  name: 'PurchaseOrderItems',
  components: { ModuleComponent },

  setup() {
    const purchasesStore = usePurchasesStore()
    const { GetOrderItems: purchaseData } = storeToRefs(purchasesStore)

    // Table columns
    const columns = [
      { field: 'productName', label: 'Product', sortable: true },
      { field: 'quantity', label: 'Quantity', type: 'number', sortable: true },
      { field: 'unitPrice', label: 'Unit Price', type: 'currency', sortable: true },
      { field: 'totalPrice', label: 'Total Price', type: 'currency', sortable: true },
      { field: 'supplierName', label: 'Supplier', sortable: true },
      { field: 'status', label: 'Status', sortable: true },
      { field: 'createdOn', label: 'Created On', type: 'date', sortable: true },
    ]

    // Filters state
    const filters = reactive({
      fromDate: '',
      toDate: '',
      supplierId: '',
      productId: '',
      status: '',
    })

    // Mock supplier & product list (replace with API call if needed)
    const suppliers = [
      { id: 'sup1', name: 'ABC Suppliers' },
      { id: 'sup2', name: 'XYZ Traders' },
    ]

    const products = [
      { id: 'p1', name: 'Cement' },
      { id: 'p2', name: 'Steel' },
    ]

    // Fetch with filters
    const fetchPurchases = async () => {
      try {
        await purchasesStore.fetchPurchaseOrderItems(filters)
      } catch (err) {
        console.error('Error fetching purchase items', err)
      }
    }

    return {
      columns,
      filters,
      suppliers,
      products,
      purchaseData,
      fetchPurchases,
    }
  },
}
</script>
