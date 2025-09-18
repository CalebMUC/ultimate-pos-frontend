<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold">Transaction History</h1>
    <h4 class="text-sm text-slate-400 font-semibold px-2 py-2">
      Track Transaction History
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
import { ref, computed, onMounted, watch } from "vue";
import { useTransactionStore } from "../store/TransactionsStore";
import { useSaleStore } from "../store/SaleStore";
import { errorState } from "../store/ErrorState";
import ReportFilters from "../components/Reports/ReportFilters.vue";
import ReportsTables from "../components/Reports/ReportsTables.vue";

const transactionStore = useTransactionStore();
const saleStore = useSaleStore();

// 🔹 Filters
const auditFilters = ref([
  { label: "Start Date", key: "startDate", type: "date" },
  { label: "End Date", key: "endDate", type: "date" },
  {
    label: "Status",
    key: "status",
    type: "select",
    options: [
      { value: "success", label: "Success" },
      { value: "failed", label: "Failed" },
      { value: "pending", label: "Pending" },
    ],
  },
  // { label: "Transaction ID", key: "transactionId", type: "text" },
  // { label: "Min Amount", key: "minAmount", type: "number" },
  // { label: "Max Amount", key: "maxAmount", type: "number" },
]);

// 🔹 Table Columns
const selectedColumns = [
  { key: "transactionId", label: "Transaction ID" },
  { key: "customerName", label: "Customer" },
  { key: "amount", label: "Amount" },
  { key: "status", label: "Status" },
  { key: "createdAt", label: "Date" },
];

// 🔹 Computed Headers + Rows (same style as Audit Logs)
const tableHeaders = computed(() => selectedColumns.map((col) => col.label));

const tableRows = computed(() =>
  transactionStore.filterTransactions.map((trx) =>
    selectedColumns.map((col) => {
      if (col.key === "createdAt") {
        return formatDate(trx[col.key]);
      }
      return trx[col.key] ?? "";
    })
  )
);

// 🔹 Handle Filters
function generateAuditLogs(filters) {
  transactionStore.fetchTransactions(filters);
}

// 🔹 Lifecycle
onMounted(() => {
  transactionStore.fetchTransactions();
});

// 🔹 Error handling
watch(
  () => errorState.message,
  (newVal) => {
    if (newVal) {
      DisplayMessage(`Error: ${errorState.code} - ${newVal}`);
    }
  }
);

// 🔹 Helpers
function formatDate(dateString) {
  if (!dateString) return "";
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}
</script>
