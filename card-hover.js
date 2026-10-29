// card-hover.js
// 强行开启所有设备的 3D 磁吸悬停效果

document.addEventListener("DOMContentLoaded", () => {
  // 只在宽屏设备上启用鼠标跟随（手机端是触摸，本身不需要 hover）
  if (window.matchMedia("(pointer: fine)").matches) {
    const cards = document.querySelectorAll(".featured-work");

    cards.forEach(card => {
      // 给卡片加个 perspective，保证 3D 效果
      card.style.transformStyle = "preserve-3d";
      card.style.perspective = "1000px";

      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // 计算旋转角度 (max 15度)
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(card, {
          rotationX: rotateX,
          rotationY: rotateY,
          scale: 1.05, // 放大 5%
          boxShadow: "0 30px 50px rgba(0, 0, 0, 0.3)", // 阴影加深，产生悬浮感
          duration: 0.5,
          ease: "power2.out",
          overwrite: "auto"
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          scale: 1,
          boxShadow: "0 15px 35px rgba(0, 0, 0, 0.15)",
          duration: 0.8,
          ease: "elastic.out(1, 0.3)", // 弹回的效果，非常丝滑
          overwrite: "auto"
        });
      });
    });
  }
});