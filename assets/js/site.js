
(function () {
  const config = window.BIBEK_SITE_CONFIG;
  const siteScriptUrl = document.currentScript && document.currentScript.src;
  const siteRootUrl = siteScriptUrl
    ? new URL("../../", siteScriptUrl)
    : new URL("./", window.location.href);
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

  function addSharedTopbar() {
    const header = document.querySelector(".site-header");
    if (!header || document.querySelector(".site-topbar")) return;
    const topbar = document.createElement("div");
    topbar.className = "site-topbar";
    topbar.innerHTML = `
      <div class="container">
        <span>Serving Walnut Creek, Antioch, Concord, Brentwood &amp; the greater East Bay</span>
        <a href="tel:${config.agent.phoneLink}">Questions? Call <strong>${config.agent.phoneDisplay}</strong></a>
      </div>`;
    header.insertAdjacentElement("beforebegin", topbar);
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

  function normalizeHeaderNavigation() {
    const navbar = document.querySelector(".navbar");
    const brand = navbar && navbar.querySelector(".brand");
    const nav = navbar && navbar.querySelector("[data-main-nav]");
    if (!navbar || !brand || !nav) return;

    brand.href = new URL("index.html", siteRootUrl).href;
    brand.setAttribute("aria-label", "Bibek Shrestha home");

    const links = [
      ["Home", "index.html"],
      ["Buy", "search-homes/index.html"],
      ["Sell", "home-value/index.html"],
      ["About", "about/index.html"],
      ["Contact", "contact/index.php"]
    ];
    const currentPath = window.location.pathname.replace(/\/index\.(?:html|php)$/, "/");
    nav.replaceChildren(...links.map(([label, path]) => {
      const link = document.createElement("a");
      const url = new URL(path, siteRootUrl);
      link.href = url.href;
      link.textContent = label;
      const linkPath = url.pathname.replace(/\/index\.(?:html|php)$/, "/");
      if (currentPath === linkPath) link.setAttribute("aria-current", "page");
      return link;
    }));
    nav.setAttribute("aria-label", "Main navigation");

    const contactAction = navbar.querySelector(".nav-actions a:last-child");
    if (contactAction) contactAction.href = new URL("contact/index.php", siteRootUrl).href;
  }

  function addBrokerageBranding() {
    const navbar = document.querySelector(".navbar");
    const brand = navbar && navbar.querySelector(".brand");
    const nav = navbar && navbar.querySelector("[data-main-nav]");

    if (navbar && brand && !navbar.querySelector(".header-kw-mark")) {
      let brandGroup = navbar.querySelector(".header-brand-group");
      if (!brandGroup) {
        brandGroup = document.createElement("div");
        brandGroup.className = "header-brand-group";
        brand.insertAdjacentElement("beforebegin", brandGroup);
        brandGroup.appendChild(brand);
      }
      const headerMark = document.createElement("a");
      headerMark.className = "header-kw-mark";
      headerMark.href = config.kw.home;
      headerMark.target = "_blank";
      headerMark.rel = "noopener noreferrer";
      headerMark.setAttribute("aria-label", "Keller Williams Walnut Creek East Bay");
      headerMark.innerHTML = `<img src="${kwLogoUrl}" alt="Keller Williams Walnut Creek East Bay">`;
      brandGroup.appendChild(headerMark);
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
    addSharedTopbar();
    applyAgentDetails();
    setYear();
    normalizeHeaderNavigation();
    mobileNavigation();
    addBrokerageBranding();
    businessCardPopup();
  });
})();
