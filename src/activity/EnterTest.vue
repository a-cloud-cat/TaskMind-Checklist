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

  <div class="login-container">
    <div class="input-group">
      <div class="input-item">
        <input type="text" placeholder="请输入用户名" class="input-field" v-model="username">
      </div>
      <div class="input-item">
        <input type="password" placeholder="请输入密码" class="input-field" v-model="password">
      </div>
    </div>

    <div class="account-link">
      No account?
      <a href="#" class="signin-link" @click.prevent="handleRegister">Sign in</a>
    </div>

    <button class="next-btn" @click="submitForm">Next</button>

    <div class="agreement">
      <input type="checkbox" id="agreement" class="checkbox">
      <label for="agreement" class="agreement-text">
        我已阅读并同意
        <router-link to="/PrivacyPolicy_UserAgreement" class="agreement-link">用户协议</router-link>
        和
        <router-link to="/PrivacyPolicy_UserAgreement" class="agreement-link">隐私政策</router-link>
      </label>
    </div>
  </div>
</template>


<style scoped>

.login-container {
  background-color: aliceblue;
  width: 25vw;
  border-radius: 1.5rem;
  margin: 40vh auto 0;
  display: flex;
  flex-direction: column;
  gap: 2vh;
}

.input-group {
  margin-top: 4vh;
  display: flex;
  flex-direction: column;
  gap: 1.5vh;
}

.input-item {
  width: 100%;
}

.input-field {
  width: 100%;
  height: 6vh;
  padding: 0 1vw;
  border: 1px solid #ddd;
  border-radius: 0.5rem;
  background-color: #fff;
  color: #333;
  font-size: 1rem;
  box-sizing: border-box;
}

.input-field:focus {
  outline: none;
  border-color: #fc00ff;
}

.account-link {
  text-align: center;
  margin-top: 1vh;
}

.signin-link {
  color: #fc00ff;
  font-weight: 600;
  cursor: pointer;
}

.next-btn {
  width: 100%;
  height: 7vh;
  background: linear-gradient(90deg, #fc00ff, #00dbde);
  border: none;
  border-radius: 0.5rem;
  color: #fff;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
}

.agreement {
  display: flex;
  align-items: center;
  gap: 0.5vw;
  margin-top: 2vh;
  font-size: 0.85rem;
  color: #666;
}

.checkbox {
  width: 1.2rem;
  height: 1.2rem;
  accent-color: #fc00ff;
}

.agreement-link {
  color: #00dbde;
}
</style>