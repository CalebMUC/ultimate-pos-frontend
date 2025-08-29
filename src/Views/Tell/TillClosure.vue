<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <!-- Page Header -->
    <div class="mb-6">
      <h1 class="text-xl font-bold text-gray-800">Till Closure</h1>
      <p class="text-gray-600 mt-2">Cashier closes their till by submitting counted amounts for supervisor approval.</p>
    </div>

    <!-- Till Selection -->
    <div class="bg-white rounded-2xl shadow-sm p-5 mb-6 border border-gray-100">
      <label for="till" class="block font-semibold text-gray-700 mb-3 text-sm">Select Till</label>
      <select
        v-model="selectedTill"
        id="till"
        class="w-full text-xs border border-gray-200 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200 appearance-none bg-white bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNNC42IDZsMy40IDMuNCAzLjQtMy40IiBzdHJva2U9IiA5Q0EwQTYiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz48L3N2Zz4=')] bg-[position:right_1rem_center] bg-no-repeat pr-10"
      >
        <option disabled value="">-- Select a Till --</option>
        <option v-for="till in tills" :key="till.id" :value="till.id">
          {{ till.name }} - Balance: {{ formatCurrency(till.expectedCash + till.expectedCard + till.expectedMobile) }}
        </option>
      </select>
    </div>

    <!-- Expected vs Actual -->
    <div v-if="selectedTillDetails" class="bg-white rounded-2xl shadow-sm p-6 border border-gray-100">
      <h2 class="text-sm font-bold mb-6 text-gray-800 flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        Expected vs Counted Amounts
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
        <div v-for="method in paymentMethods" :key="method.key" class="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div class="flex items-center mb-3">
            <div class="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="method.icon" />
              </svg>
            </div>
            <div>
              <h3 class="font-semibold text-gray-800">{{ method.label }}</h3>
              <p class="text-sm text-gray-500">Expected: {{ formatCurrency(selectedTillDetails[method.expectedKey]) }}</p>
            </div>
          </div>
          
          <div class="relative">
            <span class="absolute left-3 top-3 text-gray-500 font-medium">$</span>
            <input
              type="number"
              v-model.number="actuals[method.key]"
              placeholder="0.00"
              min="0"
              step="0.01"
              class="w-full pl-8 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              @focus="highlightInput(method.key)"
              @blur="unhighlightInput(method.key)"
              :class="{ 'ring-2 ring-indigo-300': highlightedInput === method.key }"
            />
          </div>
        </div>
      </div>

      <!-- Variance Section -->
      <div class="mt-8 p-5 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl border border-gray-200">
        <h3 class="font-semibold text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Variance Summary
        </h3>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div v-for="method in paymentMethods" :key="method.key" class="bg-white p-4 rounded-lg border border-gray-200 shadow-xs">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">{{ method.label }}</span>
              <span
                class="font-semibold px-2 py-1 rounded-md text-sm"
                :class="getVarianceClass(variances[method.key])"
              >
                {{ formatCurrency(variances[method.key]) }}
              </span>
            </div>
            <div class="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
              <div 
                class="h-full transition-all duration-500"
                :class="getVarianceBarClass(variances[method.key])"
                :style="{ width: Math.min(Math.abs(variances[method.key]) / selectedTillDetails[method.expectedKey] * 100, 100) + '%' }"
              ></div>
            </div>
          </div>
        </div>
        
        <!-- Total Variance -->
        <div class="mt-5 pt-4 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <span class="font-semibold text-gray-800">Total Variance</span>
            <span :class="getVarianceClass(totalVariance)" class="font-bold">
              {{ formatCurrency(totalVariance) }}
            </span>
          </div>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="mt-8 flex justify-end">
        <button
          @click="submitClosure"
          :disabled="!isFormValid"
          class="px-8 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-200 flex items-center shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Submit for Review
        </button>
      </div>
    </div>

    <!-- Empty State -->
    <div v-else class="bg-white rounded-2xl shadow-sm p-8 border border-gray-100 text-center">
      <div class="max-w-md mx-auto">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto text-gray-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
        <h3 class="text-xl font-semibold text-gray-700 mb-2">No Till Selected</h3>
        <p class="text-gray-500">Please select a till from the dropdown above to begin the closure process.</p>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";

export default {
  name: "TillClosure",
  setup() {
    // Dummy tills
    const tills = ref([
      {
        id: 1,
        name: "Till 1",
        expectedCash: 5000,
        expectedCard: 3000,
        expectedMobile: 2000,
      },
      {
        id: 2,
        name: "Till 2",
        expectedCash: 4000,
        expectedCard: 2500,
        expectedMobile: 1500,
      },
    ]);

    const selectedTill = ref("");
    const actuals = ref({ cash: 0, card: 0, mobile: 0 });
    const highlightedInput = ref(null);

    const paymentMethods = [
      { 
        key: "cash", 
        label: "Cash", 
        expectedKey: "expectedCash",
        icon: "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
      },
      { 
        key: "card", 
        label: "Card", 
        expectedKey: "expectedCard",
        icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
      },
      { 
        key: "mobile", 
        label: "Mobile", 
        expectedKey: "expectedMobile",
        icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
      },
    ];

    const selectedTillDetails = computed(() =>
      tills.value.find((t) => t.id === selectedTill.value)
    );

    const variances = computed(() => {
      if (!selectedTillDetails.value) return { cash: 0, card: 0, mobile: 0 };
      return {
        cash: actuals.value.cash - selectedTillDetails.value.expectedCash,
        card: actuals.value.card - selectedTillDetails.value.expectedCard,
        mobile: actuals.value.mobile - selectedTillDetails.value.expectedMobile,
      };
    });

    const totalVariance = computed(() => {
      return Object.values(variances.value).reduce((sum, variance) => sum + variance, 0);
    });

    const isFormValid = computed(() => {
      return selectedTill.value !== "" && 
             Object.values(actuals.value).every(val => val !== null && val !== undefined && val >= 0);
    });

    const formatCurrency = (amount) => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2
      }).format(amount);
    };

    const getVarianceClass = (variance) => {
      if (variance === 0) return "text-green-800 bg-green-100";
      if (variance > 0) return "text-blue-800 bg-blue-100";
      return "text-red-800 bg-red-100";
    };

    const getVarianceBarClass = (variance) => {
      if (variance === 0) return "bg-green-500";
      if (variance > 0) return "bg-blue-500";
      return "bg-red-500";
    };

    const highlightInput = (field) => {
      highlightedInput.value = field;
    };

    const unhighlightInput = () => {
      highlightedInput.value = null;
    };

    const submitClosure = () => {
      if (!selectedTillDetails.value) {
        alert("Please select a till first!");
        return;
      }
      
      console.log("Submitting Till Closure:", {
        till: selectedTillDetails.value,
        actuals: actuals.value,
        variances: variances.value,
        status: "Pending Supervisor Review",
      });
      
      alert("Till closure submitted for supervisor review.");
      
      // Reset form
      selectedTill.value = "";
      actuals.value = { cash: 0, card: 0, mobile: 0 };
    };

    return {
      tills,
      selectedTill,
      actuals,
      paymentMethods,
      selectedTillDetails,
      variances,
      totalVariance,
      isFormValid,
      highlightedInput,
      formatCurrency,
      getVarianceClass,
      getVarianceBarClass,
      highlightInput,
      unhighlightInput,
      submitClosure,
    };
  },
};
</script>

<style scoped>
/* Custom styles for number input arrows */
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type="number"] {
  -moz-appearance: textfield;
}
</style>