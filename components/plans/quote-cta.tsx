"use client";

import { Link } from "@/i18n/routing";
import { ArrowRight, Sparkles } from "lucide-react";
import { useTranslations } from "next-intl";

const QUOTE_IMAGE = "/images/site/quote.jpg";

export function QuoteCta() {
  const t = useTranslations("quoteCta");

  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-pink-400 px-6 py-10 shadow-[0_20px_60px_rgba(132,204,22,0.25)] sm:rounded-[3rem] sm:p-12 lg:p-16">
      {/* Elementos decorativos de fondo - Estética Material 3 */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-lime-300/60 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-lime-200/50 blur-3xl" />

      <div className="relative grid items-center gap-10 sm:grid-cols-2 sm:gap-16">
        {/* Lado Imagen con enmascarado asimétrico Expressive */}
        <div className="group relative overflow-hidden rounded-3xl sm:rounded-[2rem] sm:rounded-br-[5rem] sm:rounded-tl-[5rem] shadow-2xl">
          <div className="absolute inset-0 z-10 bg-lime-500/20 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
          <img
            src={QUOTE_IMAGE}
            alt={t("imageAlt")}
            className="aspect-[4/3] h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 sm:aspect-square"
          />
        </div>

        {/* Lado Contenido */}
        <div className="flex flex-col justify-center">
          <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-950 text-lime-400 shadow-lg sm:rounded-[1.25rem]">
            <Sparkles className="h-7 w-7" />
          </div>

          <h2 className="font-display text-4xl font-black tracking-tight text-lime-950 sm:text-5xl lg:text-6xl lg:leading-[1.1]">
            {t("title.part1")} <span className="text-white drop-shadow-sm">{t("title.highlight")}</span>
          </h2>
          
          <p className="mt-6 max-w-md text-lg font-medium leading-relaxed text-lime-900/80">
            {t("description")}
          </p>

          <div className="mt-10">
            <Link href={"/planes/personalizado"} className="inline-block">
              <button
                type="button"
                className="group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-pink-600 px-8 py-4 font-sans font-bold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-pink-500 hover:shadow-[0_12px_30px_rgba(236,72,153,0.4)] active:translate-y-0 active:scale-95"
              >
                <span className="relative z-10 text-[15px] uppercase tracking-wider">
                  {t("cta")}
                </span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
                
                {/* Micro-interacción: Halo expansivo en hover */}
                <div className="absolute inset-0 z-0 scale-0 rounded-full bg-pink-400 opacity-0 transition-all duration-500 group-hover:scale-150 group-hover:opacity-20" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}