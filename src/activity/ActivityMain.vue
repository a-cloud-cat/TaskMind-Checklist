<script setup lang="ts">
import { ref } from 'vue'
import FlowChart from '../leftBarActivity/FlowChart.vue'

const isLeftBarCollapsed = ref<boolean>(false)
const activePage = ref<string>('default')

function goTOFlowChart(){
  activePage.value = 'flowchart'
}
function toggleLeftBarActivity(){
  isLeftBarCollapsed.value = !isLeftBarCollapsed.value
}
</script>

<template>
  <div class="all-container">
    <div class="navigation-bar" :style="{width:isLeftBarCollapsed ? '100vw' :'80vw' ,marginLeft:isLeftBarCollapsed ? '0' :'20vw'}">
      <button
          class="toggle-left-bar-btn-2" v-if="isLeftBarCollapsed"
          @click="toggleLeftBarActivity">
        →
      </button>
    </div>

    <div class="left-bar-group" :style="{ width: isLeftBarCollapsed ? '0' : '20vw' }">
      <button
          class="toggle-left-bar-btn-1" v-if="!isLeftBarCollapsed"
          @click="toggleLeftBarActivity">
        ←
      </button>
      <div class="left-bar-top"></div>
      <div class="left-bar-bottom">

        <button class="flowchart-btn" @click="goTOFlowChart()">
         <span class="left_bar-font">流程图</span>
        </button>
      </div>
    </div>

    <div class="right-content" >
      <FlowChart v-if="activePage === 'flowchart'" />
    </div>

  </div>
</template>

<style scoped>
.all-container {
  display: flex;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
.navigation-bar{
  width: 80vw;
  height: 10vh;
  background-color: #666666;
  position: absolute;
  margin-left: 20vw;
  z-index: 3;
}

.left-bar-group{
  background: #f5f7fa;
  z-index: 4;
  width: 20vw;
  height: 100vh;
  position: relative;
  overflow: hidden
}
.left-bar-top{
  overflow: hidden;
  z-index: 2;
  width: 20vw;
  height: 60vh;
  border-radius: 1.5rem;
}
.left-bar-bottom{
  z-index: 2;
  width: 20vw;
  height: 40vh;
  position: relative;
  display: flex;
  justify-content: center;
}

.right-content {
  flex: 1;
  height: 80svh;
  margin: 10vh 10vw 10vh 10vw;
  overflow-y: auto;
}
.flowchart-btn {
  width: 18vw;
  height: 5vh;
  background-color: aquamarine;
  margin-top: 1vh;
}
.left_bar-font{
  font-size: large;
  margin: 0;
}

.toggle-left-bar-btn-1 {
  position: absolute;
  top: 1rem;
  left: calc(20vw - 30px); /* 右侧贴边 */
  background: #fff; /* 新增：白色背景，更显眼 */
  border: 1px solid #eee; /* 新增：边框 */
  border-radius: 4px; /* 新增：圆角 */
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 新增：阴影 */
  transition: all 0.2s ease; /* 新增：平滑过渡 */
}

/* 导航栏按钮（收缩时显示）：调整到导航栏左侧居中 */
.toggle-left-bar-btn-2 {
  position: absolute;
  top: 50%; /* 垂直居中 */
  left: 1rem; /* 导航栏最左侧 */
  transform: translateY(-50%); /* 垂直居中修正 */
  background: #fff; /* 新增：白色背景 */
  border: 1px solid #eee; /* 新增：边框 */
  border-radius: 4px; /* 新增：圆角 */
  cursor: pointer;
  color: #666;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1); /* 新增：阴影 */
  transition: all 0.2s ease; /* 新增：平滑过渡 */
}

.flowchart-btn:hover {
  transform: scale(1.02);
}

.left-bar-bottom::before {
  content: '';
  position: absolute;
  top: 0;
  left: 1rem;
  right: 1rem;
  height: 1px;
  background-color: #1a1a1a;
}


</style>