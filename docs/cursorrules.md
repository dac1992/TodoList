# Cursor Rules

## 1. 项目结构规则
- 所有代码更改必须对应 `/issues` 中的任务
- 每次开始新任务前，必须查看 `/issues` 目录了解上下文
- 严格遵循 issue 的依赖关系进行开发

## 2. 开发流程
- 开始任务前检查 Dependencies
- 确保完成所有子任务
- 更新任务状态标记
- 提交代码时关联 issue ID

## 3. 代码规范
- 前端使用 Vue3 + TypeScript + Vite
- 后端使用 PHP Laravel 框架
- 数据库使用 MySQL
- 所有 API 端点必须有 OpenAPI 文档
- 所有 Vue 组件必须使用 Composition API
- 使用 PHP 8.1+ 的类型声明特性
- 遵循 PSR-12 编码规范

## 4. 项目管理
- 严格遵循 issue 命名规范
- 定期检查 error_log.md 避免重复错误
- 每个功能必须有对应的测试用例

## 5. 多端同步策略
- 使用 REST API 确保接口统一
- 数据模型必须考虑跨平台兼容性
- 使用 JWT 进行身份认证
- 实现实时数据同步机制 