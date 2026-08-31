"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Palette, Image as ImageIcon, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function NosotrosPage() {
  const t = useTranslations("about");
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: t("skills.design"), percentage: 100 },
    { name: t("skills.illustrations"), percentage: 100 },
    { name: t("skills.icons"), percentage: 100 },
    { name: t("skills.motion"), percentage: 100 },
  ];

  const specializations = [
    {
      icon: Palette,
      title: t("specializations.branding.title"),
      description: t("specializations.branding.description"),
    },
    {
      icon: ImageIcon,
      title: t("specializations.illustration.title"),
      description: t("specializations.illustration.description"),
    },
    {
      icon: Sparkles,
      title: t("specializations.interaction.title"),
      description: t("specializations.interaction.description"),
    },
  ];

  const highlights = [
    t("highlights.experience"),
    t("highlights.awards"),
    t("highlights.education"),
  ];

  return (
    <div className="bg-green-600 text-slate-100 min-h-screen relative overflow-hidden selection:bg-pink-500/30 selection:text-pink-200">

      {/* Capas de Brillo de Fondo Ambientales (Blurs) */}
      <div className="pointer-events-none absolute top-0 left-1/4 h-[500px] w-[500px] -translate-x-1/2 rounded-xl bg-green-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/3 right-0 h-[600px] w-[600px] rounded-xl bg-pink-500/10 blur-[150px]" />
      <div className="pointer-events-none absolute bottom-1/4 left-10 h-[400px] w-[400px] rounded-xl bg-green-700/20 blur-[100px]" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-pink-300 font-semibold uppercase tracking-widest text-xs block mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              {t("hero.tag")}
            </span>
            <h1 className=" text-4xl md:text-5xl lg:text-6xl font-normal mb-6 leading-tight text-white">
              {t("hero.title.part1")} <br className="hidden sm:inline" />
              {t("hero.title.part2")}{" "}
              <span className="text-pink-400 font-bold drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                {t("hero.title.highlight")}
              </span>
            </h1>
            <p className="text-green-100 leading-relaxed text-lg mb-6">
              {t("hero.description")}
            </p>
            <p className="text-white font-semibold text-sm tracking-wide uppercase border-l-2 border-red-500 pl-3">
              {t("hero.specializationLabel")}
            </p>
          </div>
        </div>
      </section>

      {/* Specializations Grid */}
      <section className="relative pb-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.15 }}
                  whileHover={{ y: -4 }}
                  className="relative group overflow-hidden rounded-xl border border-white/10 bg-white p-8 shadow-[0_20px_50px_rgba(0,0,0,0.15)] transition-all duration-300 hover:border-red-500/30 hover:shadow-[0_25px_60px_rgba(0,0,0,0.2)]"
                >
                  {/* Efecto de contorno brillante interno suave */}
                  <div className="absolute inset-0 rounded-xl border border-transparent group-hover:border-red-500/20 transition-colors pointer-events-none" />

                  <div className="w-14 h-14 mb-6 flex items-center justify-center rounded-xl bg-green-50 border border-blue-100 group-hover:border-red-200 transition-colors">
                    <Icon className="w-7 h-7 text-green-600 transition-transform duration-300 group-hover:scale-110 group-hover:text-pink-500" />
                  </div>
                  <h3 className=" text-xl mb-3 text-slate-900 transition-colors group-hover:text-pink-600">
                    {spec.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {spec.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History & Competences Section */}
      <section className="py-16 border-t border-blue-500/30 bg-green-700/40 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-10">
            <span className="text-pink-300 font-bold uppercase tracking-widest text-xs block mb-3 drop-shadow-[0_0_10px_rgba(239,68,68,0.3)]">
              {t("history.tag")}
            </span>
            <h2 className=" text-3xl md:text-4xl text-white">
              {t("history.title.part1")}{" "}
              <span className="text-pink-400 font-bold drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]">
                {t("history.title.highlight")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Description */}
            <div>
              <p className="text-green-100 leading-relaxed text-lg">
                {t("history.description")}
              </p>
            </div>

            {/* Right - Progress Bars */}
            <div className="bg-white border border-white/10 p-6 rounded-xl space-y-5 shadow-[0_20px_50px_rgba(0,0,0,0.15)]">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between items-center mb-2">
                    <p className="text-slate-500 text-xs uppercase tracking-wider font-semibold">
                      {skill.name}
                    </p>
                    <span className="text-xs font-bold text-pink-500">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-xl overflow-hidden border border-slate-200">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-red-400 rounded-xl transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(239,68,68,0.5)]"
                      style={{
                        width: animateSkills ? `${skill.percentage}%` : "0%",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Highlights */}
          <div className="mt-16 pt-8 border-t border-blue-500/30">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="border border-white/10 bg-white/10 p-5 rounded-xl flex items-center gap-3 backdrop-blur-xl shadow-sm"
                >
                  <div className="h-2 w-2 rounded-xl bg-pink-500 shadow-[0_0_8px_rgba(239,68,68,0.9)] shrink-0" />
                  <h3 className=" text-sm text-white uppercase tracking-wider font-medium">
                    {highlight}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}