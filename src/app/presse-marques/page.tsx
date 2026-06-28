import { InfoPage } from "@/components/info-page";

export default function PressBrandsPage() {
  return (
    <InfoPage
      label="Presse & marques"
      title="Proposer une pr?sence utile autour des artistes."
      intro="SKORM traite les demandes m?dias, sponsors, activations ?v?nementielles, campagnes de contenus et partenariats de marque."
      cta={{ label: "Envoyer un brief marque", href: "/devenir-sponsor" }}
      sections={[
        {
          title: "Sponsoring",
          text: "Pr?sence sur une date, soutien de tourn?e, visibilit? autour d?un artiste, op?ration locale ou activation europ?enne.",
          items: ["objectif", "budget", "territoire", "artiste souhait?", "timing"],
        },
        {
          title: "Campagnes social media",
          text: "Cr?ation de contenus, formats courts, relais sur les r?seaux, teasing de sortie, pr?sence ?v?nementielle ou ambassadeur.",
          items: ["livrables", "plateformes", "droits d?usage", "calendrier", "KPI"],
        },
        {
          title: "M?dias & presse",
          text: "Demandes d?interview, sujets ?ditoriaux, annonces de dates, communiqu?s, contenus backstage ou focus artiste.",
          items: ["angle ?ditorial", "date de publication", "format", "contact r?daction"],
        },
        {
          title: "S?lection des projets",
          text: "Les propositions sont filtr?es selon la coh?rence avec l?univers artiste, le calendrier, les engagements d?j? pris et la valeur r?elle du partenariat.",
        },
      ]}
    />
  );
}
