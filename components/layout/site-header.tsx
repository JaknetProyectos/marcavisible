"use client";

import { Link } from "@/i18n/routing";
import { useEffect, useState } from "react";
import { Menu, ShoppingBag, X, Sparkles } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { useCart } from "@/context/cart-context";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

export function SiteHeader() {
  const t = useTranslations("header");
  const { itemCount, setIsOpen } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { label: t("nav.home"), href: "/" },
    { label: t("nav.history"), href: "/#historia" },
    { label: t("nav.difference"), href: "/#diferencia" },
    { label: t("nav.contact"), href: "/#contacto" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 bg-white transition-all duration-300",
        scrolled
          ? "shadow-[0_4px_20px_rgba(0,0,0,0.06)] border-b border-neutral-100"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-20 w-full max-w-[1360px] items-center justify-between px-5 lg:px-10">
        <Logo />

        {/* Navegación Desktop */}
        <nav className="hidden items-center gap-2 lg:flex">
          {navLinks.map((link) => {
            const IconComponent = (link as any).icon || Sparkles;
            return (
              <Link
                key={link.label}
                href={link.href}
                className="group flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-black transition-all duration-200 hover:bg-pink-50 active:scale-95"
              >
                <IconComponent className="h-4 w-4 text-pink-500 transition-transform duration-200 group-hover:scale-110 group-hover:text-pink-600" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Acciones */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/planes"
            className="hidden items-center justify-center rounded-full bg-lime-400 px-6 py-2.5 text-sm font-bold text-black shadow-sm transition-all duration-200 hover:bg-lime-500 active:scale-95 sm:inline-flex"
          >
            {t("viewPlans")}
          </Link>

          <CartButton count={itemCount} onClick={() => setIsOpen(true)} />

          <button
            type="button"
            aria-label={t("openMenu")}
            onClick={() => setMobileOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-pink-50 hover:text-pink-600 active:scale-95 lg:hidden"
          >
            <Menu className="h-6 w-6 text-pink-500" />
          </button>
        </div>
      </div>

      {/* Menú Móvil */}
      <div
        className={cn(
          "fixed inset-0 z-50 bg-white transition-all duration-300 lg:hidden",
          mobileOpen
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        )}
      >
        <div className="flex h-20 items-center justify-between px-5 border-b border-neutral-100">
          <Logo />
          <button
            type="button"
            aria-label={t("closeMenu")}
            onClick={() => setMobileOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-full text-black transition-colors hover:bg-pink-50 hover:text-pink-600 active:scale-95"
          >
            <X className="h-6 w-6 text-pink-500" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 px-5 pt-6">
          {navLinks.map((link, index) => {
            const IconComponent = (link as any).icon || Sparkles;
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: `${index * 50}ms` }}
                className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-lg font-semibold text-black transition-all hover:bg-pink-50 active:scale-98"
              >
                <IconComponent className="h-5 w-5 text-pink-500" />
                <span>{link.label}</span>
              </Link>
            );
          })}

          <Link
            href="/planes"
            onClick={() => setMobileOpen(false)}
            className="mt-6 flex w-full items-center justify-center rounded-full bg-lime-400 py-3.5 text-center text-base font-bold text-black shadow-sm transition-all hover:bg-lime-500 active:scale-95"
          >
            {t("viewPlans")}
          </Link>
        </nav>
      </div>
    </header>
  );
}

function CartButton({ count, onClick }: { count: number; onClick: () => void }) {
  const t = useTranslations("header");

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={t("cartAriaLabel", { count })}
      className="relative flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-pink-50 active:scale-95"
    >
      <ShoppingBag className="h-5 w-5 text-pink-500" strokeWidth={2} />
      {count > 0 && (
        <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-lime-400 px-1 font-sans text-[10px] font-black text-black">
          {count}
        </span>
      )}
    </button>
  );
}