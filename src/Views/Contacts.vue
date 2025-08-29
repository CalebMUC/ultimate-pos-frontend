
<template>
  <main class="p-4">
    <!-- Top Buttons and Search -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-0 sm:space-y-0 sm:space-x-4 mb-4">
      <div class="flex flex-wrap gap-2">
         <h3 class="text-2xl font-bold text-gray-800">CONTACT LIST </h3>
        <a @click="OpenExcel" class="rounded-md border bg-blue-400 px-3 py-1 text-sm text-white shadow-sm focus:outline-none"> UPLOAD CONTACTS </a>
      </div>
      <input type="text" @input="updateSearch" placeholder="Search YOUR CONTACT LIST" class="w-full sm:w-1/3 rounded-md border-gray-300 py-2 px-4 shadow-sm sm:mt-0 mt-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300">
    </div>


 <!-- Content Grid -->
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
    <div class="lg:col-span-2 bg-white rounded shadow overflow-auto">
    <table class="min-w-full divide-y divide-gray-200 bg-white text-sm">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap w-1/6">NAME</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">EMAIL</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHONE NO</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED-BY</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CREATED-ON</th>
          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>


    <tbody class="divide-y divide-gray-200">
        <tr    v-for="(contact, index) in filteredItems" :key="contact.id" class="hover:bg-gray-50 transition-colors" >

          <td class="px-6 py-4 whitespace-nowrap">
            <div class="text-sm font-medium text-gray-900 max-w-xs truncate">{{ contact.username }}</div>
            <!-- <div class="text-xs text-gray-800 max-w-xs truncate">{{ item.productDescription }}</div>  -->
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
            {{ contact.email }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ contact.phoneNumber }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span class="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
              {{ contact.createdBy }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500 hidden sm:table-cell">
            {{ formatDate(contact.createdOn) }}
          </td>
          <!-- <td class="px-6 py-4 whitespace-nowrap hidden md:table-cell">
            <span :class="{
              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
              'bg-green-100 text-green-800': item.status === 'In Stock',
              'bg-yellow-100 text-yellow-800': item.status === 'Low Stock',
              'bg-red-100 text-red-800': item.status === 'Out of Stock'
            }">
              {{ item.status }}
            </span>
          </td> -->
          <!-- <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ item.supplierId }}
          </td> -->
          <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
            <div class="flex items-center space-x-2">
              <button 
                @click="openModal(item)"
                class="text-blue-600 hover:text-blue-900 p-1.5 rounded-md hover:bg-blue-50 transition-colors"
                title="Edit"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                </svg>
              </button>
              <button 
                @click="confirmDelete(item)"
                class="text-red-600 hover:text-red-900 p-1.5 rounded-md hover:bg-red-50 transition-colors"
                title="Delete"
              >
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </td> -->
        </tr>
        <tr v-if="contactsStr.length === 0">
          <td colspan="8" class="px-6 py-4 text-center text-sm text-gray-500">
            <div class="flex flex-col items-center justify-center py-8">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
              <p class="mt-2 text-sm font-medium text-gray-600">No Contact found</p>
              <p class="text-xs text-gray-500 mt-1">Try adjusting your search or add a new Contact</p>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
</div>

  <!-- Sidebar -->  <!-- Add Contact -->
  <div class="col-span-1 bg-gray-100 h-auto rounded-lg">
      <div class="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">ADD NEW CONTACT</h2>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black">NAME</label>
            <input type="text" v-model="Name"
                   class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>
          <div>
            <label class="block text-sm text-black">PHONE NUMBER</label>
            <input type="text" v-model="phone"
                   class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>
           <div>
            <label class="block text-sm text-black">EMAIL ADDRESS</label>
            <input type="text" v-model="Email"
                   class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>

          <button 
            @click="AddContact" 
            class=" flex items-center justify-center  px-4 py-2.5 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2
             focus:ring-blue-400 focus:ring-offset-2 transition-colors"> Add Contact
          </button>


        </div>
      </div>
    </div>
</div>


    <!-- Excel Upload Modal -->
    <div v-if="isEXCELOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-md p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">UPLOAD EXCEL FILE</h2>
          <button @click="CloseExcel" class="bg-black text-white px-2 rounded">x</button>
        </div>
        <div class="space-y-4">
          <input type="file" @change="handleFileUpload"
                 class="w-full border border-gray-300 rounded px-4 py-2 text-gray-600 focus:outline-none focus:ring focus:ring-gray-400" />
          <button @click="submitExceldata"
                  class="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300">
            Process File
          </button>
        </div>
      </div>
    </div>

  

  </main>
</template>
 
 <script>
 import { usecontactstore } from '../store/contactstore';
 import { ref, computed, onMounted, watch } from 'vue';
 import Swal from 'sweetalert2';
//  import * as XLSX from 'xlsx';
 import { errorState } from '../store/ErrorState';

 export default { 
   setup() {
     const isModalOpen = ref(false);
     const Mode = ref('addmode');
     const isEXCELOpen   = ref(false);
     const isModalTempOpen = ref(false);
     const ContactsExcel  =  ref([]);
     const validationErrors = ref([]);
     const contactgroup = ref('');
     const contactstatus = ref('');
     const Name = ref('');
     const phone = ref('');
     const Email = ref('');
     let currentPage = ref(1);
     const itemsPerPage = 18; 
    
     const token = ref('');

     const contactStore = usecontactstore();

     const contactsStr = computed(() => contactStore.getData);
     const filteredItems = computed(() => contactStore.filteredContacts);

     const Tresponse = computed(()=>contactStore. getsucces);
     //const totalPages = computed(() => Math.ceil(filteredItems.value.length / itemsPerPage));


      watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 
  

   onMounted(() => { 
    token.value = localStorage.getItem('token');                      
    contactStore.fetchContacts(token.value);
    });

    
  

  const formatDate =(dateString)=> {
    const cleanDateString = dateString.replace(/(\.\d{3})\d+/, '$1');
    const date = new Date(cleanDateString);
    return date.toISOString().split('T')[0];
  }

  const DisplayMessage = (icon, message) => {
      Swal.fire({
        position: 'center',
        icon: icon,
        title: message,
        showConfirmButton: false,
        timer: 1500,
        backdrop: `
          rgba(0,0,123,0.4)
          url("/images/nyan-cat.gif")
          left top
          no-repeat
        `
    })
  }


  
    // const isModalTempOpen
     // paginate filtered items
  //  const paginatedContacts = computed(() => {
  //    const start = (currentPage.value - 1) * itemsPerPage;
  //    return contactStore.filteredContacts.slice(start, start + itemsPerPage);
  //  });



    //  const nextPage = () => { 
    //    if (currentPage.value < totalPages.value) currentPage.value++;
    //  };

    //  const prevPage = () => {
    //    if (currentPage.value > 1) currentPage.value--;
    //  };

     
       // Watch the Tresponse and trigger SweetAlert when the response changes

  //  watch(Tresponse, (newValue) => {
  //    if (newValue && typeof newValue === 'object') {
  //    // SweetAlert for success
  //      if (newValue.success) {
  //        Swal.fire({
  //          position: 'top-end',
  //          icon: 'success',
  //          // title: 'Contact Group added by successfully',
  //          title: newValue.msg,
  //          showConfirmButton: false,
  //          timer: 2500,
  //        });
  //      }
  //        // SweetAlert for failure
  //      else {
  //        Swal.fire({
  //          position: 'top-end',
  //          icon: 'error',
  //          title: newValue.msg,
  //          // title: 'Failed to add Contact Group',
  //          showConfirmButton: false,
  //          timer: 2500,
  //        });
  //      }
  //    }
  //  });
   
    //function to handle contact list search
  
    const updateSearch = (e) => { 
     currentPage.value = 1;
       contactStore.setSearchTerm(e.target.value);
   };

  

 
     // Function to add a single contact 
   const AddContact = () => {   
      if(Name.value == " " || Name.value == undefined){
       DisplayMessage("error", "name is required");
       return;
      } 
     else if(phone.value == " " || phone.value == undefined){
       DisplayMessage("error", "phone no is required");
       return;
     } 
     else if(Email.value == " " || Email.value == undefined){
       DisplayMessage("error", "Email is required");
       return;
     }
     else{
    const data = {
      contact:[{
          ClientID: generateUnique6DigitCode(),
          Username: Name.value,
          PhoneNumber: phone.value,
          Email: Email.value,
      }]
         }
       try{
         contactStore.AddNewContacts(data,token.value);
           closeModal(); 
           contactStore.fetchContacts(); //reload dataS
       }
       catch(error){
         console.log(error);
       }
      }
     }

 
  

    const CloseExcel = () => {
        isEXCELOpen.value = false;
     }


    const OpenExcel = () => {
        isEXCELOpen.value = true;
    }
     

       //open modal for editing contacts
     const openModalEdit = (mode, name, email,phoneno, status, group) => { 
       const stat = status;
       const statusBoolean = stat === 'A  ctive'; 

       isModalOpen.value = true;
       Mode.value = mode;
       Name.value = name,
       phone.value =phoneno;
       contactgroup.value =group,
       Email.value  = email;
       contactstatus.value =statusBoolean
       console.log(statusBoolean);
       }


    const  generateUnique6DigitCode =()=>{
     const timestamp = Date.now().toString();
     const uniqueNumber = timestamp.slice(-6); 
     const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26)); 
     return randomLetter + uniqueNumber; 
    }


      //function to handle file upload
   const handleFileUpload = (event) => {
       const file = event.target.files[0];
       const reader = new FileReader();
       reader.onload = (e) => {
         const data = new Uint8Array(e.target.result);
         const workbook = XLSX.read(data, { type: 'array' });
         const worksheet = workbook.Sheets[workbook.SheetNames[0]];
         const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

         // Extract the headers from the first row of the file
       //  headers = json[0];
         // Validate headers
   
       // Convert the 2D array to an array of objects
       ContactsExcel.value = json.slice(1).map(row => ({
         name: row[0],
         client: row[1],
         phoneno: row[2],
         email: row[3],
         status:row[4],
         group: row[5],
         }));
      };
      reader.readAsArrayBuffer(file);
    };

   // functiom to validate excel data for errors
   const validateExcel = () => {
     validationErrors.value = []; // Reset errors
     ContactsExcel.value.forEach((contact, index) => { 

       if (!contact.name) {
         validationErrors.value.push(`Row ${index + 1}: Name is required.`);
         console.log(1);
       }

       if (!contact.email) {
         validationErrors.value.push(`Row ${index + 1}: Email is required.`);
         console.log(1);
         // showErrorAlert();
       }
       if (!contact.phoneno) {
         validationErrors.value.push(`Row ${index + 1}: Phone is required.`);
         // showErrorAlert();
         console.log(2);
       }

       if (!contact.status) {
         validationErrors.value.push(`Row ${index + 1}: status is required.`);
         // showErrorAlert();
         console.log(2);
       }

       // Add more validation as needed
     });
   }; 

     // submit  or save contact list in excel file
   const submitExceldata = async () => {
     validateExcel(); // Validate before submission

         if (validationErrors.value.length) {
           message.value = 'Please fix the validation errors.';
           // showErrorAlert();
           return; // Stop submission if there are errors
         } 

         try{
         contactStore.AddNewContacts({contacts: ContactsExcel.value});
            closeModal(); 
            contactStore.fetchContacts(); //reload dataS
        }
       catch(error){
         console.log(error);
         // showErrorAlert();
       }
   } 

 
     return {
       filteredItems,
       updateSearch,
       AddContact,
       generateUnique6DigitCode,
       isModalOpen,
       contactgroup,
       contactsStr,
       isModalTempOpen,
       openModalEdit,
       Mode,
       Tresponse,
       contactstatus,
       DisplayMessage,
      formatDate,
       Name,
       phone,
       Email,
       validationErrors,

       isEXCELOpen,
       OpenExcel,
       CloseExcel,
       handleFileUpload,
       validateExcel,
       submitExceldata,
       ContactsExcel,
       token   ,           


     
      //  paginatedContacts,
    //  currentPage,
    //  totalPages,
    //  nextPage,
    //  prevPage,


     };
   },
 };
 </script> 



 