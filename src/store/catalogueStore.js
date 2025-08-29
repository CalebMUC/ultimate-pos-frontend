import { defineStore } from 'pinia';
import axios from '../axios';


export const useCatalogueStore = defineStore('catalogueStore', {
state: () => ({
    data: [], // Array to store API data

    loading: false,
    error: null,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error
  },

   actions: { 

    fetchCatalogue(token) {
      this.loading = true;
      axios.getcatalogue(token)
           .then(response=> {
            this.data = response;
            this.loading = false;
           })
           .catch(error=>{
            this.error=error
            this.loading = false;
           })
  
    },


   }


});
