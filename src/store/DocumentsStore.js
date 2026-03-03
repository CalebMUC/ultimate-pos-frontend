import { defineStore } from 'pinia';
import axios from '../axios';


export const UseDocumentStore = defineStore('DocumentStore', {
  state: () => ({
    uploadedFileId: null,
    previewBlobUrl: null,
    data: [], 
    loading: false,
    error: null,
  }),

getters: {
    getData: (state) => state.data,

},


  actions: {
    async upload({ fileName, file }) {
      this.loading = true
      this.error = null
      const formData = new FormData();
      formData.append('file', file);
      formData.append('fileName', fileName);
      try {
        const response = await axios.uploadFile(formData)
        this.data = response.data;
      } catch (error) {
        this.error = error?.message || 'Upload failed'
      } finally {
        this.loading = false
      }
    },

   async fetchDocuments(){
      this.loading = true
      this.error = null
      try {
        const response = await axios.GetFiles()
        this.data = response.data;
      } catch (error) {
        this.error = error?.message || 'Failed to fetch documents'
      } finally {
        this.loading = false
      }
    },

    async preview(fileId) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.getFilePreview(fileId);
        const blob = new Blob([res.data], { type: 'application/pdf' });
        this.previewBlobUrl = URL.createObjectURL(blob);
      } catch (error) {
        this.error = error?.message || 'Preview failed'
      } finally {
        this.loading = false
      }
    },

    async download(fileId) {
      this.loading = true
      this.error = null
      try {
        const res = await axios.downloadFile(fileId);
        const blob = new Blob([res.data], { type: res.headers['content-type'] });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        const disposition = res.headers['content-disposition'];
        const filename = disposition?.match(/filename="?(.+)"?/)?.[1] || 'downloaded_file';
        link.download = filename;
        link.click();
      } catch (error) {
        this.error = error?.message || 'Download failed'
      } finally {
        this.loading = false
      }
    }
  },
});
