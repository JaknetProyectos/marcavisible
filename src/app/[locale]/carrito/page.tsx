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
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { processKeycopPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";
import { usePackages } from "@/hooks/usePackages";
import { useProduct } from "@/hooks/useProduct";

const VALID_COUPONS = [
  { code: "MARCA10", discount: 0.1 },
  { code: "BRAND15", discount: 0.15 },
  { code: "MARCAPRO20", discount: 0.2 },
];

function CartItemRow({ item }: { item: any }) {

  const itemReal = useProduct(item.product.id);
  const { removeItem, updateQuantity } = useCart()

  // Puedes usar itemReal en caso de requerir datos actualizados del servidor
  const productData = itemReal;

  return (
    <div
      key={item.product.id}
      className="rounded-xl bg-slate-50 p-4 shadow-sm transition-transform hover:-translate-y-1"
    >
      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 sm:grid-cols-[96px_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-xl bg-white p-2 shadow-sm">
          <Link href={`/soluciones`} className="absolute inset-0 z-10" />
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-1 inline-block rounded-md bg-green-100 px-2 py-0.5 font-mono text-[9px] font-bold tracking-[0.16em] text-green-600">
                {productData.id}
              </p>

              <h3 className="line-clamp-1 text-base font-bold text-slate-800">
                {productData.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.product.id)}
              className="rounded-xl p-1.5 text-slate-400 transition hover:bg-slate-200 hover:text-pink-500"
            >
              <Trash2 className="h-5 w-5" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex items-center rounded-xl bg-white p-1 shadow-sm">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Minus className="h-3 w-3" />
              </button>

              <span className="w-9 text-center text-xs font-bold text-slate-900">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            <span className="text-lg font-black tracking-tight text-slate-900">
              {formatPrice(
                productData.price * item.quantity,
                "MXN",
                true
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

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
      className={[
        "relative overflow-hidden rounded-xl bg-white",
        "shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300",
        className,
      ].join(" ")}
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
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-100 text-green-600">
        <Icon className="h-6 w-6" />
      </div>
      <h3 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
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
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-1.5 block text-xs font-bold text-slate-500">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4",
          "font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400",
          "focus:border-blue-500 focus:bg-white",
          mono ? "font-mono tracking-widest" : "",
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
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
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
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processKeycopPayment(paymentPayload);

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch(`/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
              locale
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
        console.log(response.error)
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
      <div className="relative min-h-screen bg-green-600 text-slate-900 overflow-hidden">
        {/* Floating Icons Background */}
        <div className="pointer-events-none absolute inset-0">
          <CheckCircle2 className="absolute left-[10%] top-[15%] h-32 w-32 -rotate-12 text-green-500/40" />
          <ShoppingBag className="absolute bottom-[10%] right-[5%] h-48 w-48 text-green-700/30" />
        </div>

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-14 pt-32 md:px-6">
          <section className="relative mx-auto w-full max-w-xl">
            <CardShell className="p-7 text-center sm:p-9">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-xl bg-green-100 text-green-500 shadow-sm">
                <CheckCircle2 className="h-10 w-10" />
              </div>

              <h1 className="text-3xl font-black tracking-tight text-slate-900">
                {t("success.title")}
              </h1>

              <p className="mx-auto mt-3 max-w-sm text-sm font-medium leading-relaxed text-slate-500">
                {t("success.description")}
              </p>

              <div className="mt-8 rounded-xl bg-slate-50 p-5 text-left">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3">
                  <span className="text-xs font-bold text-slate-400">
                    {t("success.transactionStatus")}
                  </span>
                  <span className="text-xs font-bold text-green-500">
                    {t("success.approved")}
                  </span>
                </div>
              </div>

              <Link href="/soluciones" className="mt-8 block">
                <button className="w-full rounded-xl bg-pink-500 py-4 text-sm font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-pink-600">
                  {t("success.backToCatalog")}
                </button>
              </Link>
            </CardShell>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-green-600 text-slate-900">
      {/* Floating Icons Background */}
      <div className="pointer-events-none absolute inset-0">
        <ShoppingBag className="absolute right-[10%] top-[15%] h-40 w-40 rotate-12 text-green-500/50" />
        <CreditCard className="absolute bottom-[20%] left-[5%] h-32 w-32 -rotate-12 text-green-700/30" />
        <MapPin className="absolute left-[20%] top-[10%] h-20 w-20 rotate-6 text-green-400/40 animate-pulse" />
      </div>

      <div className="h-8" />

      <div className="sticky mt-0 z-40 border-b border-blue-500/30 bg-green-600/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <nav className="flex items-center gap-2 text-xs font-semibold text-green-200">
            <Link href="/" className="transition hover:text-white">
              {t("breadcrumb.home")}
            </Link>
            <span className="text-green-400">/</span>
            <span
              className={
                step === 1 ? "font-bold text-white" : "text-green-300"
              }
            >
              {t("breadcrumb.summary")}
            </span>
            <span className="text-green-400">/</span>
            <span
              className={
                step === 2 ? "font-bold text-white" : "text-green-300"
              }
            >
              {t("breadcrumb.shippingPayment")}
            </span>
          </nav>

          <div className="flex items-center gap-3">
            <div
              className={`h-2.5 w-2.5 rounded-xl transition-colors duration-300 ${step >= 1 ? "bg-white" : "bg-green-800"
                }`}
            />
            <div
              className={`h-0.5 w-12 rounded-xl transition-colors duration-300 ${step >= 2 ? "bg-white" : "bg-green-800"
                }`}
            />
            <div
              className={`h-2.5 w-2.5 rounded-xl transition-colors duration-300 ${step >= 2 ? "bg-white" : "bg-green-800"
                }`}
            />
          </div>
        </div>
      </div>

      <main className="relative z-10 py-8 md:py-12">
        <div className="mx-auto px-4 md:px-6">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-8 text-center sm:p-10">
              <ShoppingBag className="mx-auto mb-5 h-16 w-16 text-green-200" />
              <h2 className="text-2xl font-bold text-slate-900">
                {t("empty.title")}
              </h2>
              <p className="mx-auto mt-2 max-w-xs text-sm font-medium leading-relaxed text-slate-500">
                {t("empty.description")}
              </p>
              <Link href="/soluciones" className="mt-8 inline-block">
                <button className="rounded-xl bg-pink-500 px-8 py-4 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-pink-600">
                  {t("empty.goToStore")}
                </button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid gap-8 lg:items-start">
              <div className="space-y-5">
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-xl bg-pink-50 p-4 text-sm font-bold text-pink-600 shadow-sm">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-pink-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,0.8fr)]">
                    <CardShell className="p-5 sm:p-8">
                      <div className="flex items-center justify-between gap-4">
                        <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                          {t("order.title")}
                        </h2>

                        <button
                          type="button"
                          onClick={clearCart}
                          className="flex items-center gap-1.5 text-xs font-bold text-pink-500 transition hover:text-pink-600"
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
                          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                            {t("financial.title")}
                          </h2>
                        </div>

                        <div className="mt-5 flex flex-row items-center justify-center rounded-xl bg-slate-50 p-4">
                          <Image
                            src="/keycop.webp"
                            alt={t("images.securePaymentAlt")}
                            width={150}
                            height={20}
                            className="object-contain"
                          />
                        </div>

                        <div className="mt-5 space-y-4">
                          {!appliedCoupon ? (
                            <form
                              onSubmit={handleApplyCoupon}
                              className="grid gap-3 rounded-xl bg-slate-50 p-4"
                            >
                              <div className="flex items-center justify-between gap-3">
                                <div>
                                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-green-600">
                                    {t("financial.applyCoupon")}
                                  </p>
                                  <p className="mt-1 text-[11px] font-medium leading-relaxed text-slate-500">
                                    {t("financial.couponPlaceholder")}
                                  </p>
                                </div>
                              </div>

                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder={t("financial.couponPlaceholder")}
                                  value={couponInput}
                                  onChange={(e) => setCouponInput(e.target.value)}
                                  className="min-w-0 flex-1 rounded-xl border-2 border-transparent bg-white px-4 py-3 text-xs font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500"
                                />
                                <button
                                  type="submit"
                                  className="shrink-0 rounded-xl bg-green-100 px-4 text-xs font-bold text-green-600 transition hover:bg-green-200"
                                >
                                  {t("financial.applyCoupon")}
                                </button>
                              </div>
                            </form>
                          ) : (
                            <div className="rounded-xl bg-green-50 p-4">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-green-600">
                                    {t("financial.appliedCoupon", {
                                      code: appliedCoupon.code,
                                      discount: appliedCoupon.discount * 100,
                                    })}
                                  </p>
                                  <p className="mt-1 text-[11px] font-medium leading-relaxed text-green-500">
                                    {t("financial.remove")}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  onClick={() => setAppliedCoupon(null)}
                                  className="shrink-0 rounded-xl bg-white px-3 py-1.5 text-[10px] font-bold text-pink-500 shadow-sm transition hover:bg-pink-50 hover:text-pink-600"
                                >
                                  {t("financial.remove")}
                                </button>
                              </div>
                            </div>
                          )}

                          {couponError && (
                            <p className="pl-1 text-[10px] font-bold text-pink-500">
                              ⚠️ {couponError}
                            </p>
                          )}
                        </div>

                        <div className="mt-5 space-y-3.5 rounded-xl bg-slate-50 p-5 text-sm font-medium text-slate-500">
                          <div className="flex justify-between gap-4">
                            <span>{t("financial.subtotal")}</span>
                            <span className="font-mono font-bold text-slate-900">
                              {formatPrice(total, "MXN", true)}
                            </span>
                          </div>

                          {appliedCoupon && (
                            <div className="flex justify-between gap-4 text-green-600">
                              <span>{t("financial.discount")}</span>
                              <span className="font-mono font-bold">
                                -{formatPrice(discountAmount, "MXN", true)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="mt-5 rounded-xl bg-green-50 p-6">
                          <div className="flex items-baseline justify-between gap-4">
                            <span className="text-sm font-bold text-green-800">
                              {t("financial.netTotal")}
                            </span>
                            <span className="text-3xl font-black tracking-tight text-green-600">
                              {formatPrice(grandTotal, "MXN", true)}
                            </span>
                          </div>

                          <p className="mt-1 text-right text-[11px] font-medium text-green-500">
                            {t("financial.tax", {
                              tax: formatPrice(iva, "MXN", true),
                            })}
                          </p>
                        </div>

                        <div className="mt-6 space-y-3">
                          <button
                            onClick={() => setStep(2)}
                            className="flex w-full items-center justify-center gap-2 rounded-xl bg-pink-500 py-4 text-xs font-bold uppercase tracking-wide text-white transition-colors duration-300 hover:bg-pink-600"
                          >
                            {t("actions.proceedToPayment")}
                            <ArrowRight className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                          <p className="px-2 text-[10px] font-medium leading-relaxed text-slate-400">
                            {t("security.note")}
                          </p>

                          <div className="mt-3 flex items-center justify-center">
                            <Image
                              src="/secure-payment.png"
                              alt={t("images.securePaymentAlt")}
                              width={100}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </div>
                    </CardShell>
                  </div>
                )}

                {step === 2 && (
                  <form
                    id="octano-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="grid gap-5 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]"
                  >
                    <div className="space-y-5">
                      <CardShell className="p-5 sm:p-8">
                        <SectionTitle
                          icon={User}
                          title={t("form.buyerTitle")}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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

                      <CardShell className="p-5 sm:p-8">
                        <SectionTitle
                          icon={MapPin}
                          title={t("form.addressTitle")}
                        />

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
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
                            <label className="mb-1.5 block text-xs font-bold text-slate-500">
                              {t("form.country")}
                            </label>
                            <select
                              name="pais"
                              value={formData.pais}
                              onChange={handleInputChange}
                              className="w-full appearance-none rounded-xl border-2 border-transparent bg-slate-50 px-5 py-4 font-medium text-slate-900 outline-none transition-all focus:border-blue-500 focus:bg-white"
                            >
                              <option value="MX" className="bg-white text-slate-900">
                                {t("form.mexico")}
                              </option>
                            </select>
                          </div>
                        </div>
                      </CardShell>

                      <CardShell className="p-5 sm:p-8">
                        <div className="flex items-center justify-between gap-4">
                          <SectionTitle
                            icon={CreditCard}
                            title={t("form.paymentTitle")}
                          />
                        </div>

                        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-6">
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
                            maxLength={2}
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

                    <div className="space-y-5">
                      <CardShell className="p-5 sm:p-8">
                        <div className="flex items-center justify-between gap-4">
                          <h2 className="text-xs font-bold uppercase tracking-[0.22em] text-slate-400">
                            {t("financial.title")}
                          </h2>
                        </div>

                        <div className="mt-6 rounded-xl bg-slate-50 p-4">
                          <div className="flex items-center justify-center">
                            <Image
                              src="/keycop.webp"
                              alt={t("images.securePaymentAlt")}
                              width={150}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                        </div>

                        <div className="mt-5 rounded-xl bg-slate-50 p-5 text-sm font-medium text-slate-500">
                          <div className="flex justify-between gap-4">
                            <span>{t("financial.subtotal")}</span>
                            <span className="font-mono font-bold text-slate-900">
                              {formatPrice(total, "MXN", true)}
                            </span>
                          </div>

                          {appliedCoupon && (
                            <div className="mt-3 flex justify-between gap-4 text-green-600">
                              <span>{t("financial.discount")}</span>
                              <span className="font-mono font-bold">
                                -{formatPrice(discountAmount, "MXN", true)}
                              </span>
                            </div>
                          )}

                          <div className="mt-5 border-t border-slate-200 pt-5">
                            <div className="flex items-baseline justify-between gap-4">
                              <span className="text-sm font-bold text-slate-800">
                                {t("financial.netTotal")}
                              </span>
                              <span className="text-2xl font-black tracking-tight text-slate-900">
                                {formatPrice(grandTotal, "MXN", true)}
                              </span>
                            </div>

                            <p className="mt-1 text-right text-[11px] font-medium text-slate-500">
                              {t("financial.tax", {
                                tax: formatPrice(iva, "MXN", true),
                              })}
                            </p>
                          </div>
                        </div>

                        <div className="mt-6 space-y-4">
                          <button
                            type="submit"
                            form="octano-payment-form"
                            disabled={isProcessing}
                            className={[
                              "flex w-full items-center justify-center gap-2 rounded-xl py-4 text-xs font-bold uppercase tracking-wide transition-colors duration-300",
                              isProcessing
                                ? "cursor-wait bg-pink-300 text-white"
                                : "bg-pink-500 text-white hover:bg-pink-600",
                            ].join(" ")}
                          >
                            {isProcessing ? (
                              <span className="flex items-center gap-2">
                                <Loader2 className="h-4 w-4 animate-spin" />
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
                            className="flex w-full items-center justify-center gap-1 py-2 text-xs font-bold text-slate-400 transition hover:text-slate-600"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            {t("actions.backToCart")}
                          </button>
                        </div>

                        <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                          <p className="px-2 text-[10px] font-medium leading-relaxed text-slate-400">
                            {t("security.note")}
                          </p>

                          <div className="mt-3 flex items-center justify-center">
                            <Image
                              src="/secure-payment.png"
                              alt={t("images.securePaymentAlt")}
                              width={100}
                              height={20}
                              className="object-contain"
                            />
                          </div>
                        </div>
                      </CardShell>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}