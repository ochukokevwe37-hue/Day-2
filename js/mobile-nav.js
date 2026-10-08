const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const menuBackdrop = document.querySelector(".menu-backdrop");

if (menuToggle && siteNav && menuBackdrop) {
  const mobileQuery = window.matchMedia("(max-width: 768px)");

  function setMenuOpen(isOpen) {
    const wasOpen = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation menu" : "Open navigation menu",
    );
    siteNav.classList.toggle("is-open", isOpen && mobileQuery.matches);
    siteNav.inert = mobileQuery.matches && !isOpen;
    menuBackdrop.hidden = !isOpen || !mobileQuery.matches;
    document.body.classList.toggle("menu-open", isOpen && mobileQuery.matches);

    if (!isOpen && wasOpen && document.activeElement !== menuToggle) {
      menuToggle.focus();
    }
  }

  menuToggle.addEventListener("click", () => {
    setMenuOpen(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  menuBackdrop.addEventListener("click", () => setMenuOpen(false));
  siteNav.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenuOpen(false);
  });

  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      setMenuOpen(false);
      return;
    }

    if (
      event.key === "Tab" &&
      menuToggle.getAttribute("aria-expanded") === "true"
    ) {
      const links = siteNav.querySelectorAll("a[href]");
      const lastLink = links[links.length - 1];

      if (event.shiftKey && document.activeElement === menuToggle) {
        event.preventDefault();
        lastLink.focus();
      } else if (!event.shiftKey && document.activeElement === lastLink) {
        event.preventDefault();
        menuToggle.focus();
      }
    }
  });

  mobileQuery.addEventListener("change", () => setMenuOpen(false));
  setMenuOpen(false);
}
