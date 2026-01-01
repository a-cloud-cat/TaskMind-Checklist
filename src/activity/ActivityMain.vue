<template>
  <Navbar />

  <div class="activity-main">
    <div class="left-bar">
      <div class="left-bar-top">
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
              :class="{ active: activeFilter === 'memo' }"
              @click="changeFilter('memo')"
          >
            备忘录
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

        <div class="task-list-btn">VIP功能</div>
        <div class="task-filter">
          <button class="flowchart-btn filter-item" @click="handleFlowChartClick">
            <span class="left_bar-font">流程图</span>
          </button>
          <button class="recycle-bin-btn filter-item" @click="handleRecycleBinClick">
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
      <RecycleBin v-if="activePage === 'recycle'" />
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
import RecycleBin from '../leftBarActivity/RecycleBin.vue'
import { useTaskStore } from '../store/taskStore'
import { useUserStore } from '../store/userStore'

const activePage = ref('flowchart')
const activeFilter = ref('all')
const showNewTaskModal = ref(false)
const taskStore = useTaskStore()
const userStore = useUserStore()

onMounted(() => {
  userStore.initUserInfo()
  taskStore.fetchTaskList()
})

// 修复：增加默认值，防止isVip为undefined
const handleFlowChartClick = () => {
  const isVip = userStore.userInfo?.isVip ?? false
  if (isVip) {
    activePage.value = 'flowchart'
  } else {
    alert('你不是VIP会员，无法使用该功能！')
  }
}

const handleRecycleBinClick = () => {
  const isVip = userStore.userInfo?.isVip ?? false
  if (isVip) {
    activePage.value = 'recycle'
  } else {
    alert('你不是VIP会员，无法使用该功能！')
  }
}

// 其他原有方法
const changeFilter = (filter: string) => {
  activeFilter.value = filter
  activePage.value = 'taskList'
}
const openNewTaskModal = () => { showNewTaskModal.value = true }
const closeNewTaskModal = () => { showNewTaskModal.value = false }
const saveNewTask = (newTask: any) => {
  newTask.status = newTask.type === 'memo' ? 'memo' : 'doing'
  taskStore.addTask(newTask)
  activeFilter.value = newTask.type === 'memo' ? 'memo' : 'doing'
  activePage.value = 'taskList'
  showNewTaskModal.value = false
}
</script>

<style scoped>
/* 原有样式不变 */
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