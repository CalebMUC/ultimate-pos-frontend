<template>
  <div class="bg-gray-50 min-h-screen">
    <HeaderComponent />
    
    <div class="flex flex-col lg:flex-row mx-4 mt-4 gap-6">
      <!-- Products Section -->
      <div class="w-full lg:w-2/5 bg-white shadow-sm rounded-lg border border-gray-200 flex flex-col">
        <productSearch
          v-model:searchQuery="searchQuery"
          v-model:selectedCategory="category"
          :categories="categ"
          @search-enter="handleSearchEnter"
          ref="searchSection"
        />
        
        <productGrid
          :products="filteredProducts"
          :has-products="hasSearchResults"
          @select-product="SelectedItem"
        />
      </div>

      <cartSection
        :items="selectedItems"
        @update-quantity="updateItemQuantity"
        @remove-item="removeItem"
      />
    </div>

    <orderSummary
      :items-count="NoItems"
      :discount="Discount"
      :shipping="Shipping"
      :vat="Vat"
      :total="TtotalCost"
      @open-cash="OpenCash"
      @open-mpesa="OpenMpesa"
      @open-credit="OpencCredit"
    />

    <MpesaModal
      :is-open="isMpesaOpen"
      @close="CloseMpesa"
      @submit="PayViaMpesa"
    />
    
    <CashModal
      :is-open="isCashOpen"
      :total-cost="TtotalCost"
      @close="CloseCash"
      @submit="PayViaCash"
    />
    
    <CreditModal
      :is-open="isCreditOpen"
      :total-cost="TtotalCost"
      @close="CloseCredit"
      @submit="SubmitCredit"
    />
  </div>
</template>

<script>
import { useCategoryStore } from '../store/categoryStore';
import { UseInventoryStore } from '../store/InventoryStore';
import { useSaleStore } from '../store/SaleStore';
import { errorState } from '../store/ErrorState';
import { useCatalogueStore } from '../store/catalogueStore';
import Swal from 'sweetalert2';
import { ref, onMounted, watch, computed, nextTick } from 'vue';

// Import components
import Header from '../components/Sales/HeaderComponent/Header.vue';
import productSearch from '../components/Sales/ProductSearchSection/productSearch.vue';
import productGrid from '../components/Sales/ProductGrid/productGrid.vue';
import cartSection from '../components/Sales/CartSection/cartSection.vue';
import orderSummary from '../components/Sales/OrderSummary/orderSummary.vue';
import MpesaModal from '../components/Modals/MpesaModal.vue';
import CashModal from '../components/Modals/CashModal.vue';
import CreditModal from '../components/Modals/CreditModal.vue';

export default {
  name: 'SalePage',
  components: {
    Header,
    productSearch,
    productGrid,
    cartSection,
    orderSummary,
    MpesaModal,
    CashModal,
    CreditModal
  },
  setup() {
    const CategoryStore = useCategoryStore();
    const inventorystore = UseInventoryStore();
    const saleStore = useSaleStore();
    const CatalogStore = useCatalogueStore();

    // Refs and reactive data
    const searchQuery = ref('');
    const category = ref('');
    const isMpesaOpen = ref(false);
    const isCashOpen = ref(false);
    const isCreditOpen = ref(false);
    const selectedItems = ref([]);
    const NoItems = ref(0);
    const Discount = ref(0);
    const Shipping = ref(0);
    const Vat = ref(0);
    const TtotalCost = ref(0);
    const searchSection = ref(null);

    // Computed properties
    const categ = computed(() => CategoryStore.getData);
    const filteredProducts = computed(() => inventorystore.filterProducts);
    const hasSearchResults = computed(() => filteredProducts.value.length > 0);


    // Methods
    const handleSearchEnter = () => {
      const query = searchQuery.value.trim();
      if (!query) return;

      const exactMatch = filteredProducts.value.find(
        p => p.sku?.toLowerCase() == query.toLowerCase()
      );

      if (exactMatch) {
        SelectedItem(exactMatch);
        searchQuery.value = '';
        focusSearch();
      }
    };

    const focusSearch = () => {
      nextTick(() => {
        if (searchSection.value) {
          searchSection.value.focus();
        }
      });
    };

    const productSearch = (query) => {
      inventorystore.setSearchProduct(query);
    };

    const categorysearch = (categoryId) => {
      inventorystore.setSearchCategory(categoryId);
    };

    const updateItemQuantity = ({ item, quantity }) => {
      const itemprice = item.sellingPrice;
      if (quantity > 0) {
        const previousTotal = TtotalCost.value - item.subtotal;
        const subtotal = parseInt(quantity) * parseInt(itemprice);
        item.subtotal = subtotal;
        item.count = quantity;
        TtotalCost.value = subtotal + previousTotal;
        NoItems.value = selectedItems.value.reduce((total, item) => total + item.count, 0);
      }
    };

    const SelectedItem = (product) => {
      const existingProduct = selectedItems.value.find((selItem) => selItem.productID === product.productID);
      
      if (existingProduct) {
        existingProduct.count += 1;
        existingProduct.subtotal = existingProduct.count * product.sellingPrice;
      } else {
        selectedItems.value.push({ 
          ...product, 
          count: 1, 
          subtotal: product.sellingPrice 
        });
      }
      
      TtotalCost.value = selectedItems.value.reduce((total, item) => total + item.subtotal, 0);
      NoItems.value = selectedItems.value.reduce((total, item) => total + item.count, 0);
    };

    const removeItem = (index) => {
      const item = selectedItems.value[index];
      TtotalCost.value -= item.subtotal;
      NoItems.value -= item.count;
      selectedItems.value.splice(index, 1);
    };

    // Payment methods
    const OpenMpesa = () => {
      if (selectedItems.value.length > 0) {
        isMpesaOpen.value = true;
      }
    };

    const OpenCash = () => {
      if (selectedItems.value.length > 0) {
        isCashOpen.value = true;
      }
    };

    const OpencCredit = () => {
      if (selectedItems.value.length > 0) {
        isCreditOpen.value = true;
      }
    };

    const CloseMpesa = () => {
      isMpesaOpen.value = false;
    };

    const CloseCash = () => {
      isCashOpen.value = false;
    };

    const CloseCredit = () => {
      isCreditOpen.value = false;
    };

    const PayViaMpesa = (phoneNumber) => {
      // Implement M-Pesa payment logic
      console.log('Processing M-Pesa payment for:', phoneNumber);
      CloseMpesa();
    };

    const PayViaCash = (cashAmount) => {
      // Implement cash payment logic
      console.log('Processing cash payment:', cashAmount);
      CloseCash();
    };

    const SubmitCredit = (creditData) => {
      // Implement credit payment logic
      console.log('Processing credit:', creditData);
      CloseCredit();
    };

    // Lifecycle hooks
    onMounted(() => {
      let token = localStorage.getItem('token');
      //CatalogStore.fetchCatalogue(token);
      CategoryStore.fetchCategories(token);
      inventorystore.getallproducts(token);
       
      focusSearch();
    });

    watch(() => searchQuery.value, (newVal) => {
      productSearch(newVal);
    });

    watch(() => category.value, (newVal) => {
      categorysearch(newVal);
    });

    watch(() => errorState.message, (newVal) => {
      if (newVal) {
        DisplayMessage(`Error: ${errorState.code} - ${newVal}`);
      }
    });

    return {
      searchQuery,
      category,
      isMpesaOpen,
      isCashOpen,
      isCreditOpen,
      selectedItems,
      NoItems,
      Discount,
      Shipping,
      Vat,
      TtotalCost,
      categ,
      filteredProducts,
      hasSearchResults,
      searchSection,
      handleSearchEnter,
      focusSearch,
      updateItemQuantity,
      SelectedItem,
      removeItem,
      OpenMpesa,
      OpenCash,
      OpencCredit,
      CloseMpesa,
      CloseCash,
      CloseCredit,
      PayViaMpesa,
      PayViaCash,
      SubmitCredit
    };
  }
};
</script>

<style scoped>
/* Your styles here */
</style>