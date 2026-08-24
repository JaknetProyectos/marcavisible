"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  StickyNote,
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/cart-context";
import { processEtominPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";
import { usePlan } from "@/hooks/use-plan";
import { CartItem } from "@/types/cart-item";

interface CartItemRowProps {
  item: CartItem;
}

export function BlackBottomWave() {
  return (
    <div className="absolute  z-10 w-full overflow-hidden leading-none">
      <svg
        className="relative block h-[40px] w-[calc(100%+1.3px)] sm:h-[60px]"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" fill="#000000"></path>
      </svg>
    </div>
  )
}

export function CartItemRow({ item }: CartItemRowProps) {
  const { plan } = usePlan(item.product.id);
  const { removeItem, updateQuantity } = useCart();

  if (!plan) return null;

  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 sm:grid-cols-[96px_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-xl bg-neutral-50 p-2 border border-neutral-100">
          <Link href="/planes" className="absolute inset-0 z-10" />
          <Image
            src={plan?.image ?? "/etomin.png"}
            alt={plan.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 inline-block rounded bg-lime-100 px-2 py-0.5 text-[10px] font-bold tracking-wider text-lime-800 uppercase">
                {plan.id}
              </p>

              <Link href={`/planes/${plan.id}`}>
                <h3 className="line-clamp-1 font-sans text-base font-bold text-black">
                  {plan.name}
                </h3>
              </Link>
            </div>

            <button
              type="button"
              onClick={() => removeItem(plan.id)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-pink-50 text-pink-500 transition-colors hover:bg-pink-100 hover:text-pink-600"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex items-center rounded-full border border-neutral-200 bg-neutral-50 p-1">
              <button
                type="button"
                onClick={() => updateQuantity(plan.id, item.quantity - 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-lime-400 hover:text-black"
              >
                <Minus className="h-3 w-3" strokeWidth={2.5} />
              </button>

              <span className="w-8 text-center font-sans text-sm font-bold text-black">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() => updateQuantity(plan.id, item.quantity + 1)}
                className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black shadow-sm transition-colors hover:bg-lime-400 hover:text-black"
              >
                <Plus className="h-3 w-3" strokeWidth={2.5} />
              </button>
            </div>

            <span className="font-sans text-lg font-black tracking-tight text-black">
              {formatPrice(plan.price * item.quantity, "MXN", true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const VALID_COUPONS = [
  { code: "MED10", discount: 0.1 },
  { code: "CONFIANZA15", discount: 0.15 },
  { code: "PROMO20", discount: 0.2 },
];

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[32px] bg-white border border-neutral-100 shadow-xl shadow-black/5 ${className}`}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-pink-100 text-pink-500">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="font-sans text-lg font-bold text-black">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
  isTextarea = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
  isTextarea?: boolean;
}) {
  const InputComponent = isTextarea ? "textarea" : "input";
  const rows = isTextarea ? 3 : undefined;

  return (
    <div className={className}>
      <label className="mb-2 block font-sans text-sm font-semibold text-black">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>
      <InputComponent
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        rows={rows}
        className={[
          "w-full rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 font-sans text-sm text-black outline-none transition-colors placeholder:text-neutral-400 focus:border-pink-500 focus:bg-white",
          mono ? "font-mono tracking-wider" : "",
          inputClassName,
        ].join(" ")}
      />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
    notasEnvio: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;

    // Concatenando el cupón y las nuevas notas de envío
    const couponMetadata = appliedCoupon ? `${t("metadata.couponApplied")}: ${appliedCoupon.code} | ` : "";
    const notesMetadata = formData.notasEnvio ? `Notas de envío: ${formData.notasEnvio}` : t("metadata.standardSale");

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: `${couponMetadata} ${notesMetadata}`,
      },
    };

    try {
      const response = await processEtominPayment(paymentPayload);

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch(`/${locale ?? "es"}/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
              locale,
            }),
          });
        } catch (emailError) {
          console.error(
            "⚠️ Falló el despacho de correos informativos:",
            emailError
          );
        }

        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="relative flex min-h-screen flex-col bg-lime-500 font-sans text-black">
        {/* Wave Blanca Superior */}
        <div className="absolute top-0 left-0 right-0 z-10 w-full overflow-hidden leading-none">
          <svg
            className="relative block h-[40px] w-[calc(100%+1.3px)] sm:h-[60px]"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z" fill="#FFFFFF"></path>
          </svg>
        </div>

        <main className="relative z-20 mx-auto flex w-full max-w-7xl flex-grow flex-col justify-center px-4 py-20 md:px-6">
          <section className="mx-auto w-full max-w-xl">
            <CardShell className="p-7 text-center sm:p-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-lime-100 text-lime-600">
                <CheckCircle2 className="h-10 w-10" strokeWidth={2.5} />
              </div>

              <h1 className="font-sans text-3xl font-bold text-black">
                {t("success.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-sm font-sans text-sm leading-relaxed text-neutral-600">
                {t("success.description")}
              </p>

              <div className="mt-8 rounded-2xl bg-neutral-50 p-5 text-left border border-neutral-100">
                <div className="flex items-center justify-between gap-4 border-b border-neutral-200 pb-3">
                  <span className="font-sans text-sm font-bold text-black">
                    {t("success.transactionStatus")}
                  </span>
                  <span className="rounded-full bg-lime-400 px-3 py-1 font-sans text-xs font-bold text-black">
                    {t("success.approved")}
                  </span>
                </div>
              </div>

              <Link href="/planes" className="mt-8 block">
                <button className="w-full rounded-full bg-pink-500 py-4 font-sans text-base font-bold text-white shadow-sm transition-all hover:bg-pink-600 active:scale-95">
                  {t("success.backToCatalog")}
                </button>
              </Link>
            </CardShell>
          </section>
        </main>
        <BlackBottomWave/>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-lime-500 pt-16 font-sans text-black">

      <main className="relative z-20 py-24">
        <div className="mx-auto max-w-[1180px] px-4 md:px-6">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-8 text-center sm:p-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-pink-50">
                <ShoppingBag className="h-10 w-10 text-pink-500" />
              </div>
              <h2 className="font-sans text-2xl font-bold text-black">
                {t("empty.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-xs font-sans text-sm leading-relaxed text-neutral-600">
                {t("empty.description")}
              </p>
              <Link href="/planes" className="mt-8 inline-block">
                <button className="rounded-full bg-lime-400 px-8 py-4 font-sans text-base font-bold text-black shadow-sm transition-all hover:bg-lime-500 active:scale-95">
                  {t("empty.goToStore")}
                </button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid gap-8 lg:items-start">
              <div className="space-y-6">
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-2xl bg-red-50 p-4 font-sans text-sm font-semibold text-red-600 border border-red-100">
                    <AlertTriangle className="h-5 w-5 flex-shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
                    <CardShell className="p-5 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="font-sans text-xl font-bold text-black">
                          {t("order.title")}
                        </h2>

                        <button
                          type="button"
                          onClick={clearCart}
                          className="flex items-center gap-1.5 rounded-full bg-pink-50 px-3 py-1.5 font-sans text-xs font-bold text-pink-600 transition hover:bg-pink-100"
                        >
                          <Trash2 className="h-4 w-4" />
                          {t("order.clear")}
                        </button>
                      </div>

                      <div className="mt-6 space-y-4">
                        {items.map((item) => (
                          <CartItemRow key={item.product.id} item={item} />
                        ))}
                      </div>
                    </CardShell>

                    <CardShell className="p-5 sm:p-8">
                      <div className="flex h-full flex-col">
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="font-sans text-xl font-bold text-black">
                            {t("financial.title")}
                          </h2>
                        </div>

                        <div className="mt-6 flex flex-row items-center justify-center rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                          <Image
                            src="/etomin.png"
                            alt={t("images.securePaymentAlt")}
                            width={120}
                            height={20}
                            className="object-contain opacity-80 mix-blend-multiply"
                          />
                        </div>

                        <div className="mt-6 space-y-4">
                          {!appliedCoupon ? (
                            <form
                              onSubmit={handleApplyCoupon}
                              className="grid gap-3 rounded-2xl bg-pink-50 p-5 border border-pink-100"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="font-sans text-sm font-bold text-black">
                                    {t("financial.applyCoupon")}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder={t("financial.couponPlaceholder")}
                                  value={couponInput}
                                  onChange={(e) => setCouponInput(e.target.value)}
                                  className="min-w-0 flex-1 rounded-full border border-pink-200 bg-white px-4 py-3 font-sans text-sm text-black outline-none placeholder:text-neutral-400 focus:border-pink-500"
                                />
                                <button
                                  type="submit"
                                  className="shrink-0 rounded-full bg-lime-400 px-5 font-sans text-sm font-bold text-black shadow-sm transition-colors hover:bg-lime-500"
                                >
                                  Aplicar
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="rounded-2xl bg-lime-100 p-5 border border-lime-200">
                              <div className="flex items-center justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="font-sans text-sm font-bold text-black">
                                    {t("financial.appliedCoupon", {
                                      code: appliedCoupon.code,
                                      discount: appliedCoupon.discount * 100,
                                    })}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setAppliedCoupon(null)}
                                  className="shrink-0 rounded-full bg-white px-3 py-1.5 font-sans text-xs font-bold text-neutral-600 transition hover:bg-neutral-50"
                                >
                                  {t("financial.remove")}
                                </button>
                              </div>
                            </div>
                          )}

                          {couponError && (
                            <p className="pl-1 font-sans text-xs font-semibold text-red-500">
                              {couponError}
                            </p>
                          )}
                        </div>

                        <div className="mt-6 space-y-3.5 rounded-2xl bg-neutral-50 p-5 font-sans text-sm font-semibold text-neutral-700 border border-neutral-100">
                          <div className="flex justify-between gap-4">
                            <span>{t("financial.subtotal")}</span>
                            <span className="font-mono text-black">
                              {formatPrice(total, "MXN", true)}
                            </span>
                          </div>

                          {appliedCoupon && (
                            <div className="flex justify-between gap-4 text-pink-500">
                              <span>{t("financial.discount")}</span>
                              <span className="font-mono">
                                -{formatPrice(discountAmount, "MXN", true)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-6 rounded-2xl bg-lime-400 p-6 shadow-sm">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="font-sans text-sm font-bold text-black">
                              {t("financial.netTotal")}
                            </span>
                            <span className="font-sans text-2xl font-black tracking-tight text-black">
                              {formatPrice(grandTotal, "MXN", true)}
                            </span>
                          </div>

                          <p className="mt-2 text-right font-sans text-xs font-medium text-lime-900">
                            {t("financial.tax", {
                              tax: formatPrice(iva, "MXN", true),
                            })}
                          </p>
                        </div>

                        <div className="mt-8 space-y-3">
                          <button
                            onClick={() => setStep(2)}
                            className="flex w-full items-center justify-center gap-2 rounded-full bg-pink-500 py-4 font-sans text-base font-bold text-white shadow-sm transition-all hover:bg-pink-600 active:scale-95"
                          >
                            {t("actions.proceedToPayment")}
                            <ArrowRight className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </CardShell>
                  </div>
                )}

                {step === 2 && (
                  <form
                    id="octano-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]"
                  >
                    <div className="space-y-6">
                      <CardShell className="p-6 sm:p-8">
                        <SectionTitle
                          icon={User}
                          title={t("form.buyerTitle")}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field
                            label={t("form.firstName")}
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.lastName")}
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.email")}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.phone")}
                            name="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.company")}
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className="sm:col-span-2"
                          />
                        </div>
                      </CardShell>

                      <CardShell className="p-6 sm:p-8">
                        <SectionTitle
                          icon={MapPin}
                          title={t("form.addressTitle")}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field
                            label={t("form.streetAddress")}
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.streetAddressPlaceholder")}
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.neighborhood")}
                            name="direccion2"
                            value={formData.direccion2}
                            onChange={handleInputChange}
                            placeholder={t("form.neighborhoodPlaceholder")}
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.city")}
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.state")}
                            name="estado"
                            value={formData.estado}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.statePlaceholder")}
                          />
                          <Field
                            label={t("form.postalCode")}
                            name="cp"
                            value={formData.cp}
                            onChange={handleInputChange}
                            required
                          />
                          <div>
                            <label className="mb-2 block font-sans text-sm font-semibold text-black">
                              {t("form.country")} <span className="text-pink-500">*</span>
                            </label>
                            <select
                              name="pais"
                              value={formData.pais}
                              onChange={handleInputChange}
                              className="w-full appearance-none rounded-2xl border border-neutral-200 bg-neutral-50/50 px-4 py-3.5 font-sans text-sm text-black outline-none transition-colors focus:border-pink-500 focus:bg-white"
                            >
                              <option value="MX">
                                {t("form.mexico")}
                              </option>
                            </select>
                          </div>

                          {/* Nuevo campo Textarea para Notas de Envío */}
                          <Field
                            label={t("form.shippingNotes")}
                            name="notasEnvio"
                            value={formData.notasEnvio}
                            onChange={handleInputChange}
                            isTextarea
                            placeholder={t("form.shippingNotesPlaceholder")}
                            className="sm:col-span-2"
                          />
                        </div>
                      </CardShell>

                      <CardShell className="p-6 sm:p-8">
                        <SectionTitle
                          icon={CreditCard}
                          title={t("form.paymentTitle")}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-6">
                          <Field
                            label={t("form.cardNumber")}
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            maxLength={16}
                            placeholder={t("form.cardNumberPlaceholder")}
                            className="sm:col-span-6"
                            mono
                          />
                          <Field
                            label={t("form.cardHolderName")}
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.cardHolderPlaceholder")}
                            className="sm:col-span-6"
                          />
                          <Field
                            label={t("form.expiryMonth")}
                            name="cardMonth"
                            value={formData.cardMonth}
                            onChange={handleInputChange}
                            required
                            maxLength={2}
                            placeholder={t("form.expiryMonthPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.expiryYear")}
                            name="cardYear"
                            value={formData.cardYear}
                            onChange={handleInputChange}
                            required
                            maxLength={4}
                            placeholder={t("form.expiryYearPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.cvv")}
                            name="cardCvv"
                            type="password"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            maxLength={4}
                            placeholder={t("form.cvvPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                        </div>
                      </CardShell>
                    </div>

                    <div className="space-y-6">
                      <CardShell className="sticky top-24 p-6 sm:p-8">
                        <h2 className="font-sans text-xl font-bold text-black">
                          {t("financial.title")}
                        </h2>

                        <div className="mt-6 flex justify-center rounded-2xl bg-neutral-50 p-4 border border-neutral-100">
                          <Image
                            src="/etomin.png"
                            alt={t("images.securePaymentAlt")}
                            width={120}
                            height={20}
                            className="object-contain opacity-80 mix-blend-multiply"
                          />
                        </div>

                        <div className="mt-6 space-y-4 rounded-2xl bg-neutral-50 p-5 font-sans text-sm font-semibold text-neutral-700 border border-neutral-100">
                          <div className="flex justify-between gap-4">
                            <span>{t("financial.subtotal")}</span>
                            <span className="font-mono text-black">
                              {formatPrice(total, "MXN", true)}
                            </span>
                          </div>

                          {appliedCoupon && (
                            <div className="flex justify-between gap-4 text-pink-500">
                              <span>{t("financial.discount")}</span>
                              <span className="font-mono">
                                -{formatPrice(discountAmount, "MXN", true)}
                              </span>
                            </div>
                          )}

                          <div className="border-t border-neutral-200 pt-5">
                            <div className="flex items-baseline justify-between gap-4">
                              <span className="font-sans text-sm font-bold text-black">
                                {t("financial.netTotal")}
                              </span>
                              <span className="font-sans text-2xl font-black tracking-tight text-black">
                                {formatPrice(grandTotal, "MXN", true)}
                              </span>
                            </div>

                            <p className="mt-2 text-right font-sans text-xs font-medium text-neutral-500">
                              {t("financial.tax", {
                                tax: formatPrice(iva, "MXN", true),
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mt-8 space-y-4">
                          <button
                            type="submit"
                            form="octano-payment-form"
                            disabled={isProcessing}
                            className={`flex w-full items-center justify-center gap-2 rounded-full py-4 font-sans text-base font-bold text-white shadow-sm transition-all active:scale-95 ${isProcessing
                              ? "cursor-wait bg-neutral-400"
                              : "bg-pink-500 hover:bg-pink-600"
                              }`}
                          >
                            {isProcessing ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>{t("actions.processing")}</span>
                              </span>
                            ) : (
                              t("actions.payAmount", {
                                amount: formatPrice(grandTotal, "MXN", true),
                              })
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => setStep(1)}
                            className="flex w-full items-center justify-center gap-2 py-2 font-sans text-sm font-semibold text-neutral-500 transition hover:text-black"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            {t("actions.backToCart")}
                          </button>
                        </div>
                      </CardShell>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Wave Blanca Superior */}

      </main>

      <BlackBottomWave />

    </div>
  );
}