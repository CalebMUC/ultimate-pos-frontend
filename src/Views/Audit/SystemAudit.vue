<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Audit Logs</h1>
    <h4 class="text-sm text-slate-400 font-semibold px-2 py-2">
      Track activities across the system
    </h4>

    <!-- 🔍 Filters -->
    <ReportFilters
      :filters="auditFilters"
      @generate="generateAuditLogs"
    />

    <!-- 📊 Table -->
    <ReportsTables
      :headers="tableHeaders"
      :rows="tableRows"
      :per-page="10"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import ReportFilters from "../../components/Reports/ReportFilters.vue";
import ReportsTables from "../../components/Reports/ReportsTables.vue";
import { useSystemAuditStore } from "../../store/SystemAuditStore";
import { storeToRefs } from "pinia";

const store = useSystemAuditStore()
const { logs: auditLogs, loading } = storeToRefs(store)

// 🔹 Modules filter options
const modules = [
  { id: "all", name: "All" },
  { id: "auth", name: "Authentication" },
  { id: "till", name: "Till" },
  { id: "admin", name: "Administration" },
  { id: "sales", name: "Sales" },
];

// 🔹 Filters
const auditFilters = ref([
  {
    label: "From Date",
    key: "fromDate",
    type: "date",
    placeholder: "Select start date"
  },
  {
    label: "To Date",
    key: "toDate",
    type: "date",
    placeholder: "Select end date"
  },
  {
    label: "Modules",
    key: "modules",
    type: "select",
    options: modules.map((m) => ({
      value: m.id,
      label: m.name,
    })),
  },
]);

// 🔹 Table Columns
const selectedColumns = [
  { key: "date", label: "Date/Time" },
  { key: "module", label: "Module" },
  { key: "user", label: "User" },
  { key: "action", label: "Action" },
  { key: "details", label: "Details" },
  { key: "ipAddress", label: "IP Address" },
  { key: "device", label: "Device" },
];

const tableHeaders = computed(() => selectedColumns.map((col) => col.label));

const tableRows = computed(() =>
  auditLogs.value.map((log) =>
    selectedColumns.map((col) => log[col.key])
  )
);

// 🔹 Fetch logs when filters are applied
async function generateAuditLogs(filters) {
  await store.fetchAuditLogs(filters)
}

// Fetch all logs on mount
onMounted(() => store.fetchAuditLogs({}))
</script>