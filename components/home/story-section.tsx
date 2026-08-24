"use client";

import { useTranslations } from "next-intl";

const STORY_IMAGE = "/images/site/story.jpeg";

export function StorySection() {
  const t = useTranslations("story");

  const paragraphs = [
    t("paragraph1"),
    t("paragraph2"),
    t("paragraph3"),
  ];

  return (
    <section id="historia" className="relative isolate overflow-hidden bg-black py-24 lg:py-32">
      {/* Imagen de fondo sutil sobre lienzo negro */}
      <img
        src={STORY_IMAGE}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-20"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-black/60"
      />

      <div className="mx-auto w-full max-w-[1060px] px-5 text-center">
        <h2 className="font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-[44px]">
          {t("title")}
        </h2>

        <div className="mt-8 space-y-6">
          {paragraphs.map((text, index) => (
            <p
              key={index}
              className="font-sans text-base leading-relaxed text-neutral-300 sm:text-lg"
            >
              {text}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}