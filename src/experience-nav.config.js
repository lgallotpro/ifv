/**
 * Menu de navigation vers les pages de votre expérience ArcGIS (Experience Builder).
 *
 * Modifiez ce fichier pour ajouter des catégories ou des liens : aucun autre fichier n'est obligatoire.
 *
 * Champs :
 * - id : identifiant stable (lettres/chiffres/tirets), utile pour le style ou le suivi.
 * - label : titre de la catégorie affiché dans le menu.
 * - links : liste de liens.
 *   - label : texte du lien.
 *   - href : URL complète de la page d'expérience (https://experience.arcgis.com/...).
 *   - applyContributorDataFilter : si true, le paramètre data_filter (toutes les couches p_id)
 *     est recalculé à partir du code organisme saisi sur la page d'accueil à chaque clic.
 *     Mettre false pour les pages grand public ou sans filtre contributeur.
 */

export const experienceNavConfig = {
  categories: [
    {
      id: "mildiou",
      label: "Mildiou",
      links: [
        {
          label: "Saison",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Mildiou-saison",
          applyContributorDataFilter: true,
        },
        {
          label: "Semaine",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Mildiou-semaine",
          applyContributorDataFilter: true,
        },
        {
          label: "Cartographie",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Mildiou-cartographie",
          applyContributorDataFilter: true,
        },
        {
          label: "Zones",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Mildiou-comparaison-Zones",
          applyContributorDataFilter: true,
        },
      ],
    },
    {
      id: "oidium",
      label: "Oïdium",
      links: [
        {
          label: "Saison",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/O%C3%AFdium-saison",
          applyContributorDataFilter: true,
        },
        {
          label: "Semaine",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/O%C3%AFdium-semaine",
          applyContributorDataFilter: true,
        },
        {
          label: "Cartographie",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/O%C3%AFdium-cartographie",
          applyContributorDataFilter: true,
        },
        {
          label: "Zones",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/O%C3%AFdium-comparaison-Zones",
          applyContributorDataFilter: true,
        },
      ],
    },
    {
      id: "blackrot",
      label: "Black-rot",
      links: [
        {
          label: "Saison",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Black-rot-saison",
          applyContributorDataFilter: true,
        },
        {
          label: "Documentation",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Black-rot-semaine",
          applyContributorDataFilter: true,
        }, 
        {
          label: "Cartographie",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Black-rot-cartographie",
          applyContributorDataFilter: true,
        },
        {
          label: "Zones",
          href: "https://experience.arcgis.com/experience/4355ed6e5f5147c3979cd4b8315764d0/page/Black-rot-comparaison-Zones",
          applyContributorDataFilter: true,
        },
      ],
    },
  ],
};
