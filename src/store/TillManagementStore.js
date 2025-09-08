import { defineStore } from 'pinia'
import axios from '../axios'

export const useTillManagementStore = defineStore('TillManagementStore', {
  state: () => ({
    tills: [],             // list of all tills
    tillsUnderReview: [],  // tills waiting for supervision
    currentTill: null,     // single till details
    loading: false,
    error: null
  }),

  getters: {
    GetTills: (state) => state.tills,
    GetCurrentTill: (state) => state.currentTill,
    GetTillsUnderReview: (state) => state.tillsUnderReview
  },

  actions: {
    // 🔹 Add Till
    async AddTill(tillData) {
      this.loading = true
      try {
        const response = await axios.AddTill(tillData)
        this.tills.push(response.data)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to add till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Update Till
    async UpdateTill(tillData) {
      this.loading = true
      try {
        const response = await axios.UpdateTill(tillData)
        // update locally
        const index = this.tills.findIndex(t => t.tillId === tillData.tillId)
        if (index !== -1) this.tills[index] = { ...this.tills[index], ...tillData }
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to update till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Open Till
    async OpenTill(openTillDto) {
      this.loading = true
      try {
        const response = await axios.OpenTill(openTillDto)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to open till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Delete Till
    async DeleteTill(tillId) {
      this.loading = true
      try {
        const response = await axios.DeleteTill(tillId)
        this.tills = this.tills.filter(t => t.tillId !== tillId)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to delete till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Get Till (single or all)
    async GetTill(payload) {
      this.loading = true
      try {
        const response = await axios.GetTill(payload)
        this.currentTill = response.data
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to fetch till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Assign Till
    async AssignTill(assignTillDto) {
      this.loading = true
      try {
        const response = await axios.AssignTill(assignTillDto)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to assign till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Submit Closure
    async SubmitClosure(closureDto) {
      this.loading = true
      try {
        const response = await axios.SubmitClosure(closureDto)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to submit till closure', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Supervise Till
    async SuperviseTill(approveTillDto) {
      this.loading = true
      try {
        const response = await axios.SuperviseTill(approveTillDto)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to supervise till', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Get Tills Under Review
    async GetTillsUnderReview() {
      this.loading = true
      try {
        const response = await axios.GetTillsUnderReview()
        this.tillsUnderReview = response.data
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to fetch tills under review', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // 🔹 Close Till
    async CloseTill(closeTillDto) {
      this.loading = true
      try {
        const response = await axios.CloseTill(closeTillDto)
        return response.data
      } catch (error) {
        this.error = error
        console.error('Failed to close till', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
