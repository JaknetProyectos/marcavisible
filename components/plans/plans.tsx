"use client";

import { usePlans } from "@/hooks/use-plans";
import type {
  ResolvedPlanGroup,
  ResolvedPlanSection,
} from "@/hooks/use-plans";

import { Link } from "@/i18n/routing";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import type { Plan } from "@/types/plan";
import { cn } from "@/lib/utils";
import { formatPrice } from "@/lib/format-price";
import { Check, Sparkles, ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

/** Divide un texto con marcadores `**negrita**` en nodos React con resaltado expresivo. */
function renderRichText(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((chunk, index) =>
    chunk.startsWith("**") && chunk.endsWith("**") ? (
      <strong key={index} className="font-bold text-pink-600 dark:text-pink-400">
        {chunk.slice(2, -2)}
      </strong>
    ) : (
      chunk
    ),
  );
}

export function PlanFeatures({ features }: { features: string[] }) {
  if (features.length === 0) return null;

  return (
    <ul className="space-y-3.5">
      {features.map((feature) => (
        <li key={feature} className="flex items-start gap-3 group/item">
          <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-lime-400/20 text-lime-700 transition-transform duration-300 group-hover/item:scale-110">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
          <span className="font-sans text-[15px] leading-relaxed text-zinc-700">
            {renderRichText(feature)}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface PlanPriceProps {
  value: number;
  className?: string;
  suffixClassName?: string;
}

export function PlanPrice({
  value,
  className,
  suffixClassName,
}: PlanPriceProps) {
  const t = useTranslations("plans");

  return (
    <div className={cn("inline-flex items-baseline gap-1.5", className)}>
      <span className="font-display text-2xl font-black tracking-tight text-zinc-900">
        {formatPrice(value)}
      </span>
      <span
        className={cn(
          "rounded-md bg-lime-400/30 px-1.5 py-0.5 font-sans text-xs font-bold text-lime-900 uppercase tracking-wider",
          suffixClassName,
        )}
      >
        {t("vatSuffix")}
      </span>
    </div>
  );
}

interface PlanCardProps {
  plan: Plan;
  variant?: "compact" | "feature";
  className?: string;
}

export function PlanCard({
  plan,
  variant = "compact",
  className,
}: PlanCardProps) {
  const isFeature = variant === "feature";

  return (
    <article
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[2rem] bg-white p-5 transition-all duration-500 ease-out",
        "border border-pink-100/80 shadow-[0_4px_20px_rgba(236,72,153,0.05)]",
        "hover:-translate-y-2 hover:border-pink-300 hover:shadow-[0_20px_40px_rgba(236,72,153,0.12)]",
        isFeature && "p-7 bg-gradient-to-b from-white via-pink-50/20 to-lime-50/20",
        className,
      )}
    >
      {/* Halo de fondo en hover */}
      <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-pink-400/20 to-lime-400/20 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100" />

      <div>
        {/* Imagen del Plan con badge interactivo */}
        <div className="relative overflow-hidden rounded-[1.5rem]">
          <Link href={`/planes/${plan.id}`} className="block">
            <img
              src={plan.image}
              alt={plan.name}
              loading="lazy"
              className={cn(
                "aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105",
                isFeature && "aspect-video",
              )}
            />
          </Link>
          <div className="absolute right-3 top-3 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-lime-400 text-zinc-950 shadow-md">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
        </div>

        {/* Info del Plan */}
        <div className="mt-5 space-y-2">
          <Link href={`/planes/${plan.id}`} className="block">
            <h3
              className={cn(
                "font-display font-black text-zinc-900 transition-colors duration-300 group-hover:text-pink-600",
                isFeature ? "text-2xl uppercase tracking-tight" : "text-lg",
              )}
            >
              {plan.name}
            </h3>
          </Link>

          <PlanPrice value={plan.price} className="pt-1" />
        </div>
      </div>

      {/* Botón de Acción */}
      <div className="mt-6 pt-4 border-t border-zinc-100">
        <AddToCartButton
          plan={plan}
          className={cn(
            "w-full rounded-2xl bg-zinc-900 text-white font-bold transition-all duration-300",
            "hover:bg-pink-600 hover:shadow-lg hover:shadow-pink-500/25 active:scale-95",
            "py-3 text-xs tracking-wider uppercase",
          )}
        />
      </div>
    </article>
  );
}

export function PlanGroupBlock({ group }: { group: ResolvedPlanGroup }) {
  return (
    <section id={group.id} className="scroll-mt-28">
      <div className="flex items-center gap-3 mb-6">
        <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-pink-100 text-pink-600">
          <Sparkles className="h-4 w-4" />
        </span>
        <h3 className="font-display text-xl font-extrabold tracking-tight text-zinc-900 sm:text-2xl">
          {group.title}
        </h3>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {group.plans.map((plan) => (
          <PlanCard key={plan.id} plan={plan} />
        ))}
      </div>
    </section>
  );
}

export function PlanSectionBlock({
  section,
}: {
  section: ResolvedPlanSection;
}) {
  return (
    <section id={section.id} className="scroll-mt-28">
      <div className="relative inline-block mb-10">
        <h2 className="font-display text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
          {section.title}
        </h2>
        {/* Subrayado con estética expresiva Material 3 */}
        <div className="absolute -bottom-2 left-0 h-2 w-full rounded-full bg-gradient-to-r from-pink-500 via-lime-400 to-transparent" />
      </div>

      <div className="space-y-16">
        {section.groups.map((group) => (
          <PlanGroupBlock key={group.id} group={group} />
        ))}
      </div>
    </section>
  );
}

export function PlansCatalog() {
  const { sections } = usePlans();

  return (
    <div className="relative min-h-screen rounded-xl bg-slate-50/50 px-4 py-12 sm:px-6 lg:px-8">
      {/* Elementos decorativos orgánicos de fondo */}
      <div className="pointer-events-none fixed left-1/2 top-0 -z-10 h-[600px] w-full max-w-7xl -translate-x-1/2 overflow-hidden blur-3xl opacity-60">
        <div className="absolute -left-40 top-0 h-96 w-96 rounded-full bg-pink-300/40" />
        <div className="absolute right-0 top-1/4 h-96 w-96 rounded-full bg-lime-300/40" />
      </div>

      <div className="mx-auto max-w-7xl space-y-20">
        {sections.map((section) => (
          <PlanSectionBlock key={section.id} section={section} />
        ))}
      </div>
    </div>
  );
}