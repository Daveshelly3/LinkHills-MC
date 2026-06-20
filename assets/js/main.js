/* Link Hills Medical Centre — interactions */
(function () {
  "use strict";

  var header = document.getElementById("header");
  var nav = document.getElementById("nav");
  var navToggle = document.getElementById("navToggle");
  var navBackdrop = document.getElementById("navBackdrop");
  var toTop = document.getElementById("toTop");
  var yearEl = document.getElementById("year");

  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  function closeNav() {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-open");
  }
  if (navToggle) {
    if (navBackdrop) navBackdrop.removeAttribute("hidden");
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      navToggle.classList.toggle("open", open);
      navToggle.setAttribute("aria-expanded", String(open));
      document.body.classList.toggle("nav-open", open);
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    if (navBackdrop) navBackdrop.addEventListener("click", closeNav);
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
  }

  /* Service detail modals */
  var modalRoot = document.getElementById("modalRoot");
  if (modalRoot) {
    var lastFocused = null;
    function openModal(id) {
      var modal = document.getElementById(id);
      if (!modal) return;
      lastFocused = document.activeElement;
      modalRoot.removeAttribute("hidden");
      modal.classList.add("is-open");
      document.body.classList.add("modal-open");
      // force reflow so the transition runs, then fade in
      void modalRoot.offsetWidth;
      modalRoot.classList.add("open");
      var closeBtn = modal.querySelector(".modal__close");
      if (closeBtn) closeBtn.focus();
    }
    function closeModal() {
      var open = modalRoot.querySelector(".modal.is-open");
      modalRoot.classList.remove("open");
      document.body.classList.remove("modal-open");
      window.setTimeout(function () {
        modalRoot.setAttribute("hidden", "");
        if (open) open.classList.remove("is-open");
      }, 250);
      if (lastFocused) lastFocused.focus();
    }
    document.querySelectorAll("[data-modal]").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(btn.getAttribute("data-modal")); });
    });
    modalRoot.querySelectorAll("[data-close]").forEach(function (el) {
      el.addEventListener("click", closeModal);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && !modalRoot.hasAttribute("hidden")) closeModal();
    });
  }

  /* Sticky header shadow + back-to-top visibility */
  function onScroll() {
    var y = window.scrollY || window.pageYOffset;
    header.classList.toggle("is-stuck", y > 10);
    if (toTop) toTop.classList.toggle("show", y > 600);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Active nav link based on section in view */
  var sections = Array.prototype.slice.call(document.querySelectorAll("main section[id]"));
  var navLinks = Array.prototype.slice.call(nav.querySelectorAll("a"));
  var linkFor = {};
  navLinks.forEach(function (l) { linkFor[l.getAttribute("href")] = l; });

  if ("IntersectionObserver" in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove("active"); });
          var link = linkFor["#" + e.target.id];
          if (link) link.classList.add("active");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { spy.observe(s); });

    /* Reveal-on-scroll */
    var revealEls = document.querySelectorAll(
      ".section__head, .card, .doctor, .about__media, .about__content, .hero__card, .trust__item, .booking-card, .accordion__item, .contact__item, .contact__map"
    );
    revealEls.forEach(function (el) { el.classList.add("reveal"); });
    var revObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); obs.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { revObserver.observe(el); });
  }
})();
