<template>
  <div class="todo-list">
    <div class="header">
      <h2>待办事项列表</h2>
      <button @click="$router.push('/todos/create')" class="create-btn">
        新建待办
      </button>
    </div>
    
    <div class="filters">
      <select v-model="filters.category" class="filter-select">
        <option value="">全部分类</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
      
      <select v-model="filters.status" class="filter-select">
        <option value="">全部状态</option>
        <option value="pending">待处理</option>
        <option value="in_progress">进行中</option>
        <option value="completed">已完成</option>
      </select>
      
      <select v-model="filters.priority" class="filter-select">
        <option value="">全部优先级</option>
        <option value="high">高</option>
        <option value="medium">中</option>
        <option value="low">低</option>
      </select>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="todos.length === 0" class="empty">
      暂无待办事项
    </div>
    
    <div v-else class="todos">
      <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <div class="todo-content">
          <h3>{{ todo.title }}</h3>
          <p>{{ todo.description }}</p>
          <div class="todo-meta">
            <span class="category" :style="{ backgroundColor: getCategoryColor(todo.category_id) }">
              {{ getCategoryName(todo.category_id) }}
            </span>
            <span class="priority" :class="todo.priority">{{ todo.priority }}</span>
            <span class="status" :class="todo.status">{{ getStatusText(todo.status) }}</span>
          </div>
        </div>
        <div class="todo-actions">
          <button @click="editTodo(todo)" class="edit-btn">编辑</button>
          <button @click="deleteTodo(todo.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { request } from '@/api/request'

const router = useRouter()
const todos = ref([])
const categories = ref([])
const loading = ref(true)

const filters = ref({
  category: '',
  status: '',
  priority: ''
})

const fetchTodos = async () => {
  try {
    loading.value = true
    const response = await request.get('/todos')
    todos.value = response.data
  } catch (error) {
    console.error('获取待办事项失败:', error)
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const response = await request.get('/categories')
    categories.value = response.data
  } catch (error) {
    console.error('获取分类失败:', error)
  }
}

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.name : '未分类'
}

const getCategoryColor = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId)
  return category ? category.color : '#999'
}

const getStatusText = (status) => {
  const statusMap = {
    'pending': '待处理',
    'in_progress': '进行中',
    'completed': '已完成'
  }
  return statusMap[status] || status
}

const editTodo = (todo) => {
  router.push(`/todos/${todo.id}/edit`)
}

const deleteTodo = async (id) => {
  if (!confirm('确定要删除这个待办事项吗？')) return
  
  try {
    await axios.delete(`/api/todos/${id}`)
    await fetchTodos()
  } catch (error) {
    console.error('删除待办事项失败:', error)
  }
}

onMounted(() => {
  fetchTodos()
  fetchCategories()
})
</script>

<style scoped>
.todo-list {
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.create-btn {
  padding: 8px 16px;
  background-color: #1890ff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.filter-select {
  padding: 8px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  min-width: 120px;
}

.loading, .empty {
  text-align: center;
  padding: 48px;
  color: #999;
}

.todos {
  display: grid;
  gap: 16px;
}

.todo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.todo-content {
  flex: 1;
}

.todo-content h3 {
  margin: 0 0 8px;
  color: #333;
}

.todo-content p {
  margin: 0 0 12px;
  color: #666;
}

.todo-meta {
  display: flex;
  gap: 12px;
}

.category {
  padding: 2px 8px;
  border-radius: 12px;
  color: white;
  font-size: 12px;
}

.priority {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.priority.high {
  background-color: #ff4d4f;
  color: white;
}

.priority.medium {
  background-color: #faad14;
  color: white;
}

.priority.low {
  background-color: #52c41a;
  color: white;
}

.status {
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 12px;
}

.status.pending {
  background-color: #d9d9d9;
  color: #666;
}

.status.in_progress {
  background-color: #1890ff;
  color: white;
}

.status.completed {
  background-color: #52c41a;
  color: white;
}

.todo-actions {
  display: flex;
  gap: 8px;
}

.edit-btn, .delete-btn {
  padding: 4px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  background: white;
  cursor: pointer;
}

.edit-btn:hover {
  color: #1890ff;
  border-color: #1890ff;
}

.delete-btn:hover {
  color: #ff4d4f;
  border-color: #ff4d4f;
}
</style> 