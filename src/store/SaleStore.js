import { defineStore } from 'pinia';
import axios from '../axios';


export const useSaleStore = defineStore('SaleStore', {
state: () => ({
    data: [], // Array to store API data
    successmsg:null,
    success: false,
    error: null,
    loading : false,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    getsuccess: (state) => state.success,
    getError: (state) => state.error,
    getSuccessMsg: (state) => state.successmsg
  },

   actions: { 

   Addtransaction(postdata) {     
      this.loading = true;
      this.error = null;

      axios.addtransaction(postdata)
        .then(response => {
          this.data = response.data;
          this.successmsg = response.data.statusMessage || "Transaction Processed Successfully";
          this.success = response.data.status === 200; // ✅ Only true if backend says 200
          this.error = null; // ✅ Clear error
        })
        .catch(error => {
          this.success = false;
          this.successmsg = error.response?.data?.statusMessage || "Transaction Failed";
          this.error = error.response?.data || error.message; // ✅ Assign actual error
        })
        .finally(() => {
          this.loading = false;
        });
    },

       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});