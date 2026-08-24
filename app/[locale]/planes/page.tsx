import type { Metadata } from "next";
import { PlansCatalog } from "@/components/plans/plans";
import { CustomService } from "@/components/plans/custom-service";
import { QuoteCta } from "@/components/plans/quote-cta";

export const metadata: Metadata = {
  title: "Planes — Marca Visible",
  description:
    "Preproducción digital, producción audiovisual remota y postproducción: elige el plan que necesita tu marca.",
};

export default function PlanesPage() {
  return (
    <div className="bg-lime-300 py-24">
      <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-5">
        <div className="rounded-[32px] bg-lime-300 px-5 py-14 shadow-panel sm:px-10 lg:px-14 lg:py-16">
          <PlansCatalog />

          <div className="mt-20">
            <CustomService />
          </div>

          <div className="mt-20">
            <QuoteCta />
          </div>
        </div>
      </div>
    </div>
  );
}
