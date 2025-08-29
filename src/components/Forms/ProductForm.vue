<template>
  <div>
    <!-- Form Inputs -->
    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Product Name <span class="text-red-500">*</span></label>
      <input 
        v-model="formData.pname" 
        :ref="fieldRefs.pname"
        @input="validateForm"
        type="text"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.pname ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      />
      <p v-if="errors.pname" class="text-sm text-red-600">{{ errors.pname }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Product Category <span class="text-red-500">*</span></label>
      <select 
        v-model="formData.pcategory" 
        :ref="fieldRefs.pcategory"
        @change="validateForm"
        type="text"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.pcategory ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      >
        <option value="" disabled selected>Select a category</option>
        <option v-for="option in categ" :key="option.categoryID" :value="option.categoryID">
          {{ option.categoryName }}
        </option>
      </select>
      <p v-if="errors.pcategory" class="text-sm text-red-600">{{ errors.pcategory }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">No of Items <span class="text-red-500">*</span></label>
      <input 
        v-model="formData.PNoItems" 
        type="number" 
        :ref="fieldRefs.PNoItems"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.PNoItems ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      />
      <p v-if="errors.PNoItems" class="text-sm text-red-600">{{ errors.PNoItems }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Weight/Volume</label>
      <input 
        v-model="formData.punit" 
        type="text" 
        :ref="fieldRefs.punit"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.punit ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      />
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">VAT %</label>
      <input 
        v-model="formData.Pvat" 
        type="number" 
        :ref="fieldRefs.Pvat"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.Pvat ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      />
      <p v-if="errors.Pvat" class="text-sm text-red-600">{{ errors.Pvat }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Product Cost <span class="text-red-500">*</span></label>
      <input 
        v-model="formData.pcost" 
        type="number" 
        :ref="fieldRefs.pcost"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.pcost ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-400 focus:border-blue-400 '
        ]"
      />
      <p v-if="errors.pcost" class="text-sm text-red-600">{{ errors.pcost }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Product Buying Price <span class="text-red-500">*</span></label>
      <input 
        v-model="formData.pbuyingprice" 
        type="number" 
        :ref="fieldRefs.pbuyingprice"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.pbuyingprice ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
        ]"
      />
      <p v-if="errors.pbuyingprice" class="text-sm text-red-600">{{ errors.pbuyingprice }}</p>
    </div>

    <div class="space-y-1">
      <label class="block text-sm font-medium text-gray-700">Supplier <span class="text-red-500">*</span></label>
      <select 
        v-model="formData.supplier" 
        :ref="fieldRefs.supplier"
        @change="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.supplier ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
        ]"
      >
        <option value="" disabled selected>Select a Supplier</option>
        <option v-for="option in supplierdata" :key="option.supplierId" :value="option.supplierId">
          {{ option.supplierName }}
        </option>
      </select>
      <p v-if="errors.supplier" class="text-sm text-red-600">{{ errors.supplier }}</p>
    </div>

    <div class="col-span-1 md:col-span-2 space-y-1">
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea 
        v-model="formData.pdescription" 
        rows="3" 
        :ref="fieldRefs.pdescription"
        @input="validateForm"
        :class="[
          'w-full border border-gray-200 rounded-lg p-2.5 text-sm focus:ring-2 transition-all',
          errors.pdescription ? 'border-red-400 focus:ring-red-400 focus:border-red-400' : 'border-gray-400 focus:ring-blue-100 focus:border-blue-100 '
        ]"
        placeholder="Max 500 characters"
        maxlength="500"
      ></textarea>

      <p v-if="errors.pdescription" class="text-sm text-red-600">{{ errors.pdescription }}</p>

      <div class="text-xs text-gray-500 text-right">
        {{ formData.pdescription.length }}/500
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from 'vue';

export default {
  name: 'ProductForm',
  props: {
    product: {
      type: Object,
      default: null
    },
    categ: {
      type: Array,
      default: () => []
    },
    supplierdata: {
      type: Array,
      default: () => []
    },
    fieldRefs: {
      type: Object,
      default: () => ({})
    },
    errors: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['update:formData', 'validate'],
  setup(props, { emit }) {
    const formData = ref({
      pname: '',
      pdescription: '',
      punit: '',
      pcategory: '',
      pbuyingprice: '',
      pcost: '',
      PNoItems: '',
      supplier: '',
      Pvat: 16.00
    });

    // Watch for product changes (when editing)
    watch(() => props.product, (newProduct) => {
      if (newProduct) {
        formData.value = {
          pname: newProduct.productName,
          pdescription: newProduct.productDescription,
          punit: newProduct.weight_Volume,
          pcategory: newProduct.categoryID,
          pbuyingprice: newProduct.buyingPrice,
          pcost: newProduct.sellingPrice,
          PNoItems: newProduct.quantity,
          supplier: newProduct.supplierId,
          Pvat: 16.00
        };
      } else {
        // Reset form for new product
        formData.value = {
          pname: '',
          pdescription: '',
          punit: '',
          pcategory: '',
          pbuyingprice: '',
          pcost: '',
          PNoItems: '',
          supplier: '',
          Pvat: 16.00
        };
      }
      emit('update:formData', formData.value);
    }, { immediate: true });

    // Emit form data changes
    watch(formData, (newValue) => {
      emit('update:formData', newValue);
    }, { deep: true });

    const validateForm = () => {
      emit('validate');
    };

    return {
      formData,
      validateForm
    };
  }
}
</script>