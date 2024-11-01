<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-container>
            <h1>COVID-19 Tracking Dashboard</h1>
            <v-tabs v-model="tab" background-color="primary" dark>
              <v-tab v-for="item in items" :key="item.tab">
                {{ item.tab }}
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
              <v-tab-item v-for="item in items" :key="item.tab">
                <v-card flat>
                  <v-card-text>{{ item.content }}</v-card-text>
                </v-card>
              </v-tab-item>
            </v-tabs-items>
            <v-row v-if="arrPositive.length">
              <v-col
                cols="12"
                v-for="chartData in renderData"
                :key="chartData.id"
              >
                <LineChart
                  :label="chartData.label"
                  :chartData="chartData.data"
                  :options="chartOptions"
                  :chartColorOptions="chartData.chartColorOptions"
                />
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
import LineChart from './components/LineChart'
import dayjs from 'dayjs'

export default {
  name: 'App',
  components: {
    LineChart,
  },
  data() {
    return {
      arrPositive: [],
      arrHospitalized: [],
      arrInIcu: [],
      arrOnVentilators: [],
      arrRecovered: [],
      arrDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
      tab: null,
      items: [
          { tab: 'One', content: 'Tab 1 Content' },
          { tab: 'Two', content: 'Tab 2 Content' },
          { tab: 'Three', content: 'Tab 3 Content' },
          { tab: 'Four', content: 'Tab 4 Content' },
          { tab: 'Five', content: 'Tab 5 Content' },
          { tab: 'Six', content: 'Tab 6 Content' },
          { tab: 'Seven', content: 'Tab 7 Content' },
          { tab: 'Eight', content: 'Tab 8 Content' },
          { tab: 'Nine', content: 'Tab 9 Content' },
          { tab: 'Ten', content: 'Tab 10 Content' },
      ]
    }
  },
  computed: {
    renderData() {
      const labels = [
        'Positive',
        'Hospitalized',
        'In ICU',
        'On Ventilators',
        'Recovered',
        'Deaths',
      ]
      const dataArrays = [
        this.arrPositive,
        this.arrHospitalized,
        this.arrInIcu,
        this.arrOnVentilators,
        this.arrRecovered,
        this.arrDeaths,
      ]
      const chartColorOptions = [
        { borderColor: '#EF5350', backgroundColor: 'rgba(255, 56, 96, 0.1)' },
        { borderColor: '#FFF176', backgroundColor: 'rgba(191, 182, 63, 0.1)' },
        { borderColor: '#FFB74D', backgroundColor: 'rgba(239, 109, 9, 0.1)' },
        { borderColor: '#B3E5FC', backgroundColor: 'rgba(9, 140, 239, 0.1)' },
        { borderColor: '#00E676', backgroundColor: 'rgba(11, 227, 47, 0.1)' },
        { borderColor: '#E30B86', backgroundColor: 'rgba(239, 9, 140, 0.1)' },
      ]
      return dataArrays.map((data, index) => ({
        label: labels[index],
        data,
        chartColorOptions: chartColorOptions[index],
      }))
    },
  },
  async created() {
    let { data } = await axios.get('https://api.covidtracking.com/v1/us/daily.json')
    data = data.slice(0, 30)
    data.forEach((item) => {
      const date = dayjs(`${item.date}`).format('YYYY/MM/DD')
      this.arrPositive.push({ date, total: item.positive })
      this.arrHospitalized.push({ date, total: item.hospitalizedCurrently })
      this.arrInIcu.push({ date, total: item.inIcuCurrently })
      this.arrOnVentilators.push({ date, total: item.onVentilatorCurrently })
      this.arrRecovered.push({ date, total: item.recovered })
      this.arrDeaths.push({ date, total: item.death })
    })
  },
}
</script>
