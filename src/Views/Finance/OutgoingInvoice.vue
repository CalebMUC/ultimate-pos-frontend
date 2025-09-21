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
import { ref, computed, onMounted } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "OutgoingInvoicesPage",
  components: { ModuleComponent },
  setup() {
    // Data
    const outgoingInvoices = ref([]);

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
      { key: "invoiceDate", label: "Invoice Date", type: "date", required: true },
      { key: "supplierId", label: "Supplier", type: "select", required: true, options: [] }, // fetch suppliers later
      { key: "refNo", label: "Reference No", type: "text", placeholder: "Optional reference" },
      { key: "totalAmount", label: "Total Amount", type: "number", required: true, min: 0 },
      { key: "taxAmount", label: "Tax Amount", type: "number", required: true, min: 0 },
      { key: "notes", label: "Notes", type: "textarea", placeholder: "Enter notes..." },
      { key: "status", label: "Status", type: "select", required: true, options: ["Pending", "Paid", "Overdue"] }
    ]);

    // Get ID function
    const getInvoiceId = (invoice) => invoice.invoiceId;

    // CRUD actions (replace with real API calls)
    const fetchOutgoingInvoices = async () => {
      outgoingInvoices.value = [
        {
          invoiceId: "1",
          invoiceNo: "INV-1001",
          invoiceDate: "2025-09-01",
          supplier: "ABC Supplies",
          refNo: "PO-555",
          totalAmount: 2500,
          status: "Pending",
          createdOn: "2025-09-05",
          createdBy: "Admin"
        }
      ];
    };

    const addOutgoingInvoice = async (invoice) => {
      console.log("Adding invoice", invoice);
    };

    const updateOutgoingInvoice = async (invoice) => {
      console.log("Updating invoice", invoice);
    };

    const deleteOutgoingInvoice = async (id) => {
      console.log("Deleting invoice", id);
    };

    onMounted(fetchOutgoingInvoices);

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
