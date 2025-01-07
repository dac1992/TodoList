# Error Log

## 错误日志格式
每个错误记录包含以下信息：
- 日期：错误发生的日期
- Issue ID：相关的 issue 编号
- 错误描述：详细的错误信息
- 解决方案：如何修复该错误
- 预防措施：如何避免再次发生

## 错误记录
### 2024-01-06
- 初始化错误日志
- 建立错误跟踪机制
- 开始记录项目中遇到的各类错误

### 2024-01-06 ESLint 配置问题
- Issue ID: 001-f-project-setup
- 错误描述：ESLint 命令行参数 '--ext' 在新版本中不可用
- 解决方案：需要使用新版本的 ESLint 配置方式，创建 eslint.config.js 而不是 .eslintrc.json
- 预防措施：在配置工具时先查看最新的官方文档，确保使用当前版本支持的配置方式

### 2024-01-06 Element Plus 样式加载问题
- Issue ID: 001-f-project-setup
- 错误描述：Element Plus 组件样式未正确加载，导致界面显示异常
- 解决方案：
  1. 确保在 main.ts 中正确导入 Element Plus 样式
  2. 注册所有图标组件
  3. 使用 Element Plus 的设计变量而不是硬编码的样式值
- 预防措施：
  1. 在使用 UI 框架时，先完成完整的样式导入和配置
  2. 使用框架提供的设计变量系统
  3. 在开发前先阅读框架的最佳实践文档

### 2024-01-06 组件类型定义问题
- Issue ID: 001-f-project-setup
- 错误描述：TypeScript 无法识别 .vue 文件和一些模块的类型定义
- 解决方案：
  1. 添加 env.d.ts 文件声明 .vue 文件的类型
  2. 正确配置 tsconfig.json
  3. 使用 type 导入语法导入类型
- 预防措施：
  1. 在项目初始化时就完成类型声明文件的配置
  2. 使用框架提供的类型定义模板
  3. 遵循 TypeScript 的最佳实践 

## Windows PowerShell 相关问题

### 1. 目录切换问题
**问题描述**：在 PowerShell 中使用 `cd backend && command` 这样的组合命令时会失败。
```powershell
cd backend && php artisan serve  # 失败
```
**解决方案**：
- 使用分号替代 `&&`：`cd backend; php artisan serve`
- 或者分两步执行命令：
  ```powershell
  cd backend
  php artisan serve
  ```

### 2. 路径问题
**问题描述**：PowerShell 在处理路径时可能会出现双重路径问题。
```powershell
Set-Location : 找不到路径"D:\Codebase\TodoList\backend\backend"
```
**解决方案**：
- 确保当前在正确的目录下
- 使用绝对路径
- 使用 `Get-Location` 命令检查当前位置

### 3. curl 命令问题
**问题描述**：PowerShell 中的 curl 命令（实际是 Invoke-WebRequest 的别名）与 Linux/Unix 的 curl 命令有差异。
```powershell
curl -X POST ... # 可能会出现参数解析错误
```
**解决方案**：
- 使用 `Invoke-WebRequest` 命令代替 curl
- 正确格式化请求头和请求体：
  ```powershell
  $headers = @{ "Content-Type" = "application/json" }
  $body = @{
    key = "value"
  } | ConvertTo-Json
  Invoke-WebRequest -Uri "url" -Method Post -Headers $headers -Body $body
  ```

### 4. 命令执行权限问题
**问题描述**：某些命令可能因为 PowerShell 执行策略而被阻止。
**解决方案**：
- 以管理员身份运行 PowerShell
- 适当调整执行策略：`Set-ExecutionPolicy RemoteSigned`

### 2024-01-07 Bearer Token 认证问题
- Issue ID: 002-f-user-auth
- 错误描述：Authorization header 格式错误导致 API 请求失败
- 错误信息：`Error: Invalid character in header content ["Authorization"]`
- 解决方案：
  1. Authorization header 的正确格式：`Bearer your_token_here`
  2. "Bearer" 和 token 之间需要有一个空格
  3. token 不要加引号
  4. 使用完整的 token 字符串
- 预防措施：
  1. 在测试 API 时始终检查 header 格式
  2. 使用 Postman 的环境变量来管理 token
  3. 在前端代码中确保正确设置 Authorization header

### 2024-01-07 模块导入路径问题
- Issue ID: 002-f-user-auth
- 错误描述：TypeScript 无法解析 @/ 开头的模块导入路径
- 错误信息：`找不到模块"@/stores/auth"或其相应的类型声明。`
- 解决方案：
  1. 在 vite.config.ts 中配置路径别名
  2. 在 tsconfig.json 中添加路径映射
  3. 使用相对路径导入模块
- 预防措施：
  1. 在项目初始化时就配置好路径别名
  2. 确保 TypeScript 和构建工具的路径配置保持一致
  3. 使用 IDE 的自动导入功能

### 2024-01-07 模型命名空间错误

### 错误描述
1. `Call to undefined method App\Models\Models\User::todos()`
2. `Class "App\Models\Models\User" not found`

### 原因分析
- 模型文件被错误地放置在嵌套的 Models/Models 目录中
- 删除错误位置的文件后，可能存在以下问题：
  1. 其他文件中的命名空间引用未更新
  2. Laravel 的类加载缓存未清理
  3. 可能存在循环引用或重复的类定义

### 解决方案
1. 确保所有模型文件都位于正确的 `app/Models` 目录下
2. 检查并更新所有引用这些模型的文件中的命名空间
3. 清理 Laravel 的缓存：
   ```bash
   php artisan config:clear
   php artisan cache:clear
   php artisan route:clear
   php artisan view:clear
   ```
4. 检查数据库迁移和模型关联的一致性

### 经验教训
1. 在移动或删除文件前，应该先全面检查文件的引用关系
2. 修改命名空间时，需要同步更新所有相关文件
3. 遇到类似问题时，应该先清理缓存再进行测试
4. 保持良好的目录结构，避免创建不必要的嵌套目录

## 最佳实践建议
1. 在 Windows 环境下开发时，优先使用图形化工具（如 Postman）进行 API 测试
2. 使用 Visual Studio Code 的集成终端，它提供更好的命令行体验
3. 考虑使用 Git Bash 或 WSL (Windows Subsystem for Linux) 来获得更接近 Linux 的命令行体验
4. 在执行重要命令前，先使用 `Get-Location` 确认当前目录
5. 对于复杂的 HTTP 请求测试，使用专业的 API 测试工具而不是命令行
6. 在开发前端功能时，先完成类型定义和接口文档
7. 使用版本控制工具（如 Git）来跟踪代码变更
8. 定期检查并更新依赖包的版本
9. 保持代码结构清晰，遵循最佳实践
10. 及时记录错误和解决方案，避免重复踩坑 