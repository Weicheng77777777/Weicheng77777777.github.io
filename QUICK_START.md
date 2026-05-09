# 快速参考指南

## 🚀 一键启动

### 如果已完成初始配置

从配置过的 PowerShell 启动 VS Code（推荐）：
```powershell
code .
```

或直接使用 CLI：
```powershell
claude
```

---

## 📋 初始配置清单

### 前置条件
- [ ] 安装 Node.js LTS：https://nodejs.org/
- [ ] 安装 npm 包管理器（随 Node.js 一起安装）
- [ ] 获取 DeepSeek API Key：https://platform.deepseek.com/

### 安装步骤
- [ ] 运行：`npm install -g @anthropic-ai/claude-code`
- [ ] 验证：`claude --version`

### 配置步骤
- [ ] 以管理员身份运行 PowerShell
- [ ] 进入项目目录
- [ ] 运行：`.\scripts\setup-claude-deepseek.ps1`
- [ ] 输入 DeepSeek API Key
- [ ] VS Code 已自动配置 `claudeCode.disableLoginPrompt: true`

### 验证配置
- [ ] 关闭并重新打开 PowerShell
- [ ] 运行：`echo $env:ANTHROPIC_BASE_URL`（应显示 `https://api.deepseek.com/anthropic`）
- [ ] 运行：`echo $env:ANTHROPIC_AUTH_TOKEN`（应显示你的 API Key）
- [ ] 运行：`claude --version`（应显示版本号）

### 开始使用
- [ ] 从 PowerShell 运行：`code .`
- [ ] 打开 Claude Code 侧边栏
- [ ] 提问验证是否正常工作

---

## 🔧 常用命令

| 命令 | 说明 |
|------|------|
| `claude --version` | 检查 CLI 版本 |
| `claude analyze` | 启动交互分析模式 |
| `code .` | 从当前 PowerShell 启动 VS Code（推荐，继承环境变量） |
| `echo $env:ANTHROPIC_BASE_URL` | 验证 API 端点 |
| `echo $env:ANTHROPIC_AUTH_TOKEN` | 验证 API Key（最好不要在共享环境中使用） |
| `.\scripts\setup-claude-deepseek.ps1` | 重新配置或更新 API Key |

---

## 🆘 快速排查

| 问题 | 检查项 |
|------|--------|
| Claude 登录提示不消失 | VS Code settings.json 中 `claudeCode.disableLoginPrompt` 是否为 `true` |
| 401 Unauthorized | API Key 是否正确、是否过期 |
| 404 Not Found | `ANTHROPIC_BASE_URL` 是否为 `https://api.deepseek.com/anthropic` |
| claude 命令找不到 | 是否运行过 `npm install -g @anthropic-ai/claude-code` |
| VS Code 插件不工作 | 是否从配置过的 PowerShell 中用 `code .` 启动 |
| 环境变量不生效 | 是否重启 PowerShell、是否以管理员身份运行配置脚本 |

---

## 📝 文件说明

| 文件 | 说明 |
|------|------|
| `scripts/setup-claude-deepseek.ps1` | 自动配置脚本（推荐使用） |
| `.env.example` | 环境变量参考模板 |
| `CLAUDE_CODE_SETUP.md` | 完整详细指南 |
| 此文件 | 快速参考指南 |

---

## 🔐 安全提醒

- ✅ API Key 存储在环境变量中（内存，进程级别）
- ✅ `.env` 文件已在 `.gitignore` 中
- ❌ 不要在代码中硬编码 API Key
- ❌ 不要将 API Key 提交到 Git
- ❌ 不要在不信任的计算机上配置

---

## 📚 相关资源

- [DeepSeek API 文档](https://platform.deepseek.com/docs)
- [Claude Code 使用指南](https://github.com/anthropics/claude-code)
- [Anthropic API 参考](https://docs.anthropic.com/api/)

---

## 💡 提示

### 从 PowerShell 启动 VS Code 的重要性

虽然可以从桌面快捷方式启动 VS Code，但**从 PowerShell 中运行 `code .` 更好**，因为：
1. VS Code 继承当前 PowerShell 的所有环境变量
2. Claude Code 插件能正确读取 API 配置
3. 避免环境变量传递问题

### 更新 API Key

如需更新 API Key：
1. 以管理员身份运行 PowerShell
2. 执行：`.\scripts\setup-claude-deepseek.ps1`
3. 输入新的 API Key
4. 脚本会自动覆盖旧的配置

---

**最后更新日期**：2026 年 5 月 9 日
