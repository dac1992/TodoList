<template>
  <div class="auth-container">
    <div class="auth-content">
      <div class="auth-header">
        <h1>TodoList</h1>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped>
.auth-container {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5f7fa;
}

.auth-content {
  width: 400px;
  padding: 40px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 30px;
}

.auth-header h1 {
  margin: 0;
  color: #409eff;
  font-size: 24px;
}
</style> 