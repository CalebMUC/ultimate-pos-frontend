import { defineStore } from 'pinia'
import axios from '../axios'

export const usePurchasesStore = defineStore('purchases', {
  state: () => ({
    items: [],
    loading: false,
    error: null,
  }),
    getters: {
    GetOrderItems: (state) => state.items,
  },

  actions: {
    async fetchPurchaseOrderItems(orderId = null) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.getOrderItems(orderId)
        this.items = res.data
      } catch (err) {
        console.error('Failed to fetch purchase order items', err)
        this.error = err
      } finally {
        this.loading = false
      }
    },
  },
})
