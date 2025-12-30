<template>
  <div class="task-list-container">
    <div class="task-toolbar">
      <input type="text" placeholder="搜索任务..." class="task-search" v-model="searchKey">
      <button class="filter-btn" @click="sortByPriority">按优先级排序</button>
      <button class="filter-btn" @click="sortByDueDate">按截止日期排序</button>
    </div>

    <div class="task-cards">
      <div class="empty-tip" v-if="filteredTasks.length === 0">
        暂无任务，点击右下角「+」添加吧～
      </div>

      <div class="task-card" v-for="task in filteredTasks" :key="task.id" @click="handleTaskClick">
        <div class="task-status" :class="task.status"></div>
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-desc" v-if="task.desc">{{ task.desc }}</p>
        <div class="task-meta">
          <span class="priority" :class="task.priority">
            {{ task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级' }}
          </span>
          <span class="due-date">截止：{{ task.dueDate }}</span>
          <button class="task-op-btn" @click.stop="editTask(task)">✏️</button>
          <button class="task-op-btn" @click.stop="deleteTask(task.id)">🗑️</button>
        </div>
      </div>
    </div>

    <button class="fab-add-task" @click="handleAddTask">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useTaskStore } from '../store/taskStore'

const props = defineProps({
  activeFilter: {
    type: String,
    default: 'all'
  }
})

const emit = defineEmits(['open-new-task-modal'])

const taskStore = useTaskStore()
const searchKey = ref('')

const filteredTasks = computed(() => {
  let tasks = [...taskStore.taskList]
  if (props.activeFilter !== 'all') {
    tasks = tasks.filter(task => task.status === props.activeFilter)
  }
  if (searchKey.value) {
    const key = searchKey.value.trim().toLowerCase()
    tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(key) || task.desc.toLowerCase().includes(key)
    )
  }
  return tasks
})

const handleTaskClick = () => {
  emit('open-new-task-modal')
}

const handleAddTask = () => {
  emit('open-new-task-modal')
}

const toggleTaskStatus = (taskId: string) => {
  taskStore.toggleTaskStatus(taskId)
}

const sortByPriority = () => {
  taskStore.sortTasks('priority')
}

const sortByDueDate = () => {
  taskStore.sortTasks('dueDate')
}

const deleteTask = (taskId: string) => {
  if (confirm('确定删除这个任务吗？')) {
    taskStore.deleteTask(taskId)
  }
}

const editTask = (task: any) => {
  console.log('编辑任务：', task)
  emit('open-new-task-modal')
}
</script>

<style scoped>
.task-list-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
}
.task-toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
}
.task-search {
  flex: 1;
  height: 36px;
  padding: 0 12px;
  border-radius: 18px;
  border: 1px solid #3b3b3b;
  background-color: #1b1b1b;
  color: #fff;
  outline: none;
}
.filter-btn {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #3b3b3b;
  color: #fff;
  border: none;
  cursor: pointer;
}
.empty-tip {
  text-align: center;
  color: #999;
  font-size: 16px;
  margin-top: 50px;
}
.task-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
.task-card {
  background-color: #1b1b1b;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #3b3b3b;
  position: relative;
}
.task-card:hover {
  transform: translateY(-5px);
  border-color: #00ff88;
}
.task-status {
  position: absolute;
  top: 20px;
  right: 20px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
}
.task-status.todo { background-color: #999; }
.task-status.doing { background-color: #0099ff; }
.task-status.done { background-color: #00ff88; }
.task-title {
  font-size: 18px;
  margin-bottom: 8px;
}
.task-desc {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
}
.task-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
}
.priority {
  padding: 2px 8px;
  border-radius: 12px;
}
.priority.high { background-color: #ff4444; color: #fff; }
.priority.medium { background-color: #ffaa00; color: #fff; }
.priority.low { background-color: #00ff88; color: #000; }
.due-date {
  color: #999;
  margin-right: auto;
}
.task-op-btn {
  background: transparent;
  border: none;
  color: #999;
  cursor: pointer;
  font-size: 14px;
  margin-left: 5px;
}
.task-op-btn:hover {
  color: #00ff88;
}

.fab-add-task {
  position: fixed;
  right: 30px;
  bottom: 30px;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #00ff88;
  color: #000;
  font-size: 24px;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(0, 255, 136, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  z-index: 100;
}

.fab-add-task:hover {
  transform: scale(1.05);
  background-color: #00e078;
}
</style>