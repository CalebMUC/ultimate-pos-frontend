import { createRouter, createWebHistory } from 'vue-router'
import { UseAuthStore } from '../store/auth'

// ── Lazy-loaded routes ───────────────────────────────────────────────────────
// All components are loaded on-demand to reduce initial bundle size
const Home             = () => import('../Views/Home.vue')
const Inventory        = () => import('../Views/Inventory.vue')
const Transactions     = () => import('../Views/Transactions.vue')
const Catalogue        = () => import('../Views/Catalogue.vue')
const Supplier         = () => import('../Views/Supplier.vue')
const Account          = () => import('../Views/Account.vue')
const Supplies         = () => import('../Views/Supplies.vue')
const sale2            = () => import('../Views/sale2.vue')
const Login            = () => import('../components/Login.vue')
const Register         = () => import('../components/Register.vue')
const Dashboard        = () => import('../components/Dashboard.vue')
const categories       = () => import('../Views/Categories.vue')
const Reports          = () => import('../Views/Reports.vue')
const Contacts         = () => import('../Views/Contacts.vue')
const SendSms          = () => import('../Views/SendSms.vue')
const SentMessages     = () => import('../Views/SentMessages.vue')
const Documents        = () => import('../Views/Documents.vue')

// Reports submodules
const SalesReport      = () => import('../Views/Reports/SalesReport.vue')
const PurchasesReport  = () => import('../Views/Reports/PurchasesReport.vue')
const LowStockReport   = () => import('../Views/Reports/LowStockReport.vue')
const ExpenseReport    = () => import('../Views/Reports/ExpenseReport.vue')

// Account subviews
const PersonalInfor    = () => import('../Views/Account_Views/Personal_info.vue')
const BusinessInfor    = () => import('../Views/Account_Views/Business_info.vue')
const Permissions      = () => import('../Views/Account_Views/Permission.vue')
const Roles            = () => import('../Views/Account_Views/Roles.vue')
const Teller           = () => import('../Views/Account_Views/Teller.vue')
const UserList         = () => import('../Views/Account_Views/UserList.vue')
const UserLogs         = () => import('../Views/Account_Views/UserLogs.vue')

// Roles / Users / Till / Audit
const RolePermissions        = () => import('../Views/Roles/RolePermissions.vue')
const UserMaintainance       = () => import('../Views/Users/UserMaintainance.vue')
const TillManagement         = () => import('../Views/Tell/TillManagement.vue')
const CashierManagement      = () => import('../Views/Tell/CashierManagement.vue')
const TillClosure            = () => import('../Views/Tell/TillClosure.vue')
const SupervisorTillReview   = () => import('../Views/Tell/SupervisorTillReview.vue')
const SystemAudit            = () => import('../Views/Audit/SystemAudit.vue')

// Purchases
const PurchaseOrders         = () => import('../Views/Purchases/PurchaseOrders.vue')
const PurchaseOrderItems     = () => import('../Views/Purchases/PurchaseOrderItems.vue')
const PurchaseInvoices       = () => import('../Views/Purchases/PurchaseInvoices.vue')

// Finance
const ExpenseCategory        = () => import('../Views/Finance/ExpenseCategory.vue')
const Expenses               = () => import('../Views/Finance/Expenses.vue')
const OutgoingInvoice        = () => import('../Views/Finance/OutgoingInvoice.vue')



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
    meta: { requiresAuth: true }
  },

  {
    path: '/Till/SupervisorTillReview',
    name: 'SupervisorTillReview',
    component: SupervisorTillReview,
    meta: { requiresAuth: true }
  },

   {
    path: '/Till/CashierManagement',
    name: 'CashierManagement',
    component: CashierManagement,
    meta: { requiresAuth: true }
  },
  {
    path: '/Till/TillClosure',
    name: 'TillClosure',
    component: TillClosure,
    meta: { requiresAuth: true }
  },

   {
    path: '/Till/TillManagement',
    name: 'TillManagement',
    component: TillManagement,
    meta: { requiresAuth: true }
  },
  
   {
    path: '/Users/UserMaintainance',
    name: 'UserMaintainance',
    component: UserMaintainance,
    meta: { requiresAuth: true }
  },

   {
    path: '/Roles/RolePermissions',
    name: 'RolePermisions',
    component: RolePermissions,
    meta: { requiresAuth: true }
  },

  //purchases
   {
    path: '/Purchases/PurchaseOrders',
    name: 'PurchaseOrders',
    component: PurchaseOrders,
    meta: { requiresAuth: true }
  },
  {
    path: '/Purchases/PurchaseInvoices',
    name: 'PurchaseInvoices',
    component: PurchaseInvoices,
    meta: { requiresAuth: true }
  },
    {
    path: '/Purchases/Purchases',
    name: 'PurchaseOrderItems',
    component: PurchaseOrderItems,
    meta: { requiresAuth: true }
  },

  // Finance

   {
    path: '/Finance/ExpenseCategory',
    name: 'ExpenseCategory',
    component: ExpenseCategory,
    meta: { requiresAuth: true }
  },
    {
    path: '/Finance/Expenses',
    name: 'Expenses',
    component: Expenses,
    meta: { requiresAuth: true }
  },
  {
    path: '/Finance/OutgoingInvoice',
    name: 'OutgoingInvoice',
    component: OutgoingInvoice,
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
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
    meta: { requiresAuth: true }
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

// 404 fallback — must be last
const notFoundRoute = { path: '/:pathMatch(.*)*', name: 'NotFound', redirect: '/home' }
routes.push(notFoundRoute)

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