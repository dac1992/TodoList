import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DefaultLayout from '@/layouts/DefaultLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/auth/Login.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/auth/Register.vue'),
      meta: { requiresAuth: false }
    },
    {
      path: '/',
      component: DefaultLayout,
      meta: { requiresAuth: true },
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/HomeView.vue')
        },
        {
          path: 'todos',
          name: 'TodoList',
          component: () => import('@/views/todo/TodoList.vue')
        },
        {
          path: 'todos/create',
          name: 'CreateTodo',
          component: () => import('@/views/todo/CreateTodo.vue')
        },
        {
          path: 'categories',
          name: 'Categories',
          component: () => import('@/views/category/CategoryList.vue')
        },
        {
          path: 'categories/create',
          name: 'CreateCategory',
          component: () => import('@/views/category/CreateCategory.vue')
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  const token = userStore.token
  
  // 如果是登录页或注册页，直接放行
  if (to.path === '/login' || to.path === '/register') {
    if (token) {
      // 已登录用户访问登录页，重定向到首页
      next('/')
    } else {
      next()
    }
    return
  }

  // 其他页面需要验证登录
  if (!token) {
    next('/login')
    return
  }

  // 如果已登录但没有用户信息，获取用户信息
  if (token && !userStore.user) {
    try {
      await userStore.getProfile()
    } catch (error) {
      console.error('获取用户信息失败:', error)
      userStore.logout()
      next('/login')
      return
    }
  }

  next()
})

export default router
