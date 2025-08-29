<template>

<div class="rounded-xl border border-gray-200 bg-gray-200 h-full p-4 shadow-sm">
  <!-- Header & Search Controls start-->
    <div class="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
      <div>
        <h3 class="text-2xl font-bold text-gray-800">Send Sms & Email</h3>
      </div>  

      <div class="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <span class="text-lg ml-3">MESSAGE TEMPLATES</span>

        <div>
           <a @click="OpenTemplateModal" class="bg-blue-500 text-white px-3 py-2 rounded-md text-sm font-semibold">
            ADD TEMPLATE
          </a>

         </div>
       <a @click="OpenContacts" class="inline-block rounded-md border border-gray-400 bg-green-500 px-3 py-1 text-sm text-white hover:text-gray-700 focus:outline-none">CONTACTS</a>
      </div>
    </div>
  <!-- Header & Search Controls end-->

 <div class="grid grid-cols-1 lg:grid-cols-3">

 <!--Send sms and email section start -->
  <div class="lg:col-span-2 bg-white rounded shadow overflow-auto mr-2">
     <!-- <form action="#" class="mb-0 space-y-0 space-x-0 sm:space-x-16 sm:mr-16 rounded-lg sm:p-6 lg:p-1"> -->
    <form action="#">
       <div class="border border-gray-200 rounded-xl px-4 py-2 h-full bg-white"> 
         <div class="flex flex-col space-y-4 ">


             <div class="flex flex-col sm:flex-row space-x-0 sm:space-x-4 mt-1">
             <div class="flex-1">
               <label for="date" class="text-sm text-center w-full">SCHEDULE DATE</label>
               <input type="date" v-model="senddate" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
             </div>
   
             <div class="flex-1">
               <label for="time" class="text-sm text-center w-full">SCHEDULE TIME</label>
               <input type="time" v-model="sendtime" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
             </div>
           </div>


           <div class="flex flex-col sm:flex-row sm:space-x-4">
             <div class="flex-1">
               <label for="header" class="text-sm ml-3">TEXT HEADER</label>
               <input type="text" v-model="textheader" class="border border-gray-200 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-black" />
             </div>
           </div>  
   
              <div class="flex-1">
               <label for="email" class="text-sm ml-3">EMAIL ADDRESS</label>
                <input type="text" v-model="email" class="border border-gray-200 rounded p-3 w-full focus:outline-none focus:ring-2 focus:ring-black" />
             </div>

      
        
   
           <div class="mt-4" v-if="hideonecontact">
             <label for="contacts" class="text-sm ml-3">ENTER CONTACTS</label>
             <!-- <textarea v-model="phonenumber" rows="2" class="w-full rounded-lg border border-gray-700 p-3 text-sm shadow-sm focus:border-black focus:ring-black" placeholder="Contacts comma separated"></textarea> -->
             <input type="number" v-model="phonenumber" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black focus:ring-black text-black bg-white" />
           </div>
   
           <div class="mt-3">
             <label for="message" class="text-sm ml-3">WRITE MESSAGE</label>
       
             <textarea v-model="textmessage" class="w-full rounded-lg p-3 border border-gray-200 text-sm shadow-sm focus:border-black
              focus:ring-black text-black bg-white" >  </textarea>
               
               <!-- <QuillEditor v-model="textmessage"   id="richEditor"   
               class="w-full h-164 bg-white border border-gray-300 rounded-lg shadow-sm"   
               :options="editorOptions"
               @input="handleInput"   /> -->
            </div> 
   
           <div class="mt-5 mb-4 text-center">
             <a @click="SendSms" class="inline-block rounded bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-blue-800 focus:outline-none focus:ring focus:ring-yellow-400">SUBMIT</a>
           </div>

         </div>
       </div>
     </form>
   </div>
   
<!-- Sidebar SMStemplates section start -->
  <div class="col-span-1 bg-gray-100 h-auto rounded-lg border border-gray-300 ">
       <article class="rounded-xl border  border-gray-100">
        <ul>
             <li v-for="(item, index) in SMStemplates" :key="index"
             @click="Usetemplate(item.templateBody)">
             <a href="#" class="block h-full rounded-lg border border-gray-200 p-4 hover:border-gray-400">
             <span class="font-medium text-gray-700">{{ item.templateBody }}</span>
             <small class="mt-1 text-m text-gray-800"> edit</small>
            </a>
           </li>
          </ul>
         </article>
    </div>
<!-- Sidebar SMStemplates section end -->

  </div>
</div>
   
   
    
   
   
   
   
  <!--Choose contacts dialog start-->
     <div v-if="isModalContactsOpen" class="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center overflow-y-auto">
     <div class="bg-white p-3 rounded-lg shadow-lg max-w-lg w-full max-h-screen h-screen overflow-y-auto">
       <!-- <p class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center">Contacts, Contact Group</p>   -->
       <div class="relative flex items-center justify-center">
             <p class="text-lg font-semibold uppercase tracking-widest text-gray-700 text-center">SELECT CONTACTS </p>
             <button @click="CloseModalContacts" class="absolute right-0 bg-black text-white px-1 rounded">x</button>
           </div>
       <ul class="space-y-2 mt-2">
         <li class="border rounded-md p-4" v-for="(cont, index) in contacts" :key="index">
           <div @click="UseContactGroup(cont.username, cont.phoneNumber,cont.email)">  
             <div>
               <span class="text-2xl">{{ index + 1 }}.</span>
               <span class="text-2xl"> {{ cont.username }} </span> 
             </div>
             <div class="ml-2">
             <span>{{ cont.phoneNumber }}</span> 
             </div>
             <div class="ml-2">
             <span>{{ cont.email }}</span> 
            </div>
           </div>  
         </li>
       </ul>
     </div>
     </div>
<!-- Choose contacts  dialog end -->


  <!-- Add edit sms template start -->
   <div v-if="isModalTempOpen" class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center px-4">
      <div class="bg-white w-full max-w-lg p-4 rounded shadow-lg">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-gray-700 text-center w-full">
            {{ Mode === 'addmode' ? 'ADD NEW MESSAGE TEMPLATE' : 'EDIT MESSAGE TEMPLATE' }}
          </h2>
          <button @click="closeTemplateModal" class="bg-black text-white px-2 rounded">x</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-sm text-black">Text Header</label>
            <input type="text" v-model="templateHeader" class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" />
          </div>
          <div>
            <label class="block text-sm text-black">Enter Body</label>
            <textarea rows="4" v-model="templateBody" class="w-full rounded-lg p-2 text-sm border border-gray-300 shadow-sm focus:ring focus:ring-black focus:border-black" placeholder="Type your message here (max 2000 chars)"></textarea>
          </div>
        </div>

        <div class="mt-4 flex justify-end gap-2">
          <a v-if="Mode === 'addmode'" @click="Submittemplate"
             class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Submit</a>
          <div v-else class="flex gap-2">
            <a @click="Edittemplate" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">Edit</a>
            <a @click="DisableTemplate" class="bg-gray-600 text-white px-4 py-2 rounded">Delete</a>
          </div>
        </div>
      </div>
   </div> 
  <!-- Add edit sms template end -->
   
 
   
   </template>
   
   <script>
   import { usecontactstore } from '../store/contactstore';
   import { useMessageStore } from  '../store/MessageStore';
   import Swal from 'sweetalert2';
   import { computed ,watch, onMounted,ref } from 'vue';
   import axios from '../axios';
   import { QuillEditor } from '@vueup/vue-quill';
   import '@vueup/vue-quill/dist/vue-quill.snow.css';
   import { errorState } from '../store/ErrorState';

  //  import { Vue3Quill } from 'vue3-quill';
  //  import Quill from 'quill'; 
   //fetchContacts  <QuillEditor v-model="content" :options="editorOptions" />


   
   export default { 
    components: {
    QuillEditor,
  },
     setup() { 
   
   
       const token = ref(localStorage.getItem('token')); 
       const isModalContactsOpen = ref(false);
       const contactgrouselected = ref(false);
       const hideonecontact = ref(true);
       const Mode = ref('addmode');
      //  const senderid = ref('');
       const textheader = ref('');
       const textmessage = ref('');
       const sendtime = ref('');
       const senddate = ref(''); 
       const selectAllpeople = ref(false);
       const phonenumber = ref('');  
       const email = ref('');
       const contactlist = ref([]);
       const sendmsg = ref([]);
       const filteredNumbers = ref([]);
       const isModalTempOpen = ref(false);
       const templateHeader = ref('');
       const templateBody = ref('');
       const contactstore = usecontactstore();
       const messageStore = useMessageStore();

       const contacts = computed(() => contactstore.filteredContacts);
       const SMStemplates = computed(() => contactstore.getTemplate);
   
   
       onMounted(() => {
         // groupstore.fetchContactGroup();
         // templatestore.fetchSmsTemplate();
         // groupstore.fetchContactList();
         // senderstore.fetchSenderID();

         contactstore.fetchContacts(token.value);
         contactstore.fetchTemplates(token.value); 
         });
         
   watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 
   
   
       const Usetemplate = (body,email,name) => {
         textheader.value = name;
         textmessage .value=body;
       }
   
       const UseContactGroup = (name,phone,Emailtxt) =>{
        filteredNumbers.value = phone;
        phonenumber.value = phone;
        email.value = Emailtxt;

        //  contactgrouselected.value = true;
        //  hideonecontact.value = false;
        //  filteredNumbers.value = contacts.value
        //  .filter(item => item[1].includes(name)) // Filter items based on name
        //  .map(item => ({
        //    phoneNumber: item[0],
        //    name: item[1],
        //    isChecked: true
        //  })); 

         isModalContactsOpen.value = false;
     }
             
    const generateUnique6DigitCode = () => {
        const timestamp = Date.now().toString();
        const uniqueNumber = timestamp.slice(-6);
        const randomLetter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
        return "msg_" + randomLetter + uniqueNumber;
      }
        
    const SendSms = () => { 
       if(textheader.value == "" || textheader.value == undefined){
           showalertdialog("error", "text header is required");
           return;
          } 
         else if(phonenumber.value == "" || phonenumber.value == undefined){
           showalertdialog("error", "phone no is required");
           return;
         } 
         else if(textmessage.value == "" || textmessage.value == undefined){
           showalertdialog("error", "text body  is required");
           return;
         }
         else{
         // Split the input by commas, trim spaces, and filter out empty values
         // const phoneNumbersArray = phonenumber.value
         //   .split(',')
         //   .map(number => number.trim())
         //   .filter(number => number !== '');
   
    
      //  const phoneNumbersObject = phoneNumbersArray.join(",");

      const smspayload = { notification: [ {
                          messageID: generateUnique6DigitCode(),
                          phoneNumber: filteredNumbers.value,
                          textHeader: textheader.value,
                          message: textmessage.value,
                          status: "0",
                          module: "universal",
                          smsRequest: [
                            {
                             // username: "felofelo",
                              to: filteredNumbers.value,
                              header: textheader.value,
                              senderId: "string",
                              message: textmessage.value,
                             // token: "stcvfdhytutsrghcvnmiiiiiiiuyttrewring"
                            }
                          ]
                        }
                      ]
                    };
          
         messageStore.SendSms(smspayload,token.value);
       }   };
                    
           
                  









 const Submittemplate = () => {
    if(templateHeader.value == " " || templateHeader.value == undefined){
      DisplayMessage("error", "header is required");
      return;
    } 
    else if(templateBody.value == " " || templateBody.value == undefined){
      DisplayMessage("error", "body no is required");
      return;
    } 
     else{
         const data = {
           template:[{
               templateID: templateHeader.value,
               templateBody: templateBody.value,
              //  status: 1,
           }]
         }
       try{
         contactstore.AddNewTemplate(data,token.value);
          contactstore.fetchTemplates(token.value); //reload dataS
          closeTemplateModal();
       }
       catch(error){
         console.log(error);
       }
      }
     
    }


  const OpenContacts=()=>{ 
    contactstore.fetchContacts();
    isModalContactsOpen.value = true;
  };
   
  const OpenTemplateModal = () =>{
    isModalTempOpen.value = true;
  } 

  const closeTemplateModal = () =>{
    isModalTempOpen.value = false;
  } 

  const CloseModalContacts =()=>{
    isModalContactsOpen.value = false;
  };

  const showalertdialog = (icon,resp) => {
    Swal.fire({
      position: "top-end",
      icon:  icon,
      title: resp,
      showConfirmButton: false,
      timer: 1500
    });
       };
   
      //  const closeModalPickContact =() =>{
      //    isModalPickContactsOpen.value = false;
      //  };
   
      //  const SubmitContacts =()=>{
      //    isModalPickContactsOpen.value = false;
   
   
      //  }
   
      // Function to toggle all checkboxes
     const toggleSelectAll = () => { 
     let chck = filteredNumbers.value;
   
     chck.forEach(item => {
       // chck.isChecked = selectAllpeople.value;
       filteredusers.isChecked = selectAllpeople.value;
         });
       };
   
       const checkSelectAllState = () => {
         selectAll.value = items.value.every(item => item.isChecked);
       };

       const handleInput = (value) => {
        textmessage.value = value.explicitOriginalTarget.innerText;
      };

      //  const editorOptions = ref({ 
      //   theme: 'snow',
      //   // placeholder: 'Write something amazing...',
      //   modules: {
      //     toolbar: [   // Toolbar rows
      //       [{ font: [] }], 
            // [{ size: ['small', false, 'large', 'huge'] }], // Font size dropdown
            // ['bold', 'italic', 'underline', 'strike'], // Text styles
            // [{ color: [] }, { background: [] }], // Text and background colors
            // [{ script: 'sub' }, { script: 'super' }], // Subscript/Superscript
            // [{ header: 1 }, { header: 2 }], // Header styles
            // [{ list: 'ordered' }, { list: 'bullet' }], // Lists
            // [{ align: [] }], // Text alignment
            // ['link', 'image', 'video'], // Links, images, videos
            // ['blockquote', 'code-block'], // Blockquote and code block
      //       ['clean'], // Clear formatting
      //     ],
      //   },
      // });
   
    
   
       // Return reactive state and functions
       
       return {
         isModalContactsOpen,
         OpenContacts,
         CloseModalContacts,
         textheader, 
         textmessage,
         sendtime,
         senddate,
         phonenumber,
         SendSms,
         contacts,
         token,
         generateUnique6DigitCode,
         // senderids,
      Mode,
      email,
      Submittemplate,
         Usetemplate,
         contactlist,
         showalertdialog,
         filteredNumbers,
         contactgrouselected,
         toggleSelectAll,
         selectAllpeople,
         checkSelectAllState,
         hideonecontact,
         isModalTempOpen,
         OpenTemplateModal,
         closeTemplateModal,
        //  isModalPickContactsOpen,
        //  closeModalPickContact,
         UseContactGroup, 
       SMStemplates,
        // editorOptions,
        handleInput,
        templateHeader,
       templateBody 
       };
     }
   }
   </script>
   
   <style>
    @import "quill/dist/quill.snow.css";
   </style>
   
  
   