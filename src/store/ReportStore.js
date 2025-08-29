import { defineStore } from 'pinia';
import axios from '../axios';

export const useReportStore = defineStore('ReportStore', {
  state: () => ({
    reportData: [],
    success: false,
    error: null,
    token: localStorage.getItem('token')
  }),

  actions: {  
    async FetchReportData(postData) {
      try {
        this.success = false;
        this.error = null;
        
        const response = await axios.getReportData(postData);
        
        // Ensure we have an array of data
        this.reportData = Array.isArray(response.data) ? response.data : [response.data];
        this.success = true;
        
        return this.reportData;
      } catch (error) {
        this.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

    async GenerateLowStockReport(postData){
      try{
        this.success = false;
        this.error = null;

        var response = await axios.getLowStockReport(postData);

        this.reportData = Array.isArray(response.data) ? response.data : [response.data];
        this.success = true;

        return this.reportData;

      }catch(error){
        this.error = error.response?.data?.message || error.message;
        throw error;
      }
    },

   async ExportReportData(postData,reportName) {
  try {
    this.success = false;
    this.error = null;

    const format = postData.format?.toLowerCase() || 'pdf';
    let mimeType = '';
    let fileExtension = '';

    if (format === 'pdf') {
      mimeType = "application/pdf";
      fileExtension = ".pdf";
    } else if (format === 'xlsx') {
      mimeType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
      fileExtension = ".xlsx";
    } else {
      mimeType = "application/octet-stream";
      fileExtension = '';
    }

    const response = await axios.exportReportData(postData, mimeType, this.token); // passing token

    const blob = new Blob([response.data], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', reportName.replace(/\s/g, '') + fileExtension);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    this.success = true;

  } catch (error) {
    console.error(error);
    this.error = error.response?.data?.message || error.message;
    throw error;
  }
},


    clearReportData() {
      this.reportData = [];
      this.success = false;
      this.error = null;
    }
  }
});