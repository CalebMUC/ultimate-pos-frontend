<template>
  <teleport to="body">
    <!-- Backdrop overlay -->
    <transition
      enter-active-class="transition-opacity ease-out duration-300"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity ease-in duration-200"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <div
        v-if="showMobileSidebar"
        class="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
        @click="closeSidebar"
      />
    </transition>

    <!-- Slide-in Drawer -->
    <transition
      enter-active-class="transition-transform ease-out duration-300"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform ease-in duration-200"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <div
        v-if="showMobileSidebar"
        class="fixed top-0 left-0 z-50 flex h-full w-72 flex-col bg-slate-800 shadow-2xl"
      >
        <!-- Drawer Header -->
        <div class="flex h-16 items-center justify-between border-b border-slate-700 px-4 flex-shrink-0">
          <span class="text-sm font-bold text-white tracking-widest uppercase">
            {{ appName }}
          </span>
          <button
            @click="closeSidebar"
            class="rounded-lg p-1.5 text-gray-400 hover:bg-slate-700 hover:text-white transition-colors"
          >
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>

        <!-- Nav Items -->
        <nav class="flex-1 overflow-y-auto px-3 py-4 space-y-1 sidebar-scroll">

          <router-link
            to="/"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <HomeIcon class="h-5 w-5 flex-shrink-0" />
            Dashboard
          </router-link>

          <router-link
            to="/inventory"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <ArchiveBoxIcon class="h-5 w-5 flex-shrink-0" />
            Inventory
          </router-link>

          <router-link
            to="/catalogue"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <CubeIcon class="h-5 w-5 flex-shrink-0" />
            Catalogue
          </router-link>

          <router-link
            to="/categories"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <TagIcon class="h-5 w-5 flex-shrink-0" />
            Categories
          </router-link>

          <!-- Divider -->
          <div class="my-2 border-t border-slate-700/60"></div>

          <router-link
            to="/sell"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <ShoppingBagIcon class="h-5 w-5 flex-shrink-0" />
            Sell
          </router-link>

          <router-link
            to="/transactions"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <BanknotesIcon class="h-5 w-5 flex-shrink-0" />
            Transactions
          </router-link>

          <router-link
            to="/documents"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <DocumentTextIcon class="h-5 w-5 flex-shrink-0" />
            Documents
          </router-link>

          <!-- Divider -->
          <div class="my-2 border-t border-slate-700/60"></div>

          <router-link
            to="/contacts"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <UsersIcon class="h-5 w-5 flex-shrink-0" />
            Contacts
          </router-link>

          <router-link
            to="/SendSms"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <ChatBubbleLeftIcon class="h-5 w-5 flex-shrink-0" />
            Send SMS
          </router-link>

          <router-link
            to="/SentMessages"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <PaperAirplaneIcon class="h-5 w-5 flex-shrink-0" />
            Sent Messages
          </router-link>

          <!-- Divider -->
          <div class="my-2 border-t border-slate-700/60"></div>

          <router-link
            to="/reports"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <ChartBarIcon class="h-5 w-5 flex-shrink-0" />
            Reports
          </router-link>

          <router-link
            to="/Supplier"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <TruckIcon class="h-5 w-5 flex-shrink-0" />
            Suppliers
          </router-link>

          <router-link
            to="/account"
            @click="closeSidebar"
            class="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 hover:text-white"
            active-class="bg-slate-700 text-white"
          >
            <UserCircleIcon class="h-5 w-5 flex-shrink-0" />
            My Account
          </router-link>
        </nav>

        <!-- Drawer Footer -->
        <div class="border-t border-slate-700 p-3 flex-shrink-0">
          <p class="text-center text-[10px] text-slate-500 uppercase tracking-widest">
            {{ appName }} &copy; {{ new Date().getFullYear() }}
          </p>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup>
import { computed } from 'vue'
import { useDashboardStore } from '../store/DashboardStore'
import {
  HomeIcon,
  ArchiveBoxIcon,
  CubeIcon,
  TagIcon,
  ShoppingBagIcon,
  BanknotesIcon,
  DocumentTextIcon,
  UsersIcon,
  ChatBubbleLeftIcon,
  PaperAirplaneIcon,
  ChartBarIcon,
  TruckIcon,
  UserCircleIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const dashboardstore = useDashboardStore()
const showMobileSidebar = computed(() => dashboardstore.filterSmallScreen)
const appName = import.meta.env.VITE_APP_NAME || 'Ultimate POS'

const closeSidebar = () => {
  dashboardstore.toggleResponsiveSidebar()
}
</script>

<style scoped>
.sidebar-scroll {
  scrollbar-width: thin;
  scrollbar-color: #475569 #1e293b;
}
.sidebar-scroll::-webkit-scrollbar {
  width: 4px;
}
.sidebar-scroll::-webkit-scrollbar-track {
  background: #1e293b;
}
.sidebar-scroll::-webkit-scrollbar-thumb {
  background-color: #475569;
  border-radius: 4px;
}
</style>
