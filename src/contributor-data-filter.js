/**
 * Filtre URL data_filter (Experience Builder) — plusieurs couches, même p_id.
 * @see https://doc.arcgis.com/en/experience-builder/latest/build-apps/url-parameters.htm
 */

export const CONTRIBUTOR_DATA_SOURCE_IDS = [
  "dataSource_424-19e02bd072b-layer-4",
  "dataSource_425-19e02bd072b-layer-4",
  "dataSource_425-19e0cee01f6-layer-4",
  "dataSource_425-19e0cefe225-layer-5",
  "dataSource_425-19e0cf0caa9-layer-6",
  "dataSource_425-19e0cf1af3b-layer-7",
  "dataSource_425-19e0cf2b67a-layer-8",
  "dataSource_436-19e172e4a8a-layer-2",
  "dataSource_436-19e173621df-layer-3",
  "dataSource_436-19e17393083-layer-4",
  "dataSource_436-19e173bf7f9-layer-5",
  "dataSource_436-19e174227b6-layer-6",
  "dataSource_450-19e172e4a8a-layer-2",
  "dataSource_451-19e172e4a8a-layer-2",
  "dataSource_451-19e173621df-layer-3",
  "dataSource_451-19e17393083-layer-4",
  "dataSource_451-19e173bf7f9-layer-5",
  "dataSource_451-19e174227b6-layer-6",
];

export function escapeSqlLiteral(value) {
  return value.replace(/'/g, "''");
}

export function buildContributorDataFilterParam(pId) {
  const safe = escapeSqlLiteral(pId);
  const whereClause = "p_id='" + safe + "'";
  const encodedWhere = encodeURIComponent(whereClause);
  return CONTRIBUTOR_DATA_SOURCE_IDS.map(function(dsId) {
    return dsId + ":" + encodedWhere;
  }).join(",");
}

/**
 * Ajoute ou remplace data_filter sur une URL d'expérience, en conservant les autres paramètres de requête.
 * Les virgules entre filtres de couches restent en texte clair (requis par la doc Esri).
 */
export function mergeContributorDataFilterIntoUrl(href, pId) {
  const u = new URL(href);
  const otherParts = [];
  const searchParams = new URLSearchParams(u.search);
  searchParams.forEach(function(value, key) {
    if (key !== "data_filter") {
      otherParts.push(encodeURIComponent(key) + "=" + encodeURIComponent(value));
    }
  });
  const filter = buildContributorDataFilterParam(pId);
  const prefix = otherParts.length ? otherParts.join("&") + "&" : "";
  let result = u.origin + u.pathname;
  if (prefix || filter) {
    result += "?" + prefix + "data_filter=" + filter;
  }
  result += u.hash;
  return result;
}

/**
 * Base URL de l'expérience contributeur : tout avant /page/... (non inclus).
 * VITE_CONTRIBUTOR_EXPERIENCE_URL peut être .../experience/&lt;id&gt; ou .../experience/&lt;id&gt;/page/&lt;Nom&gt;
 */
export function getContributorExperienceBaseUrl(contributorUrl) {
  if (!contributorUrl || typeof contributorUrl !== "string") {
    return "";
  }
  const trimmed = contributorUrl.trim();
  if (!trimmed) {
    return "";
  }
  const u = new URL(trimmed);
  let path = u.pathname.replace(/\/+$/, "");
  const pageIdx = path.indexOf("/page/");
  if (pageIdx !== -1) {
    path = path.slice(0, pageIdx);
  }
  return u.origin + path;
}

/**
 * URL complète d'une page d'expérience : base + /page/ + slug (segments encodés pour les caractères spéciaux).
 */
export function buildContributorExperiencePageUrl(contributorUrl, pageSlug) {
  const base = getContributorExperienceBaseUrl(contributorUrl);
  if (!base) {
    return "";
  }
  const slug = String(pageSlug || "").replace(/^\/+/, "");
  if (!slug) {
    return base;
  }
  const encoded = slug.split("/").map(function(part) {
    return encodeURIComponent(part);
  }).join("/");
  return base + "/page/" + encoded;
}
