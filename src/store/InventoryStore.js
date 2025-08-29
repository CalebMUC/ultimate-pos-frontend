import { defineStore } from 'pinia';
import axios from '../axios'

export const UseInventoryStore = defineStore('InventoryStore', {

state: () => ({
    data: [], 
    loading: false, 
    Error: null,
    Response:null,
    searchquery : '',
    searchprod:'',
    searchCateg:''
   }),

    // Add any getters if needed
   getters: {  
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getResponse: (state)=> state.Response,

    // Filter based on the search Term in the store for multiple rows
    filterProducts: (state) => {
      if (!state.searchquery) { 
        return state.data;
      }

      return state.data.filter(item =>
        item.productName.toLowerCase().includes(state.searchquery.toLowerCase()) 
       // ||item.productDescription.toLowerCase().includes(state.searchquery.toLowerCase()) 
        //||item.productType.toLowerCase().includes(state.searchquery.toLowerCase()) 
        // item.productCategory.toString().includes(state.searchTerm.toLowerCase()) 
        // item.group.toString().includes(state.searchTerm.toLowerCase())
      );
    },
  
    //filter product on category selected
    filterProductCategory: (state) => {
      if (!state.searchCateg) { 
        return state.data;
      }

      return state.data.filter(item =>
        item.categoryID === state.searchCateg // Compare both as integers 
      ); },
    },

 


  filterSupplierSupplies: (state) => {
    return state.data.filter(item =>
      item.data.toLowerCase().includes(state.searchSUP.toLowerCase()) 
    );
  },



    actions: {  
//fetch all inventory records
      getallproducts(token){     
           axios.getproduct(token)
              .then(response => {
                  this.data = response.data;
                  // this.loading = false;
              })
              .catch(error => {
                  this.Error=error;
                  // this.loading = false;
              });
          },
         
      //search product from the inventory
        setSearchProduct(term) {
          this.searchquery = term;
        },

    //search products of a certain category    
        setSearchCategory(term) {
          this.searchCateg = term;
        },
 
    //search products from a certain supplier term    
        setSearchSupplierSupplies(term) {
          this.searchSUP = term;
        },
    

     //add new product to the inventory
        AddnewProduct(postData){
          axios.addproduct( postData)
            .then(response => {
              this.Response = response.data
            })
            .catch(error=>{ 
              this.Error=error;
            })
        },
        //update product in inventory
        updateProduct(postData){
          axios.updateproduct( postData)
            .then(response => {
              this.Response = response.data
            })
            .catch(error=>{ 
              this.Error=error;
            })
        },
    

    },
});
