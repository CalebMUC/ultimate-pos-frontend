import { defineStore } from 'pinia';
import axios from '../axios';

export const Useuserstore = defineStore('userstore', {
  state: () => ({ 
    AllDetails:[],  
    // permissions: [], 
    // details: [], 
    // name:'',
    // email:'',
    // userid:'',
    // phone:'',
    // role:[],
    // error: [], 
    // success: '', 

    status:'',
    statusMessage:'',
    token:'',
    
  }),

  getters: { 
    // getPermissions: (state) => state.permissions,
    // getDetails: (state) => state.details,
    // getRole:(state) => state.role,
    // getname:(state) => state.name,
    // getemail:(state) => state.email,
    // getuserid:(state) => state.userid,
    // getphone:(state) => state.phone,
    // getError:(state) => state.error,
    // getsucces:(state)=>state.success,

    getAllDetails: (state) => state.AllDetails,
    getStatus:(state) => state.status,
    getMessage:(state) => state.statusMessage,
    getToken:(state) => state.token,
  },

  actions: {  

    async LoginUser(ldata) {
      try { 
 
        const response = await axios.ulogin(ldata);
        this.AllDetails = response; 
        // return response; 
      } catch (error) {
        this.error = error;
        this.success = false;
        throw error; 
      }
    },

    UserDetails(){
        if (this.AllDetails) {

             this.name = this.AllDetails.details.name || [];
             this.userid = this.AllDetails.details.user_id || "";
             this.email = this.AllDetails.details.email || "";
             this.phone = this.AllDetails.details.phone || " ";

             this.token = this.AllDetails.token || "";
             this.success = this.AllDetails.success  || [];

             

        }
    },

   GetUserDetails(token,userid){
     axios.getUserdetails(token,userid)
      .then((response)=> {

        this.permissions = response.permissions;
        this.role = response.roles[0];

        // console.log("permiss", this.permissions);
        console.log("rrroles", this.role);
        // return response;

        
      })
      .catch((error)=>{
        this.error = error.response;   
      })
    },


    GetToken(postData) {
      if (!this.Token) {
        this.error = 'Authentication token not found';
        return;
      }
      axios.generateToken(postData)
      .then((response)=>{
         this.data = response.data;
      })
      .catch((error)=>{
        this.error = error.response;   
      })
    }



  }
})