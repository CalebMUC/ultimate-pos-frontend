<template>
  <div class="rounded-xl border border-gray-200 bg-white h-full p-4 shadow-sm">
    <!-- Header -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
      <div>
        <h1 class="text-xl font-bold text-gray-800">{{ title }}</h1>
        <p class="text-sm text-gray-500">{{ description }}</p>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap items-center gap-3">
        <!-- Export Buttons (Optional) -->
        <slot name="header-actions">
          <button 
            v-if="showExportButtons"
            class="flex items-center px-3 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white text-xs font-medium shadow-sm transition-colors"
          >
            PDF
          </button>
          <button 
            v-if="showExportButtons"
            class="flex items-center px-3 py-2 rounded-md bg-green-500 hover:bg-green-600 text-white text-xs font-medium shadow-sm transition-colors"
          >
            XLS
          </button>
        </slot>

        <!-- Add Button -->
        <button
        v-if="moduleName != 'TillSupervision'"
          @click="openModal(null)"
          class="flex items-center gap-2 px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium shadow transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          {{ addButtonText }}
        </button>

        <!-- Import Button (Optional) -->
        <button
          v-if="showImportButton"
          class="flex items-center gap-2 px-4 py-2 rounded-md bg-slate-800 hover:bg-slate-900 text-white text-sm font-medium shadow transition-colors"
        >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
            </svg>
          Import {{ moduleNameSingular }}
        </button>

        <!-- Custom Actions Slot -->
        <slot name="custom-actions"></slot>
      </div>
    </div>

    <!-- Filters & Search -->
    <div class="flex flex-col md:flex-row justify-between items-center rounded-md shadow-sm gap-3 mb-4">
      <!-- Search Input -->
      <input 
        v-model="searchQuery" 
        @input="handleSearch" 
        type="text"
        :placeholder="searchPlaceholder"
        class="w-full md:w-64 rounded-lg border border-gray-200 py-2 px-4 shadow-sm text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
      />

      <!-- Dynamic Filters Slot -->
      <div class="flex items-center gap-3">
        <slot name="filters"></slot>
      </div>
    </div>

    <!-- Table -->
<div class="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
  <div class="overflow-x-auto">
    <table class="min-w-full divide-y divide-gray-200 bg-white text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th 
            v-for="(column, index) in columns" 
            :key="index" 
            class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer select-none"
            @click="column.sortable ? toggleSort(column.field) : null"
            :class="{'bg-gray-100': sortBy === column.field, 'cursor-default': !column.sortable}"
          >
            <div class="flex items-center">
              {{ column.label }}
              <span v-if="sortBy === column.field && column.sortable" class="ml-1">
                <svg v-if="sortDirection === 'asc'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 15l7-7 7 7" />
                </svg>
                <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </div>
          </th>
          <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-200">
        <tr v-for="(item, index) in paginatedData" :key="index" class="hover:bg-gray-50">
          <td v-for="(column, colIndex) in columns" :key="colIndex" class="px-6 py-4 whitespace-nowrap">
            
            <!-- Product Name with truncation and tooltip -->
            <div v-if="column.field === 'productName'" class="relative group">
              <span class="text-gray-700 truncate max-w-[200px] block">
                {{ item[column.field] }}
              </span>
              <!-- Tooltip for full product name -->
              <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 
                        bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 
                        transition-opacity duration-200 pointer-events-none z-10 whitespace-nowrap">
                {{ item[column.field] }}
                <div class="absolute top-full left-1/2 transform -translate-x-1/2 border-4 
                          border-transparent border-t-gray-800"></div>
              </div>
            </div>
            
            <!-- Currency Type -->
            <span v-else-if="column.type === 'currency'" :class="{'font-mono': column.mono}">
              ${{ formatCurrency(item[column.field]) }}
            </span>
            
            <!-- Badge Type -->
            <span v-else-if="column.type === 'badge'" class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {{ item[column.field] }}
            </span>
            
            <!-- Status Type -->
            <span v-else-if="column.type === 'status'" :class="getStatusClasses(item[column.field])">
              {{ formatStatus(item[column.field]) }}
            </span>
            
            <!-- Date Type -->
            <span v-else-if="column.type === 'date'">
              {{ formatDate(item[column.field]) }}
            </span>
            
            <!-- Number Type -->
            <span v-else-if="column.type === 'number'" :class="{'font-mono': column.mono}">
              {{ formatNumber(item[column.field]) }}
            </span>
            
            <!-- Default Type (Text) - For all other fields including productName that's already handled above -->
            <span v-else-if="column.field !== 'productName'" class="text-gray-700">
              {{ item[column.field] }}
            </span>
            
          </td>
          
          <!-- Actions Column -->
          <td class="px-6 py-4 whitespace-nowrap text-right flex items-center justify-end gap-2">
            <!-- Edit Button -->
            <button 
            v-if="moduleName != 'TillSupervision'"
              @click="openModal(item)" 
              class="p-2 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors"
              :title="`Edit ${moduleNameSingular}`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </button>
            
            <!-- Delete Button -->
            <button 
              v-if="moduleName != 'TillSupervision'"
              @click="confirmDelete(item)" 
              class="p-2 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
              :title="`Delete ${moduleNameSingular}`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862
                  a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4
                  a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
              </svg>
            </button>
            
            <!-- Permission Button (Only for Roles module) -->
            <button 
              v-if="moduleName === 'Roles'"
              @click="openPermissionModal(item)" 
              class="p-2 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
              :title="`Manage ${moduleNameSingular} Permissions`"
            >
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </button>
            
            <!-- Custom Actions Slot -->
            <slot name="row-actions" :item="item"></slot>
          </td>
        </tr>
        
        <!-- Empty State -->
        <tr v-if="filteredData.length === 0">
          <td :colspan="columns.length + 1" class="px-6 py-8 text-center text-gray-500">
            No {{ moduleName }} found
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>

    <!-- Pagination -->
    <div v-if="filteredData.length > 0" class="px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray-200">
      <div class="flex items-center gap-2">
        <span class="text-sm text-gray-600">Show</span>
        <select v-model="itemsPerPage" class="rounded-md border border-gray-300 py-1 px-2 text-sm">
          <option v-for="option in pageSizeOptions" :key="option" :value="option">{{ option }}</option>
        </select>
        <span class="text-sm text-gray-600">entries</span>
      </div>
      
      <p class="text-sm text-gray-600">
        Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
        to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredData.length) }}</span>
        of <span class="font-medium">{{ filteredData.length }}</span> entries
      </p>
      
      <div class="flex gap-1">
        <button 
          @click="currentPage = 1" 
          :disabled="currentPage === 1"
          :class="['px-3 py-1 rounded-md text-sm font-medium transition-colors', 
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700']"
        >
          <<
        </button>
        <button 
          @click="currentPage--" 
          :disabled="currentPage === 1"
          :class="['px-3 py-1 rounded-md text-sm font-medium transition-colors', 
                  currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700']"
        >
          <
        </button>
        
        <button 
          v-for="page in visiblePages" 
          :key="page" 
          @click="currentPage = page"
          :class="['px-3 py-1 rounded-md text-sm font-medium transition-colors', 
                  page === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700']"
        >
          {{ page }}
        </button>
        
        <button 
          @click="currentPage++" 
          :disabled="currentPage === totalPages"
          :class="['px-3 py-1 rounded-md text-sm font-medium transition-colors', 
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700']"
        >
          >
        </button>
        <button 
          @click="currentPage = totalPages" 
          :disabled="currentPage === totalPages"
          :class="['px-3 py-1 rounded-md text-sm font-medium transition-colors', 
                  currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-gray-100 hover:bg-gray-200 text-gray-700']"
        >
          >>
        </button>
      </div>
    </div>

    <!-- Modal -->
    <ReusableModal
      :isOpen="isModalOpen"
      :title="currentItem ? `Edit ${moduleNameSingular}` : `Add New ${moduleNameSingular}`"
      :confirmText="currentItem ? 'Update' : 'Add'"
      :isFormValid="isFormValid"
      @update:isOpen="isModalOpen = $event"
      @confirm="handleConfirm"
    >
      <template #content>
        <DynamicForm
          :formFields="formFields"
          :initialData="currentItem || {}"
          @update:formData="formData = $event"
          @validate="errors = $event"
        />
      </template>
    </ReusableModal>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import ReusableModal from '../Modals/ReusableModal.vue'
import DynamicForm from '../Forms/DynamicForm.vue'
import Swal from 'sweetalert2'

export default {
  name: "ModuleComponent",
  props: {
    title: String,
    description: String,
    moduleName: String,
    moduleNameSingular: String,
    data: { type: Array, required: true },
    columns: { type: Array, required: true },
    formFields: { type: Array, required: true },
    fetchData: { type: Function, required: true },
    addItem: { type: Function, required: true },
    updateItem: { type: Function, required: true },
    deleteItem: { type: Function, required: true },
    initialItemsPerPage: { type: Number, default: 10 },
    addButtonText: { type: String, default: "Add Item" },
    searchPlaceholder: { type: String, default: "Search..." },
    showExportButtons: { type: Boolean, default: false },
    showImportButton: { type: Boolean, default: false },
    // Optional: Custom function to extract ID from items
    getId: { type: Function, default: (item) => item.id }
  },

  components: { ReusableModal, DynamicForm },

  emits: ['open-permission-modal'],

  setup(props, { emit }) {
    const searchQuery = ref("")
    const currentPage = ref(1)
    const itemsPerPage = ref(props.initialItemsPerPage)
    const sortBy = ref("")
    const sortDirection = ref("asc")
    const isModalOpen = ref(false)
    const currentItem = ref(null)
    const formData = ref({})
    const errors = ref({})
    
    const pageSizeOptions = [5, 10, 20, 50, 100]

    const isFormValid = computed(() => Object.keys(errors.value).length === 0)

    // Watch for changes to itemsPerPage and reset to first page
    watch(itemsPerPage, () => {
      currentPage.value = 1
    })

    const filteredData = computed(() => {
      let result = [...props.data]
      
      // Apply search filter
      if (searchQuery.value) {
        const query = searchQuery.value.toLowerCase()
        result = result.filter(item =>
          Object.values(item).some(val => 
            String(val).toLowerCase().includes(query)
          )
        )
      }
      
      // Apply sorting
      if (sortBy.value) {
        result.sort((a, b) => {
          let aValue = a[sortBy.value]
          let bValue = b[sortBy.value]
          
          // Handle numeric values
          if (typeof aValue === 'number' && typeof bValue === 'number') {
            return sortDirection.value === 'asc' ? aValue - bValue : bValue - aValue
          }
          
          // Handle string values
          aValue = String(aValue).toLowerCase()
          bValue = String(bValue).toLowerCase()
          
          if (aValue < bValue) return sortDirection.value === 'asc' ? -1 : 1
          if (aValue > bValue) return sortDirection.value === 'asc' ? 1 : -1
          return 0
        })
      }
      
      return result
    })

    const totalPages = computed(() => Math.ceil(filteredData.value.length / itemsPerPage.value))
    
    const paginatedData = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value
      return filteredData.value.slice(start, start + itemsPerPage.value)
    })

    const visiblePages = computed(() => {
      const maxVisiblePages = 5
      const half = Math.floor(maxVisiblePages / 2)
      let start = Math.max(1, currentPage.value - half)
      let end = Math.min(totalPages.value, start + maxVisiblePages - 1)
      
      // Adjust if we're near the end
      if (end - start + 1 < maxVisiblePages) {
        start = Math.max(1, end - maxVisiblePages + 1)
      }
      
      return Array.from({ length: end - start + 1 }, (_, i) => start + i)
    })

    const formatCurrency = (val) => {
      return parseFloat(val || 0).toLocaleString('en-US', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
      })
    }

    const formatNumber = (val) => {
      return parseFloat(val || 0).toLocaleString('en-US')
    }

    const formatDate = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleDateString()
    }

    const formatStatus = (status) => {
      const statusMap = {
        'active': 'Active',
        'inactive': 'Inactive',
        'archived': 'Archived',
        'pending': 'Pending',
        'completed': 'Completed'
      }
      return statusMap[status] || status
    }

    const getStatusClasses = (status) => {
      const baseClasses = 'px-2 py-1 text-xs rounded-full'
      const statusClasses = {
        'active': 'bg-green-100 text-green-800',
        'inactive': 'bg-red-100 text-red-800',
        'archived': 'bg-gray-100 text-gray-800',
        'pending': 'bg-yellow-100 text-yellow-800',
        'completed': 'bg-blue-100 text-blue-800'
      }
      return `${baseClasses} ${statusClasses[status] || 'bg-gray-100 text-gray-800'}`
    }

    const handleSearch = () => { 
      currentPage.value = 1 
    }

    const toggleSort = (field) => {
      if (sortBy.value === field) {
        // Toggle direction if same field
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc'
      } else {
        // Set new field with default ascending order
        sortBy.value = field
        sortDirection.value = 'asc'
      }
    }

    const openModal = (item) => { 
      currentItem.value = item
      isModalOpen.value = true
    }
    
    const closeModal = () => {
      isModalOpen.value = false
      currentItem.value = null
      formData.value = {}
      errors.value = {}
    }
    
    const handleConfirm = async () => {
      try {
        if (currentItem.value) {
          // Update existing item
          await props.updateItem(props.getId(currentItem.value), formData.value)
          Swal.fire('Success', `${props.moduleNameSingular} updated successfully`, 'success')
        } else {
          // Add new item
          await props.addItem(formData.value)
          Swal.fire('Success', `${props.moduleNameSingular} added successfully`, 'success')
        }
        closeModal()
        // Refresh data
        await props.fetchData()
      } catch (error) {
        Swal.fire('Error', error.message, 'error')
      }
    }

    const confirmDelete = async (item) => { 
      const result = await Swal.fire({
        title: 'Are you sure?',
        text: `You are about to delete this ${props.moduleNameSingular}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
      })
      
      if (result.isConfirmed) {
        try {
          await props.deleteItem(props.getId(item))
          Swal.fire('Deleted!', `${props.moduleNameSingular} has been deleted.`, 'success')
          // Refresh data
          await props.fetchData()
        } catch (error) {
          Swal.fire('Error', error.message, 'error')
        }
      }
    }

    // Function to open permission modal
    const openPermissionModal = (item) => {
      emit('open-permission-modal', item)
    }

    onMounted(() => {
      props.fetchData()
    })

    return { 
      searchQuery, 
      filteredData, 
      paginatedData, 
      visiblePages, 
      currentPage, 
      itemsPerPage,
      pageSizeOptions,
      totalPages,
      sortBy,
      sortDirection,
      isModalOpen,
      currentItem,
      formData,
      errors,
      isFormValid,
      handleSearch, 
      formatCurrency,
      formatNumber,
      formatDate,
      formatStatus,
      getStatusClasses,
      toggleSort,
      openModal, 
      closeModal,
      handleConfirm,
      confirmDelete,
      openPermissionModal
    }
  }
}
</script>