import { InfoPage } from "@/components/info-page";

export default function HowItWorksPage() {
  return (
    <InfoPage
      label="Fonctionnement"
      title="Un accompagnement structur챕, sans bruit inutile."
      intro="SKORM agit comme un point central entre l?셙rtiste, les lieux, les marques, les m챕dias et les partenaires. L?셭bjectif : clarifier, organiser, d챕fendre et faire avancer."
      cta={{ label: "Envoyer une demande", href: "/contact" }}
      sections={[
        {
          title: "Comprendre l?셵nivers",
          text: "Avant d?셙gir, l?셙gence analyse le projet : identit챕 artistique, positionnement, public, 챕nergie sc챕nique, contenus existants et objectifs prioritaires.",
          items: ["direction artistique", "forces du profil", "rythme de prise de parole", "besoins imm챕diats"],
        },
        {
          title: "Organiser le suivi",
          text: "Les dates, options, demandes entrantes, rendez-vous et relances sont centralis챕s pour 챕viter les oublis et garder une vision claire.",
          items: ["agenda artiste", "notes priv챕es", "suivi des demandes", "priorit챕s hebdomadaires"],
        },
        {
          title: "D챕velopper les opportunit챕s",
          text: "SKORM d챕fend l?셙rtiste aupr챔s des clubs, festivals, marques, m챕dias et partenaires avec un discours coh챕rent et adapt챕.",
          items: ["booking Europe", "partenariats", "campagnes social media", "m챕dias et presse"],
        },
        {
          title: "Maintenir la coh챕rence",
          text: "L?셙gence ne remplace pas l?셵nivers de l?셙rtiste : elle l?셙ide 횪 devenir plus lisible, plus professionnel et mieux pr챕sent챕.",
          items: ["image", "contenus", "sorties", "pr챕sence en ligne"],
        },
      ]}
    />
  );
}

