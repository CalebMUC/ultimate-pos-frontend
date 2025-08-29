<template>
  <section class="w-full p-1 sm:p-6">
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3">
      <h1 class="text-xl sm:text-2xl font-bold mb-2 sm:mb-0">Teller Management</h1>
      <span class="px-2 sm:px-4 font-semibold text-sm sm:text-base">Date: 12/05/2025</span>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-2 sm:p-4 mt-1">
      <!-- Responsive grid: 1 col on mobile, 2 cols on sm+ -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-1">
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 font-semibold text-xs sm:text-sm">No of Cashiers/Users</p>
          <p class="text-lg font-semibold">{{ 0 }}</p>
        </div>
        <div class="bg-white p-4 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-xs sm:text-sm font-semibold">Active Cashiers</p>
          <p class="text-lg font-semibold">{{ 0 }}</p>
        </div>
        <div class="bg-white p-3 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-xs sm:text-sm font-semibold">Total Income Today</p>
          <div class="p-2">
            <p class="text-gray-500 text-xs sm:text-sm">Mpesa : {{ 12 }}</p>
            <p class="text-gray-500 text-xs sm:text-sm">Cash : {{ 12 }}</p>
          </div>
        </div>
        <div class="bg-white p-3 sm:p-6 shadow-md rounded-lg">
          <p class="text-gray-500 text-xs sm:text-sm font-semibold">Total Income</p>
          <div class="p-2">
            <p class="text-gray-500 text-xs sm:text-sm">Clear Balance : {{ 12 }}</p>
            <p class="text-gray-500 text-xs sm:text-sm">Opening Balance : {{ 12 }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Make table container scrollable horizontally on small screens -->
    <div class="overflow-x-auto mt-3 rounded-sm">
      <p class="text-gray-700 mt-2 font-semibold p-1 text-sm sm:text-base">Cashier List</p>
      <table class="min-w-full divide-y divide-gray-200  table-auto">
        <thead class="sticky top-0 bg-gray-50">
          <tr class="bg-gray-50 border-b">
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">User Name</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Clear Balance</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Opening Balance</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Balance</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-2 md:px-4 py-2 md:py-3 text-xs md:text-sm sm:px-6 text-left  sm:text-sm font-medium text-gray-500 uppercase tracking-wider">Action</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">Admin</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">12000</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">12000</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">2000</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">Active</td>
            <td class="px-3 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base">
              <div class="flex space-x-3">
                <button class="text-blue-600 hover:text-blue-800 text-xs sm:text-sm">Edit</button>
                <button class="text-red-600 hover:text-red-800 text-xs sm:text-sm">Close</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>


 <script>
  import {onMounted, computed,watch,ref} from 'vue'
    import {Useuserstore} from '../../store/userstore'
  import { usesenderstore } from '../../store/SenderIdStore'


 export default {
   name: "Teller",
   setup() { 


      return {

}

   }

};

 </script>