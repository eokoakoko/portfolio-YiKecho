
document.addEventListener("DOMContentLoaded", () => {
  const flipLetters = document.querySelectorAll(".flip-letter");

  flipLetters.forEach((letter) => {
    let timeoutId = null;
    let isManual = false;
    let manualAngle = 0; // 记录手动操作时的绝对角度
    const inner = letter.querySelector('.flip-inner');

    const handleFlip = (e) => {
      if (e.type === 'touchstart') e.preventDefault();
      e.stopPropagation();

      if (timeoutId) clearTimeout(timeoutId);

      // 1. 如果当前是自动模式，瞬间接管控制权
      if (!isManual) {
        isManual = true;

        // 获取当前自动动画跑到哪一度了
        const st = window.getComputedStyle(inner);
        const tr = st.getPropertyValue("transform");
        
        if (tr && tr !== "none") {
          const values = tr.split('(')[1].split(')')[0].split(',');
          const a = parseFloat(values[0]);
          const b = parseFloat(values[1]);
          let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
          manualAngle = angle < 0 ? angle + 360 : angle;
        } else {
          manualAngle = 0;
        }

        // 移除 CSS 的无限循环动画，将控制权移交给 JS
        inner.style.animation = 'none';
        void inner.offsetWidth; 
        inner.style.transform = `rotateY(${manualAngle}deg)`;
      }

      // 2. 每次点击累加 180 度
      manualAngle += 180;
      
      // 关键优化：把过渡时间从 0.35s 加长到 0.8s，让它翻得有机械感，不再是“闪”过去
      inner.style.transition = 'transform 0.8s cubic-bezier(.65, 0, .35, 1)';
      inner.style.transform = `rotateY(${manualAngle}deg)`;

      // 3. 3.5 秒后恢复自动翻转
      timeoutId = setTimeout(() => {
        isManual = false;
        
        // --- 核心无缝衔接逻辑 ---
        // 计算当前停留在 0~360 度之间的哪个位置
        const mod = ((manualAngle % 360) + 360) % 360;
        
        // 原动画一圈 8 秒（360度）。所以当前角度对应的动画时间 = (mod / 360) * 8
        // 我们用负数延迟，让动画直接“快进”到当前角度继续播放
        const delay = -(mod / 360) * 8;

        inner.style.transition = 'none'; // 移除过渡
        inner.style.transform = ''; // 清除 JS 设置的角度
        
        // 重新挂载 CSS 动画，并加上计算好的负延迟
        inner.style.animation = `letter-flip 8s cubic-bezier(.65, 0, .35, 1) infinite`;
        inner.style.animationDelay = `${delay}s`;
        
        timeoutId = null;
      }, 3500);
    };

    letter.addEventListener('mousedown', handleFlip);
    letter.addEventListener('touchstart', handleFlip, { passive: false });
  });
});