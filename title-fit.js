document.addEventListener("DOMContentLoaded", () => {
  const titles = document.querySelectorAll(".featured-work .title-text");

  const fitTitle = () => {
    titles.forEach(span => {
      // 1. 先重置变形，获取文字真实的自然宽度
      span.style.transform = "scaleX(1) scaleY(1)";
      const textWidth = span.scrollWidth;
      
      // 2. 获取卡片的宽度，设定可用区域（大概占卡片的 80%）
      const card = span.closest('.featured-work');
      const availableWidth = card.clientWidth * 0.8; 

      let scaleX = 1;
      let scaleY = 1;

      if (textWidth > availableWidth) {
        // --- 太长，放不下：极度压扁、拉高 ---
        scaleX = availableWidth / textWidth;
        scaleY = 1 / scaleX;
        
        // 给个高度上限，防止拉得太长顶出屏幕
        if (scaleY > 2.2) {
          scaleY = 2.2;
          scaleX = availableWidth / textWidth * 1.1;
        }
      } else {
        // --- 长度适中或很短：主动压扁放大 ---
        scaleX = 1.2;
        scaleY = 0.85;
      }

      // 3. 核心：因为我们给父元素 h3 设置了 flex 居中，且设置了这个 span 的 origin 为 center
      // 所以无论怎么缩放，它的中心点都死死钉在卡片的几何正中心
      span.style.transform = `scaleX(${scaleX}) scaleY(${scaleY})`;
    });
  };

  // 执行计算
  fitTitle();
  // 窗口大小改变时重算
  window.addEventListener("resize", fitTitle);
  // 字体加载延迟后重算，确保万无一失
  setTimeout(fitTitle, 200);
  setTimeout(fitTitle, 1000); 
});
