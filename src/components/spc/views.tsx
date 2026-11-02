"use client";

import { Hero } from "./hero";
import { Marquee } from "./marquee";
import { About } from "./about";
import { Services } from "./services";
import { ProductGallery } from "./product-gallery";
import { Industries } from "./industries";
import { Technology } from "./technology";
import { Clients } from "./clients";
import { Process } from "./process";
import { WebToPrint } from "./web-to-print";
import { Faq } from "./faq";
import { FinalCta } from "./final-cta";
import { ServicePage } from "./service-page";
import { AboutPage } from "./about-page";
import { PageTransition, useRouter } from "./site-router";
import { SERVICES } from "@/lib/spc";

/** Vista del home (landing completa) */
function HomeView() {
  return (
    <>
      <Hero />
      <Marquee />
      <About />
      <Services />
      <ProductGallery />
      <Industries />
      <Technology />
      <Clients />
      <Process />
      <WebToPrint />
      <Faq />
      <FinalCta />
    </>
  );
}

/** Enrutador de vistas — sitio completo dentro de / */
export function Views() {
  const { route } = useRouter();

  const routeKey =
    route.name === "service" ? `service:${route.id}` : route.name === "about" ? "about" : "home";

  const service = route.name === "service" ? SERVICES.find((s) => s.id === route.id) : undefined;

  return (
    <PageTransition routeKey={routeKey}>
      {route.name === "home" && <HomeView />}
      {route.name === "about" && <AboutPage />}
      {route.name === "service" &&
        (service ? <ServicePage service={service} /> : <HomeView />)}
    </PageTransition>
  );
}
