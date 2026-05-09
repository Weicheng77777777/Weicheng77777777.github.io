/**
 * 冯威成 · 嵌入式个人作品集
 * 交互脚本
 */

(function() {
  'use strict';

  // ================================================================
  // 1. 导航栏滚动效果
  // ================================================================
  const navBar = document.querySelector('.nav-bar');
  let lastScrollY = 0;

  window.addEventListener('scroll', function() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 80) {
      navBar.style.borderBottomColor = 'var(--terminal-green-dim)';
    } else {
      navBar.style.borderBottomColor = 'var(--border-color)';
    }

    lastScrollY = currentScrollY;
  });

  // ================================================================
  // 2. 卡片悬停效果增强
  // ================================================================
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // CSS 已经处理了 hover 效果
      this.style.transform = 'translateY(-4px)';
    });
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
    });
  });

  // ================================================================
  // 3. 平滑滚动锚点
  // ================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ================================================================
  // 4. 深色/浅色主题切换（可选）
  // ================================================================
  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    
    themeToggle.addEventListener('click', function() {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });

    // 应用保存的主题
    if (savedTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  // ================================================================
  // 5. 复制到剪贴板功能
  // ================================================================
  const copyButtons = document.querySelectorAll('.copy-code');
  copyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      const codeBlock = this.parentElement.querySelector('.code-block');
      const text = codeBlock.innerText;
      
      navigator.clipboard.writeText(text).then(() => {
        const originalText = this.innerText;
        this.innerText = '✓ 已复制';
        setTimeout(() => {
          this.innerText = originalText;
        }, 2000);
      });
    });
  });

  // ================================================================
  // 6. 外链在新标签页打开
  // ================================================================
  document.querySelectorAll('a[target="_blank"]').forEach(link => {
    if (!link.classList.contains('internal')) {
      link.addEventListener('click', function(e) {
        // 已经通过 target="_blank" 处理了
      });
    }
  });

  // ================================================================
  // 7. 页面加载完成动画
  // ================================================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

  // ================================================================
  // 8. 检查是否在移动设备上
  // ================================================================
  const isMobile = window.innerWidth <= 768;
  if (isMobile) {
    document.body.classList.add('mobile');
  }

  window.addEventListener('resize', function() {
    const newIsMobile = window.innerWidth <= 768;
    if (newIsMobile !== isMobile) {
      if (newIsMobile) {
        document.body.classList.add('mobile');
      } else {
        document.body.classList.remove('mobile');
      }
    }
  });

  // ================================================================
  // 5. 平滑滚动
  // ================================================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;

      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // ================================================================
  // 6. 终端欢迎消息
  // ================================================================
  console.log('%c ⚡ weicheng.dev - 嵌入式作品集 ',
    'background: #0a0e12; color: #00ff88; padding: 10px 20px; ' +
    'border: 1px solid #00ff88; border-radius: 4px; font-size: 14px;'
  );
  console.log('%c >> 冯威成 · 嵌入式系统工程师 << ',
    'color: #8899aa; font-size: 12px;'
  );
  console.log('%c >> ARM64 Linux BSP / STM32 / IoT / Hardware Debug << ',
    'color: #556677; font-size: 11px;'
  );

  // ================================================================
  // 7. 检测移动端触摸
  // ================================================================
  if ('ontouchstart' in window) {
    document.body.classList.add('touch-device');
  }

  // ================================================================
  // 8. 页面加载完成后移除 loading 状态
  // ================================================================
  window.addEventListener('load', function() {
    document.body.classList.add('loaded');
  });

})();
