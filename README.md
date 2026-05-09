# ⚡ 冯威成 · 嵌入式个人作品集

> **Weicheng Feng — Embedded Systems Engineering Portfolio**
>
> 面向嵌入式岗位求职的个人主页 + 项目证据库 + 调试笔记

---

## 这个项目是干什么的

这是一个**面向技术岗求职的嵌入式作品集网站**，基于 GitHub Pages 托管。

核心思路：**简历压到一页，网站做证据库。**

| 功能 | 说明 |
|---|---|
| 🏠 **个人主页** | 终端风格首页，展示个人定位、技术栈、项目概览 |
| 📂 **项目详情页** | 6 个嵌入式项目的完整记录（背景 / 难点 / 代码 / 调试工具 / 复盘） |
| 📝 **调试笔记** | 板级调试中的真实问题排查过程 |
| 📄 **简历下载** | 一页精简简历 PDF 可直接下载 |
| 🔗 **GitHub 跳转** | 每个项目都关联 GitHub 仓库源码 |

### 为什么做这个网站

- 嵌入式岗位面试官看重**真实做过什么**，而不是简历上写了什么
- 压到一页的简历 + 网站详情，比长篇简历**更有说服力**
- 项目详情页有图、有日志、有工具、有复盘，和 80% 的候选人拉开差距

---

## 网站结构

```
weichengfeng.github.io/
├── index.html                 # 首页（终端风格 + 项目卡片）
├── resume.pdf                 # 简历 PDF（可下载）
├── css/
│   └── style.css              # 深色终端风格样式
├── js/
│   └── main.js                # 交互脚本
├── projects/                  # 项目详情页（6个）
│   ├── gec6818.html           # GEC6818 ARM64 Linux 系统移植
│   ├── stm32f411.html         # STM32F411 智能家居环境监测系统
│   ├── lora-car.html          # LoRa 遥控坦克小车系统
│   ├── maglev.html            # 电赛磁悬浮控制系统
│   ├── game-console.html      # STM32 小游戏机控制板
│   └── rk3566.html            # RK3566 泰山派 Linux 训练营
├── notes/
│   └── debug-log-1.html       # 调试笔记（DTB 加载 + FT5206 触摸）
└── images/                    # 项目图片（等待添加）
    ├── gec6818/
    ├── stm32f411/
    ├── lora-car/
    ├── maglev/
    └── game-console/
```

---

## 风格说明

- **终端/命令行风格**：黑底绿字，模拟串口终端输出
- **克制地酷炫**：没有粒子背景、3D 旋转、大动画库，保持嵌入式风格的务实感
- **移动端适配**：手机/平板/桌面均可正常浏览
- **响应式布局**：卡片自动适配屏幕宽度

---

## 部署方式

### 前提条件

- GitHub 账号
- 已创建仓库 `Weicheng77777777.github.io`（替换为你的用户名）

### 部署步骤

```bash
# 1. 进入项目目录
cd weichengfeng.github.io

# 2. 初始化 Git
git init
git add .
git commit -m "init: 嵌入式个人作品集上线"

# 3. 关联远程仓库（替换为你的仓库地址）
git remote add origin https://github.com/你的用户名/你的用户名.github.io.git

# 4. 推送到 main 分支
git push -u origin main
```

推送完成后，访问 `https://你的用户名.github.io` 即可看到网站。

---

## 后续维护指南

### 日常维护清单

#### 每次更新项目后

1. **更新项目详情页**：在 `projects/` 下对应的 HTML 中补充新内容
2. **更新首页卡片**：如果新增/修改了项目，同步更新 `index.html` 中的卡片描述
3. **更新简历 PDF**：覆盖 `resume.pdf`，简历中的 URL 保持和网站一致
4. **提交推送**：
   ```bash
   git add .
   git commit -m "update: 补充 xxx 项目调试记录"
   git push
   ```

#### 新增一个项目

1. 复制一个已有的项目页作为模板（如 `gec6818.html`）
2. 在 `projects/` 下创建新文件，修改内容
3. 在 `index.html` 的 `.projects-grid` 中添加对应的卡片
4. 在 `images/` 下创建对应的图片文件夹
5. 如果该项目有独立的 GitHub 仓库，在项目页中添加链接

#### 新增调试笔记

1. 在 `notes/` 下创建新的 HTML 文件
2. 格式参考 `debug-log-1.html`：问题现象 → 排查过程 → 解决方案 → 总结
3. 在 `index.html` 的笔记区添加入口

### 图片添加规范

所有图片放在 `images/` 下对应的项目目录中，目前为占位符状态。

**建议添加的图片类型：**

| 图片类型 | 作用 | 建议数量 |
|---|---|---|
| 🖼️ 实物运行图 | 面试官最想看的证明 | 每项目 1-2 张 |
| 📊 串口日志截图 | 体现调试过程 | 每项目 1 张 |
| 📐 系统框图 | 展示架构理解 | 每项目 1 张 |
| 🔌 PCB 实物图 | 硬件能力证明 | 有 PCB 的项目必加 |

**图片命名规范：**
- 使用英文小写，单词用连字符连接
- 如：`serial-log.png`、`final-running.jpg`、`architecture.png`
- 图片大小控制在 500KB 以内，尽量用 `.jpg` 压缩

### 自定义域名（可选）

如果想买域名绑定：

1. 购买域名（.dev / .com / .cn 均可）
2. 在 GitHub 仓库 Settings → Pages → Custom domain 中填写域名
3. 在 DNS 服务商添加 CNAME 记录指向 `你的用户名.github.io`
4. GitHub 会自动配置 SSL 证书

### 更新简历搭配

简历中每个项目只写 3 行，然后加一行：

```
详情及调试记录：https://weicheng.dev/projects/gec6818
```

这样简历压到一页，面试官点进网站能看到全部细节。

---

## 技术栈

| 技术 | 用途 |
|---|---|
| HTML5 | 页面结构 |
| CSS3 | 终端风格样式、响应式布局、动画 |
| JavaScript (Vanilla) | 导航交互、控制台彩蛋 |
| GitHub Pages | 免费托管、自动 HTTPS |
| Git | 版本管理 |

**不需要任何后端、数据库、服务器。**

---

## 项目关联的 GitHub 仓库

- [GEC6818-Friendly-Smart6818-64-](https://github.com/Weicheng77777777/GEC6818-Friendly-Smart6818-64-) — ARM64 Linux 移植
- [F411_TFT_V10](https://github.com/Weicheng77777777/F411_TFT_V10) — STM32F411 智能家居

---

## License

MIT — 可自由使用、修改、分享。

---

*Built with ⚡ by Feng Weicheng*
*求职方向：AI 嵌入式开发实习生 / Linux BSP 实习生 / 智能硬件开发实习生*

