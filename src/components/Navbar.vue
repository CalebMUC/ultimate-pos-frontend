<template>
  <header
    :class="[
      'sticky top-0 z-50 transition-colors duration-300',
      isDarkMode
        ? 'bg-gradient-to-r from-slate-900 to-slate-800 border-b border-slate-700/50 shadow-lg'
        : 'bg-white border-b border-gray-200 shadow-sm'
    ]"
  >
    <div class="px-4 sm:px-6">
      <div class="flex h-16 items-center justify-between gap-3">

        <!-- ── Left: Logo · Toggle · App Name ── -->
        <div class="flex items-center space-x-3 flex-shrink-0">
          <img src="../assets/logo.jpeg" alt="Logo" class="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/40" />
          <button
            @click="toggleSidebar"
            :class="['rounded-lg p-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-inset', btnClass, isDarkMode ? 'focus:ring-white' : 'focus:ring-indigo-500']"
          >
            <span class="sr-only">Toggle sidebar</span>
            <Bars3Icon class="h-5 w-5" />
          </button>
          <h1 :class="['text-base font-bold hidden md:block tracking-wide', isDarkMode ? 'text-white' : 'text-gray-900']">
            {{ appName }}
          </h1>
        </div>

        <!-- ── Centre: Search Bar (desktop) ── -->
        <div class="flex-1 max-w-sm hidden md:flex items-center">
          <div class="relative w-full">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, orders…"
              :class="[
                'w-full rounded-lg pl-9 pr-4 py-1.5 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition',
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 text-gray-200 placeholder-gray-400'
                  : 'bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-400'
              ]"
            />
          </div>
        </div>

        <!-- ── Right: Actions + User ── -->
        <div class="flex items-center space-x-1">

          <!-- Mobile Search Toggle -->
          <button @click="showMobileSearch = !showMobileSearch" :class="['md:hidden', btnClass]">
            <MagnifyingGlassIcon class="h-5 w-5" />
          </button>

          <!-- Dark / Light Mode Toggle -->
          <button
            @click="toggleDarkMode"
            :title="isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'"
            :class="btnClass"
          >
            <SunIcon v-if="isDarkMode" class="h-5 w-5" />
            <MoonIcon v-else class="h-5 w-5" />
          </button>

          <!-- Notifications Bell -->
          <div class="relative">
            <button :class="btnClass" title="Notifications">
              <BellIcon class="h-5 w-5" />
              <span
                v-if="notificationCount > 0"
                class="absolute top-0.5 right-0.5 h-4 w-4 rounded-full bg-red-500 text-[9px] font-bold text-white flex items-center justify-center leading-none"
              >
                {{ notificationCount > 9 ? '9+' : notificationCount }}
              </span>
            </button>
          </div>

          <!-- Divider -->
          <div :class="['h-6 w-px mx-1 hidden sm:block', isDarkMode ? 'bg-slate-600' : 'bg-gray-200']"></div>

          <!-- User Dropdown -->
          <div class="relative" ref="dropdownRef">
            <button
              @click="toggleDropdown"
              id="user-menu-button"
              :class="[
                'flex items-center gap-2 rounded-lg px-2 py-1.5 transition-colors focus:outline-none focus:ring-2',
                isDarkMode
                  ? 'hover:bg-slate-700 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-800'
                  : 'hover:bg-gray-100 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-white'
              ]"
            >
              <!-- Avatar -->
              <div class="relative h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center flex-shrink-0">
                <span class="text-xs font-bold text-white uppercase">{{ userInitials }}</span>
                <span
                  :class="[
                    'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-400 border-2 pulse',
                    isDarkMode ? 'border-slate-800' : 'border-white'
                  ]"
                ></span>
              </div>
              <div class="hidden sm:block text-left min-w-0">
                <p :class="['text-xs font-semibold leading-tight truncate max-w-[96px]', isDarkMode ? 'text-white' : 'text-gray-900']">{{ userName }}</p>
                <p :class="['text-[10px] leading-tight truncate max-w-[96px] capitalize', isDarkMode ? 'text-gray-400' : 'text-gray-500']">{{ userRole }}</p>
              </div>
              <ChevronDownIcon
                :class="[
                  'h-3.5 w-3.5 transition-transform duration-200 hidden sm:block',
                  isDarkMode ? 'text-gray-400' : 'text-gray-500',
                  isOpen ? 'rotate-180' : ''
                ]"
              />
            </button>

            <!-- Dropdown Panel (always light) -->
            <transition
              enter-active-class="transition ease-out duration-100"
              enter-from-class="transform opacity-0 scale-95"
              enter-to-class="transform opacity-100 scale-100"
              leave-active-class="transition ease-in duration-75"
              leave-from-class="transform opacity-100 scale-100"
              leave-to-class="transform opacity-0 scale-95"
            >
              <div
                v-if="isOpen"
                class="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-black/5 divide-y divide-gray-100"
                role="menu"
              >
                <div class="px-4 py-3">
                  <div class="flex items-center gap-3">
                    <div class="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                      <span class="text-sm font-bold text-indigo-600 uppercase">{{ userInitials }}</span>
                    </div>
                    <div class="min-w-0">
                      <p class="text-sm font-semibold text-gray-900 truncate">{{ userName }}</p>
                      <p class="text-xs text-gray-500 truncate">{{ userEmail }}</p>
                      <span class="inline-block mt-0.5 px-1.5 py-0.5 text-[10px] font-medium bg-indigo-50 text-indigo-700 rounded capitalize">
                        {{ userRole }}
                      </span>
                    </div>
                  </div>
                </div>
                <div class="py-1">
                  <a @click="details" class="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer transition-colors" role="menuitem">
                    <UserCircleIcon class="h-4 w-4 text-gray-400 flex-shrink-0" />
                    Account Details
                  </a>
                </div>
                <div class="py-1">
                  <a @click="logout" class="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer transition-colors" role="menuitem">
                    <ArrowRightOnRectangleIcon class="h-4 w-4 text-red-400 flex-shrink-0" />
                    Sign out
                  </a>
                </div>
              </div>
            </transition>
          </div>
        </div>
      </div>

      <!-- Mobile Search Bar (collapsible) -->
      <transition
        enter-active-class="transition ease-out duration-200"
        enter-from-class="opacity-0 -translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-150"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-1"
      >
        <div v-if="showMobileSearch" class="md:hidden pb-3">
          <div class="relative">
            <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Search products, orders…"
              autofocus
              :class="[
                'w-full rounded-lg pl-9 pr-4 py-2 text-sm border focus:outline-none focus:ring-2 focus:ring-indigo-500 transition',
                isDarkMode
                  ? 'bg-slate-700/60 border-slate-600 text-gray-200 placeholder-gray-400'
                  : 'bg-gray-100 border-gray-200 text-gray-800 placeholder-gray-400'
              ]"
            />
          </div>
        </div>
      </transition>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDashboardStore } from '../store/DashboardStore'
import { jwtDecode } from 'jwt-decode'
import {
  Bars3Icon,
  ChevronDownIcon,
  UserCircleIcon,
  ArrowRightOnRectangleIcon,
  BellIcon,
  MagnifyingGlassIcon,
  SunIcon,
  MoonIcon,
} from '@heroicons/vue/24/outline'

const router = useRouter()
const dashboardstore = useDashboardStore()

const isOpen = ref(false)
const isDarkMode = ref(false)
const searchQuery = ref('')
const showMobileSearch = ref(false)
const notificationCount = ref(3)
const dropdownRef = ref(null)

// ── App name from env ────────────────────────────────────────────────────────
const appName = import.meta.env.VITE_APP_NAME || 'Ultimate POS'

// ── Decode user info from JWT ────────────────────────────────────────────────
const getUserFromToken = () => {
  try {
    const token = localStorage.getItem('token')
    if (!token) return { name: 'User', email: '', role: '' }
    const decoded = jwtDecode(token)
    return {
      name:
        decoded['unique_name'] ||
        decoded['name'] ||
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'] ||
        decoded['email'] ||
        'User',
      email:
        decoded['email'] ||
        decoded['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'] ||
        decoded['unique_name'] ||
        '',
      role:
        decoded['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ||
        localStorage.getItem('role') ||
        'user',
    }
  } catch {
    return { name: 'User', email: '', role: localStorage.getItem('role') || 'user' }
  }
}

const userInfo = getUserFromToken()
const userName = computed(() => userInfo.name)
const userEmail = computed(() => userInfo.email)
const userRole = computed(() => userInfo.role)
const userInitials = computed(() => {
  const name = userName.value
  if (!name || name === 'User') return 'U'
  const parts = name.trim().split(/\s+/)
  return parts.length >= 2
    ? `${parts[0][0]}${parts[1][0]}`
    : name.slice(0, 2)
})

// ── Actions ──────────────────────────────────────────────────────────────────
const toggleSidebar = () => dashboardstore.toggleResponsiveSidebar()
const toggleDropdown = () => { isOpen.value = !isOpen.value }
const closeDropdown = () => { isOpen.value = false }
const toggleDarkMode = () => { isDarkMode.value = !isDarkMode.value }

// Reactive button class — updates every element when mode switches
const btnClass = computed(() =>
  isDarkMode.value
    ? 'rounded-lg p-1.5 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors'
    : 'rounded-lg p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors'
)

const handleClickOutside = (event) => {
  if (dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    closeDropdown()
  }
}

const logout = () => {
  closeDropdown()
  localStorage.removeItem('token')
  localStorage.removeItem('isLoggedIn')
  router.push('/login')
}

const details = () => {
  router.push('/account')
  closeDropdown()
}

onMounted(() => document.addEventListener('click', handleClickOutside))
onUnmounted(() => document.removeEventListener('click', handleClickOutside))
</script>

<style scoped>
.pulse {
  animation: pulse-dot 2s ease-in-out infinite;
}

@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.15); }
}
</style>