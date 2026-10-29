// 确保 GSAP 和 ScrollTrigger 已经加载
if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);

  // 1. 巨大的英文主标题：向上移动，速度稍微慢一点，并带有略微缩小的感觉
  gsap.to(".hero-wordmark", {
    y: -120,          // 向上移动 120px
    scale: 0.95,      // 稍微缩小一点，产生远离感
    opacity: 0.2,     // 渐渐淡出，让位给下面的作品区
    ease: "none",
    scrollTrigger: {
      trigger: "header#top.hero",
      start: "top top",       // 当首屏顶部碰到视口顶部时开始
      end: "bottom top",      // 当首屏底部碰到视口顶部时结束（即完全滑出）
      scrub: 1                // 平滑跟随滚动条（数值越大越有阻尼感）
    }
  });

  // 2. 底部的小字：移动速度快一点，快速淡出
  gsap.to(".hero-tagline", {
    y: -180,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top.hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // 3. 顶部的小字（INDEPENDENT PORTFOLIO）：向下移动，产生反方向视差
  gsap.to(".hero-topline", {
    y: 80,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top.hero",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });
}