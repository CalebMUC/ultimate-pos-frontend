import { defineStore } from 'pinia';
import axios from '../axios';


export const useTransactionStore = defineStore('TransactionStore', {
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
    getError: (state) => state.error,

    filterTransactions: (state) => {
        if (!state.searchquery) { 
        // console.log("data is:",state.data);
          return state.data;
        }
  
        return state.data.filter(item =>
          item.productName.toLowerCase().includes(state.searchquery.toLowerCase()) ||
          item.productDescription.toLowerCase().includes(state.searchquery.toLowerCase()) ||
          item.productType.toLowerCase().includes(state.searchquery.toLowerCase()) 
       
        );
      }

  }, 



   actions: { 

      fetchTransactions(){     
          this.loading = true;
          this.error = null;   
              axios.getTransactions()
                .then(response => {
                    // this.data.push(response.products.data.data); 
                    console.log(this.data);
                    this.data = response.data;
                    this.loading = false;
                })
                .catch(error => {
                    this.error=error;
                    this.loading = false;
                });
            },

         
   
        setSearchTrasaction(term) {
          this.searchprod = term;
          // console.log(term);
        },

        // setSearchCategory(term) {
        //   this.searchCateg = term;
        //   // console.log(term);
        // },
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});