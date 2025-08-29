<template>

   <div class="rounded-lg border border-gray-200  bg-gray-300 h-full">
       <div class="overflow-x-auto rounded-t-lg py-1 px-1 space-y-2 mt-2">
     
     
     <div class="relative mb-3">
       <a @click="openModal" class="inline-block rounded  bg-blue-600 px-2 py-2  mr-2 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400"> 
           Add new Supplier
         </a> 
       <span class="text-2xl ml-8">My Suppliers</span>
       <label for="Search" class="sr-only"> Search </label>
     
       <input type="text" id="Search" placeholder="Search for...anything" class="w-1/33 rounded-md border-gray-200 py-2.5 pe-10 shadow-sm sm:text-sm absolute right-0"/>
     
      
     </div>
 
 
 
     <table class="min-w-full divide-y-2 divide-gray-200 bg-gray-100 mt-4 text-sm rounded">
       <thead class="ltr:text-left rtl:text-right">
         <tr>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">ID</th>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Name</th>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Contact</th>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Location</th>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Specialization</th>
             <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Status</th>
           <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Action</th>
 
 
 
         </tr>
       </thead>
 
       <tbody class="divide-y divide-gray-200">
         <tr v-for="(item, index) in data" :key="index">
           <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900"></td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700"></td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700">1</td>
           <td class="whitespace-nowrap px-4 py-2 text-gray-700">a</td>
         </tr>
 
   
       </tbody>
     </table>
   </div>

   <!-- modal to add supplier start -->

 <!-- <div v-if="isModalOpen" class="flex items-center justify-center h-screen">
 <div class="fixed inset-0 bg-gray-900 bg-opacity-50"></div>

 <div class="relative bg-white rounded-lg shadow-lg w-full max-w-6xl overflow-auto p-8">
   <div class="flex justify-between items-center border-b pb-4">
     <h2 class="text-2xl font-semibold">Supplier Details</h2>
     <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
       ✖
     </button>
   </div> -->

   <div v-if="isModalOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
    <div class="bg-white p-6 rounded-lg shadow-lg max-w-5xl w-full max-h-screen h-screen overflow-y-auto  ">
    <div class="relative flex items-center justify-center">
       <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">ADD NEW SUPPLIER</p>
       <button @click="closeModal" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
     </div>

     <div class="py-6 space-y-6 rounded-md border border-gray-300 px-6">
   
   <section>
     <h3 class="text-lg font-semibold">Supplier Information</h3>
     <div class="grid grid-cols-3 gap-4 ">
       <div>
         <label class="block text-sm">Supplier ID</label>
         <input v-model="supplierId" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Supplier Name</label>
         <input v-model="supplierName" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Supplier Type</label>
         <input v-model="supplierType" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Industry</label>
         <input v-model="industry" class="w-full border rounded p-2" type="text">
       </div>
       <!-- <div>
         <label class="block text-sm">KRA PIN</label>
         <input v-model="krapin" class="w-full border rounded p-2" type="text">
       </div> -->
       <div>
         <label class="block text-sm">Business License Number</label>
         <input v-model="businessLicenseNumber" class="w-full border rounded p-2" type="text">
       </div>
       
       <div>
         <label class="block text-sm">Supplier Status</label>
         <select id="select" v-model="supplierStatus" name="options" class="block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
           <option>True</option>
           <option>False</option>
         </select>
       </div>

       

       <!-- <div>
         <label class="block text-sm">Remarks</label>
         <textarea v-model="remarks" class="w-full border rounded p-2"></textarea>
       </div> -->
     </div>
   </section>  

   <!-- Product Information -->
   <!-- <section>
     <h3 class="text-lg font-semibold mb-2">Product Information</h3>
     <div class="grid grid-cols-3 gap-4 ">
       <div>
         <label class="block text-sm">Product Name</label>
         <input v-model="productname" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Category</label>
         <input v-model="productcategory" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">SKU</label>
         <input v-model="sku" class="w-full border rounded p-2" type="text">
       </div>
     </div>
   </section> -->

   <!-- Contact Details -->
   <section>
     <h3 class="text-lg font-semibold mb-2">Contact Details</h3>
     <div class="grid grid-cols-3 gap-4">
       <div>
         <label class="block text-sm">Name</label>
         <input v-model="fullname" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Email</label>
         <input v-model="email" class="w-full border rounded p-2" type="email">
       </div>
       <div>
         <label class="block text-sm">Phone</label>
         <input v-model="phone" class="w-full border rounded p-2" type="tel">
       </div>
     </div>
   </section>

   <!-- Address Details -->
   <section>
     <h3 class="text-lg font-semibold mb-2">Address Details</h3>
     <div  class="grid grid-cols-3 gap-4">
       <div>
         <label class="block text-sm">Location Name</label>
         <input v-model="locationName" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Town</label>
         <input v-model="town" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Postal</label>
         <input v-model="postal" class="w-full border rounded p-2" type="text">
       </div>
     </div>
   </section>

      <!-- Contract Details -->
   <section>
     <h3 class="text-lg font-semibold mb-2">Contract Details</h3>
     <div class="grid grid-cols-3 gap-4">
       <div>
         <label class="block text-sm">Contract Start Date</label>
         <input v-model="contractStartDate" class="w-full border rounded p-2" type="date">
       </div>
       <div>
         <label class="block text-sm">Contract End Date</label>
         <input v-model="contractEndDate" class="w-full border rounded p-2" type="date">
       </div>
       <div>
         <label class="block text-sm">Terms</label>
         <textarea v-model="contractterms" class="w-full border rounded p-2"></textarea>
       </div>
     </div>
   </section>

   <!-- Payment Details -->
   <section>
     <h3 class="text-lg font-semibold mb-2">Payment Details</h3>
     <!-- <div class="space-y-4"> -->
       <div  class="grid grid-cols-3 gap-2">
       <div>
         <label class="block text-sm">Bank Name</label>
         <input  v-model="BankName" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Bank Branch</label>
         <input  v-model="BankBrach" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Bank Account Number</label>
         <input v-model="BankaccountNumber" class="w-full border rounded p-2" type="text">
       </div>
     </div>  

     <div  class="grid grid-cols-2 gap-2 mt-3">
       <div>
         <label class="block text-sm">Mpesa paybill</label>
         <input v-model="paybill" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Account Number</label>
         <input v-model="paybillaccountNumber" class="w-full border rounded p-2" type="text">
       </div>
     </div>

     <div  class="grid grid-cols-2 gap-2 mt-3">
       <div>
         <label class="block text-sm">Mpesa TillNo</label>
         <input v-model="TillNo" class="w-full border rounded p-2" type="text">
       </div>
       <div>
         <label class="block text-sm">Pochi la Biashara</label>
         <input v-model="pochilaiashara" class="w-full border rounded p-2" type="text">
       </div>
     </div>

   </section>


 </div>

 <!-- Modal Footer -->
 <div class="flex justify-end border-t pt-4">
   <button @click="closeModal" class="px-4 py-2 bg-gray-500 text-white rounded mr-2">Cancel</button>
   <button @click="AddSupplier" class="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
 </div>
</div>
  </div>
   <!-- modal to add supplier end -->
 
  
   </div>
 </template>  
 
 <script>
 import { useSuppliersStore } from '../store/SuppliersStore';
 import {computed, onMounted, watch,ref} from 'vue';
 import { errorState } from '../store/ErrorState';
 
 export default {
   setup() {
     const suppliersstore = useSuppliersStore();
     const isModalOpen = ref(false); 
     const supplierdata  = computed(()=>suppliersstore.getData);

    const   pochilaiashara = ref();
    const   TillNo= ref();
    const   paybillaccountNumber= ref();
    const   paybill= ref();
    const   BankaccountNumber= ref();
    const   BankBrach= ref();
    const   BankName= ref();
    const   contractStartDate= ref();
    const   contractEndDate= ref();
    const   contractterms= ref();
    const   locationName= ref();
    const   town= ref();
    const   postal= ref();
    const   phone= ref();
    const   email= ref();
    const   Cname= ref();
    const   category= ref();
    const   COname= ref();
    const   industry= ref();
    const   supplierType= ref();
    const   supplierStatus =ref();
    const   supplierName= ref();
    const   supplierId= ref();
    const  fullname = ref('');
    const productcategory = ref('');
    const  productname = ref('');


    onMounted(()=> {
     suppliersstore.fetchSuppliers();
    }); 

      watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 


    const AddSupplier =() => {

      const postdata ={
       supplier: [{
            supplierId: supplierId.value,
           supplierName: supplierName.value,
           supplierType: supplierType.value,
           industry: industry.value,
           krapin: "string",
           businessLicenseNumber: "string",
           supplierStatus: supplierStatus.value,
           remarks: "test one",
           createdBy: "felo",
           updatedBy: "chee",
           contactDetails: [
             {
               name: fullname.value,
               email: email.value,
               phone: phone.value
             }
           ],
           addressDetails: [
             {
               locationName: locationName.value,
               town: town.value,
               postal: postal.value
             }
           ],
           paymentDetails: [
             {
               bankAccount: {
                 bankName: BankName.value,
                 accountNumber: BankaccountNumber.value
               },
               mpesa: {
                 // id: "string",
                 paybill: {
                   businessNumber: paybill.value,
                   account: paybillaccountNumber.value
                 },
                 till: TillNo.value,
                 pochi: pochilaiashara.value
               }
             }
           ],
           productInfo: [
             {
               productsOffered: [
                 {
                   name: productname.value,
                   category: productcategory.value,
                   sku: "string"
                 }
               ]
             }
           ],
           contractDetails: [
             {
               contractStartDate: contractStartDate.value,
               contractEndDate: contractEndDate.value,
               terms: contractterms.value
             }
               ]
           }
         ]
       }

       suppliersstore.Addsuplier(postdata);
       console.log(postdata)
      
    }







 
   const openModal = () => { 
     console.log("hallo");
       isModalOpen.value = true;
     console.log(isModalOpen.value);

   }
 
   const closeModal = () => {
       isModalOpen.value = false;
   }
 
    
     return {
       suppliersstore,
       isModalOpen,
       openModal,
       closeModal,
       AddSupplier,

       pochilaiashara,
       TillNo,
       paybillaccountNumber,
       paybill,
       BankaccountNumber,
       BankBrach,
       BankName,
       contractStartDate,
       contractEndDate,
       contractterms,
       locationName,
       town,
       postal,
       phone,
       fullname,
       email,
       Cname,
       category,
       COname,
       industry,
       supplierType,
       supplierName,
       supplierId,
       productcategory,
       productname,
     }
   }
 };
 </script>