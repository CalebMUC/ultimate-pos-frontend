<!-- src/components/DashboardComponents/ReChart.vue -->
<template>
  <div class="rounded-2xl shadow-md bg-white p-4">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-lg font-semibold">{{ title }}</h2>
      <select v-model="selectedYear" class="border rounded px-2 py-1 text-sm bg-gray-50">
        <option v-for="y in years" :key="y" :value="y">{{ y }}</option>
      </select>
    </div>
    <div class="chart-container">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
  name: 'ReChart',
  components: { Bar },
  props: {
    title: { type: String, default: "Purchase & Sales" },
    years: { type: Array, default: () => [2025, 2024] },
    initialYear: { type: Number, default: 2025 },
    data: { 
      type: Object, 
      default: () => ({})
    }
  },
  data() {
    return {
      selectedYear: this.initialYear,
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { 
            position: "top",
            labels: {
              usePointStyle: true,
              padding: 15,
              boxWidth: 8,
              font: {
                size: 11
              }
            }
          },
          tooltip: { 
            enabled: true,
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            padding: 8,
            cornerRadius: 4,
            bodyFont: {
              size: 11
            },
            titleFont: {
              size: 11
            }
          },
          title: {
            display: false
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              font: {
                size: 11
              }
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(0, 0, 0, 0.03)',
              drawBorder: false
            },
            ticks: {
              font: {
                size: 10
              },
              padding: 5
            }
          }
        },
        // These settings create very slim bars
        datasets: {
          bar: {
            barPercentage: 0.3,      // Very slim bars (30% of available space)
            categoryPercentage: 0.8   // Normal spacing between categories
          }
        },
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    chartData() {
      const yearData = this.data[this.selectedYear] || []
      return {
        labels: yearData.map(d => d.month),
        datasets: [
          {
            label: "Sales",
            data: yearData.map(d => d.sales),
            backgroundColor: "#16a34a",
            borderRadius: 2,
            borderSkipped: false,
          },
          {
            label: "Purchase",
            data: yearData.map(d => d.purchase),
            backgroundColor: "#ef4444",
            borderRadius: 2,
            borderSkipped: false,
          }
        ]
      }
    }
  }
}
</script>

<style scoped>
.chart-container {
  position: relative;
  height: 250px;
  width: 100%;
}

:deep(.chartjs-render-monitor) {
  height: 250px !important;
}
</style>