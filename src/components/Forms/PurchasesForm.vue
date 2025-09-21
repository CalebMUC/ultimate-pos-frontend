<template>
  <div class="w-full mx-auto bg-white shadow-md rounded-lg p-4 space-y-4 font-sans text-sm">
    <!-- Supplier / Date / Reference -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Supplier <span class="text-red-500">*</span></label>
        <select v-model="purchase.supplierId" class="input-field">
          <option value="">Select Supplier</option>
          <option v-for="s in suppliers" :key="s.supplierId" :value="s.supplierId">
            {{ s.supplierName }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Date <span class="text-red-500">*</span></label>
        <input type="date" v-model="purchase.date" class="input-field" />
      </div>

      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Reference No</label>
        <input type="text" v-model="purchase.reference" class="input-field" placeholder="Auto-generated or enter" />
      </div>
    </div>

    <!-- Products Section -->
    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <label class="block text-xs font-medium text-gray-700">Products <span class="text-red-500">*</span></label>
        <span class="text-[11px] text-gray-500">{{ purchase.items.length }} items added</span>
      </div>

      <div class="flex gap-2">
        <select v-model="selectedProductId" class="flex-1 input-field">
          <option value="">Select Product</option>
          <option v-for="p in products" :key="p.productID" :value="p.productID">
            {{ p.productName }} - {{ p.brand }}
          </option>
        </select>

        <button @click="addProductToPurchase"
          class="px-3 py-1.5 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors text-xs flex items-center gap-1">
          + Add
        </button>

        <button @click="showNewProductModal = true"
          class="px-3 py-1.5 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-xs flex items-center gap-1">
          + New
        </button>
      </div>

      <!-- Products Table -->
      <div class="border border-gray-200 rounded-md overflow-hidden mt-2">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-gray-50 font-medium text-gray-700">
              <th class="p-2 text-left">Product</th>
              <th class="p-2 w-20">Qty</th>
              <th class="p-2 w-28">Cost</th>
              <th class="p-2 w-28 text-right">Subtotal</th>
              <th class="p-2 w-8"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in purchase.items" :key="index" class="hover:bg-gray-50">
              <td class="p-2">{{ item.productName }}</td>
              <td class="p-2">
                <input type="number" v-model.number="item.quantity" min="1" class="table-input" />
              </td>
              <td class="p-2">
                <input type="number" v-model.number="item.buyingPrice" min="0" class="table-input" />
              </td>
              <td class="p-2 text-right font-medium">{{ formatCurrency(item.quantity * item.buyingPrice) }}</td>
              <td class="p-2 text-center">
                <button @click="removeItem(index)" class="text-red-500 hover:text-red-700 text-xs">✕</button>
              </td>
            </tr>
            <tr v-if="!purchase.items.length">
              <td colspan="5" class="text-center text-gray-400 p-4 text-xs">
                No products added yet
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Totals Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-3 bg-gray-50 p-3 rounded-lg text-xs">
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Order Tax (%)</label>
        <input type="number" v-model.number="purchase.tax" class="input-field" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Discount</label>
        <input type="number" v-model.number="purchase.discount" class="input-field" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Shipping</label>
        <input type="number" v-model.number="purchase.shipping" class="input-field" />
      </div>
      <div>
        <label class="block text-xs font-medium text-gray-700 mb-1">Status</label>
        <select v-model="purchase.status" class="input-field">
          <option value="pending">Pending</option>
          <option value="received">Received</option>
        </select>
      </div>
    </div>

    <!-- Summary -->
    <div class="flex justify-end border-t border-gray-200 pt-3 text-xs">
      <div class="text-right space-y-1 w-48">
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
        <div class="flex justify-between text-sm font-bold text-gray-900 pt-2 border-t border-gray-200 mt-1">
          <span>Grand Total:</span>
          <span>{{ formatCurrency(grandTotal) }}</span>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-2 border-t border-gray-200 pt-3">
      <button @click="resetForm"
        class="px-3 py-1.5 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 text-xs">
        Reset
      </button>
      <button @click="savePurchase"
        class="px-3 py-1.5 rounded-md bg-green-600 hover:bg-green-700 text-white text-xs flex items-center gap-1">
        ✔ Save
      </button>
      <button @click="$emit('cancel')"
        class="px-3 py-1.5 rounded-md bg-red-100 hover:bg-red-200 text-red-700 text-xs">
        Cancel
      </button>
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