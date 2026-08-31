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
  Triangle,
  Circle,
  Square,
  Hexagon,
  Sparkles
} from "lucide-react";

import { useCart } from "@/context/CartContext";

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
        image: "/logo.png",
        currency: "MXN + IVA",
        features: [],
        id: `custom-quote-${quoteNumber.trim().toLowerCase()}`,
        name: `Custom - ${folioUpper}`,
        price: finalPrice,
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-pink-600 text-slate-900 relative overflow-hidden pb-32 selection:bg-green-500/30 selection:text-green-900">
      
      {/* Capa de íconos flotantes (Fondo Animado) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <motion.div
          animate={{ y: [0, -30, 0], rotate: [0, 45, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-32 left-[10%] text-white/10"
        >
          <Triangle size={100} />
        </motion.div>

        <motion.div
          animate={{ y: [0, 40, 0], rotate: [0, -30, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-20 right-[15%] text-white/10"
        >
          <Circle size={80} />
        </motion.div>

        <motion.div
          animate={{ x: [0, 30, 0], rotate: [0, 90, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-40 left-[20%] text-white/10"
        >
          <Square size={90} />
        </motion.div>

        <motion.div
          animate={{ y: [0, -40, 0], rotate: [0, 60, 0] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
          className="absolute bottom-32 right-[25%] text-white/10"
        >
          <Hexagon size={110} />
        </motion.div>

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-[50%] -translate-x-1/2 text-white/10"
        >
          <Sparkles size={150} />
        </motion.div>
      </div>

      <main className="relative z-10 mx-auto max-w-3xl px-4 pt-32 lg:pt-40">
        {/* Tarjeta del formulario (Fondo Blanco) */}
        <div className="relative overflow-hidden rounded-xl border border-slate-100 bg-white p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/20">
          
          <div className="relative z-10 w-full">
            <div className="mb-8">
              <span className="text-green-600 font-bold uppercase tracking-widest text-xs block mb-2">
                {t("form.badge")}
              </span>

              <h1 className=" text-3xl font-normal tracking-wide text-slate-900 md:text-4xl">
                {t("form.title")}
              </h1>

              <p className="mt-3 text-sm leading-relaxed text-slate-600">
                {t("authorized.description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-pink-50 p-4 text-sm text-pink-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Input Folio/Cotización */}
              <div className="space-y-2">
                <label
                  htmlFor="quoteNumber"
                  className="text-[11px] font-bold uppercase tracking-widest text-slate-700 pl-1"
                >
                  {t("form.quoteLabel")}
                </label>

                <input
                  id="quoteNumber"
                  type="text"
                  required
                  placeholder={t("form.quotePlaceholder")}
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 px-5 text-sm font-mono uppercase tracking-widest text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                />
              </div>

              {/* Input Monto total */}
              <div className="space-y-2">
                <label
                  htmlFor="totalPrice"
                  className="text-[11px] font-bold uppercase tracking-widest text-slate-700 pl-1"
                >
                  {t("form.amountLabel")}
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400">
                    <DollarSign className="h-4 w-4" />
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
                    className="h-14 w-full rounded-xl border border-slate-200 bg-slate-50 pl-11 pr-16 text-sm font-semibold text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                    <span className="text-xs font-bold tracking-wider text-slate-400">
                      MXN
                    </span>
                  </div>
                </div>

                <p className="pl-1 text-[11px] text-slate-500">
                  {t("form.taxNote")}
                </p>
              </div>

              {/* Botón de envío (Azul) */}
              <div className="pt-4">
                <motion.button
                  whileTap={!isAdding ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={isAdding}
                  className={[
                    "group flex h-14 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all duration-300 uppercase tracking-wider",
                    isAdding
                      ? "cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
                      : "bg-green-600 text-white hover:-translate-y-0.5 hover:bg-green-700 shadow-[0_4px_14px_rgba(37,99,235,0.3)]",
                  ].join(" ")}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("buttons.adding")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("buttons.addToCart")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}