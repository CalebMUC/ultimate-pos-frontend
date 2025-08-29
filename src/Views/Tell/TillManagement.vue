<template>
  <ModuleComponent
    title="Tills"
    description="Manage Tills, Balances and Status"
    moduleName="tills"
    moduleNameSingular="till"
    :data="tills"
    :columns="tillColumns"
    :formFields="tillFormFields"
    :fetchData="fetchTills"
    :addItem="addTill"
    :updateItem="updateTill"
    :deleteItem="deleteTill"
    searchPlaceholder="Search Tills..."
    addButtonText="Add Till"
    :showExportButtons="false"
    :showImportButton="false"
    :getId="getTillId"
  >
    <!-- You can also inject slot actions if ModuleComponent supports -->
  </ModuleComponent>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "TillManagement",
  components: { ModuleComponent },
  setup() {
    // 🟢 Dummy data
    const tills = ref([
      {
        tillId: 1,
        tillName: "Main Counter",
        cashierName: "John Doe",
        balance: 5000,
        status: "Open",
        createdOn: "2025-08-01",
      },
      {
        tillId: 2,
        tillName: "Back Office",
        cashierName: "Jane Smith",
        balance: 12000,
        status: "Closed",
        createdOn: "2025-08-05",
      },
      {
        tillId: 3,
        tillName: "Express Counter",
        cashierName: "David Kim",
        balance: 800,
        status: "Suspended",
        createdOn: "2025-08-10",
      },
    ]);

    // 🟢 Table columns
    const tillColumns = [
      { field: "tillName", label: "Till Name", type: "text", sortable: true },
      { field: "cashierName", label: "Assigned Cashier", type: "text", sortable: true },
      { field: "balance", label: "Balance", type: "currency", sortable: true },
      { field: "status", label: "Status", type: "status", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    // 🟢 Form fields for Add/Edit Till
    const tillFormFields = computed(() => [
      { key: "tillName", label: "Till Name", type: "text", required: true, placeholder: "Enter Till Name" },
      { key: "cashierId", label: "Assign Cashier", type: "select", options: [
          { value: 1, label: "John Doe" },
          { value: 2, label: "Jane Smith" },
          { value: 3, label: "David Kim" },
        ], required: true },
      { key: "balance", label: "Initial Balance", type: "number", required: true, placeholder: "Enter starting balance" },
      { key: "status", label: "Status", type: "select", options: [
          { value: "Open", label: "Open" },
          { value: "Closed", label: "Closed" },
          { value: "Suspended", label: "Suspended" },
        ], required: true },
    ]);

    // 🟢 CRUD Methods (Dummy for now)
    const fetchTills = async () => {
      console.log("Fetching tills...");
      return tills.value;
    };

    const addTill = async (newTill) => {
      newTill.tillId = tills.value.length + 1;
      tills.value.push(newTill);
      console.log("Till added:", newTill);
    };

    const updateTill = async (id, updatedTill) => {
      const index = tills.value.findIndex((t) => t.tillId === id);
      if (index !== -1) tills.value[index] = { ...tills.value[index], ...updatedTill };
      console.log("Till updated:", updatedTill);
    };

    const deleteTill = async (id) => {
      tills.value = tills.value.filter((t) => t.tillId !== id);
      console.log("Till deleted:", id);
    };

    const getTillId = (till) => till.tillId;

    return {
      tills,
      tillColumns,
      tillFormFields,
      fetchTills,
      addTill,
      updateTill,
      deleteTill,
      getTillId,
    };
  },
};
</script>
