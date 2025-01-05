import request from '../request'
import type { User } from './user'

export interface LoginData {
  email: string
  password: string
}

export interface RegisterData extends LoginData {
  name: string
  password_confirmation: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

export const authApi = {
  // 用户登录
  login: (data: LoginData) => {
    return request<AuthResponse>({
      url: '/auth/login',
      method: 'post',
      data
    })
  },

  // 用户注册
  register: (data: RegisterData) => {
    return request<AuthResponse>({
      url: '/auth/register',
      method: 'post',
      data
    })
  },

  // 获取当前用户信息
  getProfile: () => {
    return request<User>({
      url: '/auth/profile',
      method: 'get'
    })
  },

  // 退出登录
  logout: () => {
    return request({
      url: '/auth/logout',
      method: 'post'
    })
  }
} 