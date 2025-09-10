<template>
  <ModuleComponent
    title="Products"
    description="Manage your products List"
    moduleName="products"
    moduleNameSingular="product"
    :data="products"
    :columns="productColumns"
    :formFields="productFormFields"
    :fetchData="fetchProducts"
    :addItem="addProduct"
    :updateItem="updateProduct"
    :deleteItem="deleteProduct"
    searchPlaceholder="Search products..."
    addButtonText="Add New Product"
    :showExportButtons="true"
    :showImportButton="true"
    :getId="getProductId"
  >
    <!-- Custom Filters for Products -->
    <template #filters>
      <select v-model="categoryFilter" class="rounded-lg border border-gray-200 py-2 px-3 text-sm shadow-sm">
        <option value="">All Categories</option>
        <option v-for="cat in uniqueCategories" :key="cat" :value="cat">{{ cat }}</option>
      </select>
      <select v-model="brandFilter" class="rounded-lg border border-gray-200 py-2 px-3 text-sm shadow-sm">
        <option value="">All Brands</option>
        <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </select>
    </template>

    <!-- Custom Header Actions -->
    <!-- <template #header-actions>
      <button class="flex items-center px-3 py-2 rounded-md bg-purple-500 hover:bg-purple-600 text-white text-xs font-medium shadow-sm transition-colors">
        CSV
      </button>
    </template> -->

    <template #header-actions>
      <!-- Import Button -->
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        @change="handleFileUpload"
        class="hidden"
        ref="fileInput"
      />
      <button
        @click="$refs.fileInput.click()"
        class="flex items-center px-3 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium shadow-sm transition-colors"
      >
        Import Excel
      </button>
    </template>


    <!-- Custom Row Actions (if needed) -->
    <template #row-actions="{ item }">
      <button 
        @click="viewProductDetails(item)" 
        class="p-2 rounded-md bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
        title="View Details"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      </button>
    </template>
  </ModuleComponent>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import ModuleComponent from "../components/ModuleComponent/ModuleComponent.vue";
import Swal from 'sweetalert2';
import { errorState } from '../store/ErrorState';
import { useSuppliersStore } from '../store/SuppliersStore';
import { UseInventoryStore } from '../store/InventoryStore'
import { useCategoryStore } from '../store/categoryStore'
import { useBarcode } from "../components/BarCode/BarcodeScanner";

export default {
  components: { ModuleComponent },
  setup() {
    const products = ref([]);
    const categoryFilter = ref("");
    const brandFilter = ref("");

    const {generateEAN13,generateSKU} =  useBarcode();
    
    // Store properties
    const inventorystore = UseInventoryStore();
    const CategoryStore = useCategoryStore();
    const suppliersstore = useSuppliersStore();

    const data = computed(() => inventorystore.getData);
    const categ = computed(() => CategoryStore.getData);
    const supplierdata = computed(() => suppliersstore.filterSuppliers);

    // Compute unique values for filters
    const uniqueCategories = computed(() => [...new Set(products.value.map(item => item.categoryName))]);
    const uniqueBrands = computed(() => [...new Set(products.value.map(item => item.brand))]);

    const units =ref([
      {key : "1",value : "Kg"},
      {key : "2",value : "pcs"},
      {key : "3",value : "g"},
      {key : "4",value : "lts"},
      {key : "5",value : "dz"},
      {key : "6",value : "bx"}
    ])

    // Fetch initial data
    onMounted(async () => {
      await fetchProducts();
      await CategoryStore.fetchCategories(localStorage.getItem('token'));
      await suppliersstore.getallSupliers();
    });

    const productColumns = [
      { field: "productName", label: "Product", type: "text", sortable: true },
      { field: "sellingPrice", label: "Price", type: "currency", sortable: true, mono: true },
      { field: "buyingPrice", label: "Cost", type: "currency", sortable: true, mono: true },
      { field: "categoryName", label: "Category", type: "badge", sortable: true },
      { field: "quantity", label: "Stock", type: "number", sortable: true },
      { field: "status", label: "Status", type: "status" },
      { field: "supplierName", label: "Supplier", type: "text" },
    ];

    // Form fields for products
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
    options: categ.value.map(cat => ({
      value: cat.categoryID,
      label: cat.categoryName
    }))
  },
  { key: "supplierId", label: "Supplier", type: "select", required: true, 
    options: supplierdata.value.map(supp => ({
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


    // Get product ID (custom ID function for the generic component)
    const getProductId = (product) => product.productID;

    // Fetch products from store
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        await inventorystore.getallproducts(token);
        products.value = inventorystore.getData;
        return products.value;
      } catch (error) {
        Swal.fire('Error', 'Failed to fetch products', 'error');
        throw error;
      }
    };

    // Add new product
   const addProduct = async (productData) => {
    try {
      const payload = {
        ...productData,
        sku: productData.sku || generateSKU(productData.productName, productData.categoryID),
        barcode: productData.barcode || generateEAN13(),
        createdBy : "UltimatePos"
      };

      await inventorystore.AddnewProduct(payload);
      await fetchProducts();

      Swal.fire('Success', 'Product created successfully', 'success');
      return { success: true };
    } catch (error) {
      Swal.fire('Error', error.message || 'Failed to create product', 'error');
      throw error;
    }
  };


    // Update product
    const updateProduct = async (id, productData) => {
  try {
    const payload = {
      ...productData,
      productID: id,
      sku: productData.sku || generateSKU(productData.productName, productData.categoryID),
      barcode: productData.barcode || generateEAN13(),
      updatedBy : "UltimatePos"
    };

    await inventorystore.updateProduct(payload);
    await fetchProducts();

    Swal.fire('Success', 'Product updated successfully', 'success');
    return { success: true };
  } catch (error) {
    Swal.fire('Error', error.message || 'Failed to update product', 'error');
    throw error;
  }
};


    // Delete product
    const deleteProduct = async (id) => {
      try {
        await inventorystore.deleteProduct(id);
        await fetchProducts(); // Refresh the list
        
        Swal.fire('Success', 'Product deleted successfully', 'success');
        return { success: true };
      } catch (error) {
        Swal.fire('Error', error.message || 'Failed to delete product', 'error');
        throw error;
      }
    };

    // Custom action for viewing product details
    const viewProductDetails = (product) => {
      // Implement your product details view logic here
      console.log("View product details:", product);
      Swal.fire({
        title: product.productName,
        html: `
          <div class="text-left">
            <p><strong>Description:</strong> ${product.productDescription || 'N/A'}</p>
            <p><strong>Price:</strong> $${product.sellingPrice}</p>
            <p><strong>Stock:</strong> ${product.quantity}</p>
            <p><strong>Category:</strong> ${product.categoryName}</p>
            <p><strong>Supplier:</strong> ${product.supplierName}</p>
          </div>
        `,
        icon: 'info',
        confirmButtonText: 'Close'
      });
    };

    return {
      products,
      productColumns,
      productFormFields,
      fetchProducts,
      addProduct,
      updateProduct,
      deleteProduct,
      getProductId,
      categoryFilter,
      brandFilter,
      uniqueCategories,
      uniqueBrands,
      viewProductDetails
    };
  },
};
</script>