# Claude Code + DeepSeek 配置脚本
# 功能：设置 ANTHROPIC_* 环境变量以使用 DeepSeek API

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Claude Code + DeepSeek 配置脚本" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# 检查是否以管理员身份运行
$isAdmin = [Security.Principal.WindowsPrincipal] [Security.Principal.WindowsIdentity]::GetCurrent()
$adminCheck = $isAdmin.IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)

if (-not $adminCheck) {
    Write-Host "警告：未以管理员身份运行，无法设置用户级环境变量。" -ForegroundColor Yellow
    Write-Host "请以管理员身份运行此脚本以配置系统级环境变量。" -ForegroundColor Yellow
    Write-Host "只会设置当前 PowerShell 会话的环境变量。" -ForegroundColor Yellow
    Write-Host ""
}

# 提示输入 DeepSeek API Key（不回显）
Write-Host "请输入你的 DeepSeek API Key（输入时不会显示）:" -ForegroundColor Green
$apiKey = Read-Host -AsSecureString
$apiKeyPlainText = [Runtime.InteropServices.Marshal]::PtrToStringAuto([Runtime.InteropServices.Marshal]::SecureStringToBSTR($apiKey))

if ([string]::IsNullOrWhiteSpace($apiKeyPlainText)) {
    Write-Host "错误：API Key 不能为空" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "正在设置环境变量..." -ForegroundColor Cyan
Write-Host ""

# 要设置的环境变量
$envVars = @{
    "ANTHROPIC_BASE_URL" = "https://api.deepseek.com/anthropic"
    "ANTHROPIC_AUTH_TOKEN" = $apiKeyPlainText
    "ANTHROPIC_MODEL" = "deepseek-v3"
    "ANTHROPIC_DEFAULT_OPUS_MODEL" = "deepseek-v3"
    "ANTHROPIC_DEFAULT_SONNET_MODEL" = "deepseek-v3"
    "ANTHROPIC_DEFAULT_HAIKU_MODEL" = "deepseek-v3-flash"
    "CLAUDE_CODE_SUBAGENT_MODEL" = "deepseek-v3-flash"
    "CLAUDE_CODE_EFFORT_LEVEL" = "max"
}

# 设置当前会话的环境变量
foreach ($key in $envVars.Keys) {
    [Environment]::SetEnvironmentVariable($key, $envVars[$key], "Process")
    Write-Host "✓ [会话级] $key 已设置" -ForegroundColor Green
}

# 如果以管理员身份运行，设置用户级环境变量
if ($adminCheck) {
    Write-Host ""
    Write-Host "以管理员身份运行，正在设置用户级环境变量..." -ForegroundColor Cyan
    Write-Host ""
    
    foreach ($key in $envVars.Keys) {
        [Environment]::SetEnvironmentVariable($key, $envVars[$key], "User")
        Write-Host "✓ [用户级] $key 已设置" -ForegroundColor Green
    }
    
    Write-Host ""
    Write-Host "用户级环境变量已永久保存。" -ForegroundColor Green
} else {
    Write-Host ""
    Write-Host "注意：只设置了当前会话的环境变量。" -ForegroundColor Yellow
    Write-Host "若要永久配置，请以管理员身份运行此脚本。" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "配置完成！" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Write-Host "后续步骤：" -ForegroundColor Cyan
Write-Host "1. 关闭并重新打开 PowerShell（如果需要永久生效）" -ForegroundColor White
Write-Host "2. 验证配置：" -ForegroundColor White
Write-Host "   echo `$env:ANTHROPIC_BASE_URL" -ForegroundColor Gray
Write-Host "3. 测试 Claude Code CLI：" -ForegroundColor White
Write-Host "   claude --version" -ForegroundColor Gray
Write-Host "4. 从当前 PowerShell 启动 VS Code（继承环境变量）：" -ForegroundColor White
Write-Host "   code ." -ForegroundColor Gray
Write-Host ""

Write-Host "重要提示：" -ForegroundColor Yellow
Write-Host "- 此脚本设置的 API Key 只存储在环境变量中，不会保存到文件。" -ForegroundColor Gray
Write-Host "- 关闭 PowerShell 会话后，临时会话变量会被清除。" -ForegroundColor Gray
Write-Host "- 用户级环境变量已永久保存到 Windows 系统中。" -ForegroundColor Gray
Write-Host "- 更新 API Key 时，可再次运行此脚本。" -ForegroundColor Gray
Write-Host ""
