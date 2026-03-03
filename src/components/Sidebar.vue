<template>
  <aside
    v-if="showSidebar"
    :class="[
      'fixed top-16 left-0 z-40 flex h-[calc(100vh-4rem)] flex-col',
      'bg-white border-r border-gray-200 shadow-sm overflow-y-auto sidebar-scroll',
      'transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-16' : 'w-64'
    ]"
  >
    <!-- ── Collapse toggle ── -->
    <div :class="['flex items-center py-3 px-2', isCollapsed ? 'justify-center' : 'justify-end']">
      <button
        @click="toggleCollapse"
        class="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-indigo-600 transition-colors"
        :title="isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'"
      >
        <ChevronLeftIcon v-if="!isCollapsed" class="h-4 w-4" />
        <ChevronRightIcon v-else class="h-4 w-4" />
      </button>
    </div>

    <!-- ── Main nav ── -->
    <div class="flex-1 px-2 pb-2">
      <nav class="space-y-0.5">

        <!-- Dashboard -->
        <router-link to="/" :class="navLink" active-class="!bg-indigo-50 !text-indigo-600" :title="isCollapsed ? 'Dashboard' : ''">
          <HomeIcon class="h-5 w-5 flex-shrink-0 text-indigo-500" />
          <span v-show="!isCollapsed" class="ml-3 truncate">Dashboard</span>
        </router-link>

        <!-- Products -->
        <div v-if="hasPermission('can_manage_inventory')">
          <button @click="isCollapsed ? null : toggleMenu('Products')" :class="dropBtn" :title="isCollapsed ? 'Products' : ''">
            <span class="flex items-center min-w-0">
              <CubeIcon class="h-5 w-5 flex-shrink-0 text-emerald-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Products</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Products' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Products'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link v-if="hasPermission('can_manage_inventory')" to="/inventory" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Inventory</router-link>
              <router-link v-if="hasPermission('can_view_product')" to="/catalogue" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Catalogue</router-link>
              <router-link v-if="hasPermission('can_manage_categories')" to="/categories" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Categories</router-link>
            </div>
          </transition>
        </div>

        <!-- Transactions -->
        <div v-if="hasPermission('can_make_sale') || hasPermission('can_view_transactions')">
          <button @click="isCollapsed ? null : toggleMenu('Transactions')" :class="dropBtn" :title="isCollapsed ? 'Transactions' : ''">
            <span class="flex items-center min-w-0">
              <CurrencyDollarIcon class="h-5 w-5 flex-shrink-0 text-blue-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Transactions</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Transactions' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Transactions'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link v-if="hasPermission('can_make_sale')" to="/sell" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Sell</router-link>
              <router-link v-if="hasPermission('can_view_transactions')" to="/transactions" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Transaction List</router-link>
            </div>
          </transition>
        </div>

        <!-- Documents -->
        <router-link v-if="hasPermission('can_view_documents')" to="/documents" :class="navLink" active-class="!bg-indigo-50 !text-indigo-600" :title="isCollapsed ? 'Documents' : ''">
          <DocumentTextIcon class="h-5 w-5 flex-shrink-0 text-amber-500" />
          <span v-show="!isCollapsed" class="ml-3 truncate">Documents</span>
        </router-link>

        <!-- Reports -->
        <div v-if="hasAnyReportPermission()">
          <button @click="isCollapsed ? null : toggleMenu('Reports')" :class="dropBtn" :title="isCollapsed ? 'Reports' : ''">
            <span class="flex items-center min-w-0">
              <ChartBarIcon class="h-5 w-5 flex-shrink-0 text-purple-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Reports</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Reports' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Reports'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link v-if="hasPermission('can_view_sales_report')" to="/Reports/Sales" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Sales Report</router-link>
              <router-link v-if="hasPermission('can_view_purchase_report')" to="/Reports/Purchases" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Purchase Report</router-link>
              <router-link v-if="hasPermission('can_view_inventory_report')" to="/reports/inventory" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Inventory Report</router-link>
              <router-link v-if="hasPermission('can_view_invoice_report')" to="/reports/invoice" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Invoice Report</router-link>
              <router-link v-if="hasPermission('can_view_supplier_report')" to="/reports/supplier" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Supplier Report</router-link>
              <router-link v-if="hasPermission('can_view_customer_report')" to="/reports/customer" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Customer Report</router-link>
              <router-link v-if="hasPermission('can_view_product_report')" to="/reports/product" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Product Report</router-link>
              <router-link v-if="hasPermission('can_view_expense_report')" to="/Reports/ExpenseReport" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Expense Report</router-link>
              <router-link v-if="hasPermission('can_view_lowstock_report')" to="/Reports/LowStockReport" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Low Stock Report</router-link>
              <router-link v-if="hasPermission('can_view_income_report')" to="/reports/income" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Income Report</router-link>
              <router-link v-if="hasPermission('can_view_tax_report')" to="/reports/tax" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Tax Report</router-link>
              <router-link v-if="hasPermission('can_view_profitloss_report')" to="/reports/profit-loss" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Profit &amp; Loss</router-link>
              <router-link v-if="hasPermission('can_view_annual_report')" to="/reports/annual" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Annual Report</router-link>
            </div>
          </transition>
        </div>

        <!-- Finance -->
        <div>
          <button @click="isCollapsed ? null : toggleMenu('Finance')" :class="dropBtn" :title="isCollapsed ? 'Finance' : ''">
            <span class="flex items-center min-w-0">
              <BanknotesIcon class="h-5 w-5 flex-shrink-0 text-green-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Finance</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Finance' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Finance'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link to="/Finance/Expenses" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Expense</router-link>
              <router-link to="/Finance/ExpenseCategory" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Expense Categories</router-link>
              <router-link to="/Finance/Income" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Income</router-link>
              <router-link v-if="hasPermission('can_manage_income_sources')" to="/Finance/IncomeSources" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Income Sources</router-link>
              <router-link to="/Finance/OutgoingInvoice" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Outgoing Invoice</router-link>
            </div>
          </transition>
        </div>

        <!-- Purchases -->
        <div>
          <button @click="isCollapsed ? null : toggleMenu('Purchases')" :class="dropBtn" :title="isCollapsed ? 'Purchases' : ''">
            <span class="flex items-center min-w-0">
              <ShoppingCartIcon class="h-5 w-5 flex-shrink-0 text-sky-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Purchases</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Purchases' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Purchases'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link to="/Purchases/Purchases" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Purchases</router-link>
              <router-link to="/Purchases/PurchaseOrders" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Purchase Orders</router-link>
              <router-link to="/Purchases/PurchaseInvoices" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Invoices</router-link>
            </div>
          </transition>
        </div>

        <!-- Roles -->
        <div v-if="hasPermission('can_manage_roles') || hasPermission('can_assign_permissions')">
          <button @click="isCollapsed ? null : toggleMenu('Roles')" :class="dropBtn" :title="isCollapsed ? 'Roles' : ''">
            <span class="flex items-center min-w-0">
              <ShieldCheckIcon class="h-5 w-5 flex-shrink-0 text-red-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Roles</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Roles' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Roles'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link to="/Roles/RolePermissions" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Roles &amp; Permissions</router-link>
            </div>
          </transition>
        </div>

        <!-- Users -->
        <div v-if="hasAnyUserPermission()">
          <button @click="isCollapsed ? null : toggleMenu('Users')" :class="dropBtn" :title="isCollapsed ? 'Users' : ''">
            <span class="flex items-center min-w-0">
              <UsersIcon class="h-5 w-5 flex-shrink-0 text-cyan-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Users</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Users' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Users'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link to="/Users/UserMaintainance" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Manage Users</router-link>
            </div>
          </transition>
        </div>

        <!-- Till Management -->
        <div v-if="hasAnyTillPermission()">
          <button @click="isCollapsed ? null : toggleMenu('Till')" :class="dropBtn" :title="isCollapsed ? 'Till Management' : ''">
            <span class="flex items-center min-w-0">
              <CreditCardIcon class="h-5 w-5 flex-shrink-0 text-orange-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Till Management</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Till' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Till'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link v-if="hasPermission('can_manage_till')" to="/Till/TillManagement" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Manage Till</router-link>
              <router-link v-if="hasPermission('can_manage_cashiers')" to="/Till/CashierManagement" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Manage Tellers</router-link>
              <router-link v-if="hasPermission('can_close_till')" to="/Till/TillClosure" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Till Closure</router-link>
              <router-link v-if="hasPermission('can_supervise_till')" to="/Till/SupervisorTillReview" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">Till Supervision</router-link>
            </div>
          </transition>
        </div>

        <!-- Audit -->
        <div v-if="hasPermission('can_view_audit')">
          <button @click="isCollapsed ? null : toggleMenu('Audit')" :class="dropBtn" :title="isCollapsed ? 'Audit' : ''">
            <span class="flex items-center min-w-0">
              <ClipboardDocumentListIcon class="h-5 w-5 flex-shrink-0 text-rose-500" />
              <span v-show="!isCollapsed" class="ml-3 truncate">Audit</span>
            </span>
            <ChevronDownIcon v-show="!isCollapsed" :class="['h-4 w-4 flex-shrink-0 text-gray-400 transition-transform duration-200', openMenu === 'Audit' ? 'rotate-180' : '']" />
          </button>
          <transition name="sub">
            <div v-show="!isCollapsed && openMenu === 'Audit'" class="mt-0.5 ml-9 space-y-0.5">
              <router-link to="/Audit/SystemAudit" :class="subLink" active-class="!bg-indigo-50 !text-indigo-600">System Audit</router-link>
            </div>
          </transition>
        </div>

        <!-- Suppliers -->
        <router-link v-if="hasAnySupplierPermission()" to="/supplier" :class="navLink" active-class="!bg-indigo-50 !text-indigo-600" :title="isCollapsed ? 'Suppliers' : ''">
          <TruckIcon class="h-5 w-5 flex-shrink-0 text-teal-500" />
          <span v-show="!isCollapsed" class="ml-3 truncate">Suppliers</span>
        </router-link>

        <!-- My Account -->
        <router-link v-if="hasPermission('can_view_account')" to="/account" :class="navLink" active-class="!bg-indigo-50 !text-indigo-600" :title="isCollapsed ? 'My Account' : ''">
          <UserCircleIcon class="h-5 w-5 flex-shrink-0 text-violet-500" />
          <span v-show="!isCollapsed" class="ml-3 truncate">My Account</span>
        </router-link>

      </nav>
    </div>

    <!-- ── Footer / Settings ── -->
    <div class="border-t border-gray-200 p-2">
      <router-link v-if="hasPermission('can_view_settings')" to="/settings" :class="navLink" active-class="!bg-indigo-50 !text-indigo-600" :title="isCollapsed ? 'Settings' : ''">
        <Cog6ToothIcon class="h-5 w-5 flex-shrink-0 text-gray-400" />
        <span v-show="!isCollapsed" class="ml-3 truncate">Settings</span>
      </router-link>
    </div>
  </aside>
</template>

<script setup>
import { useDashboardStore } from '../store/DashboardStore'
import { UseAuthStore } from '../store/auth'
import { ref, computed } from 'vue'
import {
  HomeIcon,
  CubeIcon,
  CurrencyDollarIcon,
  DocumentTextIcon,
  ChartBarIcon,
  TruckIcon,
  UserCircleIcon,
  UsersIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  TagIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  BanknotesIcon,
  ScaleIcon,
  CalendarIcon,
  ShieldCheckIcon,
  PresentationChartLineIcon,
} from '@heroicons/vue/24/outline'

const dashboardstore = useDashboardStore()
const authStore = UseAuthStore()

const showSidebar = computed(() => dashboardstore.filterLargeScreen)
const isCollapsed = computed(() => dashboardstore.sidebarCollapsed)
const toggleCollapse = () => dashboardstore.toggleSidebarCollapse()

const openMenu = ref(null)
const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu
}

// ── Shared class strings ──────────────────────────────────────────────────────
const navLink = computed(() =>
  [
    'group flex items-center rounded-lg py-2.5 text-sm font-medium text-gray-700',
    'transition-colors hover:bg-gray-100 hover:text-gray-900',
    isCollapsed.value ? 'justify-center px-2' : 'px-3',
  ].join(' ')
)

const dropBtn = computed(() =>
  [
    'group flex w-full items-center rounded-lg py-2.5 text-sm font-medium text-gray-700',
    'transition-colors hover:bg-gray-100 hover:text-gray-900',
    isCollapsed.value ? 'justify-center px-2' : 'justify-between px-3',
  ].join(' ')
)

const subLink =
  'block rounded-lg px-3 py-2 text-sm text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900'

const hasPermission = (permission) => authStore.hasPermission(permission);

// Helper functions to check for multiple permissions
const hasAnyReportPermission = () => {
  const reportPermissions = [
    'can_view_sales_report',
    'can_view_purchase_report',
    'can_view_inventory_report',
    'can_view_invoice_report',
    'can_view_supplier_report',
    'can_view_customer_report',
    'can_view_product_report',
    'can_view_expense_report',
    'can_view_lowstock_report',
    'can_view_income_report',
    'can_view_tax_report',
    'can_view_profitloss_report',
    'can_view_annual_report'
  ];
  return reportPermissions.some(permission => hasPermission(permission));
};

const hasAnyUserPermission = () => {
  const userPermissions = [
    'can_add_user',
    'can_view_user',
    'can_update_user',
    'can_delete_user'
  ];
  return userPermissions.some(permission => hasPermission(permission));
};

const hasAnyTillPermission = () => {
  const tillPermissions = [
    'can_manage_till',
    'can_manage_cashiers',
    'can_close_till',
    'can_supervise_till'
  ];
  return tillPermissions.some(permission => hasPermission(permission));
};

const hasAnySupplierPermission = () => {
  const supplierPermissions = [
    'can_add_supplier',
    'can_view_supplier',
    'can_update_supplier',
    'can_delete_supplier'
  ];
  return supplierPermissions.some(permission => hasPermission(permission));
};
</script>

<style scoped>
/* Sub-menu slide transition */
.sub-enter-active,
.sub-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.sub-enter-from,
.sub-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Thin scrollbar — light theme */
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: #f8fafc;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
.sidebar-scroll::-webkit-scrollbar-thumb:hover {
  background-color: #94a3b8;
}
</style>