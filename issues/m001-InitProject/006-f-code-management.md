# 建立代码管理机制

## Introduction
为了更好地管理代码和跟踪问题，建立一个统一的代码管理机制。使用 /issues 目录来管理所有的功能开发和问题修复，确保开发过程的可追踪性和文档的完整性。

## Tasks
- [x] 建立目录结构
  - [x] 创建 /issues 根目录
  - [x] 创建 milestone 子目录（m001-InitProject）
  - [x] 建立命名规范
    - [x] milestone 命名规则：m{x}-{name}
    - [x] issue 文件命名规则：{id}-f-* 或 {id}-bug-*
- [x] 定义文件结构
  - [x] Title 部分
  - [x] Introduction 部分
  - [x] Tasks 部分
  - [x] Dependencies 部分
- [x] 建立任务状态标记规范
  - [x] [ ] 未完成
  - [x] [x] 已完成
  - [x] [-] 正在进行
  - [x] [*] 已跳过
  - [x] [!] 已放弃
- [-] 整理现有问题
  - [-] 将已有问题迁移到新的管理体系
  - [-] 更新现有文档的格式

## Dependencies
- [x] 001-f-project-setup.md - 项目初始化
- [x] 003-f-todo-crud.md - 待办事项功能 