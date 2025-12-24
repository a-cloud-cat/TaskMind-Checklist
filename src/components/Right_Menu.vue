<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'


const props = defineProps<{
  visible: boolean
  x: number
  y: number
}>()

const emit = defineEmits<{
  (e: 'create-textbox'): void
  (e: 'close'): void // 关闭菜单
}>()

function handleDocumentClick() {
  emit('close')
}

function onMountedCallback() {
  document.addEventListener('click', handleDocumentClick)
}

function onUnmountedCallback() {
  document.removeEventListener('click', handleDocumentClick)
}

onMounted(onMountedCallback)
onUnmounted(onUnmountedCallback)

</script>

<template>
  <div class="right-menu" v-if="props.visible"
      :style="{left: props.x + 'px',top: props.y + 'px'}" @click.stop>
    <div class="menu-item" @click="function() { emit('create-textbox') }">新建文本框</div>
  </div>
</template>

<style scoped>
.right-menu {
  position: fixed;
  z-index: 9999;
  width: 240px;
  background: #f9f9f9;
  border-radius: 4px;
}

.menu-item {
  cursor: pointer;
}

</style>