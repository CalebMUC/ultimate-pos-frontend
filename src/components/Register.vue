<template>

<section  class="bg-white dark:bg-gray-900">

   <div class="h-full bg-white mt-5 mb-3">
           <h2 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl text-center dark:text-white">
             Welcome to ultimate pos
           </h2>
         </div>

         <div class="w-1/2 mt-9 mx-auto border border-gray-200  px-3 rounded-md  bg-white">

    
          <div class=" md:space-y-6 sm:p-8">
              <h3 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center"> Create an account </h3>
               
              <form class=" md:space-y-6" action="#">

                  <div>
                      <label for="username" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Username</label>
                      <input v-model="Username"  type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
               
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input  v-model="Email" type="email" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="">
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input  v-model="Password"  type="password"  placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div>

                  <!-- <div>
                      <label for="confirm-password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required="">
                  </div> -->
               

         <!-- <div>
           <label for="options" class="w-full text-sm">Select User Role </label>
          <select v-model="userRole"  class="w-full rounded-lg border border-gray-300  p-3 text-sm shadow-sm focus:border-gray-300  text-black bg-white ">
            <option value="" disabled selected></option>-
          
            <option v-for="option in options" :key="option.value" :value="option.value"> {{ option.label }}</option>
          </select> 
        </div> -->

                

         <div class="flex items-center h-5">
            <input id="terms" aria-describedby="terms" type="checkbox" class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required="">
            <label for="terms" class=" ml-3 text-sm  font-light text-gray-500 dark:text-gray-300">I accept the <a class="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
         </div>
         <div class="flex items-center h-5">
          <a @click="uregister" class="w-3/4 text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium  
            rounded-lg text-sm px-5 py-2.5  dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create an account</a>
         </div>

         <div class="text-sm font-medium text-gray-500 dark:text-gray-300"> Already have an account?  
             <span @click="showLogin" class="text-blue-700 hover:underline dark:text-blue-500">Login here</span>
         </div>
                
      </form>
      </div>
   </div>
  <!-- </div> -->
</section>

</template>

<script>
import { useRouter } from 'vue-router';
import {ref, watch}  from 'vue'
import axios from '../axios'

export default{
setup() { 

   const router = useRouter();
   const Email = ref('');
   const Username = ref('');
   const Password = ref('');
   const userRole = ref('');


   // const postData =   {
   //       userName: Username.value,
   //       email:    Email.value,
   //       password: Password.value,

   //       role:"admin",
   //       operatorID: "felo",
   //       reEnterPassword: "est"
   //    }
         
   const uregister =() => {   
   //   console.log(postData);    
      axios.register({
         userName: Username.value,
         email:    Email.value,
         password: Password.value,

         role:"admin",
         operatorID: "felo",
         reEnterPassword: "est"
      })
       .then(response => {
         // const token = response.token;
         // const name = response.username;
         // const user_id = response.user.id;
         // const role = response.role
           console.log(response);
           router.push('/login')
      })
    .catch(error => {
        console.log(error);
     });
   } 

   const showLogin =() => { 
      router.push('/login'); 
   }

   return {
      showLogin,
      uregister,
      
      Email,
      Password,
      Username,
      userRole
   }

}
}

</script>