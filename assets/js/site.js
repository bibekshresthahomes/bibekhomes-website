
(function () {
  const config = window.BIBEK_SITE_CONFIG;

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

  document.addEventListener("DOMContentLoaded", () => {
    applyAgentDetails();
    setYear();
    mobileNavigation();
  });
})();
