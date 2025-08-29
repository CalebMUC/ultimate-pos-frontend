<template>
  <header class="bg-gradient-to-r from-slate-800 to-slate-700 shadow-lg">
    <div class="mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Left side - Logo and menu toggle -->
        <div class="flex items-center space-x-4">
          <div class="flex-shrink-0">
            <img src="../assets/logo.jpeg" alt="Company Logo" class="h-10 w-10 rounded-full object-cover">
          </div>
          <button @click="toggleSidebar" class="rounded-md p-1 text-gray-300 hover:bg-slate-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white">
            <span class="sr-only">Toggle sidebar</span>
            <Bars3Icon class="h-6 w-6" />
          </button>
          <h1 class="text-xl font-bold text-white hidden md:block">Ultimate POS</h1>
        </div>

        <!-- Right side - User dropdown -->
        <div class="relative ml-4">
          <div>
            <button @click="toggleDropdown" class="flex max-w-xs items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800" id="user-menu-button">
              <span class="sr-only">Open user menu</span>
              <div class="flex items-center">
                <span class="ml-3 text-sm font-medium text-white">felix</span>
                <ChevronDownIcon :class="{'rotate-180': isOpen}" class="ml-1 h-4 w-4 text-white transition-transform duration-200" />
              </div>
              <div class="relative ml-2 h-8 w-8 rounded-full bg-slate-600 flex items-center justify-center">
                <span class="text-sm font-medium text-white">F</span>
                <span class="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-800"></span>
              </div>
            </button>
          </div>

          <!-- Dropdown menu -->
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div v-if="isOpen" class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button">
              <div class="px-4 py-3 border-b border-gray-100">
                <p class="text-sm font-medium">Signed in as</p>
                <p class="truncate text-sm text-gray-600">felix@example.com</p>
              </div>
              <a @click="details" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                <UserCircleIcon class="mr-3 h-5 w-5 text-gray-500" />
                Account Details
              </a>
              <a @click="logout" class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem">
                <ArrowRightOnRectangleIcon class="mr-3 h-5 w-5 text-gray-500" />
                Logout
              </a>
            </div>
          </transition>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../store/DashboardStore'
import { 
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/vue/24/outline'

const router = useRouter()
const dashboardstore = useDashboardStore()
const isOpen = ref(false)

const toggleSidebar = () => {
  dashboardstore.toggleResponsiveSidebar()
}

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const closeDropdown = () => {
  isOpen.value = false
}

const handleClickOutside = (event) => {
  if (!event.target.closest('.relative')) {
    closeDropdown()
  }
}

const logout = () => {
  router.push('/login')
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
}

const details = () => {
  router.push('/account')
  closeDropdown()
}

// Add event listeners for click outside
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
/* Custom scrollbar for dropdown */
.dropdown-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f1f5f9;
}

.dropdown-scroll::-webkit-scrollbar {
  width: 8px;
}

.dropdown-scroll::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.dropdown-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}

/* Animation for status dot */
.pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}
</style>