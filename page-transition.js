
(() => {
  const HOME = 'portfolio1.html';
  const COLOR = '#B74735';
  const DURATION = 700;
  const EASING = 'cubic-bezier(0.76, 0, 0.24, 1)';
  const ORIGIN = '100% 100%';

  const currentPage = window.location.pathname.split('/').pop();
  const isHome = !currentPage || currentPage === HOME;

  // 只在首页和详情页运行
  const projectPages = [
    'not-alone.html',
    'social-listening.html',
    'nanjing.html',
    'ronghua.html',
    'nanjing-guide.html',
  ];

  if (!isHome && !projectPages.includes(currentPage)) return;

  const overlay = document.createElement('div');
  overlay.id = 'page-transition-overlay';

  Object.assign(overlay.style, {
    position: 'fixed',
    inset: '0',
    zIndex: '99999',
    pointerEvents: 'none',
    background: COLOR,
    clipPath: `circle(0% at ${ORIGIN})`,
    transition: `clip-path ${DURATION}ms ${EASING}`,
  });

  document.body.appendChild(overlay);

  let transitioning = false;

  // 详情页进入时：红色覆盖层收回，露出当前页面
  if (!isHome) {
    overlay.style.clipPath = `circle(220% at ${ORIGIN})`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(0% at ${ORIGIN})`;
      });
    });
  }

  // 判断链接是否指向首页
  function goesHome(link) {
    const url = new URL(link.href, window.location.href);
    return url.origin === window.location.origin &&
      url.pathname.split('/').pop() === HOME;
  }

  // 首页：仅作品卡片触发进入转场
  // 详情页：仅顶部「回到最初」及 Case 1 / Case 5 指定的首页链接触发
  const links = isHome
    ? document.querySelectorAll('#works a.featured-work[href]')
    : document.querySelectorAll(
        '.site-nav .nav-brand[href], .project-nav a[href]'
      );

  links.forEach((link) => {
    link.addEventListener('click', (event) => {
      if (
        transitioning ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        link.target === '_blank'
      ) {
        return;
      }

      // 详情页之间的切换保持原样
      if (!isHome && !goesHome(link)) return;

      event.preventDefault();
      transitioning = true;

      overlay.style.pointerEvents = 'auto';
      overlay.style.transition = `clip-path ${DURATION}ms ${EASING}`;

      requestAnimationFrame(() => {
        overlay.style.clipPath = `circle(220% at ${ORIGIN})`;
      });

      setTimeout(() => {
        window.location.href = link.href;
      }, DURATION + 30);
    });
  });
})();
