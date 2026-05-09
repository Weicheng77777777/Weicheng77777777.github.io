/**
 * 冯威成 · 嵌入式个人作品集
 * main.js — 交互式终端 + 页面交互
 */

(function () {
  'use strict';

  /* ================================================================
     交互式终端
     ================================================================ */

  const termOutput = document.getElementById('termOutput');
  const termInput = document.getElementById('termInput');
  const termInputLine = document.getElementById('termInputLine');
  let history = [];
  let historyIndex = -1;
  let bootDone = false;

  const COMMANDS = [
    'help', 'about', 'projects', 'resume', 'contact',
    'skills', 'education', 'ls', 'clear', 'whoami',
    'uname', 'neofetch', 'echo', 'date', 'github',
  ];

  const PROJECTS = [
    { num: '1', key: 'gec6818', name: 'GEC6818 ARM64 Linux 系统移植', url: 'projects/gec6818.html' },
    { num: '2', key: 'stm32f411', name: 'STM32F411 智能家居环境监测系统', url: 'projects/stm32f411.html' },
    { num: '3', key: 'lora', name: 'LoRa 遥控坦克小车系统', url: 'projects/lora-car.html' },
    { num: '4', key: 'maglev', name: '电赛磁悬浮控制系统', url: 'projects/maglev.html' },
    { num: '5', key: 'console', name: 'STM32 小游戏机控制板', url: 'projects/game-console.html' },
    { num: '6', key: 'rk3566', name: 'RK3566 泰山派 Linux 训练营', url: 'projects/rk3566.html' },
  ];

  function printLine(html, className) {
    const div = document.createElement('div');
    div.className = 'term-line' + (className ? ' ' + className : '');
    div.innerHTML = html;
    termOutput.appendChild(div);
    scrollTerm();
  }

  function scrollTerm() {
    termOutput.scrollTop = termOutput.scrollHeight;
  }

  /** 启动动画：模拟 Linux 启动 */
  function runBootSequence() {
    const lines = [
      '<span class="dim-text">[    0.000000] Booting Linux on physical CPU 0x0</span>',
      '<span class="dim-text">[    0.001234] Machine model: GEC6818 based on S5P6818</span>',
      '<span class="dim-text">[    0.002345] </span><span class="green-text">weicheng</span><span class="dim-text">@embedded system initialized</span>',
      '',
      '<span class="green-text">  ⚡ 冯威成 · Feng Weicheng</span>',
      '<span class="dim-text">  Embedded Systems Engineer</span>',
      '<span class="dim-text">  ARM64 Linux BSP / STM32 / IoT / Hardware Debug</span>',
      '',
      '<span class="green-text">  ● 系统状态</span>',
      '<span class="output-text">  ├─ 教育: 广东白云学院 · 通信工程 (2023-2027)</span>',
      '<span class="output-text">  ├─ 方向: ARM64 Linux BSP / STM32 固件 / 智能硬件</span>',
      '<span class="output-text">  ├─ 获奖: 全国嵌入式芯片设计大赛 国三 / 省一 / 省三</span>',
      '<span class="output-text">  └─ 状态: </span><span class="green-text">● ACTIVE</span><span class="output-text"> (求职中)</span>',
      '',
      '<span class="dim-text">[  OK  ] 系统就绪，输入 </span><span class="green-text">help</span><span class="dim-text"> 查看可用命令</span>',
    ];

    lines.forEach((html, i) => {
      setTimeout(() => {
        printLine(html, 'boot');
        if (i === lines.length - 1) {
          setTimeout(() => {
            bootDone = true;
            termInputLine.style.display = 'flex';
            termInput.focus();
            scrollTerm();
          }, 300);
        }
      }, i * 180);
    });
  }

  /* ---- 命令处理 ---- */

  function processCommand(input) {
    const trimmed = input.trim();
    if (!trimmed) {
      printLine('<span class="prompt">$ </span>');
      return;
    }

    // 回显用户输入
    printLine('<span class="prompt">$ </span><span class="cmd-text">' + escHtml(trimmed) + '</span>');

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case 'help':     helpCmd(); break;
      case 'about':    aboutCmd(); break;
      case 'projects': projectsCmd(args); break;
      case 'resume':   resumeCmd(); break;
      case 'contact':  contactCmd(); break;
      case 'skills':   skillsCmd(); break;
      case 'education': eduCmd(); break;
      case 'ls':       lsCmd(); break;
      case 'clear':    clearCmd(); return;
      case 'whoami':   whoamiCmd(); break;
      case 'uname':    unameCmd(args); break;
      case 'neofetch': neofetchCmd(); break;
      case 'echo':     echoCmd(args); break;
      case 'date':     dateCmd(); break;
      case 'github':   githubCmd(); break;
      default:
        printLine('<span class="err-text">命令未找到: ' + escHtml(cmd) + '</span>');
        printLine('<span class="dim-text">输入 help 查看可用命令</span>');
    }
    printLine('');
  }

  function helpCmd() {
    printLine('<span class="green-text">╔══════════════════════════════════════╗</span>');
    printLine('<span class="green-text">║  可用命令</span>                                <span class="green-text">║</span>');
    printLine('<span class="green-text">╠══════════════════════════════════════╣</span>');
    const cmds = [
      ['help', '显示帮助信息'],
      ['about', '关于我'],
      ['projects', '项目列表'],
      ['projects &lt;n&gt;', '查看项目详情 (1-6)'],
      ['resume', '下载简历 PDF'],
      ['contact', '联系方式'],
      ['skills', '技术栈'],
      ['education', '教育背景'],
      ['ls', '浏览项目目录'],
      ['clear', '清屏'],
      ['whoami', '我是谁'],
      ['uname -a', '系统信息'],
      ['neofetch', '系统 fetch'],
      ['echo', '回显文本'],
      ['date', '当前时间'],
      ['github', '打开 GitHub'],
    ];
    cmds.forEach(([c, d]) => {
      printLine('<span class="green-text">║</span>  <span class="cyan-text">' + c.padEnd(14) + '</span>' + d.padEnd(28) + '<span class="green-text">║</span>');
    });
    printLine('<span class="green-text">╚══════════════════════════════════════╝</span>');
    printLine('<span class="dim-text">Tab 自动补全 · ↑↓ 翻历史</span>');
  }

  function aboutCmd() {
    printLine('<span class="green-text">  冯威成 · Feng Weicheng</span>');
    printLine('<span class="dim-text">  嵌入式系统工程师</span>');
    printLine('');
    printLine('<span class="dim-text">  ARM64 Linux BSP / STM32 固件 / IoT 智能硬件</span>');
    printLine('<span class="dim-text">  能写代码 · 懂硬件 · 会调试 · 善复盘</span>');
  }

  function projectsCmd(args) {
    if (args.length > 0) {
      const key = args[0].toLowerCase();
      const found = PROJECTS.find(p => p.num === key || p.key === key);
      if (found) {
        printLine('<span class="green-text">  正在打开: ' + found.name + ' ...</span>');
        setTimeout(() => { window.location.href = found.url; }, 600);
        return;
      }
      printLine('<span class="err-text">  项目 "' + escHtml(args[0]) + '" 未找到</span>');
      printLine('<span class="dim-text">  输入 projects 查看所有项目</span>');
      return;
    }

    printLine('<span class="green-text">════════════════ 项目列表 ════════════</span>');
    PROJECTS.forEach(p => {
      printLine('');
      printLine('<span class="cyan-text">  ' + p.num + '</span>  ' + p.name);
    });
    printLine('');
    printLine('<span class="green-text">═══════════════════════════════════════</span>');
    printLine('<span class="dim-text">输入 projects &lt;编号&gt; 查看详情，如: projects 1</span>');
  }

  function resumeCmd() {
    printLine('<span class="green-text">  正在下载 resume.pdf ...</span>');
    const a = document.createElement('a');
    a.href = 'resume.pdf';
    a.download = '冯威成_简历.pdf';
    a.click();
  }

  function contactCmd() {
    printLine('<span class="dim-text">  邮箱: </span><span class="green-text">2590752572@qq.com</span>');
    printLine('<span class="dim-text">  手机: </span><span class="green-text">17520434964</span>');
    printLine('<span class="dim-text">  GitHub: </span><span class="cyan-text">https://github.com/Weicheng77777777</span>');
  }

  function skillsCmd() {
    printLine('<span class="green-text">  ═══ 技术栈 ═══</span>');
    printLine('');
    const groups = [
      ['嵌入式开发', 'C · 模块化驱动 · 状态机 · TIM中断 · UART/SPI/I2C'],
      ['MCU 平台', 'STM32F1/F4 · STM32CubeMX · HAL · Keil'],
      ['嵌入式 Linux', 'ARM64 · U-Boot · Kernel · DTS/DTB · BSP · 驱动调试'],
      ['硬件', '原理图/PCB · 示波器 · 逻辑分析仪 · 万用表 · 焊接'],
      ['工具', 'Git · Linux 命令行 · 嘉立创 EDA'],
    ];
    groups.forEach(([title, content]) => {
      printLine('<span class="cyan-text">  ' + title + '</span>');
      printLine('  ' + content);
      printLine('');
    });
  }

  function eduCmd() {
    printLine('<span class="green-text">  广东白云学院</span>');
    printLine('<span class="dim-text">  通信工程 · 本科 · 2023.09 - 2027.06</span>');
    printLine('');
    printLine('<span class="cyan-text">  荣誉</span>');
    printLine('  全国嵌入式芯片设计大赛 · 国家级三等奖');
    printLine('  全国嵌入式芯片设计大赛 · 省级一等奖 / 省级三等奖');
    printLine('  国家励志奖学金');
    printLine('  大学生挑战杯铜奖');
    printLine('  校级一等奖 x3 / 二等奖 x2 / 三等奖 x1');
  }

  function lsCmd() {
    printLine('<span class="green-text">  .</span>');
    printLine('<span class="green-text">  ├── index.html</span>');
    printLine('<span class="green-text">  ├── resume.pdf</span>');
    printLine('<span class="cyan-text">  ├── projects/</span>');
    PROJECTS.forEach(p => {
      const fname = p.url.replace('projects/', '');
      printLine('  │   ├── <span class="cyan-text">' + fname + '</span>  ' + p.name);
    });
    printLine('<span class="cyan-text">  ├── notes/</span>');
    printLine('  │   └── <span class="cyan-text">debug-log-1.html</span>  调试笔记');
    printLine('<span class="green-text">  └── README.md</span>');
  }

  function clearCmd() {
    termOutput.innerHTML = '';
  }

  function whoamiCmd() {
    printLine('<span class="green-text">  weicheng</span>');
  }

  function unameCmd(args) {
    const flag = args[0] || '';
    if (flag === '-a') {
      printLine('<span class="dim-text">  Linux weicheng.dev 6.1.0-arm64 #1 SMP PREEMPT (aarch64 GNU/Linux)</span>');
    } else if (flag === '-r') {
      printLine('<span class="dim-text">  kernel 6.1.0-arm64</span>');
    } else if (flag === '-m') {
      printLine('<span class="dim-text">  aarch64</span>');
    } else {
      printLine('<span class="dim-text">  Linux</span>');
      printLine('<span class="dim-text">  参数: -a (全部)  -r (内核版本)  -m (架构)</span>');
    }
  }

  function neofetchCmd() {
    printLine('<span class="green-text">            ╱╲           </span><span class="bold-text">weicheng@embedded</span>');
    printLine('<span class="green-text">           ╱  ╲          </span><span class="dim-text">---------------</span>');
    printLine('<span class="green-text">          ╱    ╲         </span><span class="cyan-text">OS</span><span class="dim-text">: weicheng.dev v1.0</span>');
    printLine('<span class="green-text">         ╱  ⚡  ╲        </span><span class="cyan-text">Host</span><span class="dim-text">: GEC6818 (S5P6818)</span>');
    printLine('<span class="green-text">        ╱        ╲       </span><span class="cyan-text">Kernel</span><span class="dim-text">: ARM64 Linux 6.1.0</span>');
    printLine('<span class="green-text">       ╱__________╲      </span><span class="cyan-text">Shell</span><span class="dim-text">: embedded-portfolio</span>');
    printLine('<span class="green-text">                          </span><span class="cyan-text">Uptime</span><span class="dim-text">: 求职中 · 随时到岗</span>');
    printLine('                         <span class="cyan-text">Packages</span><span class="dim-text">: 6 projects</span>');
  }

  function echoCmd(args) {
    printLine('<span class="dim-text">  ' + escHtml(args.join(' ')) + '</span>');
  }

  function dateCmd() {
    const now = new Date();
    printLine('<span class="dim-text">  ' + now.toLocaleString('zh-CN', { timeZone: 'Asia/Shanghai' }) + ' CST</span>');
  }

  function githubCmd() {
    printLine('<span class="green-text">  正在打开 GitHub ...</span>');
    window.open('https://github.com/Weicheng77777777', '_blank');
  }

  /* ---- 工具函数 ---- */

  function escHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  /* ---- 事件绑定 ---- */

  termInput.addEventListener('keydown', function (e) {
    // 回车
    if (e.key === 'Enter') {
      const val = this.value;
      if (val.trim()) {
        history.push(val);
        historyIndex = history.length;
      }
      processCommand(val);
      this.value = '';
      return;
    }

    // ↑ 历史
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        historyIndex = Math.max(0, historyIndex - 1);
        this.value = history[historyIndex];
      }
      return;
    }

    // ↓ 历史
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        historyIndex++;
        this.value = history[historyIndex];
      } else {
        historyIndex = history.length;
        this.value = '';
      }
      return;
    }

    // Tab 自动补全
    if (e.key === 'Tab') {
      e.preventDefault();
      const current = this.value.trim().toLowerCase();
      if (!current) return;
      const match = COMMANDS.filter(c => c.startsWith(current));
      if (match.length === 1) {
        this.value = match[0] + ' ';
      } else if (match.length > 1) {
        printLine('');
        match.forEach(c => printLine('<span class="cyan-text">  ' + c + '</span>'));
      }
    }
  });

  // 点击终端区聚焦输入
  termOutput.addEventListener('click', function () {
    if (bootDone) termInput.focus();
  });

  /* ================================================================
     页面交互
     ================================================================ */

  const navBar = document.querySelector('.nav-bar');
  window.addEventListener('scroll', function () {
    navBar.style.borderBottomColor = window.scrollY > 80
      ? 'var(--terminal-green-dim)'
      : 'var(--border-color)';
  });

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  window.addEventListener('load', function () {
    document.body.classList.add('loaded');
  });

  console.log(
    '%c ⚡ weicheng.dev - 嵌入式作品集 ',
    'background: #0a0e12; color: #00ff88; padding: 10px 20px; border: 1px solid #00ff88; border-radius: 4px; font-size: 14px;'
  );
  console.log(
    '%c >> 输入 help 试试终端交互 << ',
    'color: #8899aa; font-size: 12px;'
  );

  // 启动！
  runBootSequence();

})();
