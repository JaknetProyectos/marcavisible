"use client";

import { Link } from "@/i18n/routing";
import { useState } from "react";
import { ChevronRight, Home, Tag } from "lucide-react";
import {
  AddToCartButton,
  QuantitySelector,
} from "@/components/cart/add-to-cart-button";
import { PlanCard } from "@/components/plans/plans";
import { PlanFeatures } from "@/components/plans/plans";
import { usePlan } from "@/hooks/use-plan";
import { formatPrice } from "@/lib/format-price";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";

export default function PlanDetail() {

  const params = useParams();
  const id = params?.id as string;

  const { plan, related, } = usePlan(id)
  const t = useTranslations("planDetail");
  const [quantity, setQuantity] = useState(1);

  if (!plan) return null;

  return (
    <div className="relative min-h-screen bg-slate-50/50 pb-32 pt-8 overflow-hidden">
      {/* Halos decorativos de fondo */}
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-pink-200/40 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 -z-10 h-[600px] w-[600px] -translate-x-1/3 translate-y-1/4 rounded-full bg-lime-200/40 blur-[100px]" />

      <div className="mx-auto w-full max-w-[1180px] px-5 relative z-10">
        {/* Breadcrumbs estilo "Pill" flotante */}
        <nav
          aria-label={t("breadcrumbsAriaLabel")}
          className="inline-flex items-center gap-2 rounded-full bg-white/70 px-5 py-2.5 font-sans text-[12px] font-bold uppercase tracking-wider text-zinc-500 shadow-sm backdrop-blur-md border border-white"
        >
          <Link
            href="/"
            className="flex items-center gap-1.5 transition-colors hover:text-pink-600"
          >
            <Home className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">{t("breadcrumbs.home")}</span>
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-lime-500" />
          <Link
            href="/planes"
            className="transition-colors hover:text-pink-600"
          >
            {t("breadcrumbs.plans")}
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-lime-500" />
          <span className="text-zinc-900">{plan.name}</span>
        </nav>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-20 items-start">
          {/* Lado Imagen con enmascarado Expressive */}
          <div className="group relative">
            {/* Sombra de color decorativa desplazada */}
            <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-[3rem] bg-lime-300 transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />

            <div className="relative overflow-hidden rounded-[3rem] rounded-tl-[1rem] rounded-br-[1rem] border-[6px] border-white bg-white shadow-xl sm:rounded-[4rem] sm:rounded-tl-[2rem] sm:rounded-br-[2rem]">
              <div className="absolute inset-0 z-10 bg-pink-500/10 mix-blend-overlay transition-opacity duration-500 group-hover:opacity-0" />
              <img
                src={plan.image}
                alt={plan.name}
                className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
            </div>
          </div>

          {/* Lado Contenido */}
          <div className="flex flex-col pt-4">
            <div>
              <p className="inline-flex items-center gap-1.5 rounded-xl bg-pink-100 px-3 py-1 font-sans text-xs font-bold uppercase tracking-widest text-pink-700">
                <Tag className="h-3 w-3" />
                {plan.groupLabel}
              </p>

              <h1 className="mt-5 font-display text-4xl font-black uppercase leading-[1.05] tracking-tight text-zinc-950 sm:text-5xl lg:text-[54px]">
                {plan.name}
              </h1>

              <div className="mt-8 flex items-baseline gap-3 border-y border-zinc-200/60 py-6">
                <p className="font-display text-4xl font-black text-pink-600 sm:text-5xl">
                  {formatPrice(plan.price)}
                </p>
                <span className="rounded-lg bg-lime-400/30 px-2.5 py-1 font-sans text-sm font-bold uppercase tracking-wider text-lime-900">
                  {t("plusTax")}
                </span>
              </div>
            </div>

            {plan.intro && (
              <p className="mt-8 text-lg leading-relaxed text-zinc-700 font-medium">
                {plan.intro}
              </p>
            )}

            <div className="mt-10 rounded-[2rem] bg-white p-8 shadow-[0_8px_30px_rgba(236,72,153,0.06)] border border-pink-50">
              <h2 className="font-display text-2xl font-black text-zinc-900 mb-6 flex items-center gap-3">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                  ✓
                </span>
                {t("whatIncludes")}
              </h2>
              <PlanFeatures features={plan.features} />
            </div>

            {/* Bloque de Acción (Cantidad + Add to Cart) */}
            <div className="mt-10 flex flex-wrap items-center gap-5 rounded-[2rem] bg-zinc-950 p-4 shadow-2xl sm:p-5">
              <div className="flex-shrink-0 bg-white rounded-2xl">
                <QuantitySelector value={quantity} onChange={setQuantity} />
              </div>
              <div className="flex-1 min-w-[200px] [&>button]:!bg-lime-400 [&>button]:!text-lime-950 [&>button]:hover:!bg-lime-500 [&>button]:!font-bold [&>button]:!text-sm [&>button]:!py-4 [&>button]:!rounded-2xl">
                <AddToCartButton plan={plan} quantity={quantity} />
              </div>
            </div>

            <p className="mt-12 inline-flex items-center gap-2 font-sans text-[13px] font-bold uppercase tracking-widest text-zinc-400">
              {t("category")}:
              <Link
                href={`/planes#${plan.groupId}`}
                className="text-zinc-700 underline decoration-pink-300 decoration-2 underline-offset-4 transition-colors hover:text-pink-600 hover:decoration-pink-600"
              >
                {plan.groupLabel}
              </Link>
            </p>
          </div>
        </div>

        {related.length > 0 && (
          <section className="mt-32">
            <div className="relative inline-block mb-12">
              <h2 className="font-display text-3xl font-black tracking-tight text-zinc-950 sm:text-4xl">
                {t("relatedProducts")}
              </h2>
              <div className="absolute -bottom-3 left-0 h-2 w-2/3 rounded-full bg-gradient-to-r from-pink-500 via-lime-400 to-transparent" />
            </div>

            <div className="grid gap-8 sm:grid-cols-2 lg:max-w-[800px]">
              {related.map((item) => (
                <PlanCard key={item.id} plan={item} variant="feature" />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}