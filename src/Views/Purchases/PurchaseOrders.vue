<template>
  <ModuleComponent
    module-name="PurchaseOrders"
    module-name-singular="Purchase Order"
    :data="purchaseData"
    :columns="purchaseColumns"
    :fetch-data="fetchPurchases"
    :add-item="addPurchase"
    :update-item="updatePurchase"
    :delete-item="deletePurchase"
    :is-purchase="true"
    title="Purchase Orders"
    description="Manage your purchase orders"
    add-button-text="Add Purchase"
     modal-size="full"
  >
    <!-- Inject Purchase Form -->
    <template #custom-form="{ onSave, onCancel, selectedItem }">
      <PurchaseForm
        :initial-data="selectedItem"
        @save="onSave"
        @cancel="onCancel"
      />
    </template>
  </ModuleComponent>
</template>

<script>
import ModuleComponent from '../../components/ModuleComponent/ModuleComponent.vue'
import PurchaseForm from '../../components/Forms/PurchasesForm.vue'
import { ref } from "vue";

export default {
  name: "PurchaseOrders",
  components: { ModuleComponent, PurchaseForm },
  setup() {
    const purchaseData = ref([])

    const purchaseColumns = [
      { field: 'reference', label: 'Reference', sortable: true },
      { field: 'supplierName', label: 'Supplier', sortable: true },
      { field: 'date', label: 'Date', type: 'date', sortable: true },
      { field: 'total', label: 'Total', type: 'currency', sortable: true },
      { field: 'status', label: 'Status', type: 'status', sortable: true }
    ]
    
    const fetchPurchases = async () => {
      // TODO: Fetch purchases from API/store
    }
    
    const addPurchase = async (purchase) => {
      // TODO: Save to backend
      console.log("Adding purchase:", purchase)
    }
    
    const updatePurchase = async (id, purchase) => {
      // TODO: Update in backend
      console.log("Updating purchase:", id, purchase)
    }
    
    const deletePurchase = async (id) => {
      // TODO: Delete in backend
      console.log("Deleting purchase:", id)
    }
    
    return {
      purchaseData,
      purchaseColumns,
      fetchPurchases,
      addPurchase,
      updatePurchase,
      deletePurchase
    }
  }
}
</script>
