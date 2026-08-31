"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  RotateCcw,
  Globe,
  Sparkles,
  Shield,
  HeartHandshake,
} from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden rounded-none bg-black pt-16 text-green-100 ">
      {/* Floating Icons Background */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Shield className="absolute -left-10 top-10 h-56 w-56 -rotate-12 text-slate-800/40" />
        <Globe className="absolute right-10 bottom-10 h-64 w-64 rotate-12 text-slate-800/30" />
        <Sparkles className="absolute left-1/2 top-12 h-28 w-28 text-slate-800/50 animate-pulse" />
        <HeartHandshake className="absolute right-1/3 top-1/2 h-36 w-36 -rotate-6 text-slate-800/20" />
      </div>

      <div className="container relative z-10 mx-auto px-6 pb-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Legal */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              {t("legal.title")}
            </h3>

            <div className="space-y-3">
              <Link
                href="/legal/terminos"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-green-400 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <FileText className="h-4 w-4" />
                </div>
                {t("legal.terms")}
              </Link>

              <Link
                href="/legal/reembolsos"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-green-400 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <RotateCcw className="h-4 w-4" />
                </div>
                {t("legal.refunds")}
              </Link>

              <Link
                href="/legal/privacidad"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-800 text-green-400 transition-colors group-hover:bg-green-600 group-hover:text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                {t("legal.privacy")}
              </Link>
            </div>

            <div className="mt-8">
              <img
                src="/cards.png"
                alt={t("legal.paymentAlt")}
                className="h-12 w-auto opacity-90"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-green-400">
              {t("contact.title")}
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-pink-400">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t("contact.phoneLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-200">
                    5550881886
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-green-400">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t("contact.addressLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-relaxed text-slate-300">
                    {t("contact.addressLine1")},
                    <br />
                    {t("contact.addressLine2")}
                    <br />
                    {t("contact.addressLine3")},
                    <br />
                    {t("contact.addressLine4")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800 text-pink-400">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-slate-200">
                    ayuda@marcavisible.com.mx
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center justify-center md:items-end">
            <div className="flex items-center gap-3 rounded-xl bg-slate-800/80 px-6 py-5 shadow-sm backdrop-blur-sm border border-slate-700/50">
              <img
                src="/logo.png"
                alt="MarcaVisible"
                className="h-8 invert brightness-0 w-auto"
              />

              <img
                src="/title.png"
                alt="MarcaVisible"
                className="h-8 invert brightness-0 w-auto"
              />
            </div>

            <p className="mt-5 max-w-xs text-center text-xs font-medium text-slate-400 md:text-right">
              {t("brand.tagline")}
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-slate-800 pt-8 text-center text-xs font-medium text-slate-400">
          © {new Date().getFullYear()} MarcaVisible. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}