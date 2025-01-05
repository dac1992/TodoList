export const storage = {
  // 设置永久存储
  set(key: string, value: any) {
    if (typeof value === 'object') {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  },

  // 获取永久存储
  get(key: string) {
    const value = localStorage.getItem(key)
    if (value) {
      try {
        return JSON.parse(value)
      } catch (e) {
        return value
      }
    }
    return null
  },

  // 移除永久存储
  remove(key: string) {
    localStorage.removeItem(key)
  },

  // 清空永久存储
  clear() {
    localStorage.clear()
  }
}

export default storage 