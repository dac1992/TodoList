import request from '../request'
import type { LoginData } from '@/types'

export const authApi = {
  // 修改登录接口路径
  login: (data: LoginData) => 
    request.post('/auth/login', data),
  
  // 修改获取用户信息接口路径
  getProfile: () => 
    request.get('/user/profile'),
  
  // 修改登出接口路径
  logout: () => 
    request.post('/auth/logout')
} 