<template>
  <div :class="`grid grid-cols-1 md:grid-cols-${columns} gap-2`">
    <!-- Dynamic Fields -->
    <div
      v-for="(field, index) in formFields"
      :key="index"
      :class="field.type === 'textarea' ? `col-span-1 md:col-span-${columns}` : ''"
    >
      <div class="space-y-0.5">
        <label class="block text-xs font-medium text-gray-700">
          {{ field.label }}
          <span v-if="field.required" class="text-red-500">*</span>
        </label>

        <!-- Inputs -->
        <input
          v-if="['text', 'email', 'tel', 'password'].includes(field.type)"
          v-model="formData[field.key]"
          :type="field.type"
          :placeholder="field.placeholder"
          :required="field.required"
          class="w-full border border-gray-200 rounded-md p-1.5 text-xs focus:ring-1 focus:ring-blue-100 focus:border-blue-100 transition-all"
        />

        <input
          v-else-if="field.type === 'number'"
          v-model="formData[field.key]"
          type="number"
          :placeholder="field.placeholder"
          :required="field.required"
          class="w-full border border-gray-200 rounded-md p-1.5 text-xs focus:ring-1 focus:ring-blue-100 focus:border-blue-100 transition-all"
        />

        <input
          v-else-if="field.type === 'checkbox'"
          v-model="formData[field.key]"
          type="checkbox"
          :true-value="true"
          :false-value="false"
          class="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-400"
        />

        <input
          v-else-if="field.type === 'date'"
          v-model="formData[field.key]"
          type="date"
          class="w-full px-2 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-400 focus:border-transparent text-xs"
          :min="field.minDate || ''"
          :max="field.maxDate || ''"
          :required="field.required || false"
        />

        <select
          v-else-if="field.type === 'select'"
          v-model="formData[field.key]"
          :required="field.required"
          @change="validateField(field)"
          class="w-full border border-gray-200 rounded-md p-1.5 text-xs focus:ring-1 focus:ring-blue-100 focus:border-blue-100 transition-all"
        >
          <option value="" disabled>
            {{ field.placeholder || "Select an option" }}
          </option>
          <option v-for="option in field.options" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>

        <textarea
          v-else-if="field.type === 'textarea'"
          v-model="formData[field.key]"
          :placeholder="field.placeholder"
          :maxlength="field.maxLength"
          :required="field.required"
          @input="validateField(field)"
          rows="2"
          class="w-full border border-gray-200 rounded-md p-1.5 text-xs focus:ring-1 focus:ring-blue-100 focus:border-blue-200 transition-all"
        ></textarea>

        <!-- Error Message -->
        <p v-if="errors[field.key]" class="text-xs te xt-red-600 mt-0.5">
          {{ errors[field.key] }}
        </p>

        <!-- Character Counter -->
        <div v-if="field.type === 'textarea'" class="text-[10px] text-gray-500 text-right">
          {{ formData[field.key]?.length || 0 }}/{{ field.maxLength }}
        </div>
      </div>
    </div>

    <!-- Products Table (Only if enabled by parent) -->
    <div v-if="products == true" :class="`col-span-1 md:col-span-${columns}`">
      <div class="flex items-center justify-between">
        <label class="block text-xs font-semibold text-gray-700">
          Products <span class="text-red-500">*</span>
        </label>
        <span class="text-[11px] text-gray-500">{{ formData.items.length }} items</span>
      </div>

      <div class="flex gap-1.5 mt-1">
        <!-- Product Selector -->
        <select v-model="selectedProductId" class="flex-1 border border-gray-200 rounded p-1 text-xs">
          <option value="">Select Product</option>
          <option v-for="p in products" :key="p.productID" :value="p.productID">
            {{ p.productName }} - {{ p.brand }}
          </option>
        </select>

        <!-- Add Button -->
        <button
          @click="addProductToPurchase"
          class="px-2.5 py-1 bg-green-600 text-white rounded hover:bg-green-700 transition-colors shadow-sm text-xs flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add
        </button>

        <!-- New Product Button -->
        <button
          @click="showNewProductModal = true"
          class="px-2.5 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors shadow-sm text-xs flex items-center gap-1"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          New
        </button>
      </div>

      <!-- Products Table -->
      <div class="border border-gray-200 rounded-md overflow-hidden mt-2">
        <table class="w-full text-xs">
          <thead>
            <tr class="bg-gray-50 font-medium text-gray-700">
              <th class="p-1.5 text-left">Product</th>
              <th class="p-1.5 w-14">Qty</th>
              <th class="p-1.5 w-20">Cost</th>
              <th class="p-1.5 w-20 text-right">Subtotal</th>
              <th class="p-1.5 w-6"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200">
            <tr v-for="(item, index) in formData.items" :key="index" class="hover:bg-gray-50">
              <td class="p-1.5">{{ item.productName }}</td>
              <td class="p-1.5">
                <input type="number" v-model.number="item.quantity" min="1" class="w-full border border-gray-200 rounded p-1 text-xs" />
              </td>
              <td class="p-1.5">
                <input type="number" v-model.number="item.buyingPrice" min="0" class="w-full border border-gray-200 rounded p-1 text-xs" />
              </td>
              <td class="p-1.5 text-right font-medium">{{ formatCurrency(item.quantity * item.buyingPrice) }}</td>
              <td class="p-1.5 text-center">
                <button
                  @click="removeItem(index)"
                  class="text-red-500 hover:text-red-700 p-0.5 rounded-full hover:bg-red-50"
                >
                  ✕
                </button>
              </td>
            </tr>
            <tr v-if="!formData.items.length">
              <td colspan="5" class="text-center text-gray-400 p-3 text-xs">
                <p>No products added</p>
                <p class="text-[11px] mt-0.5">Search and add a product above</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>


<script>
import { ref, watch } from "vue";

export default {
  name: "DynamicForm",
  props: {
    formFields: { type: Array, required: true },
    initialData: { type: Object, default: () => ({}) },
    columns: { type: Number, default: 1 },
    products: { type: Boolean, default: false },
  },
  emits: ["update:formData", "validate"],
  setup(props, { emit }) {
    const formData = ref({});
    const errors = ref({});

    // --- Product search ---
    const productSearch = ref("");
    const searchResults = ref([]);

    const allProducts = ref([]); // preload from API in parent or inject

    const searchProducts = () => {
      const query = productSearch.value.toLowerCase();
      if (!query) {
        searchResults.value = [];
        return;
      }
      searchResults.value = allProducts.value.filter((p) =>
        p.productName.toLowerCase().includes(query)
      );
    };

    const addProductToPurchase = (product) => {
      if (!formData.value.items.some((i) => i.productId === product.productId)) {
        formData.value.items.push({
          productId: product.productId,
          productName: product.productName,
          brand: product.brand,
          quantity: 1,
          buyingPrice: 0,
        });
      }
      productSearch.value = "";
      searchResults.value = [];
    };

    // --- Init form ---
    const initializeFormData = () => {
      const data = {};
      props.formFields.forEach((field) => {
        data[field.key] = props.initialData[field.key] || "";
      });
      if (props.products) data.items = props.initialData.items || [];
      formData.value = data;
    };

    watch(
      () => props.initialData,
      (newData) => {
        if (newData && Object.keys(newData).length > 0) {
          props.formFields.forEach((field) => {
            if (newData[field.key] !== undefined) {
              formData.value[field.key] = newData[field.key];
            }
          });
          if (props.products) formData.value.items = newData.items || [];
        } else {
          initializeFormData();
        }
      },
      { immediate: true }
    );

    watch(
      formData,
      (newValue) => emit("update:formData", newValue),
      { deep: true }
    );

    // --- Validation ---
    const validateField = (field) => {
      const value = formData.value[field.key];
      delete errors.value[field.key];
      if (field.required && !value) {
        errors.value[field.key] = `${field.label} is required`;
        emit("validate", errors.value);
        return;
      }
      if (!value) {
        emit("validate", errors.value);
        return;
      }
      if (field.type === "email") {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(value.trim())) {
          errors.value[field.key] = `${field.label} must be a valid email`;
        }
      }
      if (field.type === "tel") {
        const phonePattern = /^[\d\s\-\+\(\)]{7,15}$/;
        if (!phonePattern.test(value)) {
          errors.value[field.key] = `${field.label} must be a valid phone number`;
        }
      }
      if (field.type === "password") {
        const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
        if (!passwordPattern.test(value)) {
          errors.value[field.key] =
            `${field.label} must be at least 8 characters, include 1 uppercase, 1 number, and 1 special character`;
        }
      }
      emit("validate", errors.value);
    };

    const validateForm = () => {
      props.formFields.forEach((field) => {
        if (field.required) validateField(field);
      });
      return Object.keys(errors.value).length === 0;
    };

    // --- Helpers ---
    const removeItem = (index) => {
      formData.value.items.splice(index, 1);
    };

    const formatCurrency = (val) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(val || 0);

    return {
      formData,
      errors,
      validateField,
      validateForm,
      removeItem,
      formatCurrency,
      productSearch,
      searchResults,
      searchProducts,
      addProductToPurchase,
      allProducts,
    };
  },
};
</script>
