<template>
  <div class="rounded-xl border border-gray-200 bg-white h-full shadow-sm">
    <!-- Header Section -->
    <div class="p-4 border-b border-gray-200">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">My Suppliers</h1>
          <p class="text-sm text-gray-500 mt-1">Manage your supplier relationships</p>
        </div>
        
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div class="relative flex-grow">
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
              </svg>
            </div>
            <input
              v-model="searchQuery"
              id="Search"
              @input="supplierSearch"
              type="text"
              placeholder="Search suppliers..."
              class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
          <button
            @click="openModal(null)"
            class="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <svg class="-ml-1 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add New Supplier
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-if="isLoading" class="p-8 flex justify-center items-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
    </div>

    <!-- Table Section -->
    <div v-else class="overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <!-- Sortable Headers -->
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="handleSort('supplierId')"
              >
                ID
                <span v-if="sortField === 'supplierId'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="handleSort('supplierName')"
              >
                Supplier
                <span v-if="sortField === 'supplierName'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                @click="handleSort('supplierType')"
              >
                Type
                <span v-if="sortField === 'supplierType'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-gray-100"
                @click="handleSort('contractStartDate')"
              >
                Start Date
                <span v-if="sortField === 'contractStartDate'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th 
                scope="col" 
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell cursor-pointer hover:bg-gray-100"
                @click="handleSort('contractEndDate')"
              >
                End Date
                <span v-if="sortField === 'contractEndDate'" class="ml-1">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Status
              </th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in paginatedSuppliers" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">{{ item.supplierId }}</span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">{{ item.supplierName }}</div>
                <div class="text-xs text-gray-500">{{ item.industry }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {{ item.supplierType }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm text-gray-900">{{ item.phone }}</div>
                <div class="text-xs text-gray-500">{{ item.email }}</div>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.contractStartDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
                {{ formatDate(item.contractEndDate) }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                <span :class="{
                  'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                  'bg-green-100 text-green-800': item.supplierStatus === true,
                  'bg-red-100 text-red-800': item.supplierStatus === false
                }">
                  {{ item.supplierStatus ? 'Active' : 'Inactive' }}
                </span>
              </td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <div class="flex items-center space-x-2">
                  <button 
                    @click="openModal(item)"
                    class="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    title="Edit"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <router-link 
                    :to="{ path: `/supplies/${item.supplierId}` }"
                    class="text-gray-600 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-50 transition-colors"
                    title="View Details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  </router-link>
                </div>
              </td>
            </tr>
            
            <tr v-if="paginatedSuppliers.length === 0">
              <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
                <div class="flex flex-col items-center justify-center py-8">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  <p class="mt-2 text-sm font-medium text-gray-600">No suppliers found</p>
                  <p class="text-xs text-gray-500 mt-1">Try adjusting your search or add new suppliers</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div v-if="filteredSupplierData.length > 0" class="px-6 py-5 border-t border-gray-200 flex items-center justify-between">
        <div class="flex flex-1 justify-between sm:hidden">
          <button 
            @click="currentPage = Math.max(1, currentPage - 1)"
            :disabled="currentPage === 1"
            class="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Previous
          </button>
          <button 
            @click="currentPage = Math.min(totalPages, currentPage + 1)"
            :disabled="currentPage === totalPages"
            class="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        
        <div class="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
          <div>
            <p class="text-sm text-gray-700">
              Showing <span class="font-medium">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
              to <span class="font-medium">{{ Math.min(currentPage * itemsPerPage, filteredSupplierData.length) }}</span>
              of <span class="font-medium">{{ filteredSupplierData.length }}</span> results
            </p>
          </div>
          
          <div>
            <nav class="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
              <button
                @click="currentPage = 1"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">First</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <button
                @click="currentPage = Math.max(1, currentPage - 1)"
                :disabled="currentPage === 1"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Previous</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <template v-for="page in visiblePages" :key="page">
                <button
                  @click="currentPage = page"
                  :class="[
                    'relative inline-flex items-center px-4 py-2 border text-sm font-medium',
                    page === currentPage 
                      ? 'z-10 bg-blue-50 border-blue-500 text-blue-600' 
                      : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                  ]"
                >
                  {{ page }}
                </button>
              </template>
              
              <button
                @click="currentPage = Math.min(totalPages, currentPage + 1)"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Next</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
              
              <button
                @click="currentPage = totalPages"
                :disabled="currentPage === totalPages"
                class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span class="sr-only">Last</span>
                <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clip-rule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal -->
    <div 
      v-if="isModalOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      @click.self="closeModal"
    >
      <div class="bg-white p-6 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h3 class="text-lg font-semibold text-gray-800">
            {{ currentSupplier ? 'Edit Supplier' : 'Add New Supplier' }}
          </h3>
          <button 
            @click="closeModal" 
            class="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Supplier Information -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Supplier Information</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Name *</label>
                <input 
                  v-model="formData.supplierName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier Type *</label>
                <input 
                  v-model="formData.supplierType" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                <input 
                  v-model="formData.industry" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">KRA PIN</label>
                <input 
                  v-model="formData.krapin" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Business License</label>
                <input 
                  v-model="formData.businessLicenseNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  v-model="formData.supplierStatus"
                  class="w-full border border-gray-300 rounded-md p-2 text-sm bg-white focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all"
                >
                  <option :value="true">Active</option>
                  <option :value="false">Inactive</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Contact Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Contact Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contact Name</label>
                <input 
                  v-model="formData.fullname" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input 
                  v-model="formData.email" 
                  type="email" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
                <input 
                  v-model="formData.phone" 
                  type="tel" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                  required
                />
              </div>
            </div>
          </div>

          <!-- Address Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Address Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Location Name</label>
                <input 
                  v-model="formData.locationName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Town</label>
                <input 
                  v-model="formData.town" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Postal Code</label>
                <input 
                  v-model="formData.postal" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>

          <!-- Contract Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Contract Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                <input 
                  v-model="formData.contractStartDate" 
                  type="date" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                <input 
                  v-model="formData.contractEndDate" 
                  type="date" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Contract Terms</label>
                <input 
                  v-model="formData.contractterms" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>

          <!-- Payment Details -->
          <div class="rounded-lg border border-gray-200 p-4">
            <h4 class="text-md font-medium text-gray-700 mb-3">Payment Details</h4>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Bank Name</label>
                <input 
                  v-model="formData.BankName" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input 
                  v-model="formData.BankaccountNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Branch</label>
                <input 
                  v-model="formData.BankBrach" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paybill Number</label>
                <input 
                  v-model="formData.paybill" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Paybill Account</label>
                <input 
                  v-model="formData.paybillaccountNumber" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Till Number</label>
                <input 
                  v-model="formData.TillNo" 
                  type="text" 
                  class="w-full border border-gray-300 rounded-md p-2 text-sm focus:ring-2 focus:ring-blue-400 focus:border-blue-400 transition-all" 
                />
              </div>
            </div>
          </div>
        </div>

        <div class="mt-6 flex justify-end gap-3">
          <button 
            @click="closeModal" 
            class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            Cancel
          </button>
          <button 
            @click="handleSaveSupplier" 
            class="px-4 py-2 bg-blue-600 rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition-colors"
          >
            {{ currentSupplier ? 'Update Supplier' : 'Add Supplier' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRoute } from 'vue-router';
import { useSuppliersStore } from '../store/SuppliersStore';
import { computed, onMounted, watch, ref } from 'vue';
import { errorState } from '../store/ErrorState';
import Swal from 'sweetalert2';

export default {
  setup() {
    const suppliersstore = useSuppliersStore();
    const isModalOpen = ref(false);
    const currentSupplier = ref(null);
    const searchQuery = ref('');
    const isLoading = ref(false);
    
    // Sorting and pagination
    const sortField = ref('supplierId');
    const sortDirection = ref('asc');
    const currentPage = ref(1);
    const itemsPerPage = ref(10);

    // Form data
    const formData = ref({
      supplierName: '',
      supplierType: '',
      industry: '',
      krapin: '',
      businessLicenseNumber: '',
      supplierStatus: true,
      fullname: '',
      email: '',
      phone: '',
      locationName: '',
      town: '',
      postal: '',
      contractStartDate: '',
      contractEndDate: '',
      contractterms: '',
      BankName: '',
      BankaccountNumber: '',
      BankBrach: '',
      TillNo: '',
      paybill: '',
      paybillaccountNumber: ''
    });

    onMounted(async () => {
      try {
        isLoading.value = true;
        await suppliersstore.getallSupliers();
      } catch (error) {
        showError('Failed to load suppliers', error);
      } finally {
        isLoading.value = false;
      }
    });

    // Computed properties
    const supplierdata = computed(() => suppliersstore.filterSuppliers);
    
    const filteredSupplierData = computed(() => {
      let result = [...supplierdata.value];
      
      // Apply sorting
      if (sortField.value) {
        result.sort((a, b) => {
          const field = sortField.value;
          const direction = sortDirection.value === 'asc' ? 1 : -1;
          
          // Handle different data types for proper sorting
          if (field === 'contractStartDate' || field === 'contractEndDate') {
            const dateA = new Date(a[field]);
            const dateB = new Date(b[field]);
            return (dateA - dateB) * direction;
          } else if (typeof a[field] === 'string') {
            return a[field].localeCompare(b[field]) * direction;
          } else {
            if (a[field] < b[field]) return -1 * direction;
            if (a[field] > b[field]) return 1 * direction;
            return 0;
          }
        });
      }
      
      return result;
    });

    const paginatedSuppliers = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredSupplierData.value.slice(start, end);
    });

    const totalPages = computed(() => {
      return Math.ceil(filteredSupplierData.value.length / itemsPerPage.value);
    });

    const visiblePages = computed(() => {
      const range = 2;
      const start = Math.max(1, currentPage.value - range);
      const end = Math.min(totalPages.value, currentPage.value + range);

      const pages = [];
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      return pages;
    });

    // Methods
    const formatDate = (dateString) => {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };

    const supplierSearch = () => {
      suppliersstore.setSearchSupplier(searchQuery.value);
      currentPage.value = 1;
    };

    const handleSort = (field) => {
      if (sortField.value === field) {
        sortDirection.value = sortDirection.value === 'asc' ? 'desc' : 'asc';
      } else {
        sortField.value = field;
        sortDirection.value = 'asc';
      }
      currentPage.value = 1;
    };

    const openModal = (supplier) => {
      currentSupplier.value = supplier;
      if (supplier) {
        // Pre-fill form for editing
        formData.value = {
          supplierName: supplier.supplierName,
          supplierType: supplier.supplierType,
          industry: supplier.industry,
          krapin: supplier.krapin,
          businessLicenseNumber: supplier.businessLicenseNumber,
          supplierStatus: supplier.supplierStatus,
          // fullname : supplier.name
          email: supplier.email,
          phone: supplier.phone,
          locationName: supplier.locationName,
          town: supplier.town,
          postal: supplier.postal,
          contractStartDate: supplier.contractStartDate,
          contractEndDate: supplier.contractEndDate,
          contractterms: supplier.contractTerms,
          BankName: supplier.bankName,
          BankaccountNumber: supplier.bank_AccountNumber,
          BankBrach: '',
          TillNo: supplier.till,
          paybill: supplier.paybill_BusinessNumber,
          paybillaccountNumber: supplier.paybill_Account
        };
      } else {
        // Reset form for new supplier
        formData.value = {
          supplierName: '',
          supplierType: '',
          industry: '',
          krapin: '',
          businessLicenseNumber: '',
          supplierStatus: true,
          fullname: '',
          email: '',
          phone: '',
          locationName: '',
          town: '',
          postal: '',
          contractStartDate: '',
          contractEndDate: '',
          contractterms: '',
          BankName: '',
          BankaccountNumber: '',
          BankBrach: '',
          TillNo: '',
          paybill: '',
          paybillaccountNumber: ''
        };
      }
      isModalOpen.value = true;
    };

    const closeModal = () => {
      isModalOpen.value = false;
      currentSupplier.value = null;
    };

    const generateSupplierId = () => {
      const now = new Date();
      const month = now.getMonth() + 1;
      const second = now.getSeconds();
      const minute = now.getMinutes();
      const hour = now.getHours();
      return "Sup_" + month + second + minute + hour;
    };

    const handleSaveSupplier = async () => {
      try {
        if (!formData.value.supplierName || !formData.value.supplierType || !formData.value.phone) {
          showError('Validation Error', 'Please fill in all required fields');
          return;
        }

        const supplierData = {
          supplier: [{
            supplierId: currentSupplier.value ? currentSupplier.value.supplierId : generateSupplierId(),
            supplierName: formData.value.supplierName,
            supplierType: formData.value.supplierType,
            industry: formData.value.industry,
            krapin: formData.value.krapin,
            businessLicenseNumber: formData.value.businessLicenseNumber,
            supplierStatus: formData.value.supplierStatus,
            remarks: formData.value.supplierStatus ? "Active supplier" : "Inactive supplier",
            createdBy: "system",
            updatedBy: currentSupplier.value ? "system" : "",
            email: formData.value.email,
            phone: formData.value.phone,
            locationName: formData.value.locationName,
            town: formData.value.town,
            postal: formData.value.postal,
            contractStartDate: formData.value.contractStartDate,
            contractEndDate: formData.value.contractEndDate,
            contractTerms: formData.value.contractterms,
            contractStatus: formData.value.supplierStatus,
            bankName: formData.value.BankName,
            bank_AccountNumber: formData.value.BankaccountNumber,
            till: formData.value.TillNo,
            paybill_BusinessNumber: formData.value.paybill,
            paybill_Account: formData.value.paybillaccountNumber
          }]
        };

        if (currentSupplier.value) {
          await suppliersstore.updateSupplier(supplierData);
          showSuccess('Supplier updated successfully');
        } else {
          await suppliersstore.Addsuplier(supplierData);
          showSuccess('Supplier added successfully');
        }

        closeModal();
        await suppliersstore.getallSupliers();
      } catch (error) {
        showError('Failed to save supplier', error);
      }
    };

    const showSuccess = (message) => {
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        showConfirmButton: false,
        timer: 1500
      });
    };

    const showError = (title, error) => {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: title,
        text: error.message || error,
        showConfirmButton: true
      });
    };

    return {
      // State
      isModalOpen,
      currentSupplier,
      searchQuery,
      isLoading,
      sortField,
      sortDirection,
      currentPage,
      itemsPerPage,
      formData,
      
      // Computed
      supplierdata,
      filteredSupplierData,
      paginatedSuppliers,
      totalPages,
      visiblePages,
      
      // Methods
      formatDate,
      supplierSearch,
      handleSort,
      openModal,
      closeModal,
      handleSaveSupplier
    };
  }
};
</script>

<style scoped>
/* Custom scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* Smooth transitions for hover effects */
.hover-transition {
  transition: all 0.2s ease-in-out;
}

/* Ensure table cells don't wrap unnecessarily */
.whitespace-nowrap {
  white-space: nowrap;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

/* Scrollable modal content */
.max-h-[90vh] {
  max-height: 90vh;
}

.overflow-y-auto {
  overflow-y: auto;
}

/* Focus styles for better accessibility */
input:focus, select:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.5);
}
</style>