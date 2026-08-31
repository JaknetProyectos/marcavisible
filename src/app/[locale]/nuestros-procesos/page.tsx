"use client";

import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";



const colors = [
  { name: "Pink Vibrant", hex: "#ec4899" },
  { name: "Lime Glow", hex: "#a3e635" },
  { name: "Zinc Dark", hex: "#09090b" },
  { name: "Slate Light", hex: "#f8fafc" },
];

export default function NuestrosProcesosPage() {
  const t = useTranslations("processes");

  return (
    <div className="bg-white text-slate-900 min-h-screen relative overflow-hidden pb-32 selection:bg-pink-500/30 selection:text-pink-900">
      
      {/* Luces Ambientales (Blurs) */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[600px] w-[600px] -translate-x-1/2 rounded-xl bg-green-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute top-[35%] right-10 h-[500px] w-[500px] rounded-xl bg-pink-500/10 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-[20%] left-0 h-[500px] w-[500px] -translate-x-1/3 rounded-xl bg-green-500/10 blur-[130px]" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-24 border-b border-slate-200 bg-slate-50/50 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-green-600 font-bold uppercase tracking-widest text-xs block mb-3">
                {t("hero.tag")}
              </span>
              <h1 className=" text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-slate-900">
                {t("hero.title.part1")} <br className="hidden sm:inline" />
                {t("hero.title.part2")}{" "}
                <span className="text-pink-600">
                  {t("hero.title.highlight")}
                </span>
              </h1>
              <p className="text-slate-600 font-medium leading-relaxed text-lg max-w-lg">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative group"
            >
              <div className="absolute inset-0 bg-pink-500/10 rounded-xl blur-2xl pointer-events-none" />
              <img
                src={getOptimizedUrl("https://images.pexels.com/photos/5466250/pexels-photo-5466250.jpeg")}
                alt={t("hero.imageAlt")}
                className="w-full max-w-lg rounded-xl shadow-xl relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 1 */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1607703703674-df96af81dffa?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("phase1.imageAlt")}
                className="w-full rounded-xl shadow-xl max-w-md"
              />
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl border border-blue-100 bg-green-600 text-white p-8 lg:p-12 shadow-xl"
            >
              <span className="text-white font-black tracking-wide text-sm block mb-2 uppercase">
                {t("phase1.tag")}
              </span>
              <h2 className=" text-3xl md:text-4xl font-bold mb-5 text-white">
                {t("phase1.title")}
              </h2>
              <p className="text-green-50 font-medium leading-relaxed">
                {t("phase1.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 2 */}
      <section className="relative py-20 border-y border-slate-200 bg-slate-50/50 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative overflow-hidden rounded-xl border border-red-100 bg-pink-500 text-white p-8 lg:p-12 shadow-xl"
            >
              <span className="text-white font-black tracking-wide text-sm block mb-2 uppercase">
                {t("phase2.tag")}
              </span>
              <h2 className=" text-3xl md:text-4xl font-bold mb-5 text-white">
                {t("phase2.title")}
              </h2>
              <p className="text-pink-50 font-medium leading-relaxed mb-6">
                {t("phase2.description")}
              </p>
              <ul className="space-y-3 text-white text-sm font-bold">
                <li className="flex items-start gap-3">
                  <Check className="text-white h-5 w-5 mt-0.5 shrink-0 stroke-[3]" />
                  <span>{t("phase2.features.feat1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-white h-5 w-5 mt-0.5 shrink-0 stroke-[3]" />
                  <span>{t("phase2.features.feat2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="text-white h-5 w-5 mt-0.5 shrink-0 stroke-[3]" />
                  <span>{t("phase2.features.feat3")}</span>
                </li>
              </ul>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <img
                src={getOptimizedUrl("https://plus.unsplash.com/premium_photo-1684356819140-e82e7446b600?q=80&w=784&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("phase2.imageAlt")}
                className="w-full rounded-xl shadow-xl max-w-md"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 3 - Colors */}
      <section className="relative py-20">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Colors Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {colors.map((color) => (
                <div 
                  key={color.hex} 
                  className="flex flex-col items-center p-5 bg-white border border-slate-200 rounded-xl shadow-md transition-transform hover:-translate-y-1"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-xl border-2 border-slate-100 shadow-inner flex items-center justify-center relative"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 border border-white/30" />
                  </div>
                  <p className="mt-4 font-bold text-xs uppercase tracking-wider text-slate-800">
                    {t(`phase3.colors.${color.name.toLowerCase().replace(" ", "")}`, { defaultValue: color.name })}
                  </p>
                  <p className="text-slate-500 text-xs font-mono font-bold mt-0.5">{color.hex}</p>
                </div>
              ))}
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-xl border border-blue-100 bg-green-600 text-white p-8 lg:p-12 shadow-xl"
            >
              <span className="text-white font-black tracking-wide text-sm block mb-2 uppercase">
                {t("phase3.tag")}
              </span>
              <h2 className=" text-3xl md:text-4xl font-bold mb-5 text-white">
                {t("phase3.title")}
              </h2>
              <p className="text-green-50 font-medium leading-relaxed">
                {t("phase3.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Result Section */}
      <section className="relative py-16 border-t border-slate-200 bg-slate-50/50 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-10"
          >
            <div className="inline-flex flex-col rounded-xl border border-red-100 bg-pink-500 text-white px-6 py-4 shadow-md">
              <span className="font-bold text-xs mb-1 uppercase tracking-wider text-white">
                {t("result.tag")}
              </span>
              <h2 className=" text-2xl md:text-3xl font-bold text-white">
                {t("result.title")}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
            >
              <img
                src={getOptimizedUrl("https://images.pexels.com/photos/8145328/pexels-photo-8145328.jpeg")}
                alt={t("result.images.processAlt")}
                className="w-full object-cover h-auto rounded-xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
            >
              <img
                src={getOptimizedUrl("https://images.unsplash.com/photo-1711097383282-28097ae16b1d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("result.images.appAlt")}
                className="w-full object-cover h-auto rounded-xl"
              />
            </motion.div>
          </div>

          {/* Large final image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white p-2 max-w-4xl mx-auto shadow-lg"
          >
            <img
              src={getOptimizedUrl("https://images.pexels.com/photos/95916/pexels-photo-95916.jpeg")}
              alt={t("result.images.fullAlt")}
              className="w-full h-auto rounded-xl mx-auto"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}