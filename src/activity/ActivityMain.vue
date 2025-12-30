<template>
  <Navbar />

  <div class="activity-main">
    <div class="left-bar">
      <div class="left-bar-top">
        <div class="task-list-btn" @click="switchToTaskList">任务列表</div>

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
      </div>

      <div class="left-bar-bottom">
        <button class="flowchart-btn" @click="switchToFlowChart">
          <span class="left_bar-font">流程图</span>
        </button>
      </div>
    </div>

    <div class="right-content">
      <FlowChart v-if="activePage === 'flowchart'" />

      <TaskList
          v-if="activePage === 'taskList'"
          :active-filter="activeFilter"
          @open-new-task-modal="openNewTaskModal"
      />
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
import { useTaskStore } from '../store/taskStore'

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

const switchToTaskList = () => {
  activePage.value = 'taskList'
}

const changeFilter = (filter: string) => {
  activeFilter.value = filter
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
.task-list-btn, .flowchart-btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  cursor: pointer;
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
}
.filter-item.active {
  background-color: #00ff88;
  color: #000;
}
.filter-item:hover:not(.active) {
  background-color: #3b3b3b;
}

.right-content {
  flex: 1;
  padding: 20px;
  background-color: #000;
  overflow: auto;
}
</style>