import { InfoPage } from "@/components/info-page";

export default function ArtistGuidePage() {
  return (
    <InfoPage
      label="Artistes"
      title="Pr챕parer un dossier artiste complet."
      intro="La page de dépôt sert à comprendre rapidement ton univers, ton niveau d’avancement et ce que tu attends réellement de SKORM."
      cta={{ label: "D챕poser un profil artiste", href: "/rejoindre-agence" }}
      sections={[
        {
          title: "Identit챕 et univers",
          text: "Nom d?셙rtiste, ville, style musical, esth챕tique, r챕f챕rences, direction sc챕nique et tout ce qui rend le projet reconnaissable.",
          items: ["nom d?셙rtiste", "style", "bio courte", "ville / pays", "positionnement"],
        },
        {
          title: "R챕seaux et pr챕sence",
          text: "Les liens permettent d?쇒쯸aluer l?셢mage actuelle, la r챕gularit챕 des contenus, la communaut챕 et les formats d챕j횪 performants.",
          items: ["Instagram", "TikTok", "YouTube", "Spotify", "SoundCloud"],
        },
        {
          title: "Sons, vocaux et presskit",
          text: "Le formulaire accepte des liens Drive, Dropbox, WeTransfer ou SoundCloud priv챕s pour 챕couter les d챕mos, vocaux, edits et packs presse.",
          items: ["d챕mos priv챕es", "vocaux", "photos HD", "logo", "EPK / presskit"],
        },
        {
          title: "Dates et objectifs",
          text: "Les derni챔res dates, prochaines options et objectifs aident 횪 savoir s?셢l faut prioriser booking, image, contenus, marque ou organisation.",
          items: ["dates jou챕es", "dates 횪 venir", "zones vis챕es", "besoin de management", "booking Europe"],
        },
      ]}
    />
  );
}

