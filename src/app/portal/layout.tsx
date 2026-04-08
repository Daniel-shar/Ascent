import type { ReactNode } from "react";
import PortalTabs from "@/components/tickets/PortalTabs";

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-sand/45 to-cream pb-20 pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,168,130,0.18),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(44,40,37,0.06),_transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-[36px] border border-tan/70 bg-cream/85 p-6 shadow-[0_28px_90px_-48px_rgba(139,115,85,0.38)] backdrop-blur-md sm:p-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-bark">
                Ascent request portal
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-charcoal sm:text-5xl">
                Client requests outside, execution clarity inside.
              </h1>
              <p className="mt-4 text-base leading-8 text-stone">
                Built for founders and Shopify brands who want fast, thoughtful support without the weight of a traditional ticketing tool.
              </p>
            </div>

            <PortalTabs />
          </div>
        </div>

        <div className="mt-10">{children}</div>
      </div>
    </section>
  );
}
