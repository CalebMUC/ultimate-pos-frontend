<template>
  <ModuleComponent
    title="Purchase Invoices"
    description="Manage your Invoices"
    moduleName="purchaseInvoices"
    moduleNameSingular="purchaseInvoice"
    :data="purchaseInvoices"
    :columns="invoiceColumns"
    :formFields="invoiceFormFields"
    :fetchData="fetchInvoices"
    :addItem="addInvoice"
    :updateItem="updateInvoice"
    :deleteItem="deleteInvoice"
    searchPlaceholder="Search Invoice..."
    addButtonText="Add New Invoice"
    :showExportButtons="true"
    :showImportButton="true"
    :getId="getInvoiceId"
    modal-size="xl"
    form-columns="2"
    :products="true"
  />
</template>

<script>
import { computed, onMounted } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";
import { usePurchaseInvoiceStore } from "../../store/PurchaseInvoiceStore";
import { storeToRefs } from "pinia";

export default {
  name: "PurchaseInvoicesPage",
  components: { ModuleComponent },
  setup() {
    const store = usePurchaseInvoiceStore()
    const { invoices: purchaseInvoices } = storeToRefs(store)

    // Table columns
    const invoiceColumns = computed(() => [
      { field: "invoiceNo", label: "Invoice No", type: "text", sortable: true },
      { field: "invoiceDate", label: "Invoice Date", type: "date", sortable: true },
      { field: "supplier", label: "Supplier", type: "text", sortable: true },
      { field: "refNo", label: "Reference No", type: "text", sortable: true },
      { field: "totalAmount", label: "Total Amount", type: "currency", sortable: true },
      { field: "status", label: "Status", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
      { field: "createdBy", label: "Created By", type: "text", sortable: true }
    ]);

    // Form fields
    const invoiceFormFields = computed(() => [
      { key: "invoiceNo", label: "Invoice No", type: "text", required: true, placeholder: "Enter Invoice Number" },
      { key: "purchaseOrderId", label: "Purchase Order", type: "select", required: true, options: [] },
      { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
      { key: "supplierId", label: "Supplier", type: "select", required: true, options: [] },
      { key: "refNo", label: "Reference No", type: "text", placeholder: "Optional reference" },
      { key: "totalAmount", label: "Total Amount", type: "number", required: true, min: 0 },
      { key: "taxAmount", label: "Tax Amount", type: "number", required: true, min: 0 },
      { key: "status", label: "Status", type: "select", required: true, options: [
        { value: "Pending", label: "Pending" },
        { value: "Paid", label: "Paid" },
        { value: "Overdue", label: "Overdue" }
      ]},
      { key: "notes", label: "Notes", type: "textarea", placeholder: "Enter notes (optional)" },
    ]);

    const getInvoiceId = (invoice) => invoice.invoiceId

    const fetchInvoices = () => store.fetchInvoices()
    const addInvoice    = (data) => store.addInvoice(data)
    const updateInvoice = (id, data) => store.updateInvoice(id, data)
    const deleteInvoice = (id) => store.deleteInvoice(id)

    onMounted(fetchInvoices)

    return {
      purchaseInvoices,
      invoiceColumns,
      invoiceFormFields,
      fetchInvoices,
      addInvoice,
      updateInvoice,
      deleteInvoice,
      getInvoiceId
    };
  }
};
</script>
