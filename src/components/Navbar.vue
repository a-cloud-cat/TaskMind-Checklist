<template>
  <div class="navbar">
    <div class="navbar-left">
      <div class="logo">TaskMind</div>
    </div>

    <div class="navbar-right">
      <div class="search-container">
        <input type="text" placeholder="搜索..." class="search-input">
      </div>

      <a href="/" class="menu-item home-item">
        <span>首页</span>
      </a>

      <div class="icon-btn bell-btn">
        🔔
      </div>

      <div class="menu-item setting-item" @click="toggleSettingDropdown">
        <span>⚙️ 设置</span>
        <div class="dropdown setting-dropdown" v-show="showSettingDropdown">
          <div class="dropdown-item setting-placeholder">
            设置功能待完善
          </div>
        </div>
      </div>

      <div class="menu-item login-item" @click="toggleLoginDropdown">
        <div class="avatar">👤</div>
        <span class="login-text">登录</span>
        <div class="dropdown login-dropdown" v-show="showLoginDropdown">
          <div class="dropdown-item" @click="goToLogin('admin')">
            管理员登录
          </div>
          <div class="dropdown-item" @click="goToLogin('user')">
            用户登录
          </div>
          <div class="dropdown-item" @click="goToLogin('vip')">
            VIP登录
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const showSettingDropdown = ref(false)
const showLoginDropdown = ref(false)

const toggleSettingDropdown = () => {
  showSettingDropdown.value = !showSettingDropdown.value
  showLoginDropdown.value = false
}

const toggleLoginDropdown = () => {
  showLoginDropdown.value = !showLoginDropdown.value
  showSettingDropdown.value = false
}

const goToLogin = (type: string) => {
  router.push({ path: '/next', query: { type } })
  showLoginDropdown.value = false
}

document.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  if (!target.closest('.setting-item') && !target.closest('.login-item')) {
    showSettingDropdown.value = false
    showLoginDropdown.value = false
  }
})
</script>

<style scoped>
.navbar {
  background-color: #2b2b2b;
  height: 56px;
  display: flex;
  align-items: center;
  padding: 0 20px;
  color: #fff;
  font-size: 14px;
  transition: background-color 0.3s;
}

.navbar-left .logo {
  color: inherit;
  font-size: 20px;
  font-weight: bold;
  text-decoration: none;
  cursor: default;
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-left: auto;
}

.search-container {
  max-width: 280px;
  margin-left: 20px;
}

.search-input {
  width: 100%;
  height: 36px;
  border-radius: 18px;
  border: none;
  background-color: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 14px;
  outline: none;
  padding: 0 0 0 12px;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.home-item {
  height: 40px;
  padding: 0 12px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
  color: inherit;
  text-decoration: none;
}

.home-item:hover {
  background-color: rgba(255, 255, 255, 0.1);
  color: #c6c6c6;
}

.icon-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.icon-btn:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.menu-item {
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 0 8px;
  height: 56px;
}

.menu-item:hover {
  color: #c6c6c6;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown {
  position: absolute;
  top: 56px;
  right: 0;
  background-color: #fff;
  color: #2b2b2b;
  min-width: 160px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  z-index: 999;
  border-radius: 4px;
}

.dropdown-item {
  padding: 8px 16px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
}

.setting-placeholder {
  color: #999;
  cursor: default;
}

.setting-placeholder:hover {
  background-color: transparent;
}

.setting-dropdown {
  right: 0;
}

.login-dropdown {
  right: 0;
}

.login-item {
  gap: 10px;
}

.login-text {
  font-size: 14px;
}
</style>