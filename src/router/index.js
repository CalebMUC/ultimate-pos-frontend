import { createRouter, createWebHistory } from 'vue-router'
import Home from '../Views/Home.vue'
import  Inventory from '../Views/Inventory.vue'
import Transactions from '../Views/Transactions.vue'
import Catalogue from '../Views/Catalogue.vue'
import Supplier from '../Views/Supplier.vue'
import Account from "../Views/Account.vue";
import Supplies from '../Views/Supplies.vue'

// import sale from '../Views/Sale.vue'
import sale2 from '../Views/sale2.vue'
import Login from  '../components/Login.vue'
import Register from  '../components/Register.vue'
import Dashboard from '../components/Dashboard.vue'
import categories from '../Views/Categories.vue'
import Reports from "../Views/Reports.vue"
import Contacts from '../Views/Contacts.vue'
import SendSms from '../Views/SendSms.vue'
import SentMessages from '../Views/SentMessages.vue'
import Documents from '../Views/Documents.vue'

//Reports Module and SubModules
import SalesReport from '../Views/Reports/SalesReport.vue'
import PurchasesReport from '../Views/Reports/PurchasesReport.vue'
import LowStockReport  from '../Views/Reports/LowStockReport.vue'
import ExpenseReport from '../Views/Reports/ExpenseReport.vue'

//account views
import PersonalInfor from '../Views/Account_Views/Personal_info.vue';
import BusinessInfor from '../Views/Account_Views/Business_info.vue';
import Permissions from '../Views/Account_Views/Permission.vue';
import Roles from '../Views/Account_Views/Roles.vue';
import Teller from '../Views/Account_Views/Teller.vue';
import UserList from '../Views/Account_Views/UserList.vue';
import UserLogs from '../Views/Account_Views/UserLogs.vue';

import RolePermissions from '../Views/Roles/RolePermissions.vue'
import UserMaintainance from '../Views/Users/UserMaintainance.vue'
import TillManagement from '../Views/Tell/TillManagement.vue'
import CashierManagement from '../Views/Tell/CashierManagement.vue'
import TillClosure from '../Views/Tell/TillClosure.vue'
import SupervisorTillReview from '../Views/Tell/SupervisorTillReview.vue'
import SystemAudit from '../Views/Audit/SystemAudit.vue'

import { UseAuthStore } from '../store/auth'

import PurchaseOrders from '../Views/Purchases/PurchaseOrders.vue'
import PurchaseOrderItems from '../Views/Purchases/PurchaseOrderItems.vue'

import ExpenseCategory from '../Views/Finance/ExpenseCategory.vue'
// import PurchaseInvoices from '../Views/Purchases/PurchaseInvoices.vue'

// import SalesReport from '../Views/Reports/SalesReport.vue'
// import LowStockReport from '../Views/Reports/LowStockReport.vue'



 const routes = [  

  { 
    path: '/login',
    name: 'login',
    component: Login
  },

  {
    path: '/register',
    name: "register",
    component: Register
  },


{
  path: '/',
  component :Dashboard,
  redirect:'/home',
  meta: { requiresAuth: true },
   children: [ 
  {
    path: '/home',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true }
  },

  {
    path: '/inventory',
    name: 'inventory',
    component: Inventory,
     meta: { requiresAuth: true, permission: "can_manage_inventory" }
  },


  {
    path: '/transactions',
    name: 'transactions',
    component: Transactions,
    meta: { requiresAuth: true,  permission: "can_view_transactions" }
  },

  {
    path: '/catalogue',
    name: 'catalogue',
    component: Catalogue,
    meta: { requiresAuth: true }
  },

   {
    path: '/Audit/SystemAudit',
    name: 'SystemAudit',
    component: SystemAudit,
    //  meta: { requiresAuth: true }
  },

  {
    path: '/Till/SupervisorTillReview',
    name: 'SupervisorTillReview',
    component: SupervisorTillReview,
    //  meta: { requiresAuth: true }
  },

   {
    path: '/Till/CashierManagement',
    name: 'CashierManagement',
    component: CashierManagement,
    //  meta: { requiresAuth: true }
  },
  {
    path: '/Till/TillClosure',
    name: 'TillClosure',
    component: TillClosure,
    //  meta: { requiresAuth: true }
  },

   {
    path: '/Till/TillManagement',
    name: 'TillManagement',
    component: TillManagement,
    //  meta: { requiresAuth: true }
  },
  
   {
    path: '/Users/UserMaintainance',
    name: 'UserMaintainance',
    component: UserMaintainance,
    //  meta: { requiresAuth: true }
  },

   {
    path: '/Roles/RolePermissions',
    name: 'RolePermisions',
    component: RolePermissions,
    //  meta: { requiresAuth: true }
  },

  //purchases
   {
    path: '/Purchases/PurchaseOrders',
    name: 'PurchaseOrders',
    component: PurchaseOrders,
    //  meta: { requiresAuth: true }
  },
    {
    path: '/Purchases/Purchases',
    name: 'PurchaseOrderItems',
    component: PurchaseOrderItems,
    //  meta: { requiresAuth: true }
  },

  // Finance

   {
    path: '/Finance/ExpenseCategory',
    name: 'ExpenseCategory',
    component: ExpenseCategory,
    //  meta: { requiresAuth: true }
  },

  //Reports
  

  {
    path: '/Reports/Sales',
    name: 'SalesReport',
    component: SalesReport,
     meta: { requiresAuth: true,  permission: "can_view_transactions" }
  },

  {
    path: '/Reports/Purchases',
    name: 'PurchasesReport',
    component: PurchasesReport,
    // meta: { requiresAuth: true }
  },
  {
    path: '/Reports/LowStockReport',
    name: 'LowStockReport',
    component: LowStockReport,
    meta: { requiresAuth: true }
  },
  {
    path: '/Reports/ExpenseReport',
    name: 'ExpenseReport',
    component: ExpenseReport,
    // meta: { requiresAuth: true }
  },
   


  {
    path: '/supplier',
    name: 'supplier',
    component: Supplier,
    meta: { requiresAuth: true }
  },

  {
    path: '/supplies/:supplierId',
    name: 'supplies',
    component: Supplies,
    meta: { requiresAuth: true }
  },
  
  {
    path: '/reports',
    name: 'reports',
    component: Reports,            
      meta: { requiresAuth: true }
  },

  {
    path: '/categories',
    name: 'categories',
    component: categories,
    meta: { requiresAuth: true,  permission: "can_manage_categories" }
  },

 {
    path: '/Documents',
    name: 'Documents',
    component: Documents,
    meta: { requiresAuth: true,  permission: "can_view_documents" }
  },

  // 
  {
    path: '/contacts',
    name: 'contacts',
    component: Contacts,
    meta: { requiresAuth: true } 
  },

  {
    path: '/SendSms',
    name: 'SendSms',
    component: SendSms,
    meta: { requiresAuth: true } 
  },

  {
    path: '/SentMessages',
    name: 'SentMessages',
    component: SentMessages,
    meta: { requiresAuth: true } 
  },


  {
    path: '/sell',
    name: 'sell',
    component: sale2,
    meta: { requiresAuth: true,permission : "can_make_sale" }
  },


  // A list of  account semi views start
  {
   path: '/Account',
  component :Account,
  redirect:'/Account/PersonalInfor',
   meta: { requiresAuth: true },
   children: [ 
      { 
        path: 'PersonalInfor',
        name: 'PersonalInfor',
        component: PersonalInfor,
        meta: { requiresAuth: true }
      },

        { 
        path: 'BusinessInfor',
        name: 'BusinessInfor',
        component: BusinessInfor,
        meta: { requiresAuth: true }
      },

        { 
        path: 'Permissions',
        name: 'Permissions',
        component: Permissions,
        meta: { requiresAuth: true }
      },

        { 
        path: 'Roles',
        name: 'Roles',
        component: Roles,
         meta: { requiresAuth: true }
      },

        { 
        path: 'Teller',
        name: 'Teller',
        component: Teller,
         meta: { requiresAuth: true }
      },

      { 
      path: 'UserList',
      name: 'UserList',
      component: UserList,
      meta: { requiresAuth: true }
    },

      { 
      path: 'UserLogs',
      name: 'UserLogs',
      component: UserLogs,
       meta: { requiresAuth: true }
    },  
]},

// A list of  account semi views End

  //  {
  //   path: '/Test_view',
  //   name: 'Test_view',
  //   component: Test_view,
  //   // meta: { requiresAuth: true }
  // },

]}

]  ///

const router = createRouter({
  history: createWebHistory(),
  routes
})


//navigation guard to check if the user is logged in and has a valid token
// router.beforeEach((to, from, next) => {
//   const isLoggedIn = localStorage.getItem('isLoggedIn');
//   const token = localStorage.getItem('token');
//   const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  
//   if (requiresAuth && (!isLoggedIn || !token)) {
//     next({ name: 'login' });
//   } else {
//     next();
//   }
// });

router.beforeEach((to, from, next) => {
  const authStore = UseAuthStore();

  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const requiredPermission = to.meta.permission;

  if (requiresAuth && !authStore.token) {
    // not logged in
    return next({ name: 'login' });
  }

  if (requiredPermission && !authStore.hasPermission(requiredPermission)) {
    // lacks permission
    return next({ name: 'home' }); // redirect to dashboard or show 403 page
  }

  next();
});

export default router