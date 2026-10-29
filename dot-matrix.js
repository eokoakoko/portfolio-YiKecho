
(() => {
  const layer = document.getElementById("dot-matrix-layer");
  const works = document.querySelector("#works");
  const about = document.querySelector("#about");
  const track = document.querySelector("#works .works-track");
  const pin = document.querySelector("#works .works-pin");

  if (!layer || !works || !about || !track || !pin) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const cols = 12;
  const rows = 8;
  const media = gsap.matchMedia();

  media.add("(min-width: 801px)", () => {
    console.log("[dot-matrix] desktop animations initialized", {
      width: window.innerWidth
    });

    layer.innerHTML = "";

    for (let i = 0; i < cols * rows; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      layer.appendChild(dot);
    }

    const dots = gsap.utils.toArray("#dot-matrix-layer .dot");

    // 1. 波点入场
    gsap.fromTo(
      dots,
      { opacity: 0, scale: 0, y: 40 },
      {
        scrollTrigger: {
          trigger: works,
          start: "top bottom",
          end: "top 100px",
          scrub: 1,
          invalidateOnRefresh: true
        },
        opacity: 0.85,
        scale: 1,
        y: 0,
        stagger: {
          grid: [rows, cols],
          from: "start",
          each: 0.06
        },
        ease: "power2.out"
      }
    );

    // 2. About 阶段波点散开
    gsap.to(dots, {
      scrollTrigger: {
        trigger: about,
        start: "top bottom",
        end: "bottom top",
        scrub: 2,
        invalidateOnRefresh: true
      },
      x: () => gsap.utils.random(-100, 100),
      y: () => gsap.utils.random(-100, 100),
      scale: () => gsap.utils.random(1.1, 1.4),
      opacity: 0.2,
      stagger: {
        each: 0.03,
        from: "random"
      },
      ease: "power1.out"
    });

    // 等浏览器完成布局后再刷新坐标
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    // 切换到窄屏时，撤销本次初始化的动画
    return () => {
      layer.innerHTML = "";
      gsap.set(layer, { clearProps: "all" });
    };
  });

  // 页面加载后再次校准
  const refreshAfterLoad = () => {
    requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
  };

  if (document.readyState === "complete") {
    refreshAfterLoad();
  } else {
    window.addEventListener("load", refreshAfterLoad, { once: true });
  }
})();
