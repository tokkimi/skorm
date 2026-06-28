import { InfoPage } from "@/components/info-page";

export default function FaqPage() {
  return (
    <InfoPage
      label="FAQ"
      title="Les r?ponses avant d?envoyer une demande."
      intro="Cette page clarifie les demandes les plus fr?quentes : booking, artistes, marques, d?lais, suivi et informations ? transmettre."
      cta={{ label: "Contacter l?agence", href: "/contact" }}
      sections={[
        {
          title: "Comment demander une date ?",
          text: "Il faut envoyer le contexte de l??v?nement, la ville, la date souhait?e, l?artiste vis?, le budget indicatif, les horaires et le contact d?cisionnaire.",
        },
        {
          title: "Un artiste peut-il rejoindre l?agence ?",
          text: "Oui, mais la demande doit ?tre compl?te : identit?, sons, r?seaux, presskit, derni?res dates, objectifs et besoins pr?cis.",
        },
        {
          title: "SKORM g?re-t-elle la communication ?",
          text: "Oui. L?accompagnement peut couvrir image, ligne ?ditoriale, contenus, calendrier de sorties, r?seaux sociaux, m?dias et coh?rence globale.",
        },
        {
          title: "Les marques peuvent-elles proposer une campagne ?",
          text: "Oui. La demande doit pr?ciser l?objectif, la cible, le budget, les livrables attendus, le timing et le type d?activation envisag?.",
        },
        {
          title: "Quel est le d?lai de r?ponse ?",
          text: "Les demandes sont centralis?es dans le back-office. Les projets urgents doivent indiquer la date limite de r?ponse d?s le premier message.",
        },
        {
          title: "Peut-on envoyer des fichiers ?",
          text: "Le formulaire accepte des liens priv?s vers les fichiers : Drive, Dropbox, WeTransfer, SoundCloud priv?, presskit ou dossier m?dia.",
        },
      ]}
    />
  );
}
