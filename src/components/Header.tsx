"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import {
  Home,
  Building2,
  Layers3,
  Workflow,
  ShoppingCart,
  Languages,
  Menu,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useLocaleContext } from "@/context/LangContext";

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { locale, switchLanguage } = useLocaleContext();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/nosotros", label: t("nav.about"), icon: Building2 },
    { href: "/soluciones", label: t("nav.solutions"), icon: Layers3 },
    { href: "/nuestros-procesos", label: t("nav.processes"), icon: Workflow },
  ];

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const SidebarContent = () => (
    <div className="flex h-full flex-col justify-between p-4">
      {/* Sección Superior: Logo y Navegación */}
      <div className="space-y-6">
        {/* Logo */}
        <Link href="/" className="block">
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            className="flex h-16 items-center gap-3 rounded-xl bg-slate-50 px-4 transition-colors hover:bg-slate-100"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
              <img
                src="/logo.png"
                alt={t("logoAlt")}
                className="h-10 w-10 object-contain"
              />
            </div>
            <img
              src="/title.png"
              alt={t("titleAlt")}
              className="h-7 w-auto object-contain"
            />
          </motion.div>
        </Link>

        {/* Links de Navegación */}
        <nav className="flex flex-col gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link key={link.href} href={link.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex h-12 items-center gap-3 overflow-hidden rounded-xl px-4 transition-colors hover:bg-slate-50"
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active-pill"
                      className="absolute inset-0 rounded-xl bg-green-600"
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 28,
                      }}
                    />
                  )}

                  <Icon
                    className={`relative z-10 h-5 w-5 shrink-0 transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-500"
                    }`}
                  />

                  <span
                    className={`relative z-10 truncate text-sm font-semibold transition-colors duration-300 ${
                      isActive ? "text-white" : "text-slate-700"
                    }`}
                  >
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Sección Inferior: Selector de Idioma y Carrito */}
      <div className="flex flex-col gap-3 pt-4 border-t border-slate-100">
        {/* Idioma */}
        <motion.button
          whileHover={{ y: -1 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => switchLanguage(locale === "es" ? "en" : "es")}
          className="w-full"
          aria-label={t("changeLanguage")}
          title={t("changeLanguage")}
        >
          <div className="flex h-12 w-full items-center justify-between rounded-xl bg-green-50 px-4 transition-colors hover:bg-green-100">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white shadow-sm">
                <Languages className="h-4 w-4 text-green-600" />
              </div>
              <span className="text-sm font-bold text-green-700">
                {locale === "es" ? "Español" : "English"}
              </span>
            </div>
            <span className="text-xs font-bold tracking-wide text-green-600 uppercase">
              {locale}
            </span>
          </div>
        </motion.button>

        {/* Carrito */}
        <Link href="/carrito" className="w-full">
          <motion.div
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex h-12 w-full items-center justify-between rounded-xl bg-pink-500 px-4 transition-colors hover:bg-pink-600"
          >
            <div className="flex items-center gap-3 text-white">
              <ShoppingCart className="h-5 w-5" />
              <span className="text-sm font-bold">{t("cart")}</span>
            </div>

            {itemCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex h-6 min-w-[24px] items-center justify-center rounded-xl bg-white px-1.5 text-xs font-bold text-pink-600 shadow-sm"
              >
                {itemCount}
              </motion.div>
            )}
          </motion.div>
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Top Header en Móviles (solo visible en pantallas pequeñas) */}
      <div className="sticky top-0 z-40 flex h-16 w-full items-center justify-between bg-white px-4 shadow-sm md:hidden">
        <Link href="/" className="flex items-center gap-2">
          <img src="/logo.png" alt={t("logoAlt")} className="h-8 w-8 object-contain" />
          <img src="/title.png" alt={t("titleAlt")} className="h-6 w-auto" />
        </Link>
        <button
          onClick={() => setIsOpen(true)}
          className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-700"
          aria-label="Open menu"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Drawer desplegable en Móviles */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.3 }}
              className="fixed inset-y-0 left-0 z-50 w-72 bg-white shadow-2xl md:hidden"
            >
              <div className="absolute right-3 top-3 z-10">
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-slate-500"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Sidebar Fijo en Escritorio */}
      <aside className="hidden h-screen w-64 shrink-0 border-r border-slate-100 bg-white md:sticky md:top-0 md:block">
        <SidebarContent />
      </aside>
    </>
  );
}