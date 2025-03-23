/**
 * @version 1.0.1
 * Script for PREM AI.
 */

const MOTION_CONFIG = {
  easeIn: "power2.in",
  easeOut: "power2.Out",
  easeInOut: "power2.inOut",
  durationS: 0.6,
  durationM: 0.8,
  durationL: 1.2,
  durationXL: 1.4,
};

gsap.defaults({
  ease: MOTION_CONFIG.easeOut,
  duration: MOTION_CONFIG.durationM,
});

const BREAKPOINTS = {
  mobile: 479,
  mobileLandscape: 767,
  tablet: 991,
};

const MM = gsap.matchMedia();

function reloadBreakpoints() {
  function getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width <= BREAKPOINTS.mobile) return "mobile";
    if (width <= BREAKPOINTS.mobileLandscape) return "mobileLandscape";
    if (width <= BREAKPOINTS.tablet) return "tablet";
    return "desktop";
  }

  let currentBreakpoint = getCurrentBreakpoint();

  function checkAndReload() {
    const newBreakpoint = getCurrentBreakpoint();
    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;
      location.reload();
    }
  }

  window.addEventListener("resize", checkAndReload);

  window.addEventListener("load", checkAndReload);
}

/*---------------- CURRENT YEAR UPDATE ---------------*/
function updateCurrentYear() {
  // Dynamic update current year
  const currentYear = new Date().getFullYear();
  const currentYearElements = document.querySelectorAll("[data-current-year]");
  if (currentYearElements.lenght === 0) {
    return;
  }
  const currentSymbol = "©";
  currentYearElements.forEach((currentYearElement) => {
    currentYearElement.textContent = currentSymbol + currentYear;
  });
}

/*---------------- FADE ANIMATIONS ---------------*/
function initFadeList() {
  const lists = document.querySelectorAll("[data-fade='list']");

  if (lists.length === 0) {
    return;
  }

  lists.forEach((list) => {
    const items = list.children;
    if (items.length === 0) {
      return;
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        start: "top 90%",
        trigger: list,
      },
    });

    tl.fromTo(
      items,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        stagger: 0.3,
        duration: MOTION_CONFIG.durationXL,
        ease: MOTION_CONFIG.easeOut,
        onComplete: () => {
          // Rafraîchir ScrollTrigger spécifiquement pour les enfants
          // après que l'animation principale soit terminée
          ScrollTrigger.refresh();
        },
      },
    );
  });
}

function initFadeItem() {
  const fadeItems = document.querySelectorAll("[data-fade='item']");

  if (fadeItems.length === 0) {
    return;
  }

  fadeItems.forEach((element) => {
    const delay = element.getAttribute("data-fade-delay");

    // Définir la valeur de start en fonction de la présence de l'attribut
    const startDelay = delay ? `${delay}` : 0;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: "top 90%",
      },
    });

    tl.fromTo(
      element,
      {
        autoAlpha: 0,
      },
      {
        autoAlpha: 1,
        delay: startDelay,
        duration: MOTION_CONFIG.durationM,
        ease: MOTION_CONFIG.easeOut,
        onComplete: () => {
          // Rafraîchir ScrollTrigger spécifiquement pour les enfants
          // après que l'animation principale soit terminée
          ScrollTrigger.refresh();
        },
      },
    );
  });
}

/* ------------------ SPLIT WORDS ---------------*/
function splitWords(text) {
  const splitType = new SplitType(text, {
    types: "words",
    tagName: "span",
  });

  return splitType.words;
}

function initWordsReveal() {
  const paragraph = document.querySelector("[data-paragraph='split-words']");

  if (!paragraph) {
    return;
  }

  const splitedText = splitWords(paragraph);

  tl = gsap.timeline({
    scrollTrigger: {
      trigger: paragraph,
      start: "top center",
      end: "bottom center",
      scrub: 1.2,
    },
  });

  tl.fromTo(
    splitedText,
    {
      autoAlpha: 0.2,
    },
    {
      autoAlpha: 1,
      stagger: 0.1,
      duration: MOTION_CONFIG.durationXL,
      ease: "none",
    },
  );
}

function initParagraphReveal() {
  const paragraph = document.querySelectorAll("[data-paragraph='reveal']");

  if (!paragraph) {
    return;
  }
  scrollTrigger.create({
    trigger: paragraph,
    start: "top 90%",
    end: "bottom center",
    scrub: 1.2,
  });
}

/*---------------- NAV ANIMATION ---------------*/
const nav = document.querySelector("[data-nav='wrapper']");

function initNavScroll() {
  let scrolled = false;

  // Trigger pour détecter quand on passe le hero
  ScrollTrigger.create({
    trigger: ".main-w",
    start: "5vh top",
    onEnter: () => {
      passedHero = true;
      nav.classList.add("is-scrolled");
    },
    onLeaveBack: () => {
      passedHero = false;
      nav.classList.remove("is-scrolled");
    },
  });
}

function initNavMobile() {
  let isOpen = false;

  const btn = document.querySelector("[data-nav='btn']");
  const inner = document.querySelector("[data-nav='mobile-inner']");
  const icon = document.querySelector("[data-nav='btn-icon']");

  const wrapperHeight = {
    open: "auto",
    close: nav.getBoundingClientRect().height + "px",
  };

  let tl = gsap.timeline({ paused: true });

  tl.to(nav, {
    height: wrapperHeight.open,
    duration: MOTION_CONFIG.durationM,
    ease: MOTION_CONFIG.easeInOut,
  });

  tl.to(
    icon,
    {
      rotateZ: 45,
      duration: MOTION_CONFIG.durationS,
      ease: MOTION_CONFIG.easeInOut,
    },
    "<",
  );

  tl.from(
    inner,
    {
      autoAlpha: 0,
      duration: MOTION_CONFIG.durationS,
    },
    "<0.5",
  );

  btn.addEventListener("click", () => {
    nav.classList.toggle("is-open");
    isOpen ? tl.reverse() : tl.play();
    isOpen = !isOpen;
  });
}

function initNavMobileDropdowns() {
  const dropdownBtns = document.querySelectorAll("[data-nav='m-dropdown']");
  if (dropdownBtns.length === 0) {return;}

  dropdownBtns.forEach((dropdownBtn) => {
    const dropdownList = dropdownBtn.querySelector('.nav__btn-dropdown')
    const icon = dropdownBtn.querySelector('.btn__icon')
    dropdownBtn.addEventListener('click', () => {
      dropdownList.classList.toggle('is-closed')
      icon.classList.toggle('is-open')
    })

  })

}

/*---------------- HERO ANIMATIONS ---------------*/
function initHomeHero() {
  const section = document.querySelector("[data-hero='home']");
  if (!section) {
    return;
  }


  const refs = {
    title: section.querySelector('[data-hero="title"]'),
    subtitle: section.querySelector('[data-hero="subtitle"]'),
  };

  titleLines = refs.title.children;

  const tl = gsap.timeline();

  tl.fromTo(
    titleLines,
    { autoAlpha: 0 },
    { autoAlpha: 1, stagger: 0.4, duration: MOTION_CONFIG.durationL },
  );
  tl.fromTo(
    refs.subtitle,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: MOTION_CONFIG.durationL },
  );
}

/* ------------------ TAB  SYSTEM */
function initWorkflowTabs() {
  const wrapper = document.querySelector(".p-workflow__tab-w");
  if (!wrapper) {
    return;
  }

  const refs = {
    btns: wrapper.querySelectorAll(".p-workflow__tab-btn"),
    btnInners: wrapper.querySelectorAll(".p-workflow__btn-inner"),
    tabs: wrapper.querySelectorAll(".p-workflow__tab-content-w"),
  };

  // Définir le premier onglet comme actif par défaut si aucun n'est actif
  if (!wrapper.querySelector(".p-workflow__btn-inner.is-active")) {
    refs.btnInners[0]?.classList.add("is-active");
    refs.tabs[0]?.classList.add("is-active");
  }

  refs.btns.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      if (btn.classList.contains("is-active")) {
        return;
      }

      // Désactiver tous les onglets
      refs.btnInners.forEach((btnInner) =>
        btnInner.classList.remove("is-active"),
      );
      refs.tabs.forEach((tab) => tab.classList.remove("is-active"));

      // Activer l'onglet cliqué
      refs.btnInners[index].classList.add("is-active");
      refs.tabs[index].classList.add("is-active");
    });
  });
}


function initGlobal() {
  reloadBreakpoints();
  document.fonts.ready.then(() => {
    updateCurrentYear();
    initFadeItem();
    initFadeList();
    initWordsReveal();

    // Nav animations
    initNavScroll();
    initNavMobile();
    initNavMobileDropdowns();
    // Init Heros
    initHomeHero();

    initWorkflowTabs();

    gsap.set("[data-visibility]", { visibility: "visible" });
  });
}

initGlobal();
