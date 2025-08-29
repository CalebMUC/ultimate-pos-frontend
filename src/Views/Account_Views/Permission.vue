<template>
  <section class="w-full lg:w-full md:p-2 sm:p-4">
    <div class="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-2">
      <h1 class="text-xl sm:text-2xl font-bold">Permissions</h1>
      <span class="px-4 font-semibold text-sm sm:text-base">Role: ADMIN</span>
    </div>

    <div class="bg-white rounded-lg shadow-lg p-4 sm:p-6 mt-3">
      <div class="flex flex-wrap justify-between items-center mb-4 sm:mb-6 gap-2">
        <div class="relative w-full sm:w-auto">
          <input type="text" placeholder="Search permissions..." class="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"/>
          <svg class="w-5 h-5 text-gray-400 absolute left-3 top-2.5" fill="none"stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round"  stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
          </svg>
        </div>
      </div>

      <!-- Permissions Sections -->
      <div class="space-y-6">
        <!-- Template block for each permission group -->
        <div v-for="section in sections":key="section.title" class="border rounded-lg p-4">
          <div class="flex flex-wrap justify-between items-center mb-4">
            <h3 class="text-base sm:text-lg font-medium text-black">{{ section.title }}</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <label v-for="permission in section.permissions" :key="permission" class="flex items-center">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span class="ml-2 text-sm text-gray-600">{{ permission }}</span>
            </label>
          </div>

           <label class="flex items-center mt-2 sm:mt-0 font-semibold">
              <input type="checkbox" class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
              <span class="ml-2 text-sm text-black">Select All</span>
            </label>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const sections = [
  {
    title: 'User Management',
    permissions: ['Create Users', 'Edit Users', 'Delete Users', 'View Users'],
  },
  {
    title: 'Contacts & Groups',
    permissions: [
      'Add Contact',
      'Add Contact Group',
      'Delete Contact',
      'Delete Contact Group',
      'View Contact',
      'View Contact Group',
      'Edit Contact Group',
      'Edit Contact',
    ],
  },
  {
    title: 'SMS & Campaigns',
    permissions: [
      'Send Sms',
      'View Sent Messages',
      'Add Sms Template',
      'Edit Sms Template',
      'Delete Sms Template',
    ],
  },
  {
    title: 'Reports',
    permissions: ['Generate Reports', 'Preview Reports', 'Print Reports'],
  },
];
</script>



 <script>
  import {onMounted, computed,watch,ref} from 'vue'
  import {Useuserstore} from '../../store/userstore'
  import { usesenderstore } from '../../store/SenderIdStore'


 export default {
   name: "Permissions",
   setup() { 


      return {

}

   }

};

 </script>