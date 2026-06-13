import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "@charcoal-ui/icons";

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");
const topButton = document.getElementById("topButton");
const hero = document.getElementById("home");
const about = document.getElementById("about");
const header = document.querySelector(".header");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

let isPageJumping = false;
let touchStartY = 0;
let pageJumpTimer = 0;

const lenis = prefersReducedMotion
  ? null
  : new Lenis({
      duration: 1.05,
      easing: (time) => 1 - Math.pow(1 - time, 4),
      smoothWheel: true,
      syncTouch: false,
      autoRaf: true
    });

if (lenis && !lenis.options.autoRaf) {
  const raf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(raf);
  };

  requestAnimationFrame(raf);
}

const loader = document.querySelector(".loader");

const finishLoading = () => {
  window.setTimeout(() => {
    // まずロゴをフェードアウト、少し遅れてパネルを開く
    loader?.classList.add("is-out");
    document.body.classList.add("is-loaded");
    window.setTimeout(() => {
      loader?.remove();
    }, 1200);
  }, 1100);
};

if (document.readyState === "complete") {
  finishLoading();
} else {
  window.addEventListener("load", finishLoading, { once: true });
}

// =========================
// Scroll Reveal
// =========================

const revealSelectors = [
  ".section",
  ".about-panel",
  ".news-card",
  ".music-card",
  ".repository-card",
  ".link-card",
  ".contact-panel",
  ".blog-post",
  ".article-inner"
].join(",");

const isArticlePage = Boolean(document.querySelector(".article-page"));
const revealElements = isArticlePage
  ? []
  : Array.from(document.querySelectorAll(revealSelectors)).filter(
      (element) => !element.closest(".hero") && !element.closest(".loader")
    );

revealElements.forEach((element, index) => {
  element.classList.add("reveal-on-scroll");
  element.style.setProperty("--reveal-delay", `${(index % 5) * 42}ms`);
});

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-revealed");
    element.style.removeProperty("--reveal-delay");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-revealed");
        revealObserver.unobserve(entry.target);
      });
    },
    {
      rootMargin: "0px 0px -12%",
      threshold: 0.12
    }
  );

  revealElements.forEach((element) => revealObserver.observe(element));
}

const setMenuOpen = (isOpen) => {
  navMenu?.classList.toggle("active", isOpen);
  document.body.classList.toggle("is-menu-open", isOpen);

  if (menuButton) {
    menuButton.classList.toggle("is-open", isOpen);
    menuButton.setAttribute("aria-expanded", String(isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "メニューを閉じる" : "メニューを開く");
  }
};

menuButton?.addEventListener("click", () => {
  setMenuOpen(!(navMenu?.classList.contains("active") ?? false));
});

document.addEventListener("click", (event) => {
  if (!navMenu?.classList.contains("active")) {
    return;
  }

  const target = event.target;

  if (!(target instanceof Node)) {
    return;
  }

  if (navMenu.contains(target) || menuButton?.contains(target)) {
    return;
  }

  setMenuOpen(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
  }
});

window.addEventListener("resize", () => {
  if (window.matchMedia("(min-width: 901px)").matches) {
    setMenuOpen(false);
  }
});

const updateTopButton = () => {
  if (window.scrollY > 400) {
    topButton?.classList.add("show");
  } else {
    topButton?.classList.remove("show");
  }
};

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    setMenuOpen(false);
  });
});

lenis?.on("scroll", updateTopButton);
window.addEventListener("scroll", updateTopButton);

const scrollToY = (targetY, options = {}) => {
  const { duration = 0.72, lock = false, onComplete } = options;

  if (lenis) {
    lenis.scrollTo(targetY, {
      duration,
      lock,
      onComplete
    });
    return;
  }

  window.scrollTo({
    top: targetY,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
  onComplete?.();
};

const getElementFromHash = (hash) => {
  if (!hash || hash === "#") {
    return null;
  }

  const id = decodeURIComponent(hash.slice(1));
  return document.getElementById(id);
};

const scrollToElement = (target) => {
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const targetTop = target.getBoundingClientRect().top + window.scrollY;
  scrollToY(Math.max(targetTop - headerHeight, 0));
};

document.querySelectorAll('a[href*="#"]:not([target="_blank"])').forEach((link) => {
  link.addEventListener("click", (event) => {
    const url = new URL(link.href, window.location.href);

    if (url.origin !== window.location.origin || url.pathname !== window.location.pathname) {
      return;
    }

    const target = getElementFromHash(url.hash);

    if (!target) {
      return;
    }

    event.preventDefault();
    setMenuOpen(false);
    scrollToElement(target);
  });
});

topButton?.addEventListener("click", () => {
  scrollToY(0);
});

const getAboutTop = () => {
  const headerHeight = header?.getBoundingClientRect().height ?? 0;
  const aboutTop = about?.offsetTop ?? 0;

  return Math.max(aboutTop - headerHeight, 0);
};

const isAtHeroStart = () => Boolean(hero && about && window.scrollY <= 2);

const isAtAboutStart = () => {
  if (!hero || !about) {
    return false;
  }

  return Math.abs(window.scrollY - getAboutTop()) <= 18;
};

const animatePageScroll = (targetY) => {
  if (isPageJumping) {
    return;
  }

  if (Math.abs(targetY - window.scrollY) <= 8) {
    return;
  }

  isPageJumping = true;
  document.body.classList.add("is-page-jumping");

  const completePageJump = () => {
    window.clearTimeout(pageJumpTimer);
    isPageJumping = false;
    document.body.classList.remove("is-page-jumping");
  };

  window.clearTimeout(pageJumpTimer);
  pageJumpTimer = window.setTimeout(completePageJump, prefersReducedMotion ? 0 : 900);

  scrollToY(targetY, {
    duration: prefersReducedMotion ? 0 : 0.46,
    lock: true,
    onComplete: completePageJump
  });
};

const jumpToAbout = () => {
  if (!about || !isAtHeroStart()) {
    return;
  }

  animatePageScroll(getAboutTop());
};

const jumpToHero = () => {
  if (!hero || !isAtAboutStart()) {
    return;
  }

  animatePageScroll(0);
};

window.addEventListener(
  "wheel",
  (event) => {
    if (isPageJumping) {
      event.preventDefault();
      return;
    }

    if (Math.abs(event.deltaY) < 8) {
      return;
    }

    if (event.deltaY > 0 && isAtHeroStart()) {
      event.preventDefault();
      jumpToAbout();
    }

    if (event.deltaY < 0 && isAtAboutStart()) {
      event.preventDefault();
      jumpToHero();
    }
  },
  { passive: false }
);

window.addEventListener(
  "touchstart",
  (event) => {
    touchStartY = event.touches[0]?.clientY ?? 0;
  },
  { passive: true }
);

window.addEventListener(
  "touchmove",
  (event) => {
    if (isPageJumping) {
      event.preventDefault();
      return;
    }

    const touchY = event.touches[0]?.clientY ?? touchStartY;
    const swipeDistance = touchStartY - touchY;

    if (Math.abs(swipeDistance) < 36) {
      return;
    }

    if (swipeDistance > 0 && isAtHeroStart()) {
      event.preventDefault();
      jumpToAbout();
    }

    if (swipeDistance < 0 && isAtAboutStart()) {
      event.preventDefault();
      jumpToHero();
    }
  },
  { passive: false }
);

// =========================
// External Link Modal
// =========================

const extModal = document.getElementById("externalModal");
const extModalUrl = document.getElementById("extModalUrl");
const extModalGo = document.getElementById("extModalGo");
const extModalCancel = document.getElementById("extModalCancel");
const extModalBackdrop = extModal?.querySelector(".ext-modal-backdrop");

const openExtModal = (url) => {
  if (!extModal || !extModalUrl || !extModalGo) return;
  extModalUrl.textContent = url;
  extModalGo.href = url;
  extModal.hidden = false;
  extModalCancel?.focus();
};

const closeExtModal = () => {
  if (!extModal) return;
  extModal.hidden = true;
};

extModalCancel?.addEventListener("click", closeExtModal);
extModalBackdrop?.addEventListener("click", closeExtModal);

extModal?.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeExtModal();
});

document.querySelectorAll('a[target="_blank"]').forEach((link) => {
  link.addEventListener("click", (e) => {
    if (link.id === "extModalGo") return;

    const url = link.getAttribute("href");
    if (!url || url === "#") return;
    e.preventDefault();
    openExtModal(url);
  });
});

// =========================
// Links Toggle
// =========================

const toggleLinks = document.getElementById("toggleLinks");
const moreLinkCards = document.querySelectorAll(".link-card-more");

toggleLinks?.addEventListener("click", () => {
  const isExpanded = toggleLinks.getAttribute("aria-expanded") === "true";

  moreLinkCards.forEach((card) => {
    card.hidden = isExpanded;
  });

  toggleLinks.setAttribute("aria-expanded", String(!isExpanded));
  toggleLinks.textContent = isExpanded ? "続きを表示" : "閉じる";
});

// =========================
// Contact Form
// =========================

const contactForm = document.getElementById("contactForm");

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(contactForm);
  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  const body = [
    name ? `お名前: ${name}` : "",
    email ? `返信先: ${email}` : "",
    "",
    message
  ]
    .filter((line, index) => line || index === 2)
    .join("\n");

  const mailto = new URL("mailto:yunfie168@proton.me");
  mailto.searchParams.set("subject", subject || "お問い合わせ");
  mailto.searchParams.set("body", body);

  window.location.href = mailto.toString();
});

// =========================
// Cookie Consent Banner
// =========================

const COOKIE_KEY = "yunfie_cookie_consent";
const GA_MEASUREMENT_ID = "G-678KKVFQ92";
const cookieBanner = document.getElementById("cookieBanner");
const cookieAccept = document.getElementById("cookieAccept");
const cookieDeny = document.getElementById("cookieDeny");

const enableAnalytics = () => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "granted" });
    window.gtag("config", GA_MEASUREMENT_ID, {
      page_location: window.location.href,
      page_path: window.location.pathname,
      page_title: document.title
    });
  }
};

const disableAnalytics = () => {
  if (typeof window.gtag === "function") {
    window.gtag("consent", "update", { analytics_storage: "denied" });
  }
};

const applyConsent = (granted) => {
  if (granted) {
    enableAnalytics();
    return;
  }

  disableAnalytics();
};

const hideBanner = () => {
  if (cookieBanner) cookieBanner.hidden = true;
  document.body.classList.remove("has-cookie-banner");
};

const showCookieBanner = () => {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  document.body.classList.add("has-cookie-banner");
};

const savedConsent = localStorage.getItem(COOKIE_KEY);

if (savedConsent === null) {
  // 未選択 — ファーストビュー（Hero）を離れてからバナーを表示
  const showBannerWhenReady = () => {
    if (!cookieBanner) return;

    if (!hero) {
      // Heroがないページ（ブログ等）はローダー完了後すぐに表示
      showCookieBanner();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const heroVisible = entries[0]?.isIntersecting ?? true;
        if (!heroVisible) {
          showCookieBanner();
          observer.disconnect();
        }
      },
      { threshold: 0 }
    );

    observer.observe(hero);
  };

  // ローダー完了後に監視を開始
  window.addEventListener("load", () => {
    setTimeout(showBannerWhenReady, 1600);
  });
} else {
  applyConsent(savedConsent === "granted");
}

cookieAccept?.addEventListener("click", () => {
  localStorage.setItem(COOKIE_KEY, "granted");
  applyConsent(true);
  hideBanner();
});

cookieDeny?.addEventListener("click", () => {
  localStorage.setItem(COOKIE_KEY, "denied");
  applyConsent(false);
  hideBanner();
});
