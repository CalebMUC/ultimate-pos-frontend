
     
   <template>
  <main class="bg-white p-4 sm:p-6 lg:p-8">
   
    <div class="flex items-center justify-between mb-4">
      <span class="text-xl sm:text-2xl font-semibold">Sent Messages</span>

      <label for="Search" class="sr-only">Search</label>
      <input
        type="text"
        id="Search"
        @input="updateSearch"
        placeholder="Search for...anything"
        class="w-full sm:w-1/3 rounded-md border border-gray-600 py-2.5 pr-10 text-sm sm:text-base"
      />
    </div>



    <div class="overflow-x-auto rounded-lg bg-gray-300">
      <table class="min-w-full divide-y-2 divide-gray-200 text-sm">
        <thead class="bg-gray-100">
          <tr>
            <th class="whitespace-nowrap px-2 py-2 font-medium text-gray-900">#</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Text Header</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Sender ID</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Phone no</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Status</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Message ID</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Date</th>
            <th class="whitespace-nowrap px-3 py-2 font-medium text-gray-900">Time</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-200 bg-white">
          <tr
            v-for="(sms, index) in paginatedSentMessages"
            :key="sms.id"
            @click="viewMessage(sms.header, sms.messageId, sms.message, sms.number, sms.cost)"
            class="cursor-pointer hover:bg-gray-100"
          >
            <td class="px-2 py-2">{{ index + 1 }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.header }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.senderid }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.number }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.status }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.messageId }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.date }}</td>
            <td class="whitespace-nowrap px-3 py-2 text-gray-700">{{ sms.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Pagination Controls -->
    <div class="flex flex-col sm:flex-row justify-between items-center mt-4 gap-3 sm:gap-0">
      <button
        @click="prevPage"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        :disabled="currentPage === 1"
      >
        Previous
      </button>
      <span class="text-sm sm:text-base">
        Page {{ currentPage }} of {{ totalPages }}
      </span>
      <button
        @click="nextPage"
        class="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        :disabled="currentPage === totalPages"
      >
        Next
      </button>
    </div>

    <!-- Modal backdrop to add a new template -->
    <div
      v-if="isModalOpen"
      class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto p-4"
    >
      <div
        class="bg-white rounded-lg shadow-lg max-w-lg w-full max-h-[90vh] overflow-y-auto p-4 sm:p-6"
      >
        <div class="flex justify-between items-center mb-4">
          <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center flex-1">
            MESSAGE DETAILS
          </p>
          <button
            @click="closeModal"
            class="ml-4 px-2 py-1 bg-black text-white rounded"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black mb-1">PHONE NUMBER</label>
            <input
              type="text"
              v-model="phone"
              class="w-full rounded-lg p-3 text-sm shadow-sm border border-gray-700 focus:border-black focus:ring-black"
              placeholder="Phone Number"
            />
          </div>

          <div>
            <label class="block text-sm text-black mb-1">MESSAGE ID</label>
            <input
              type="text"
              v-model="messageid"
              class="w-full rounded-lg p-3 text-sm shadow-sm border border-gray-700 focus:border-black focus:ring-black"
              placeholder="Message ID"
            />
          </div>

          <div>
            <label class="block text-sm text-black mb-1">TEXT HEADER</label>
            <input
              type="text"
              v-model="Textheader"
              class="w-full rounded-lg p-3 text-sm shadow-sm border border-gray-700 focus:border-black focus:ring-black"
              placeholder="Text Header"
            />
          </div>

          <div>
            <label class="block text-sm text-black mb-1">TEXT COST</label>
            <input
              type="text"
              v-model="TextCost"
              class="w-full rounded-lg p-3 text-sm shadow-sm border border-gray-700 focus:border-black focus:ring-black"
              placeholder="Text Cost"
            />
          </div>

          <div>
            <label class="block text-sm text-black mb-1">TEXT MESSAGE</label>
            <textarea
              id="message"
              rows="4"
              v-model="Textmessage"
              class="w-full rounded-lg p-2 text-sm shadow-sm border border-gray-700 focus:border-black focus:ring-black"
              placeholder="Type your message here (maximum 2000 characters)"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

   
   
   <script>
   import { useMessageStore } from  '../store/MessageStore';
   import {ref, computed , watch,onMounted} from 'vue';
   import { errorState } from '../store/ErrorState';

   
   export default {
     setup() {
    const sentmessagestore = useMessageStore();      
    const isModalOpen = ref(false); 
    const phone =ref('');
    const messageid = ref('');
    const Textheader = ref('');
    const Textmessage = ref('');
    const TextCost = ref('');
    let currentPage = ref(1);
    const itemsPerPage = 12;
 
      // Make gpinia etters reactive using computed
    const data = computed(() => sentmessagestore.getData);
    const filteredItems = computed(() => sentmessagestore.filteredMessage);
    const isLoading = computed(() => sentmessagestore.isLoading);
    const error = computed(() => sentmessagestore.getError);
    const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));
 
 
   onMounted(()=>{
     sentmessagestore.fetchMessages();
   })
 
      // paginate filtered items
      const paginatedSentMessages = computed(() => {
       const start = (currentPage.value - 1) * itemsPerPage;
       return sentmessagestore.filteredMessage.slice(start, start + itemsPerPage);
     }); 

     watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		}); 
		    

 
 
       const nextPage = () => { 
         if (currentPage.value < totalPages.value) currentPage.value++;
       };
 
       const prevPage = () => {
         if (currentPage.value > 1) currentPage.value--;
       };
 
   const viewMessage = ( header, messageId, message, number, cost) =>{
         openModal();
        phone.value = number;
        messageid.value = messageId;
        Textheader.value = header;
        Textmessage.value = message;
        TextCost.value = cost;
   }
 
 
   const updateSearch = (e) => { 
     currentPage.value = 1;
         sentmessagestore.setSearchTerm(e.target.value);
       };
   
   const openModal = () => {
     isModalOpen.value = true;
   };
   
   const closeModal = () => {
     isModalOpen.value = false;
   };
       
       return {
         data,
         isLoading,
         error,
         openModal,
         closeModal,
         isModalOpen,
         sentmessagestore,
         updateSearch,
         filteredItems,
         viewMessage,
        phone ,
        messageid,
        Textheader,
        Textmessage,
        TextCost,
        paginatedSentMessages,
        currentPage,
       totalPages,
       nextPage,
       prevPage,
 
       };
     }
   };
   </script>