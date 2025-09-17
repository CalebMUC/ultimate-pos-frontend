<template>
  <ModuleComponent
    title="Expenses"
    description="Manage your Expenses"
    moduleName="Expenses"
    moduleNameSingular="Expense"
    :data="filteredExpenses"
    :columns="expenseColumns"
    :formFields="expenseFormFields"
    :fetchData="fetchExpenses"
    :addItem="addExpense"
    :updateItem="updateExpense"
    :deleteItem="deleteExpense"
    searchPlaceholder="Search Expenses..."
    addButtonText="Add New Expense"
    :showExportButtons="true"
    :showImportButton="false"
    modal-size="lg"
    form-columns="2"
  >
    <!-- Custom Filters -->
    <template #filters>
      <!-- Status Filter -->
      
      <select
        v-model="statusFilter"
        class="rounded-lg border border-gray-200 py-2 px-3 text-sm shadow-sm"
      >
        <option value="">All Statuses</option>
        <option v-for="status in statuses" :key="status.key" :value="status.value">
          {{ status.value }}
        </option>
      </select>

      <!-- Category Filter -->
      
      <select
        v-model="expenseCategoryFilter"
        class="rounded-lg border border-gray-200 py-2 px-3 text-sm shadow-sm"
      >
        <option value="">All Categories</option>
        <option
          v-for="category in expenseCategories"
          :key="category.id"
          :value="category.name"
        >
          {{ category.name }}
        </option>
      </select>
    </template>
  </ModuleComponent>
</template>

<script>
import { computed, ref } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "ExpensesPage",
  components: {
    ModuleComponent,
  },
  setup() {
    /** -------------------- State -------------------- */
    const expenses = ref([]);
    const expenseCategories = ref([]);

    const statusFilter = ref("");
    const expenseCategoryFilter = ref("");

    const statuses = ref([
      { key: "1", value: "Approved" },
      { key: "2", value: "Pending" },
      { key: "3", value: "Rejected" },
    ]);

    /** -------------------- Table Columns -------------------- */
    const expenseColumns = [
      { field: "referenceNo", label: "Reference", type: "text", sortable: true },
      { field: "name", label: "Expense Name", type: "text", sortable: true },
      { field: "expenseCategory", label: "Category", type: "text", sortable: true },
      { field: "description", label: "Description", type: "text", sortable: true },
      { field: "status", label: "Status", type: "text", sortable: true },
      { field: "amount", label: "Amount", type: "currency", sortable: true },
      { field: "expenseDate", label: "Date", type: "date", sortable: true },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    /** -------------------- Form Fields -------------------- */
    const expenseFormFields = computed(() => [
      {
        key: "name",
        label: "Expense Name",
        type: "text",
        required: true,
        placeholder: "Enter expense name",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "Enter description",
      },
      {
        key: "amount",
        label: "Amount",
        type: "number",
        required: true,
        placeholder: "Enter amount",
      },
      {
        key: "expenseDate",
        label: "Date",
        type: "date",
        required: true,
      },
      {
        key: "expenseCategory",
        label: "Category",
        type: "select",
        required: true,
        options: expenseCategories.value.map((cat) => ({
          value: cat.name,
          label: cat.name,
        })),
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: statuses.value.map((status) => ({
          value: status.value,
          label: status.value,
        })),
      },
    ]);

    /** -------------------- Filtering -------------------- */
    const filteredExpenses = computed(() => {
      return expenses.value.filter((exp) => {
        const matchStatus = !statusFilter.value || exp.status === statusFilter.value;
        const matchCategory =
          !expenseCategoryFilter.value ||
          exp.expenseCategory === expenseCategoryFilter.value;
        return matchStatus && matchCategory;
      });
    });

    /** -------------------- API Placeholder Methods -------------------- */
    const fetchExpenses = async () => {
      // Example: Replace with real API call
      // const response = await axios.get("/api/expenses");
      // expenses.value = response.data;

      expenses.value = [
        {
          id: 1,
          referenceNo: "EXP-001",
          name: "Stationery Purchase",
          expenseCategory: "Office Supplies",
          description: "Pens, paper, and files",
          status: "Approved",
          amount: 150,
          expenseDate: "2025-09-01",
          createdBy: "Admin",
          createdOn: "2025-09-01",
        },
        {
          id: 2,
          referenceNo: "EXP-002",
          name: "Flight Ticket",
          expenseCategory: "Travel",
          description: "Business meeting trip",
          status: "Pending",
          amount: 300,
          expenseDate: "2025-09-05",
          createdBy: "Admin",
          createdOn: "2025-09-05",
        },
      ];

      // Load categories as well
      expenseCategories.value = [
        { id: 1, name: "Office Supplies" },
        { id: 2, name: "Travel" },
        { id: 3, name: "Utilities" },
      ];
    };

    const addExpense = async (data) => {
      expenses.value.push({
        ...data,
        id: Date.now(),
        createdBy: "CurrentUser",
        createdOn: new Date().toISOString(),
      });
    };

    const updateExpense = async (data) => {
      const index = expenses.value.findIndex((e) => e.id === data.id);
      if (index !== -1) {
        expenses.value[index] = {
          ...expenses.value[index],
          ...data,
        };
      }
    };

    const deleteExpense = async (id) => {
      expenses.value = expenses.value.filter((e) => e.id !== id);
    };

    /** -------------------- Lifecycle -------------------- */
    fetchExpenses(); // Load initial data

    return {
      expenses,
      expenseCategories,
      statuses,
      statusFilter,
      expenseCategoryFilter,
      expenseColumns,
      expenseFormFields,
      filteredExpenses,
      fetchExpenses,
      addExpense,
      updateExpense,
      deleteExpense,
    };
  },
};
</script>
