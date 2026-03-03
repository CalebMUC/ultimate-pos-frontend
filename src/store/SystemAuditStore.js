import { defineStore } from 'pinia'
import axios from '../axios'

export const useSystemAuditStore = defineStore('SystemAuditStore', {
  state: () => ({
    logs: [],
    loading: false,
    error: null,
  }),

  getters: {
    GetLogs: (state) => state.logs,
  },

  actions: {
    async fetchAuditLogs(filters = {}) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.getAuditLogs(filters)
        this.logs = res.data
      } catch (err) {
        this.error = err?.message || 'Failed to fetch audit logs'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
