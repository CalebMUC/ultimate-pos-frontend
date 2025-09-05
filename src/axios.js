import axios from 'axios';
import { errorState } from '../src/store/ErrorState'
import {useRouter } from 'vue-router'
import Documents from './Views/Documents.vue';


const router = useRouter(); 

let dynamicBaseURL = 'https://localhost:7231/api/' 

let token = localStorage.getItem('token');

const apiClient = axios.create({
  baseURL: dynamicBaseURL, //'http://localhost:5134/api/',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    const errMsg = error.response?.data?.message || error.message
    const errCode = error.response?.status || null
    errorState.message = errMsg
    errorState.code = errCode 

    if (!error.response) {
       router.push('/login')
    }

    return Promise.reject(error)
  }
)



function setBaseURL(url) {
  dynamicBaseURL = url
  apiClient.defaults.baseURL = url 
}


export default { 

//-------------------------------------------------
    //USER AUTHENTICATION ENDPOINTS 
//-------------------------------------------------
  register(postData) {
    return apiClient.post(`/Authentication/Register`, postData, {
      })
      .then(response => {
        return response.data;
      });
  },

//LOGIN USER
  ulogin(postData) { 
      setBaseURL(postData.env);
      delete postData.env;
    return apiClient.post(`Authentication/Login`, postData, {
      })
      .then(response => {
        return response.data;
      });
  },


//-------------------------------------------------
   //RolePermission Endpoints ENDPOINTS
//-------------------------------------------------
GetRolePermissions(postData) { 
      return apiClient.post('/Authentication/GetRolePermissions', postData,  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });
    },

    GetPermissions() { 
      return apiClient.post('/Authentication/GetPermissions', {},  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });
    },
    
    GetPermissionsModuleGroups() { 
      return apiClient.post('/Authentication/GetPermissionsModules', {},  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });
    },

      GetRoles() { 
      return apiClient.post('/Authentication/GetRoles', {},  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });
    },

     AddRole(postData) { 
      return apiClient.post('/Authentication/AddRole', postData,  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });

    },

     SaveRolePermissions(postData) { 
      return apiClient.post('/Authentication/SaveRolePermissions', postData,  {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .then(response => { 
        return response;
      });
    },

    getUsers(token){
    return apiClient.post('/Authentication/GetUsers', {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    //},
  })
  .then(response => {
    return response.data;
  });
    },

//-------------------------------------------------
   //Dashboard ENDPOINTS
//-------------------------------------------------
  getDashboardAverages(token) {
    return apiClient.get(`/Dashboard/SalesAverages`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

getGraphData(token) {
  return apiClient.get(`/Dashboard/Graphdata`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response;
});
},

getRecentSalesData(token) {
  return apiClient.get(`/Dashboard/RecentSales`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response;
});
},


//-------------------------------------------------
   //product ENDPOINTS
//-------------------------------------------------
  addproduct(postData) { 
    // console.log(postData);

    return apiClient.post('/Products/AddProducts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },
  
//http://localhost:5134/api/Catalogue/GetActiveCatelogue

    getActiveprooducts(token) { 
      return apiClient.post('/Catalogue/GetActiveCatelogue', {},  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => { 
        return response;
      });
    },

    getproduct() { 
      return apiClient.post('/Products/GetProducts', {},  {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => { 
        return response;
      });
    },

     updateproduct(postData) { 
    // console.log(postData);

    return apiClient.post('/Products/EditProducts', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },

  //update product
  // updateproduct(id, updateData, token) {
  //       return apiClient.put(`/updateproduct/${id}`, updateData, {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       })
  //       .then(response => {
  //         return response.data;
  //       });
  // },

  //delete product
  deleteproduct(id, token) {
    return apiClient.delete(`/deleteproduct/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },



//-------------------------------------------------
   //SUPPLIER ENDPOINTS
//-------------------------------------------------
//add supplier
  addsupplier(postData) {
    return apiClient.post('/Suppliers/AddSupplier', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },

  updatesupplier(postData) {
    return apiClient.post('/Suppliers/EditSupplier', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response;
    });
  },


 //get all supplier
  getsupplier() { //token
    return apiClient.post('/Suppliers/GetSuppliers', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
     })
     .then(response => {
      return response.data;
    });
  },


 //update supplier
//  updatesupplier(id, updateData, token) {
//   return apiClient.put(`/updatesupplier/${id}`, updateData, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   .then(response => {
//     return response.data;
//   });
// },

//delete supplier
  deletesupplier(id, token) {
  return apiClient.delete(`/deletesupplier/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
  });
  },



  //-------------------------------------------------
   //SUPPLIES ENDPOINTS
//-------------------------------------------------
//http://localhost:5134/api/Suppliers/AddSupplier
//add supplies
addsupplies(postData) {
  return apiClient.post('/Suppliers/AddSupplier', postData, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  })
  .then(response => {
    return response;
  });
},


//get all supplies
getsupplies() { //token
  return apiClient.post('/Suppliers/GetSuppliers',  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
   })
   .then(response => {
    return response.data;
  });
},


//update supplier
updatesupplies(id, updateData, token) {
return apiClient.put(`/updatesupplier/${id}`, updateData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response.data;
});
},

//delete supplies
deletesupplies(id, token) {
return apiClient.delete(`/deletesupplier/${id}`, {
headers: {
  Authorization: `Bearer ${token}`,
},
});
},

getSupplierTransactions(id){
  return apiClient.delete(`/deletesupplier/${id}`, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
    });
},



  
//-------------------------------------------------
   //TRANSACTIONS ENDPOINTS
//-------------------------------------------------

  
//Add transactions
//	 http://localhost:5134/api/Transactions/AddSales'
// return apiClient.post('/Ultimate/AddProducts', postData, {  addtransaction
addtransaction(postData) {
  return apiClient.post('/Transactions/AddSales', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

// get one Transaction
getTransactions() {
  return apiClient.post('/Transactions/GetTransactions', {}, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},



//update transactions
updateTransaction(id, updateData, token) {
return apiClient.put(`/updateTransaction/${id}`, updateData, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
})
.then(response => {
  return response.data;
});
},

//delete transactions
deletetransaction(id, token) {
return apiClient.delete(`/deletetransaction/${id}`, {
headers: {
Authorization: `Bearer ${token}`,
},
});
},



//-------------------------------------------------
   //CATALOGUE ENDPOINTS
//-------------------------------------------------

  //Add catalogue
  addcatalogue(postData, token) {
    return apiClient.post('/addcatalogue', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },


  //get catalogue
  getcatalogue(token) {
    return apiClient.post('/Catalogue/GetCatalogue', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  }, 

   getActivecatalogue() {
    return apiClient.post('Catalogue/GetActiveCatelogue', {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  }, 

  //

   //update catalogue
   updatecatalogue(id, updateData, token) {
    return apiClient.put(`/updatecategory/${id}`, updatecatalogue, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    })
  .catch((error)=>{
      // console.log(error);
    })
},

//delete catalogue
deletecatalogue(id, token) {
return apiClient.delete(`/deletecatalogue/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},


//-------------------------------------------------
   //CATEGORIES ENDPOINTS
//-------------------------------------------------
  //Add Categories
  addcategories(postData) { 
    return apiClient.post(`/Category/AddCategory`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { 
      return response.data;
    });
  },
  editCategories(postData) { 
    return apiClient.post(`/Category/EditCategory`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { 
      return response.data;
    });
  },


  //get category
  getcategory(token) {
    return apiClient.post('/Category/GetCategory',  {},{
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => { 
      return response;
    });
  },

   //update category
   updatecategory(id, updateData, token) {
    return apiClient.put(`/updatecategory/${id}`, updateData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
},

//delete category
deletecategory(id, token) {
return apiClient.delete(`/deletecategory/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},


//-------------------------------------------------
   //INVENTORY ENDPOINTS
//-------------------------------------------------

  //Add inventory
  addinventory(postData) {
    return apiClient.post('/addinventory', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },


  //get inventory 
  getinventory() {
    return apiClient.get('/getinventory',  {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(response => {
      return response.data;
    });
  },

    //update inventory
  updateinventory(id, updateData, token) {
  return apiClient.put(`/updateinventory/${id}`, updateinventory, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

//delete inventory
deleteinventory(id, token) {
return apiClient.delete(`/deleteinventory/${id}`, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
},

//____________________________________________
// NotificationS ENDPOINTS 
//**************************************************
 
getcontacts(token) {
  return apiClient.get('/Notification/GetContacts',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},


getTemplates(token) {
  return apiClient.get('/Notification/GetSmsTemplates',  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},
//


addcontact(postData,token) { 
  // console.log(postData);

  return apiClient.post('/Notification/AddContact', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

addsmsTemplate(postData,token) { 
  // console.log(postData);

  return apiClient.post('/Notification/AddSmsTemplate', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
}, 

getSentMessages() {
  return apiClient.get('/getinventory',  {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  })
  .then(response => {
    return response.data;
  });
}, 

SendSms(postData,token) { 
  return apiClient.post('/Notification/Sendsms', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},




AddNotification(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


//##############################
// Documents
//###############################

async uploadFile(formData, token) {
  return axios.post(
    'http://localhost:5134/api/Document/AddDocument',
    formData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }
  );
},

  // async uploadFile(formData,token) {
  //   return apiClient.post('/Document/AddDocument', formData,  {
  //   headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //   });
  // },

    async GetFiles(token) {
    return apiClient.post('/Document/GetDocuments', {}, {
    headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },


  // important for binary response (PDF) 
  async getFilePreview(fileId,token) {
    return apiClient.get(`/Document/preview/${fileId}`, {
      responseType: 'blob', 
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  async downloadFile(fileId) {
    return apiClient.get(`/Document/DownloadDocument/${fileId}`, {
      responseType: 'blob',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },

  //-------------------------------------------------
   //Report ENDPOINTS
//-------------------------------------------------
  getReportData(postData) {
    return apiClient.post(`/Reports/Generate`,postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

 getLowStockReport(postData) {
    return apiClient.post(`/Reports/GenerateLowStockReport`,postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });
},

exportReportData(postData,mimeType){
  return apiClient.post('/Reports/ExportStockReports',postData,{
    headers : {
      Authorization: `Bearer ${token}`,
      Accept : mimeType,
    },
    responseType : 'blob'
  })
    .then(response =>{
      return response;
    });
},

// **************************************
  //USER ACCOUNT DETAILS
// ************************************** 

addEditRoles(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


addEditPermissions(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

},


addBusinessDetails(postData,token) {
  return apiClient.post('/Notification/AddNotification', postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response;
  });

}, 



getPermissions(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

 getRoles(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},
 

// getUsers(token) {
//     return apiClient.get(`/accountdetails/${id}`, {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   })
//   .then(response => {
//     return response.data;
//   });
// },


getLogDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

getAccountDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

getBusinessDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

//Mock Dat
// Mock data generator for demonstration
 generateMockData (filters, businessType)  {
  // This would be replaced with actual API calls in a real application
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const products = ['Product A', 'Product B', 'Product C', 'Product D', 'Product E'];
  const categories = {
    general: ['Electronics', 'Clothing', 'Home Goods'],
    supermarket: ['Produce', 'Dairy', 'Meat', 'Bakery', 'Frozen Foods'],
    pharmacy: ['Prescription Drugs', 'OTC Medication', 'Personal Care', 'Wellness'],
    liquor: ['Beer', 'Wine', 'Spirits', 'Mixers'],
    hardware: ['Tools', 'Building Materials', 'Electrical', 'Plumbing']
  };
  const payments = ['Cash', 'Credit Card', 'Mobile Payment', 'Bank Transfer'];
  
  // Generate random sales data
  const salesData = days.map(() => Math.floor(Math.random() * 10000) + 5000);
  
  // Generate random product data
  const productData = products.map(() => Math.floor(Math.random() * 100) + 20);
  
  // Generate random category data
  const categoryData = categories[businessType].map(() => Math.floor(Math.random() * 100) + 10);
  
  // Generate random payment data
  const paymentData = payments.map(() => Math.floor(Math.random() * 100) + 10);
  
  return {
    kpis: {
      'Total Sales': { value: `$${(Math.random() * 20000 + 5000).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`, trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 15).toFixed(1)}%` },
      'Transactions': { value: Math.floor(Math.random() * 200 + 50).toString(), trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 10).toFixed(1)}%` },
      'Customers': { value: Math.floor(Math.random() * 150 + 50).toString(), trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 8).toFixed(1)}%` },
      'Profit Margin': { value: `${(Math.random() * 10 + 20).toFixed(1)}%`, trend: `${Math.random() > 0.5 ? '+' : ''}${(Math.random() * 3).toFixed(1)}%` },
      'Inventory': { value: Math.floor(Math.random() * 1000 + 500).toString(), trend: `${Math.random() > 0.4 ? '+' : ''}${(Math.random() * 5).toFixed(1)}%` }
    },
    sales: {
      labels: days,
      datasets: [{
        label: 'Sales ($)',
        data: salesData,
        borderColor: '#4361ee',
        backgroundColor: 'rgba(67, 97, 238, 0.1)',
        tension: 0.3,
        fill: true
      }]
    },
    topProducts: {
      labels: products,
      datasets: [{
        label: 'Units Sold',
        data: productData,
        backgroundColor: '#4cc9f0'
      }]
    },
    categories: {
      labels: categories[businessType],
      datasets: [{
        data: categoryData,
        backgroundColor: ['#4361ee', '#3f37c9', '#4cc9f0', '#f8961e', '#f72585']
      }]
    },
    payments: {
      labels: payments,
      datasets: [{
        data: paymentData,
        backgroundColor: ['#4361ee', '#3f37c9', '#4cc9f0', '#f8961e']
      }]
    },
    transactions: [
      { id: 'TXN-001', time: '10:30 AM', amount: '$120.00', payment_method: 'Credit Card' },
      { id: 'TXN-002', time: '11:15 AM', amount: '$85.50', payment_method: 'Cash' },
      { id: 'TXN-003', time: '12:02 PM', amount: '$210.25', payment_method: 'Mobile Payment' },
      { id: 'TXN-004', time: '12:45 PM', amount: '$54.75', payment_method: 'Credit Card' },
      { id: 'TXN-005', time: '01:30 PM', amount: '$320.00', payment_method: 'Bank Transfer' }
    ],
    inventory: [
      { product: 'Product A', current_stock: 8, threshold: 10, status: 'Low' },
      { product: 'Product B', current_stock: 5, threshold: 15, status: 'Critical' },
      { product: 'Product C', current_stock: 12, threshold: 10, status: 'Adequate' },
      { product: 'Product D', current_stock: 3, threshold: 5, status: 'Critical' },
      { product: 'Product E', current_stock: 15, threshold: 20, status: 'Adequate' }
    ]
  };
},

getDashboardData(filters, businessType) {
  try {
    // In a real application, you would make an API call here:
    // const response = await axios.get('/api/dashboard', { params: { ...filters, businessType } });
    // return response.data;
    
    // For demo purposes, we'll return mock data
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(generateMockData(filters, businessType));
      }, 300); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw error;
  }
},

getPersonalDet(token) {
    return apiClient.get(`/accountdetails/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  .then(response => {
    return response.data;
  });
},

};