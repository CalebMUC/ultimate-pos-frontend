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

    Addtransaction(postdata){     
      this.loading = true;
      this.error = null;   
          axios.addtransaction(postdata)
            .then(response => {
                this.data = response.data;
                this.successmsg = response.data.statusMessage || "Transaction Processed Successful"
                this.success = true;
                this.error = response.data.status
            })
            .catch(error => {
                this.error=error.response?.data || error.message;
                this.successmsg = response.data.statusMessage || "Transaction Failed";
                this.success = false;
                //this.error = response.data.status

            });
        },
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});