<template>
  <div class="todo-form">
    <h2>{{ isEdit ? '编辑待办' : '新建待办' }}</h2>
    
    <form @submit.prevent="saveTodo" class="form">
      <div class="form-item">
        <label>标题</label>
        <input v-model="form.title" type="text" required placeholder="请输入待办事项标题">
      </div>
      
      <div class="form-item">
        <label>描述</label>
        <textarea v-model="form.description" rows="4" placeholder="请输入待办事项描述"></textarea>
      </div>
      
      <div class="form-item">
        <label>分类</label>
        <select v-model="form.category_id" required>
          <option value="">请选择分类</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="form-item">
        <label>优先级</label>
        <select v-model="form.priority" required>
          <option value="">请选择优先级</option>
          <option value="high">高</option>
          <option value="medium">中</option>
          <option value="low">低</option>
        </select>
      </div>
      
      <div class="form-item">
        <label>状态</label>
        <select v-model="form.status" required>
          <option value="">请选择状态</option>
          <option value="pending">待处理</option>
          <option value="in_progress">进行中</option>
          <option value="completed">已完成</option>
        </select>
      </div>
      
      <div class="form-actions">
        <button type="button" @click="$router.back()" class="cancel-btn">取消</button>
        <button type="submit" class="submit-btn">保存</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axios from '@/axios'

const route = useRoute()
const router = useRouter()
const categories = ref([])

const isEdit = computed(() => route.params.id)

const form = ref({
  title: '',
  description: '',
  category_id: '',
  priority: '',
  status: 'pending'
})

const fetchCategories = async () => {
  try {
    const response = await axios.get('/api/categories')
    categories.value = response.data
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

const fetchTodo = async (id) => {
  try {
    const response = await axios.get(`/api/todos/${id}`)
    form.value = response.data
  } catch (error) {
    console.error('获取待办事项失败:', error)
  }
}

const saveTodo = async () => {
  try {
    if (isEdit.value) {
      await axios.put(`/api/todos/${route.params.id}`, form.value)
    } else {
      await axios.post('/api/todos', form.value)
    }
    router.push('/todos')
  } catch (error) {
    console.error('保存待办事项失败:', error)
  }
}

onMounted(async () => {
  await fetchCategories()
  if (isEdit.value) {
    await fetchTodo(route.params.id)
  }
})
</script>

<style scoped>
.todo-form {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form {
  display: grid;
  gap: 24px;
}

.form-item {
  display: grid;
  gap: 8px;
}

.form-item label {
  color: #666;
  font-size: 14px;
}

.form-item input,
.form-item select,
.form-item textarea {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-item textarea {
  resize: vertical;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
}

.cancel-btn,
.submit-btn {
  padding: 8px 24px;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  border: 1px solid #d9d9d9;
  background: white;
  color: #666;
}

.submit-btn {
  border: none;
  background: #1890ff;
  color: white;
}

.cancel-btn:hover {
  border-color: #40a9ff;
  color: #40a9ff;
}

.submit-btn:hover {
  background: #40a9ff;
}
</style> 