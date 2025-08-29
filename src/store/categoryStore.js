import { defineStore } from 'pinia';
import axios from '../axios';


export const useCategoryStore = defineStore('categoryStore', {
state: () => ({
    data: [], // Array to store API data

    loading: false,
    error: null,
    Response:null,
    token : localStorage.getItem('token')
  }),



getters: {
    // Add any getters if needed 
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getResponse: (state)=> state.Response,
  },

   actions: { 

    fetchCategories(token){     
      this.loading = true;
      this.error = null;   
          axios.getcategory(token)
            .then(response => {
                this.data = response.data;
            })
            .catch(error => {
                this.error=error;
            });
        },

        AddnewCategory(postData){
          axios.addcategories( postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        },

         updateCategory(postData){
          axios.editCategories( postData)
            .then(response => {
              this.Response = response;
            })
            .catch(error=>{ 
              this.error=error;
            })
        },
    
       
      setSearchquery(query) {
          this.searchquery.push(query);
      }    
  },



});
