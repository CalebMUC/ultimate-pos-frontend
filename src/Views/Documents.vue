<template>
  <div class="min-h-screen flex bg-gray-100">
    <!-- Main Content -->
    <main class="flex-1 p-3 overflow-auto">

      <!-- Header Section -->
      <div class="px-1 py-0 border-b border-gray-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 class="text-2xl font-bold text-gray-800">DOC-MANAGER</h1>
          <p class="text-sm text-gray-500 mt-1 mb-1">Manage all your business documents</p>
        </div>
        <button 
          @click="ModalDocOpen" 
          class="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd" />
          </svg>
          Add New Document
        </button>
      </div>

      <!-- Upload Modal -->
      <div v-if="uploadDoc" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg w-full max-w-md p-6 shadow-lg">
          <!-- Header -->
          <div class="flex justify-between items-center mb-4">
            <h2 class="text-lg font-semibold">Upload Document</h2>
            <button @click="ModalDocClose" class="text-gray-500 hover:text-red-500 text-xl">&times;</button>
          </div>

          <!-- File Name -->
          <div class="mb-3">
            <label class="block mb-1 font-medium">File Name</label>
            <input type="text" v-model="FileName" class="w-full border rounded p-2" />
          </div>

          <!-- Link to Entity -->
          <div class="mb-3">
            <label class="block mb-1 font-medium">Link To</label>
            <select v-model="linkedEntity" class="w-full border rounded p-2">
              <option value="">-- Select --</option>
              <option value="Invoice">Invoice</option>
              <option value="Supplier">Supplier</option>
              <option value="Expense">Expense</option>
            </select>
          </div>

          <!-- Choose file -->
          <div class="mb-4">
            <label class="block mb-1 font-medium">Choose File</label>
            <input type="file" @change="handleFileChange" class="w-full border rounded p-2" />
            <p v-if="selectedFile" class="text-sm mt-2 text-gray-600">
              Selected: {{ selectedFile.name }}
            </p>
          </div>

          <!-- Buttons -->
          <div class="flex justify-end gap-2">
            <button @click="ModalDocClose" class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded">Cancel</button>
            <button :disabled="!selectedFile || !FileName || !linkedEntity"
              @click="uploadDocument"
              class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded disabled:opacity-50">
              Upload
            </button>
          </div>
        </div>
      </div>

      <!-- Search & Filters -->
      <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 space-y-3 sm:space-y-0">
        <input v-model="searchQuery"
          type="text"
          placeholder="Search documents..."
          class="flex-1 p-2 border border-gray-300 rounded"
        />

        <select v-model="filterEntity" class="p-2 border border-gray-300 rounded">
          <option value="">All</option>
          <option value="Invoice">Invoices</option>
          <option value="Supplier">Suppliers</option>
          <option value="Expense">Expenses</option>
        </select>
      </div>

      <!-- Document List -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="doc in filteredDocuments" :key="doc.documentId"
          class="bg-white p-4 rounded shadow hover:shadow-md cursor-pointer">
          <div class="flex items-center space-x-3 mb-2">
            <svg class="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
              <path d="M6 2h7a2 2 0 012 2v16a2 2 0 01-2 2H6a2 2 0 01-2-2V4a2 2 0 012-2z"/>
            </svg>
            <div>
              <h4 class="font-semibold truncate max-w-xs">{{ doc.fileName }}</h4>
              <p class="text-xs text-gray-500">{{ doc.uploadedOn }}</p>
              <span class="text-xs bg-gray-100 px-2 py-0.5 rounded">{{ doc.linkedEntity }}</span>
            </div>
          </div>
          <div class="flex justify-between text-sm text-gray-400">
            <button @click="previewFile(doc.documentId)" class="hover:text-blue-600">Preview</button>
            <button @click="downloadFile(doc.documentId)" class="hover:text-green-600">Download</button>
            <button @click="deleteFile(doc.documentId)" class="hover:text-red-600">Delete</button>
          </div>
        </div>
      </div>
    </main>

    <!-- PDF Preview Modal -->
    <div v-if="previewUrl" class="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div class="bg-white rounded-lg w-full max-w-6xl h-[90vh] overflow-hidden flex flex-col">
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
import { UseDocumentStore } from '../store/DocumentsStore';
import { computed, ref, onMounted } from 'vue';

export default {
  setup() {
    const fileStore = UseDocumentStore();
    const previewUrl = ref(null);
    const uploadDoc = ref(false);
    const FileName = ref('');
    const selectedFile = ref('');
    const linkedEntity = ref('');
    const token = ref('');
    const searchQuery = ref('');
    const filterEntity = ref('');

    const DocumentList = computed(() => fileStore.getData);

    const filteredDocuments = computed(() => {
      return DocumentList.value.filter(doc => {
        const matchesSearch = doc.fileName.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesEntity = filterEntity.value ? doc.linkedEntity === filterEntity.value : true;
        return matchesSearch && matchesEntity;
      });
    });

    onMounted(() => {
      token.value = localStorage.getItem('token');
      fileStore.fetchDocuments(token.value);
    });

    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "image/jpeg",
        "image/png"
      ];

      if (!allowedTypes.includes(file.type)) {
        alert("Invalid file type.");
        return;
      }

      selectedFile.value = file;
    };

    const uploadDocument = async () => {
      const postDoc = {
        file: selectedFile.value,
        fileName: FileName.value,
        linkedEntity: linkedEntity.value,
      };
      await fileStore.upload(postDoc, token.value);
      ModalDocClose();
    };

    const previewFile = async (fileId) => {
      await fileStore.preview(fileId, token.value);
      previewUrl.value = fileStore.previewBlobUrl;
    };

    const downloadFile = async (fileId) => {
      await fileStore.download(fileId, token.value);
    };

    const deleteFile = async (fileId) => {
      if (confirm("Are you sure you want to delete this file?")) {
        await fileStore.delete(fileId, token.value);
      }
    };

    const ModalDocOpen = () => { uploadDoc.value = true; };
    const ModalDocClose = () => { uploadDoc.value = false; };

    return {
      fileStore,
      previewUrl,
      uploadDoc,
      ModalDocClose,
      ModalDocOpen,
      handleFileChange,
      uploadDocument,
      DocumentList,
      previewFile,
      FileName,
      downloadFile,
      deleteFile,
      selectedFile,
      linkedEntity,
      token,
      searchQuery,
      filterEntity,
      filteredDocuments
    };
  }
};
</script>
