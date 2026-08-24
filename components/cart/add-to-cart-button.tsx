"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Minus, Plus } from "lucide-react";
import { useCart } from "@/context/cart-context";
import type { Plan } from "@/types/plan";
import { cn } from "@/lib/utils";
import { useTranslations } from "next-intl";

interface AddToCartButtonProps {
  plan: Plan;
  quantity?: number;
  className?: string;
  label?: string;
}

export function AddToCartButton({
  plan,
  quantity = 1,
  className,
  label,
}: AddToCartButtonProps) {
  const t = useTranslations("cartControls");
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const buttonLabel = label || t("addToCart");

  useEffect(() => () => clearTimeout(timer.current), []);

  const handleClick = () => {
    addItem(plan, quantity);
    setAdded(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1600);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn("btn-pill gap-2", className)}
    >
      {added && <Check className="h-4 w-4" />}
      {added ? t("added") : buttonLabel}
    </button>
  );
}

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function QuantitySelector({ value, onChange }: QuantitySelectorProps) {
  const t = useTranslations("cartControls");

  return (
    <div className="inline-flex items-center gap-4 rounded-full border border-black/10 px-4 py-2.5">
      <button
        type="button"
        aria-label={t("decrease")}
        onClick={() => onChange(Math.max(1, value - 1))}
        className="text-ink-soft transition-colors hover:text-brand disabled:opacity-30"
        disabled={value <= 1}
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="min-w-[28px] text-center font-display text-lg font-semibold">
        {value}
      </span>
      <button
        type="button"
        aria-label={t("increase")}
        onClick={() => onChange(value + 1)}
        className="text-ink-soft transition-colors hover:text-brand"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}