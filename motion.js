/* TEST ONLY — hero entrance + footer reveal */
(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector("header#top");
  const footer = document.querySelector("#contact");

  if (hero) hero.classList.add("motion-hero");

  // 【修改这里】：只给 footer 加，绝对不给 about 和 works 加
  if (footer) footer.classList.add("reveal-on-scroll");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    document.body.classList.add("motion-ready");
    if (footer) footer.classList.add("is-visible");
    return;
  }

  document.body.classList.add("motion-ready");

  if (footer) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -5% 0px"
    });

    observer.observe(footer);
  }
})();