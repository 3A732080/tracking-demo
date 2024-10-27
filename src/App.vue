<template>
  <v-app>
    <v-main>
      <v-container>
        <v-card>
          <v-container>
            <h1>COVID-19 Tracking Dashboard</h1>
            <v-row v-if="arrPositive.length">
              <v-col cols="12">
                <LineChart
                  label="Positive"
                  :chartData="arrPositive"
                  :options="chartOptions"
                  :chartColorOptions="{
                    borderColor: '#EF5350',
                    backgroundColor: 'rgba(255, 56, 96, 0.1)',
                  }"
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
      arrHoptialized: [],
      arrInIcu: [],
      arrOnVentilators: [],
      arrRecovered: [],
      arrDeaths: [],
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
      },
    }
  },
  async created() {
    // 利用解構的方式取出 axios 拿到的 data
    let { data } = await axios.get(
      'https://api.covidtracking.com/v1/us/daily.json'
    )
    
    // 只取最近一個月的資料
    data = data.slice(0, 30)
    
    // 迭代陣列中的每個元素
    data.forEach((item) => {
      // 利用 dayjs 將原本的 20201010 改為 2020/10/10
      const date = dayjs(`${item.date}`).format('YYYY/MM/DD')
      
      // 利用解構的方式取出 data 內需要的值
      const {
        positive,
        hospitalizedCurrently,
        inIcuCurrently,
        recovered,
        onVentilatorCurrently,
        death,
      } = item
      
      // 將值推進對應的陣列，每一個值都需要對應一個日期，所以要以物件的方式傳入
      this.arrPositive.push({ date, total: positive })
      this.arrHoptialized.push({ date, total: hospitalizedCurrently })
      this.arrDeaths.push({ date, total: death })
      this.arrRecovered.push({ date, total: recovered })
      this.arrOnVentilators.push({ date, total: onVentilatorCurrently })
      this.arrInIcu.push({ date, total: inIcuCurrently })
    })
  },
}
</script>