// // stores/sidebar.js
// import { defineStore } from 'pinia';
// import axios from '../axios'


// export const useDashboardStore = defineStore('DashboardStore', { 

//   const  breakpoints = useBreakpoints({
//       md: 768,
//       lg: 1024,
//     }),


//   state: () => ({
//     graph: [], 
//     averages:[],
//     recentSales:[],
//     loading: false, 
//     isSidebarVisible: false,
//     error: null,

 

//     isDesktop : breakpoints.greaterOrEqual('lg'),
//     isMobile : breakpoints.smaller('md'),   
//     isTablet : breakpoints.between('md', 'lg'),

//     showSidebar:false,
//     showMobileSidebar:false,

  

//   }),
//   getters:{
//     getGraph: (state) => state.graph,
//     getAverages: (state) => state.averages,
//     getRecentsalesData: (state) => state.recentSales,

//     isLoading: (state) => state.loading,
//     getError: (state) => state.error,

//     // filterSidebar: (state) => {
//     //     return state.isSidebarVisible;
//     // },

//     filterSmallScreen: (state) => {
//         return state.showMobileSidebar;
//     },

//     filterLargeScreen: (state) => {
//         return state.showSidebar;
//     },



//   },
//   actions: {
//     // togleSmallScreen() {
//     //     this.isSidebarVisible = !this.isSidebarVisible;
//     //     this.showMobileSidebar =  breakpoints.between('md', 'lg');
//     // },

//     // toggleLargeScreen() {
//     //     this.isSidebarVisible = !this.isSidebarVisible;
//     //     this.showSidebar = breakpoints.greater('lg');
//     // },

//      toggleResponsiveSidebar ()  {
//       if (isDesktop.value) {
//         showSidebar.value = !showSidebar.value
//       } else {
//         showMobileSidebar.value = !showMobileSidebar.value
//       }
//     },


//     // toggleSidebar() {
//     //   this.isSidebarVisible = !this.isSidebarVisible;
//     // },

//     getDashboardAverages(){     
//       axios.getDashboardAverages()
//         .then(response => {
//             this.averages = response;
//             this.loading = false;
//         })
//         .catch(error => {
//             this.error=error;
//             this.loading = false;
//             // console.log(error);
//         });
//     },

//     getGraphData(){     
//       axios.getGraphData()
//         .then(response => {
//             this.graph = response;            
//             this.loading = false;
//         })
//         .catch(error => {
//             this.error=error;
//             this.loading = false;
//             // console.log(error);
//         });
//     },

//     getRecentSales(){     
//       axios.getRecentSalesData()
//         .then(response => {
//             this.recentSales = response;            
//             this.loading = false;
//         })
//         .catch(error => {
//             this.error=error;
//             this.loading = false;
//             // console.log(error);
//         });
//     },

//   }
// });


// stores/sidebar.js
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { useBreakpoints } from '@vueuse/core';
import axios from '../axios';

export const useDashboardStore = defineStore('DashboardStore', () => {
  // Setup VueUse breakpoints
  const breakpoints = useBreakpoints({
    md: 770,
    lg: 1024,
  });

  const isDesktop = breakpoints.greaterOrEqual('lg');
  const isMobile = breakpoints.smaller('md');
  const isTablet = breakpoints.between('md', 'lg');

  // State
  const graph = ref([]);
  const averages = ref([]);
  const recentSales = ref([]);
  const loading = ref(false);
  const error = ref(null);

  const showSidebar = ref(false);
  const showMobileSidebar = ref(false);

  // Getters (computed)
  const getGraph = computed(() => graph.value);
  const getAverages = computed(() => averages.value);
  const getRecentsalesData = computed(() => recentSales.value);
  const isLoading = computed(() => loading.value);
  const getError = computed(() => error.value);
  const filterSmallScreen = computed(() => showMobileSidebar.value);
  const filterLargeScreen = computed(() => showSidebar.value);

  // Actions
  function toggleResponsiveSidebar() {
    if (isTablet.value || isDesktop.value) {
      showSidebar.value = !showSidebar.value;
          console.log("large screens",showSidebar.value )
    } else {
      showMobileSidebar.value = !showMobileSidebar.value;
          console.log("show mobile screens",showMobileSidebar.value)
          console.log("mobil", isMobile.value,"tab",isTablet.value, "desk",isDesktop.value  )
    }
  }

  function getDashboardAverages(token) {
    loading.value = true;
    axios.getDashboardAverages(token)
      .then(response => {
        averages.value = response;
        loading.value = false;
      })
      .catch(err => {
        error.value = err;
        loading.value = false;
      });
  }

  function getGraphData(token) {
    loading.value = true;
    axios.getGraphData(token)
      .then(response => {
        graph.value = response;
        loading.value = false;
      })
      .catch(err => {
        error.value = err;
        loading.value = false;
      });
  }

  function getRecentSales(token) {
    loading.value = true;
    axios.getRecentSalesData(token)
      .then(response => {
        recentSales.value = response;
        loading.value = false;
      })
      .catch(err => {
        error.value = err;
        loading.value = false;
      });
  }

  // Return everything
  return {
    graph,
    averages,
    recentSales,
    loading,
    error,
    isDesktop,
    isMobile,
    isTablet,
    showSidebar,
    showMobileSidebar,
    getGraph,
    getAverages,
    getRecentsalesData,
    isLoading,
    getError,
    filterSmallScreen,
    filterLargeScreen,
    toggleResponsiveSidebar,
    getDashboardAverages,
    getGraphData,
    getRecentSales,
  };
});
