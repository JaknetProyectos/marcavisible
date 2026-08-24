"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

export function ContactForm() {
  const t = useTranslations("contactForm");
  const { sendContactForm, isLoading } = useContact();

  const fields = [
    { name: "nombre", label: t("fields.name"), type: "text" },
    { name: "telefono", label: t("fields.phone"), type: "tel" },
    { name: "email", label: t("fields.email"), type: "email" },
  ] as const;

  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    email: "",
    servicioDeseado: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const toastId = toast.loading(t("toast.sending"));

    const result = await sendContactForm({
      nombre: formData.nombre,
      telefono: formData.telefono,
      email: formData.email,
      mensaje: formData.servicioDeseado,
    });

    if (result.success) {
      toast.success(t("toast.success"), {
        id: toastId,
      });

      setFormData({
        nombre: "",
        telefono: "",
        email: "",
        servicioDeseado: "",
      });
    } else {
      toast.error(
        result.error || t("toast.error"),
        { id: toastId }
      );
    }
  };

  return (
    <section className="relative bg-pink-100 pt-16 pb-28 lg:pt-20 lg:pb-36">
      <div className="mx-auto w-full max-w-[1180px] px-5">
        <h2 className="mx-auto max-w-[980px] text-center font-sans text-2xl font-bold tracking-tight text-black sm:text-3xl lg:text-4xl">
          {t("title")}
        </h2>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-10 w-full max-w-[1060px] rounded-[32px] border border-neutral-100 bg-white p-7 shadow-sm sm:p-12"
        >
          <div className="space-y-5">
            {fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block font-sans text-sm font-semibold text-black"
                >
                  {field.label} <span className="text-pink-500">*</span>
                </label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required
                  value={formData[field.name]}
                  onChange={handleChange}
                  disabled={isLoading}
                  placeholder={field.label}
                  className="mt-2 w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 font-sans text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-pink-500 focus:bg-white disabled:opacity-50"
                />
              </div>
            ))}

            <div>
              <label
                htmlFor="servicioDeseado"
                className="block font-sans text-sm font-semibold text-black"
              >
                {t("fields.service")} <span className="text-pink-500">*</span>
              </label>
              <textarea
                id="servicioDeseado"
                name="servicioDeseado"
                required
                rows={5}
                value={formData.servicioDeseado}
                onChange={handleChange}
                disabled={isLoading}
                placeholder={t("fields.servicePlaceholder")}
                className="mt-2 w-full resize-y rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 font-sans text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-pink-500 focus:bg-white disabled:opacity-50"
              />
            </div>
          </div>

          <div className="mt-10 text-center">
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-12 py-3.5 font-sans text-base font-bold text-black shadow-sm transition-all duration-200 hover:bg-lime-500 active:scale-95 disabled:opacity-60"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin text-black" />
                  <span>{t("submit.sending")}</span>
                </>
              ) : (
                <span>{t("submit.send")}</span>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Waves negras en la parte inferior */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-[0]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          className="relative block h-[50px] w-[calc(100%+1.3px)] text-black"
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