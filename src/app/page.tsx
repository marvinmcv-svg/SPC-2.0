import { Navbar } from "@/components/spc/navbar";
import { Hero } from "@/components/spc/hero";
import { Marquee } from "@/components/spc/marquee";
import { About } from "@/components/spc/about";
import { Services } from "@/components/spc/services";
import { Process } from "@/components/spc/process";
import { WebToPrint } from "@/components/spc/web-to-print";
import { FinalCta } from "@/components/spc/final-cta";
import { Footer } from "@/components/spc/footer";
import { WhatsAppWidget } from "@/components/spc/whatsapp-widget";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Process />
        <WebToPrint />
        <FinalCta />
      </main>
      <Footer />
      {/* Funnel CTA — widget original de WhatsApp */}
      <WhatsAppWidget />
    </div>
  );
}
