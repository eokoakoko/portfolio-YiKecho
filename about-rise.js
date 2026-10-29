const initAboutAnimations = () => {
  const aboutPoster = document.querySelector("#about");
  if (!aboutPoster) return;

  // 1. VOICE
  gsap.fromTo(".voice-text", 
    { opacity: 0, y: 40, filter: "blur(10px)" },
    {
      scrollTrigger: { trigger: ".voice-block", start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power2.out"
    }
  );

  // 2. CONTENT
  gsap.fromTo(".content-text", 
    { opacity: 0, x: 100 },
    {
      scrollTrigger: { trigger: ".content-block", start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, x: 0, duration: 0.8, ease: "power2.out"
    }
  );

  // 3. AI CREATION
  const aiTl = gsap.timeline({
    scrollTrigger: { trigger: ".ai-block", start: "top 85%", toggleActions: "play none none reverse" }
  });
  aiTl.fromTo(".ai-red", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 })
      .fromTo(".creation-text", { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "-=0.3");

  // 4. SYNTHESIS
  gsap.fromTo(".synthesis-text", 
    { opacity: 0, letterSpacing: "1em" },
    {
      scrollTrigger: { trigger: ".synthesis-block", start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, letterSpacing: "0.2em", duration: 1, ease: "power3.out"
    }
  );

  // 5. EXPERIMENT
  const exTl = gsap.timeline({
    scrollTrigger: { trigger: ".experiment-block", start: "top 85%", toggleActions: "play none none reverse" }
  });
  exTl.fromTo(".ex-left", { opacity: 0, x: -50 }, { opacity: 1, x: 0, duration: 0.6 })
      .fromTo(".ex-right", { opacity: 0, x: 50 }, { opacity: 1, x: 0, duration: 0.6, ease: "power2.out" }, "<");

  // 6. EXECUTION & CONTACT（完全不同的两套特效）
  // 左边：左侧滑入
  gsap.fromTo(".execution-block", 
    { opacity: 0, x: -80 },
    {
      scrollTrigger: { trigger: ".execution-row", start: "top 85%", toggleActions: "play none none reverse" },
      opacity: 1, x: 0, duration: 0.8, ease: "power3.out"
    }
  );

    // 右边：LET'S CONNECT 专属的“深水炸弹”升空特效
  gsap.fromTo(".about-footer-connect", 
    { 
      opacity: 0, 
      y: 100,              // 核心修改：从更深的地方（250px）升起来
      filter: "blur(8px)" // 强烈的初始模糊，像从水底浮出
    }, 
    {
      // 核心修改：直接追踪它自己，只要它一进入屏幕就开始
      scrollTrigger: { 
        trigger: ".about-footer-connect", 
        start: "top 95%", // 刚在底部露头就开始
        toggleActions: "play none none reverse" 
      },
      opacity: 1, 
      y: 0,
      filter: "blur(0px)", 
      duration: 0.6,       // 时间拉长，更具电影感
      delay: 0, 
      ease: "power2.out"   // 减速上浮
    }
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAboutAnimations, {
    once: true
  });
} else {
  initAboutAnimations();
}

window.addEventListener("load", () => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  });
}, { once: true });