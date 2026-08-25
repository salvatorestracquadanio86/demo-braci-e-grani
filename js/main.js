(function () {
  "use strict";

  /* ---------- Menu mobile ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");

  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    };

    var openNav = function () {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
    };

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.contains("is-open");
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Chiudi il menu quando si clicca un link (utile su mobile)
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    // Chiudi con Esc
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });

    // Se si passa a viewport desktop mentre il menu è aperto, reset
    window.addEventListener("resize", function () {
      if (window.innerWidth >= 900) closeNav();
    });
  }

  /* ---------- Reveal on scroll (rispetta prefers-reduced-motion) ---------- */
  var prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (!prefersReduced && "IntersectionObserver" in window) {
    var revealTargets = document.querySelectorAll(
      ".section-head, .pillar, .step, .card, .check-list, .contact-list"
    );

    revealTargets.forEach(function (el) {
      el.classList.add("reveal");
    });

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  }
})();
