
(() => {
  const layer = document.getElementById("dot-matrix-layer");
  const works = document.querySelector("#works");
  const about = document.querySelector("#about");

  if (!layer || !works || !about) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  const media = gsap.matchMedia();

  media.add("(max-width: 800px)", () => {
    const cols = 8;
    const rows = 5;

    layer.innerHTML = "";
    layer.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;

    for (let i = 0; i < cols * rows; i++) {
      const dot = document.createElement("div");
      dot.classList.add("dot");
      layer.appendChild(dot);
    }

    const dots = gsap.utils.toArray("#dot-matrix-layer .dot");

    gsap.fromTo(
      dots,
      { opacity: 0, scale: 0, y: 18 },
      {
        scrollTrigger: {
          trigger: works,
          start: "top 85%",
          end: "top 25%",
          scrub: 1,
          invalidateOnRefresh: true
        },
        opacity: 0.72,
        scale: 1,
        y: 0,
        stagger: {
          grid: [rows, cols],
          from: "start",
          each: 0.035
        },
        ease: "power2.out"
      }
    );

    gsap.to(dots, {
      scrollTrigger: {
        trigger: about,
        start: "top 90%",
        end: "bottom 30%",
        scrub: 1.5,
        invalidateOnRefresh: true
      },
      x: () => gsap.utils.random(-35, 35),
      y: () => gsap.utils.random(-35, 35),
      scale: () => gsap.utils.random(0.8, 1.15),
      opacity: 0.16,
      stagger: {
        each: 0.02,
        from: "random"
      },
      ease: "power1.out"
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => ScrollTrigger.refresh());
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === works || trigger.trigger === about) {
          trigger.kill();
        }
      });

      layer.innerHTML = "";
      layer.style.removeProperty("grid-template-columns");
    };
  });
})();
