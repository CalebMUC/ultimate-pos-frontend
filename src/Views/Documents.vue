<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Main Content -->
    <main class="flex-1 p-3 overflow-auto">

      <!-- Header Section -->
      <div class="px-1 py-0 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">DOC-MANAGER:</h1>
          <p class="text-sm text-gray-500 mt-1 mb-1">Manage your all your  documents  here</p>
        </div>
        <button @click="ModalDocOpen" class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none 
          focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Document
        </button>
      </div>

      <!-- <span>{{ DocumentList }}</span> -->
      <!-- Add document modal start-->
<div v-if="uploadDoc" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
      <!-- Header -->
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-lg font-semibold">Upload Document</h2>
        <button @click="ModalDocClose" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
      </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">File Name</label>
                    <input
                      type="text"
                      id="file-name"
                      v-model="FileName"
                      class="w-full border rounded p-2"
                    />
                  </div>

      <div class="mb-4">
        <label class="block mb-1 font-medium">Choose file:</label>
        <input type="file" @change="handleFileChange" class="w-full border rounded p-2" />
        <p v-if="selectedFile" class="text-sm mt-2 text-gray-600">
          Selected: {{ selectedFile.name }}
        </p>
      </div>

      <div class="flex justify-end gap-2">
        <button @click="closeModal" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">
          Cancel
        </button>
        <button
          :disabled="!selectedFile"
          @click="uploadDocument"
          class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50">
          Upload
        </button>
      </div>
    </div>
  </div>



      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <input
          type="text"
          placeholder="Search documents..."
          class="flex-1 p-2 border border-gray-300 rounded"
        />
       
      </div>

      <!-- Document List DocumentList-->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="doc in DocumentList "
          :key="doc.id"
          class="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer"
        >
          <div class="flex items-center space-x-3 mb-2">
            <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2h7a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/>
            </svg>
            <div>
              <h4 class="font-semibold truncate max-w-xs">{{ doc.fileName }}</h4>
              <p class="text-xs text-gray-500">{{ doc.createdOn }}</p>
            </div>
          </div>
          <div class="flex justify-between text-sm text-gray-400">
            <button @click="previewFile(doc.documentId)" class="hover:text-blue-600">Preview</button>
            <button @click="downloadFile(doc.documentId)" class="hover:text-green-600">Download</button>
            <button class="hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </main>

    <!-- PDF Preview Modal -->
     <div v-if="previewUrl" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
    <div class="bg-white rounded-lg w-full max-w-8xl h-[90vh] overflow-hidden flex flex-col">
      <div class="flex justify-between items-center p-4 border-b">
        <h2 class="text-lg font-semibold">Document Preview</h2>
        <button @click="previewUrl = null" class="text-red-500 hover:underline">Close</button>
      </div>
      <iframe :src="previewUrl" class="flex-1 w-full" frameborder="0"></iframe>
    </div>
  </div>
  </div>


  
</template>

<script>
   import FilePreview   from './FilePreview.vue';
    import {UseDocumentStore} from '../store/DocumentsStore';
    import { computed,ref,onMounted,watch } from 'vue';


export default {
  setup() {

  const fileStore = UseDocumentStore();
  const previewUrl = ref(null);
  const uploadDoc = ref(false); 
  const FileName = ref('');
  const selectedFile = ref('');
  const token = ref(''); 

  const DocumentList = computed(() => fileStore.getData);  

  const documentslist= ref ([
        { id: 1, name: "Project_Plan.pdf", modified: "2025-06-05" },
        { id: 2, name: "Meeting_Notes.docx", modified: "2025-06-01" },
        { id: 3, name: "Budget.xlsx", modified: "2025-05-28" },
      ]);

  onMounted(()=> {
          token.value = localStorage.getItem('token'); 
        fileStore.fetchDocuments(token.value);
        });


 const handleFileChange = (e) => {
  selectedFile.value = e.target.files[0]; // ✅ store selected file
 };

const uploadDocument = async () => {
  if (!selectedFile.value || !FileName.value) {
    alert("Please select a file and provide a file name.");
    return;
  }
  const postDoc = {
    file: selectedFile.value,
    fileName: FileName.value,
  };

  await fileStore.upload(postDoc,token.value); // upload via Pinia store
};

const previewFile = async (fileId) => { 
  await fileStore.preview(fileId,token.value);
  previewUrl.value = fileStore.previewBlobUrl;
}; 

const downloadFile = async (fileid) => { 
  console.log(fileid,"test");

  fileStore.download(fileStore.download(fileid,token.value));
};



const ModalDocOpen= ()=>{
  uploadDoc.value = true;
} 


const ModalDocClose= ()=>{
  uploadDoc.value = false;
}


    return { 
      fileStore,
      previewUrl,
      uploadDoc,
      ModalDocClose,
      ModalDocOpen,
      handleFileChange,
      uploadDocument,
      DocumentList,
      documentslist,
      previewFile,
      FileName,
      downloadFile,
      selectedFile,
      token
    }
  }
};
      
</script>

<style scoped>
main::-webkit-scrollbar {
  width: 8px;
}
main::-webkit-scrollbar-thumb {
  background-color: rgba(100, 100, 100, 0.3);
  border-radius: 4px;
}
</style>
