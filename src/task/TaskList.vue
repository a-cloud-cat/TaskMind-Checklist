<template>
  <div class="task-list-container">
    <div class="task-toolbar">
      <input
          type="text"
          placeholder="搜索内容..."
          class="task-search"
          v-model="searchKey"
      >
      <button class="filter-btn" @click="sortByPriority" v-if="props.activeFilter !== 'memo'">
        按优先级排序
      </button>
      <button class="filter-btn" @click="sortByDueDate" v-if="props.activeFilter !== 'memo'">
        按截止日期排序
      </button>
      <button class="filter-btn" @click="resetSort">重置排序</button>
    </div>

    <div class="done-tip" v-if="props.activeFilter === 'done'">
      ⚠️ 已完成内容将在3天后自动移入回收站
    </div>

    <div class="task-cards">
      <div class="empty-tip" v-if="filteredTasks.length === 0">
        暂无{{ props.activeFilter === 'memo' ? '备忘录' : props.activeFilter === 'doing' ? '进行中任务' : '已完成内容' }}，点击右下角「+」添加吧～
      </div>

      <div
          class="task-card"
          v-for="task in filteredTasks"
          :key="task.id"
          @click="openTaskDetail(task)"
      >
        <div class="task-status" :class="task.status"></div>
        <h3 class="task-title">{{ task.title }}</h3>
        <p class="task-desc" v-if="task.desc">{{ task.desc }}</p>
        <div class="task-meta">
          <span class="priority" :class="task.priority" v-if="task.type === 'task'">
            {{ task.priority === 'high' ? '高优先级' : task.priority === 'medium' ? '中优先级' : '低优先级' }}
          </span>
          <span class="due-date" v-if="task.type === 'task'">截止：{{ task.dueDate }}</span>
          <span class="type-tag" :class="task.type">
            {{ task.type === 'memo' ? '备忘录' : '任务' }}
          </span>
          <button class="task-op-btn" @click.stop="editTask(task)">✏️</button>
          <button
              class="task-op-btn done-btn"
              @click.stop="markAsDone(task.id)"
              v-if="task.status !== 'done'"
          >✓</button>
          <button class="task-op-btn" @click.stop="deleteTask(task.id)">🗑️</button>
        </div>
      </div>
    </div>

    <button class="fab-add-task" @click="handleAddTask">+</button>

    <div class="detail-modal" v-if="activeTask">
      <div class="detail-content">
        <div class="detail-header">
          <h3>内容详情</h3>
          <button class="close-btn" @click="closeTaskDetail">×</button>
        </div>
        <div class="detail-body">
          <h4>{{ activeTask.title }}</h4>
          <p class="detail-desc">{{ activeTask.desc || '无描述内容' }}</p>
          <div class="detail-meta">
            <span v-if="activeTask.type === 'task'">
              优先级：{{ activeTask.priority === 'high' ? '高' : activeTask.priority === 'medium' ? '中' : '低' }}
            </span>
            <span v-if="activeTask.type === 'task'">截止日期：{{ activeTask.dueDate }}</span>
            <span>状态：{{ activeTask.status === 'memo' ? '备忘录' : activeTask.status === 'doing' ? '进行中' : '已完成' }}</span>
            <span>类型：{{ activeTask.type === 'memo' ? '备忘录' : '任务' }}</span>
          </div>
        </div>
        <div class="detail-footer">
          <button class="btn" @click="closeTaskDetail">关闭</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useTaskStore } from '../store/taskStore'
import type { Task } from '../store/taskStore'

const props = defineProps({
  activeFilter: {
    type: String,
    default: 'memo'
  }
})

const emit = defineEmits(['open-new-task-modal', 'open-edit-task-modal'])

const taskStore = useTaskStore()
const searchKey = ref('')
const activeTask = ref<Task | null>(null)

onMounted(() => {
  taskStore.fetchTaskList()
})

const filteredTasks = computed(() => {
  let tasks = [...taskStore.taskList]

  if (props.activeFilter !== 'all') {
    tasks = tasks.filter(task => task.status === props.activeFilter)
  }

  if (searchKey.value) {
    const lowerKey = searchKey.value.trim().toLowerCase()
    tasks = tasks.filter(task =>
        task.title.toLowerCase().includes(lowerKey) ||
        (task.desc && task.desc.toLowerCase().includes(lowerKey))
    )
  }

  return tasks
})

const openTaskDetail = (task: Task) => {
  activeTask.value = task
}

const closeTaskDetail = () => {
  activeTask.value = null
}

const handleAddTask = () => {
  emit('open-new-task-modal')
}

const sortByPriority = () => {
  taskStore.sortTasks('priority')
}

const sortByDueDate = () => {
  taskStore.sortTasks('dueDate')
}

const resetSort = () => {
  taskStore.resetSort()
}

const markAsDone = (taskId: string | number) => {
  taskStore.toggleTaskStatus(taskId, true)
}

const deleteTask = (taskId: string | number) => {
  if (confirm('确定删除这个内容吗？（可在回收站恢复）')) {
    taskStore.deleteTask(taskId)
  }
}

const editTask = (task: Task) => {
  emit('open-edit-task-modal', task)
  closeTaskDetail()
}
</script>

<style scoped>
.detail-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}
.detail-content {
  background-color: #2b2b2b;
  border-radius: 8px;
  width: 90%;
  max-width: 500px;
  padding: 24px;
  color: #fff;
}
.detail-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3b3b3b;
}
.detail-header h3 {
  margin: 0;
}
.close-btn {
  background: transparent;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
}
.close-btn:hover {
  color: #fff;
}
.detail-body h4 {
  font-size: 18px;
  margin: 0 0 12px 0;
}
.detail-desc {
  color: #ccc;
  line-height: 1.6;
  margin: 0 0 16px 0;
}
.detail-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  font-size: 14px;
  color: #999;
}
.detail-footer {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.done-btn {
  color: #00ff88;
  font-weight: bold;
}
.done-btn:hover {
  color: #00e078;
}

.task-list-container {
  width: 100%;
  height: 100%;
  color: #fff;
  position: relative;
  padding: 20px;
  box-sizing: border-box;
}
.task-toolbar {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  align-items: center;
  flex-wrap: wrap;
}
.task-search {
  flex: 1;
  min-width: 200px;
  height: 36px;
  padding: 0 12px;
  border-radius: 18px;
  border: 1px solid #3b3b3b;
  background-color: #1b1b1b;
  color: #fff;
  outline: none;
  font-size: 14px;
}
.filter-btn {
  padding: 8px 16px;
  border-radius: 4px;
  background-color: #3b3b3b;
  color: #fff;
  border: none;
  cursor: pointer;
  transition: background-color 0.2s ease;
  font-size: 14px;
}
.filter-btn:hover {
  background-color: #4b4b4b;
}
.done-tip {
  color: #ffaa00;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  padding: 8px;
  background-color: rgba(255, 170, 0, 0.1);
  border-radius: 4px;
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
.task-status.memo { background-color: #999; }
.task-status.doing { background-color: #0099ff; }
.task-status.done { background-color: #00ff88; }
.task-title {
  font-size: 18px;
  margin-bottom: 8px;
  margin-top: 0;
}
.task-desc {
  font-size: 14px;
  color: #999;
  margin-bottom: 10px;
  margin-top: 0;
  line-height: 1.5;
}
.task-meta {
  display: flex;
  gap: 10px;
  align-items: center;
  font-size: 12px;
  flex-wrap: wrap;
}
.priority {
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
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
  transition: color 0.2s ease;
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
.btn {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
  background-color: #3b3b3b;
  color: #fff;
}
.btn:hover {
  background-color: #4b4b4b;
}
</style>