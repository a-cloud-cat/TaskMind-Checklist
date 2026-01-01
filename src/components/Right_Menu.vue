<script setup lang="ts">
import { defineProps, defineEmits, onMounted, onUnmounted } from 'vue'

const props = defineProps<{
  visible: boolean
  x: number
  y: number
}>()

const emit = defineEmits<{
  (e: 'create-textbox'): void
  (e: 'close'): void
}>()

const handleDocumentClick = () => {
  emit('close')
}

onMounted(() => {
  document.addEventListener('click', handleDocumentClick)
})

onUnmounted(() => {
  document.removeEventListener('click', handleDocumentClick)
})
</script>

<template>
  <div
      class="right-menu"
      v-if="visible"
      :style="{ left: `${x}px`, top: `${y}px` }"
      @click.stop
  >
    <div class="menu-item" @click="emit('create-textbox')">新建文本框</div>
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