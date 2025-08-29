<template>
  <div class="min-h-screen flex flex-col md:flex-row">
    <!-- Mobile Menu Button -->
    <div class="md:hidden p-4 bg-white shadow-md flex justify-between items-center">
      <h1 class="text-lg font-semibold">My Account</h1>
      <button @click="toggleSidebar" class="text-gray-600 focus:outline-none">
        <svg v-if="!isSidebarOpen" class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2"
             viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round">
          <path d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <!-- Sidebar -->
    <aside
      :class="[
        'bg-white md:w-1/5 p-6 shadow-md flex flex-col items-center md:items-start transition-all duration-300',
        isSidebarOpen ? 'block' : 'hidden',
        'md:block'
      ]"
    >
      <!-- Profile -->
      <div class="w-20 h-10 bg-gray-300 rounded-full overflow-hidden">
        <img src="https://via.placeholder.com/80x40" alt="Profile" class="w-full h-full object-cover" />
      </div>
      <h2 class="mt-4 text-lg font-semibold">{{ name }}</h2>
      <p class="text-gray-500 text-sm">{{ email }}</p>

      <!-- Navigation -->
      <nav class="mt-6 w-full">
        <ul class="flex flex-col space-y-4 w-full">
          <li>
            <router-link to="/Account/PersonalInfor"
              :class="route.path === '/Account/PersonalInfor' ? activeClass : defaultClass">
              Personal information
            </router-link>
          </li>
          <li>
            <router-link to="/Account/BusinessInfor"
              :class="route.path === '/Account/BusinessInfor' ? activeClass : defaultClass">
              Business Details
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Teller"
              :class="route.path === '/Account/Teller' ? activeClass : defaultClass">
              Teller Mgmt
            </router-link>
          </li>
          <li>
            <router-link to="/Account/UserLogs"
              :class="route.path === '/Account/UserLogs' ? activeClass : defaultClass">
              Activities
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Permissions"
              :class="route.path === '/Account/Permissions' ? activeClass : defaultClass">
              Permissions
            </router-link>
          </li>
          <li>
            <router-link to="/Account/Roles"
              :class="route.path === '/Account/Roles' ? activeClass : defaultClass">
              Roles
            </router-link>
          </li>
          <li>
            <router-link to="/Account/UserList"
              :class="route.path === '/Account/UserList' ? activeClass : defaultClass">
              Users
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- Main Content -->
    <main class="flex-1 p-6 bg-gray-50">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { errorState } from '../store/ErrorState';
import { useRoute } from 'vue-router';
import { Useuserstore } from '../store/userstore';
import { usesenderstore } from '../store/SenderIdStore';

const route = useRoute();
const name = ref('');
const email = ref('');
const userid = ref('');
const isSidebarOpen = ref(false); // 👈 for toggling

const contUserStore = Useuserstore();
const senderstore = usesenderstore();

onMounted(() => {
  name.value = localStorage.getItem('name');
  email.value = localStorage.getItem('email');
  userid.value = localStorage.getItem("userid");
  const token = localStorage.getItem("token");
  contUserStore.GetUserDetails(token, userid.value);
});

const role = computed(() => contUserStore.getRole);
const permissions = computed(() => contUserStore.getPermissions);

watch(permissions, (newValue) => {
  filterPermissions(newValue);
});

 watch(() => errorState.message, (newVal) => {
			 if (newVal) {
			   DisplayMessage(`Error: ${errorState.code} - ${newVal}`)
			 }
		    }) 
        

const perm_Usermgmt = ref([]);

const filterPermissions = (perm) => {
  const search1 = "user";
  perm_Usermgmt.value = perm.filter(item =>
    item.value.toLowerCase().includes(search1.toLowerCase())
  );
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const activeClass = 'text-orange-500 font-semibold text-md';
const defaultClass = 'text-green-600 font-semibold text-md px-4 py-2 hover:bg-gray-100 cursor-pointer';
</script>

