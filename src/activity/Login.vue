<template>
  <Navbar />
  <div class="root-container">
    <!-- 空白区域（替换为图片） -->
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
        没有账号？<router-link to="/register" class="sign-in">立即注册</router-link>
      </div>
      <button class="next-btn" @click="submitForm">Next</button>
      <div class="agreement-wrap">
        <input type="checkbox" id="agreement" class="checkbox" v-model="isAgree">
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

<script setup lang="ts">
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import { useUserStore } from '../store/user'

const username = ref('')
const password = ref('')
const isAgree = ref(false)
const router = useRouter()
const userStore = useUserStore()

async function submitForm() {
  if (!isAgree.value) {
    alert('请同意用户协议');
    return;
  }
  if (!username.value.trim() || !password.value.trim()) {
    alert('请输入完整的用户名和密码');
    return;
  }

  try {
    const response = await axios.post('http://localhost:8080/api/user/login', {
      username: username.value,
      password: password.value
    });
    const { code, data, message } = response.data;

    if (code === 200) {
      alert(message || '登录成功');
      const userInfo = {
        username: data.username,
        user_type: data.user_type,
        id: data.id,
        status: data.status
      };
      userStore.login(userInfo);

      if (userInfo.user_type === 'admin') {
        router.push('/AdminPage');
      } else {
        router.push('/ActivityMain');
      }

      username.value = '';
      password.value = '';
      isAgree.value = false;
    } else {
      alert(message || '登录失败');
    }
  } catch (error) {
    console.error('登录请求异常：', error);
    alert('登录失败，请检查后端服务是否启动！');
  }
}
</script>

<style scoped>
.register-tip {
  text-align: center;
  font-size: 12px;
  color: #888888;
  margin-bottom: 20px;
}
.sign-in {
  color: #ff3366;
  font-weight: 600;
  text-decoration: none;
}
.sign-in:hover {
  text-decoration: underline;
}
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
  z-index: 0;
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
/* 核心修改：left从60%改为55%（左移），可根据需要调更小（如50%/45%） */
.blank-box {
  position: absolute;
  top: 50%;
  left: 55%; /* 关键：减小left值实现左移，数值越小越靠左 */
  transform: translate(-50%, -50%);
  width: 1000px;
  height: 600px;
  background-image: url('./../assets/enterPicture.png');
  background-size: 100% 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #ff000033; /* 兜底色：路径错时显示半透红，调试完可删除 */
  border-radius: 16px;
  z-index: 1;
  display: block;
  opacity: 1;
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