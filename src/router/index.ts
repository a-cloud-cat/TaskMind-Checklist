// src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Welcome from '../activity/WelcomeBox.vue'
import EnterTest from '../activity/EnterTest.vue'
import ActivityMain from '../activity/ActivityMain.vue'
import PrivacyPolicy_UserAgreement from "../views/PrivacyPolicy_UserAgreement.vue";

const routes: RouteRecordRaw[] = [
    { path: '/', component: Welcome },
    { path: '/next', component: EnterTest },
    {path:'/ActivityMain', component:ActivityMain},
    {path:'/PrivacyPolicy_UserAgreement',component:PrivacyPolicy_UserAgreement},
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router