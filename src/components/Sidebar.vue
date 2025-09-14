<template>
  <aside 
    v-if="showSidebar"
    class="flex h-full flex-col justify-between border-e bg-slate   -800 w-64 transition-all duration-300 ease-in-out"
  >
    <div class="px-4 py-4">
      <!-- Navigation Menu -->
      <nav class="space-y-1">
        <!-- Dashboard - Visible to all authenticated users -->
        <router-link 
          to="/" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <HomeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Dashboard</span>
        </router-link>

        <!-- Products Section -->
        <div v-if="hasPermission('can_manage_inventory')" class="group relative">
          <button 
            @click="toggleMenu('Products')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CubeIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Products</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Products' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Products'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_manage_inventory')"
                to="/inventory"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Inventory
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_product')"
                to="/catalogue"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Catalogue
              </router-link>
              <router-link 
                v-if="hasPermission('can_manage_categories')"
                to="/categories"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Categories
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Transactions Section -->
        <div v-if="hasPermission('can_make_sale') || hasPermission('can_view_transactions')" class="group relative">
          <button 
            @click="toggleMenu('Transactions')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <CurrencyDollarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Transactions</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Transactions' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition name="dropdown">
            <div 
              v-show="openMenu === 'Transactions'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_make_sale')"
                to="/sell"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Sell
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_transactions')"
                to="/transactions"
                class="block px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                Transaction List
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Documents -->
        <router-link 
          v-if="hasPermission('can_view_documents')"
          to="/documents" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <DocumentTextIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Documents</span>
        </router-link>

        <!-- Reports Dropdown Section -->
        <div v-if="hasAnyReportPermission()" class="group relative">
          <button 
            @click="toggleMenu('Reports')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <ChartBarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Reports</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Reports' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Reports'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_view_sales_report')"
                to="/Reports/Sales"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Sales Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_purchase_report')"
                to="/Reports/Purchases"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ShoppingCartIcon class="h-4 w-4 mr-3" />
                Purchase Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_inventory_report')"
                to="/reports/inventory"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArchiveBoxIcon class="h-4 w-4 mr-3" />
                Inventory Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_invoice_report')"
                to="/reports/invoice"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <DocumentTextIcon class="h-4 w-4 mr-3" />
                Invoice Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_supplier_report')"
                to="/reports/supplier"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <TruckIcon class="h-4 w-4 mr-3" />
                Supplier Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_customer_report')"
                to="/reports/customer"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <UserGroupIcon class="h-4 w-4 mr-3" />
                Customer Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_product_report')"
                to="/reports/product"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <TagIcon class="h-4 w-4 mr-3" />
                Product Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_expense_report')"
                to="/Reports/ExpenseReport"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArrowDownCircleIcon class="h-4 w-4 mr-3" />
                Expense Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_lowstock_report')"
                to="/Reports/LowStockReport"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArrowDownCircleIcon class="h-4 w-4 mr-3" />
                Low Stock Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_income_report')"
                to="/reports/income"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArrowUpCircleIcon class="h-4 w-4 mr-3" />
                Income Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_tax_report')"
                to="/reports/tax"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <BanknotesIcon class="h-4 w-4 mr-3" />
                Tax Report
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_profitloss_report')"
                to="/reports/profit-loss"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ScaleIcon class="h-4 w-4 mr-3" />
                Profit & Loss
              </router-link>
              <router-link 
                v-if="hasPermission('can_view_annual_report')"
                to="/reports/annual"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <CalendarIcon class="h-4 w-4 mr-3" />
                Annual Report
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Role and Permissions -->
        <div v-if="hasPermission('can_manage_roles') || hasPermission('can_assign_permissions')" class="group relative">
          <button 
            @click="toggleMenu('Roles')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Roles</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Roles' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Roles'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_manage_roles') || hasPermission('can_assign_permissions')"
                to="/Roles/RolePermissions"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Roles & Permissions
              </router-link>
            </div>
          </transition>
        </div>

        <!-- User Maintenance -->
        <div v-if="hasAnyUserPermission()" class="group relative">
          <button 
            @click="toggleMenu('Users')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Users</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Users' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Users'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasAnyUserPermission()"
                to="/Users/UserMaintainance"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Manage Users
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Till Management -->
        <div v-if="hasAnyTillPermission()" class="group relative">
          <button 
            @click="toggleMenu('Till')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Till Management</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Till' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Till'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_manage_till')"
                to="/Till/TillManagement"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Manage Till
              </router-link>
              <router-link 
                v-if="hasPermission('can_manage_cashiers')"
                to="/Till/CashierManagement"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Manage Tellers
              </router-link>
              <router-link 
                v-if="hasPermission('can_close_till')"
                to="/Till/TillClosure"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Till Closure
              </router-link>
              <router-link 
                v-if="hasPermission('can_supervise_till')"
                to="/Till/SupervisorTillReview"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Till Supervision
              </router-link>
            </div>
          </transition>
        </div>
      


         <!-- Finance -->
        <div class="group relative">
          <button
            @click="toggleMenu('Finance')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            
          >
            <div class="flex items-center">
              <CurrencyDollarIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Finance</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Finance' ? 'rotate-180' : ''
              ]" 
            />

          </button>
            <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Finance'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/Finance/Expenses"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArrowDownCircleIcon class="h-4 w-4 mr-3" />
                Expense
              </router-link>
              <router-link 
                to="/Finance/ExpenseCategories"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <TagIcon class="h-4 w-4 mr-3" />
                Expense Categories
              </router-link>

              <router-link 
                to="/Finance/Income"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <ArrowUpCircleIcon class="h-4 w-4 mr-3" />
                Income
              </router-link>

               <router-link 
                v-if="hasPermission('can_manage_income_sources')"
                to="/Finance/IncomeSources"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <TagIcon class="h-4 w-4 mr-3" />
                Income Sources
              </router-link>
            </div>
          </transition>
        </div>

         <!-- Purchases -->
        <div class="group relative">
          <button
            @click="toggleMenu('Purchases')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
            
          >
            <div class="flex items-center">
              <ShoppingCartIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Purchases</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Purchases' ? 'rotate-180' : ''
              ]" 
            />

          </button>
            <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Purchases'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                to="/Purchases/Purchases"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                 <ShoppingCartIcon class="h-4 w-4 mr-3" />
                Purchases
              </router-link>

                <router-link 
                to="/Purchases/PurchaseOrders"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                 <DocumentTextIcon class="h-4 w-4 mr-3" />
                Purchase Orders
              </router-link>

              <router-link 
                to="/Purchases/Invoices"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <DocumentTextIcon class="h-4 w-4 mr-3" />
                Invoices
              </router-link>

            </div>
          </transition>
        </div>

        <!-- Audit -->
        <div v-if="hasPermission('can_view_audit')" class="group relative">
          <button 
            @click="toggleMenu('Audit')"
            class="flex w-full items-center justify-between rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          >
            <div class="flex items-center">
              <ShieldCheckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
              <span class="ml-3">Audit</span>
            </div>
            <ChevronDownIcon 
              :class="[
                'h-4 w-4 transform transition-transform duration-200',
                openMenu === 'Audit' ? 'rotate-180' : ''
              ]" 
            />
          </button>
          
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <div 
              v-show="openMenu === 'Audit'"
              class="ml-8 mt-1 space-y-1 overflow-hidden rounded-lg bg-slate-700/50"
            >
              <router-link 
                v-if="hasPermission('can_view_audit')"
                to="/Audit/SystemAudit"
                class="flex items-center px-4 py-2 text-sm text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
                active-class="bg-slate-600 text-white"
              >
                <PresentationChartLineIcon class="h-4 w-4 mr-3" />
                Audit
              </router-link>
            </div>
          </transition>
        </div>

        <!-- Suppliers -->
        <router-link 
          v-if="hasAnySupplierPermission()"
          to="/supplier" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <TruckIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">Suppliers</span>
        </router-link>

        <!-- My Account -->
        <router-link 
          v-if="hasPermission('can_view_account')"
          to="/account" 
          class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
          active-class="bg-slate-700"
        >
          <UserCircleIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
          <span class="ml-3">My Account</span>
        </router-link>
      </nav>
    </div>

    <!-- Footer/Settings -->
    <div class="border-t border-slate-700 p-4">
      <router-link 
        v-if="hasPermission('can_view_settings')"
        to="/settings" 
        class="group flex items-center rounded-lg px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-slate-700"
      >
        <Cog6ToothIcon class="h-5 w-5 text-slate-300 group-hover:text-white" />
        <span class="ml-3">Settings</span>
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
  Cog6ToothIcon,
  ChevronDownIcon,
  PresentationChartLineIcon,
  ShoppingCartIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  TagIcon,
  ArrowDownCircleIcon,
  ArrowUpCircleIcon,
  BanknotesIcon,
  ScaleIcon,
  CalendarIcon,
  ShieldCheckIcon
} from '@heroicons/vue/24/outline'

const dashboardstore = useDashboardStore()
const authStore = UseAuthStore();
const showSidebar = computed(() => dashboardstore.filterLargeScreen)
const openMenu = ref(null)

const toggleMenu = (menu) => {
  openMenu.value = openMenu.value === menu ? null : menu
}

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
/* Your existing styles remain the same */
.dropdown-enter-active,
.dropdown-leave-active {
  transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.router-link-active:not(.active-class) {
  @apply bg-slate-700 text-white;
}

.router-link {
  transition: background-color 0.2s ease, color 0.2s ease;
}

.scroll-area {
  scrollbar-width: thin;
  scrollbar-color: #4b5563 #1f2937;
}

.scroll-area::-webkit-scrollbar {
  width: 6px;
}

.scroll-area::-webkit-scrollbar-track {
  background: #1f2937;
}

.scroll-area::-webkit-scrollbar-thumb {
  background-color: #4b5563;
  border-radius: 3px;
}
</style>