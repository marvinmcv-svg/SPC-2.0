import { Navbar } from "@/components/spc/navbar";
import { Hero } from "@/components/spc/hero";
import { Marquee } from "@/components/spc/marquee";
import { About } from "@/components/spc/about";
import { Services } from "@/components/spc/services";
import { Industries } from "@/components/spc/industries";
import { Technology } from "@/components/spc/technology";
import { Clients } from "@/components/spc/clients";
import { Process } from "@/components/spc/process";
import { WebToPrint } from "@/components/spc/web-to-print";
import { Faq } from "@/components/spc/faq";
import { FinalCta } from "@/components/spc/final-cta";
import { Footer } from "@/components/spc/footer";
import { WhatsAppWidget } from "@/components/spc/whatsapp-widget";
import { SpcAi } from "@/components/spc/spc-ai";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Industries />
        <Technology />
        <Clients />
        <Process />
        <WebToPrint />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      {/* Funnel CTA — widget original de WhatsApp */}
      <WhatsAppWidget />
      {/* SPC AI — recepcionista virtual que responde las FAQ */}
      <SpcAi />
    </div>
  );
}
