const PUBLIC_EXPERIENCE_URL = import.meta.env.VITE_PUBLIC_EXPERIENCE_URL;
const CONTRIBUTOR_EXPERIENCE_URL = import.meta.env.VITE_CONTRIBUTOR_EXPERIENCE_URL;
const loginContainer = document.getElementById("login-container");
const mapContainer = document.getElementById("map-container");
const experienceFrame = document.getElementById("experienceFrame");
const homeButton = document.getElementById("homeButton");

function showError(message) {
  document.getElementById("errorMessage").textContent = message || "";
}

function prefillCodeFromUrl() {
  const params = new URLSearchParams(window.location.search);
  const codeFromUrl = (params.get("code") || "").trim();

  if (codeFromUrl) {
    document.getElementById("pIdInput").value = codeFromUrl;
  }
}

function openExperience(url) {
  loginContainer.style.display = "none";
  mapContainer.style.display = "block";
  experienceFrame.src = url;
  homeButton.classList.add("visible");
}

function returnToHome() {
  showError("");
  mapContainer.style.display = "none";
  loginContainer.style.display = "grid";
  experienceFrame.src = "";
  homeButton.classList.remove("visible");
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

  const dataFilter = "dataSource_424-19e02bd072b-layer-4:p_id='" + pId + "'";
  const finalUrl = CONTRIBUTOR_EXPERIENCE_URL + "?data_filter=" + encodeURIComponent(dataFilter);
  openExperience(finalUrl);
}

function loadPublicExperience() {
  if (!PUBLIC_EXPERIENCE_URL) {
    showError("Configuration manquante : URL grand public.");
    return;
  }

  showError("");
  openExperience(PUBLIC_EXPERIENCE_URL);
}

document.getElementById("publicAccessButton").addEventListener("click", loadPublicExperience);
document.getElementById("accessButton").addEventListener("click", loadContributorExperience);
homeButton.addEventListener("click", returnToHome);
document.getElementById("pIdInput").addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    loadContributorExperience();
  }
});

prefillCodeFromUrl();
