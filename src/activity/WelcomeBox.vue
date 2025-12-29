<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, ref } from 'vue'

const router = useRouter()
const isLoaded = ref(false)

function entertest() {
  router.push('/next')
}

onMounted(() => {
  setTimeout(() => {
    isLoaded.value = true
  }, 300)
})
</script>

<template>
  <Navbar />

  <div class="container">
    <section class="hero-section">
      <div class="hero-content">
        <h1 class="main-title">
          智能规划<span class="highlight">无限</span>，
          <br>执行协作<span class="highlight">无间</span>
        </h1>
        <p class="main-desc">智能规划助手，让每一步都清晰高效<br>从想法到执行，全程为你保驾护航</p>
      </div>
    </section>

    <section class="features-section">
      <h2 class="section-title">核心能力</h2>
      <div class="features-grid">
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3>智能分析</h3>
          <p>多维度拆解规划目标，清晰梳理执行逻辑</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">📱</div>
          <h3>多端同步</h3>
          <p>随时随地查看和调整你的计划，无缝衔接工作流</p>
        </div>
        <div class="feature-card">
          <div class="feature-icon">🔄</div>
          <h3>动态调整</h3>
          <p>灵活调整规划节点，适配执行过程中的变化</p>
        </div>
      </div>
    </section>

    <section class="scenarios-section">
      <h2 class="section-title">适用场景</h2>
      <div class="scenario-list">
        <div class="scenario-item">项目管理规划</div>
        <div class="scenario-item">个人目标追踪</div>
        <div class="scenario-item">团队协作安排</div>
        <div class="scenario-item">长期计划拆解</div>
      </div>
    </section>
  </div>
</template>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Inter", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.container {
  min-height: calc(100vh - 60px);
  padding: 2rem 5vw;
  background-color: #000000;
}

.hero-section {
  padding: 8rem 0 6rem;
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto;
}

.main-title {
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  color: #ffffff;
  margin-bottom: 1.8rem;
  line-height: 1.1;
  font-weight: 700;
}

.highlight {
  color: #00ff88;
}

.main-desc {
  font-size: 1.2rem;
  color: #999999;
  line-height: 1.6;
}

.features-section {
  padding: 4rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.section-title {
  font-size: 2rem;
  color: #ffffff;
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
}

.section-title::after {
  content: '';
  width: 50px;
  height: 2px;
  background: #00ff88;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: #111111;
  padding: 2.5rem 2rem;
  border-radius: 8px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.feature-card:hover {
  border-color: #00ff88;
  transform: translateY(-4px);
}

.feature-icon {
  font-size: 2.2rem;
  color: #00ff88;
  margin-bottom: 1.2rem;
}

.feature-card h3 {
  color: #ffffff;
  margin-bottom: 0.8rem;
  font-size: 1.3rem;
}

.feature-card p {
  color: #999999;
  line-height: 1.5;
  font-size: 0.95rem;
}

.scenarios-section {
  padding: 4rem 0 8rem;
  max-width: 1000px;
  margin: 0 auto;
}

.scenario-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-top: 2rem;
}

.scenario-item {
  background: #111111;
  padding: 0.8rem 1.8rem;
  border-radius: 4px;
  color: #ffffff;
  font-size: 1rem;
  border: 1px solid #222222;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 5rem 0 4rem;
  }

  .main-title {
    font-size: clamp(2rem, 5vw, 3rem);
  }

  .features-grid {
    grid-template-columns: 1fr;
  }
}
</style>