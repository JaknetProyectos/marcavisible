"use client";

import { motion } from "framer-motion";
import { Loader2, CreditCard, MapPin, Phone, ShieldCheck } from "lucide-react";
import { useLocaleContext } from "@/context/lang-context";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export const site = {
  name: "Marca Visible",
  tagline: "Estrategia y Concepto Creativo Digital",
  phone: "+52 1 55 5553 0504",
  email: "info@marcavisible.com.mx",
  address:
    "Avenida Tamaulipas 150, Interior 1801 Piso 18, Colonia Hipódromo, Alcaldía Cuauhtémoc, C.P. 06100, Ciudad de México",
} as const;

export const paymentLogos = [
  { alt: "Visa", src: "/images/site/visa.png" },
  { alt: "MasterCard", src: "/images/site/mastercard.png" },
] as const;

export function SiteFooter() {
  const { locale, switchLanguage, isPending } = useLocaleContext();
  const isEs = locale === "es";
  const t = useTranslations("footer");

  const legalLinks = [
    { label: t("legal.privacy"), href: "/legal/privacidad" },
    { label: t("legal.terms"), href: "/legal/terminos" },
    { label: t("legal.refunds"), href: "/legal/reembolsos" },
  ] as const;

  return (
    <footer className="bg-black text-white">
      <div className="mx-auto w-full max-w-[1180px] px-5 py-16">
        {/* Layout Grid 2x2 Responsive */}
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:gap-12">

          {/* Bloque 1: Métodos de Pago */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-pink-500/30">
            <div className="flex items-center gap-2.5 font-sans text-base font-bold text-pink-500">
              <CreditCard className="h-5 w-5" />
              <h3>{t("sections.payments")}</h3>
            </div>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              {paymentLogos.map((logo) => (
                <img
                  key={logo.alt}
                  src={logo.src}
                  alt={logo.alt}
                  className="h-8 w-auto object-contain brightness-95 transition-transform hover:scale-105"
                />
              ))}
            </div>
          </div>

          {/* Bloque 2: Teléfono de Contacto */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-lime-400/30">
            <div className="flex items-center gap-2.5 font-sans text-base font-bold text-lime-400">
              <Phone className="h-5 w-5" />
              <h3>{t("sections.phone")}</h3>
            </div>
            <p className="mt-5 font-sans text-lg font-medium text-neutral-200">
              {site.phone}
            </p>
          </div>

          {/* Bloque 3: Ubicación y Dirección */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-lime-400/30">
            <div className="flex items-center gap-2.5 font-sans text-base font-bold text-lime-400">
              <MapPin className="h-5 w-5" />
              <h3>{t("sections.location")}</h3>
            </div>
            <p className="mt-5 font-sans text-sm leading-relaxed uppercase tracking-wider text-neutral-300">
              {site.address}
            </p>
          </div>

          {/* Bloque 4: Enlaces Legales */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900/50 p-6 transition-all hover:border-pink-500/30">
            <div className="flex items-center gap-2.5 font-sans text-base font-bold text-pink-500">
              <ShieldCheck className="h-5 w-5" />
              <h3>{t("sections.legal")}</h3>
            </div>
            <nav className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-xs uppercase tracking-wider text-neutral-400">
              {legalLinks.map((link, index) => (
                <span key={link.label} className="flex items-center gap-3">
                  <Link
                    href={link.href}
                    className="transition-colors hover:text-white"
                  >
                    {link.label}
                  </Link>
                  {index < legalLinks.length - 1 && (
                    <span className="text-neutral-700">|</span>
                  )}
                </span>
              ))}
            </nav>
          </div>

        </div>

        {/* Botón Flotante para cambiar idioma */}
        <div className="fixed bottom-6 right-6 z-50">
          <button
            type="button"
            onClick={() => switchLanguage(isEs ? "en" : "es")}
            disabled={isPending}
            aria-label={t("switchLanguage")}
            className="group relative flex items-center rounded-full border-2 border-black bg-black p-1.5 shadow-lg transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isPending && (
              <div className="absolute inset-0 z-20 flex items-center justify-center rounded-full bg-black/80">
                <Loader2 className="h-5 w-5 animate-spin text-lime-400" />
              </div>
            )}

            <div className="relative flex items-center font-sans text-xs font-black uppercase tracking-wider">
              <div
                className={`relative z-10 flex h-9 w-12 items-center justify-center transition-colors duration-200 ${
                  isEs ? "text-black" : "text-neutral-400 group-hover:text-white"
                }`}
              >
                <span className="font-extrabold">ES</span>
              </div>

              <div
                className={`relative z-10 flex h-9 w-12 items-center justify-center transition-colors duration-200 ${
                  !isEs ? "text-black" : "text-neutral-400 group-hover:text-white"
                }`}
              >
                <span className="font-extrabold">EN</span>
              </div>

              <motion.div
                className="absolute top-0 bottom-0 z-0 w-12 rounded-full bg-lime-400"
                initial={false}
                animate={{
                  x: isEs ? 0 : 48,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
              />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}