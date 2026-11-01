import type { Metadata, Viewport } from "next";
import { Inter, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const instrument = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SPC Gráfica Industrial — Imprimiendo lo mejor de Bolivia",
  description:
    "SPC Impresores S.A. Líderes de la industria gráfica en Bolivia desde 2001. Packaging de alimentos, farmacéutico y comercial, impresión offset y digital, libros, revistas y Web to Print. Cotiza por WhatsApp.",
  keywords: [
    "SPC Impresores",
    "gráfica industrial Bolivia",
    "packaging Bolivia",
    "impresión offset La Paz",
    "impresión digital",
    "packaging farmacéutico",
    "paper bags",
    "web to print Bolivia",
  ],
  authors: [{ name: "SPC Impresores S.A." }],
  icons: {
    icon: "/spc/favicon.svg",
  },
  openGraph: {
    title: "SPC Gráfica Industrial — Imprimiendo lo mejor de Bolivia",
    description:
      "Líderes de la industria gráfica en Bolivia desde 2001. Packaging, impresión comercial y digital con tecnología de punta.",
    url: "https://www.spc.net.bo",
    siteName: "SPC Gráfica Industrial",
    type: "website",
    locale: "es_BO",
  },
};

export const viewport: Viewport = {
  themeColor: "#11095B",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${instrument.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
