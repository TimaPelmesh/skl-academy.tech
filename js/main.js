(function () {
  "use strict";

  async function loadPartial(selector, url) {
    const el = document.querySelector(selector);
    if (!el) return;
    try {
      const res = await fetch(url);
      if (!res.ok) return;
      el.innerHTML = await res.text();
      document.dispatchEvent(new CustomEvent("partial:loaded", { detail: { selector } }));
    } catch (_) {}
  }

  function initNav() {
    const toggle = document.getElementById("navToggle");
    const list = document.getElementById("navList");
    if (!toggle || !list) return;

    toggle.addEventListener("click", () => {
      const open = list.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open);
    });

    list.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        list.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function setActiveNav() {
    const page = document.body.dataset.page;
    if (!page) return;
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === page) {
        link.setAttribute("aria-current", "page");
      }
    });
  }

  function initForm() {
    const form = document.getElementById("contactForm");
    const msg = document.getElementById("formMessage");
    if (!form || !msg) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      msg.textContent = "Заявка принята. Мы свяжемся с вами в ближайшее время.";
      msg.classList.add("is-visible");
      form.reset();
    });
  }

  document.addEventListener("partial:loaded", (e) => {
    if (e.detail.selector === '[data-partial="header"]') {
      initNav();
      setActiveNav();
    }
  });

  loadPartial('[data-partial="header"]', "/partials/header.html");
  loadPartial('[data-partial="footer"]', "/partials/footer.html");
  initForm();
})();