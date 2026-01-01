<template>
  <Navbar />

  <div class="activity-main">
    <div class="left-bar">
      <div class="left-bar-top">
        <!-- 基础功能区 -->
        <div class="task-list-btn">任务列表</div>
        <div class="task-filter">
          <div
              class="filter-item"
              :class="{ active: activeFilter === 'all' }"
              @click="changeFilter('all')"
          >
            全部任务
          </div>
          <div
              class="filter-item"
              :class="{ active: activeFilter === 'todo' }"
              @click="changeFilter('todo')"
          >
            待办
          </div>
          <div
              class="filter-item"
              :class="{ active: activeFilter === 'doing' }"
              @click="changeFilter('doing')"
          >
            进行中
          </div>
          <div
              class="filter-item"
              :class="{ active: activeFilter === 'done' }"
              @click="changeFilter('done')"
          >
            已完成
          </div>
        </div>

        <!-- VIP功能区（新增回收站按钮） -->
        <div class="task-list-btn">VIP功能</div>
        <div class="task-filter">
          <button class="flowchart-btn filter-item" @click="switchToFlowChart">
            <span class="left_bar-font">流程图</span>
          </button>
          <!-- 新增：回收站按钮 -->
          <button class="recycle-bin-btn filter-item" @click="switchToRecycleBin">
            <span class="left_bar-font">回收站</span>
          </button>
        </div>
      </div>
    </div>

    <div class="right-content">
      <FlowChart v-if="activePage === 'flowchart'" />
      <TaskList
          v-if="activePage === 'taskList'"
          :active-filter="activeFilter"
          @open-new-task-modal="openNewTaskModal"
      />
      <!-- 新增：回收站页面渲染 -->
      <RecycleBin v-if="activePage === 'recycleBin'" />
    </div>

    <NewTaskModal
        v-if="showNewTaskModal"
        @close="closeNewTaskModal"
        @save-task="saveNewTask"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import FlowChart from '../leftBarActivity/FlowChart.vue'
import TaskList from '../task/TaskList.vue'
import NewTaskModal from '../task/NewTaskModal.vue'
// 新增：导入回收站组件
import RecycleBin from '../views/RecycleBin.vue'
import { useTaskStore } from '../store/taskStore'

// 新增：activePage添加'recycleBin'状态
const activePage = ref('flowchart')
const activeFilter = ref('all')
const showNewTaskModal = ref(false)
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTaskList()
})

const switchToFlowChart = () => {
  activePage.value = 'flowchart'
}

// 新增：切换到回收站页面
const switchToRecycleBin = () => {
  activePage.value = 'recycleBin'
}

const changeFilter = (filter: string) => {
  activeFilter.value = filter
  activePage.value = 'taskList'
}

const openNewTaskModal = () => {
  showNewTaskModal.value = true
}

const closeNewTaskModal = () => {
  showNewTaskModal.value = false
}

const saveNewTask = (newTask: any) => {
  taskStore.addTask(newTask)
  showNewTaskModal.value = false
}
</script>

<style scoped>
.activity-main {
  display: flex;
  height: calc(100vh - 56px);
}

.left-bar {
  width: 220px;
  background-color: #2b2b2b;
  color: #fff;
  padding: 20px 0;
}

.task-list-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: default;
  margin: 10px 0;
  border-radius: 4px;
  background-color: #3b3b3b;
  border: none;
  color: #fff;
}

.left_bar-font {
  font-size: 14px;
}

.task-filter {
  margin: 20px 10px;
}

.filter-item {
  padding: 8px 10px;
  cursor: pointer;
  border-radius: 4px;
  margin: 5px 0;
  transition: all 0.2s ease;
  border: none;
  background-color: transparent;
  color: #fff;
  width: 100%;
  text-align: left;
  font-size: 14px;
}

.filter-item.active {
  background-color: #00ff88;
  color: #000;
}

.filter-item:hover:not(.active) {
  background-color: #3b3b3b;
}

.flowchart-btn, .recycle-bin-btn {
  width: 100%;
  height: auto;
  line-height: normal;
  text-align: left;
  background-color: transparent;
  padding: 8px 10px;
  margin: 5px 0;
}

.right-content {
  flex: 1;
  padding: 20px;
  background-color: #000;
  overflow: auto;
}
</style>