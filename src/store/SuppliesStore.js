import { defineStore } from 'pinia';
import axios from '../axios';
import {UseInventoryStore} from '../store/InventoryStore'
import { useSuppliersStore } from '../store/SuppliersStore';


export const useSuppliesStore = defineStore('SuppliesStore', {
state: () => ({
    data: [], // Array to store API data
    supplier:[],
    success:' ',
    error :' ',
    searchSUP:'',
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed
    getData: (state) => state.data,
    getsuccess: (state) => state.success,
    getError: (state) => state.error,
    getSupplier: (state) => state.supplier,



        //filter one specific supplier
    filtersuppliers: (state) => {
    
      return state.supplier.filter(item =>
        item.supplierId.toLowerCase().includes(state.searchSUP.toLowerCase()) 
      );
    },

   



    filterSupplies: (state) => {
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

    getSupllier(){
      axios.getsupplier()
      .then(response => {
          this.supplier = response;
          this.loading = false;
      })
      .catch(error => {
          this.error=error;
          this.loading = false;
      });
    },

      getSupplies(supplierid){     
       axios.getsupplies(supplierid)
          .then(response => {
              this.data = response;
              this.loading = false;
           })
          .catch(error => {
              this.error=error;
              this.loading = false;
          });
      }, 

      getSupplierTransactions (supplierid){     
        axios.getSupplierTransactions(supplierid)
           .then(response => {
               this.data = response;
               this.loading = false;
            })
           .catch(error => {
               this.error=error;
               this.loading = false;
           });
       }, 




        // setSearchSupplier(term) {
        //   this.searchprod = term;
        //   // console.log(term);
        // },
      
      
   Addsuplies(postdata) {
      axios.addsupplier(postdata)
        .then(response => {
           this.success = "added successfully";
        })
        .catch(error => {
         this.error=error;
     });
   }   ,

   setSearchSupplier(term) {
      this.searchSUP = term;
    },


   

  },



});
