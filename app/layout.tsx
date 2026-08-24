import "./globals.css";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import ClientBody from "./[locale]/ClientBody";

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumetra | Escuadrón digital gamer",
  description:
    "Agencia creativa con mentalidad gamer: branding, publicidad digital, redes sociales, desarrollo web, producción audiovisual y consultoría de marketing.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={roboto.variable}
    >
      <head>
      </head>
      <body
        suppressHydrationWarning
        className="antialiased font-sans"
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}