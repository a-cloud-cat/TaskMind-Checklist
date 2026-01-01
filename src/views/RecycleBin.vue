<template>
  <div class="recycle-bin-container">
    <div class="recycle-bin-header">
      <h2>回收站</h2>
      <button class="empty-btn" @click="emptyRecycleBin">清空回收站</button>
    </div>

    <!-- 无删除任务时显示 -->
    <div class="empty-tip" v-if="deletedTasks.length === 0">
      回收站为空，暂无已删除任务
    </div>

    <!-- 已删除任务列表 -->
    <div class="recycle-task-list" v-else>
      <div class="task-item" v-for="task in deletedTasks" :key="task.id">
        <div class="task-info">
          <h3 class="task-title">{{ task.title }}</h3>
          <p class="task-status">状态：{{ getStatusText(task.status) }}</p>
          <p class="delete-time">删除时间：{{ formatDeleteTime(task.deleteTime) }}</p>
        </div>
        <div class="task-actions">
          <button class="restore-btn" @click="restoreTask(task.id)">恢复</button>
          <button class="delete-permanent-btn" @click="deleteTaskPermanently(task.id)">彻底删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useTaskStore } from '../store/taskStore'

const taskStore = useTaskStore()

// 获取回收站任务
const deletedTasks = computed(() => taskStore.deletedTasks)

// 状态文本映射
const getStatusText = (status: string) => {
  const statusMap = {
    todo: '待办',
    doing: '进行中',
    done: '已完成'
  }
  return statusMap[status as keyof typeof statusMap] || status
}

// 格式化删除时间（简单处理，实际可根据需求优化）
const formatDeleteTime = (deleteTime: string | number | Date) => {
  return new Date(deleteTime).toLocaleString()
}

// 恢复任务
const restoreTask = (taskId: string | number) => {
  taskStore.restoreTask(taskId)
}

// 彻底删除任务
const deleteTaskPermanently = (taskId: string | number) => {
  if (confirm('确定要彻底删除该任务吗？此操作不可恢复！')) {
    taskStore.deleteTaskPermanently(taskId)
  }
}

// 清空回收站
const emptyRecycleBin = () => {
  if (confirm('确定要清空回收站吗？所有已删除任务将永久消失！')) {
    taskStore.emptyRecycleBin()
  }
}
</script>

<style scoped>
.recycle-bin-container {
  width: 100%;
  color: #fff;
}

.recycle-bin-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3b3b3b;
}

.empty-btn {
  padding: 6px 12px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.empty-btn:hover {
  background-color: #ff6666;
}

.empty-tip {
  text-align: center;
  padding: 50px 0;
  color: #999;
  font-size: 16px;
}

.recycle-task-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.task-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #2b2b2b;
  border-radius: 8px;
  transition: background-color 0.2s;
}

.task-item:hover {
  background-color: #3b3b3b;
}

.task-info {
  flex: 1;
}

.task-title {
  margin: 0 0 8px 0;
  font-size: 18px;
  color: #00ff88;
}

.task-status, .delete-time {
  margin: 4px 0;
  color: #999;
  font-size: 14px;
}

.task-actions {
  display: flex;
  gap: 10px;
}

.restore-btn {
  padding: 6px 12px;
  background-color: #00cc66;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.restore-btn:hover {
  background-color: #00ff88;
}

.delete-permanent-btn {
  padding: 6px 12px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.delete-permanent-btn:hover {
  background-color: #ff6666;
}
</style>