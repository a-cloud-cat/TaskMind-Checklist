import { defineStore } from 'pinia'

interface UserInfo {
    id?: number
    username: string
}

export const useUserStore = defineStore('user', {
    state: () => ({
        userInfo: (() => {
            const storedUser = localStorage.getItem('userInfo')
            return storedUser ? JSON.parse(storedUser) as UserInfo : null
        })(),
        isLogin: localStorage.getItem('isLogin') === 'true'
    }),
    actions: {
        login(userData: UserInfo) {
            this.userInfo = userData
            this.isLogin = true
            localStorage.setItem('userInfo', JSON.stringify(userData))
            localStorage.setItem('isLogin', 'true')
        },
        logout() {
            this.userInfo = null
            this.isLogin = false
            localStorage.removeItem('userInfo')
            localStorage.removeItem('isLogin')
        }
    }
})