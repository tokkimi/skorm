import { InfoPage } from "@/components/info-page";

export default function HowItWorksPage() {
  return (
    <InfoPage
      label="Fonctionnement"
      title="Un accompagnement structur?, sans bruit inutile."
      intro="SKORM agit comme un point central entre l?artiste, les lieux, les marques, les m?dias et les partenaires. L?objectif : clarifier, organiser, d?fendre et faire avancer."
      cta={{ label: "Envoyer une demande", href: "/contact" }}
      sections={[
        {
          title: "Comprendre l?univers",
          text: "Avant d?agir, l?agence analyse le projet : identit? artistique, positionnement, public, ?nergie sc?nique, contenus existants et objectifs prioritaires.",
          items: ["direction artistique", "forces du profil", "rythme de prise de parole", "besoins imm?diats"],
        },
        {
          title: "Organiser le suivi",
          text: "Les dates, options, demandes entrantes, rendez-vous et relances sont centralis?s pour ?viter les oublis et garder une vision claire.",
          items: ["agenda artiste", "notes priv?es", "suivi des demandes", "priorit?s hebdomadaires"],
        },
        {
          title: "D?velopper les opportunit?s",
          text: "SKORM d?fend l?artiste aupr?s des clubs, festivals, marques, m?dias et partenaires avec un discours coh?rent et adapt?.",
          items: ["booking Europe", "partenariats", "campagnes social media", "m?dias et presse"],
        },
        {
          title: "Maintenir la coh?rence",
          text: "L?agence ne remplace pas l?univers de l?artiste : elle l?aide ? devenir plus lisible, plus professionnel et mieux pr?sent?.",
          items: ["image", "contenus", "sorties", "pr?sence en ligne"],
        },
      ]}
    />
  );
}
