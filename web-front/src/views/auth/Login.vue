<template>
  <div class="login-container">
    <div class="login-box">
      <el-card class="login-card">
        <template #header>
          <div class="login-header">
            <h2>TodoList</h2>
            <p>欢迎回来</p>
          </div>
        </template>
        
        <el-form
          ref="formRef"
          :model="formData"
          :rules="rules"
          label-position="top"
          @submit.prevent="handleSubmit"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input
              v-model="formData.email"
              placeholder="请输入邮箱"
              type="email"
              autocomplete="email"
            >
              <template #prefix>
                <el-icon><Message /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <el-form-item label="密码" prop="password">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              type="password"
              autocomplete="current-password"
              show-password
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>

          <div class="form-footer">
            <el-button type="primary" native-type="submit" :loading="loading" class="submit-btn">
              登录
            </el-button>
            <div class="form-links">
              <router-link to="/register" class="register-link">
                没有账号？立即注册
              </router-link>
            </div>
          </div>
        </el-form>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import type { FormInstance } from 'element-plus'
import { authApi } from '@/api/modules/auth'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const formData = reactive({
  email: '',
  password: ''
})

const rules = {
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    loading.value = true

    await userStore.login(formData)
    ElMessage.success('登录成功')

    const redirect = route.query.redirect as string
    router.push(redirect || '/')
  } catch (error: any) {
    console.error('登录错误:', error)
    if (error.response?.data?.message) {
      ElMessage.error(error.response.data.message)
    } else if (error.message) {
      ElMessage.error(error.message)
    } else {
      ElMessage.error('登录失败，请稍后重试')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, #e6f3ff 0%, #bad6f3 100%);
}

.login-box {
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
}

.login-header {
  text-align: center;
  padding: 0 0 20px;
}

.login-header h2 {
  margin: 0;
  font-size: 28px;
  color: #303133;
  font-weight: 500;
}

.login-header p {
  margin: 10px 0 0;
  font-size: 16px;
  color: #909399;
}

.form-footer {
  margin-top: 24px;
}

.submit-btn {
  width: 100%;
  padding: 12px 20px;
  font-size: 16px;
  height: 45px;
}

.form-links {
  margin-top: 16px;
  text-align: center;
}

.register-link {
  color: #409eff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s ease;
}

.register-link:hover {
  color: #66b1ff;
  text-decoration: underline;
}

:deep(.el-input__wrapper) {
  padding-left: 0;
}

:deep(.el-input__prefix) {
  padding: 0 8px;
}

:deep(.el-form-item__label) {
  padding-bottom: 8px;
}

:deep(.el-card__header) {
  padding: 20px;
  border-bottom: 1px solid #ebeef5;
}

:deep(.el-card__body) {
  padding: 30px 20px;
}

:deep(.el-form-item:last-child) {
  margin-bottom: 0;
}
</style> 