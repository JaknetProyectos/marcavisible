"use client";

import { Link } from "@/i18n/routing";
import { useEffect } from "react";
import { Minus, Plus, ShoppingBag, Trash2, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/cart-context";
import { formatPrice } from "@/lib/format-price";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function CartDrawer() {
  const t = useTranslations("cartDrawer");
  const {
    items,
    itemCount,
    total,
    removeItem,
    updateQuantity,
    clearCart,
    closeCart,
    isOpen
  } = useCart();

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeCart();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeCart]);

  return (
    <>
      {/* Overlay con desenfoque */}
      <div
        onClick={closeCart}
        aria-hidden="true"
        className={cn(
          "fixed inset-0 z-[60] bg-zinc-950/40 backdrop-blur-sm transition-opacity duration-300",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0",
        )}
      />

      {/* Drawer Lateral */}
      <aside
        aria-label={t("ariaLabel")}
        className={cn(
          "fixed right-0 top-0 z-[70] flex h-full w-full max-w-[440px] flex-col bg-white shadow-2xl transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] rounded-l-[2.5rem] border-l border-pink-100 overflow-hidden",
          isOpen ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header con acento rosa */}
        <header className="flex items-center justify-between border-b border-pink-100 bg-pink-50/50 px-8 py-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-600 text-white shadow-md shadow-pink-600/30">
              <ShoppingBag className="h-5 w-5" />
            </span>
            <div>
              <h2 className="font-display text-xl font-black uppercase tracking-tight text-zinc-950">
                {t("title")}
              </h2>
              <p className="font-sans text-xs font-bold uppercase tracking-wider text-pink-700">
                {t("itemCount", { count: itemCount })}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeCart}
            aria-label={t("closeCart")}
            className="rounded-full p-2.5 text-zinc-600 transition-all hover:bg-pink-100 hover:text-pink-600 active:scale-95"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {/* Contenido / Estado Vacío */}
        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
            <span className="flex h-20 w-20 items-center justify-center rounded-[2rem] bg-pink-100 text-pink-600 shadow-inner">
              <ShoppingBag className="h-9 w-9 stroke-[1.75]" />
            </span>
            <div className="space-y-1">
              <p className="font-display text-lg font-bold text-zinc-900">
                {t("emptyTitle")}
              </p>
              <p className="text-sm text-zinc-500 font-medium">
                {t("emptySubtitle")}
              </p>
            </div>
            <Link 
              href="/planes" 
              onClick={closeCart} 
              className="mt-4 inline-flex items-center gap-2 rounded-2xl bg-pink-600 px-7 py-3.5 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-lg shadow-pink-600/30 transition-all hover:bg-pink-500 hover:shadow-xl active:scale-95"
            >
              <span>{t("viewPlans")}</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <>
            {/* Lista de Productos */}
            <div className="flex-1 space-y-4 overflow-y-auto px-6 py-6 scrollbar-thin scrollbar-thumb-pink-200">
              {items.map((item) => (
                <article
                  key={item.product.id}
                  className="group relative flex gap-4 rounded-3xl border border-pink-100 bg-pink-50/30 p-4 transition-all duration-300 hover:bg-white hover:shadow-lg hover:shadow-pink-500/5"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-cover shadow-sm border border-white"
                  />
                  <div className="min-w-0 flex-1 flex flex-col justify-between">
                    <div>
                      <p className="truncate font-display text-base font-bold text-zinc-900">
                        {item.product.name}
                      </p>
                      <p className="truncate font-sans text-[11px] font-bold uppercase tracking-widest text-pink-600">
                        {item.product.groupTitle}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Control de Cantidad Estilo Cápsula */}
                      <div className="flex items-center gap-1.5 rounded-full border border-pink-200 bg-white px-2 py-1 shadow-sm">
                        <button
                          type="button"
                          aria-label={t("decreaseQuantity")}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity - 1)
                          }
                          className="rounded-full p-1 text-zinc-500 transition-colors hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-[18px] text-center font-sans text-xs font-bold text-zinc-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label={t("increaseQuantity")}
                          onClick={() =>
                            updateQuantity(item.product.id, item.quantity + 1)
                          }
                          className="rounded-full p-1 text-zinc-500 transition-colors hover:bg-pink-50 hover:text-pink-600"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>

                      <span className="font-display text-base font-black text-pink-600">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  </div>

                  {/* Botón Eliminar Individual */}
                  <button
                    type="button"
                    aria-label={t("removeItem", { name: item.product.name })}
                    onClick={() => removeItem(item.product.id)}
                    className="absolute right-3 top-3 rounded-full p-2 text-zinc-400 opacity-0 transition-all group-hover:opacity-100 hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>

            {/* Footer con Resumen y Acciones */}
            <footer className="space-y-4 border-t border-pink-100 bg-pink-50/40 px-8 py-6">
              <div className="flex items-baseline justify-between">
                <span className="font-sans text-sm font-bold uppercase tracking-wider text-zinc-600">
                  {t("subtotal")}
                </span>
                <div className="text-right">
                  <span className="font-display text-3xl font-black text-zinc-950">
                    {formatPrice(total)}{" "}
                  </span>
                  <span className="font-sans text-xs font-bold uppercase text-pink-600">
                    {t("vat")}
                  </span>
                </div>
              </div>

              <Link href={"/carrito"} onClick={closeCart} className="block">
                <button
                  type="button"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-pink-600 py-4 font-sans text-sm font-bold uppercase tracking-wider text-white shadow-xl shadow-pink-600/30 transition-all hover:bg-pink-500 active:scale-95"
                >
                  <span>{t("checkout")}</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </button>
              </Link>

              <button
                type="button"
                onClick={clearCart}
                className="w-full font-sans text-xs font-bold uppercase tracking-widest text-zinc-400 transition-colors hover:text-red-500"
              >
                {t("clearCart")}
              </button>
            </footer>
          </>
        )}
      </aside>
    </>
  );
}