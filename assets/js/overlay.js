
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

    const resourceNames = {
      searchHomes: "Search East Bay homes",
      homeValue: "Discover your home’s value",
      mortgageCalculator: "Estimate your monthly payment",
      consultation: "Book a real estate consultation",
      schoolSearch: "Explore local schools",
      reviews: "Share your experience",
      blog: "Read real estate insights"
    };
    const resourceCopy = {
      searchHomes: "Browse current listings and property details using Bibek’s official Keller Williams home search.",
      homeValue: "Start with a helpful estimate, then connect with Bibek for a thoughtful pricing and selling strategy.",
      mortgageCalculator: "Explore a possible monthly payment before discussing your budget and next steps with Bibek.",
      consultation: "Choose a convenient time for a personal conversation about buying, selling, or investing.",
      schoolSearch: "Research nearby schools as part of a more informed East Bay home search.",
      reviews: "Tell others about your experience working with Bibek.",
      blog: "Browse Bibek’s Keller Williams articles, guides, and timely real estate information."
    };

    const shell = document.querySelector(".tool-shell .container");
    if (shell) {
      shell.innerHTML = `
        <div class="kw-launch">
          <div class="kw-launch-main">
            <p class="kw-label">Official Keller Williams resource</p>
            <h2>${resourceNames[key] || "Continue to Bibek’s KW resource"}</h2>
            <p>${resourceCopy[key] || "Open Bibek’s official Keller Williams page to continue."}</p>
            <div class="kw-launch-actions">
              <a class="btn" href="${url}" target="_blank" rel="noopener noreferrer">Open KW Tool&nbsp; ↗</a>
              <a class="kw-back" href="../index.html">Back to Bibek Homes</a>
            </div>
            <small>You are opening a secure page managed by Keller Williams.</small>
          </div>
          <aside class="kw-advisor-card">
            <span class="kw-advisor-photo" role="img" aria-label="Bibek Shrestha"></span>
            <p>Need personal guidance?</p>
            <h3>Bibek is here to help.</h3>
            <a href="../book-consultation/index.html">Start a conversation&nbsp; →</a>
          </aside>
        </div>`;
    }
    const helper = document.querySelector("[data-frame-helper]");
    if (helper) helper.hidden = true;
  });
})();
