<template>
  <div class="w-full mx-auto bg-white shadow-xl rounded-xl p-8 space-y-8 font-sans">
    <!-- Header -->
    <!-- <div class="border-b border-gray-200 pb-4">
      <h2 class="text-3xl font-bold text-gray-900">New Purchase Order</h2>
      <p class="text-gray-500 mt-1">Create a new purchase from suppliers</p>
    </div> -->

    <!-- Supplier / Date / Reference -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Supplier <span class="text-red-500">*</span></label>
        <select v-model="purchase.supplierId" class="input-field">
          <option value="">Select Supplier</option>
          <option v-for="s in suppliers" :key="s.supplierId" :value="s.supplierId">
            {{ s.supplierName }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Date <span class="text-red-500">*</span></label>
        <input type="date" v-model="purchase.date" class="input-field" />
      </div>

      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Reference No</label>
        <input type="text" v-model="purchase.reference" class="input-field" placeholder="Auto-generated or enter" />
      </div>
    </div>

    <!-- Products Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <label class="block text-sm font-semibold text-gray-700">Products <span class="text-red-500">*</span></label>
        <span class="text-xs text-gray-500">{{ purchase.items.length }} items added</span>
      </div>

      <div class="flex gap-3">
        <!-- Product Selector -->
        <select v-model="selectedProductId" class="flex-1 input-field">
          <option value="">Select Product</option>
          <option v-for="p in products" :key="p.productID" :value="p.productID">
            {{ p.productName }} - {{ p.brand }}
          </option>
        </select>

        <!-- Add Button -->
        <button @click="addProductToPurchase" class="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add
        </button>

        <!-- New Product Button -->
        <button @click="showNewProductModal = true" class="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm flex items-center gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New Product
        </button>
      </div>

      <!-- Products Table -->
      <div class="border border-gray-200 rounded-lg overflow-hidden mt-4">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-50 text-sm font-medium text-gray-700">
              <th class="p-3 text-left">Product</th>
              <th class="p-3 w-24">Qty</th>
              <th class="p-3 w-32">Cost</th>
              <th class="p-3 w-32 text-right">Subtotal</th>
              <th class="p-3 w-10"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in purchase.items" :key="index" class="text-sm hover:bg-gray-50 transition-colors">
              <td class="p-3">{{ item.productName }}</td>
              <td class="p-3">
                <input type="number" v-model.number="item.quantity" min="1" class="table-input" />
              </td>
              <td class="p-3">
                <input type="number" v-model.number="item.buyingPrice" min="0" class="table-input" />
              </td>
              <td class="p-3 text-right font-medium">{{ formatCurrency(item.quantity * item.buyingPrice) }}</td>
              <td class="p-3 text-center">
                <button @click="removeItem(index)" class="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </td>
            </tr>
            <tr v-if="!purchase.items.length">
              <td colspan="5" class="text-center text-gray-400 p-6">
                <div class="flex flex-col items-center justify-center py-4">
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-300 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-16M9 9h6m-6 4h6m-6 4h6" />
                  </svg>
                  <p>No products added yet</p>
                  <p class="text-xs mt-1">Select a product above to get started</p>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 bg-gray-50 p-5 rounded-xl">
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Order Tax (%)</label>
        <input type="number" v-model.number="purchase.tax" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Discount</label>
        <input type="number" v-model.number="purchase.discount" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Shipping</label>
        <input type="number" v-model.number="purchase.shipping" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-semibold text-gray-700 mb-2">Status</label>
        <select v-model="purchase.status" class="input-field">
          <option value="pending">Pending</option>
          <option value="received">Received</option>
        </select>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-semibold text-gray-700 mb-2">Description</label>
      <textarea v-model="purchase.description" class="input-field" rows="3" placeholder="Optional notes"></textarea>
    </div>

    <!-- Summary -->
    <div class="flex justify-end border-t border-gray-200 pt-6">
      <div class="text-right space-y-2 w-64">
        <div class="flex justify-between text-gray-600">
          <span>Subtotal:</span>
          <span>{{ formatCurrency(subtotal) }}</span>
        </div>
        <div class="flex justify-between text-gray-600" v-if="purchase.tax">
          <span>Tax ({{ purchase.tax }}%):</span>
          <span>{{ formatCurrency(subtotal * (purchase.tax / 100)) }}</span>
        </div>
        <div class="flex justify-between text-gray-600" v-if="purchase.discount">
          <span>Discount:</span>
          <span class="text-red-500">-{{ formatCurrency(purchase.discount) }}</span>
        </div>
        <div class="flex justify-between text-gray-600" v-if="purchase.shipping">
          <span>Shipping:</span>
          <span>{{ formatCurrency(purchase.shipping) }}</span>
        </div>
        <div class="flex justify-between text-lg font-bold text-gray-900 pt-2 border-t border-gray-200 mt-2">
          <span>Grand Total:</span>
          <span>{{ formatCurrency(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-4 border-t border-gray-200 pt-6">
      <button @click="resetForm" class="px-6 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors font-medium shadow-sm">
        Reset
      </button>
      <button @click="savePurchase" class="px-6 py-3 rounded-lg bg-green-600 hover:bg-green-700 text-white font-medium shadow-sm flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
        </svg>
        Save Purchase
      </button>
      <button @click="$emit('cancel')" class="px-6 py-3 rounded-lg bg-red-100 hover:bg-red-200 text-red-700 font-medium shadow-sm">
        Cancel
      </button>
    </div>

    <!-- New Product Modal -->
    <div v-if="showNewProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white w-full max-w-4xl rounded-xl shadow-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h3 class="text-2xl font-bold text-gray-900">Add New Product</h3>
          <button @click="showNewProductModal = false" class="text-gray-400 hover:text-gray-600">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <DynamicForm
          :formFields="productFormFields"
          :initialData="{}"
          @update:formData="formData = $event"
          @validate="errors = $event"
          :columns="2"
        />
        
        <div class="flex justify-end gap-3 mt-8 pt-4 border-t border-gray-200">
          <button @click="showNewProductModal = false" class="px-5 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
            Cancel
          </button>
          <button @click="saveNewProduct" class="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Product
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { UseInventoryStore } from "../../store/InventoryStore";
import { useSuppliersStore } from "../../store/SuppliersStore";
import DynamicForm from "./DynamicForm.vue";

export default {
  components: { DynamicForm },
  setup() {
    const purchase = ref({
      supplierId: "",
      date: new Date().toISOString().substr(0, 10),
      reference: "",
      items: [],
      tax: 0,
      discount: 0,
      shipping: 0,
      status: "pending",
      description: ""
    });

    const selectedProductId = ref("");
    const showNewProductModal = ref(false);
    const newProductForm = ref({});

    const inventorystore = UseInventoryStore();
    const suppliersstore = useSuppliersStore();

    const products = computed(() => inventorystore.getData);
    const suppliers = computed(() => suppliersstore.filterSuppliers);
    const categories = computed(() => inventorystore.categories || []);

    const units = ref([
      {key: "1", value: "Kg"},
      {key: "2", value: "pcs"},
      {key: "3", value: "g"},
      {key: "4", value: "lts"},
      {key: "5", value: "dz"},
      {key: "6", value: "bx"}
    ]);

    const productFormFields = computed(() => [
      { key: "productName", label: "Product Name", type: "text", required: true, placeholder: "Enter product name" },
      { key: "productDescription", label: "Description", type: "textarea", maxLength: 500, placeholder: "Enter description" },
      { key: "sku", label: "SKU", type: "text", placeholder: "Enter SKU (leave blank to auto-generate)" },
      { key: "barcode", label: "Barcode", type: "text", placeholder: "Enter barcode (leave blank to auto-generate)" },
      { key: "unit", label: "Unit", type: "select", required: true, 
        options: units.value.map(unit => ({
          value: unit.value,
          label: unit.value
        }))
      },
      { key: "weight_Volume", label: "Weight/Volume", type: "text", placeholder: "Enter weight/volume" },
      { key: "categoryID", label: "Category", type: "select", required: true, 
        options: categories.value.map(cat => ({
          value: cat.categoryID,
          label: cat.categoryName
        }))
      },
      { key: "supplierId", label: "Supplier", type: "select", required: true, 
        options: suppliers.value.map(supp => ({
          value: supp.supplierId,
          label: supp.supplierName
        }))
      },
      { key: "buyingPrice", label: "Buying Price", type: "number", required: true, placeholder: "Enter buying price" },
      { key: "sellingPrice", label: "Selling Price", type: "number", required: true, placeholder: "Enter selling price" },
      { key: "discountPrice", label: "Discount Price", type: "number", placeholder: "Enter discount price" },
      { key: "quantity", label: "Quantity", type: "number", required: true, placeholder: "Enter quantity" },
      { key: "reorderLevel", label: "Reorder Level", type: "number", required: true, placeholder: "Enter reorder level" },
      { key: "status", label: "Active Status", type: "checkbox" },
      { key: "brand", label: "Brand", type: "text", required: true, placeholder: "Enter brand" },
    ]);

    onMounted(async () => {
      await inventorystore.getallproducts(localStorage.getItem("token"));
      await suppliersstore.getallSupliers();
    });

    const subtotal = computed(() => {
      return purchase.value.items.reduce((sum, i) => sum + i.quantity * i.buyingPrice, 0);
    });

    const addProductToPurchase = () => {
      if (!selectedProductId.value) return;
      const product = products.value.find(p => p.productID === selectedProductId.value);
      if (product) {
        purchase.value.items.push({
          productID: product.productID,
          productName: product.productName,
          quantity: 1,
          buyingPrice: product.buyingPrice
        });
      }
      selectedProductId.value = "";
    };

    const removeItem = (index) => {
      purchase.value.items.splice(index, 1);
    };

    const grandTotal = computed(() => {
      const taxAmount = subtotal.value * (purchase.value.tax / 100);
      return subtotal.value + taxAmount + purchase.value.shipping - purchase.value.discount;
    });

    const formatCurrency = (val) => `$${Number(val).toFixed(2)}`;

    const resetForm = () => {
      purchase.value = {
        supplierId: "",
        date: new Date().toISOString().substr(0, 10),
        reference: "",
        items: [],
        tax: 0,
        discount: 0,
        shipping: 0,
        status: "pending",
        description: ""
      };
    };

    const savePurchase = () => {
      console.log("Saving Purchase:", purchase.value);
      // TODO: Send to backend API
    };

    const validateNewProduct = () => {
      console.log("Validating new product form…");
    };

    const saveNewProduct = async () => {
      console.log("Saving new product:", newProductForm.value);
      // TODO: call API to save product
      await inventorystore.getallproducts(localStorage.getItem("token"));
      showNewProductModal.value = false;
    };

    return {
      purchase,
      products,
      suppliers,
      categories,
      selectedProductId,
      showNewProductModal,
      newProductForm,
      addProductToPurchase,
      removeItem,
      subtotal,
      grandTotal,
      formatCurrency,
      resetForm,
      savePurchase,
      validateNewProduct,
      saveNewProduct,
      productFormFields
    };
  }
};
</script>

<style scoped>
.input-field {
  @apply w-full rounded-lg border border-gray-300 p-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors shadow-sm;
}

.table-input {
  @apply w-full rounded-md border border-gray-300 p-1.5 text-sm focus:ring-1 focus:ring-blue-500 focus:border-blue-500 transition-colors;
}

.font-sans {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}
</style>