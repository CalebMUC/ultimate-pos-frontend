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
    <!-- ✅ Row Actions -->
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
import { useRolePermissionsStore } from "../../store/RolePermissionsStore";

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

    const roleStore = useRolePermissionsStore();

    // Load roles
    const fetchRoles = async () => {
      try {
        await roleStore.fetchRoles(); // ✅ use action
        roles.value = roleStore.roles; // ✅ get state
      } catch (error) {
        toast.error("Failed to load roles");
        console.error(error);
      }
    };

    // Load and group permissions
    const fetchPermissions = async () => {
      try {
        await roleStore.fetchPermissions(); // ✅ use action
        groupPermissions(roleStore.permissions); // ✅ use state
      } catch (error) {
        toast.error("Failed to load permissions");
        console.error(error);
      }
    };

    // Group permissions by module
    const groupPermissions = (permissions) => {
      const grouped = permissions.reduce((acc, perm) => {
        if (!acc[perm.module]) acc[perm.module] = [];
        acc[perm.module].push({
          id: perm.permissionId,      // ✅ keep ID
          key: perm.permissionName,   // ✅ used for checkboxes
          label: perm.description
        });
        return acc;
      }, {});
      permissionGroups.value = Object.keys(grouped).map((module) => ({
        name: module,
        items: grouped[module]
      }));
    };

    const statusOptions = ref([
      { value: true, label: "Active" },
      { value: false, label: "Inactive" }
    ]);

    const roleColumns = [
      { field: "roleName", label: "Role", type: "text", sortable: true },
      { field: "isActive", label: "Status", type: "status", sortable: true },
      { field: "createdBy", label: "Created By", type: "text", sortable: true },
      { field: "createdAt", label: "Created On", type: "date", sortable: true }
    ];

    const roleFormFields = computed(() => [
      { key: "roleName", label: "Role Name", type: "text", required: true, placeholder: "Enter Role Name" },
      { key: "description", label: "Description", type: "textarea", maxLength: 500, placeholder: "Enter description" },
      { key: "isActive", label: "Status", type: "select", required: true, options: statusOptions.value, placeholder: "Select status" }
    ]);

    // CRUD methods
    const addRole = async (roleData) => {
  try {
    // Extend the roleData with CreatedBy
    const payload = {
      ...roleData,
      createdBy: "AdminUser" // 👉 replace with actual logged-in username/ID
    };

    await roleStore.AddRole(payload);
    await fetchRoles(); // ✅ refresh roles after saving

    toast.success("Role added successfully");
    return payload;
  } catch (error) {
    toast.error("Failed to add role");
    throw error;
  }
};


    const updateRole = async (id, roleData) => {
      try {
        const updatedRole = await roleStore.UpdateRole(id, roleData);
        const index = roles.value.findIndex(role => role.roleId === id);
        if (index !== -1) roles.value[index] = updatedRole;
        toast.success("Role updated successfully");
        return updatedRole;
      } catch (error) {
        toast.error("Failed to update role");
        throw error;
      }
    };

    const deleteRole = async (id) => {
      try {
        await roleStore.DeleteRole(id);
        roles.value = roles.value.filter(r => r.roleId !== id);
        toast.success("Role deleted successfully");
      } catch (error) {
        toast.error("Failed to delete role");
        throw error;
      }
    };

    const getRoleId = (role) => role.roleId;

    // Open permissions modal
    const openPermissionModal = async (role) => {
      selectedRole.value = role;
      try {
        const rolePermissions = await roleStore.fetchRolePermissions(role.roleId); // ✅ use action

        // Extract permissionName for pre-checks
        if(rolePermissions.length > 0){
        selectedRolePermissions.value =
         rolePermissions[0].permissions|| [];
        }

        showPermissionModal.value = true;
      } catch (error) {
        toast.error("Failed to load role permissions");
        console.error(error);
      }
    };

    // Save permissions
    const saveRolePermissions = async ({ roleId, permissions }) => {
      try {
        // Convert selected permissionNames back to IDs
        const selectedPermissionIds = permissionGroups.value
          .flatMap(group => group.items)
          .filter(perm => permissions.includes(perm.key))
          .map(perm => perm.id);

        await roleStore.SaveRolePermissions(roleId, selectedPermissionIds); // ✅ use correct action

        toast.success("Permissions updated successfully");
        showPermissionModal.value = false;
      } catch (error) {
        toast.error("Failed to update permissions");
        console.error(error);
      }
    };

    onMounted(() => {
      fetchRoles();
      fetchPermissions();
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
