import { InfoPage } from "@/components/info-page";

export default function FaqPage() {
  return (
    <InfoPage
      label="FAQ"
      title="Les r챕ponses avant d?셞nvoyer une demande."
      intro="Cette page clarifie les demandes les plus fr챕quentes : booking, artistes, marques, d챕lais, suivi et informations 횪 transmettre."
      cta={{ label: "Contacter l?셙gence", href: "/contact" }}
      sections={[
        {
          title: "Comment demander une date ?",
          text: "Il faut envoyer le contexte de l?쇒쯸챕nement, la ville, la date souhait챕e, l?셙rtiste vis챕, le budget indicatif, les horaires et le contact d챕cisionnaire.",
        },
        {
          title: "Un artiste peut-il rejoindre l?셙gence ?",
          text: "Oui, mais la demande doit 챗tre compl챔te : identit챕, sons, r챕seaux, presskit, derni챔res dates, objectifs et besoins pr챕cis.",
        },
        {
          title: "SKORM g챔re-t-elle la communication ?",
          text: "Oui. L?셙ccompagnement peut couvrir image, ligne 챕ditoriale, contenus, calendrier de sorties, r챕seaux sociaux, m챕dias et coh챕rence globale.",
        },
        {
          title: "Les marques peuvent-elles proposer une campagne ?",
          text: "Oui. La demande doit pr챕ciser l?셭bjectif, la cible, le budget, les livrables attendus, le timing et le type d?셙ctivation envisag챕.",
        },
        {
          title: "Quel est le d챕lai de r챕ponse ?",
          text: "Les demandes sont centralis챕es dans le back-office. Les projets urgents doivent indiquer la date limite de r챕ponse d챔s le premier message.",
        },
        {
          title: "Peut-on envoyer des fichiers ?",
          text: "Le formulaire accepte des liens priv챕s vers les fichiers : Drive, Dropbox, WeTransfer, SoundCloud priv챕, presskit ou dossier m챕dia.",
        },
      ]}
    />
  );
}

