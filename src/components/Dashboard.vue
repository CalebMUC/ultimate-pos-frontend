<template>
  <!-- Outer shell: full viewport height, no overflow (browser scrolls natively) -->
  <div class="min-h-screen flex flex-col bg-gray-100">

    <!-- Sticky Navbar — always on top -->
    <Navbar />

    <!-- Body row: sidebar (fixed) + scrollable main -->
    <div class="flex flex-1">

      <!-- Desktop fixed sidebar (manages its own v-if internally) -->
      <Sidebar />

      <!-- Mobile overlay drawer (renders via <teleport> to body, manages its own v-if) -->
      <Mobile_sidebar />

      <!-- Main content — offset by sidebar width when visible -->
      <main
        class="flex-1 overflow-y-auto transition-[margin-left] duration-300 ease-in-out"
        :class="filterLargeScreen ? (dashboardstore.sidebarCollapsed ? 'ml-16' : 'ml-64') : 'ml-0'"
      >
        <RouterView />
      </main>
    </div>
  </div>
</template>



<script>
import { computed, watch, onMounted } from 'vue';
import { RouterView } from 'vue-router';
import Swal from 'sweetalert2';
import Navbar from '../components/Navbar.vue';
import Sidebar from '../components/Sidebar.vue'; 
import Mobile_sidebar from '../components/Mobile_sidebar.vue';
import { useDashboardStore } from '../store/DashboardStore';
import { errorState } from '../store/ErrorState';

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

    // ── Global error boundary ─────────────────────────────────────────────
    // Watches the shared errorState reactive object and shows a toast when any
    // API call fails, so individual views don't need their own error handling.
    watch(() => errorState.message, (msg) => {
      if (msg) {
        Swal.fire({
          icon: errorState.code === 401 ? 'warning' : 'error',
          title: errorState.code === 401
            ? 'Session Expired'
            : `Error ${errorState.code || ''}`.trim(),
          text: msg,
          timer: 4000,
          timerProgressBar: true,
          showConfirmButton: false,
          toast: true,
          position: 'top-end'
        })
        // Clear after displaying
        errorState.message = ''
        errorState.code = null
      }
    })

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