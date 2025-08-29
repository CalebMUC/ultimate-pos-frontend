<template>
  <div v-if="showMobileSidebar">
    <!-- Backdrop overlay -->
    <!-- <div  class="fixed inset-0 bg-black bg-opacity-50 z-40" @click="closeSidebar"></div> -->

    <!-- Floating sidebar -->
    <div class="fixed top-0 left-0 z-50 w-64 h-auto max-h-screen bg-slate-800 text-white px-6 py-2 mt-16" >
      <!-- Cancel Icon -->
      <button @click="closeSidebar" class="absolute top-1 right-1 text-white hover:text-gray-300">
        <i class="fas fa-times text-xl"></i>
      </button>

      <ul class="space-y-3 mt-8">
        <li>
          <router-link to="/" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-home mr-3"></i> Dashboard
          </router-link>
        </li>
        <li>
          <router-link to="/inventory" @click.native="closeSidebar"  class="flex items-center text-white hover:text-gray-300">
            <i class="fas fa-box-open mr-3"></i> Inventory
          </router-link>
        </li>
        <li>
          <router-link to="/catalogue" @click.native="closeSidebar"  class="flex items-center text-white hover:text-gray-300">
            <i class="fas fa-box mr-3"></i> Catalogue
          </router-link>
        </li>
        <li>
          <router-link to="/categories" @click.native="closeSidebar"  class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-tags mr-3"></i> Categories
          </router-link>
        </li>
        <li>
          <router-link to="/sell" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i class="fas fa-paper-plane mr-3"></i> Sell
          </router-link>
        </li>
        <li>
          <router-link to="/transactions" @click.native="closeSidebar" lass="flex items-center text-white hover:text-gray-300">
            <i class="fas fa-receipt mr-3"></i> Transactions
          </router-link>
        </li>
        <li>
          <router-link to="/documents" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-file-alt mr-3"></i> Documents
          </router-link>
        </li>
        <li>
          <router-link to="/contacts" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-address-book mr-3"></i> Contacts
          </router-link>
        </li>
        <li>
          <router-link to="/SendSms" @click.native="closeSidebar"  class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-comment-alt mr-3"></i> Send SMS
          </router-link>
        </li>
        <li>
          <router-link to="/SentMessages"  @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300 " >
            <i   class="fas fa-paper-plane mr-3"></i> Sent Messages
          </router-link>
        </li>
        <li>
          <router-link to="/reports" @click.native="closeSidebar"  class="flex items-center text-white hover:text-gray-300">
            <i class="fas fa-chart-line mr-3"></i> Reports
          </router-link>
        </li>
        <li>
          <router-link to="/Supplier" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-truck mr-3"></i> Suppliers
          </router-link>
        </li>
        <li>
          <router-link to="/account" @click.native="closeSidebar" class="flex items-center text-white hover:text-gray-300">
            <i  class="fas fa-address-book mr-3"></i> My Account
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>



  <script setup>
   import { useDashboardStore } from '../store/DashboardStore';
   import { ref,computed,onMounted } from 'vue';
 
      const dashboardstore = useDashboardStore();
      const showMobileSidebar = computed(() => dashboardstore.filterSmallScreen );


      const closeSidebar = ()=> {
        dashboardstore.toggleResponsiveSidebar();
      }

     
   </script>
   
   <style scoped>
   /* Add additional styles if necessary */
   @import 'node_modules/@fortawesome/fontawesome-free/css/all.css';
   </style>