# Claude Code + DeepSeek 配置指南

## 概述

本指南帮助你在 Windows + VS Code 环境下配置 Claude Code 使用 DeepSeek 作为模型后端。

**优点：**
- 无需 Claude Pro/Max 订阅
- 使用 DeepSeek 的 Anthropic-compatible API
- 在 CLI 和 VS Code 插件中都能使用
- API Key 安全存储在环境变量中，不写入仓库

---

## 前置要求

### 1. 安装 Node.js 和 npm

如果尚未安装：
1. 访问 [https://nodejs.org/](https://nodejs.org/)
2. 下载 LTS 版本并安装
3. 重启 PowerShell 后验证：
   ```powershell
   node --version
   npm --version
   ```

### 2. 安装 Claude Code CLI

```powershell
npm install -g @anthropic-ai/claude-code
```

验证安装：
```powershell
claude --version
```

### 3. 获取 DeepSeek API Key

1. 访问 [https://platform.deepseek.com/](https://platform.deepseek.com/)
2. 注册/登录账户
3. 在 API Keys 页面创建新的 API Key
4. **妥善保管** API Key（不要分享或提交到 Git）

---

## 配置步骤

### 方法一：使用自动配置脚本（推荐）

#### 第 1 步：以管理员身份运行 PowerShell

右键点击 PowerShell → 选择"以管理员身份运行"

#### 第 2 步：执行配置脚本

```powershell
cd c:\Users\Chen\Desktop\ZZ-Review\简历\留档\技术嵌入式
.\scripts\setup-claude-deepseek.ps1
```

#### 第 3 步：按提示输入 DeepSeek API Key

脚本会提示你输入 API Key（输入时不会显示）。

**输出示例：**
```
========================================
Claude Code + DeepSeek 配置脚本
========================================

请输入你的 DeepSeek API Key（输入时不会显示）:
正在设置环境变量...

✓ [会话级] ANTHROPIC_BASE_URL 已设置
✓ [会话级] ANTHROPIC_AUTH_TOKEN 已设置
✓ [会话级] ANTHROPIC_MODEL 已设置
...
✓ [用户级] ANTHROPIC_BASE_URL 已设置
✓ [用户级] ANTHROPIC_AUTH_TOKEN 已设置
...

========================================
配置完成！
========================================
```

### 方法二：手动配置（如果脚本不可用）

1. **打开环境变量设置**：
   - 按 `Win + X`，选择"系统"
   - 点击"高级系统设置"
   - 点击"环境变量"按钮
   - 在"用户变量"下点击"新建"

2. **添加以下环境变量**：

| 变量名 | 值 |
|--------|-----|
| `ANTHROPIC_BASE_URL` | `https://api.deepseek.com/anthropic` |
| `ANTHROPIC_AUTH_TOKEN` | *你的 DeepSeek API Key* |
| `ANTHROPIC_MODEL` | `deepseek-v3` |
| `ANTHROPIC_DEFAULT_OPUS_MODEL` | `deepseek-v3` |
| `ANTHROPIC_DEFAULT_SONNET_MODEL` | `deepseek-v3` |
| `ANTHROPIC_DEFAULT_HAIKU_MODEL` | `deepseek-v3-flash` |
| `CLAUDE_CODE_SUBAGENT_MODEL` | `deepseek-v3-flash` |
| `CLAUDE_CODE_EFFORT_LEVEL` | `max` |

3. 点击"确定"并关闭所有对话框

4. **重启 PowerShell** 使环境变量生效

---

## VS Code 配置

### 禁用登录提示

VS Code Claude Code 插件已在 `settings.json` 中配置 `"claudeCode.disableLoginPrompt": true`。

这样启动 VS Code 时不会出现登录提示。

---

## 测试配置

### 步骤 1：验证环境变量

关闭并重新打开 PowerShell，然后运行：

```powershell
echo $env:ANTHROPIC_BASE_URL
echo $env:ANTHROPIC_AUTH_TOKEN
```

**预期输出：**
```
https://api.deepseek.com/anthropic
sk-xxxxxxxxxxxxx... (你的 API Key)
```

### 步骤 2：测试 Claude Code CLI

```powershell
claude --version
```

**预期输出：**
```
@anthropic-ai/claude-code/X.X.X
```

### 步骤 3：启动 Claude Code

进入项目目录后：

```powershell
cd c:\Users\Chen\Desktop\ZZ-Review\简历\留档\技术嵌入式
claude
```

或者直接使用 Claude Code 交互模式：

```powershell
claude analyze
```

### 步骤 4：从 PowerShell 启动 VS Code（继承环境变量）

```powershell
code .
```

这样启动的 VS Code 会继承当前 PowerShell 会话的环境变量，Claude Code 插件可以正常使用。

### 步骤 5：在 VS Code 中测试 Claude Code

1. 在 VS Code 中打开 Claude Code 视图（侧边栏）
2. 询问一个问题，例如："Hello, what's your name?"
3. 如果收到回复，说明配置成功

---

## 常见问题排查

### 问题 1：仍然弹出 Claude 登录提示

**解决方案：**
- 确认 `claudeCode.disableLoginPrompt` 在 VS Code `settings.json` 中设置为 `true`
- 尝试从配置好环境变量的 PowerShell 中运行 `code .` 启动 VS Code
- 重启 VS Code

### 问题 2：401 Unauthorized 错误

**原因：** DeepSeek API Key 不正确或已过期

**解决方案：**
- 检查 API Key 是否正确（复制时可能有空格）
- 从 DeepSeek 平台重新复制 API Key
- 重新运行配置脚本输入新的 API Key
- 使用命令验证：`echo $env:ANTHROPIC_AUTH_TOKEN`

### 问题 3：404 Not Found 错误

**原因：** API Base URL 不正确

**解决方案：**
- 确认 `ANTHROPIC_BASE_URL` 的值为 `https://api.deepseek.com/anthropic`
- 验证命令：`echo $env:ANTHROPIC_BASE_URL`

### 问题 4：claude 命令不存在

**原因：** Claude Code CLI 未安装或 npm 全局 bin 不在 PATH 中

**解决方案：**
```powershell
# 重新安装
npm install -g @anthropic-ai/claude-code

# 验证全局 bin 路径
npm config get prefix

# 检查 PATH 中是否包含 npm bin 目录
$env:PATH -split ";"
```

### 问题 5：VS Code 插件不能用但 CLI 可以用

**原因：** VS Code 未继承环境变量（可能是通过桌面快捷方式启动）

**解决方案：**
- 关闭 VS Code
- 从配置好的 PowerShell 运行：
  ```powershell
  code .
  ```

### 问题 6：输入 API Key 时显示内容

**原因：** PowerShell 版本较低，`Read-Host -AsSecureString` 不支持隐藏输入

**解决方案：**
- 升级 PowerShell 到最新版本（7.x）：
  ```powershell
  winget install --id Microsoft.PowerShell --latest
  ```

---

## 安全建议

1. **不要在代码中硬编码 API Key**
   - 始终使用环境变量
   - `.env` 文件已在 `.gitignore` 中忽略

2. **定期轮换 API Key**
   - 从 DeepSeek 平台删除旧的 API Key
   - 生成新的 API Key 并更新环境变量

3. **共享代码时**
   - 不要提交包含 API Key 的 `.env` 文件
   - 使用 `.env.example` 模板说明需要的变量

4. **在公共计算机上**
   - 使用完后清除环境变量
   - 手动删除 API Key：
    ```powershell
    [Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', $null, 'User')
    ```

---

## 更新配置

如果需要更新 API Key 或其他配置：

1. **重新运行配置脚本**（以管理员身份）：
   ```powershell
   .\scripts\setup-claude-deepseek.ps1
   ```

2. **或手动更新环境变量**：
   - 打开环境变量设置
   - 编辑相应的变量
   - 重启 PowerShell

---

## 卸载/清除配置

如果需要完全移除配置：

```powershell
# 删除用户级环境变量
[Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', $null, 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_AUTH_TOKEN', $null, 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_MODEL', $null, 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_OPUS_MODEL', $null, 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_SONNET_MODEL', $null, 'User')
[Environment]::SetEnvironmentVariable('ANTHROPIC_DEFAULT_HAIKU_MODEL', $null, 'User')
[Environment]::SetEnvironmentVariable('CLAUDE_CODE_SUBAGENT_MODEL', $null, 'User')
[Environment]::SetEnvironmentVariable('CLAUDE_CODE_EFFORT_LEVEL', $null, 'User')
```

---

## 相关资源

- [DeepSeek API 文档](https://platform.deepseek.com/docs)
- [Claude Code 文档](https://claude.ai/docs)
- [Anthropic API 文档](https://docs.anthropic.com/)

---

## 支持

如有问题，请检查：
1. 日志文件：`%APPDATA%\Code\logs\`
2. VS Code 输出面板：`Ctrl + Shift + U`
3. 终端输出：直接运行 `claude` 命令查看错误消息

