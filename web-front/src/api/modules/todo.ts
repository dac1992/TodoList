import request from '../request'
import type { Category } from './category'

export interface Todo {
  id: number
  title: string
  description: string | null
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  category_id: number | null
  category?: Category
  due_date: string | null
  completed_at: string | null
  created_at: string
  updated_at: string
}

export interface TodoListParams {
  status?: Todo['status']
  category_id?: number
  priority?: Todo['priority']
  search?: string
  sort?: 'due_date' | 'created_at' | 'priority'
  order?: 'asc' | 'desc'
  limit?: number
  page?: number
}

export interface CreateTodoData {
  title: string
  description?: string
  category_id?: number
  priority?: Todo['priority']
  due_date?: string
}

export interface UpdateTodoData extends Partial<CreateTodoData> {
  status?: Todo['status']
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export interface TodoListResponse {
  items: Todo[]
  total: number
  page: number
  limit: number
}

export const todoApi = {
  // 获取待办事项列表
  list: (params?: TodoListParams) => {
    return request<ApiResponse<TodoListResponse>>({
      url: '/todos',
      method: 'get',
      params
    })
  },

  // 创建待办事项
  create: (data: CreateTodoData) => {
    return request<ApiResponse<Todo>>({
      url: '/todos',
      method: 'post',
      data
    })
  },

  // 更新待办事项
  update: (id: number, data: UpdateTodoData) => {
    return request<ApiResponse<Todo>>({
      url: `/todos/${id}`,
      method: 'put',
      data
    })
  },

  // 删除待办事项
  delete: (id: number) => {
    return request<ApiResponse<null>>({
      url: `/todos/${id}`,
      method: 'delete'
    })
  },

  // 更改待办事项状态
  updateStatus: (id: number, status: Todo['status']) => {
    return request<ApiResponse<Todo>>({
      url: `/todos/${id}/status`,
      method: 'patch',
      data: { status }
    })
  },

  // 批量更新待办事项状态
  batchUpdateStatus: (ids: number[], status: Todo['status']) => {
    return request<ApiResponse<null>>({
      url: '/todos/batch/status',
      method: 'patch',
      data: { ids, status }
    })
  }
} 