import { defineStore } from 'pinia';
import axios from '../axios';


export const useSuppliersStore = defineStore('SuppliersStore', {
state: () => ({
    data: [], // Array to store API data 
    success:' ',
    error:' ',
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    getsuccess: (state) => state.success,
    getError: (state) => state.error,

    filterSuppliers: (state) => {
      if (!state.searchprod) { 
        return state.data;
      }

      return state.data.filter(item =>
        item.supplierId.toLowerCase().includes(state.searchprod.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(state.searchprod.toLowerCase()) ||
        item.supplierName.toLowerCase().includes(state.searchprod.toLowerCase()) ||
        item.supplierType.toLowerCase().includes(state.searchprod.toLowerCase()) 
        // item.productCategory.toString().includes(state.searchTerm.toLowerCase()) 
        // item.group.toString().includes(state.searchTerm.toLowerCase())
      );
    },

  },

   actions: { 



        getallSupliers(){     
          axios.getsupplier()
            .then(response => {
                this.data = response;
                this.loading = false;
            })
            .catch(error => {
                this.error=error;
                this.loading = false;
            });
        },

        setSearchSupplier(term) {
          this.searchprod = term;
        },
      
      
   Addsuplier(postdata) {
      axios.addsupplier(postdata)
        .then(response => {
           this.success = "added successfully";
        })
        .catch(error => {
         this.error=error;
     });
   }, 
    updateSupplier(postdata) {
      axios.updatesupplier(postdata)
        .then(response => {
           this.success = "Supplier Edited successfully";
        })
        .catch(error => {
         this.error=error;
     });
   }   

   

  },



});
