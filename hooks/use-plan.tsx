"use client";

import { plansEnglish, plansSpanish } from "@/lib/plans";
import { Plan } from "@/types/plan";
import { useLocale } from "next-intl";
import { useMemo } from "react";


export function usePlan(id: string) {
  const locale = useLocale()
  const plans = locale == "es" ? plansSpanish : plansEnglish;

  function getPlan(id: string, locale: string = "es"): Plan | undefined {
    return plans.find((plan) => plan.id === id);
  }

  function getAllPlanIds(): string[] {
    return plans.map((plan) => plan.id);
  }

  function getPlansByGroup(groupId: string, locale: string = "es"): Plan[] {
    return plans.filter((plan) => plan.groupId === groupId);
  }

  function getRelatedPlans(id: string, limit = 2, locale: string = "es"): Plan[] {
    const plan = getPlan(id, locale);
    if (!plan) return [];

    return plans
      .filter((item) => item.groupId === plan.groupId && item.id !== plan.id)
      .slice(0, limit);
  }

  return useMemo(() => {
    const plan = getPlan(id);
    return {
      plan,
      related: plan ? getRelatedPlans(id) : [],
      notFound: !plan,
    };
  }, [id]);
}
