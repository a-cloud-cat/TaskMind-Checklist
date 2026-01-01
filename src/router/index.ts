import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Welcome from '../activity/WelcomeBox.vue'
import Login from '../activity/Login.vue' // 登录页（/next）
import ActivityMain from '../activity/ActivityMain.vue'
import PrivacyPolicy_UserAgreement from "../views/PrivacyPolicy_UserAgreement.vue";
import AdminPage from "../views/AdminPage.vue";
// 导入注册页组件
import Register from "../views/Register.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Welcome },
    { path: '/next', component: Login }, // 登录页
    { path: '/ActivityMain', component: ActivityMain },
    { path: '/PrivacyPolicy_UserAgreement', component: PrivacyPolicy_UserAgreement },
    { path: '/AdminPage', component: AdminPage },
    { path: '/register', component: Register }, // 注册页
    { path: '/:pathMatch(.*)*', redirect: '/' } // 404兜底
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router