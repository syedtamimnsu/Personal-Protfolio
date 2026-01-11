(function () {
  // If your header has id="navbar-collapse-toggle"
  const header = document.getElementById("navbar-collapse-toggle") || document.querySelector("header.header");
  if (!header) return;

  // Function: ensure header is visible
  function forceHeaderVisible() {
    header.classList.remove("hide-header");
    header.style.opacity = "1";
    header.style.visibility = "visible";
    header.style.display = "flex";
    header.style.zIndex = "99999";
  }

  // Watch for slideshow-open class changes anywhere (body/html)
  const targetNodes = [document.body, document.documentElement, document.getElementById("grid-gallery")].filter(Boolean);

  const obs = new MutationObserver(() => {
    const isOpen =
      document.body.classList.contains("slideshow-open") ||
      document.documentElement.classList.contains("slideshow-open") ||
      (document.getElementById("grid-gallery") && document.getElementById("grid-gallery").classList.contains("slideshow-open"));

    if (isOpen) {
      forceHeaderVisible();
    }
  });

  targetNodes.forEach((node) => {
    obs.observe(node, { attributes: true, attributeFilter: ["class"] });
  });

  // Also force on click (instant)
  document.addEventListener("click", function (e) {
    // when clicking a portfolio item, slideshow opens shortly after
    const fig = e.target.closest(".grid li, .grid figure, .grid img");
    if (fig) setTimeout(forceHeaderVisible, 20);
  });

  // On load
  forceHeaderVisible();
})();
