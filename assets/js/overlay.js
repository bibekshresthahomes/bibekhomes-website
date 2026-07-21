
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const config = window.BIBEK_SITE_CONFIG;
    const root = document.querySelector("[data-kw-tool]");
    if (!root) return;

    const key = root.dataset.kwTool;
    const url = config.kw[key];
    const frame = document.querySelector("[data-kw-frame]");
    const openLinks = document.querySelectorAll("[data-open-kw]");
    const notice = document.querySelector("[data-frame-notice]");
    const frameLabel = document.querySelector("[data-frame-domain]");

    if (frameLabel && url) {
      try { frameLabel.textContent = new URL(url).hostname; } catch (_) {}
    }

    openLinks.forEach(link => {
      link.href = url || config.kw.home;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
    });

    if (!url || !frame) {
      if (frame) frame.style.display = "none";
      if (notice) notice.classList.add("show");
      return;
    }

    // Keep Bibek's personal site visually consistent. KW tools open on their
    // official secure pages instead of being squeezed into a cross-site frame.
    frame.remove();
    if (notice) {
      const title = notice.querySelector("h2");
      const copy = notice.querySelector("p");
      if (title) title.textContent = "Continue with Bibek’s official KW tool";
      if (copy) copy.textContent = "You’ll open Bibek’s secure Keller Williams resource in a new tab, then return here whenever you need personal guidance.";
      notice.classList.add("show");
    }
    const helper = document.querySelector("[data-frame-helper]");
    if (helper) helper.hidden = true;
  });
})();
