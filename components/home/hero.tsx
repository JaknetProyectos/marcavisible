"use client";

import { useTranslations } from "next-intl";

const HERO_IMAGE = "/images/site/hero.jpeg";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section className="relative isolate flex min-h-[calc(100vh-80px)] items-center overflow-hidden bg-lime-50">
      {/* Imagen de fondo con opacidad baja para que sea ligeramente visible */}
      <img
        src={HERO_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-15"
      />
      
      {/* Superposición sutil para asegurar legibilidad si la imagen varía */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/5"
      />

      <div className="mx-auto w-full max-w-[1100px] px-5 py-28 text-center">
        {/* H1 con animaciones vibrantes y estilo limpio */}
        <h1 className="animate-fade-up font-sans text-[42px] font-bold leading-[1.05] tracking-tight text-black sm:text-[64px] lg:text-[82px]">
          {t("title")}
        </h1>

        {/* P con animaciones vibrantes y estilo limpio */}
        <p className="animate-fade-up animate-delay-200 mx-auto mt-8 max-w-[720px] font-sans text-[16px] leading-[1.8] text-neutral-800 sm:text-[17px]">
          {t.rich("description", {
            br: () => <br className="hidden sm:block" />,
          })}
        </p>

        {/* Botón opcional para mantener consistencia con el header y flujo */}
        {/*
        <div className="animate-fade-up animate-delay-300 mt-12">
          <a
            href="/planes"
            className="inline-flex items-center justify-center rounded-full bg-lime-400 px-8 py-3.5 text-base font-bold text-black shadow-sm transition-all duration-200 hover:bg-lime-500 active:scale-95"
          >
            {t("cta")}
          </a>
        </div>
        */}

      </div>

      {/* Ondas Rosas en la parte inferior (SVG integrado) */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[60px] w-[calc(100%+1.3px)] text-pink-100"
        >
          <path
            d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
}