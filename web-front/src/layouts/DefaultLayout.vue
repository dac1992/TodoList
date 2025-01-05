<template>
  <el-container class="layout-container">
    <!-- 侧边栏 -->
    <el-aside :width="isCollapse ? '64px' : '200px'" class="aside">
      <div class="logo">
        <h1>{{ isCollapse ? 'T' : 'TodoList' }}</h1>
      </div>
      <el-menu
        :default-active="route.path"
        class="menu"
        :collapse="isCollapse"
        router
      >
        <el-menu-item index="/">
          <el-icon><House /></el-icon>
          <template #title>首页</template>
        </el-menu-item>
        <el-menu-item index="/todos">
          <el-icon><List /></el-icon>
          <template #title>待办事项</template>
        </el-menu-item>
        <el-menu-item index="/categories">
          <el-icon><Folder /></el-icon>
          <template #title>分类管理</template>
        </el-menu-item>
      </el-menu>
    </el-aside>

    <!-- 主体区域 -->
    <el-container class="main-container">
      <el-header class="header">
        <div class="header-left">
          <el-icon class="toggle-sidebar" @click="toggleSidebar">
            <Expand :class="{ 'is-collapse': isCollapse }" />
          </el-icon>
        </div>
        <div class="header-right">
          <el-dropdown trigger="click">
            <span class="user-profile">
              <el-avatar :size="32" />
              {{ userStore.user?.name }}
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="router.push('/profile')">
                  <el-icon><User /></el-icon>个人中心
                </el-dropdown-item>
                <el-dropdown-item divided @click="handleLogout">
                  <el-icon><SwitchButton /></el-icon>退出登录
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
      </el-header>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<style scoped>
/* 重置基础样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* 根容器样式 */
.layout-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  min-width: 800px; /* 设置最小宽度防止内容挤压 */
}

/* 侧边栏样式 */
.aside {
  height: 100%;
  background-color: #304156;
  transition: width 0.3s;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
}

.logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  background-color: #2b2f3a;
}

.logo h1 {
  color: #fff;
  margin: 0;
  font-size: 20px;
}

/* 主容器样式 */
.main-container {
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

/* 头部样式 */
.header {
  height: 60px;
  background-color: #fff;
  border-bottom: 1px solid #e6e6e6;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  flex-shrink: 0;
}

.header-left, .header-right {
  display: flex;
  align-items: center;
}

.toggle-sidebar {
  font-size: 20px;
  cursor: pointer;
}

.user-profile {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.user-profile .el-avatar {
  margin-right: 8px;
}

/* 主内容区域样式 */
.main {
  flex: 1;
  padding: 20px;
  background-color: #f0f2f5;
  overflow-y: auto;
  height: calc(100vh - 60px);
}

/* Element Plus 样式覆盖 */
:deep(.el-menu) {
  border-right: none;
  flex: 1;
}

:deep(.el-menu-item) {
  padding-left: 20px !important;
}

:deep(.el-menu--collapse .el-menu-item) {
  padding-left: 20px !important;
}

:deep(.el-menu-item.is-active) {
  background-color: #263445;
}

/* 移除所有可能的滚动条 */
::-webkit-scrollbar {
  display: none;
}

/* 确保内容区域的卡片布局正确 */
:deep(.el-row) {
  margin: 0 !important;
}

:deep(.el-col) {
  padding: 10px !important;
}
</style>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { 
  House, 
  List, 
  Folder, 
  User, 
  SwitchButton,
  Expand 
} from '@element-plus/icons-vue'
import { ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const isCollapse = ref(false)

const toggleSidebar = () => {
  isCollapse.value = !isCollapse.value
}

const handleLogout = () => {
  ElMessageBox.confirm('确定要退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    await userStore.logout()
    router.push('/login')
  })
}
</script> 