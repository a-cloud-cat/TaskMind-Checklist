<!-- FlowChart.vue -->
<script setup lang="ts">
import { ref } from 'vue'
import TextBoxFlowChart from '../components/TextBox_FlowChart.vue'
import RightMenu from '../components/Right_Menu.vue'

const textboxRenderList = ref<Array <{ id: string; x: number; y: number }> >([])

const menuState = ref({
  visible: false,
  viewportX: 0,
  viewportY: 0,
  containerX: 0,
  containerY: 0
})

function handleContainerRightClick(e: MouseEvent) {
  e.preventDefault()
  const containerRect = (e.target as HTMLElement).getBoundingClientRect()

  menuState.value = {
    visible: true,
    viewportX: e.clientX,
    viewportY: e.clientY,
    containerX: e.clientX - containerRect.left,
    containerY: e.clientY - containerRect.top
  }
}

function handleCreateTextBox() {
  textboxRenderList.value.push({
    id: `textbox-${Date.now()}`,
    x: menuState.value.containerX,
    y: menuState.value.containerY
  })
  menuState.value.visible = false
}

function handleMenuClose() {
  menuState.value.visible = false
}
</script>

<template>
  <div class="flowchart-container" @contextmenu="handleContainerRightClick">
    <TextBoxFlowChart
        v-for="item in textboxRenderList"
        :key="item.id"
        :style="{
        position: 'absolute',
        left: item.x + 'px',
        top: item.y + 'px',
        transform: 'translate(-50%, -50%)'
      }"
    />

    <RightMenu
        :visible="menuState.visible"
        :x="menuState.viewportX"
        :y="menuState.viewportY"
        @create-textbox="handleCreateTextBox"
        @close="handleMenuClose"
    />
  </div>
</template>

<style scoped>
.flowchart-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: auto;
  background-color: #2c2c2c; /* 深色底，让格子线更清晰 */
  background-image:
    /* 横向格子线 */
      linear-gradient(to bottom, rgba(200, 200, 200, 0.1) 1px, transparent 1px),
        /* 纵向格子线 */
      linear-gradient(to right, rgba(200, 200, 200, 0.1) 1px, transparent 1px);
  background-size: 30px 30px; /* 格子大小：30px×30px（可调整） */
}
</style>