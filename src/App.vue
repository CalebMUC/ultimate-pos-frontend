<template>
  <div>
 
    <div>
    <!-- Add a navigation bar if needed -->
    <router-view></router-view>
  </div>
  

  </div>
</template>

<script>
import { RouterView } from 'vue-router'


export default { 

  name: 'App'
  // components: {
  //   Login,
  //   Navbar,
  //   Sidebar
  // },
  // setup() {
  //    //const islogin = ref(false) // Change this to toggle between Login and the Dashboard view
  //     const  islogin =  localStorage.getItem('islogin');

  //   // Debugging: Log the value of 'islogin'
  //   console.log('islogin value:', islogin)

  //   return {
  //     islogin
  //   }
  // }
}
</script>