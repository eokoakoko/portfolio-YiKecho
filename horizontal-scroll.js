/* TEST ONLY — horizontal project rail with Stack & Spread */
(() => {
  const works = document.querySelector("#works");
  const pin = document.querySelector("#works .works-pin");
  const track = document.querySelector("#works .works-track");
  const cards = gsap.utils.toArray("#works .featured-work");

  if (!works || !pin || !track || cards.length === 0) return;
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);

  let refreshTimer;

const refreshAfterResize = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.sort();
        ScrollTrigger.refresh();
      });
    });
  }, 250);
};

  window.addEventListener("resize", refreshAfterResize);



  const media = gsap.matchMedia();

  media.add(
    "(min-width: 801px)",
    () => {
      const getDistance = () =>
        Math.max(0, track.scrollWidth - pin.clientWidth);
      
      const scrollStretch = 1.2; 
      // 【核心修复】：把死常量变活函数，防止 title-fit 改变宽度后高度错乱
      const getMainDistance = () => getDistance() * 0.85;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: works,
          start: "top 100px",
          end: () => `+=${600 + 200 + getMainDistance() * scrollStretch + 800 + 400}`, 
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      tl.fromTo(cards, 
        { rotation: (i) => (i % 2 === 0 ? 8 : -8), y: 80, scale: 0.9 },
        { rotation: 0, y: 0, scale: 1, stagger: 0.05, duration: 600, ease: "power1.out" }, 
        0
      );

      tl.to({}, { duration: 200 }, "+=0"); 

      tl.to(track, {
        x: () => -getMainDistance(),
        ease: "none",
        duration: () => getMainDistance() * scrollStretch
      }, ">"); 

      tl.to(track, {
        x: () => -getDistance(),
        ease: "power2.out", 
        duration: 800
      }, ">"); 
      
      tl.to({}, { duration: 400 }); 

      return () => {
  tl.scrollTrigger?.kill();
  tl.kill();

  gsap.set(track, { clearProps: "transform" });
  gsap.set(cards, { clearProps: "transform" });

  cards.forEach(card => {
    card.style.removeProperty("transform");
      });
    };
   }
 );
   const refreshAfterLoad = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });
  };

  if (document.readyState === "complete") {
    refreshAfterLoad();
  } else {
    window.addEventListener("load", refreshAfterLoad, { once: true });
  }
})();