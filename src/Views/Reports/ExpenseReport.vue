<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Expense Report</h1>

    <ReportFilters
      :filters="expenseFilters"
      @generate="generateExpenseReport"
    />
    
    <ReportTable
      :headers="['Expense Name', 'Category', 'Description', 'Date', 'Amount', 'Status']"
      :rows="filteredExpenseData"
      :perPage="10"
      has-actions
      @edit="handleEdit"
      @delete="handleDelete"
    >
      <!-- Custom status badge rendering -->
      <template #cell-5="{ value }">
        <span :class="{
          'px-2 py-1 text-xs rounded-full': true,
          'bg-green-100 text-green-800': value === 'Approved',
          'bg-yellow-100 text-yellow-800': value === 'Pending',
          'bg-red-100 text-red-800': value === 'Rejected'
        }">
          {{ value }}
        </span>
      </template>
    </ReportTable>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import ReportTable from '../../components/Reports/ReportsTables.vue';
import ReportFilters from '../../components/Reports/ReportFilters.vue';

const expenseData = ref([
  ['AC Repair Service', 'Repairs & Maintenance', 'AC Repair for Office', '27 Nov 2024', '$800', 'Approved'],
  ['Business Flight Ticket', 'Travel Expenses', 'Flight tickets for meetings', '14 Oct 2024', '$1200', 'Approved'],
  ['Office Supplies', 'Supplies', 'Printer ink and paper', '05 Dec 2024', '$150', 'Pending'],
  ['Team Lunch', 'Food', 'Monthly team lunch', '20 Nov 2024', '$350', 'Approved'],
  ['Software Subscription', 'Software', 'Annual subscription', '01 Jan 2024', '$1200', 'Approved'],
  ['Conference Tickets', 'Professional Development', 'Tech conference', '15 Sep 2024', '$600', 'Rejected'],
]);

const activeFilters = ref({});

const expenseFilters = [
  { 
    label: "Date Range", 
    key: "dateRange", 
    type: "date-range" 
  },
  {
    label: "Expense Category",
    key: "category",
    type: "select",
    options: [
      { label: "All Categories", value: "" },
      { label: "Repairs & Maintenance", value: "Repairs & Maintenance" },
      { label: "Travel Expenses", value: "Travel Expenses" },
      { label: "Supplies", value: "Supplies" },
      { label: "Food", value: "Food" },
      { label: "Software", value: "Software" },
      { label: "Professional Development", value: "Professional Development" }
    ]
  },
  {
    label: "Status",
    key: "status",
    type: "select",
    options: [
      { label: "All Statuses", value: "" },
      { label: "Approved", value: "Approved" },
      { label: "Pending", value: "Pending" },
      { label: "Rejected", value: "Rejected" }
    ]
  }
//   {
//     label: "Search",
//     key: "search",
//     type: "text",
//     placeholder: "Search expenses..."
//   }
];

const filteredExpenseData = computed(() => {
  if (Object.keys(activeFilters.value).length === 0) {
    return expenseData.value;
  }

  return expenseData.value.filter(row => {
    // Date filter
    if (activeFilters.value.dateRange) {
      const [start, end] = activeFilters.value.dateRange;
      const rowDate = new Date(row[3]);
      if (rowDate < new Date(start) || rowDate > new Date(end)) {
        return false;
      }
    }

    // Category filter
    if (activeFilters.value.category && row[1] !== activeFilters.value.category) {
      return false;
    }

    // Status filter
    if (activeFilters.value.status && row[5] !== activeFilters.value.status) {
      return false;
    }

    // Search filter
    if (activeFilters.value.search) {
      const searchTerm = activeFilters.value.search.toLowerCase();
      const rowText = row.join(' ').toLowerCase();
      if (!rowText.includes(searchTerm)) {
        return false;
      }
    }

    return true;
  });
});

function generateExpenseReport(filters) {
  activeFilters.value = filters;
  console.log("Filters applied:", filters);
}

const handleEdit = (row) => {
  console.log('Edit row:', row);
  // Implement your edit logic
};

const handleDelete = (row) => {
  console.log('Delete row:', row);
  // Implement your delete logic
};
</script>