// project-hero-parallax.js
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  
  gsap.registerPlugin(ScrollTrigger);

  // 确保首屏存在才执行
  const header = document.querySelector("header#top");
  if (!header) return;

  // 1. 大标题 (h1)：向上缓慢移动，微微缩小，逐渐淡出
  gsap.to("header h1", {
    y: -120,
    scale: 0.95,
    opacity: 0.1,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top",
      start: "top top", 
      end: "bottom top", 
      scrub: 1.2 // 稍微加点阻尼感
    }
  });

  // 2. 简介文字 (.intro)：向上加速移动并淡出
  gsap.to("header .intro", {
    y: -200,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // 3. 标签 (.hero-meta)：更快速地向上飞出
  gsap.to("header .hero-meta", {
    y: -300,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

  // 4. 顶端小字 (.eyebrow)：反向移动（向下），制造空间错落感
  gsap.to("header .eyebrow", {
    y: 80,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: "header#top",
      start: "top top",
      end: "bottom top",
      scrub: 1
    }
  });

   // 5. 底部的概述区域 (#overview)：从下方大幅度升起，形成强烈的“顶上来”的感觉
  gsap.fromTo("#overview", 
    { 
      y: 150,         // 核心修改：从 50px 放大到 150px，直接沉下去
      opacity: 0.3,   // 初始半透明
      scale: 0.98     // 初始微微缩小
    }, 
    {
      y: 0,
      opacity: 1,
      scale: 1,
      ease: "none",
      scrollTrigger: {
        trigger: "header#top",
        start: "top top",
        end: "bottom top",
        scrub: 1
      }
    }
  );
});