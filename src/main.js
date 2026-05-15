import {
  buildContributorDataFilterParam,
  buildContributorExperiencePageUrl,
} from "./contributor-data-filter.js";
import {
  initExperienceNav,
  setExperienceNavVisible,
  setTopbarEmbedVisible,
} from "./experience-nav.js";

const PUBLIC_EXPERIENCE_URL = import.meta.env.VITE_PUBLIC_EXPERIENCE_URL;
const CONTRIBUTOR_EXPERIENCE_URL = import.meta.env.VITE_CONTRIBUTOR_EXPERIENCE_URL;
const loginContainer = document.getElementById("login-container");
const mapContainer = document.getElementById("map-container");
const experienceFrame = document.getElementById("experienceFrame");
const homeButton = document.getElementById("homeButton");
const topbarMessage = document.getElementById("topbarMessage");

function showError(message) {
  document.getElementById("errorMessage").textContent = message || "";
}

function showTopbarMessage(message) {
  if (topbarMessage) {
    topbarMessage.textContent = message || "";
  }
}

function prefillCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const codeFromUrl = (params.get("code") || "").trim();

  if (codeFromUrl) {
    document.getElementById("pIdInput").value = codeFromUrl;
  }
}

function openExperience(url, mode) {
  loginContainer.style.display = "none";
  mapContainer.style.display = "block";
  experienceFrame.src = url;
  homeButton.classList.add("visible");
  setTopbarEmbedVisible(true);
  setExperienceNavVisible(mode === "contributor");
  experienceFrame.title =
    mode === "public"
      ? "Tableau de bord Épidémosurveillance grand public"
      : mode === "contributor"
        ? "Tableau de bord Épidémosurveillance contributeur"
        : "Tableau cartographique Épidémosurveillance";
}

function returnToHome() {
  showError("");
  showTopbarMessage("");
  mapContainer.style.display = "none";
  loginContainer.style.display = "grid";
  experienceFrame.src = "";
  homeButton.classList.remove("visible");
  setTopbarEmbedVisible(false);
  setExperienceNavVisible(false);
  experienceFrame.title = "Tableau cartographique Épidémosurveillance";
}

function loadContributorExperience() {
  const pId = document.getElementById("pIdInput").value.trim();

  if (!pId) {
    showError("Veuillez entrer un code organisme valide.");
    return;
  }

  if (!CONTRIBUTOR_EXPERIENCE_URL) {
    showError("Configuration manquante : URL contributeur.");
    return;
  }

  showError("");

  const dataFilterValue = buildContributorDataFilterParam(pId);
  const pageUrl = buildContributorExperiencePageUrl(CONTRIBUTOR_EXPERIENCE_URL, "Mildiou-saison");
  const baseForFilter = pageUrl || CONTRIBUTOR_EXPERIENCE_URL;
  const sep = baseForFilter.indexOf("?") === -1 ? "?" : "&";
  const finalUrl = baseForFilter + sep + "data_filter=" + dataFilterValue;
  openExperience(finalUrl, "contributor");
}

function loadPublicExperience() {
  if (!PUBLIC_EXPERIENCE_URL) {
    showError("Configuration manquante : URL grand public.");
    return;
  }

  showError("");
  openExperience(PUBLIC_EXPERIENCE_URL, "public");
}

document.getElementById("publicAccessButton").addEventListener("click", loadPublicExperience);
document.getElementById("accessButton").addEventListener("click", loadContributorExperience);
homeButton.addEventListener("click", returnToHome);
document.getElementById("pIdInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    loadContributorExperience();
  }
});

initExperienceNav({
  experienceFrame: experienceFrame,
  getContributorCode: function() {
    return document.getElementById("pIdInput").value;
  },
  showNavMessage: showTopbarMessage,
});

prefillCodeFromUrl();
