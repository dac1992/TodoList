import request from '../request'

export interface Category {
  id: number
  name: string
  color: string
  created_at: string
  updated_at: string
}

export interface CreateCategoryData {
  name: string
  color?: string
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export const categoryApi = {
  // 获取分类列表
  list: () => {
    return request<ApiResponse<Category[]>>({
      url: '/categories',
      method: 'get'
    })
  },

  // 创建分类
  create: (data: CreateCategoryData) => {
    return request<ApiResponse<Category>>({
      url: '/categories',
      method: 'post',
      data
    })
  },

  // 更新分类
  update: (id: number, data: UpdateCategoryData) => {
    return request<ApiResponse<Category>>({
      url: `/categories/${id}`,
      method: 'put',
      data
    })
  },

  // 删除分类
  delete: (id: number) => {
    return request<ApiResponse<null>>({
      url: `/categories/${id}`,
      method: 'delete'
    })
  }
} 