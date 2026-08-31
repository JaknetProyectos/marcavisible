"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";
import {
  Palette,
  Image as ImageIcon,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Flame,
  MessageCircle,
  Send,
  Mail,
} from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-pink-50 text-zinc-900 overflow-hidden">
      
      {/* Hero Section (Fondo Rosa Vibrante con Íconos Flotantes animados) */}
      <section className="relative overflow-hidden bg-pink-500 py-20 lg:py-28 text-white">
        
        {/* Floating Icons Background (Bounce Customizado) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <Zap className="absolute left-[8%] top-[12%] h-28 w-28 -rotate-12 text-pink-300/30 animate-bounce duration-1000" />
          <Rocket className="absolute bottom-[12%] right-[6%] h-44 w-44 text-pink-700/30 animate-bounce duration-700" />
          <Sparkles className="absolute right-[18%] top-[10%] h-24 w-24 rotate-12 text-lime-300/40 animate-bounce duration-1000" />
          <Star className="absolute bottom-[22%] left-[6%] h-20 w-20 -rotate-6 text-pink-600/40 animate-bounce duration-700" />
          <Flame className="absolute left-[45%] top-[8%] h-16 w-16 text-lime-400/30 animate-bounce duration-1000" />
        </div>

        <div className="container relative mx-auto px-4 lg:px-8 z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-5xl font-black leading-[1.1] tracking-tight md:text-6xl lg:text-7xl">
                {t("hero.title.part1")}
                <span className="relative ml-3 inline-block text-lime-300">
                  {t("hero.title.highlight")}
                  <svg
                    className="absolute -bottom-2 left-0 w-full"
                    viewBox="0 0 180 12"
                    fill="none"
                  >
                    <path
                      d="M2 9C42 2 138 2 178 9"
                      stroke="#a3e635"
                      strokeWidth="4"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                <br />
                {t("hero.title.part2")}
              </h1>

              <p className="mt-6 max-w-xl text-base font-medium text-pink-50 md:text-lg">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
                {/* Decorative Elements */}
                <motion.div 
                  animate={{ y: [0, -8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute -left-6 -top-6 h-24 w-24 rounded-2xl bg-lime-400" 
                />
                <motion.div 
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 h-28 w-28 rounded-2xl bg-pink-700" 
                />

                {/* Image card */}
                <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-[0_20px_60px_rgba(236,72,153,0.25)]">
                  <img
                    src={getOptimizedUrl("https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt={t("hero.imageAlt")}
                    className="w-full max-w-[520px] rounded-2xl object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Services Bar (Fondo Blanco) */}
      <section className="relative z-20 -mt-10 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-4 shadow-[0_12px_40px_rgba(236,72,153,0.12)] border border-pink-100 md:grid-cols-3"
          >
            <div className="group flex items-center gap-4 rounded-2xl bg-pink-50/50 px-5 py-4 transition-all hover:bg-lime-50 hover:shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 group-hover:bg-lime-200 group-hover:text-lime-900 transition-colors">
                <Palette className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {t("services.branding.category")}
                </p>
                <p className="font-bold text-zinc-900">
                  {t("services.branding.title")}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl bg-pink-50/50 px-5 py-4 transition-all hover:bg-lime-50 hover:shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-lime-100 text-lime-800 group-hover:bg-pink-100 group-hover:text-pink-600 transition-colors">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {t("services.content.category")}
                </p>
                <p className="font-bold text-zinc-900">
                  {t("services.content.title")}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl bg-pink-50/50 px-5 py-4 transition-all hover:bg-lime-50 hover:shadow-sm">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-pink-100 text-pink-600 group-hover:bg-lime-200 group-hover:text-lime-900 transition-colors">
                <Sparkles className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-zinc-400">
                  {t("services.motion.category")}
                </p>
                <p className="font-bold text-zinc-900">
                  {t("services.motion.title")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Position Section */}
      <section className="relative py-20 lg:py-32 bg-pink-50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative mx-auto max-w-md">
                <div className="absolute -left-6 -top-6 h-32 w-32 rounded-3xl bg-pink-200/60" />
                <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-3xl bg-lime-200/60" />

                <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-[0_20px_60px_rgba(236,72,153,0.1)] border border-pink-100">
                  <img
                    src={getOptimizedUrl("https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt={t("strategy.imageAlt")}
                    className="rounded-2xl w-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-pink-600">
                {t("strategy.tag")}
              </p>

              <h2 className="text-4xl font-black leading-tight md:text-5xl text-zinc-950">
                {t("strategy.title.part1")}
                <span className="text-lime-600"> {t("strategy.title.highlight")}</span>
              </h2>

              <p className="mt-6 max-w-xl text-lg font-medium leading-relaxed text-zinc-600">
                {t("strategy.description")}
              </p>

              <div className="mt-10">
                <Link
                  href="#contacto"
                  className="inline-flex items-center rounded-2xl bg-lime-400 px-8 py-4 text-sm font-bold uppercase tracking-wider text-lime-950 transition-all hover:bg-lime-500 hover:shadow-lg hover:shadow-lime-400/30 active:scale-95"
                >
                  {t("strategy.button")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section Wrapper (Fondo Verde Lima con Íconos Flotantes animados) */}
      <section className="relative  text-lime-950  overflow-hidden">
        {/* Floating Icons Background for Contact (Bounce Customizado) */}
        <div className="pointer-events-none absolute inset-0 z-0">
          <MessageCircle className="absolute right-[8%] top-[12%] h-40 w-40 rotate-12 text-lime-500/40 animate-bounce duration-1000" />
          <Send className="absolute bottom-[16%] left-[4%] h-32 w-32 -rotate-12 text-lime-600/30 animate-bounce duration-700" />
          <Mail className="absolute left-[18%] top-[8%] h-24 w-24 rotate-6 text-pink-500/30 animate-bounce duration-1000" />
        </div>
        
        <div className="relative z-10">
          <ContactSection />
        </div>
      </section>

    </div>
  );
}