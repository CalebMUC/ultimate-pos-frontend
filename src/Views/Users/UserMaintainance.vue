<template>
  <div class="user-maintenance-container">
    <ModuleComponent
      title="Users"
      description="Manage Users"
      moduleName="users"
      moduleNameSingular="user"
      :data="users"
      :columns="userColumns"
      :formFields="userFormFields"
      :fetchData="fetchUsers"
      :addItem="addUser"
      :updateItem="updateUser"
      :deleteItem="deleteUser"
      searchPlaceholder="Search Users..."
      addButtonText="Add New User"
      :showExportButtons="false"
      :showImportButton="false"
      :getId="getUserId"
      :loading="loading"
      :error="error"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";

export default {
  name: "UserMaintenance",
  components: { ModuleComponent },
  setup() {
    const loading = ref(false);
    const error = ref(null);
    
    // ✅ Dummy Users
    const users = ref([
      {
        userId: 1,
        username: "admin",
        fullName: "System Administrator",
        email: "admin@pos.com",
        phone: "0712345678",
        role: "Administrator",
        status: "Active",
        createdBy: "System",
        createdOn: "2025-01-01",
      },
      {
        userId: 2,
        username: "jdoe",
        fullName: "John Doe",
        email: "john@pos.com",
        phone: "0798765432",
        role: "Cashier",
        status: "Inactive",
        createdBy: "Admin",
        createdOn: "2025-02-01",
      },
    ]);

    // ✅ Table Columns
    const userColumns = [
      { field: "username", label: "Username", type: "text", sortable: true },
      { field: "fullName", label: "Full Name", type: "text", sortable: true },
      { field: "email", label: "Email", type: "text", sortable: true },
      { field: "phone", label: "Phone", type: "text", sortable: true },
      { field: "role", label: "Role", type: "text", sortable: true },
      { 
        field: "status", 
        label: "Status", 
        type: "status", 
        sortable: true,
        statusConfig: {
          Active: { variant: "success", icon: "check-circle" },
          Inactive: { variant: "danger", icon: "x-circle" }
        }
      },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    // ✅ Form Fields for User Maintenance
    const userFormFields = computed(() => [
      {
        key: "username",
        label: "Username",
        type: "text",
        required: true,
        placeholder: "Enter username",
        minLength: 3,
        maxLength: 20
      },
      {
        key: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter full name",
        maxLength: 50
      },
      {
        key: "email",
        label: "Email",
        type: "email",
        required: true,
        placeholder: "Enter email",
        pattern: "[^@]+@[^@]+\\.[^@]+"
      },
      {
        key: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter phone number",
        pattern: "[0-9]{10}",
        helpText: "10-digit number without spaces or special characters"
      },
      {
        key: "role",
        label: "Role",
        type: "select",
        required: true,
        options: ["Administrator", "Manager", "Cashier", "Clerk"],
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: ["Active", "Inactive"],
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter password",
        minLength: 6,
        helpText: "Minimum 6 characters"
      },
      {
        key: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Confirm password",
        validate: (value, formData) => value === formData.password,
        errorMessage: "Passwords do not match"
      },
    ]);

    // ✅ CRUD METHODS (Mocked)
    const fetchUsers = async () => {
      loading.value = true;
      error.value = null;
      try {
        console.log("Fetching users...");
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        return users.value;
      } catch (err) {
        error.value = "Failed to load users. Please try again.";
        console.error("Error fetching users:", err);
        return [];
      } finally {
        loading.value = false;
      }
    };

    const addUser = async (newUser) => {
      loading.value = true;
      try {
        // Remove confirmPassword before saving
        const { confirmPassword, ...userToAdd } = newUser;
        
        userToAdd.userId = users.value.length + 1;
        userToAdd.createdBy = "Admin";
        userToAdd.createdOn = new Date().toISOString().split("T")[0];
        users.value.push(userToAdd);
        console.log("User added:", userToAdd);
        return true;
      } catch (err) {
        error.value = "Failed to add user. Please try again.";
        console.error("Error adding user:", err);
        return false;
      } finally {
        loading.value = false;
      }
    };

    const updateUser = async (updatedUser) => {
      loading.value = true;
      try {
        // Remove confirmPassword if it exists
        const { confirmPassword, ...userToUpdate } = updatedUser;
        
        const index = users.value.findIndex((u) => u.userId === userToUpdate.userId);
        if (index !== -1) {
          users.value[index] = { ...users.value[index], ...userToUpdate };
          console.log("User updated:", userToUpdate);
          return true;
        }
        return false;
      } catch (err) {
        error.value = "Failed to update user. Please try again.";
        console.error("Error updating user:", err);
        return false;
      } finally {
        loading.value = false;
      }
    };

    const deleteUser = async (user) => {
      loading.value = true;
      try {
        users.value = users.value.filter((u) => u.userId !== user.userId);
        console.log("User deleted:", user);
        return true;
      } catch (err) {
        error.value = "Failed to delete user. Please try again.";
        console.error("Error deleting user:", err);
        return false;
      } finally {
        loading.value = false;
      }
    };

    const getUserId = (user) => user.userId;

    onMounted(() => {
      fetchUsers();
    });

    return {
      users,
      userColumns,
      userFormFields,
      fetchUsers,
      addUser,
      updateUser,
      deleteUser,
      getUserId,
      loading,
      error
    };
  },
};
</script>

<style scoped>
.user-maintenance-container {
  padding: 1rem;
  height: 100%;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .user-maintenance-container {
    padding: 0.5rem;
  }
}
</style>