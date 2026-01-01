<template>
  <div class="register-container">
    <div class="register-box">
      <h2 class="register-title">用户注册</h2>
      <div class="input-group">
        <label class="input-label">用户名</label>
        <input
            type="text"
            class="input-item"
            v-model="username"
            placeholder="请输入用户名"
        >
      </div>
      <div class="input-group">
        <label class="input-label">密码</label>
        <input
            type="password"
            class="input-item"
            v-model="password"
            placeholder="请输入密码"
        >
      </div>
      <div class="input-group">
        <label class="input-label">确认密码</label>
        <input
            type="password"
            class="input-item"
            v-model="confirmPwd"
            placeholder="请再次输入密码"
        >
      </div>
      <button class="register-btn" @click="handleRegister" :disabled="loading">
        {{ loading ? '注册中...' : '立即注册' }}
      </button>
      <div class="login-link">
        已有账号？<router-link to="/login">立即登录</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const username = ref('')
const password = ref('')
const confirmPwd = ref('')
const loading = ref(false)
const router = useRouter()

const handleRegister = async () => {
  if (!username.value.trim()) {
    alert('请输入用户名！')
    return
  }
  if (!password.value.trim()) {
    alert('请输入密码！')
    return
  }
  if (password.value.length < 6) {
    alert('密码长度不能少于6位！')
    return
  }
  if (password.value !== confirmPwd.value) {
    alert('两次输入的密码不一致！')
    return
  }

  try {
    loading.value = true
    const response = await axios.post('http://localhost:8080/api/user/register', {
      username: username.value.trim(),
      password: password.value.trim(),
      user_type: 'normal',
      status: 'normal'
    })

    const { code, message } = response.data
    if (code === 200) {
      alert('注册成功！请前往登录')
      router.push('/login')
    } else {
      alert(`注册失败：${message}`)
    }
  } catch (error) {
    console.error('注册请求异常：', error)
    alert('注册失败，请检查后端服务是否启动！')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.register-container {
  width: 100vw;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(180deg, #9999ff 0%, #ffff99 100%);
}

.register-box {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.register-title {
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
}

.input-group {
  margin-bottom: 20px;
}

.input-label {
  display: block;
  margin-bottom: 8px;
  color: #666;
  font-size: 14px;
}

.input-item {
  width: 100%;
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}

.input-item:focus {
  border-color: #9999ff;
}

.register-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(90deg, #ff00cc 0%, #00ccff 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity 0.2s;
}

.register-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.login-link {
  text-align: center;
  margin-top: 20px;
  font-size: 14px;
  color: #666;
}

.login-link a {
  color: #00ccff;
  text-decoration: none;
}

.login-link a:hover {
  text-decoration: underline;
}
</style>