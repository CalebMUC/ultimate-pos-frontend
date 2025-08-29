<script setup>
import { ref, computed, onMounted } from "vue";
import ModuleComponent from '../../components/ModuleComponent/ModuleComponent.vue';
import SupervisionModal from "../../components/Modals/SupervisionModal.vue";

// Sample data - in real app, this would come from API
const tillClosures = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Columns configuration
const supervisionColumns = [
  { 
    field: 'cashierName', 
    label: 'Cashier Name',
    sortable: true,
    width: '20%'
  },
  { 
    field: 'tillId', 
    label: 'Till ID',
    sortable: true,
    width: '15%'
  },
  { 
    field: 'expectedCash', 
    label: 'Expected Cash', 
    format: (value) => `KES ${value.toLocaleString()}`,
    align: 'right',
    sortable: true,
    width: '15%'
  },
  { 
    field: 'countedCash', 
    label: 'Counted Cash', 
    format: (value) => `KES ${value.toLocaleString()}`,
    align: 'right',
    sortable: true,
    width: '15%'
  },
  { 
    field: 'variance', 
    label: 'Variance', 
    format: (value) => {
      const amount = `KES ${Math.abs(value).toLocaleString()}`;
      return value < 0 ? `-${amount}` : value > 0 ? `+${amount}` : amount;
    },
    align: 'right',
    sortable: true,
    cellClass: (value) => value < 0 ? 'text-red-600' : value > 0 ? 'text-green-600' : 'text-gray-600',
    width: '15%'
  },
  { 
    field: 'status', 
    label: 'Status',
    format: (value) => {
      const statusMap = {
        'Pending': '⏳ Pending',
        'Approved': '✅ Approved',
        'Rejected': '❌ Rejected'
      };
      return statusMap[value] || value;
    },
    cellClass: (value) => {
      const classMap = {
        'Pending': 'bg-yellow-100 text-yellow-800',
        'Approved': 'bg-green-100 text-green-800',
        'Rejected': 'bg-red-100 text-red-800'
      };
      return `px-2 py-1 rounded-full text-xs font-medium ${classMap[value] || 'bg-gray-100 text-gray-800'}`;
    },
    width: '12%'
  }
];

// Computed stats with improved formatting
const pendingCount = computed(() => tillClosures.value.filter(t => t.status === "Pending").length);
const approvedCount = computed(() => tillClosures.value.filter(t => t.status === "Approved").length);
const rejectedCount = computed(() => tillClosures.value.filter(t => t.status === "Rejected").length);
const totalVariance = computed(() => tillClosures.value.reduce((acc, t) => acc + t.variance, 0));

// Variance analysis
const varianceStats = computed(() => {
  const variances = tillClosures.value.map(t => t.variance);
  return {
    average: variances.reduce((a, b) => a + b, 0) / variances.length,
    min: Math.min(...variances),
    max: Math.max(...variances),
    total: totalVariance.value
  };
});

// Modal State
const showModal = ref(false);
const selectedItem = ref(null);

// Fetch function
const fetchTillClosures = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    tillClosures.value = [
      { id: 1, cashierName: "John Doe", tillId: "TILL-001", expectedCash: 15000, countedCash: 14800, variance: -200, status: "Pending", timestamp: new Date('2024-01-15T10:30:00') },
      { id: 2, cashierName: "Jane Smith", tillId: "TILL-002", expectedCash: 12000, countedCash: 12000, variance: 0, status: "Pending", timestamp: new Date('2024-01-15T11:15:00') },
      { id: 3, cashierName: "Brian Kim", tillId: "TILL-003", expectedCash: 10000, countedCash: 9500, variance: -500, status: "Approved", timestamp: new Date('2024-01-15T09:45:00') },
      { id: 4, cashierName: "Sarah Johnson", tillId: "TILL-004", expectedCash: 18000, countedCash: 18250, variance: 250, status: "Pending", timestamp: new Date('2024-01-15T12:20:00') },
      { id: 5, cashierName: "Michael Brown", tillId: "TILL-005", expectedCash: 9000, countedCash: 9000, variance: 0, status: "Rejected", timestamp: new Date('2024-01-15T13:10:00') }
    ];
  } catch (err) {
    error.value = 'Failed to load till data';
    console.error('Error loading till data:', err);
  } finally {
    isLoading.value = false;
  }
}

// Single onMounted hook
onMounted(() => {
  fetchTillClosures();
});

function openReviewModal(item) {
  selectedItem.value = { ...item }; // Create a copy to avoid direct mutation
  showModal.value = true;
}

function handleApprove(updatedItem) {
  const index = tillClosures.value.findIndex(t => t.id === updatedItem.id);
  if (index !== -1) {
    tillClosures.value[index] = { ...updatedItem, status: "Approved" };
  }
  showModal.value = false;
}

function handleReject(updatedItem) {
  const index = tillClosures.value.findIndex(t => t.id === updatedItem.id);
  if (index !== -1) {
    tillClosures.value[index] = { ...updatedItem, status: "Rejected" };
  }
  showModal.value = false;
}
</script>

<template>
  <div class="p-6 bg-gray-50 min-h-screen">
    <!-- Header -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-gray-800">Till Supervision</h1>
      <p class="text-gray-600">Monitor and review till closure submissions</p>
    </div>

    <!-- Enhanced Summary Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <div class="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="flex items-center">
          <div class="p-2 bg-yellow-100 rounded-lg">
            <span class="text-yellow-600 text-lg">⏳</span>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 font-medium">Pending Reviews</p>
            <p class="text-2xl font-bold text-gray-800">{{ pendingCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="flex items-center">
          <div class="p-2 bg-green-100 rounded-lg">
            <span class="text-green-600 text-lg">✅</span>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 font-medium">Approved</p>
            <p class="text-2xl font-bold text-gray-800">{{ approvedCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="flex items-center">
          <div class="p-2 bg-red-100 rounded-lg">
            <span class="text-red-600 text-lg">❌</span>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 font-medium">Rejected</p>
            <p class="text-2xl font-bold text-gray-800">{{ rejectedCount }}</p>
          </div>
        </div>
      </div>

      <div class="p-5 bg-white border border-gray-200 rounded-xl shadow-sm">
        <div class="flex items-center">
          <div class="p-2 bg-blue-100 rounded-lg">
            <span class="text-blue-600 text-lg">💰</span>
          </div>
          <div class="ml-4">
            <p class="text-sm text-gray-600 font-medium">Total Variance</p>
            <p class="text-xl font-bold" :class="{
              'text-red-600': totalVariance < 0,
              'text-green-600': totalVariance > 0,
              'text-gray-800': totalVariance === 0
            }">
              {{ totalVariance >= 0 ? '+' : '' }}KES {{ Math.abs(totalVariance).toLocaleString() }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Module Table -->
    <ModuleComponent
      title="Till Closure Submissions"
      description="Review and approve till closure requests"
      moduleName="TillSupervision"
      :data="tillClosures"
      :columns="supervisionColumns"
      :loading="isLoading"
      :fetchData="fetchTillClosures"
      :error="error"
      searchPlaceholder="Search by cashier name or till ID..."
      :enableFilters="true"
      :enableSorting="true"
    >
      <template #row-actions="{ item }">
        <button 
          @click="openReviewModal(item)" 
          class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center"
          :disabled="item.status !== 'Pending'"
          :class="{
            'opacity-50 cursor-not-allowed': item.status !== 'Pending',
            'hover:bg-blue-600': item.status !== 'Pending'
          }"
        >
          <span class="mr-2">👁️</span>
          {{ item.status === 'Pending' ? 'Review' : 'View' }}
        </button>
      </template>
    </ModuleComponent>

    <!-- Modal -->
    <SupervisionModal 
      :show="showModal" 
      :item="selectedItem" 
      @approve="handleApprove" 
      @reject="handleReject" 
      @close="showModal = false" 
    />
  </div>
</template>

<style scoped>
/* Custom styles for better visual hierarchy */
.shadow-sm {
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

.transition-colors {
  transition: background-color 0.2s ease-in-out;
}
</style>