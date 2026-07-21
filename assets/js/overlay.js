
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

    frame.src = url;

    // Browsers do not expose reliable cross-origin iframe blocking details.
    // This timer reveals a fallback message without removing the iframe.
    window.setTimeout(() => {
      const helper = document.querySelector("[data-frame-helper]");
      if (helper) helper.hidden = false;
    }, 3500);
  });
})();
