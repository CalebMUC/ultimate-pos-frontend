<template>
  <ModuleComponent
    title="Roles"
    description="Manage Roles and Permission"
    moduleName="roles"
    moduleNameSingular="role"
    :data="roles"
    :columns="roleColumns"
    :formFields="roleFormFields"
    :fetchData="fetchRoles"
    :addItem="addRole"
    :updateItem="updateRole"
    :deleteItem="deleteRole"
    searchPlaceholder="Search Roles..."
    addButtonText="Add Role"
    :showExportButtons="false"
    :showImportButton="false"
    :getId="getRoleId"
  >
    <!-- ✅ Actions slot - This will show for each row -->
    <template #row-actions="{ item }">
      <button
        @click="openPermissionModal(item)"
        class="p-2 text-green-600 hover:bg-green-100 rounded-full"
        title="Manage Permissions"
      >
        <ShieldCheckIcon class="w-5 h-5" />
      </button>
    </template>
  </ModuleComponent>

  <!-- Permission Modal -->
  <PermissionModal
    :isOpen="showPermissionModal"
    :role="selectedRole"
    :permissions="permissionGroups"
    :modelValue="selectedRolePermissions"
    @close="showPermissionModal = false"
    @save="saveRolePermissions"
  />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { useToast } from "vue-toastification";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";
import PermissionModal from "../../components/Modals/PermissionModal.vue";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline";

export default {
  name: "RolesManagement",
  components: {
    ModuleComponent,
    PermissionModal,
    ShieldCheckIcon
  },
  setup() {
    const toast = useToast();
    const roles = ref([]);
    const showPermissionModal = ref(false);
    const selectedRole = ref(null);
    const selectedRolePermissions = ref([]);
    const permissionGroups = ref([]);

    // Sample status options
    const statusOptions = ref([
      { value: "active", label: "Active" },
      { value: "inactive", label: "Inactive" }
    ]);

    const roleColumns = [
      { field: "roleName", label: "Role", type: "text", sortable: true },
      { field: "status", label: "Status", type: "status", sortable: true },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "createdOn", label: "Created On", type: "date", sortable: true },
    ];

    // Form fields for roles
    const roleFormFields = computed(() => [
      { 
        key: "roleName", 
        label: "Role Name", 
        type: "text", 
        required: true, 
        placeholder: "Enter Role Name" 
      },
      { 
        key: "roleDescription", 
        label: "Description", 
        type: "textarea", 
        maxLength: 500, 
        placeholder: "Enter description" 
      },
      { 
        key: "status", 
        label: "Status", 
        type: "select", 
        required: true, 
        options: statusOptions.value,
        placeholder: "Select status" 
      }
    ]);

    // Mock function to fetch roles
    const fetchRoles = async () => {
      try {
        // Mock data for demonstration
        roles.value = [
          {
            id: 1,
            roleName: "Administrator",
            roleDescription: "Full system access",
            status: "active",
            createdBy: "System Admin",
            createdOn: new Date("2023-01-15"),
            permissions: ["view_products", "edit_products", "delete_products", "view_sales", "create_sales", "view_reports", "export_reports"]
          },
          {
            id: 2,
            roleName: "Manager",
            roleDescription: "Manage products and view reports",
            status: "active",
            createdBy: "System Admin",
            createdOn: new Date("2023-02-20"),
            permissions: ["view_products", "edit_products", "view_sales", "view_reports"]
          },
          {
            id: 3,
            roleName: "Cashier",
            roleDescription: "Process sales transactions",
            status: "active",
            createdBy: "Manager",
            createdOn: new Date("2023-03-10"),
            permissions: ["view_products", "create_sales"]
          }
        ];
        
        return roles.value;
      } catch (error) {
        toast.error("Failed to fetch roles");
        console.error("Error fetching roles:", error);
        return [];
      }
    };

    // Mock function to add a role
    const addRole = async (roleData) => {
      try {
        const newRole = {
          id: Math.max(...roles.value.map(r => r.id)) + 1,
          ...roleData,
          createdBy: "Current User",
          createdOn: new Date(),
          permissions: []
        };
        
        roles.value.push(newRole);
        toast.success("Role added successfully");
        return newRole;
      } catch (error) {
        toast.error("Failed to add role");
        console.error("Error adding role:", error);
        throw error;
      }
    };

    // Mock function to update a role
    const updateRole = async (id, roleData) => {
      try {
        const index = roles.value.findIndex(role => role.id === id);
        if (index !== -1) {
          // Keep existing permissions when updating
          const existingPermissions = roles.value[index].permissions || [];
          roles.value[index] = { 
            ...roles.value[index], 
            ...roleData,
            permissions: existingPermissions
          };
          toast.success("Role updated successfully");
          return roles.value[index];
        }
        
        throw new Error("Role not found");
      } catch (error) {
        toast.error("Failed to update role");
        console.error("Error updating role:", error);
        throw error;
      }
    };

    // Mock function to delete a role
    const deleteRole = async (id) => {
      try {
        const index = roles.value.findIndex(role => role.id === id);
        if (index !== -1) {
          roles.value.splice(index, 1);
          toast.success("Role deleted successfully");
          return true;
        }
        
        throw new Error("Role not found");
      } catch (error) {
        toast.error("Failed to delete role");
        console.error("Error deleting role:", error);
        throw error;
      }
    };

    // Function to get role ID
    const getRoleId = (role) => role.id;

    // Function to open permission modal
    const openPermissionModal = (role) => {
      selectedRole.value = role;
      // Set the selected permissions for this role
      selectedRolePermissions.value = role.permissions || [];
      loadPermissionGroups();
      showPermissionModal.value = true;
    };

    // Mock function to load permission groups
    const loadPermissionGroups = async () => {
      try {
        // Transform the data to match what the PermissionModal expects
        permissionGroups.value = [
          {
            name: "Products",
            items: [
              { key: "view_products", label: "View Products" },
              { key: "edit_products", label: "Edit Products" },
              { key: "delete_products", label: "Delete Products" }
            ]
          },
          {
            name: "Sales",
            items: [
              { key: "view_sales", label: "View Sales" },
              { key: "create_sales", label: "Create Sales" },
              { key: "edit_sales", label: "Edit Sales" }
            ]
          },
          {
            name: "Reports",
            items: [
              { key: "view_reports", label: "View Reports" },
              { key: "export_reports", label: "Export Reports" }
            ]
          }
        ];
      } catch (error) {
        toast.error("Failed to load permission groups");
        console.error("Error loading permission groups:", error);
      }
    };

    // Mock function to save role permissions
    const saveRolePermissions = async ({ roleId, permissions }) => {
      try {
        // Find the role and update its permissions
        const roleIndex = roles.value.findIndex(role => role.id === roleId);
        if (roleIndex !== -1) {
          roles.value[roleIndex].permissions = permissions;
          toast.success("Permissions updated successfully");
          showPermissionModal.value = false;
        } else {
          throw new Error("Role not found");
        }
      } catch (error) {
        toast.error("Failed to update permissions");
        console.error("Error updating permissions:", error);
      }
    };

    onMounted(() => {
      fetchRoles();
    });

    return {
      roles,
      roleColumns,
      roleFormFields,
      showPermissionModal,
      selectedRole,
      selectedRolePermissions,
      permissionGroups,
      fetchRoles,
      addRole,
      updateRole,
      deleteRole,
      getRoleId,
      openPermissionModal,
      saveRolePermissions
    };
  }
};
</script>