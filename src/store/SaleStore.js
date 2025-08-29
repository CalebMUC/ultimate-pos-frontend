import { defineStore } from 'pinia';
import axios from '../axios';


export const useSaleStore = defineStore('SaleStore', {
state: () => ({
    data: [], // Array to store API data
    successmsg:null,
    success: false,
    error: null,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    getsuccess: (state) => state.success,
    getError: (state) => state.error
  },

   actions: { 

    Addtransaction(postdata){     
      this.loading = true;
      this.error = null;   
          axios.addtransaction(postdata)
            .then(response => {
                this.data = response.data;
                this.successmsg = response.data.statusMessage
                this.error = response.data.status
            })
            .catch(error => {
                this.error=error;
                this.successmsg = response.data.statusMessage;
                this.error = response.data.status

            });
        },
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});