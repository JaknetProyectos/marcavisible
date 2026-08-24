"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  ArrowRight,
  AlertCircle,
  Loader2,
  DollarSign,
  Receipt,
  Sparkles,
} from "lucide-react";

import { useCart } from "@/context/cart-context";

export default function CustomProductPage() {
  const t = useTranslations("customPlan");
  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    addItem(
      {
        image: "/etomin.png",
        features: [],
        id: `personalizado`,
        name: `Custom - ${folioUpper}`,
        price: finalPrice,
        intro: "",
        sectionId: "",
        sectionTitle: "",
        groupId: "",
        groupTitle: "",
        groupLabel: ""
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-pink-50 text-zinc-900 overflow-hidden pb-40 pt-28 lg:pt-36 selection:bg-lime-400 selection:text-zinc-950">
      
      {/* Halos de luz de fondo Material Expressive */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[500px] w-[500px] rounded-full bg-pink-300/40 blur-[120px]" />
      <div className="pointer-events-none absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-lime-300/40 blur-[120px]" />

      {/* Contenido Principal */}
      <main className="relative z-10 mx-auto max-w-xl px-4 sm:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.5rem] bg-white p-8 shadow-[0_20px_60px_rgba(236,72,153,0.12)] border border-pink-100 sm:p-12"
        >
          {/* Badge superior con toque expresivo */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-lime-100 px-4 py-1.5 font-sans text-xs font-bold uppercase tracking-widest text-lime-800 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-lime-600" />
            <span>{t("form.badge")}</span>
          </div>

          <div className="mb-8 space-y-2">
            <h1 className="font-display text-3xl font-black uppercase tracking-tight text-zinc-950 sm:text-4xl">
              {t("form.title")}
            </h1>
            <p className="font-sans text-sm font-medium leading-relaxed text-zinc-600">
              {t("authorized.description")}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-900 shadow-sm"
              >
                <AlertCircle className="h-5 w-5 shrink-0 text-red-600" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Input Folio/Cotización */}
            <div className="space-y-2">
              <label
                htmlFor="quoteNumber"
                className="block text-xs font-bold uppercase tracking-wider text-pink-700"
              >
                {t("form.quoteLabel")}
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-pink-400">
                  <Receipt className="h-5 w-5" />
                </div>
                <input
                  id="quoteNumber"
                  type="text"
                  required
                  placeholder={t("form.quotePlaceholder")}
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-pink-200 bg-pink-50/50 pl-12 pr-4 font-mono text-sm font-bold uppercase tracking-widest text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10"
                />
              </div>
            </div>

            {/* Input Monto total */}
            <div className="space-y-2">
              <label
                htmlFor="totalPrice"
                className="block text-xs font-bold uppercase tracking-wider text-pink-700"
              >
                {t("form.amountLabel")}
              </label>

              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-pink-400">
                  <DollarSign className="h-5 w-5 stroke-[2.5]" />
                </div>

                <input
                  id="totalPrice"
                  type="number"
                  required
                  step="0.01"
                  min="0.01"
                  placeholder={t("form.amountPlaceholder")}
                  value={totalPrice}
                  onChange={(e) =>
                    setTotalPrice(
                      e.target.value !== "" ? Number(e.target.value) : ""
                    )
                  }
                  className="h-14 w-full rounded-2xl border border-pink-200 bg-pink-50/50 pl-12 pr-16 font-mono text-base font-bold text-zinc-900 outline-none transition-all placeholder:text-zinc-400 focus:border-pink-500 focus:bg-white focus:ring-4 focus:ring-pink-500/10"
                />

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-4">
                  <span className="rounded-lg bg-zinc-200 px-2 py-1 font-mono text-[11px] font-black text-zinc-700">
                    MXN
                  </span>
                </div>
              </div>

              <p className="text-[11px] font-medium text-zinc-500 pt-1">
                {t("form.taxNote")}
              </p>
            </div>

            {/* Botón de envío Verde Lima Expressive */}
            <div className="pt-4">
              <motion.button
                whileTap={!isAdding ? { scale: 0.98 } : {}}
                type="submit"
                disabled={isAdding}
                className={[
                  "group relative flex h-14 w-full items-center justify-center gap-3 rounded-2xl font-sans text-sm font-bold uppercase tracking-wider transition-all duration-300 shadow-lg",
                  isAdding
                    ? "cursor-not-allowed bg-zinc-200 text-zinc-400 shadow-none"
                    : "bg-lime-400 text-lime-950 hover:bg-lime-500 hover:shadow-lime-400/30 active:scale-95",
                ].join(" ")}
              >
                {isAdding ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin text-lime-950" />
                    <span>{t("buttons.adding")}</span>
                  </>
                ) : (
                  <>
                    <span>{t("buttons.addToCart")}</span>
                    <ArrowRight className="h-5 w-5 stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1" />
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </main>

      {/* Ondas decorativas inferiores inferiores estilizadas */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 z-0 h-36">
        <svg
          className="h-full w-full"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#000000"
            d="M0,192L60,197.3C120,203,240,213,360,192C480,171,600,117,720,112C840,107,960,149,1080,165.3C1200,181,1320,171,1380,165.3L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg>
      </div>

    </div>
  );
}