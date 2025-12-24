<script setup lang="ts">

</script>

<template>
  <!-- 外层大容器：让两本书水平并排且居中 -->
  <div class="books-wrapper">
    <!-- 第一本书：用户协议 -->
    <div class="book-container">
      <div class="book">
        <div class="agreement-content">
          <h1>【XX平台】用户服务协议</h1>
          <p>本协议是您（以下称“用户”）与XX平台（以下称“平台”）之间关于使用平台服务的约定，请您仔细阅读。</p>

          <h2>一、服务条款</h2>
          <p>1. 您需年满16周岁（或在监护人陪同下），方可注册并使用本平台服务；</p>
          <p>2. 平台为您提供信息展示、互动交流等基础服务，具体服务内容以平台实际提供为准。</p>

          <h2>二、用户的权利与义务</h2>
          <p>1. 您有权通过注册账号，合法使用平台的各项功能；</p>
          <p>2. 您需保证注册时提供的信息真实、准确，若信息变更应及时更新；</p>
          <p>3. 您不得利用平台传播违法、低俗、侵权等违规内容，不得恶意干扰平台运行。</p>

          <h2>三、平台的权利与义务</h2>
          <p>1. 平台有权对违规内容、违规账号进行管理（包括但不限于删除内容、暂停账号）；</p>
          <p>2. 平台将尽力保障服务的稳定运行，但不承诺服务无中断；</p>
          <p>3. 平台会对您的账号信息进行合理保护，不会随意泄露（法律法规要求除外）。</p>

          <h2>四、协议的变更与终止</h2>
          <p>1. 平台可根据业务调整修改本协议，修改后会通过平台公告告知您；</p>
          <p>2. 若您违反本协议，平台有权终止为您提供服务。</p>

          <h2>五、其他</h2>
          <p>本协议自您注册账号之日起生效，最终解释权归XX平台所有。</p>
        </div>
        <div class="cover agreement-cover">
          <p>用户协议</p>
          <span class="tip">hover 翻开</span>
        </div>
      </div>
    </div>

    <!-- 第二本书：隐私政策 -->
    <div class="book-container">
      <div class="book">
        <div class="policy-content">
          <h1>【XX平台】隐私政策</h1>
          <p>本隐私政策旨在告知您XX平台（以下称“平台”）如何收集、使用、存储和保护您的个人信息，请您仔细阅读并理解。</p>

          <h2>一、信息收集范围</h2>
          <p>1. 注册信息：您注册账号时提供的手机号、用户名、密码等基础信息；</p>
          <p>2. 使用信息：包括您的浏览记录、互动操作、设备型号、登录IP地址等使用行为数据；</p>
          <p>3. 授权信息：经您同意后，可能收集您的位置信息、相册权限等（您可随时在设置中关闭）。</p>

          <h2>二、信息使用目的</h2>
          <p>1. 为您提供基础服务：包括账号登录、功能使用、服务适配等；</p>
          <p>2. 优化服务体验：根据您的使用习惯，改善平台功能和内容推荐；</p>
          <p>3. 安全保障：用于账号安全验证、防范违规行为、保护平台和用户合法权益。</p>

          <h2>三、信息保护措施</h2>
          <p>1. 平台采用加密技术、访问权限控制等安全措施，保护您的信息不被泄露、篡改；</p>
          <p>2. 仅授权工作人员在必要范围内访问您的信息，且需遵守保密义务；</p>
          <p>3. 若发生信息安全事件，平台将及时采取补救措施并告知您。</p>

          <h2>四、信息共享规则</h2>
          <p>1. 不会向第三方出售、出租您的个人信息；</p>
          <p>2. 经您同意或法律法规要求的情况下，可能向第三方提供必要信息；</p>
          <p>3. 向合作方共享信息时，会要求其遵守保密义务并采取安全保护措施。</p>

          <h2>五、用户权利与管理</h2>
          <p>1. 您有权查询、修改、删除您的个人信息（部分必要信息除外）；</p>
          <p>2. 您可在账号设置中调整授权权限，或申请注销账号（注销后将删除相关信息）；</p>
          <p>3. 若对信息处理有疑问，可通过平台客服渠道联系咨询。</p>

          <h2>六、政策变更与生效</h2>
          <p>1. 平台可根据业务调整更新本政策，更新后将通过平台公告告知您；</p>
          <p>2. 您继续使用平台服务，即视为同意变更后的隐私政策；</p>
          <p>3. 本政策自您注册账号之日起生效。</p>
        </div>
        <div class="cover policy-cover">
          <p>隐私政策</p>
          <span class="tip">hover 翻开</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 外层大容器：水平排列两本书，整体居中 */
.books-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 60px; /* 两本书之间的间距 */
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 30px;
  flex-wrap: wrap; /* 响应式：小屏幕自动换行 */
}

/* 单本书容器：保持居中 */
.book-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 书本主体：统一大尺寸，优化3D质感 */
.book {
  position: relative;
  border-radius: 14px;
  width: 380px; /* 统一宽度 */
  height: 580px; /* 统一高度 */
  background-color: #fafafa;
  -webkit-box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  box-shadow: 4px 4px 20px rgba(0, 0, 0, 0.25);
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 3500px;
  perspective: 3500px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #333;
}

/* 通用书皮样式 */
.cover {
  top: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 14px;
  cursor: pointer;
  -webkit-transition: all 0.7s ease-in-out;
  transition: all 0.7s ease-in-out;
  -webkit-transform-origin: 0;
  -ms-transform-origin: 0;
  transform-origin: 0;
  -webkit-box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.35), 4px 4px 20px rgba(0, 0, 0, 0.35);
  box-shadow: inset 0 0 25px rgba(0, 0, 0, 0.35), 4px 4px 20px rgba(0, 0, 0, 0.35);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: #fff;
}

/* 翻页效果：统一角度，适配大书本 */
.book:hover .cover {
  -webkit-transform: rotatey(-105deg);
  -ms-transform: rotatey(-105deg);
  transform: rotatey(-105deg);
}

/* 书皮文字：统一样式 */
.cover p {
  font-size: 32px;
  font-weight: bold;
  margin: 0;
  letter-spacing: 2px;
}

.cover .tip {
  font-size: 16px;
  margin-top: 20px;
  opacity: 0.85;
  letter-spacing: 1px;
}

/* 区分两本书的书皮颜色 */
.agreement-cover {
  background: linear-gradient(135deg, #666, #333); /* 用户协议：深灰色渐变 */
}

.policy-cover {
  background: linear-gradient(135deg, #2c539e, #1b365d); /* 隐私政策：蓝色渐变 */
}

/* 用户协议内容样式 */
.agreement-content {
  width: 93%;
  height: 91%;
  overflow-y: auto;
  padding: 25px 18px;
  font-size: 15px;
  line-height: 1.9;
  text-align: justify;
}

.agreement-content h1 {
  font-size: 22px;
  text-align: center;
  margin: 0 0 30px 0;
  color: #222;
  font-weight: bold;
}

.agreement-content h2 {
  font-size: 17px;
  margin: 25px 0 12px 0;
  color: #333;
  font-weight: 600;
}

.agreement-content p {
  font-size: 15px;
  font-weight: normal;
  margin: 9px 0;
  color: #444;
}

/* 隐私政策内容样式 */
.policy-content {
  width: 93%;
  height: 91%;
  overflow-y: auto;
  padding: 25px 18px;
  font-size: 15px;
  line-height: 1.9;
  text-align: justify;
}

.policy-content h1 {
  font-size: 22px;
  text-align: center;
  margin: 0 0 30px 0;
  color: #222;
  font-weight: bold;
}

.policy-content h2 {
  font-size: 17px;
  margin: 25px 0 12px 0;
  color: #333;
  font-weight: 600;
}

.policy-content p {
  font-size: 15px;
  font-weight: normal;
  margin: 9px 0;
  color: #444;
}

/* 滚动条优化：统一样式 */
.agreement-content::-webkit-scrollbar,
.policy-content::-webkit-scrollbar {
  width: 5px;
}

.agreement-content::-webkit-scrollbar-track,
.policy-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.agreement-content::-webkit-scrollbar-thumb,
.policy-content::-webkit-scrollbar-thumb {
  background-color: #bbb;
  border-radius: 3px;
}

.agreement-content::-webkit-scrollbar-thumb:hover,
.policy-content::-webkit-scrollbar-thumb:hover {
  background-color: #888;
}

/* 响应式适配：小屏幕（如手机）自动换行 */
@media (max-width: 900px) {
  .books-wrapper {
    gap: 30px;
    padding: 20px;
  }

  .book {
    width: 320px;
    height: 520px;
  }

  .cover p {
    font-size: 28px;
  }

  .agreement-content h1,
  .policy-content h1 {
    font-size: 20px;
  }
}
</style>