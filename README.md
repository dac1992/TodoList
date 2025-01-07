# TodoList 应用

一个功能完整的待办事项管理系统，支持多端同步。

## 技术栈

### 前端
- Vue 3
- TypeScript
- Vite
- Element Plus
- Pinia
- Vue Router

### 后端
- PHP 8.1+
- Laravel
- MySQL

## 功能特性

- [x] 用户认证
  - [x] 用户注册
  - [x] 用户登录
  - [ ] 邮箱验证（计划中）
  
- [ ] 待办事项管理
  - [ ] 创建待办事项
  - [ ] 编辑待办事项
  - [ ] 删除待办事项
  - [ ] 标记完成状态
  - [ ] 待办事项分类
  
- [ ] 数据同步
  - [ ] 多端数据同步
  - [ ] 实时更新

## 开发进度

请查看 [/issues](./issues) 目录了解详细的开发进度。

## 本地开发

### 前端

```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 后端（开发中）

```bash
# 进入后端目录
cd backend

# 安装依赖
composer install

# 配置环境变量
cp .env.example .env
php artisan key:generate

# 数据库迁移
php artisan migrate

# 启动服务器
php artisan serve
```

## 项目结构

```
/
├── frontend/          # 前端项目
│   ├── src/
│   │   ├── assets/   # 静态资源
│   │   ├── components/# 组件
│   │   ├── views/    # 页面
│   │   ├── stores/   # 状态管理
│   │   └── types/    # 类型定义
│   └── ...
├── backend/          # 后端项目（开发中）
└── issues/          # 项目管理和进度追踪
```

## 错误日志

项目的错误日志和解决方案记录在 [/docs/error_log.md](./docs/error_log.md) 中。

## 贡献指南

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个 Pull Request 