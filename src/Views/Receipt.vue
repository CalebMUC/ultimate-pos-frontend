<template>
  <div
    id="receipt"
    class="w-[80mm] font-mono text-xs leading-relaxed text-black mx-auto p-2"
  >
    <!-- Header Section -->
    <div class="text-center mb-2">
      <h1 class="text-base font-bold">{{ businessName }}</h1>
      <p>{{ businessAddress }}</p>
      <p>Phone: {{ businessPhone }}</p>
      <p>Receipt #: {{ transaction.transactionID }}</p>
      <p>Date: {{ formatDate(transaction.transactionDate) }}</p>
    </div>
    <hr class="border-dashed border-black my-2" />

    <!-- Transaction Items -->
    <div class="mb-2">
      <table class="w-full border-collapse">
        <thead>
          <tr class="border-b border-black">
            <th class="text-left py-1">Item</th>
            <th class="text-center py-1">Qty</th>
            <th class="text-right py-1">Price</th>
            <th class="text-right py-1">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in transaction.items"
            :key="item.productID"
            class="border-b border-dotted border-black"
          >
            <td class="py-1">{{ item.productName }}</td>
            <td class="text-center py-1">{{ item.quantity }}</td>
            <td class="text-right py-1">{{ formatCurrency(item.price) }}</td>
            <td class="text-right py-1">
              {{ formatCurrency(item.quantity * item.price) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr class="border-dashed border-black my-2" />

    <!-- Totals Section -->
    <div class="text-right space-y-1">
      <p><span class="font-bold">Subtotal:</span> {{ formatCurrency(transaction.subtotal) }}</p>
      <p><span class="font-bold">VAT (16%):</span> {{ formatCurrency(transaction.tax) }}</p>
      <p><span class="font-bold">Total:</span> {{ formatCurrency(transaction.totalCost) }}</p>
      <p v-if="transaction.paymentMethod === 'Mpesa'">
        <span class="font-bold">Paid via Mpesa:</span> {{ formatCurrency(transaction.amountPaid) }}
      </p>
      <p><span class="font-bold">Change:</span> {{ formatCurrency(transaction.cashChange) }}</p>
    </div>
    <hr class="border-dashed border-black my-2" />

    <!-- Loyalty Points Section -->
    <div v-if="transaction.loyalty" class="mt-2">
      <h2 class="font-semibold text-sm">Loyalty Program</h2>
      <p><span class="font-bold">Customer:</span> {{ transaction.loyalty.customerName }}</p>
      <p><span class="font-bold">Loyalty Code:</span> {{ transaction.loyalty.loyaltyCode }}</p>
      <p><span class="font-bold">Previous Points:</span> {{ transaction.loyalty.previousPoints }}</p>
      <p><span class="font-bold">Points Earned:</span> {{ transaction.loyalty.pointsEarned }}</p>
      <p><span class="font-bold">Total Points:</span> {{ transaction.loyalty.totalPoints }}</p>
    </div>
    <hr class="border-dashed border-black my-2" />

    <!-- Footer Section -->
    <div class="text-center mt-2 space-y-1">
      <p>Cashier: {{ transaction.cashier }}</p>
      <p>Supervisor: {{ transaction.supervisor }}</p>
      <p v-if="transaction.paymentMethod === 'Mpesa'">
        Mpesa Reference: {{ transaction.paymentReference }}
      </p>
      <p class="mt-2">Thank you for shopping with us!</p>
      <p>Visit again!</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    businessName: { type: String, default: "Your Business Name" },
    businessAddress: { type: String, default: "123 Business Street, Nairobi" },
    businessPhone: { type: String, default: "+254 712 345678" },
    transaction: { type: Object, required: true },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }).format(amount);
    },
    formatDate(date) {
      const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      };
      return new Date(date).toLocaleDateString("en-KE", options);
    },
    autoPrint() {
      const receiptContent = document.getElementById("receipt").innerHTML;
      const printWindow = window.open("", "", "width=400,height=600");
      printWindow.document.write(`
        <html>
          <head>
            <title>Receipt</title>
            <style>
              body { font-family: Courier, monospace; font-size: 12px; width: 80mm; }
            </style>
          </head>
          <body>${receiptContent}</body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    },
  },
  mounted() {
    this.autoPrint();
  },
};
</script>
