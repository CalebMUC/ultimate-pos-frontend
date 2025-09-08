<template>
  <ModuleComponent
    title="Tills"
    description="Manage Tills, Balances and Status"
    moduleName="tills"
    moduleNameSingular="till"
    :data="tills"
    :columns="tillColumns"
    :formFields="tillFormFields"
    :fetchData="fetchTills"
    :addItem="addTill"
    :updateItem="updateTill"
    :deleteItem="deleteTill"
    searchPlaceholder="Search Tills..."
    addButtonText="Add new Till"
    :showExportButtons="false"
    :showImportButton="false"
    :getId="getTillId"
  >
    <!-- ✅ Row Actions -->
    <template #row-actions="{ item }">
       <button
        @click="showOpenModal(item)"
        class="p-2 text-green-600 hover:bg-green-100 rounded-full"
        title="Open Till"
      >
        <ShieldCheckIcon class="w-4 h-3" />
      </button>
      <button
        @click="submitClosure(item)"
        class="p-2 text-blue-600 hover:bg-blue-100 rounded-full"
        title="Submit Closure"
      >
        Submit
      </button>
    </template>
  </ModuleComponent>

  <TillOpenModal
    :show="openModalVisible"
    :till="selectedTill"
    @close="openModalVisible = false"
    @confirm="handleOpenTill"
  />
</template>

<script>
import { ref, computed, onMounted } from "vue";
import { ShieldCheckIcon } from "@heroicons/vue/24/outline";
import ModuleComponent from "../../components/ModuleComponent/ModuleComponent.vue";
import { useTillManagementStore } from "../../store/TillManagementStore";
import { useUserStore } from "../../store/userstore";
import TillOpenModal from "../../components/Modals/TillOpenModal.vue";

export default {
  name: "TillManagement",
  components: { ModuleComponent,
     ShieldCheckIcon,
    TillOpenModal },
  setup() {
    const tillStore = useTillManagementStore();
    const userStore = useUserStore();
    const tills = ref([]);
    const cashiers = ref([]);

     const openModalVisible = ref(false);
  const selectedTill = ref(null);

  const showOpenModal = (till) => {
    selectedTill.value = till;
    openModalVisible.value = true;
  };

  const handleOpenTill = async (payload) => {
    try {
      var payloadData = {
        ...payload,
        OpenedBy : "UltimatePos"
      }
      await tillStore.OpenTill(payloadData); // includes openingAmount, expectedAmount, notes
      await fetchTills();
      openModalVisible.value = false;
    } catch (error) {
      console.error("Error opening till:", error);
    }
  };

    // 🟢 Table columns
    const tillColumns = [
      { field: "name", label: "Till Name", type: "text", sortable: true },
      { field: "cashierName", label: "Assigned Cashier", type: "text", sortable: true },
      { field: "currentAmount", label: "Balance", type: "currency", sortable: true },
      { field: "status", label: "Status", type: "status", sortable: true },
      { field: "createdAt", label: "Created On", type: "date", sortable: true },
      { field: "updatedAt", label: "UpdatedOn", type: "date", sortable: true },
    ];

    // 🟢 Form fields
    const tillFormFields = computed(() => [
      { key: "name", label: "Till Name", type: "text", required: true },
      { key: "description", label: "Description", type: "textarea", required: true },
       {
        key: "userId",
        label: "Assign Cashier",
        type: "select",
        options: cashiers.value.map((cashier) => ({
          label: cashier.userName, // show username
          value: cashier.userId,   // store userId
        })),
        required: true,
      },
      
      {
        key: "status",
        label: "Status",
        type: "select",
        options: [
          { value: "Open", label: "Open" },
          { value: "Closed", label: "Closed" },
          { value: "Suspended", label: "Suspended" },
        ], 
        required: true,
      },
    ]);

    // 🟢 CRUD + Flow methods
    const fetchTills = async () => {
      try {
        const response = await tillStore.GetTill();
        tills.value = response || [];
      } catch (error) {
        console.error("Error fetching tills:", error);
      }
    };

    const fetchCashiers = async () => {
      try {
        const response = await userStore.fetchCashiers();
        cashiers.value = response || []; // Use cashiers.value instead of this.cashiers
      } catch (error) {
        console.error(error);
      }
    };

    const addTill = async (newTill) => {
      try {
        const payload = {
          ...newTill,
          createdBy : "AdminUser"
        } 
        await tillStore.AddTill(payload);
        await fetchTills();
      } catch (error) {
        console.error("Error adding till:", error);
      }
    };

    const updateTill = async (id, updatedTill) => {
      try {
        await tillStore.UpdateTill({ tillId: id, ...updatedTill });
        await fetchTills();
      } catch (error) {
        console.error("Error updating till:", error);
      }
    };

    const deleteTill = async (id) => {
      try {
        await tillStore.DeleteTill(id);
        await fetchTills();
      } catch (error) {
        console.error("Error deleting till:", error);
      }
    };

    const openTill = async (till) => {
      try {
        await tillStore.OpenTill({ tillId: till.tillId });
        await fetchTills();
      } catch (error) {
        console.error("Error opening till:", error);
      }
    };

    const assignTill = async (tillId, cashierId) => {
      try {
        await tillStore.AssignTill({ tillId, cashierId });
        await fetchTills();
      } catch (error) {
        console.error("Error assigning till:", error);
      }
    };

    const submitClosure = async (till) => {
      try {
        await tillStore.SubmitClosure({ tillId: till.tillId });
        await fetchTills();
      } catch (error) {
        console.error("Error submitting closure:", error);
      }
    };

    const superviseTill = async (tillId, approved) => {
      try {
        await tillStore.SuperviseTill({ tillId, approved });
        await fetchTills();
      } catch (error) {
        console.error("Error supervising till:", error);
      }
    };

    const getTillsUnderReview = async () => {
      try {
        const response = await tillStore.GetTillsUnderReview();
        tills.value = response || [];
      } catch (error) {
        console.error("Error fetching tills under review:", error);
      }
    };

    const closeTill = async (tillId) => {
      try {
        await tillStore.CloseTill({ tillId });
        await fetchTills();
      } catch (error) {
        console.error("Error closing till:", error);
      }
    };

    const getTillId = (till) => till.tillId;

    onMounted(() => {
      fetchTills();
      fetchCashiers();
    });

    return {
      tills,
      tillColumns,
      tillFormFields,
      fetchTills,
      fetchCashiers,
      addTill,
      updateTill,
      deleteTill,
      openTill,
      assignTill,
      submitClosure,
      superviseTill,
      getTillsUnderReview,
      closeTill,
      getTillId,
      openModalVisible,
      selectedTill,
      showOpenModal,
      handleOpenTill,
    };
  },
};
</script>
