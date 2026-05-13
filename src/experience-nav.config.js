/**
 * Menu de navigation vers les pages de l'expérience contributeur (ArcGIS Experience Builder).
 *
 * Les URLs complètes sont construites à partir de VITE_CONTRIBUTOR_EXPERIENCE_URL (racine
 * .../experience/<id> ou .../experience/<id>/page/... — la partie /page/... est ignorée pour la base).
 *
 * Champs :
 * - id : identifiant stable (lettres/chiffres/tirets).
 * - label : titre de la catégorie.
 * - links :
 *   - label : texte du lien.
 *   - page : nom de page ExB (segment après /page/), ex. "Mildiou-saison", "Oïdium-cartographie".
 *   - href : (optionnel) URL absolue si besoin d'exception hors expérience contributeur.
 *   - applyContributorDataFilter : recalcul du data_filter (p_id) à partir du code organisme.
 */

export const experienceNavConfig = {
  categories: [
    {
      id: "mildiou",
      label: "Mildiou",
      links: [
        { label: "Saison", page: "Mildiou-saison", applyContributorDataFilter: true },
        { label: "Semaine", page: "Mildiou-semaine", applyContributorDataFilter: true },
        { label: "Cartographie", page: "Mildiou-cartographie", applyContributorDataFilter: true },
        { label: "Zones", page: "Mildiou-comparaison-Zones", applyContributorDataFilter: true },
      ],
    },
    {
      id: "oidium",
      label: "Oïdium",
      links: [
        { label: "Saison", page: "Oïdium-saison", applyContributorDataFilter: true },
        { label: "Semaine", page: "Oïdium-semaine", applyContributorDataFilter: true },
        { label: "Cartographie", page: "Oïdium-cartographie", applyContributorDataFilter: true },
        { label: "Zones", page: "Oïdium-comparaison-Zones", applyContributorDataFilter: true },
      ],
    },
    {
      id: "blackrot",
      label: "Black-rot",
      links: [
        { label: "Saison", page: "Black-rot-saison", applyContributorDataFilter: true },
        { label: "Semaine", page: "Black-rot-semaine", applyContributorDataFilter: true },
        { label: "Cartographie", page: "Black-rot-cartographie", applyContributorDataFilter: true },
        { label: "Zones", page: "Black-rot-comparaison-Zones", applyContributorDataFilter: true },
      ],
    },
  ],
};
