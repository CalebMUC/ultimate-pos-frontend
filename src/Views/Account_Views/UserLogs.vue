<template>
  <section class="flex-1 p-2 md:p-1 w-full rounded-lg ">
    <span class="text-xl md:text-2xl font-semibold px-0 block ">Activity Logs</span>

    <div class="overflow-x-auto bg-gray-200 shadow-lg mt-2 rounded">
      <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 text-xs md:text-sm rounded">
        <thead class="ltr:text-left rtl:text-right bg-gray-100 sticky top-0 z-10">
          <tr>
            <th class="whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">ID</th>
            <th class="whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Module</th>
            <th class="whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Time</th>
            <th class="hidden sm:table-cell whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Request</th>
            <th class="hidden md:table-cell whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Status</th>
            <th class="hidden lg:table-cell whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Response</th>
            <th class="whitespace-nowrap px-2 md:px-4 py-2 font-medium text-gray-900">Action</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            class="bg-white border-4 border-gray-200"
            v-for="(transaction, index) in data"
            :key="transaction.id"
          >
            <td class="py-2 px-2 md:px-4 text-center">{{ index + 1 }}.</td>
            <td class="whitespace-nowrap px-2 md:px-4 py-2 text-gray-700">{{ transaction.campaignID }}</td>
            <td class="whitespace-nowrap px-2 md:px-4 py-2 text-gray-700">{{ transaction.SenderID }}</td>
            <td class="hidden sm:table-cell whitespace-nowrap px-2 md:px-4 py-2 text-gray-700">{{ transaction.PhoneNo }}</td>
            <td class="hidden md:table-cell whitespace-nowrap px-2 md:px-4 py-2 text-gray-700">{{ transaction.status }}</td>
            <td class="hidden lg:table-cell whitespace-nowrap px-2 md:px-4 py-2 text-gray-700">{{ transaction.createdat }}</td>
            <td class="whitespace-nowrap px-2 md:px-4 py-2 text-gray-700 text-center">..</td>
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
   name: "UserLogs",
   setup() { 


      return {

}

   }

};

 </script>