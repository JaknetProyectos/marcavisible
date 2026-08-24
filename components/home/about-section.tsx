"use client";

import { useTranslations } from "next-intl";

const ABOUT_IMAGE = "/images/site/about.jpeg";

export function AboutSection() {
  const t = useTranslations("aboutSection");

  const paragraphs = [
    t("paragraph1"),
    t("paragraph2"),
    t("paragraph3"),
  ];

  return (
    <section className="relative bg-pink-100 pt-20 pb-28 lg:pt-28 lg:pb-36">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-10 px-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:gap-16">
        <div className="overflow-hidden rounded-[32px] shadow-sm transition-transform duration-300 hover:scale-[1.01]">
          <img
            src={ABOUT_IMAGE}
            alt={t("imageAlt")}
            className="h-full w-full object-cover"
          />
        </div>

        <div>
          <h2 className="font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <div className="mt-8 space-y-6">
            {paragraphs.map((text, index) => (
              <p key={index} className="font-sans text-base leading-relaxed text-neutral-800 sm:text-lg">
                {text}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/* Waves negras en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[60px] w-[calc(100%+1.3px)] text-black"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
}