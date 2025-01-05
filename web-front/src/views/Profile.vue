<template>
  <div class="profile">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <h3>个人信息</h3>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.prevent="handleSubmit"
      >
        <el-form-item label="用户名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>

        <el-form-item label="邮箱">
          <el-input v-model="form.email" disabled />
        </el-form-item>

        <el-form-item label="新密码" prop="password">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="不修改请留空"
            show-password
          />
        </el-form-item>

        <el-form-item
          label="确认密码"
          prop="password_confirmation"
          v-if="form.password"
        >
          <el-input
            v-model="form.password_confirmation"
            type="password"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" native-type="submit" :loading="loading">
            保存修改
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import type { FormInstance } from 'element-plus'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  name: userStore.userInfo?.name || '',
  email: userStore.userInfo?.email || '',
  password: '',
  password_confirmation: ''
})

const validatePass2 = (rule: any, value: string, callback: any) => {
  if (form.password && !value) {
    callback(new Error('请再次输入密码'))
  } else if (value !== form.password) {
    callback(new Error('两次输入密码不一致'))
  } else {
    callback()
  }
}

const rules = {
  name: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 2, message: '用户名长度不能小于2位', trigger: 'blur' }
  ],
  password: [
    { min: 6, message: '密码长度不能小于6位', trigger: 'blur' }
  ],
  password_confirmation: [
    { validator: validatePass2, trigger: 'blur' }
  ]
}

const handleSubmit = async () => {
  if (!formRef.value) return
  
  try {
    await formRef.value.validate()
    loading.value = true
    
    // TODO: 调用更新个人信息的 API
    
    ElMessage.success('更新成功')
  } catch (error: any) {
    if (error !== 'cancel') {
      ElMessage.error(error.message || '更新失败')
    }
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.profile {
  padding: 20px;
}

.profile-card {
  max-width: 600px;
  margin: 0 auto;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h3 {
  margin: 0;
}
</style> 