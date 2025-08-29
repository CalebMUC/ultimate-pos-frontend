import { defineStore } from 'pinia';
import axios from '../axios';
import SendSms from '../Views/SendSms.vue';

export const useMessageStore = defineStore('MessageStore', {
  state: () => ({
    data: [], // Array to store API data
    // ContactList: [],
    // Pnumbers:[],
    loading: false, // Flag to indicate loading state
    error: null, // To store any error that occurs during data fetching
    success:null,
    Token: localStorage.getItem('token') || '' 
  }),

  getters: {
    getData: (state) => state.data,
    isLoading: (state) => state.loading,
    getError: (state) => state.error,
    getsuccss:(state)=>state.success,

        // Filter based on the searchTerm in the store for multiple rows
        filteredMessage: (state) => {
          if (!state.searchTerm) {
            return state.data;
          }
    
          return state.data.filter(item =>
            item.header.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            item.messageId.toLowerCase().includes(state.searchTerm.toLowerCase()) ||
            item.number.toString().includes(state.searchTerm.toLowerCase())   ||
            item.date.toString().includes(state.searchTerm.toLowerCase())   
            // item.number.toString().includes(state.searchTerm.toLowerCase())   ||

          );
        },
  },

  actions: {  
      //fetch all contact groups
      fetchMessages() {
          axios.getSentMessages() 
            .then(response => {
              this.data = response.data.messages;       
            })
            .catch(error => {
              this.error = error.response?.data?.message || 'An error occurred while fetching data';
            })
            .finally(() => {
              this.loading = false;
            });
    },

    SendSms(payload,token) {
          axios.AddNotification(payload,token) 
            .then(response => {
              this.data = response.data.messages;     
            })
            .catch(error => {
              this.error = error.response?.data?.message || 'An error occurred while sending sms ';
            })
            .finally(() => {
              this.loading = false;
            });
    },


   //get individual group contact list
    // fetchContactList(name) {  //group
    //     axios.getContactList(name, this.Token)
    //       .then(response => {
    //         this. ContactList = response.data;
    //       })
    //       .catch(error => {
    //         // console.log(error);
    //       })

    // },

    //update contact group
    // UpdateContactGroup(id,updateData) {
    //    axios.editContactGroup(this.Token,id, updateData)
    //      .then((response)=> {
    //          return response;
    //      })
    //      .catch((error)=>{
    //        ;return error;    
    //      })

    // },

    // //add new contact group
    // AddNewContactGroup(postData) { 
    //   axios.addContactGroup(this.Token, postData)
    //     .then((response) => { 
    //         if(response == "200"){
    //           this.success = "contact group added successfully"
    //         }
    //         else{
    //           this.error = response;
    //         }
    //       // console.log(response);
    //       // closeModal(); // Close the modal after success
    //       // showSuccessAlert(); //display alert
    //       // contGroupStore.fetchContactGroup(); //refresh display
    //     })
    //     .catch((error) => {
    //       // showErrorAlert();
    //     });

    // },

     //search contact groups
    setSearchTerm(term) {
      this.searchTerm = term;
      console.log(term);

    }

  }
});


