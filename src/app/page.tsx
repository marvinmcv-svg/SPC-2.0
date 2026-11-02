import { Navbar } from "@/components/spc/navbar";
import { Footer } from "@/components/spc/footer";
import { WhatsAppWidget } from "@/components/spc/whatsapp-widget";
import { SpcAi } from "@/components/spc/spc-ai";
import { Views } from "@/components/spc/views";
import { SiteRouter } from "@/components/spc/site-router";
import { LangProvider } from "@/components/spc/lang";

export default function Home() {
  return (
    <LangProvider>
      <SiteRouter>
        <div className="flex min-h-screen flex-col bg-background">
          <Navbar />
          <main className="flex-1">
            <Views />
          </main>
          <Footer />
          {/* Funnel CTA — widget original de WhatsApp */}
          <WhatsAppWidget />
          {/* SPenCer — recepcionista AI que guía al embudo de WhatsApp */}
          <SpcAi />
        </div>
      </SiteRouter>
    </LangProvider>
  );
}
