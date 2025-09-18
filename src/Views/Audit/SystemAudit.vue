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
import { ref, computed } from "vue";
import ReportFilters from "../../components/Reports/ReportFilters.vue";
import ReportsTables from "../../components/Reports/ReportsTables.vue";

// 🔹 Dummy logs for testing
const auditLogs = ref([
  {
    date: "2025-08-26 18:21",
    module: "Till",
    user: "Cashier1",
    action: "Close Till",
    details: "Variance: -100 KES",
    ipAddress: "192.168.1.5",
    device: "POS #01",
  },
  {
    date: "2025-08-26 17:05",
    module: "Administration",
    user: "Admin",
    action: "Add Product",
    details: "Milk (20 pcs added)",
    ipAddress: "192.168.1.8",
    device: "Web Admin",
  },
  {
    date: "2025-08-26 15:10",
    module: "Sales",
    user: "Cashier2",
    action: "Sale Created",
    details: "Total: 1,500 KES",
    ipAddress: "192.168.1.9",
    device: "POS #02",
  },
]);

// 🔹 Modules filter options
const modules = [
  { id: "all", name: "All" },
  { id: "auth", name: "Authentication" },
  { id: "till", name: "Till" },
  { id: "admin", name: "Administration" },
  { id: "sales", name: "Sales" },
];

// 🔹 Filters - Now using separate date filters
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

// 🔹 Computed Headers + Rows
const tableHeaders = computed(() => selectedColumns.map((col) => col.label));

const tableRows = computed(() =>
  auditLogs.value.map((log) =>
    selectedColumns.map((col) => log[col.key])
  )
);

// 🔹 Action handler
function generateAuditLogs(filters) {
  console.log("Generating report with filters:", filters);
  // You'll now receive fromDate and toDate as separate properties
  // Example: {fromDate: "2023-08-01", toDate: "2023-08-31", modules: "all"}
  
  // 🔜 Call backend API here later
}
</script>