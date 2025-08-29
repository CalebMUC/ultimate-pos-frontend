<template>
  <div class="min-h-screen flex flex-col md:flex-row bg-gray-50">
    <!-- Left: Image with Text Overlay -->
    <div class="w-full md:w-1/2 h-64 md:h-screen relative">
      <img 
        :src="backgroundImageLeft" 
        alt="Business communication illustration" 
        class="w-full h-full object-cover"
        loading="lazy"
      />
      <div class="absolute inset-0 flex flex-col items-center justify-center text-center px-5 bg-black/50 backdrop-blur-sm transition-all duration-300">
        <div class="max-w-md">
          <h1 class="text-2xl md:text-4xl font-bold mb-4 text-white animate-fade-in">
            Smarter Sales Start Here
          </h1>
          <p class="text-base md:text-lg text-gray-100 opacity-90">
            Serving Smart Transactions Daily.
          </p>
        </div>
      </div>
    </div>

    <!-- Right: Login Form -->
    <div class="w-full md:w-1/2 flex items-center justify-center p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100">
      <div class="w-full max-w-md bg-white rounded-xl shadow-sm p-6 md:p-8 space-y-6 transition-all duration-300 hover:shadow-md"> 

        <!-- <div v-if="errorState.message" class="bg-red-100 text-red-800 p-2 rounded">
    Error {{ errorState.code }}: {{ errorState.message }}
  </div> -->

        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-1">
            Welcome back!
          </h2>
          <p class="text-gray-500 text-sm">
            Please enter your credentials to continue
          </p>
        </div>

        <form @submit.prevent="loginuser($event)" class="space-y-5">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
              Email Address
            </label>
            <div class="relative">
              <input
                id="email"
                v-model="email"
                type="email"
                placeholder="you@example.com"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                :class="{ 'border-red-500': emailError }"
                required
                aria-describedby="email-error"
                @input="clearError('email')"
              />
              <span class="absolute right-3 top-3 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </div>
            <p v-if="emailError" id="email-error" class="mt-1 text-sm text-red-600">
              {{ emailError }}
            </p>
          </div>

          <!-- Password -->
          <div>
            <div class="flex justify-between items-center mb-1">
              <label for="password" class="block text-sm font-medium text-gray-700">
                Password
              </label>
              <a href="#" class="text-xs text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded">
                Forgot password?
              </a>
            </div>
            <div class="relative">
              <input
                id="password"
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                :class="{ 'border-red-500': passwordError }"
                required
                aria-describedby="password-error"
                @input="clearError('password')"
              />
              <button
                type="button"
                class="absolute right-3 top-3 text-gray-400 hover:text-gray-600 focus:outline-none"
                @click="showPassword = !showPassword"
                :aria-label="showPassword ? 'Hide password' : 'Show password'"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" v-if="showPassword" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" v-else d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </button>
            </div>
            <p v-if="passwordError" id="password-error" class="mt-1 text-sm text-red-600">
              {{ passwordError }}
            </p>
          </div>

          <!-- Environment Dropdown -->
          <div class="relative" ref="dropdown">
            <label for="environment" class="block text-sm font-medium text-gray-700 mb-1">
              Environment
            </label>
            <div class="relative">
              <button
                id="environment"
                type="button"
                @click="toggleDropdown"
                :aria-expanded="isOpen"
                class="w-full px-4 py-3 border border-gray-300 rounded-lg text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                :class="{ 'border-blue-500': isOpen, 'border-red-500': envError }"
              >
                <span :class="{ 'text-gray-400': !selected }">{{ selected || 'Select an environment' }}</span>
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 transition-transform duration-200" :class="{ 'transform rotate-180': isOpen }" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
                </svg>
              </button>
              <transition
                enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95"
                enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75"
                leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95"
              >
                <div 
                  v-show="isOpen"
                  class="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden"
                >
                  <ul class="py-1 max-h-60 overflow-auto">
                    <li
                      v-for="option in options"
                      :key="option.value"
                      @click="selectOption(option)"
                      class="px-4 py-2 hover:bg-gray-50 cursor-pointer transition"
                      :class="{ 'bg-blue-50': selected === option.label }"
                      role="option"
                      :aria-selected="selected === option.label"
                    >
                      {{ option.label }}
                    </li>
                  </ul>
                </div>
              </transition>
            </div>
            <p v-if="envError" id="env-error" class="mt-1 text-sm text-red-600">
              {{ envError }}
            </p>
          </div>

          <!-- Remember me -->
          <div class="flex items-center">
            <input
              id="remember-me"
              v-model="remember"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">
              Remember me
            </label>
          </div>

          <!-- Submit button -->
          <div>
            <button
              type="submit"
              class="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-300"
              :disabled="isLoading"
              :aria-busy="isLoading"
            >
              <span v-if="!isLoading">Sign In</span>
              <span v-else class="flex items-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            </button>
          </div>
        </form>

        <div class="text-center text-sm text-gray-500">
          Don't have an account?
          <button 
            @click="showRegister" 
            class="font-medium text-blue-600 hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-blue-500 rounded"
          >
            Sign up
          </button>
        </div>
      </div>
    </div>
  </div>
</template>



<script>
import { ref, computed, onMounted, onBeforeUnmount, nextTick,watch } from 'vue'
import Swal from 'sweetalert2';
import {useRouter } from 'vue-router'
import axios from '../axios'
import Register from './Register.vue';
import {Useuserstore} from '../store/userstore';
import links from '../assets/Enviroment.json';
import backgroundImageLeft from '../assets/bgLogin.jpg'
import backgroundImageRight from '../assets/bgLogin.jpg'
import { errorState } from '../store/ErrorState';

export default {
  components: {
    Register
  },
  setup() {
    const router = useRouter(); 
    const email = ref('');
    const password = ref('');
    const remember = ref(false);
    const isOpen = ref(false);
    const enviroment = ref('');
    const options = [];
    const dropdown = ref(null);
    const selected = ref('');
     const showPassword = ref(false)
    const status = ref('');
    const token = ref('');
    const message = ref('')
     const emailError = ref('')
    const passwordError = ref('')
    const envError = ref('')



    const LoginUserStore = Useuserstore();

    const Loginresponse = computed(() => LoginUserStore.getAllDetails); 


    watch(() => errorState.message, (newVal) => {
      if (newVal) {
        ErrorMessage(`Error: ${errorState.code} - ${newVal}`)
      }
    })
          
      watch(Loginresponse, (newValue) => {
           status.value = newValue.status;
           token.value = newValue.token;
           message.value = newValue.message;
            if(status.value == '200') {
              localStorage.setItem('isLoggedIn', true); 
              localStorage.setItem('token', newValue.token);
              DisplayMessage("success", "Welcome back!");
              router.push('/');
            }
            else{
              const errorMsg =  message.value || 'Login failed. Please try again.'
            ErrorMessage(errorMsg)
            }
        }); 


 
  const showRegister =()=>{
     router.push('/register')
  }  


 const  loginuser = async (event) => {
   if(validateDetails()){
      event.preventDefault();   

       const authdata = { email: email.value, password: password.value, env: enviroment.value };
        
      try {  
          LoginUserStore.LoginUser(authdata);
       } 
       catch(error) {
         ErrorMessage(error)
       }
    }
  }

  
    const validateDetails = () => {
      let isValid = true
      
      // Reset errors
      emailError.value = ''
      passwordError.value = ''
      envError.value = ''
      
      // Email validation
      if (email.value.trim() === '') {
        emailError.value = 'Email is required'
        isValid = false
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = 'Please enter a valid email address'
        isValid = false
      }
      
      // Password validation
      if (password.value.trim() === '') {
        passwordError.value = 'Password is required'
        isValid = false
      } else if (password.value.length < 6) {
        passwordError.value = 'Password must be at least 6 characters'
        isValid = false
      }
      
      // Environment validation
      if (!selected.value) {
        envError.value = 'Please select an environment'
        isValid = false
      }
      
      return isValid
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

    const ErrorMessage = (error) => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error,
        confirmButtonColor: '#3b82f6',
      })
    }


      const clearError = (field) => {
      if (field === 'email') emailError.value = ''
      if (field === 'password') passwordError.value = ''
    }



    
 

  const toggleDropdown = () => {
    isOpen.value = !isOpen.value
  }

  const selectOption = (option) => {
    selected.value = option.label 
    enviroment.value = option.url
    isOpen.value = false
  }

  const handleClickOutside = (e) => {
    if (dropdown.value && !dropdown.value.contains(e.target)) {
      isOpen.value = false
    }
  }

  onMounted(async () => {
    await nextTick()
    document.addEventListener('click', handleClickOutside)
    links.forEach(link => {
       options.push(link);
    });
  })

  onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside)
  })




    return {
      email,
      password,
      showRegister,
      loginuser,
      LoginUserStore,
      backgroundImageLeft,
      backgroundImageRight,
      showPassword,
      toggleDropdown,
      handleClickOutside,
      isOpen,
      dropdown,
      options,
      selectOption,
      selected,
      enviroment,
      Loginresponse,
      status,
      token,
      message,
      clearError,
      errorState,
     
    };
  }
};
</script>



<style>
/* Animation for the welcome text */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fadeIn 0.6s ease-out forwards;
}

/* Custom scrollbar for dropdown */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Focus styles for accessibility */
*:focus-visible {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

/* Transition for smoother hover effects */
.transition {
  transition-property: color, background-color, border-color, transform, box-shadow;
  transition-duration: 200ms;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
</style>