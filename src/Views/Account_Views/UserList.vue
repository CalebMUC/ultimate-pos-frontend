<template>
  <section class="flex-1 w-full lg:p-2 md:p-1 rounded-lg shadow-lg relative">
      <span class="text-xl sm:text-2xl font-semibold sm:text-left px-1">Users</span>

        <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
        <button class="bg-orange-500 text-white px-4 py-2 rounded-lg self-end sm:self-auto" @click="openRecargeAccountModal">
            Add User
        </button>
        </div>

    <!-- User Details -->
    <div class="rounded-lg shadow-lg p-4 sm:p-6 bg-gray-200 ">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
        <div class="relative w-full sm:w-auto">
          <input type="text" placeholder="Search user..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-gray-50 border-b">
            <tr>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">User Name</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Role</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">IsLogged In</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Status</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Created On</th>
              <th class="px-4 py-3 text-left font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-4 py-3 whitespace-nowrap">Admin</td>
              <td class="px-4 py-3 whitespace-nowrap">Admin Role</td>
              <td class="px-4 py-3 whitespace-nowrap">Yes</td>
              <td class="px-4 py-3 whitespace-nowrap">Active</td>
              <td class="px-4 py-3 whitespace-nowrap">2025-06-01</td>
              <td class="px-4 py-3 whitespace-nowrap">
                <div class="flex gap-2">
                  <button class="text-blue-600 hover:text-blue-800">Edit</button>
                  <button class="text-red-600 hover:text-red-800">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Add User Modal -->
    <div
      v-if="isopenRechargeModal"
      class="fixed inset-0 flex justify-center items-center bg-black bg-opacity-40 z-50 p-4"
    >
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold uppercase text-gray-700">Add User</p>
          <button @click="closeRechargeModal" class="bg-black text-white px-2 py-1 rounded">x</button>
        </div>

        <form class="space-y-4">
          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Username</label>
            <input
              v-model="Username"
              type="text"
              placeholder="Enter username"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Email Address</label>
            <input
              v-model="Email"
              type="email"
              placeholder="name@example.com"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label class="block mb-1 text-sm font-medium text-gray-900">Password</label>
            <input
              v-model="Password"
              type="password"
              placeholder="••••••••"
              class="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div class="pt-2">
            <button
              type="button"
              @click="uregister"
              class="w-full bg-blue-600 text-white text-sm font-semibold py-2 rounded-lg hover:bg-blue-700"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>


<script>
  import {onMounted, computed,watch,ref} from 'vue'
  import {Useuserstore} from '../../store/userstore'
  import { usesenderstore } from '../../store/SenderIdStore'


 export default {
   name: "UserLogs",
   setup() { 


      return {

}

   }

};

 </script>