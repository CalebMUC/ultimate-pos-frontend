<template>
  <section class="flex-1 p-2 sm:p-6 md:p-7 w-full md:w-3/4">
    <!-- Header -->
        <div class="flex flex-col md:flex-row justify-between items-start md:items-center gap-1 md:gap-2">
        <h1 class="text-xl md:text-2xl font-semibold">Business Details</h1>
        <button class="bg-orange-500 text-white px-2 py-2 rounded-lg w-1/2 md:w-auto text-center">
            Update Details
        </button>
        </div>


    <!-- Subtext -->
    <p class="text-gray-500 mt-2 text-sm sm:text-base">
      Manage your Business information, here
    </p>

    <!-- Info Cards -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6">
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Business Name</p>
        <p class="text-base sm:text-lg font-semibold">{{ name }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Industry/Nature of Business</p>
        <p class="text-base sm:text-lg font-semibold">{{ phone }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Physical Address</p>
        <p class="text-base sm:text-lg font-semibold">{{ email }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Phone Number</p>
        <p class="text-base sm:text-lg font-semibold">{{ userid }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">KRA PIN</p>
        <p class="text-base sm:text-lg font-semibold">{{ email }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Number of Employees</p>
        <p class="text-base sm:text-lg font-semibold">{{ userid }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Mpesa Till</p>
        <p class="text-base sm:text-lg font-semibold">{{ email }}</p>
      </div>
      <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Bank Account No</p>
        <p class="text-base sm:text-lg font-semibold">{{ userid }}</p>
      </div>
      <div class="col-span-1 sm:col-span-2 bg-white p-4 sm:p-6 shadow-md rounded-lg">
        <p class="text-gray-500 text-sm">Business Email</p>
        <p class="text-base sm:text-lg font-semibold">ikakodesign@gmail.com</p>
      </div>
    </div>
  </section>
</template>

<script>
import { onMounted, computed, watch, ref } from 'vue';
import { useAccountStore } from '../../store/AccountStore';
import Swal from 'sweetalert2'; 
import { errorState } from '../../store/ErrorState';
export default {
  setup() { 
    const acountStore  = useAccountStore();


           const data = computed(() => acountStore.getBusinessDetails);  

      onMounted(()=>{ 
        let token = localStorage.getItem('token');
        acountStore.fetchBusinessDetails(token);
      });




      watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   ErrorMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 

      const ErrorMessage = (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#3b82f6',
      })
    }
    
     const DisplayMessage = (icon, message) => {
      Swal.fire({
        position: 'center',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
      })
    }

    return {

      data,
      acountStore,
      DisplayMessage,
      ErrorMessage
    };
  }
};
</script>
