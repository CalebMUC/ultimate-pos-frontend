<template>
  <aside 
    v-if="showSidebar"
    class="flex h-full flex-col justify-between border-e bg-slate-800 w-64 transition-all duration-300 ease-in-out"
  >
    <div class="px-4 py-4">
      <!-- Logo/Branding -->
      <!-- <div class="mb-8 flex items-center justify-center rounded-lg bg-slate-700 p-3">
        <img src="../assets/logo.jpeg" alt="Logo" class="h-8 w-8 rounded-full">
        <h1 class="ml-2 text-lg font-bold text-white">Ultimate POS</h1>
      </div> -->

      <!-- Navigation Menu -->
      <nav class="space-y-1">
        <!-- Dashboard -->
        <router-link 
          to="/" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <HomeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Dashboard</span>
        </router-link>

        <!-- Products Section -->
        <div class="group relative">
          <button 
            @click="toggleMenu('Products')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CubeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Products</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Products' ? 'rotate-180' : ''
              ]" 
            />
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
              v-show="openMenu === 'Products'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/inventory"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Inventory
              </router-link>
              <router-link 
                to="/catalogue"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Catalogue
              </router-link>
              <router-link 
                to="/categories"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Categories
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Transactions Section -->
        <div class="group relative">
          <button 
            @click="toggleMenu('Transactions')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CurrencyDollarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Transactions</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Transactions' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition name="dropdown">
            <div 
              v-show="openMenu === 'Transactions'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/sell"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Sell
              </router-link>
              <router-link 
                to="/transactions"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Transaction List
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Other sections follow the same pattern -->
        <!-- Documents -->
        <router-link 
          to="/documents" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <DocumentTextIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Documents</span>
        </router-link>

        <!-- Reports -->
        <!-- <router-link 
          to="/reports" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <ChartBarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Reports</span>
        </router-link> -->
        <!-- Reports Dropdown Section -->
<div class="group relative">
  <button 
    @click="toggleMenu('Reports')"
    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
  >
    <div class="flex items-center">
      <ChartBarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
      <span class="ml-3">Reports</span>
    </div>
    <ChevronDownIcon 
      :class="[
        'h-4 w-4 transform transition-transform duration-200',
        openMenu === 'Reports' ? 'rotate-180' : ''
      ]" 
    />
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
      v-show="openMenu === 'Reports'"
      class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
    >
      <router-link 
        to="/Reports/Sales"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Sales Report
      </router-link>
      <router-link 
        to="/Reports/Purchases"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ShoppingCartIcon class="h-4 w-4 mr-3" />
        Purchase Report
      </router-link>
      <router-link 
        to="/reports/inventory"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ArchiveBoxIcon class="h-4 w-4 mr-3" />
        Inventory Report
      </router-link>
      <router-link 
        to="/reports/invoice"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <DocumentTextIcon class="h-4 w-4 mr-3" />
        Invoice Report
      </router-link>
      <router-link 
        to="/reports/supplier"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <TruckIcon class="h-4 w-4 mr-3" />
        Supplier Report
      </router-link>
      <router-link 
        to="/reports/customer"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <UserGroupIcon class="h-4 w-4 mr-3" />
        Customer Report
      </router-link>
      <router-link 
        to="/reports/product"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <TagIcon class="h-4 w-4 mr-3" />
        Product Report
      </router-link>
      <router-link 
        to="/Reports/ExpenseReport"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ArrowDownCircleIcon class="h-4 w-4 mr-3" />
        Expense Report
      </router-link>
       <router-link 
        to="/Reports/LowStockReport"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ArrowDownCircleIcon class="h-4 w-4 mr-3" />
        Low Stock Report
      </router-link>
      <router-link 
        to="/reports/income"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ArrowUpCircleIcon class="h-4 w-4 mr-3" />
        Income Report
      </router-link>
      <router-link 
        to="/reports/tax"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <BanknotesIcon class="h-4 w-4 mr-3" />
        Tax Report
      </router-link>
      <router-link 
        to="/reports/profit-loss"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <ScaleIcon class="h-4 w-4 mr-3" />
        Profit & Loss
      </router-link>
      <router-link 
        to="/reports/annual"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <CalendarIcon class="h-4 w-4 mr-3" />
        Annual Report
      </router-link>
    </div>
  </transition>
</div>

<!-- Role and Permissions -->
 <div class="group relative">
  <button 
    @click="toggleMenu('Roles')"
    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
  >
    <div class="flex items-center">
      <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
      <span class="ml-3">Roles</span>
    </div>
    <ChevronDownIcon 
      :class="[
        'h-4 w-4 transform transition-transform duration-200',
        openMenu === 'Roles' ? 'rotate-180' : ''
      ]" 
    />
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
      v-show="openMenu === 'Roles'"
      class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
    >
      <router-link 
        to="/Roles/RolePermissions"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Roles & [Permisions]
      </router-link>
       <!-- <router-link 
        to="/Roles/RolePermissions"
        class="fl ex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Permissions
      </router-link> -->
      </div>
  </transition>
 </div>

<!-- End Role and Permissions -->


<!-- User Maintainance -->
 <div class="group relative">
  <button 
    @click="toggleMenu('Users')"
    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
  >
    <div class="flex items-center">
      <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
      <span class="ml-3">Users</span>
    </div>
    <ChevronDownIcon 
      :class="[
        'h-4 w-4 transform transition-transform duration-200',
        openMenu === 'users' ? 'rotate-180' : ''
      ]" 
    />
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
      v-show="openMenu === 'Users'"
      class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
    >
      <router-link 
        to="/Users/UserMaintainance"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Manage Users
      </router-link>
      </div>
  </transition>
 </div>

<!-- End Users -->

<!-- Till Management -->
 <div class="group relative">
  <button 
    @click="toggleMenu('Till')"
    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
  >
    <div class="flex items-center">
      <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
      <span class="ml-3">Till Management</span>
    </div>
    <ChevronDownIcon 
      :class="[
        'h-4 w-4 transform transition-transform duration-200',
        openMenu === 'till' ? 'rotate-180' : ''
      ]" 
    />
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
      v-show="openMenu === 'Till'"
      class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
    >
      <router-link 
        to="/Till/TillManagement"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Manage Till
      </router-link>
      <router-link 
        to="/Till/CashierManagement"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Manage Tellers
      </router-link>
       <router-link 
        to="/Till/TillClosure"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Till Closure
      </router-link>
       <router-link 
        to="/Till/SupervisorTillReview"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        TillSupervision
      </router-link>
      </div>
  </transition>
 </div>

<!-- End Users -->

<!-- User Maintainance -->
 <div class="group relative">
  <button 
    @click="toggleMenu('Audit')"
    class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
  >
    <div class="flex items-center">
      <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
      <span class="ml-3">Audit</span>
    </div>
    <ChevronDownIcon 
      :class="[
        'h-4 w-4 transform transition-transform duration-200',
        openMenu === 'audit' ? 'rotate-180' : ''
      ]" 
    />
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
      v-show="openMenu === 'Audit'"
      class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
    >
      <router-link 
        to="/Audit/SystemAudit"
        class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
        active-class="bg-slate-600 text-white"
      >
        <PresentationChartLineIcon class="h-4 w-4 mr-3" />
        Audit
      </router-link>
      </div>
  </transition>
 </div>

        <!-- Suppliers -->
        <router-link 
          to="/supplier" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <TruckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Suppliers</span>
        </router-link>

        <!-- My Account -->
        <router-link 
          to="/account" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <UserCircleIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">My Account</span>
        </router-link>
      </nav>
    </div>

    <!-- Footer/Settings -->
    <div class="border-t border-slate-700 p-4">
      <router-link 
        to="/settings" 
        class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        <Cog6ToothIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
        <span class="ml-3">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { useDashboardStore } from '../store/DashboardStore'
import { ref, computed } from 'vue'
import {
  HomeIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  TruckIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  TagIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  BanknotesIcon,
  ScaleIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const dashboardstore = useDashboardStore()
const showSidebar = computed(() => dashboardstore.filterLargeScreen)
const openMenu = ref(null)

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu
}
</script>

<style scoped>
/* Custom transitions */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Active link styling */
.router-link-active:not(.active-class) {
  @apply bg-slate-700 text-white;
}

/* Smooth hover transitions */
.router-link {
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Scrollbar styling for submenus */
.scroll-area {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.scroll-area::-webkit-scrollbar {
  width: 6px;
}

.scroll-area::-webkit-scrollbar-track {
  background: #1f2937;
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}
</style>