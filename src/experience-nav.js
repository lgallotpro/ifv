import { experienceNavConfig } from "./experience-nav.config.js";
import {
  mergeContributorDataFilterIntoUrl,
  buildContributorExperiencePageUrl,
} from "./contributor-data-filter.js";

const CONTRIBUTOR_EXPERIENCE_URL = import.meta.env.VITE_CONTRIBUTOR_EXPERIENCE_URL || "";

function resolveNavLinkHref(link) {
  if (link.href) {
    return link.href;
  }
  if (link.page) {
    return buildContributorExperiencePageUrl(CONTRIBUTOR_EXPERIENCE_URL, link.page);
  }
  return "";
}

/**
 * @param {object} options
 * @param {HTMLIFrameElement} options.experienceFrame
 * @param {() => string} options.getContributorCode
 * @param {(message: string) => void} options.showNavMessage
 */
export function initExperienceNav(options) {
  const { experienceFrame, getContributorCode, showNavMessage } = options;

  const topbar = document.querySelector(".topbar");
  const desktopNav = document.getElementById("experienceNavDesktop");
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("navDrawer");
  const drawerBackdrop = document.getElementById("navDrawerBackdrop");
  const drawerClose = document.getElementById("navDrawerClose");

  if (!topbar || !desktopNav || !burger || !drawer) {
    return;
  }

  function closeDrawer() {
    drawer.classList.remove("nav-drawer--open");
    drawer.setAttribute("aria-hidden", "true");
    burger.setAttribute("aria-expanded", "false");
    document.body.classList.remove("nav-drawer-open");
  }

  function openDrawer() {
    drawer.classList.add("nav-drawer--open");
    drawer.setAttribute("aria-hidden", "false");
    burger.setAttribute("aria-expanded", "true");
    document.body.classList.add("nav-drawer-open");
  }

  function toggleDrawer() {
    if (drawer.classList.contains("nav-drawer--open")) {
      closeDrawer();
    } else {
      openDrawer();
    }
  }

  function navigateToLink(href, applyContributorDataFilter) {
    let url = href;
    if (applyContributorDataFilter) {
      const code = getContributorCode().trim();
      if (!code) {
        showNavMessage("Saisissez un code organisme sur l'accueil, ou revenez y pour le renseigner.");
        return;
      }
      showNavMessage("");
      url = mergeContributorDataFilterIntoUrl(href, code);
    } else {
      showNavMessage("");
    }
    experienceFrame.src = url;
    closeDrawer();
    document.querySelectorAll(".nav-category, .nav-drawer__category").forEach(function(cat) {
      cat.removeAttribute("open");
    });
  }

  function createLinkButton(link) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "nav-link-btn";
    btn.textContent = link.label;
    btn.addEventListener("click", function() {
      const href = resolveNavLinkHref(link);
      if (!href) {
        showNavMessage("URL contributeur non configurée (VITE_CONTRIBUTOR_EXPERIENCE_URL).");
        return;
      }
      navigateToLink(href, Boolean(link.applyContributorDataFilter));
    });
    btn.addEventListener("auxclick", function(ev) {
      if (ev.button === 1) {
        ev.preventDefault();
        ev.stopPropagation();
      }
    });
    return btn;
  }

  function buildDesktopNav() {
    desktopNav.innerHTML = "";
    experienceNavConfig.categories.forEach(function(cat) {
      const details = document.createElement("details");
      details.className = "nav-category";

      const summary = document.createElement("summary");
      summary.className = "nav-category__summary";
      summary.textContent = cat.label;

      const panel = document.createElement("div");
      panel.className = "nav-category__panel";
      cat.links.forEach(function(link) {
        panel.appendChild(createLinkButton(link));
      });

      details.appendChild(summary);
      details.appendChild(panel);
      desktopNav.appendChild(details);
    });

    desktopNav.querySelectorAll(".nav-category").forEach(function(detail) {
      detail.addEventListener("toggle", function() {
        if (!detail.open) return;
        desktopNav.querySelectorAll(".nav-category").forEach(function(other) {
          if (other !== detail) {
            other.open = false;
          }
        });
      });
    });
  }

  function buildMobileNav() {
    const mobileRoot = document.getElementById("experienceNavMobile");
    if (!mobileRoot) return;
    mobileRoot.innerHTML = "";
    experienceNavConfig.categories.forEach(function(cat) {
      const details = document.createElement("details");
      details.className = "nav-drawer__category";

      const summary = document.createElement("summary");
      summary.className = "nav-drawer__summary";
      summary.textContent = cat.label;

      const panel = document.createElement("div");
      panel.className = "nav-drawer__links";
      cat.links.forEach(function(link) {
        panel.appendChild(createLinkButton(link));
      });

      details.appendChild(summary);
      details.appendChild(panel);
      mobileRoot.appendChild(details);
    });

    mobileRoot.querySelectorAll(".nav-drawer__category").forEach(function(detail) {
      detail.addEventListener("toggle", function() {
        if (!detail.open) return;
        mobileRoot.querySelectorAll(".nav-drawer__category").forEach(function(other) {
          if (other !== detail) {
            other.open = false;
          }
        });
      });
    });
  }

  buildDesktopNav();
  buildMobileNav();

  burger.addEventListener("click", toggleDrawer);
  if (drawerBackdrop) {
    drawerBackdrop.addEventListener("click", closeDrawer);
  }
  if (drawerClose) {
    drawerClose.addEventListener("click", closeDrawer);
  }

  document.addEventListener("keydown", function(ev) {
    if (ev.key === "Escape" && drawer.classList.contains("nav-drawer--open")) {
      closeDrawer();
      burger.focus();
    }
  });
}

export function setTopbarEmbedVisible(visible) {
  const topbar = document.querySelector(".topbar");
  if (!topbar) return;

  if (visible) {
    topbar.classList.add("topbar--embed");
    document.body.classList.add("topbar-embed-active");
  } else {
    topbar.classList.remove("topbar--embed");
    document.body.classList.remove("topbar-embed-active");
  }
}

export function setExperienceNavVisible(visible) {
  const desktopNav = document.getElementById("experienceNavDesktop");
  const burger = document.getElementById("navBurger");
  const drawer = document.getElementById("navDrawer");
  if (!desktopNav || !burger) return;

  if (visible) {
    desktopNav.hidden = false;
    burger.hidden = false;
  } else {
    desktopNav.hidden = true;
    burger.hidden = true;
    if (drawer) {
      drawer.classList.remove("nav-drawer--open");
      drawer.setAttribute("aria-hidden", "true");
      burger.setAttribute("aria-expanded", "false");
      document.body.classList.remove("nav-drawer-open");
    }
  }
}
