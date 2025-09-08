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
import { useRolePermissionsStore } from "../../store/RolePermissionsStore";
import { useUserStore } from "../../store/userstore";
// import { toast } from "vue3-toastify";
import { useToast } from "vue-toastification";

export default {
  name: "UserMaintenance",
  components: { ModuleComponent },
  setup() {
    const loading = ref(false);
    const error = ref(null);
    const toast = useToast();
    const roleStore = useRolePermissionsStore();
    const userStore = useUserStore();
    const roles = ref([]);
    const users = ref([]);

    // ✅ Table Columns
    const userColumns = [
      { field: "userName", label: "Username", type: "text", sortable: true },
      // { field: "fullName", label: "Full Name", type: "text", sortable: true },
      { field: "email", label: "Email", type: "text", sortable: true },
      { field: "phoneNumber", label: "Phone", type: "text", sortable: true },
      { field: "roleName", label: "Role", type: "text", sortable: true },
      {
        field: "status",
        label: "Status",
        type: "status",
        sortable: true,
        statusConfig: {
          Active: { variant: "success", icon: "check-circle" },
          Inactive: { variant: "danger", icon: "x-circle" },
        },
      },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    // ✅ Form Fields for User Maintenance
    const userFormFields = computed(() => [
      {
        key: "userName",
        label: "Username",
        type: "text",
        required: true,
        placeholder: "Enter username",
        minLength: 3,
        maxLength: 20,
      },
      {
        key: "fullName",
        label: "Full Name",
        type: "text",
        required: true,
        placeholder: "Enter full name",
        maxLength: 50,
      },
      {
        key: "email",
        label: "Email",
        type: "text",
        required: true,
        placeholder: "Enter email",
        maxLength: 200
      },
      {
        key: "phoneNumber",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter Phone Number",
        helpText: "10-digit number without spaces or special characters",
      },
      {
        key: "roleId",
        label: "Role",
        type: "select",
        required: true,
        options: roles.value.map((role) => ({
          label: role.roleName,
          value: role.roleId,
        })),
      },
      {
        key: "status",
        label: "Status",
        type: "select",
        required: true,
        options: [
          { label: "Active", value: "Active" },
          { label: "Inactive", value: "Inactive" },
        ],
      },
      {
        key: "password",
        label: "Password",
        type: "password",
        required: true,
        placeholder: "Enter password",
      },
      {
        key: "confirmPassword",
        label: "Confirm Password",
        type: "password",
        required: true,
        placeholder: "Confirm password",
        validate: (value, formData) => value === formData.password,
        errorMessage: "Passwords do not match",
      },
    ]);

    // ✅ CRUD METHODS
    const fetchUsers = async () => {
      loading.value = true;
      try {
        await userStore.fetchUsers(); 
        return users.value = userStore.users;
      } catch (err) {
        toast.error("Failed to load users. Please try again.");
        return [];
      } finally {
        loading.value = false;
      }
    };

    const fetchRoles = async () => {
      try {
        await roleStore.fetchRoles();
        roles.value = roleStore.roles;
      } catch (err) {
        toast.error("Failed to load roles");
      }
    };

    const addUser = async (newUser) => {
      loading.value = true;
      try {
        // remove confirmPassword before sending
        const { confirmPassword, ...rest } = newUser;

        const payLoad = {
          ...rest,
          createdBy: "AdminUser",
        };

        await userStore.addUser(payLoad); // ✅ pass payload without confirmPassword
        await fetchUsers();
        return true;
      } catch (err) {
        error.value = "Failed to add user.";
        return false;
      } finally {
        loading.value = false;
      }
    };


    const updateUser = async (updatedUser) => {
      loading.value = true;
      try {
        const { confirmPassword, ...userToUpdate } = updatedUser;
        const index = users.value.findIndex((u) => u.userId === userToUpdate.userId);
        if (index !== -1) users.value[index] = { ...users.value[index], ...userToUpdate };
        return true;
      } catch {
        error.value = "Failed to update user.";
        return false;
      } finally {
        loading.value = false;
      }
    };

    const deleteUser = async (user) => {
      loading.value = true;
      try {
        users.value = users.value.filter((u) => u.userId !== user.userId);
        return true;
      } catch {
        error.value = "Failed to delete user.";
        return false;
      } finally {
        loading.value = false;
      }
    };

    const getUserId = (user) => user.userId;

    onMounted(() => {
      fetchUsers();
      fetchRoles();
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
      error,
    };
  },
};
</script>
