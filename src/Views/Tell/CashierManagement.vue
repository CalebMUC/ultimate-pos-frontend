<template>
  <ModuleComponent
    title="Cashiers"
    description="Manage cashiers, assign tills, and track their status"
    moduleName="cashiers"
    moduleNameSingular="cashier"
    :data="cashiers"
    :columns="cashierColumns"
    :formFields="cashierFormFields"
    :fetchData="fetchCashiers"
    :addItem="addCashier"
    :updateItem="updateCashier"
    :deleteItem="deleteCashier"
    searchPlaceholder="Search Cashiers..."
    addButtonText="Assign Till"
    :showExportButtons="false"
    :showImportButton="false"
    :getId="getCashierId"
  />
</template>

<script>
import { ref, computed } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "CashierManagement",
  components: { ModuleComponent },
  setup() {
    // 🟢 Dummy data
    const cashiers = ref([
      {
        cashierId: 1,
        fullName: "John Doe",
        username: "jdoe",
        assignedTill: "Main Counter",
        status: "Active",
        createdOn: "2025-08-01",
      },
      {
        cashierId: 2,
        fullName: "Jane Smith",
        username: "jsmith",
        assignedTill: "Back Office",
        status: "Inactive",
        createdOn: "2025-08-03",
      },
      {
        cashierId: 3,
        fullName: "David Kim",
        username: "dkim",
        assignedTill: "Express Counter",
        status: "Active",
        createdOn: "2025-08-05",
      },
    ]);

    // 🟢 Table columns
    const cashierColumns = [
      { field: "fullName", label: "Full Name", type: "text", sortable: true },
      { field: "username", label: "Username", type: "text", sortable: true },
      { field: "assignedTill", label: "Assigned Till", type: "text", sortable: true },
      { field: "status", label: "Status", type: "status", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    // 🟢 Form fields for Add/Edit Cashier
    const cashierFormFields = computed(() => [
      { key: "fullName", label: "Full Name", type: "text", required: true, placeholder: "Enter cashier full name" },
      { key: "username", label: "Username", type: "text", required: true, placeholder: "Enter username" },
      { key: "assignedTill", label: "Assign Till", type: "select", options: [
          { value: "Main Counter", label: "Main Counter" },
          { value: "Back Office", label: "Back Office" },
          { value: "Express Counter", label: "Express Counter" },
        ], required: true },
      { key: "status", label: "Status", type: "select", options: [
          { value: "Active", label: "Active" },
          { value: "Inactive", label: "Inactive" },
        ], required: true },
    ]);

    // 🟢 CRUD Methods (Dummy for now)
    const fetchCashiers = async () => {
      console.log("Fetching cashiers...");
      return cashiers.value;
    };

    const addCashier = async (newCashier) => {
      newCashier.cashierId = cashiers.value.length + 1;
      newCashier.createdOn = new Date().toISOString().slice(0, 10);
      cashiers.value.push(newCashier);
      console.log("Cashier added:", newCashier);
    };

    const updateCashier = async (id, updatedCashier) => {
      const index = cashiers.value.findIndex((c) => c.cashierId === id);
      if (index !== -1) cashiers.value[index] = { ...cashiers.value[index], ...updatedCashier };
      console.log("Cashier updated:", updatedCashier);
    };

    const deleteCashier = async (id) => {
      cashiers.value = cashiers.value.filter((c) => c.cashierId !== id);
      console.log("Cashier deleted:", id);
    };

    const getCashierId = (cashier) => cashier.cashierId;

    return {
      cashiers,
      cashierColumns,
      cashierFormFields,
      fetchCashiers,
      addCashier,
      updateCashier,
      deleteCashier,
      getCashierId,
    };
  },
};
</script>
