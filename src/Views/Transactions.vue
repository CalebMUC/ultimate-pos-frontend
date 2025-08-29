<template>
  <main class="p-4 md:p-6">
    <!-- Header and Search Bar -->
    <div class="mb-6">
      <div class="flex flex-col space-y-4 md:space-y-0 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">Transaction History</h1>
          <p class="text-sm text-gray-500 mt-1">View and manage all transactions</p>
        </div>
        <div class="relative w-full md:w-64">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
            </svg>
          </div>
          <input
            type="text"
            id="Search"
            @input="productSearch"
            placeholder="Search transactions..."
            class="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent sm:text-sm"
          />
        </div>
      </div>
    </div>

    <!-- Table Section -->
    <div class="bg-white rounded-xl shadow-sm overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cashier</th>
              <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="(item, index) in filteredTransactions" :key="index" class="hover:bg-gray-50 transition-colors">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ item.transactionID }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.quantity }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ksh {{ item.amountRecieved }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ksh {{ item.cashChange }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Ksh {{ item.totalCost }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.totalDiscount }}%</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ formatDate(item.createdOn) }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ item.createdBy }}</td>
              <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                <button 
                  @click="openproducts(item.transactionID)"
                  class="text-blue-600 hover:text-blue-900 mr-3 transition-colors"
                  title="View products"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Empty State -->
    <div v-if="filteredTransactions.length === 0" class="mt-12 text-center">
      <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      <h3 class="mt-2 text-sm font-medium text-gray-900">No transactions found</h3>
      <p class="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
    </div>

    <!-- Products Modal -->
    <div v-if="isModalProductsOpen" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <!-- Background overlay -->
        <div class="fixed inset-0 transition-opacity" aria-hidden="true">
          <div class="absolute inset-0 bg-gray-500 opacity-75" @click="closeModal"></div>
        </div>

        <!-- Modal content -->
        <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <div class="flex justify-between items-center">
                  <h3 class="text-lg leading-6 font-medium text-gray-900">
                    Transaction #{{ TRXID }} Products
                  </h3>
                  <button @click="closeModal" class="text-gray-400 hover:text-gray-500">
                    <span class="sr-only">Close</span>
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <div class="mt-4">
                  <ul class="divide-y divide-gray-200">
                    <li v-for="(product, pIndex) in allParsedProducts" :key="pIndex" class="py-4">
                      <div class="flex items-center justify-between">
                        <div class="flex items-center">
                          <div class="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </div>
                          <div class="ml-4">
                            <h4 class="text-sm font-medium text-gray-900">{{ product.ProductName }}</h4>
                            <p class="text-sm text-gray-500">Qty: {{ product.Quantity }}</p>
                          </div>
                        </div>
                        <div class="text-right">
                          <p class="text-sm font-medium text-gray-900">Ksh {{ product.Price }}</p>
                          <p v-if="product.Discount > 0" class="text-xs text-red-500">{{ product.Discount }}% discount</p>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button type="button" @click="closeModal" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

    
    
    <script>
    import { useSaleStore } from '../store/SaleStore';
    import { useTransactionStore } from '../store/TransactionsStore';
    import { ref,  watch, onMounted, computed } from 'vue';
   import { errorState } from '../store/ErrorState'; 
    
    export default {
      setup() {
        const transactionStore = useTransactionStore();
        const saleStore = useSaleStore();
        const isModalProductsOpen = ref(false); 
        const TRXID = ref('');

        onMounted(() => { 
           let token = localStorage.getItem('token'); 
          transactionStore.fetchTransactions();
        });

        watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 


        const filteredTransactions = computed(() => transactionStore.filterTransactions);
    
    const openproducts = (transactionID) => {
      isModalProductsOpen.value = true;
      TRXID.value= transactionID;
    }; 

     const formatDate = (dateString) => {
      if (!dateString) return '';
      const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    };
    
    const closeModal = () => {
      isModalProductsOpen.value = false;
    };

     // Function to parse transactionproducts from JSON string to an array
     const allParsedProducts = computed(() => {
      // Flatten all the transactionproducts from all filtered transactions
      return filteredTransactions.value
        .flatMap(transaction => JSON.parse(transaction.transactionproducts));
    });
       
    
       
        
        return {

        openproducts,
          closeModal,
          isModalProductsOpen,
          filteredTransactions,
          saleStore,
          transactionStore,
          TRXID,
          allParsedProducts,
          formatDate
        //   fetchData: contactStore.fetchData
        };
      }
    };
    </script>