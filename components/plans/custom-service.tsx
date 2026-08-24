"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useContact } from "@/hooks/useContact";
import { useTranslations } from "next-intl";

export function CustomService() {
  const t = useTranslations("customService");
  const { sendContactForm, isLoading } = useContact();

  const [email, setEmail] = useState("");
  const [tipoVideo, setTipoVideo] = useState("");
  const [duracion, setDuracion] = useState("");
  const [formato, setFormato] = useState("");
  const [produccion, setProduccion] = useState<string[]>([]);
  const [creativos, setCreativos] = useState<string[]>([]);

  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const steps = [
    {
      title: t("steps.step1.title"),
      detail: t("steps.step1.detail"),
    },
    {
      title: t("steps.step2.title"),
      detail: t("steps.step2.detail"),
    },
    {
      title: t("steps.step3.title"),
      detail: t("steps.step3.detail"),
    },
    {
      title: t("steps.step4.title"),
      detail: t("steps.step4.detail"),
    },
    {
      title: t("steps.step5.title"),
      detail: t("steps.step5.detail"),
    },
  ];

  const videoTypes = [
    { label: t("options.videoTypes.socialMedia"), value: "Redes sociales" },
    { label: t("options.videoTypes.promo"), value: "Video promocional" },
    { label: t("options.videoTypes.corporate"), value: "Corporativo" },
    { label: t("options.videoTypes.animated"), value: "Animado" },
    { label: t("options.videoTypes.motionGraphics"), value: "Motion graphics" },
    { label: t("options.videoTypes.editing"), value: "Edición de material propio" },
  ];

  const durations = [
    { label: t("options.durations.sec30"), value: "30 segundos" },
    { label: t("options.durations.sec60"), value: "60 segundos" },
    { label: t("options.durations.sec90"), value: "90 segundos" },
    { label: t("options.durations.more90"), value: "Más de 90 segundos" },
  ];

  const formats = [
    { label: t("options.formats.vertical"), value: "Vertical" },
    { label: t("options.formats.horizontal"), value: "Horizontal" },
    { label: t("options.formats.square"), value: "Cuadrado" },
    { label: t("options.formats.multiformat"), value: "Multiformato" },
  ];

  const productionOptions = [
    { label: t("options.production.motionGraphics"), value: "Motion graphics" },
    { label: t("options.production.subtitles"), value: "Subtítulos" },
    { label: t("options.production.music"), value: "Musicalización" },
    { label: t("options.production.animations"), value: "Animaciones" },
    { label: t("options.production.other"), value: "Otro" },
  ];

  const creativeOptions = [
    { label: t("options.creative.concept"), value: "Concepto creativo" },
    { label: t("options.creative.script"), value: "Guion publicitario" },
    { label: t("options.creative.storyboard"), value: "Storyboard" },
    { label: t("options.creative.other"), value: "Otro" },
  ];

  const handleCheckboxChange = (
    value: string,
    state: string[],
    setState: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (state.includes(value)) {
      setState(state.filter((item) => item !== value));
    } else {
      setState([...state, value]);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus({ type: null, message: "" });

    const result = await sendContactForm({
      email,
      asunto: "Cotización de Servicio Personalizado",
      servicioDeseado: tipoVideo || "No especificado",
      duracion,
      formatoEntrega: formato,
      elementosProduccion: produccion.join(", ") || "Ninguno",
      serviciosCreativos: creativos.join(", ") || "Ninguno",
    });

    if (result.success) {
      setStatus({
        type: "success",
        message: t("statusSuccess"),
      });
      setEmail("");
      setTipoVideo("");
      setDuracion("");
      setFormato("");
      setProduccion([]);
      setCreativos([]);
    } else {
      setStatus({
        type: "error",
        message: result.error || t("statusError"),
      });
    }
  };

  return (
    <section id="personalizado" className="scroll-mt-28">
      <h2 className="section-title text-center text-pink-600">{t("title")}</h2>

      <p className="prose-body mt-8">
        {t.rich("intro", {
          brand: (chunks) => <strong className="font-semibold text-pink-700">{chunks}</strong>,
          highlight: (chunks) => <strong className="font-semibold text-pink-700">{chunks}</strong>,
        })}
      </p>

      <h3 className="mt-8 font-display text-[19px] font-bold text-zinc-900">
        {t("stepsTitle")}
      </h3>

      <ol className="mt-4 space-y-3">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-3">
            <span className="mt-0.5 font-sans text-[14px] font-bold text-pink-600">
              {index + 1}.
            </span>
            <p className="font-sans text-[14px] leading-[1.75] text-zinc-700">
              <span className="font-semibold text-zinc-900">{step.title}</span>
              <br />
              {step.detail}
            </p>
          </li>
        ))}
      </ol>

      <p className="prose-body mt-8">
        {t.rich("outro", {
          highlight1: (chunks) => <strong className="font-semibold text-pink-700">{chunks}</strong>,
          highlight2: (chunks) => <strong className="font-semibold text-pink-700">{chunks}</strong>,
        })}
      </p>

      {/* Formulario con fondo rosa */}
      <form
        onSubmit={handleSubmit}
        className="mt-10 rounded-[28px] bg-pink-50 border border-pink-200/60 p-6 shadow-xl sm:p-9"
      >
        <label
          htmlFor="custom-email"
          className="font-sans text-[13px] font-semibold text-pink-950"
        >
          {t("emailLabel")} <span className="text-pink-600">*</span>
        </label>
        <input
          id="custom-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isLoading}
          placeholder={t("emailPlaceholder")}
          className="mt-2 w-full rounded-xl border border-pink-200 bg-white px-4 py-3 font-sans text-[15px] outline-none transition-all placeholder:text-pink-900/40 focus:border-pink-500 focus:ring-2 focus:ring-pink-400/20 disabled:opacity-50"
        />

        <div className="mt-4 space-y-4">
          <Select
            label={t("selectVideoType")}
            options={videoTypes}
            value={tipoVideo}
            onChange={(e) => setTipoVideo(e.target.value)}
            disabled={isLoading}
          />
          <Select
            label={t("selectDuration")}
            options={durations}
            value={duracion}
            onChange={(e) => setDuracion(e.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="mt-7 grid gap-7 sm:grid-cols-2">
          <CheckboxGroup
            legend={t("selectProduction")}
            options={productionOptions}
            name="produccion"
            selectedValues={produccion}
            onChange={(value) =>
              handleCheckboxChange(value, produccion, setProduccion)
            }
            disabled={isLoading}
          />
          <CheckboxGroup
            legend={t("selectCreative")}
            options={creativeOptions}
            name="creativos"
            selectedValues={creativos}
            onChange={(value) =>
              handleCheckboxChange(value, creativos, setCreativos)
            }
            disabled={isLoading}
          />
        </div>

        <div className="mt-6">
          <Select
            label={t("selectFormat")}
            options={formats}
            value={formato}
            onChange={(e) => setFormato(e.target.value)}
            disabled={isLoading}
          />
        </div>

        {status.message && (
          <div
            className={`mt-6 p-4 rounded-xl text-sm text-center font-medium ${
              status.type === "success"
                ? "bg-lime-100 text-lime-900 border border-lime-300"
                : "bg-red-100 text-red-900 border border-red-200"
            }`}
          >
            {status.message}
          </div>
        )}

        {/* Botón de envío verde lima */}
        <div className="mt-9 text-center">
          <button
            type="submit"
            disabled={isLoading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-lime-400 px-12 py-3.5 font-sans font-bold text-lime-950 transition-all duration-300 hover:bg-lime-500 hover:shadow-lg hover:shadow-lime-400/30 active:scale-95 disabled:opacity-60"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin text-lime-950" />
                <span>{t("submitting")}</span>
              </>
            ) : (
              <span>{t("submit")}</span>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}

function Select({
  label,
  options,
  value,
  onChange,
  disabled,
}: {
  label: string;
  options: { label: string; value: string }[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) {
  return (
    <select
      value={value}
      onChange={onChange}
      disabled={disabled}
      aria-label={label}
      className="w-full rounded-xl border border-pink-200 bg-white px-4 py-2.5 font-sans text-[14px] text-zinc-800 outline-none transition-all focus:border-pink-500 focus:ring-2 focus:ring-pink-400/20 disabled:opacity-50"
    >
      <option value="" disabled>
        {label}
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

function CheckboxGroup({
  legend,
  options,
  name,
  selectedValues,
  onChange,
  disabled,
}: {
  legend: string;
  options: { label: string; value: string }[];
  name: string;
  selectedValues: string[];
  onChange: (value: string) => void;
  disabled?: boolean;
}) {
  return (
    <fieldset disabled={disabled} className="disabled:opacity-50">
      <legend className="font-sans text-[13px] font-semibold text-pink-950">
        {legend}
      </legend>
      <div className="mt-3 space-y-2.5">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2.5 font-sans text-[14px] text-zinc-700 transition-colors hover:text-pink-950"
          >
            <input
              type="checkbox"
              name={name}
              value={option.value}
              checked={selectedValues.includes(option.value)}
              onChange={() => onChange(option.value)}
              className="h-4 w-4 rounded border-pink-300 text-lime-500 accent-lime-500 focus:ring-lime-400"
            />
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}