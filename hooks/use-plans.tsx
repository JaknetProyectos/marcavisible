"use client";

import { useMemo } from "react";
//import { planSections, plans } from "@/lib/plans";
import type { Plan, PlanSection } from "@/types/plan";
import { useLocale } from "next-intl";
import { planSectionsEnglish, planSectionsSpanish, plansEnglish, plansSpanish } from "@/lib/plans";

/** Seccion con sus planes ya resueltos, lista para renderizar. */
export interface ResolvedPlanGroup {
  id: string;
  title: string;
  label: string;
  plans: Plan[];
}

export interface ResolvedPlanSection {
  id: string;
  title: string;
  groups: ResolvedPlanGroup[];
}

function resolveSections(
  sections: PlanSection[],
  index: Map<string, Plan>,
): ResolvedPlanSection[] {
  return sections.map((section) => ({
    id: section.id,
    title: section.title,
    groups: section.groups.map((group) => ({
      id: group.id,
      title: group.title,
      label: group.label,
      plans: group.planIds
        .map((id) => index.get(id))
        .filter((plan): plan is Plan => Boolean(plan)),
    })),
  }));
}

/**
 * Acceso centralizado al catalogo de planes.
 * @param options.exclude id de un plan a omitir (util para "relacionados")
 * @param options.groupId limita el resultado a una subcategoria
 */
export function usePlans(options: { exclude?: string; groupId?: string } = {}) {
  const locale = useLocale()
  const plans = locale == "es" ? plansSpanish : plansEnglish;
  const planSections = locale == "es" ? planSectionsSpanish : planSectionsEnglish;

  const { exclude, groupId } = options;

  return useMemo(() => {
    const index = new Map(plans.map((plan) => [plan.id, plan]));

    let list = plans;
    if (groupId) list = list.filter((plan) => plan.groupId === groupId);
    if (exclude) list = list.filter((plan) => plan.id !== exclude);

    return {
      plans: list,
      total: list.length,
      sections: resolveSections(planSections, index),
      cheapest: list.reduce<Plan | null>(
        (min, plan) => (!min || plan.price < min.price ? plan : min),
        null,
      ),
    };
  }, [exclude, groupId]);
}
