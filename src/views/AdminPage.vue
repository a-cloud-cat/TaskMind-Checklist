<template>
  <div class="admin-container">
    <div class="admin-header">
      <h2>管理员控制台</h2>
      <div class="admin-info">
        <span>当前登录：{{ userStore.userInfo.username }}（管理员）</span>
        <button @click="handleLogout" class="logout-btn">退出登录</button>
      </div>
    </div>

    <div class="user-list-container">
      <h3>所有用户账户列表</h3>
      <table class="user-table">
        <thead>
        <tr>
          <th>用户ID</th>
          <th>用户名（账户）</th>
          <th>用户角色</th>
          <th>是否正常使用</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="user in userList" :key="user.id" class="user-item">
          <td>{{ user.id }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.user_type === 'admin' ? '管理员' : '普通用户' }}</td>
          <td>
              <span
                  class="status-tag"
                  :class="{ normal: user.status === 'normal', banned: user.status === 'banned' }"
                  @click="toggleUserStatus(user.id, user.status)"
              >
                {{ user.status === 'normal' ? '正常' : '封禁' }}
              </span>
          </td>
        </tr>
        <tr v-if="userList.length === 0">
          <td colspan="4" class="empty-tip">暂无用户账户数据</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/user'
import axios from 'axios'

const userStore = useUserStore()
const router = useRouter()
const userList = ref([])

onMounted(async () => {
  const currentUserType = userStore.userInfo.user_type
  if (!currentUserType || currentUserType !== 'admin') {
    alert('无管理员权限，禁止访问！')
    router.push('/ActivityMain')
    return
  }
  await fetchAllUserList()
})

const fetchAllUserList = async () => {
  try {
    const res = await axios.get('http://localhost:8080/api/user/admin/list')
    if (res.data.code === 200) {
      userList.value = res.data.data
    }
  } catch (err) {
    console.error('获取用户列表失败：', err)
    alert('获取用户列表失败，请检查后端接口！')
  }
}

const toggleUserStatus = async (userId: number, currentStatus: string) => {
  try {
    let apiUrl = ''
    let tip = ''
    if (currentStatus === 'normal') {
      apiUrl = 'http://localhost:8080/api/user/admin/ban'
      tip = '封禁'
    } else {
      apiUrl = 'http://localhost:8080/api/user/admin/unban'
      tip = '解封'
    }
    const res = await axios.post(apiUrl, {}, {
      params: { userId }
    })
    if (res.data.code === 200) {
      alert(`${tip}成功！`)
      await fetchAllUserList()
    } else {
      alert(`${tip}失败：${res.data.message}`)
    }
  } catch (err) {
    console.error('切换状态失败：', err)
    alert('切换用户状态失败，请检查后端服务！')
  }
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.admin-container {
  width: 95%;
  margin: 0 auto;
  padding: 20px 0;
  box-sizing: border-box;
}
.admin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}
.admin-header h2 {
  margin: 0;
  color: #333;
  font-size: 20px;
}
.admin-info {
  display: flex;
  align-items: center;
  gap: 15px;
}
.admin-info span {
  color: #666;
  font-size: 14px;
}
.logout-btn {
  padding: 6px 16px;
  background-color: #dc3545;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background-color 0.2s;
}
.logout-btn:hover {
  background-color: #c82333;
}
.user-list-container {
  background-color: #fff;
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.user-list-container h3 {
  margin-top: 0;
  margin-bottom: 20px;
  color: #444;
  font-size: 18px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}
.user-table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}
.user-table th {
  background-color: #f1f3f5;
  color: #333;
  font-weight: 600;
  padding: 12px 15px;
  border: 1px solid #dee2e6;
}
.user-table td {
  padding: 12px 15px;
  border: 1px solid #dee2e6;
  color: #666;
  font-size: 14px;
}
.user-item:hover {
  background-color: #f8f9fa;
}
.empty-tip {
  text-align: center;
  color: #999;
  font-size: 14px;
  padding: 30px 0;
}
.status-tag {
  padding: 4px 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s;
}
.status-tag.normal {
  background-color: #d4edda;
  color: #155724;
}
.status-tag.normal:hover {
  background-color: #c3e6cb;
}
.status-tag.banned {
  background-color: #f8d7da;
  color: #721c24;
}
.status-tag.banned:hover {
  background-color: #f5c6cb;
}
</style>