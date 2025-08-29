<template>

   <main>

      <!-- section one contain titles -->
   <section class="px-2">
        <h3 class="text-lg font-semibold">Supplier Information</h3>
    <div v-for="(supplier, supplierIndex) in filteredsupplier" :key="supplierIndex" class="mb-6">
        <div class="grid grid-cols-3 gap-4 mt-2 border border-gray-200 p-2 rounded-md bg-white">
          <div v-for="({ key, value }, index) in supplier" :key="index">
            <label class="block text-sm font-medium text-gray-700">
              {{ key }}
            </label>
            <input
              type="text"
              :value="value"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none
               focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"  readonly />
          </div>
        </div>
      </div>
   </section>


<!-- section two contain buttons for opening various tabs wit several action buttons -->
   <section>  
   <div class="bg-gray-600 px-2 py-1 rounded">
     <div class="flex justify-between">
         <div class="flex space-x-8">
         <button @click="openModal" class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-1 px-2 rounded text-sm">
            Add products
         </button>
         <button @click="OpenExcel" class="bg-teal-500 hover:bg-teal-600 text-white font-semibold py-1 px-2 rounded text-sm">
            Add Excel
         </button>  
         <button @click="openSupplies"   class="bg-purple-500 hover:bg-purple-500 text-white font-semibold py-1 px-2 rounded text-sm">
            Supplies list
         </button>
         <button @click="openTransactions" class="bg-green-500 hover:bg-green-600 text-white font-semibold py-1 px-2 rounded text-sm">
            Transactions
         </button>  
      </div>

      <h3 class="text-center font-medium text-1xl text-white">{{ title }}</h3>

       <!-- Right set of buttons -->
      <div class="flex space-x-10">       
         <button class="bg-amber-100 hover:bg-gray-300 text-black font-semibold py-1 px-2 rounded text-sm">
         Send message
         </button>
         <button class="bg-gray-100 hover:bg-amber-300 text-black font-semibold py-1 px-2 rounded text-sm">
         Suspend
         </button>
         <button class="bg-red-300 hover:bg-red-400 text-white font-semibold py-1 px-2 rounded text-sm">
         Delete
         </button>
      </div>

      </div>
      </div> 
   </section>

<!-- section contain various actions from tabs-->
  <section>  
    <!--transactions table -->
   <div class="min-w-full" v-if="ismodaltransactions"> 
   <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-200  text-sm rounded-md border border-gray-400">
      <thead class="ltr:text-left rtl:text-right">
         <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-3600">ID</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Item</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Code</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Description</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Cost</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Selling Price</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Status</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Action</th>
         </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
         <tr v-for="(item, index) in supplies" :key="index">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item .id}}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.name}}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.cost }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingprice }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingdate }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.expiredate }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.status }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplier }}</td>
         </tr>
      </tbody>
      </table>
   </div> 

     <!--supplies  table -->
<div class="min-w-full" v-if="ismodalsupplies"> 
   <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-200  text-sm rounded-md border border-gray-400">
      <thead class="ltr:text-left rtl:text-right">
         <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-3600">ID</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Item</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Code</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Supplier_id</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Category</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Price</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Quantity</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Status</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-600">Action</th>
         </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
         <tr v-for="(item, index) in filteredSupplierSupplies" :key="index">
            <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{ item .id}}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.name}}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.cost }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingprice }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.buyingdate }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.expiredate }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.status }}</td>
            <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{ item.supplier }}</td>
         </tr>
      </tbody>
      </table>
   </div> 

  </section>


  
   
   
<!-- Modal to add a new product-->
      <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center w-full justify-center">
         <div class="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">

            <div class="relative flex items-center justify-center">
               <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW PRODUCT</p>
               <button @click="closeModal" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
            </div>

            <div class="grid grid-cols-2 gap-4 mt-2">
            <div>
               <label for="pname" class="text-sm text-black">Product name</label>
               <input type="text" v-model="pname" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>

            <div>
               <label for="pcategory" class="text-sm text-black">Product Category</label>
               <select v-model="pcategory" id="category" class="w-full rounded-lg border border-gray-400 p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 text-black bg-white">
                  <option v-for="option in categ" :key="option.categoryID" :value="option.categoryName">{{ option.categoryName }}</option>
               </select>
            </div>

            <div>
               <label for="PNoItems" class="text-sm text-gray-700">No Of Items</label>
               <input type="text" v-model="PNoItems" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>

            <div>
               <label for="pcost" class="text-sm text-gray-700">weight/volume</label>
               <input type="text" v-model="punit" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>


            <div>
               <label for="PNoItems" class="text-sm text-gray-700">VAT %</label>
               <input type="text" v-model="Pvat" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>

            <div>
               <label for="pcost" class="text-sm text-gray-700">Product Cost</label>
               <input type="text" v-model="pcost" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>


            <div>
               <label for="pbuyingprice" class="text-sm text-gray-700">Product Buying Price</label>
               <input type="text" v-model="pbuyingprice" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>

            <div>
               <label for="pbuyingdate" class="text-sm text-gray-700">Product Buying Date</label>
               <input type="date" v-model="pbuyingdate" class="w-full rounded-lg p-3 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-700 border border-gray-400" />
            </div>

            <div class="col-span-2">
               <label for="pdescription" class="text-sm text-gray-700">Description</label>
               <textarea id="pdescription" rows="4" v-model="pdescription" class="w-full rounded-lg p-2 text-sm shadow-sm focus:border-gray-400 focus:ring-gray-400 border border-gray-400" placeholder="Type your product description, maximum 500 characters"></textarea>
            </div>
            </div>

            <div class="text-center mt-6"> 
            <a @click="AddnewProduct" class="inline-block bg-blue-500 rounded-md px-4 py-3 text-sm font-bold uppercase tracking-widest text-white">Add product</a>

            </div>
         </div>
      </div> 
   
   
        <!-- excel upload modal -->
   <div v-if="isEXCELOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
   <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full">
   <div class="relative flex items-center justify-center">
      <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">UPLOAD EXCEL FILE</p>
      <button @click="closeModal" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
   </div>
   <div class="flex flex-col space-y-2 mt-10">
   <input  type="file" @change="handleFileUpload"  class="border border-gray-300 rounded-md px-4 py-2 text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"/>
   <button @click="submitExceldata" class="mt-4 bg-blue-500 text-white rounded-md px-4 py-2 w-1/2 justify-center items-center ml-20 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300">
      Process File
   </button>
   </div>
   </div>
   </div>  
   
     
      </main>
      
 </template>  
      
     
   
<script>
   import { useRoute } from 'vue-router';
   import Swal from 'sweetalert2';
   import {computed, onMounted, watch, ref} from 'vue';
   import { useSuppliesStore } from '../store/SuppliesStore';
   import {UseInventoryStore} from '../store/InventoryStore'
   import { useSuppliersStore } from '../store/SuppliersStore';
   import {useCategoryStore} from '../store/categoryStore'
    import { errorState } from '../store/ErrorState';


   //  
   export default {
     setup() {
      const route = useRoute(); // Get current route
      const supplierid = route.params.supplierId;

      const supplieStore = useSuppliesStore();
      const supplierstore = useSuppliersStore();
      const CategoryStore  = useCategoryStore();
      const inventorystore  = UseInventoryStore();


      const categ = computed(() => CategoryStore.getData);
      const filteredSupplierSupplies = computed(() => inventorystore.filterSupplierSupplies);

      const isModalOpen = ref(false);
      const ismodaltransactions= ref(false);
      const ismodalsupplies = ref(false); 
      const isEXCELOpen   = ref(false);
      const title = ref(''); 
      const filteredsupplier = ref([]);
      const productsfile = ref(null);

      //inuts with supplier info
      const supStatus  = ref('');
      const supLicense  = ref('');
      const supType  = ref('');
      const supPhone  = ref('');
      const supID  = ref('');
      const supName  = ref('');
      const supplies = ref('');
      const transactions = ref(''); 

      //inputs for adding new product
      const pbuyingdate  = ref('');
      const pdescription  = ref('');
      const pname  = ref('');
      const pcategory  = ref('');
      const PNoItems  = ref('');
      const punit  = ref('');
      const Pvat  = ref('');
      const pcost  = ref('');
      const pbuyingprice  = ref('');


      onMounted(()=> {
       supplieStore.getSupllier();
       supplieStore.setSearchSupplier(supplierid);
       CategoryStore.fetchCategories();
       console.log(categ.value);
       });
    const LoadedSupplier = computed(() => supplieStore.filtersuppliers);

    const allowedKeys = ["supplierId" ,"supplierName" ,"supplierType", "phone", "businessLicenseNumber", "supplierStatus", "email", "locationName"];

       watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 
          

   watch(LoadedSupplier, (newVal) => {
      const tempResult = [];
      newVal.forEach((supplier) => {
        const filteredKeyValuePairs = Object.entries(supplier)
          .filter(([key]) => allowedKeys.includes(key)) // Only include allowed keys
          .map(([key, value]) => ({ key, value }));
        tempResult.push(filteredKeyValuePairs);
      });
      filteredsupplier.value = tempResult; // Update the reactive variable
    });



   const submitExceldata = (event) => {
         productsfile.value = event.target.files[0]
   }

   const submitFile= () => {
      if (!productsfile.value) {
        alert('Please select a file!');
        return;
      }

      const formData = new FormData();
      formData.append('file', productsfile.value);

      try { 
      inventorystore.UploadProductsFile(formData,supID);
      DisplayMessage("success", inventorystore.successmsg)
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('Failed to upload file.');
      }
    }



   const AddnewProduct = () => { 
         const part1 = pname.value.substring(0, 3);
        const part2 = pname.value.slice(-3);

         try{  
          if(!Validation()){
          return false;
        }

          const postdata = {

            product : [{
                productID:"PR_"+part1+part2+"000"+pcategory.value,
                productName: pname.value,
                productDescription: pdescription.value,
                Weight_Volume :punit.value,
                categoryID: pcategory.value,
                buyingPrice: pbuyingprice.value,
                sellingPrice: pcost.value,
                quantity: PNoItems.value,
                createdBy: "chee",//localStorage.getItem('name'),
                updatedBy: "",
                createdOn: "2014_10_12",
                updatedOn: ""

            }]
          } 

          inventorystore.AddnewProduct(postdata);
                setTimeout(() => {
                  DisplayMessage("success", inventorystore.successmsg)
               }, 2000); 

         } catch(error){
          DisplayMessage("success", error);
        }
      }

      const DisplayMessage=(icon,message) => {
             closeModal();
        Swal.fire({
            position: "top-end",
            icon: icon,
            title: message,
            showConfirmButton: false,
            timer: 1500
          });
       }

      const Validation = () => { 

        let isNumeric = /^\d+$/;
          if( pname.value.trim() === "" && pdescription.value.trim() === "" && punit.value.trim() === "" &&  pcategory.value.trim() === "" &&  pbuyingprice.value.trim() === ""   &&  pcost.value.trim() === ""   &&  PNoItems.value.trim() === "" ) {
            DisplayMessage("error", "!!error please fill all the fields");
            return false;     
          }
          else if (!isNumeric.test(pbuyingprice.value) ) {
            DisplayMessage("error", "!!error buying price should be numeric");
          return false;  
         }
       
         else if (!isNumeric.test(pcost.value)) {
           DisplayMessage("error", "!!error product cost should be numeric");
           return false;  
          }

         else if(!isNumeric.test(PNoItems.value) ) {
           DisplayMessage("error", "!!error No of items should be numeric");
          return false;  
          }  

        //else{
          return true;
        // }

        }


   // const supplierSupplies = (e) => {
   //    inventorystore.setSearchSupplierSupplies(e.target.value);
   //  }; 
   
   const openModal = () => {
     isModalOpen.value = true;
   };
   
   const closeModal = () => {
     isModalOpen.value = false;
     isEXCELOpen.value = false;

   };

   const openTransactions = () => { 
      title.value = "All Transactions";
      ismodaltransactions.value =true; 
      ismodalsupplies.value = false;

   }

   const openSupplies = () => { 
      title.value = "All supplies"
      ismodalsupplies.value =true;
      ismodaltransactions.value = false; 
      inventorystore.setSearchSupplierSupplies(supplierid);

   } 

      //open excel upload modal 
      const OpenExcel = () => {
         isEXCELOpen.value = true;
     }

   
      
   
      
       
       return {
         Validation,
         DisplayMessage,
         AddnewProduct,
         openModal,
         OpenExcel,
         isEXCELOpen,
         closeModal,
         isModalOpen,
         ismodalsupplies,
         ismodaltransactions,
         openSupplies,
         openTransactions,
         title,
         transactions,
         supplies,
         // submitExceldata,
         filteredsupplier,
         // extractData,

        pname,
        pcost,
        pbuyingprice,
        pbuyingdate,
        pdescription,
        PNoItems,
        pcategory,
        filteredSupplierSupplies,

         categ,
         supStatus,
         supLicense,
         supType,
         supPhone,
         supID,
         supName,
         LoadedSupplier,
         supplierid
    
       };
     }
   };
   </script>