<script setup lang="ts">
import { ref } from 'vue'

const titleValue = ref('')
const inputValue = ref('')

function handleInput(e: Event) {
  inputValue.value = (e.target as HTMLInputElement).value
}
</script>

<template>
  <div class="textbox-container">
    <input type="text" class="textbox-title"
      placeholder="标题（请填写）"
      v-model="titleValue"
    />
    <input type="text" class="textbox"
      placeholder="输入文本..."
      :value="inputValue" @input="handleInput"
    />

    <div class="textbox-point" style="top: 50%; right: -6px; transform: translateY(-50%);"></div>
    <div class="textbox-point" style="top: 50%; left: -6px; transform: translateY(-50%);"></div>
  </div>
</template>

<style scoped>
.textbox-container{
  width: 200px;
  height: 200px;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.textbox-title {
  width: 100%;
  height: 45px;
  background: #00dbde;
  border: 1px solid #fc00ff; /* 显式设置边框，覆盖浏览器默认样式 */
  border-bottom: none; /* 去掉下边框，避免和正文框边框重叠 */
  border-radius: 8px 8px 0 0 ;
  font-size: 14px;
  text-align: center;
  margin: 0;
  box-sizing: border-box;
}
.textbox {
  width: 100%;
  flex: 1;
  background: #fff;
  border: 1px solid #fc00ff; /* 显式设置边框，和标题框一致 */
  border-top: none; /* 去掉上边框，避免和标题框边框重叠 */
  border-radius: 0 0 8px 8px ;
  font-size: 14px;
  margin: 0;
  box-sizing: border-box;
}
.textbox-point{
  position: absolute;
  top: -6px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #00dbde;
  z-index: 10;
}
.textbox:focus {
  border-color: #d800e0;
}
</style>