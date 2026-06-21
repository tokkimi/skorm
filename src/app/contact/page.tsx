import { Camera } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { PageShell } from "@/components/page-shell";

export default function ContactPage() {
  return (
    <PageShell label="Contact" title="Un projet en tête ?" intro="Booking, marque, presse ou nouvel artiste.">
      <section className="contact-layout">
        <div className="contact-aside glass-panel">
          <p>Une demande claire nous aide à répondre vite.</p>
          <a href="https://www.instagram.com/esterelcommunication/" target="_blank" rel="noreferrer">
            <Camera size={16} /> @esterelcommunication
          </a>
          <small>France / Europe</small>
        </div>
        <ContactForm />
      </section>
    </PageShell>
  );
}
