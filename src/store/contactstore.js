



import { defineStore } from 'pinia';
import axios from '../axios';

export const usecontactstore = defineStore('contactstore', {
  state: () => ({
    data: [], // Array to store API data
    templates:[],
    response:[],
    error: [], // To store any error that occurs during data fetching 
    success: [], //to store success messages
    Token: localStorage.getItem('token') || '', // Fallback to empty string if no token is found
    searchTerm: '', // Search term from component
  }),

  getters: {
    getData: (state) => state.data,
    getTemplate: (state) => state.templates,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getsucces:(state)=>state.success,
    getResponse: (state) => state.response,

    
    // Filter based on the searchTerm in the store for multiple rows
    filteredContacts: (state) => {
      if (!state.searchTerm) {
        return state.data;
      }

      return state.data.filter(item =>
        item.mobile.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.name.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
        item.groupName.toLowerCase().includes(state.searchTerm.toLowerCase() ||
        item.status.toString().includes(state.searchTerm.toLowerCase()) 
         )
      );
    },
  },

  actions: {
    fetchContacts(token) {

      axios.getcontacts(token)
        .then(response => { 
          console.log(response);
          this.data = response; // Store the API data in state
        })
        .catch(error => {
          this.error = error.response?.data?.message || 'An error occurred while fetching data';
        })
        .finally(() => {
          this.loading = false;
        });
    }, 

   fetchTemplates(token) { 
    axios.getTemplates(token)
    .then(response => { 
      console.log(response);
      this.templates = response; // Store the API data in state
    })
    .catch(error => {
      this.error = error.response?.data?.message || 'An error occurred while fetching data';
    })
    .finally(() => {
      this.loading = false;
    });
}, 

     //add new template
     AddNewTemplate(postData,token) {
      axios.addsmsTemplate(postData,token)
      .then((response) => { 
        console.log(response);
        console.log(response.status);
        if(response.status == '200'){
          this.success = response.data;
          }
          this.success =  response.data;
      })
      .catch((error) => {
        this.success = error;   
      });
     },
    
    


    //add new contact group
    AddNewContacts(postData,token) { 
      axios.addcontact(postData,token)
        .then((response) => { 
          if(response.status == '200'){
            this.success = response.data;
            }
            this.success =  response.data;
        })
        .catch((error) => {
          this.success = error;   
        });
    },

  EditContactGroup(updatepost) {
    axios.editContactGroup(this.Token, updatepost)
      .then((response) => {
        console.log(response);
        console.log(response.status);
        if(response.status == '200'){
          this.success = response.data;
          }
          this.success =  response.data;
       })
      .catch((error)=>{
        this.success = error;  
      })

  },

    setSearchTerm(term) {
      this.searchTerm = term;
      console.log(term);
    }
  }
});

