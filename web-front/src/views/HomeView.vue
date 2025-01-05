<template>
  <div class="home-container">
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>待办事项</span>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value">{{ stats.total || 0 }}</div>
            <div class="stat-detail">
              <span>已完成: {{ stats.completed || 0 }}</span>
              <span>进行中: {{ stats.pending || 0 }}</span>
            </div>
          </div>
        </el-card>
      </el-col>
      
      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>分类</span>
            </div>
          </template>
          <div class="stat-content">
            <div class="stat-value">{{ stats.categories || 0 }}</div>
            <div class="stat-detail">
              <span>最多任务: {{ stats.mostUsedCategory || '-' }}</span>
            </div>
          </div>
        </el-card>
      </el-col>

      <el-col :span="8">
        <el-card shadow="hover" class="stat-card">
          <template #header>
            <div class="card-header">
              <span>快速操作</span>
            </div>
          </template>
          <div class="quick-actions">
            <el-button type="primary" @click="router.push('/todos/create')">
              创建待办
            </el-button>
            <el-button type="success" @click="router.push('/categories')">
              创建分类
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const stats = ref({
  total: 0,
  completed: 0,
  pending: 0,
  categories: 0,
  mostUsedCategory: ''
})

// 这里可以添加获取统计数据的逻辑
</script>

<style scoped>
.home-container {
  height: 100%;
}

.stat-card {
  height: 100%;
}

.stat-content {
  padding: 20px 0;
  text-align: center;
}

.stat-value {
  font-size: 36px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 20px;
}

.stat-detail {
  display: flex;
  justify-content: space-around;
  color: #909399;
  font-size: 14px;
}

.quick-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
  padding: 20px 0;
}

:deep(.el-card__header) {
  padding: 15px 20px;
  border-bottom: 1px solid #ebeef5;
  font-weight: bold;
}
</style>
