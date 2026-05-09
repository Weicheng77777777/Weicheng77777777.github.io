/**
 * 冯威成 · 嵌入式个人作品集
 * 交互脚本
 */

(function() {
  'use strict';

  // ================================================================
  // 1. 终端光标闪烁
  // ================================================================
  const cursor = document.querySelector('.cursor');
  if (cursor) {
    // CSS 动画已经处理了闪烁，这里不做额外处理
  }

  // ================================================================
  // 2. 导航栏滚动效果
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
  // 3. 卡片悬停效果增强
  // ================================================================
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      // CSS 已经处理了 hover 效果
    });
  });

  // ================================================================
  // 4. 终端逐行输出动画（手动控制版）
  // ================================================================
  // 如果页面有 .terminal-line，它们已经通过 CSS animation 处理
  // 这里是备用方案，但如果需要更精细控制可以启用

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
