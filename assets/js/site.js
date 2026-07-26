
(function () {
  const config = window.BIBEK_SITE_CONFIG;
  const siteScriptUrl = document.currentScript && document.currentScript.src;
  const kwLogoUrl = siteScriptUrl
    ? new URL("../images/kw-wc-east-bay-logo.png", siteScriptUrl).href
    : "assets/images/kw-wc-east-bay-logo.png";

  function applyAgentDetails() {
    document.querySelectorAll("[data-agent-name]").forEach(el => el.textContent = config.agent.name);
    document.querySelectorAll("[data-agent-title]").forEach(el => el.textContent = config.agent.title);
    document.querySelectorAll("[data-agent-phone]").forEach(el => el.textContent = config.agent.phoneDisplay);
    document.querySelectorAll("[data-agent-phone-link]").forEach(el => el.href = "tel:" + config.agent.phoneLink);
    document.querySelectorAll("[data-agent-email]").forEach(el => el.textContent = config.agent.email);
    document.querySelectorAll("[data-agent-email-link]").forEach(el => el.href = "mailto:" + config.agent.email);
    document.querySelectorAll("[data-agent-license]").forEach(el => el.textContent = config.agent.license);
    document.querySelectorAll("[data-agent-brokerage]").forEach(el => el.textContent = config.agent.brokerage);
  }

  function setYear() {
    document.querySelectorAll("[data-current-year]").forEach(el => el.textContent = new Date().getFullYear());
  }

  function mobileNavigation() {
    const button = document.querySelector("[data-menu-button]");
    const nav = document.querySelector("[data-main-nav]");
    if (!button || !nav) return;
    button.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      button.setAttribute("aria-expanded", String(open));
    });
  }

  function addBrokerageBranding() {
    const navbar = document.querySelector(".navbar");
    const brand = navbar && navbar.querySelector(".brand");
    const nav = navbar && navbar.querySelector("[data-main-nav]");

    if (navbar && brand && !navbar.querySelector(".header-kw-mark")) {
      const headerMark = document.createElement("a");
      headerMark.className = "header-kw-mark";
      headerMark.href = config.kw.home;
      headerMark.target = "_blank";
      headerMark.rel = "noopener noreferrer";
      headerMark.setAttribute("aria-label", "Keller Williams Walnut Creek East Bay");
      headerMark.innerHTML = `<img src="${kwLogoUrl}" alt="Keller Williams Walnut Creek East Bay">`;
      brand.insertAdjacentElement("afterend", headerMark);
    }

    if (nav && !nav.querySelector(".mobile-kw-mark")) {
      const mobileMark = document.createElement("a");
      mobileMark.className = "mobile-kw-mark";
      mobileMark.href = config.kw.home;
      mobileMark.target = "_blank";
      mobileMark.rel = "noopener noreferrer";
      mobileMark.innerHTML = `<span>Brokered by</span><img src="${kwLogoUrl}" alt="Keller Williams Walnut Creek East Bay">`;
      nav.appendChild(mobileMark);
    }

    const footer = document.querySelector(".site-footer");
    const legal = footer && footer.querySelector(".legal");
    if (footer && legal && !footer.querySelector(".footer-kw-mark")) {
      const footerMark = document.createElement("div");
      footerMark.className = "footer-kw-mark container";
      footerMark.innerHTML = `<span>Brokered by</span><a href="${config.kw.home}" target="_blank" rel="noopener noreferrer"><img src="${kwLogoUrl}" alt="Keller Williams Walnut Creek East Bay"></a>`;
      legal.insertAdjacentElement("beforebegin", footerMark);
    }
  }

  function businessCardPopup() {
    const dialog = document.querySelector("[data-business-card-dialog]");
    const openers = document.querySelectorAll("[data-business-card-open]");
    const closer = document.querySelector("[data-business-card-close]");
    if (!dialog || typeof dialog.showModal !== "function") return;

    const open = () => {
      if (!dialog.open) dialog.showModal();
    };
    const close = () => {
      if (dialog.open) dialog.close();
    };

    openers.forEach(button => button.addEventListener("click", open));
    if (closer) closer.addEventListener("click", close);
    dialog.addEventListener("click", event => {
      if (event.target === dialog) close();
    });

  }

  document.addEventListener("DOMContentLoaded", () => {
    applyAgentDetails();
    setYear();
    mobileNavigation();
    addBrokerageBranding();
    businessCardPopup();
  });
})();
