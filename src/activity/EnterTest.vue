<script setup lang="ts">
import axios from 'axios'
import router from '../router/index.ts'

let username = ''
let password = ''

async function submitForm() {
  const checkbox = document.getElementById('agreement') as HTMLInputElement;
  if (!checkbox.checked) {
    alert('请同意用户协议');
    return;
  }

  if (!username.trim() || !password.trim()) {
    alert('请输入完整的用户名和密码');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/user/login', {
      username,
      password
    });
    const result = response.data;
    alert(result);
    if (result === '登录成功') {
      router.push('/ActivityMain');
    }
  } catch (error) {
    alert('登录失败，请检查账号密码或网络！');
  }
}

async function handleRegister() {
  if (!username.trim() || !password.trim()) {
    alert('请输入完整的用户名和密码');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/user/register', {
      username,
      password
    });
    alert(response.data);
  } catch (error) {
    alert('注册失败，请检查网络或用户名是否已存在！');
  }
}
</script>

<template>
  <Navbar />
  <div class="root-container">
    <div class="blank-box"></div>
    <div class="login-box">
      <h2 class="login-title">登录</h2>

      <input
          type="text"
          placeholder="请输入用户名"
          class="input-item"
          v-model="username"
      >
      <input
          type="password"
          placeholder="请输入密码"
          class="input-item"
          v-model="password"
      >
      <div class="register-tip">
        No account? <span class="sign-in" @click.prevent="handleRegister">Sign in</span>
      </div>
      <button class="next-btn" @click="submitForm">Next</button>
      <div class="agreement-wrap">
        <input type="checkbox" id="agreement" class="checkbox">
        <label for="agreement" class="agreement-text">
          我已阅读并同意
          <router-link to="/PrivacyPolicy_UserAgreement" class="link">用户协议</router-link>
          和
          <router-link to="/PrivacyPolicy_UserAgreement" class="link">隐私政策</router-link>
        </label>
      </div>
    </div>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.root-container {
  position: relative;
  width: 100vw;
  min-height: calc(100vh - 56px);
  background: linear-gradient(180deg, #9999ff 0%, #ffff99 100%);
  overflow: hidden;
}

.login-box {
  position: absolute;
  top: 50%;
  left: 75%;
  transform: translate(-50%, -50%);
  width: 380px;
  height: 700px;
  display: flex;
  flex-direction: column;
  gap: 18px;
  background-color: #f0f8ff;
  padding: 24px 20px;
  border-radius: 20px;
  z-index: 2;
}

.login-title {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
  font-size: 24px;
}

.blank-box {
  position: absolute;
  top: 50%;
  left: 60%;
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 600px;
  background-color: rgba(255, 255, 255, 0.85);
  border-radius: 16px;
  z-index: 1;
}

.input-item {
  height: 48px;
  padding: 0 16px;
  border: 1px solid #e8e8e8;
  border-radius: 12px;
  background-color: #ffffff;
  font-size: 14px;
  outline: none;
}

.input-item::placeholder {
  color: #cccccc;
}

.register-tip {
  text-align: center;
  font-size: 12px;
  color: #888888;
}

.sign-in {
  color: #ff3366;
  font-weight: 600;
  cursor: pointer;
}

.next-btn {
  height: 50px;
  border: none;
  border-radius: 12px;
  background: linear-gradient(90deg, #ff00cc 0%, #00ccff 100%);
  color: #ffffff;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
}

.agreement-wrap {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 10px;
  color: #999999;
}

.checkbox {
  width: 12px;
  height: 12px;
  accent-color: #ff00cc;
}

.link {
  color: #0099ff;
  text-decoration: none;
}
</style>