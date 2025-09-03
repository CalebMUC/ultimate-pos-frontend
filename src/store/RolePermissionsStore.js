import { defineStore } from 'pinia'
import axios from '../axios'

export const useRolePermissionsStore = defineStore('RolePermissionsStore', {
  state: () => ({
    roles: [],                 // list of all roles
    permissions: [],           // list of all permissions
    permissionModuleGroups : [],
    rolePermissions: {},       // mapping roleId -> list of permissions
    loading: false,
    error: null
  }),

  getters: {
    GetRoles: (state) => state.roles,
    GetPermissions: (state) => state.permissions,
    GetRolePermissions: (state) => {
      return (roleId) => state.rolePermissions[roleId] || []
    },
    GetPermissionModuleGroups : (state) => state.permissionModuleGroups
  },

  actions: {
    // 🔹 Fetch all roles
    async fetchRoles() {
      this.loading = true
      return axios.GetRoles()
        .then(response => {
          this.roles = response.data
          return response.data
        })
        .catch(error => {
          this.error = error
          console.error('Failed to fetch roles', error)
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 🔹 Fetch all permissions
    async fetchPermissions() {
      this.loading = true
      return axios.GetPermissions()
        .then(response => {
          this.permissions = response.data
          return response.data
        })
        .catch(error => {
          this.error = error
          console.error('Failed to fetch permissions', error)
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 🔹 Fetch all permissions
    async fetchPermissionModuleGroups() {
      this.loading = true
      return axios.GetPermissions()
        .then(response => {
          this.permissions = response.data
          return response.data
        })
        .catch(error => {
          this.error = error
          console.error('Failed to fetch permissions', error)
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 🔹 Fetch permissions for a specific role
    async fetchRolePermissions(roleId) {
      this.loading = true
      const payLoad = {
        RoleId : roleId
      }
      return axios.GetRolePermissions(payLoad)
        .then(response => {
          this.rolePermissions[roleId] = response.data.permissions || []
          return response.data
        })
        .catch(error => {
          this.error = error
          console.error('Failed to fetch role permissions', error)
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 🔹 Add new role
    async AddRole(roleData) {
      this.loading = true
      return axios.AddRole(roleData)
        .then(response => {
          this.roles.push(response.data)
          return response.data
        })
        .catch(error => {
          this.error = error
          console.error('Failed to add role', error)
          throw error
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 🔹 Save/update role permissions
async SaveRolePermissions(postData) {
  this.loading = true
  try {
    const response = await axios.SaveRolePermissions(postData)

    // ✅ update local state so UI reflects changes without refetch
    this.rolePermissions[postData.roleId] = postData.permissions

    return response.data // backend ResponseStatus
  } catch (error) {
    this.error = error
    console.error('Failed to save role permissions', error)
    throw error
  } finally {
    this.loading = false
  }
}

  }
})
