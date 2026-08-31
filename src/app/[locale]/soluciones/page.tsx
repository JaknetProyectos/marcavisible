"use client";

import { useServices } from "@/hooks/useServices";
import { usePackages } from "@/hooks/usePackages";
import { ContactSection } from "@/components/ContactSection";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";
import { formatPrice } from "@/lib/price";

function ServiceCard({
  service,
}: {
  service: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    features: string[];
  };
}) {
  const { addItem } = useCart();
  const t = useTranslations("plans.cards");

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white backdrop-blur-xl transition-all duration-300 hover:border-blue-300 hover:shadow-xl shadow-md"
    >
      <div>
        <div className="aspect-[16/10] overflow-hidden relative border-b border-slate-100">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className=" text-xl uppercase mb-2 text-slate-900 group-hover:text-green-600 transition-colors tracking-wide">
            {service.name}
          </h3>
          <p className="text-green-600 font-bold text-lg mb-5">
            $ {formatPrice(service.price)} <span className="text-xs text-slate-500 font-normal">{t("taxNote")}</span>
          </p>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="text-green-600 h-4 w-4 mt-0.5 shrink-0" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-6 pt-0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-xl shadow-[0_4px_14px_rgba(37,99,235,0.3)] transition-colors text-sm uppercase tracking-wider"
          onClick={() => {
            addItem({
              name: service.name,
              currency: service.currency,
              features: service.features,
              id: service.id,
              image: service.image,
              price: service.price,
            }, 1);
          }}
        >
          {t("addToCart")}
        </motion.button>
      </div>
    </motion.div>
  );
}

function PackageCard({
  pkg,
}: {
  pkg: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    features: string[];
    highlighted?: boolean;
  };
}) {
  const { addItem } = useCart();
  const t = useTranslations("plans.cards");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border bg-white backdrop-blur-xl transition-all duration-300 shadow-md hover:shadow-xl ${
        pkg.highlighted 
          ? "border-red-500 ring-2 ring-red-500/20" 
          : "border-slate-200 hover:border-red-300"
      }`}
    >
      {pkg.highlighted && (
        <div className="absolute top-3 right-4 z-10 bg-pink-600 text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-xl shadow-md">
          {t("recommended")}
        </div>
      )}

      <div>
        <div className="aspect-[16/10] overflow-hidden relative border-b border-slate-100">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className=" text-xl uppercase mb-2 text-slate-900 group-hover:text-pink-600 transition-colors tracking-wide">
            {pkg.name}
          </h3>
          <p className="text-pink-600 font-bold text-2xl mb-5">
            $ {formatPrice(pkg.price)} <span className="text-xs text-slate-500 font-normal">{t("taxNote")}</span>
          </p>
          <ul className="space-y-2.5 text-sm text-slate-600">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <Check className="text-pink-600 h-4 w-4 mt-0.5 shrink-0" />
                <span className="leading-tight">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 pt-0">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-pink-600 hover:bg-pink-600 text-white font-semibold py-3 px-4 rounded-xl shadow-[0_4px_14px_rgba(220,38,38,0.3)] transition-all duration-300 text-sm uppercase tracking-wider"
          onClick={() => {
            addItem({
              name: pkg.name,
              currency: pkg.currency,
              features: pkg.features,
              id: pkg.id,
              image: pkg.image,
              price: pkg.price,
              highlighted: pkg.highlighted,
            }, 1);
          }}
        >
          {t("addToCart")}
        </motion.button>
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
      <div className="bg-slate-200 aspect-[16/10]" />
      <div className="p-6 space-y-4">
        <div className="h-5 bg-slate-200 rounded w-3/4" />
        <div className="h-4 bg-slate-200 rounded w-1/4" />
        <div className="space-y-2">
          <div className="h-3 bg-slate-200 rounded w-full" />
          <div className="h-3 bg-slate-200 rounded w-5/6" />
        </div>
        <div className="h-10 bg-slate-200 rounded-xl w-full pt-4" />
      </div>
    </div>
  );
}

export default function SolucionesPage() {
  const t = useTranslations("plans");
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { packages, loading: packagesLoading, error: packagesError } = usePackages();

  return (
    <div className="bg-white text-slate-900 min-h-screen relative overflow-hidden selection:bg-green-500/20 selection:text-green-900">
      
      {/* Capas de Brillo de Fondo Ambientales */}
      <div className="pointer-events-none absolute top-0 right-1/4 h-[500px] w-[500px] rounded-xl bg-green-500/5 blur-[120px]" />
      <div className="pointer-events-none absolute top-1/2 left-0 h-[600px] w-[600px] -translate-x-1/2 rounded-xl bg-pink-500/5 blur-[150px]" />

      {/* Hero Section */}
      <section className="relative pt-20 pb-12 lg:pt-28 lg:pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          <h1 className=" font-bold text-4xl md:text-5xl lg:text-6xl mb-4 text-slate-900">
            {t("services.title")}
          </h1>
          <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
            {t("services.description")}
          </p>
        </div>
      </section>

      {/* Services Grid (Botones Azules) */}
      <section className="relative pb-16">
        <div className="container mx-auto px-4 lg:px-8">
          {servicesError && (
            <div className="text-center text-pink-600 bg-pink-50 border border-red-200 p-4 rounded-xl mb-8">{servicesError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {servicesLoading
              ? Array.from({ length: 6 }).map((_, idx) => <LoadingSkeleton key={idx} />)
              : services.map((service) => <ServiceCard key={service.id} service={service} />)}
          </div>
        </div>
      </section>

      {/* Custom Project Section (Botones Rojos) */}
      <section className="relative py-16 border-y border-slate-200 bg-slate-50/80 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8 relative rounded-xl overflow-hidden border border-slate-200 max-w-2xl mx-auto shadow-lg">
              <img
                src={getOptimizedUrl("https://images.pexels.com/photos/9431436/pexels-photo-9431436.jpeg")}
                alt={t("customProject.imageAlt")}
                className="w-full h-auto object-cover"
              />
            </div>
            <h2 className=" font-bold text-2xl md:text-3xl uppercase mb-4 text-slate-900">
              {t("customProject.title")}
            </h2>
            <p className="text-slate-600 mb-8 leading-relaxed text-xs tracking-wider max-w-2xl mx-auto">
              {t("customProject.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="#contacto"
                className="w-full sm:w-auto inline-block bg-pink-600 text-white px-8 py-3 rounded-xl font-semibold hover:bg-pink-600 transition-colors duration-200 uppercase tracking-wider text-xs shadow-[0_4px_14px_rgba(220,38,38,0.3)]"
              >
                {t("customProject.buttons.quote")}
              </Link>
              <Link
                href="/soluciones/personalizada"
                className="w-full sm:w-auto inline-block border border-red-600/30 bg-white text-pink-600 px-8 py-3 rounded-xl font-semibold hover:bg-pink-50 hover:border-red-600 transition-colors duration-200 uppercase tracking-wider text-xs"
              >
                {t("customProject.buttons.pay")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section (Botones Rojos) */}
      <section className="relative py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <h2 className=" text-4xl md:text-5xl font-bold mb-4 text-slate-900">
              {t("packages.title")}
            </h2>
            <p className="text-slate-600 text-lg max-w-3xl leading-relaxed">
              {t("packages.description")}
            </p>
          </div>

          {packagesError && (
            <div className="text-center text-pink-600 bg-pink-50 border border-red-200 p-4 rounded-xl mb-8">{packagesError}</div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {packagesLoading
              ? Array.from({ length: 3 }).map((_, idx) => <LoadingSkeleton key={idx} />)
              : packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </div>
  );
}