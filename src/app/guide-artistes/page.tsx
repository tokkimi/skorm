import { InfoPage } from "@/components/info-page";

export default function ArtistGuidePage() {
  return (
    <InfoPage
      label="Artistes"
      title="Pr?parer un dossier artiste complet."
      intro="La page de d?p?t sert ? comprendre rapidement ton univers, ton niveau d?avancement et ce que tu attends r?ellement de SKORM."
      cta={{ label: "D?poser un profil artiste", href: "/rejoindre-agence" }}
      sections={[
        {
          title: "Identit? et univers",
          text: "Nom d?artiste, ville, style musical, esth?tique, r?f?rences, direction sc?nique et tout ce qui rend le projet reconnaissable.",
          items: ["nom d?artiste", "style", "bio courte", "ville / pays", "positionnement"],
        },
        {
          title: "R?seaux et pr?sence",
          text: "Les liens permettent d??valuer l?image actuelle, la r?gularit? des contenus, la communaut? et les formats d?j? performants.",
          items: ["Instagram", "TikTok", "YouTube", "Spotify", "SoundCloud"],
        },
        {
          title: "Sons, vocaux et presskit",
          text: "Le formulaire accepte des liens Drive, Dropbox, WeTransfer ou SoundCloud priv?s pour ?couter les d?mos, vocaux, edits et packs presse.",
          items: ["d?mos priv?es", "vocaux", "photos HD", "logo", "EPK / presskit"],
        },
        {
          title: "Dates et objectifs",
          text: "Les derni?res dates, prochaines options et objectifs aident ? savoir s?il faut prioriser booking, image, contenus, marque ou organisation.",
          items: ["dates jou?es", "dates ? venir", "zones vis?es", "besoin de management", "booking Europe"],
        },
      ]}
    />
  );
}
