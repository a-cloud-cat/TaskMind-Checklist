<template>
  <div class="admin-container">
    <div class="admin-header">
      <h2>管理员控制台</h2>
      <div class="admin-info">
        <span>当前登录：{{ userStore.userInfo?.username }}（管理员）</span>
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
          <th>是否是会员</th>
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
          <!-- 恢复原有标签样式（和“是否正常使用”保持一致） -->
          <td>
              <span
                  class="status-tag"
                  :class="{ vip: user.isVip, nonVip: !user.isVip }"
                  @click="toggleVipStatus(user.id, user.isVip)"
              >
                {{ user.isVip ? '是会员' : '非会员' }}
              </span>
          </td>
        </tr>
        <tr v-if="userList.length === 0">
          <td colspan="5" class="empty-tip">暂无用户账户数据</td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../store/userStore'
import axios from 'axios'

interface User {
  id: number
  username: string
  user_type: 'admin' | 'user'
  status: 'normal' | 'banned'
  isVip: boolean
}

const userStore = useUserStore()
const router = useRouter()
const userList = ref<User[]>([])

onMounted(async () => {
  userStore.initUserInfo()
  if (userStore.userInfo?.user_type !== 'admin') {
    alert('无管理员权限，禁止访问！')
    router.push('/ActivityMain')
    return
  }
  await fetchAllUserList()
})

// 获取用户列表（补全前端会员状态）
const fetchAllUserList = async () => {
  try {
    const res = await axios.get<{ code: number; data: Omit<User, 'isVip'>[] }>(
        'http://localhost:8080/api/user/admin/list'
    )
    if (res.data.code === 200) {
      userList.value = res.data.data.map(user => ({
        ...user,
        // 从localStorage读取会员状态（转布尔值，默认false）
        isVip: localStorage.getItem(`userVip_${user.id}`) === 'true'
      }))
    }
  } catch (err) {
    console.error('获取用户列表失败：', err)
    alert('获取用户列表失败！')
  }
}

// 切换用户状态（保留原有逻辑）
const toggleUserStatus = async (userId: number, currentStatus: User['status']) => {
  try {
    const apiUrl = currentStatus === 'normal'
        ? 'http://localhost:8080/api/user/admin/ban'
        : 'http://localhost:8080/api/user/admin/unban'
    const res = await axios.post(apiUrl, {}, { params: { userId } })
    if (res.data.code === 200) {
      alert(`${currentStatus === 'normal' ? '封禁' : '解封'}成功！`)
      await fetchAllUserList()
    }
  } catch (err) {
    console.error('切换状态失败：', err)
    alert('切换用户状态失败！')
  }
}

// 切换会员状态（修复存储逻辑）
const toggleVipStatus = (userId: number, currentIsVip: boolean) => {
  const newIsVip = !currentIsVip
  // 存储到localStorage（确保是字符串，避免类型问题）
  localStorage.setItem(`userVip_${userId}`, newIsVip.toString())
  // 更新列表状态
  const targetUser = userList.value.find(u => u.id === userId)
  if (targetUser) targetUser.isVip = newIsVip
  alert(`已${newIsVip ? '开通' : '取消'}该用户会员！`)
}

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
/* 恢复原有美观样式 */
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
/* 统一状态/会员标签样式（恢复原有美观度） */
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
/* 会员标签样式（和原有状态标签统一） */
.status-tag.vip {
  background-color: #cce5ff;
  color: #004085;
}
.status-tag.vip:hover {
  background-color: #b8daff;
}
.status-tag.nonVip {
  background-color: #e2e3e5;
  color: #383d41;
}
.status-tag.nonVip:hover {
  background-color: #d6d8db;
}
</style>