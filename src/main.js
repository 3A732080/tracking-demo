/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import 'vuetify/styles'  // 新的樣式導入方式

const app = createApp(App)
const vuetify = createVuetify()  // 創建 Vuetify 實例

app.use(vuetify)
registerPlugins(app)

app.mount('#app')
