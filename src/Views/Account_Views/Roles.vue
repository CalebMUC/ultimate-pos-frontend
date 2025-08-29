<template>
  <section class="w-full p-1 sm:p-6">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
      <h1 class="text-xl sm:text-2xl font-bold">Roles</h1>
    </div>

    <!-- Roles Section -->
    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6">
      <!-- Title + Search -->
      <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div class="relative w-full sm:w-auto">
          <input
            type="text"
            placeholder="Search roles..."
            class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <svg
            class="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
      </div>

      <!-- New Role -->
      <div class="mb-6">
        <div class="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="New role name"
            class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
          />
          <button
            class="w-full sm:w-auto bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm"
          >
            Create Role
          </button>
        </div>
      </div>

      <!-- Roles Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead>
            <tr class="bg-gray-50 border-b text-xs uppercase text-gray-500">
              <th class="px-4 py-3 text-left font-medium tracking-wider">Role Name</th>
              <th class="px-4 py-3 text-left font-medium tracking-wider">Permissions</th>
              <th class="px-4 py-3 text-left font-medium tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-4 whitespace-nowrap">Admin</td>
              <td class="px-4 py-4 whitespace-nowrap">12 permissions</td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
            <tr>
              <td class="px-4 py-4 whitespace-nowrap">Editor</td>
              <td class="px-4 py-4 whitespace-nowrap">8 permissions</td>
              <td class="px-4 py-4 whitespace-nowrap">
                <div class="flex space-x-3">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>


<script>
  import {onMounted, computed,watch,ref} from 'vue'
    import {Useuserstore} from '../../store/userstore'
  import { usesenderstore } from '../../store/SenderIdStore'


 export default {
   name: "Roles",
   setup() { 


      return {

}

   }

};

 </script>