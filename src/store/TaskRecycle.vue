<template>
  <div class="recycle-container">
    <!-- 回收站头部 -->
    <div class="recycle-header">
      <h2>任务回收站</h2>
      <button class="empty-btn" @click="handleEmptyRecycle" :disabled="!deletedTasks.length">
        清空回收站
      </button>
    </div>

    <!-- 空状态提示 -->
    <div class="recycle-empty" v-if="deletedTasks.length === 0">
      回收站空空如也～
    </div>

    <!-- 回收站任务列表 -->
    <div class="recycle-list" v-else>
      <div class="recycle-item" :class="`type-${task.type}`" v-for="task in deletedTasks" :key="task.id">
        <div class="task-info">
          <h3>{{ task.title }}</h3>
          <p class="delete-time">删除时间：{{ formatDeleteTime(task.deleteTime) }}</p>
          <p class="task-meta">
            <span class="priority" :class="task.priority" v-if="task.type === 'task'">
              {{ task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级' }}
            </span>
            <span v-if="task.type === 'task'">截止：{{ task.dueDate }}</span>
            <span class="status-tag" :class="task.status">
              {{ task.status === 'memo' ? '备忘录' : task.status === 'doing' ? '进行中' : '已完成' }}
            </span>
          </p>
        </div>
        <div class="task-actions">
          <button class="restore-btn" @click="handleRestore(task.id)">恢复</button>
          <button class="permanent-btn" @click="handlePermanentDelete(task.id)">彻底删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from './taskStore.ts'
import type { DeletedTask } from './taskStore.ts'

const taskStore = useTaskStore()
const deletedTasks = taskStore.deletedTasks as DeletedTask[]

// 格式化删除时间
const formatDeleteTime = (time: string) => {
  return new Date(time).toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// 恢复任务
const handleRestore = (taskId: string | number) => {
  if (confirm('确定恢复该内容吗？')) {
    taskStore.restoreTask(taskId)
  }
}

// 彻底删除任务
const handlePermanentDelete = (taskId: string | number) => {
  if (confirm('确定彻底删除该内容吗？此操作不可恢复！')) {
    taskStore.deleteTaskPermanently(taskId)
  }
}

// 清空回收站
const handleEmptyRecycle = () => {
  if (confirm('确定清空回收站吗？所有内容将被彻底删除！')) {
    taskStore.emptyRecycleBin()
  }
}
</script>

<style scoped>
.recycle-container {
  width: 100%;
  max-width: 1000px;
  margin: 20px auto;
  padding: 20px;
  color: #fff;
  background-color: #1b1b1b;
  min-height: calc(100vh - 40px);
  border-radius: 8px;
  box-sizing: border-box;
}

/* 头部样式 */
.recycle-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3b3b3b;
}

.recycle-header h2 {
  margin: 0;
  font-size: 18px;
}

/* 清空按钮 */
.empty-btn {
  padding: 8px 16px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.empty-btn:disabled {
  background-color: #555;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 空状态 */
.recycle-empty {
  text-align: center;
  padding: 50px 0;
  color: #999;
  font-size: 16px;
}

/* 任务列表 */
.recycle-list {
  display: grid;
  gap: 15px;
}

/* 任务项 - 确保所有类选择器被使用 */
.recycle-item {
  background-color: #2b2b2b;
  padding: 16px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  border-left: 4px solid transparent;
}


.task-info {
  flex: 1;
}

.task-info h3 {
  margin: 0 0 8px 0;
  font-size: 16px;
}

.delete-time {
  font-size: 12px;
  color: #999;
  margin: 0 0 8px 0;
}

.task-meta {
  display: flex;
  gap: 10px;
  font-size: 12px;
  flex-wrap: wrap;
}

/* 优先级样式 */
.priority {
  padding: 2px 8px;
  border-radius: 12px;
  color: #fff;
}

/* 状态标签 */
.status-tag {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

/* 操作按钮 */
.task-actions {
  display: flex;
  gap: 10px;
  align-items: center;
}

.restore-btn {
  padding: 6px 12px;
  background-color: #0099ff;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.permanent-btn {
  padding: 6px 12px;
  background-color: #ff4444;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}
</style>