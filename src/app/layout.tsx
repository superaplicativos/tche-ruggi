import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tché Ruggi — Geologiometria | Arte Contemporânea",
  description:
    "Portfolio de Tché Ruggi (Marcelo Dalia Ruggi). Arte contemporânea, abstrata geométrica, esculturas metálicas e Geologiometria. A7MA Galeria, São Paulo.",
  keywords: [
    "Tché Ruggi",
    "arte contemporânea",
    "geometria abstrata",
    "esculturas metálicas",
    "graffiti",
    "A7MA Galeria",
    "São Paulo",
    "Geologiometria",
  ],
  authors: [{ name: "Tché Ruggi" }],
  openGraph: {
    title: "Tché Ruggi — Geologiometria",
    description:
      "Arte contemporânea brasileira. Pinturas, esculturas e gravuras por Tché Ruggi.",
    url: "https://a7ma.art.br",
    siteName: "Tché Ruggi",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
