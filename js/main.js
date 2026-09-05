/* BOURGEOIS — ritual motion, email capture UI only. No network. */
(function () {
  "use strict";

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Mobile nav — slow coil open, not a spring */
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".masthead");
  if (toggle && header) {
    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    header.querySelectorAll(".nav-primary a").forEach(function (a) {
      a.addEventListener("click", function () {
        header.classList.remove("nav-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* Reveal — sunrise, not bounce */
  if (!reduce && "IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach(function (el) {
      io.observe(el);
    });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) {
      el.classList.add("is-in");
    });
  }

  /* Enter veil */
  var veil = document.getElementById("enter-veil");
  function openVeil() {
    if (!veil) return;
    veil.classList.add("is-open");
    veil.setAttribute("aria-hidden", "false");
    var first = veil.querySelector("input, button");
    if (first) first.focus();
    document.body.style.overflow = "hidden";
  }
  function closeVeil() {
    if (!veil) return;
    veil.classList.remove("is-open");
    veil.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  document.querySelectorAll("[data-open-enter]").forEach(function (btn) {
    btn.addEventListener("click", openVeil);
  });
  document.querySelectorAll("[data-close-enter]").forEach(function (btn) {
    btn.addEventListener("click", closeVeil);
  });
  if (veil) {
    veil.addEventListener("click", function (e) {
      if (e.target === veil) closeVeil();
    });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") closeVeil();
  });

  /* Email capture — UI only. Nothing leaves the machine. */
  function bindAltar(form) {
    if (!form) return;
    var wrap = form.closest("[data-altar]") || form.parentElement;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = form.querySelector('input[type="email"]');
      if (!email || !email.value) return;
      try {
        var prev = JSON.parse(localStorage.getItem("bourgeois-altar") || "[]");
        if (!Array.isArray(prev)) prev = [];
        prev.push({
          email: email.value,
          name: (form.querySelector('input[name="name"]') || {}).value || "",
          at: new Date().toISOString(),
          page: location.pathname
        });
        localStorage.setItem("bourgeois-altar", JSON.stringify(prev));
      } catch (err) {
        /* storage may be blocked; the rite still completes in the UI */
      }
      form.classList.add("is-done");
      var ok = wrap.querySelector(".form-ok");
      if (ok) ok.classList.add("is-shown");
    });
  }
  document.querySelectorAll("form[data-capture]").forEach(bindAltar);
})();

  /* Light / dark — persisted. Default dark (altar night). */
  (function () {
    var root = document.documentElement;
    var btn = document.querySelector("[data-theme-toggle]");
    var label = document.querySelector("[data-theme-label]");
    function current() {
      return root.getAttribute("data-theme") === "light" ? "light" : "dark";
    }
    function paint(mode) {
      root.setAttribute("data-theme", mode);
      try { localStorage.setItem("bourgeois-theme", mode); } catch (e) {}
      if (label) label.textContent = mode === "light" ? "Dark" : "Light";
      if (btn) {
        btn.setAttribute("aria-label", mode === "light" ? "Switch to dark mode" : "Switch to light mode");
        btn.setAttribute("aria-pressed", mode === "light" ? "true" : "false");
      }
      var meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute("content", mode === "light" ? "#E8DCC8" : "#0B0A09");
    }
    paint(current());
    if (btn) {
      btn.addEventListener("click", function () {
        paint(current() === "light" ? "dark" : "light");
      });
    }
  })();
