import { defineStore } from 'pinia'
import { ref } from 'vue'
import { authApi } from '@/api/modules/auth'
import type { User } from '@/api/modules/user'
import type { LoginData } from '@/api/modules/auth'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const token = ref<string | null>(localStorage.getItem('access_token'))

  const setToken = (newToken: string | null) => {
    token.value = newToken
    if (newToken) {
      localStorage.setItem('access_token', newToken)
    } else {
      localStorage.removeItem('access_token')
    }
  }

  const setUser = (newUser: User | null) => {
    user.value = newUser
  }

  // 登录
  const login = async (credentials: LoginData) => {
    const response = await authApi.login(credentials)
    setToken(response.access_token)
    setUser(response.user)
  }

  // 获取用户信息
  const getProfile = async () => {
    try {
      const user = await authApi.getProfile()
      setUser(user)
    } catch (error) {
      console.error('获取用户信息失败:', error)
    }
  }

  // 退出登录
  const logout = async () => {
    try {
      await authApi.logout()
    } catch (error) {
      console.error('退出登录失败:', error)
    } finally {
      setToken(null)
      setUser(null)
    }
  }

  return {
    user,
    token,
    setToken,
    setUser,
    login,
    logout,
    getProfile
  }
}) 