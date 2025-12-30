import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router'
import Navbar from './components/Navbar.vue'
// 新增：导入 Pinia 核心方法
import { createPinia } from 'pinia'

const app = createApp(App)

app.component('Navbar', Navbar)

// 新增：创建并注册 Pinia 实例（让项目支持状态管理）
const pinia = createPinia()
app.use(pinia)

app.use(router)
app.mount('#app')