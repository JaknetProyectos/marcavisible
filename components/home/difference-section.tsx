import {
  CheckCheck,
  Dices,
  Target,
  TrendingUp,
  Trophy,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

export function DifferenceSection() {
  const t = useTranslations("difference");

  const items: { icon: LucideIcon; key: string }[] = [
    {
      icon: Target,
      key: "strategic",
    },
    {
      icon: TrendingUp,
      key: "flexible",
    },
    {
      icon: Dices,
      key: "creativity",
    },
    {
      icon: CheckCheck,
      key: "adapted",
    },
    {
      icon: Trophy,
      key: "quality",
    },
  ];

  return (
    <section id="diferencia" className="relative bg-white pt-24 pb-28 lg:pt-32 lg:pb-36">
      {/* Waves negras arriba */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[50px] w-[calc(100%+1.3px)] text-black"
        >
          <path
            d="M0,0 L1200,0 L1200,40 C1050,90 850,10 700,50 C550,90 350,10 0,60 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>

      <div className="mx-auto w-full max-w-[1180px] px-5">
        <h2 className="text-center font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
          {t("title")}
        </h2>

        <p className="mx-auto mt-6 max-w-[680px] text-center font-sans text-base leading-relaxed text-neutral-700 sm:text-lg">
          {t("description")}
        </p>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-5 lg:gap-6">
          {items.map(({ icon: Icon, key }) => (
            <div
              key={key}
              className="group rounded-3xl border border-neutral-100 bg-neutral-50/50 p-6 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100/60 transition-all duration-300 group-hover:scale-110 group-hover:bg-lime-200/80">
                <Icon
                  aria-hidden="true"
                  strokeWidth={2}
                  className="h-7 w-7 text-lime-600"
                />
              </div>
              <h3 className="mt-5 font-sans text-lg font-bold leading-snug text-black">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-3 font-sans text-sm leading-relaxed text-neutral-600">
                {t(`items.${key}.text`)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Waves verdes abajo */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[50px] w-[calc(100%+1.3px)] text-lime-50"
        >
          <path
            d="M0,60 C200,110 450,20 650,70 C850,120 1050,30 1200,80 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
}