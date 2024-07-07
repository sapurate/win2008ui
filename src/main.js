import { createApp } from 'vue'
import './style.css'
import Desktop from './Desktop.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(Desktop)
app.use(ElementPlus)
app.mount('#app')
