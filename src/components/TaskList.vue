<template>
  <div class="task-container">
    <h2>任务列表</h2>

    <div class="add-task">
      <input
          v-model="newTaskTitle"
          placeholder="输入新任务标题"
          @keyup.enter="handleAddTask"
      >
      <button @click="handleAddTask">添加任务</button>
    </div>

    <button
        @click="taskStore.requestNotificationPermission"
        v-if="Notification.permission !== 'granted'"
        class="permission-btn"
    >
      开启通知权限
    </button>

    <div class="task-list">
      <div
          v-for="task in taskStore.taskList"
          :key="task.id"
          class="task-item"
          :class="{ completed: task.completed, expired: isExpired(task) }"
      >
        <span>{{ task.title }}</span>
        <span class="due-date">
          截止: {{ formatDate(task.dueDate) }}
        </span>
        <button
            @click="taskStore.markAsCompleted(task.id)"
            :disabled="task.completed"
        >
          {{ task.completed ? '已完成' : '标记完成' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useTaskStore } from '@/store/taskStore';

const taskStore = useTaskStore();
const newTaskTitle = ref('');

taskStore.fetchTaskList();

const handleAddTask = () => {
  if (!newTaskTitle.value.trim()) return;
  taskStore.addTask({ title: newTaskTitle.value.trim() });
  newTaskTitle.value = '';
};

const isExpired = (task: Task) => {
  const now = new Date();
  return new Date(task.dueDate) < now && !task.completed;
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleString();
};

interface Task {
  id: string;
  title: string;
  dueDate: string;
  notified: boolean;
  completed: boolean;
}
</script>

<style scoped>
.task-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 0 20px;
}

.add-task {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

.add-task input {
  flex: 1;
  padding: 8px;
  font-size: 16px;
}

.permission-btn {
  margin: 10px 0;
  padding: 6px 12px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.task-item {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.task-item.completed {
  background: #f0f9f0;
  text-decoration: line-through;
  color: #666;
}

.task-item.expired {
  border-color: #ff4444;
  background: #fff8f8;
}

.due-date {
  color: #666;
  font-size: 14px;
  margin: 0 10px;
}

button {
  padding: 6px 12px;
  cursor: pointer;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
}

button:disabled {
  background: #ccc;
  cursor: not-allowed;
}
</style>