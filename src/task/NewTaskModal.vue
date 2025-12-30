<template>
  <div class="modal-mask" @click="handleMaskClick">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3>新建个人任务</h3>
        <button class="close-btn" @click="emit('close')">×</button>
      </div>

      <div class="modal-body">
        <!-- 任务标题 -->
        <div class="form-item">
          <label class="form-label">任务标题 <span class="required">*</span></label>
          <input
              type="text"
              v-model="newTask.title"
              placeholder="请输入任务标题"
              class="form-input"
              maxlength="50"
          >
        </div>

        <!-- 任务描述 -->
        <div class="form-item">
          <label class="form-label">任务描述</label>
          <textarea
              v-model="newTask.desc"
              placeholder="请输入任务描述（可选）"
              class="form-textarea"
              rows="3"
              maxlength="200"
          ></textarea>
        </div>

        <!-- 优先级 -->
        <div class="form-item">
          <label class="form-label">优先级 <span class="required">*</span></label>
          <select v-model="newTask.priority" class="form-select">
            <option value="high">高（紧急重要）</option>
            <option value="medium" selected>中（常规）</option>
            <option value="low">低（可延后）</option>
          </select>
        </div>

        <!-- 截止日期 -->
        <div class="form-item">
          <label class="form-label">截止日期 <span class="required">*</span></label>
          <input
              type="date"
              v-model="newTask.dueDate"
              class="form-input"
              min="2024-01-01"
          >
        </div>
      </div>

      <div class="modal-footer">
        <button class="btn cancel-btn" @click="emit('close')">取消</button>
        <button class="btn save-btn" @click="handleSave">保存任务</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits(['close', 'save-task'])

// 初始化新任务数据
const newTask = ref({
  id: '',
  title: '',
  desc: '',
  priority: 'medium' as 'high' | 'medium' | 'low',
  dueDate: '',
  status: 'todo' as 'todo'
})

// 点击遮罩层关闭弹窗
const handleMaskClick = () => {
  emit('close')
}

// 保存新任务
const handleSave = () => {
  // 表单验证
  if (!newTask.value.title.trim()) {
    alert('请输入任务标题！')
    return
  }
  if (!newTask.value.dueDate) {
    alert('请选择截止日期！')
    return
  }

  // 生成唯一ID
  newTask.value.id = Date.now() + '-' + Math.random().toString(36).substr(2, 9)
  // 触发保存事件
  emit('save-task', { ...newTask.value })
  // 重置表单
  newTask.value = {
    id: '',
    title: '',
    desc: '',
    priority: 'medium',
    dueDate: '',
    status: 'todo'
  }
}
</script>

<style scoped>
.modal-mask {
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
.modal-content {
  width: 450px;
  background-color: #2b2b2b;
  border-radius: 8px;
  padding: 24px;
  color: #fff;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
}
.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #3b3b3b;
}
.modal-header h3 {
  margin: 0;
  font-size: 18px;
}
.close-btn {
  background: transparent;
  border: none;
  color: #999;
  font-size: 20px;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.close-btn:hover {
  color: #fff;
  background-color: #3b3b3b;
  border-radius: 50%;
}
.form-item {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  margin-bottom: 6px;
  font-size: 14px;
  color: #ccc;
}
.required {
  color: #ff4444;
}
.form-input, .form-select, .form-textarea {
  width: 100%;
  padding: 8px 12px;
  border-radius: 4px;
  border: 1px solid #3b3b3b;
  background-color: #1b1b1b;
  color: #fff;
  outline: none;
  font-size: 14px;
  box-sizing: border-box;
}
.form-input:focus, .form-select:focus, .form-textarea:focus {
  border-color: #00ff88;
}
.form-textarea {
  resize: none;
  line-height: 1.5;
}
.modal-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
}
.btn {
  padding: 8px 20px;
  border-radius: 4px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.2s ease;
}
.cancel-btn {
  background-color: #3b3b3b;
  color: #fff;
}
.cancel-btn:hover {
  background-color: #4b4b4b;
}
.save-btn {
  background-color: #00ff88;
  color: #000;
  font-weight: 500;
}
.save-btn:hover {
  background-color: #00e078;
}
</style>