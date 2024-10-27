<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  props: {
    label: {
      type: String,
      required: true,
    },
    chartData: {
      type: Array,
      required: true,
    },
    options: {
      type: Object,
      default: () => ({
        responsive: true,
        maintainAspectRatio: false
      }),
    },
    chartColorOptions: {
      type: Object,
      default: () => ({
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
        fill: false,
      }),
    },
  },
  mounted() {
    const ctx = this.$refs.canvas.getContext('2d');
    const dates = this.chartData.map(d => d.date).reverse();
    const totals = this.chartData.map(d => d.total).reverse();

    new Chart(ctx, {
      type: 'line',
      data: {
        labels: dates,
        datasets: [{
          label: this.label,
          data: totals,
          ...this.chartColorOptions,
        }],
      },
      options: this.options,
    });
  }
}
</script>
