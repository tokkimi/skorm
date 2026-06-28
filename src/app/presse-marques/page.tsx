import { InfoPage } from "@/components/info-page";

export default function PressBrandsPage() {
  return (
    <InfoPage
      label="Presse & marques"
      title="Proposer une pr챕sence utile autour des artistes."
      intro="SKORM traite les demandes m챕dias, sponsors, activations 챕v챕nementielles, campagnes de contenus et partenariats de marque."
      cta={{ label: "Envoyer un brief marque", href: "/devenir-sponsor" }}
      sections={[
        {
          title: "Sponsoring",
          text: "Pr챕sence sur une date, soutien de tourn챕e, visibilit챕 autour d?셵n artiste, op챕ration locale ou activation europ챕enne.",
          items: ["objectif", "budget", "territoire", "artiste souhait챕", "timing"],
        },
        {
          title: "Campagnes social media",
          text: "Cr챕ation de contenus, formats courts, relais sur les r챕seaux, teasing de sortie, pr챕sence 챕v챕nementielle ou ambassadeur.",
          items: ["livrables", "plateformes", "droits d?셵sage", "calendrier", "KPI"],
        },
        {
          title: "M챕dias & presse",
          text: "Demandes d?셢nterview, sujets 챕ditoriaux, annonces de dates, communiqu챕s, contenus backstage ou focus artiste.",
          items: ["angle 챕ditorial", "date de publication", "format", "contact r챕daction"],
        },
        {
          title: "S챕lection des projets",
          text: "Les propositions sont filtr챕es selon la coh챕rence avec l?셵nivers artiste, le calendrier, les engagements d챕j횪 pris et la valeur r챕elle du partenariat.",
        },
      ]}
    />
  );
}

