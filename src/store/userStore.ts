import { defineStore } from 'pinia'

interface UserInfo {
    id?: number
    username: string
    user_type?: 'admin' | 'user'
    status?: 'normal' | 'banned'
    isVip: boolean // 确保是布尔值
}

interface UserStoreState {
    userInfo: UserInfo | null
    isLogin: boolean
}

export const useUserStore = defineStore('user', {
    state: (): UserStoreState => ({
        userInfo: null,
        isLogin: false
    }),
    actions: {
        // 登录：正确读取前端存储的会员状态（转布尔值）
        login(userData: Omit<UserInfo, 'isVip'>) {
            // 从localStorage读取并转布尔值（避免字符串类型问题）
            const isVip = localStorage.getItem(`userVip_${userData.id}`) === 'true'
            this.userInfo = { ...userData, isVip }
            this.isLogin = true
            // 持久化用户信息（含会员状态）
            localStorage.setItem('userInfo', JSON.stringify(this.userInfo))
            localStorage.setItem('isLogin', 'true')
        },
        // 退出登录
        logout() {
            this.userInfo = null
            this.isLogin = false
            localStorage.removeItem('userInfo')
            localStorage.removeItem('isLogin')
        },
        // 初始化：确保读取到正确的会员状态
        initUserInfo() {
            const userInfoStr = localStorage.getItem('userInfo')
            const isLogin = localStorage.getItem('isLogin') === 'true'
            if (userInfoStr && isLogin) {
                const parsedInfo = JSON.parse(userInfoStr)
                // 二次校验会员状态（防止类型异常）
                parsedInfo.isVip = parsedInfo.isVip === true
                this.userInfo = parsedInfo
                this.isLogin = true
            }
        }
    }
})