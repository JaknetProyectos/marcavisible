"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  Send,
} from "lucide-react";
import { useContact } from "@/hooks/useContact";

export function ContactSection() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const { sendContactForm, isLoading } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus("success");

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });

      return;
    }

    setStatus("error");
    setErrorMessage(result.error || t("form.errorFallback"));
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-green-600 py-20 lg:py-32 text-white"
    >
      {/* Floating Icons Background */}
      <div className="pointer-events-none absolute inset-0">
        <MessageCircle className="absolute right-[10%] top-[15%] h-40 w-40 rotate-12 text-green-500/50" />
        <Send className="absolute bottom-[20%] left-[5%] h-32 w-32 -rotate-12 text-green-700/30" />
        <Mail className="absolute left-[20%] top-[10%] h-20 w-20 rotate-6 text-green-400/40 animate-pulse" />
      </div>

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <h2 className=" mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              {t("title")}
            </h2>

            <p className="mb-8 max-w-lg text-lg font-medium leading-relaxed text-green-100">
              {t("description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Mail className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    {t("info.email.label")}
                  </h4>

                  <p className="mt-1 font-bold text-slate-800">
                    {t("info.email.value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <Phone className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    {t("info.phone.label")}
                  </h4>

                  <p className="mt-1 font-bold text-slate-800">
                    {t("info.phone.value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
                  <MapPin className="h-6 w-6" />
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">
                    {t("info.address.label")}
                  </h4>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-slate-800">
                    {t("info.address.value")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-xl bg-white p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                placeholder={t("form.placeholders.name")}
                value={formData.nombre}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    nombre: e.target.value,
                  })
                }
                className="w-full rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />

              <input
                type="email"
                placeholder={t("form.placeholders.email")}
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="w-full rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />

              <input
                type="tel"
                placeholder={t("form.placeholders.phone")}
                value={formData.telefono}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    telefono: e.target.value,
                  })
                }
                className="w-full rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none"
              />

              <textarea
                placeholder={t("form.placeholders.message")}
                rows={5}
                value={formData.mensaje}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    mensaje: e.target.value,
                  })
                }
                className="w-full resize-none rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:border-blue-500 focus:bg-white focus:outline-none"
                required
              />

              {status === "success" && (
                <div className="flex items-center gap-2 rounded-xl bg-green-50 p-4 text-sm font-bold text-green-600">
                  <CheckCircle2 className="h-5 w-5 shrink-0" />
                  {t("form.successMessage")}
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-2 rounded-xl bg-pink-50 p-4 text-sm font-bold text-pink-600">
                  <AlertCircle className="h-5 w-5 shrink-0" />
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-xl bg-pink-500 px-6 py-4 font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-pink-600 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? t("form.buttons.sending") : t("form.buttons.send")}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}