<template>
  <ModuleComponent
    title="Expense Category"
    description="Manage your Expense Categories"
    moduleName="ExpenseCategories"
    moduleNameSingular="ExpenseCategory"
    :data="filteredCategories"
    :columns="categoryColumns"
    :formFields="categoryFormFields"
    :fetchData="fetchCategories"
    :addItem="addCategory"
    :updateItem="updateCategory"
    :deleteItem="deleteCategory"
    searchPlaceholder="Search Categories..."
    addButtonText="Add Expense Category"
    :showExportButtons="true"
    :showImportButton="false"
  >
    <!-- Custom Filters -->
    <template #filters>
      <label class="text-sm font-medium mr-2">Status:</label>
      <select
        v-model="categoryFilter"
        class="rounded-lg border border-gray-200 py-2 px-3 text-sm shadow-sm"
      >
        <option value="">All Statuses</option>
        <option
          v-for="status in statuses"
          :key="status.key"
          :value="status.value"
        >
          {{ status.value }}
        </option>
      </select>
    </template>
  </ModuleComponent>
</template>

<script>
import { computed, ref } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "ExpenseCategoryPage",
  components: {
    ModuleComponent,
  },
  setup() {
    /** -------------------- State -------------------- */
    const expenseCategories = ref([]);
    const categoryFilter = ref("");

    const statuses = ref([
      { key: "1", value: "Active" },
      { key: "2", value: "Inactive" },
    ]);

    /** -------------------- Table Columns -------------------- */
    const categoryColumns = [
      { field: "name", label: "Category", type: "text", sortable: true },
      { field: "description", label: "Description", type: "text", sortable: true },
      { field: "status", label: "Status", type: "text", sortable: true },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "updatedBy", label: "Updated By", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
      { field: "updatedOn", label: "Updated On", type: "date", sortable: true },
    ];

    /** -------------------- Form Fields -------------------- */
    const categoryFormFields = computed(() => [
      {
        key: "name",
        label: "Expense Category",
        type: "text",
        required: true,
        placeholder: "Enter category name",
      },
      {
        key: "description",
        label: "Description",
        type: "textarea",
        required: true,
        placeholder: "Enter description",
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
    const filteredCategories = computed(() => {
      if (!categoryFilter.value) {
        return expenseCategories.value;
      }
      return expenseCategories.value.filter(
        (cat) => cat.status === categoryFilter.value
      );
    });

    /** -------------------- API Placeholder Methods -------------------- */
    const fetchCategories = async () => {
      // Example: Replace with actual API call
      // const response = await axios.get("/api/expense-categories");
      // expenseCategories.value = response.data;
      expenseCategories.value = [
        {
          id: 1,
          name: "Office Supplies",
          description: "Stationery and office-related items",
          status: "Active",
          createdBy: "Admin",
          updatedBy: "Admin",
          createdOn: "2025-09-01",
          updatedOn: "2025-09-10",
        },
        {
          id: 2,
          name: "Travel",
          description: "Business travel expenses",
          status: "Inactive",
          createdBy: "Admin",
          updatedBy: "User",
          createdOn: "2025-08-20",
          updatedOn: "2025-08-25",
        },
      ];
    };

    const addCategory = async (data) => {
      // Example: POST request
      // await axios.post("/api/expense-categories", data);
      expenseCategories.value.push({
        ...data,
        id: Date.now(),
        createdBy: "CurrentUser",
        updatedBy: "CurrentUser",
        createdOn: new Date().toISOString(),
        updatedOn: new Date().toISOString(),
      });
    };

    const updateCategory = async (data) => {
      // Example: PUT request
      // await axios.put(`/api/expense-categories/${data.id}`, data);
      const index = expenseCategories.value.findIndex((c) => c.id === data.id);
      if (index !== -1) {
        expenseCategories.value[index] = {
          ...expenseCategories.value[index],
          ...data,
          updatedBy: "CurrentUser",
          updatedOn: new Date().toISOString(),
        };
      }
    };

    const deleteCategory = async (id) => {
      // Example: DELETE request
      // await axios.delete(`/api/expense-categories/${id}`);
      expenseCategories.value = expenseCategories.value.filter(
        (c) => c.id !== id
      );
    };

    /** -------------------- Lifecycle -------------------- */
    fetchCategories(); // Load initial data

    return {
      expenseCategories,
      filteredCategories,
      categoryFilter,
      statuses,
      categoryColumns,
      categoryFormFields,
      fetchCategories,
      addCategory,
      updateCategory,
      deleteCategory,
    };
  },
};
</script>
