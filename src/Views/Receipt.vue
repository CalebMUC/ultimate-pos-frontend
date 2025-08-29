
<template>
  <div id="receipt" class="receipt">
    <!-- Header Section -->
    <div class="header">
      <h1>{{ businessName }}</h1>
      <p>{{ businessAddress }}</p>
      <p>Phone: {{ businessPhone }}</p>
      <p>Receipt #: {{ transaction.transactionID }}</p>
      <p>Date: {{ formatDate(transaction.transactionDate) }}</p>
    </div>
    <hr />

    <!-- Transaction Items -->
    <div class="items-section">
      <table class="items">
        <thead>
          <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Price</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in transaction.items" :key="item.productID">
            <td>{{ item.productName }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ formatCurrency(item.price) }}</td>
            <td>{{ formatCurrency(item.quantity * item.price) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <hr />

    <!-- Totals Section -->
    <div class="totals">
      <p><strong>Subtotal:</strong> {{ formatCurrency(transaction.subtotal) }}</p>
      <p><strong>VAT (16%):</strong> {{ formatCurrency(transaction.tax) }}</p>
      <p><strong>Total:</strong> {{ formatCurrency(transaction.totalCost) }}</p>
      <p v-if="transaction.paymentMethod === 'Mpesa'">
        <strong>Paid via Mpesa:</strong> {{ formatCurrency(transaction.amountPaid) }}
      </p>
      <p><strong>Change:</strong> {{ formatCurrency(transaction.cashChange) }}</p>
    </div>
    <hr />

    <!-- Loyalty Points Section -->
    <div class="loyalty">
      <h2>Loyalty Program</h2>
      <p><strong>Customer:</strong> {{ transaction.loyalty.customerName }}</p>
      <p><strong>Loyalty Code:</strong> {{ transaction.loyalty.loyaltyCode }}</p>
      <p><strong>Previous Points:</strong> {{ transaction.loyalty.previousPoints }}</p>
      <p><strong>Points Earned:</strong> {{ transaction.loyalty.pointsEarned }}</p>
      <p><strong>Total Points:</strong> {{ transaction.loyalty.totalPoints }}</p>
    </div>
    <hr />

    <!-- Footer Section -->
    <div class="footer">
      <p>Cashier: {{ transaction.cashier }}</p>
      <p>Supervisor: {{ transaction.supervisor }}</p>
      <p v-if="transaction.paymentMethod === 'Mpesa'">
        Mpesa Reference: {{ transaction.paymentReference }}
      </p>
      <p>Thank you for shopping with us!</p>
      <p>Visit again!</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      businessName: "Your Business Name",
      businessAddress: "123 Business Street, Nairobi",
      businessPhone: "+254 712 345678",
    };
  },
  props: {
    transaction: {
      type: Object,
      required: true,
    },
  },
  methods: {
    formatCurrency(amount) {
      return new Intl.NumberFormat("en-KE", {
        style: "currency",
        currency: "KES",
      }).format(amount);
    },
    formatDate(date) {
      const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
      return new Date(date).toLocaleDateString("en-KE", options);
    },
  },
};
</script>

<style>
/* / Thermal receipt styling / */
.receipt {
  width: 80mm;
  font-family: "Courier New", Courier, monospace;
  font-size: 12px;
  line-height: 1.5;
  color: #000;
  text-align: left;
  margin: 0 auto;
  padding: 10px;
  box-sizing: border-box;
}

.header {
  text-align: center;
  margin-bottom: 10px;
}

.items {
  width: 100%;
  border-collapse: collapse;
}

.items th, .items td {
  padding: 5px;
  text-align: left;
}

.items th {
  border-bottom: 1px solid #000;
}

.items td {
  border-bottom: 1px dotted #000;
}

.totals {
  text-align: right;
  margin: 10px 0;
}

.loyalty {
  margin-top: 10px;
}

.footer {
  text-align: center;
  margin-top: 10px;
}
</style>
