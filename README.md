# TodoList

一个基于 Vue 3 + TypeScript + Element Plus 的待办事项管理系统。

## 技术栈

- 前端框架：Vue 3
- 开发语言：TypeScript
- UI 框架：Element Plus
- 状态管理：Pinia
- 路由管理：Vue Router
- HTTP 客户端：Axios
- 构建工具：Vite

## 功能特性

### 已实现功能
- ✅ 用户认证（登录）
- ✅ Token 管理
- ✅ 响应式布局
- ✅ 路由权限控制

### 开发中功能
- ⏳ 用户注册
- ⏳ 待办事项管理
- ⏳ 分类管理
- ⏳ 数据统计
- ⏳ 个人中心

## 项目结构
tree
web-front/
├── src/
│ ├── api/ # API 接口
│ ├── assets/ # 静态资源
│ ├── components/ # 公共组件
│ ├── layouts/ # 布局组件
│ ├── router/ # 路由配置
│ ├── stores/ # 状态管理
│ ├── types/ # TypeScript 类型
│ └── views/ # 页面组件
├── .env # 环境变量
└── package.json # 项目配置

## 开发环境设置

ash
安装依赖
npm install
启动开发服务器
npm run dev
构建生产版本
npm run build

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建 Pull Request

## 许可证

[MIT](LICENSE)

