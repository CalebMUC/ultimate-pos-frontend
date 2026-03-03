<template>
  <ModuleComponent
    title="Outgoing Invoices"
    description="Create and manage invoices"
    moduleName="outgoingInvoices"
    moduleNameSingular="outgoingInvoice"
    :data="outgoingInvoices"
    :columns="outgoingInvoiceColumns"
    :formFields="outgoingInvoiceFormFields"
    :fetchData="fetchOutgoingInvoices"
    :addItem="addOutgoingInvoice"
    :updateItem="updateOutgoingInvoice"
    :deleteItem="deleteOutgoingInvoice"
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
import { useOutgoingInvoiceStore } from "../../store/OutgoingInvoiceStore";
import { storeToRefs } from "pinia";

export default {
  name: "OutgoingInvoicesPage",
  components: { ModuleComponent },
  setup() {
    const store = useOutgoingInvoiceStore()
    const { invoices: outgoingInvoices } = storeToRefs(store)

    // Table columns
    const outgoingInvoiceColumns = computed(() => [
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
    const outgoingInvoiceFormFields = computed(() => [
      { key: "invoiceNo", label: "Invoice No", type: "text", required: true, placeholder: "Enter Invoice Number" },
      { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
      { key: "supplierId", label: "Supplier", type: "select", required: true, options: [] },
      { key: "refNo", label: "Reference No", type: "text", placeholder: "Optional reference" },
      { key: "totalAmount", label: "Total Amount", type: "number", required: true, min: 0 },
      { key: "taxAmount", label: "Tax Amount", type: "number", required: true, min: 0 },
      { key: "notes", label: "Notes", type: "textarea", placeholder: "Enter notes..." },
      { key: "status", label: "Status", type: "select", required: true, options: [
        { value: "Pending", label: "Pending" },
        { value: "Paid", label: "Paid" },
        { value: "Overdue", label: "Overdue" }
      ]}
    ]);

    const getInvoiceId = (invoice) => invoice.invoiceId

    const fetchOutgoingInvoices = () => store.fetchInvoices()
    const addOutgoingInvoice    = (data) => store.addInvoice(data)
    const updateOutgoingInvoice = (id, data) => store.updateInvoice(id, data)
    const deleteOutgoingInvoice = (id) => store.deleteInvoice(id)

    onMounted(fetchOutgoingInvoices)

    return {
      outgoingInvoices,
      outgoingInvoiceColumns,
      outgoingInvoiceFormFields,
      fetchOutgoingInvoices,
      addOutgoingInvoice,
      updateOutgoingInvoice,
      deleteOutgoingInvoice,
      getInvoiceId
    };
  }
};
</script>
