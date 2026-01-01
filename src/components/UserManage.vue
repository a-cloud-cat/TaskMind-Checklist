<template>
  <div class="user-manage">
    <h2>用户管理</h2>
    <!-- 新增：搜索框（使用原有样式风格） -->
    <div class="search-box">
      <input
          type="text"
          placeholder="搜索用户名..."
          v-model="searchKey"
          class="search-input"
      >
    </div>
    <!-- 原有加载状态和表格（不变） -->
    <div v-if="isLoading">加载中...</div>
    <table v-else>
      <thead>
      <tr>
        <th>ID</th>
        <th>用户名</th>
        <th>类型</th>
        <th>状态</th>
        <th>操作</th>
      </tr>
      </thead>
      <tbody>
      <!-- 仅修改循环数据源为筛选后的数据，其余不变 -->
      <tr v-for="user in filteredUsers" :key="user.id!">
        <td>{{ user.id }}</td>
        <td>{{ user.username }}</td>
        <td>
            <span :class="`tag ${user.userType}`">
              {{ user.userType === 'normal' ? '普通' : user.userType === 'vip' ? 'VIP' : '管理员' }}
            </span>
        </td>
        <td>
            <span :class="`tag ${user.status}`">
              {{ user.status === 'normal' ? '正常' : '封禁' }}
            </span>
        </td>
        <td>
          <button
              @click="handleStatus(user.id!, user.status!)"
              :disabled="user.userType === 'admin'"
          >
            {{ user.status === 'normal' ? '封禁' : '解封' }}
          </button>
          <button
              @click="user.userType !== 'admin' && handleVip(user.id!, user.userType!)"
              :disabled="user.userType === 'admin'"
          >
            {{ user.userType === 'normal' ? '开通VIP' : '取消VIP' }}
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
// 原有导入（新增computed）
import { ref, onMounted, computed } from 'vue';
import { useUserStore } from '../store/user';
import type { User } from '../store/user';

// 原有变量（新增搜索相关变量）
const userStore = useUserStore();
const userList = ref<User[]>([]);
const isLoading = ref(false);
// 新增：搜索关键词（沿用你的命名风格）
const searchKey = ref('');

// 新增：筛选后的用户列表（基于搜索关键词）
const filteredUsers = computed(() => {
  if (!searchKey.value) return userList.value;
  const key = searchKey.value.trim().toLowerCase();
  return userList.value.filter(user =>
      user.username?.toLowerCase().includes(key)
  );
});

// 原有生命周期（不变）
onMounted(async () => {
  isLoading.value = true;
  userList.value = await userStore.getAllUserList();
  isLoading.value = false;
});

// 原有方法（完全不变）
const handleStatus = async (userId: number, status: 'normal' | 'forbidden') => {
  const newStatus = status === 'normal' ? 'forbidden' : 'normal';
  if (confirm(`确定要${newStatus === 'forbidden' ? '封禁' : '解封'}该用户吗？`)) {
    const res = await userStore.toggleUserStatus(userId, newStatus);
    if (res === '操作成功') {
      userList.value = await userStore.getAllUserList();
    }
  }
};

const handleVip = async (userId: number, type: 'normal' | 'vip' | 'admin') => {
  if (type === 'admin') return;
  const newType = type === 'normal' ? 'vip' : 'normal';
  if (confirm(`确定要${newType === 'vip' ? '开通VIP' : '取消VIP'}吗？`)) {
    const res = await userStore.toggleUserVip(userId, newType);
    if (res === '操作成功') {
      userList.value = await userStore.getAllUserList();
    }
  }
};
</script>

<style scoped>
/* 原有样式（新增搜索框样式，不影响原有样式） */
.user-manage { width: 90%; margin: 20px auto; }
table { width: 100%; border-collapse: collapse; }
th, td { padding: 8px; border: 1px solid #eee; text-align: center; }
.tag { padding: 2px 6px; border-radius: 4px; color: #fff; font-size: 12px; }
.tag.normal { background: #52c41a; }
.tag.vip { background: #faad14; }
.tag.admin { background: #1890ff; }
.tag.forbidden { background: #f5222d; }
button { margin: 0 4px; padding: 4px 8px; border: none; border-radius: 4px; cursor: pointer; }
button:disabled { background: #ccc; cursor: not-allowed; }

/* 新增：搜索框样式（匹配你的设计风格） */
.search-box {
  margin-bottom: 16px;
}
.search-input {
  width: 300px;
  height: 36px;
  padding: 0 12px;
  border-radius: 4px;
  border: 1px solid #ddd;
  outline: none;
}
</style>