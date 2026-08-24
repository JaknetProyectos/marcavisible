"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { Mail, MapPin, Phone, Loader2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

export const site = {
  name: "Marca Visible",
  tagline: "Estrategia y Concepto Creativo Digital",
  phone: "+52 1 55 5553 0504",
  email: "info@marcavisible.com.mx",
  address:
    "Avenida Tamaulipas 150, Interior 1801 Piso 18, Colonia Hipódromo, Alcaldía Cuauhtémoc, C.P. 06100, Ciudad de México",
} as const;

const CONTACT_IMAGE = "/images/site/contact.jpg";

export function ContactSection() {
  const t = useTranslations("contact");
  const { sendContactForm, isLoading } = useContact();

  const reasons = [
    t("reasons.quote"),
    t("reasons.project"),
    t("reasons.doubts"),
  ];

  const details: { icon: LucideIcon; title: string; value: string }[] = [
    { icon: MapPin, title: t("details.address"), value: site.address },
    { icon: Mail, title: t("details.email"), value: site.email },
    { icon: Phone, title: t("details.phone"), value: site.phone },
  ];

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    asunto: reasons[0],
    mensaje: "",
  });

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus({
        type: "success",
        message: t("status.success"),
      });
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        asunto: reasons[0],
        mensaje: "",
      });
    } else {
      setStatus({
        type: "error",
        message: result.error || t("status.error"),
      });
    }
  };

  return (
    <section id="contacto" className="relative bg-lime-50 pt-20 pb-32 lg:pt-28 lg:pb-36">
      <div className="mx-auto grid w-full max-w-[1180px] items-center gap-12 px-5 lg:grid-cols-2 lg:gap-16">
        {/* Lado Izquierdo: Imagen e Información */}
        <div>
          <div className="mx-auto w-full max-w-[440px] lg:mx-0">
            <img
              src={CONTACT_IMAGE}
              alt={t("imageAlt")}
              className="aspect-square w-full rounded-full object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>

          <h2 className="mt-8 font-sans text-3xl font-bold tracking-tight text-black sm:text-4xl lg:text-5xl">
            {t("title")}
          </h2>

          <p className="mt-5 font-sans text-base leading-relaxed text-neutral-800 sm:text-lg">
            {t("description.part1")}{" "}
            <strong className="font-semibold text-black">{site.name}</strong>{" "}
            {t("description.part2")}
          </p>

          <p className="mt-3 font-sans text-base leading-relaxed text-neutral-800 sm:text-lg">
            {t("reasonsTitle")}
          </p>

          <ul className="mt-3 space-y-2">
            {reasons.map((reason) => (
              <li key={reason} className="flex items-center gap-2 font-sans text-base text-neutral-800">
                <span className="h-2 w-2 rounded-full bg-pink-500 shrink-0"></span>
                {reason}
              </li>
            ))}
          </ul>
        </div>

        {/* Lado Derecho: Formulario Interactivo */}
        <div className="rounded-3xl border border-neutral-100 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="nombre" className="block text-sm font-medium text-black mb-1.5">
                {t("form.name")} *
              </label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                required
                value={formData.nombre}
                onChange={handleChange}
                disabled={isLoading}
                placeholder={t("form.namePlaceholder")}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-black transition-colors focus:border-pink-500 focus:bg-white focus:outline-none disabled:opacity-50"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-black mb-1.5">
                  {t("form.email")} *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder={t("form.emailPlaceholder")}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-black transition-colors focus:border-pink-500 focus:bg-white focus:outline-none disabled:opacity-50"
                />
              </div>

              <div>
                <label htmlFor="telefono" className="block text-sm font-medium text-black mb-1.5">
                  {t("form.phone")}
                </label>
                <input
                  type="tel"
                  id="telefono"
                  name="telefono"
                  value={formData.telefono}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder={t("form.phonePlaceholder")}
                  className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-black transition-colors focus:border-pink-500 focus:bg-white focus:outline-none disabled:opacity-50"
                />
              </div>
            </div>

            <div>
              <label htmlFor="asunto" className="block text-sm font-medium text-black mb-1.5">
                {t("form.reason")}
              </label>
              <select
                id="asunto"
                name="asunto"
                value={formData.asunto}
                onChange={handleChange}
                disabled={isLoading}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-black transition-colors focus:border-pink-500 focus:bg-white focus:outline-none disabled:opacity-50"
              >
                {reasons.map((reason) => (
                  <option key={reason} value={reason}>
                    {reason}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="mensaje" className="block text-sm font-medium text-black mb-1.5">
                {t("form.message")} *
              </label>
              <textarea
                id="mensaje"
                name="mensaje"
                rows={4}
                required
                value={formData.mensaje}
                onChange={handleChange}
                disabled={isLoading}
                placeholder={t("form.messagePlaceholder")}
                className="w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3 text-sm text-black transition-colors focus:border-pink-500 focus:bg-white focus:outline-none disabled:opacity-50"
              />
            </div>

            {status.message && (
              <div
                className={`p-4 rounded-2xl text-sm ${
                  status.type === "success"
                    ? "bg-green-50 text-green-800 border border-green-200"
                    : "bg-red-50 text-red-800 border border-red-200"
                }`}
              >
                {status.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-full bg-lime-400 py-4 text-center font-sans text-base font-bold text-black shadow-sm transition-all duration-200 hover:bg-lime-500 active:scale-95 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>{t("form.sending")}</span>
                </>
              ) : (
                <span>{t("form.send")}</span>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Banner de datos de contacto */}
      <div className="mt-16 bg-black text-white">
        <div className="mx-auto grid w-full max-w-[1180px] gap-8 px-5 py-12 sm:grid-cols-3">
          {details.map(({ icon: Icon, ...detail }) => (
            <div key={detail.title} className="flex items-start gap-4">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neutral-900">
                <Icon
                  aria-hidden="true"
                  strokeWidth={1.8}
                  className="h-5 w-5 text-pink-500"
                />
              </div>
              <div>
                <h3 className="font-sans text-base font-bold text-white">
                  {detail.title}
                </h3>
                <p className="mt-1 font-sans text-sm leading-relaxed text-neutral-300">
                  {detail.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Waves rosas abajo */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[50px] w-[calc(100%+1.3px)] text-pink-100"
        >
          <path
            d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
            fill="currentColor"
          ></path>
        </svg>
      </div>
    </section>
  );
}