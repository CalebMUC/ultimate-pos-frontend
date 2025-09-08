<template>
  <div
    class="bg-white rounded-xl shadow-sm border border-gray-100 p-3 flex flex-col h-72 transition-all duration-300 hover:shadow-md"
  >
    <!-- Header -->
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-sm font-medium text-gray-800">{{ title }}</h2>
    </div>

    <!-- Chart -->
    <div class="flex-1 relative">
      <canvas :id="chartId" class="absolute inset-0 w-full h-full"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from "chart.js/auto";

export default {
  props: {
    title: String,
    chartId: String,
    type: String,
    labels: Array,
    datasets: Array,
    height: {
      type: Number,
      default: 300,
    },
    options: {
      type: Object,
      default: () => ({}),
    },
  },
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      if (this.chartInstance) {
        this.chartInstance.destroy();
      }

      this.chartInstance = new Chart(document.getElementById(this.chartId), {
        type: this.type,
        data: {
          labels: this.labels,
          datasets: this.datasets,
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position:
                this.type === "pie" || this.type === "doughnut"
                  ? "right"
                  : "top",
              labels: {
                font: {
                  family: "Inter, sans-serif",
                  size: 10, // 🔽 reduced font size
                },
                color: "#4B5563",
                boxWidth: 10, // 🔽 smaller legend icons
                boxHeight: 10,
                borderRadius: 3,
                padding: 8, // 🔽 tighter spacing
              },
            },
          },
          ...this.options,
        },
      });
    },
  },
  watch: {
    labels() {
      this.renderChart();
    },
    datasets() {
      this.renderChart();
    },
  },
};
</script>
