<template>
  <div class="h-screen w-screen flex flex-col overflow-y-auto">
     <Navbar class="h-16" />
    <div class="flex flex-1">
       
      <Sidebar v-if="filterLargeScreen" class="h-full  bg-gray-800 text-white " />

     <Mobile_sidebar v-if="filterSmallScreen" class="fixed top-0 left-0 z-50 w-64 h-auto max-h-screen bg-gray-800 text-white shadow-lg" />

     <main class="flex-1 bg-gray-100  overflow-y-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>



<script>
import { computed, watch } from 'vue';
import { RouterView } from 'vue-router';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue'; 
import Mobile_sidebar from '../components/Mobile_sidebar.vue';
import { useDashboardStore } from '../store/DashboardStore';

export default {
  name: 'Dashboard',
  components: {
    Navbar,
    Sidebar,
    Mobile_sidebar
  },
  setup() { 


  const dashboardstore = useDashboardStore();

    const filterSmallScreen = computed(() => dashboardstore.filterSmallScreen)
    const filterLargeScreen = computed(() => dashboardstore.filterLargeScreen) 

    watch(filterLargeScreen, (newVal, oldVal) => {
      if (newVal) {
        console.log(newVal, "felo") 

      }
    });

   return {
    
        dashboardstore,
        filterSmallScreen,
        filterLargeScreen,
   }

  },

};

</script>

<!-- <style scoped>
html,
body {
  margin: 0;
  height: 100%;
  overflow: hidden;
}
</style> -->