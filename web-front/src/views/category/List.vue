<template>
  <div class="category-list">
    <div class="header">
      <h2>分类管理</h2>
      <button @click="showCreateForm = true" class="create-btn">
        新建分类
      </button>
    </div>

    <div v-if="loading" class="loading">
      加载中...
    </div>
    
    <div v-else-if="categories.length === 0" class="empty">
      暂无分类
    </div>
    
    <div v-else class="categories">
      <div v-for="category in categories" :key="category.id" class="category-item">
        <div class="category-info">
          <div class="color-block" :style="{ backgroundColor: category.color }"></div>
          <span class="name">{{ category.name }}</span>
        </div>
        <div class="category-actions">
          <button @click="editCategory(category)" class="edit-btn">编辑</button>
          <button @click="deleteCategory(category.id)" class="delete-btn">删除</button>
        </div>
      </div>
    </div>

    <!-- 创建/编辑分类的弹窗 -->
    <div v-if="showCreateForm || editingCategory" class="modal">
      <div class="modal-content">
        <h3>{{ editingCategory ? '编辑分类' : '新建分类' }}</h3>
        <form @submit.prevent="saveCategory" class="form">
          <div class="form-item">
            <label>名称</label>
            <input v-model="form.name" type="text" required placeholder="请输入分类名称">
          </div>
          
          <div class="form-item">
            <label>颜色</label>
            <input v-model="form.color" type="color">
          </div>
          
          <div class="form-actions">
            <button type="button" @click="closeForm" class="cancel-btn">取消</button>
            <button type="submit" class="submit-btn">保存</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from '@/axios'

const categories = ref([])
const loading = ref(true)
const showCreateForm = ref(false)
const editingCategory = ref(null)

const form = ref({
  name: '',
  color: '#1890ff'
})

const fetchCategories = async () => {
  try {
    loading.value = true
    const response = await axios.get('/api/categories')
    categories.value = response.data
  } catch (error) {
    console.error('获取分类失败:', error)
  } finally {
    loading.value = false
  }
}

const saveCategory = async () => {
  try {
    if (editingCategory.value) {
      await axios.put(`/api/categories/${editingCategory.value.id}`, form.value)
    } else {
      await axios.post('/api/categories', form.value)
    }
    await fetchCategories()
    closeForm()
  } catch (error) {
    console.error('保存分类失败:', error)
  }
}

const editCategory = (category) => {
  editingCategory.value = category
  form.value = {
    name: category.name,
    color: category.color
  }
}

const deleteCategory = async (id) => {
  if (!confirm('确定要删除这个分类吗？')) return
  
  try {
    await axios.delete(`/api/categories/${id}`)
    await fetchCategories()
  } catch (error) {
    console.error('删除分类失败:', error)
  }
}

const closeForm = () => {
  showCreateForm.value = false
  editingCategory.value = null
  form.value = {
    name: '',
    color: '#1890ff'
  }
}

onMounted(() => {
  fetchCategories()
})
</script>

<style scoped>
.category-list {
  max-width: 800px;
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

.loading, .empty {
  text-align: center;
  padding: 48px;
  color: #999;
}

.categories {
  display: grid;
  gap: 16px;
}

.category-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.category-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.color-block {
  width: 24px;
  height: 24px;
  border-radius: 4px;
}

.name {
  font-size: 16px;
  color: #333;
}

.category-actions {
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background: white;
  padding: 24px;
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
}

.form {
  display: grid;
  gap: 24px;
  margin-top: 24px;
}

.form-item {
  display: grid;
  gap: 8px;
}

.form-item label {
  color: #666;
  font-size: 14px;
}

.form-item input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  font-size: 14px;
}

.form-item input[type="color"] {
  padding: 4px;
  height: 40px;
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