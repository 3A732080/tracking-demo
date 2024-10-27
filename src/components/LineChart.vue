<template>
  <div>
    <canvas ref="canvas"></canvas>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

export default {
  mounted() {
    const ctx = this.$refs.canvas.getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['2020/07/05', '2020/07/06', '2020/07/07', '2020/07/08', '2020/07/09', '2020/07/10'],
        datasets: [{
          label: 'demo',
          data: [50, 40, 71, 51, 25, 49],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }
}
</script>