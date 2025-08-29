<template>
   <ModuleComponent
    title="Categories"
    description="Manage your Categories"
    moduleName="categories"
    moduleNameSingular="category"
    :data="categories"
    :columns="categoryColumns"
    :formFields="categoryFormFields"
    :fetchData="fetchCategories"
    :addItem="addCategory"
    :updateItem="updateCategory"
    :deleteItem="deleteCategory"
    searchPlaceholder="Search Categories..."
    addButtonText="Add New Category"
    :showExportButtons="true"
    :showImportButton="false"
  />
</template>

<script>
import ModuleComponent from "../components/ModuleComponent/ModuleComponent.vue";
import Swal from 'sweetalert2';
import { useCategoryStore } from '../store/categoryStore'
import { computed, ref, onMounted } from 'vue'

export default {
  components: { ModuleComponent },
  setup() {
    const categories = ref([]);
    
    // Store properties
    const CategoryStore = useCategoryStore();
    const data = computed(() => CategoryStore.getData);

    // Fetch initial data
    onMounted(() => {
      fetchCategories();
    });

    const categoryColumns = [
      { field: "categoryName", label: "Category Name", type: "text", sortable: true },
      { field: "categoryCode", label: "Code", type: "text", sortable: true, mono: true },
      { field: "noOfItems", label: "Quantity", type: "number", sortable: true },
      { field: "categoryDescription", label: "Description", type: "text" },
      { field: "status", label: "Status", type: "status" },
    ];

    // Form fields for categories
    const categoryFormFields = [
      { key: "categoryName", label: "Category Name", type: "text", required: true, placeholder: "Enter category name" },
      { key: "categoryDescription", label: "Description", type: "textarea", maxLength: 500, placeholder: "Enter description" },
      { key: "status", label: "Status", type: "select", required: true, 
        options: [
          { value: "active", label: "Active" },
          { value: "inactive", label: "Inactive" },
          { value: "archived", label: "Archived" },
        ]
      },
      { key: "quantity", label: "Quantity", type: "number", required: true, placeholder: "Quantity" },
    ];

    // Generate category code
    const generateCategoryCode = (categoryName) => {
      const prefix = categoryName.slice(0, 2).toUpperCase();
      const randomPart = Math.random().toString(36).substring(2, 5).toUpperCase();
      return (prefix + randomPart).padEnd(5, 'X');
    };

    // Fetch categories from store
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem('token');
        await CategoryStore.fetchCategories(token);
        categories.value = CategoryStore.getData;
        return categories.value;
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch categories', 'error');
        throw error;
      }
    };

    // Add new category
    const addCategory = async (categoryData) => {
      try {
        const payload = { 
          ...categoryData,
          categoryCode: generateCategoryCode(categoryData.categoryName),
          noOfItems: 0
        };
        
        await CategoryStore.AddnewCategory(payload);
        await fetchCategories(); // Refresh the list
        
        Swal.fire('Success', 'Category created successfully', 'success');
        return { success: true };
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to create category', 'error');
        throw error;
      }
    };

    // Update category
    const updateCategory = async (id, categoryData) => {
      try {
        const payload = {
          ...categoryData,
          categoryID: id
        };
        
        await CategoryStore.updateCategory(payload);
        await fetchCategories(); // Refresh the list
        
        Swal.fire('Success', 'Category updated successfully', 'success');
        return { success: true };
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to update category', 'error');
        throw error;
      }
    };

    // Delete category
    const deleteCategory = async (id) => {
      try {
        await CategoryStore.deleteCategory(id);
        await fetchCategories(); // Refresh the list
        
        Swal.fire('Success', 'Category deleted successfully', 'success');
        return { success: true };
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to delete category', 'error');
        throw error;
      }
    };

    return {
      categories,
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