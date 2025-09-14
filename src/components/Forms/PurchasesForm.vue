<template>
  <div class="w-full mx-auto bg-white shadow-md rounded-lg p-6 space-y-6">
    <!-- Header -->
    <!--<h2 class="text-2xl font-bold text-gray-800 border-b pb-2">New Purchase</h2>-->

    <!-- Supplier / Date / Reference -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700">Supplier <span class="text-red-500">*</span></label>
        <select v-model="purchase.supplierId" class="input-field">
          <option value="">Select Supplier</option>
          <option v-for="s in suppliers" :key="s.supplierId" :value="s.supplierId">
            {{ s.supplierName }}
          </option>
        </select>
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Date <span class="text-red-500">*</span></label>
        <input type="date" v-model="purchase.date" class="input-field" />
      </div>

      <div>
        <label class="block text-sm font-medium text-gray-700">Reference No</label>
        <input type="text" v-model="purchase.reference" class="input-field" placeholder="Auto-generated or enter" />
      </div>
    </div>

    <!-- Products Section -->
    <div class="space-y-2">
      <label class="block text-sm font-medium text-gray-700">Products <span class="text-red-500">*</span></label>

      <div class="flex gap-2">
        <!-- Product Selector -->
        <select v-model="selectedProductId" class="flex-1 input-field">
          <option value="">Select Product</option>
          <option v-for="p in products" :key="p.productID" :value="p.productID">
            {{ p.productName }} - {{ p.brand }}
          </option>
        </select>

        <!-- Add Button -->
        <button @click="addProductToPurchase" class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600">
          Add
        </button>

        <!-- New Product Button -->
        <button @click="showNewProductModal = true" class="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          + New Product
        </button>
      </div>

      <!-- Products Table -->
      <table class="w-full border-collapse mt-3">
        <thead>
          <tr class="bg-gray-100 text-sm">
            <th class="border p-2">Product</th>
            <th class="border p-2 w-24">Qty</th>
            <th class="border p-2 w-32">Cost</th>
            <th class="border p-2 w-32">Subtotal</th>
            <th class="border p-2 w-10"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in purchase.items" :key="index" class="text-sm">
            <td class="border p-2">{{ item.productName }}</td>
            <td class="border p-2">
              <input type="number" v-model.number="item.quantity" min="1" class="input-field" />
            </td>
            <td class="border p-2">
              <input type="number" v-model.number="item.buyingPrice" min="0" class="input-field" />
            </td>
            <td class="border p-2 text-right">{{ formatCurrency(item.quantity * item.buyingPrice) }}</td>
            <td class="border p-2 text-center">
              <button @click="removeItem(index)" class="text-red-500 hover:text-red-700">✕</button>
            </td>
          </tr>
          <tr v-if="!purchase.items.length">
            <td colspan="5" class="text-center text-gray-400 p-3">No products added</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Totals Section -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div>
        <label class="block text-sm font-medium">Order Tax (%)</label>
        <input type="number" v-model.number="purchase.tax" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium">Discount</label>
        <input type="number" v-model.number="purchase.discount" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium">Shipping</label>
        <input type="number" v-model.number="purchase.shipping" class="input-field" />
      </div>
      <div>
        <label class="block text-sm font-medium">Status</label>
        <select v-model="purchase.status" class="input-field">
          <option value="pending">Pending</option>
          <option value="received">Received</option>
        </select>
      </div>
    </div>

    <!-- Description -->
    <div>
      <label class="block text-sm font-medium">Description</label>
      <textarea v-model="purchase.description" class="input-field" rows="3" placeholder="Optional notes"></textarea>
    </div>

    <!-- Summary -->
    <div class="flex justify-end">
      <div class="text-right">
        <p class="text-lg font-semibold">Grand Total: {{ formatCurrency(grandTotal) }}</p>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex justify-end gap-3 border-t pt-4">
      <button @click="resetForm" class="px-5 py-2 rounded-md bg-gray-200 hover:bg-gray-300">Reset</button>
      <button @click="savePurchase" class="px-5 py-2 rounded-md bg-green-600 hover:bg-green-700 text-white">Save</button>
      <button @click="$emit('cancel')" class="px-5 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white">Cancel</button>
    </div>

    <!-- New Product Modal -->
    <div v-if="showNewProductModal" class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center">
      <div class="bg-white w-3/4 max-w-4xl rounded-lg shadow-lg p-6 max-h-[90vh] overflow-y-auto">
        <h3 class="text-xl font-semibold mb-4">Add New Product</h3>
        <!-- <ProductForm
          @update:formData="newProductForm = $event"
          @validate="validateNewProduct"
          :categ="categories"
          :supplierdata="suppliers"
        /> -->

         <DynamicForm
          :formFields="productFormFields"
          :initialData="{}"
          @update:formData="formData = $event"
          @validate="errors = $event"
          :columns="2"
        />
        <div class="flex justify-end gap-3 mt-4">
          <button @click="showNewProductModal = false" class="px-4 py-2 bg-gray-300 rounded-md">Cancel</button>
          <button @click="saveNewProduct" class="px-4 py-2 bg-blue-600 text-white rounded-md">Save Product</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { UseInventoryStore } from "../../store/InventoryStore";
import { useSuppliersStore } from "../../store/SuppliersStore";
//import ProductForm from "./ProductForm.vue"; // ✅ use your new ProductForm
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

     const units =ref([
      {key : "1",value : "Kg"},
      {key : "2",value : "pcs"},
      {key : "3",value : "g"},
      {key : "4",value : "lts"},
      {key : "5",value : "dz"},
      {key : "6",value : "bx"}
    ])

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
      const subtotal = purchase.value.items.reduce((sum, i) => sum + i.quantity * i.buyingPrice, 0);
      const taxAmount = subtotal * (purchase.value.tax / 100);
      return subtotal + taxAmount + purchase.value.shipping - purchase.value.discount;
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
  @apply w-full rounded-md border border-gray-300 p-2 text-sm focus:ring focus:ring-blue-200 focus:border-blue-400;
}
</style>
