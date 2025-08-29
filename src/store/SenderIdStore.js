

import { defineStore } from 'pinia';
import axios from '../axios';

export const usesenderstore = defineStore('senderstore', {
  state: () => ({
    data: [], // Array to store API data
    loading: false, // Flag to indicate loading state
    error: null, // To store any error that occurs during data fetching
    Token: localStorage.getItem('token') || '', // Fallback to empty string if no token is found
    searchTerm: '', // Search term from component
  }),

  getters: {
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    
    // Filter based on the searchTerm in the store for multiple rows
    filteredSenderid: (state) => {
      if (!state.searchTerm) {
        return state.data;
      }

      return state.data.filter(item =>
        item.value.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.purpose.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.status.toLowerCase().includes(state.searchTerm.toLowerCase()) 
        // item.createdon.includes(state.searchTerm) 

      );
    },
  },

  actions: {
   //  fetchSenderID() {
   //    // Check if the token exists before making the request
   //    if (!this.Token) {
   //      this.error = 'Authentication token not found';
   //      return;
   //    }

   //    this.loading = true;
   //    this.error = null; // Reset error state

   //    axios.getAllSenderIDs(this.Token)
   //      .then(response => {
   //        this.data = response.data; // Store the API data in state
   //      })
   //      .catch(error => {
   //        this.error = error.response?.data?.message || 'An error occurred while fetching data';
   //      })
   //      .finally(() => {
   //        this.loading = false;
   //      });
   //  },

    setSearchTerm(term) {
      this.searchTerm = term;
      console.log(term);
    }
  }
});

