import { defineStore } from 'pinia'
import axios from '../axios'

export const usePurchaseInvoiceStore = defineStore('PurchaseInvoiceStore', {
  state: () => ({
    invoices: [],
    loading: false,
    error: null,
  }),

  getters: {
    GetInvoices: (state) => state.invoices,
  },

  actions: {
    async fetchInvoices() {
      this.loading = true
      this.error = null
      try {
        const res = await axios.getPurchaseInvoices()
        this.invoices = res.data
      } catch (err) {
        this.error = err?.message || 'Failed to fetch purchase invoices'
        throw err
      } finally {
        this.loading = false
      }
    },

    async addInvoice(invoiceData) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.addPurchaseInvoice(invoiceData)
        await this.fetchInvoices()
        return res.data
      } catch (err) {
        this.error = err?.message || 'Failed to add purchase invoice'
        throw err
      } finally {
        this.loading = false
      }
    },

    async updateInvoice(id, invoiceData) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.updatePurchaseInvoice({ ...invoiceData, invoiceId: id })
        const index = this.invoices.findIndex(i => i.invoiceId === id)
        if (index !== -1) this.invoices[index] = { ...this.invoices[index], ...invoiceData }
        return res.data
      } catch (err) {
        this.error = err?.message || 'Failed to update purchase invoice'
        throw err
      } finally {
        this.loading = false
      }
    },

    async deleteInvoice(id) {
      this.loading = true
      this.error = null
      try {
        await axios.deletePurchaseInvoice(id)
        this.invoices = this.invoices.filter(i => i.invoiceId !== id)
      } catch (err) {
        this.error = err?.message || 'Failed to delete purchase invoice'
        throw err
      } finally {
        this.loading = false
      }
    },
  },
})
