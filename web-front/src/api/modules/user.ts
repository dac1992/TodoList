import request from '../request'

export interface User {
  id: number
  name: string
  email: string
  avatar?: string
  created_at: string
  updated_at: string
}

export interface UpdateProfileData {
  name?: string
  email?: string
  password?: string
  avatar?: File
}

export interface ApiResponse<T> {
  data: T
  message?: string
}

export const userApi = {
  // 获取当前用户信息
  getProfile: () => {
    return request<ApiResponse<User>>({
      url: '/user/profile',
      method: 'get'
    })
  },

  // 更新用户信息
  updateProfile: (data: UpdateProfileData) => {
    const formData = new FormData()
    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value)
      }
    })

    return request<ApiResponse<User>>({
      url: '/user/profile',
      method: 'post',
      data: formData,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  },

  // 修改密码
  changePassword: (data: { old_password: string; new_password: string }) => {
    return request<ApiResponse<null>>({
      url: '/user/password',
      method: 'put',
      data
    })
  }
} 