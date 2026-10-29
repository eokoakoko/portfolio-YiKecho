// 平滑滚动与精准定位
  document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault(); // 阻止原生的一瞬间跳跃
      
      const targetId = this.getAttribute('href');
      const target = document.querySelector(targetId);
      if (!target) return;

      // 计算目标元素距离顶部的绝对高度
      let targetPosition = target.getBoundingClientRect().top + window.scrollY;

      // 特殊处理：避开吸顶导航的遮挡，以及 #about 的留白
            // 特殊处理：首屏直接回到最顶部
      if (targetId === '#top') {
  targetPosition = 0;
} else if (targetId === '#works') {
  targetPosition -= 100;
} else if (targetId === '#about') {
  const aboutHeading = target.querySelector('.about-heading');
  if (aboutHeading) {
    targetPosition =
      aboutHeading.getBoundingClientRect().top + window.scrollY - 80;
  }
} else if (targetId === '#contact') {
  targetPosition -= 50;
}

      // 执行平滑滚动
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });