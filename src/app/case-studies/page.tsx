import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CaseStudyMetric from "@/components/CaseStudyMetric";
import { AbstractBlobs } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Case Studies — Ascent",
  description: "See how we've helped founders and brands build, optimise, and scale.",
};

const caseStudies = [
  {
    title: "E-commerce Conversion Boost",
    category: "Optimise",
    problem:
      "A Shopify store was getting decent traffic but had a low conversion rate. The product pages were cluttered, the checkout flow had too many steps, and there was no urgency or trust signals.",
    solution:
      "We redesigned the product pages with cleaner layouts, added trust badges and reviews, simplified the checkout to a single page, and implemented urgency elements like stock counters.",
    outcome: "+35% conversion rate increase",
    metric: "35%",
    metricLabel: "Conversion increase",
  },
  {
    title: "SaaS MVP Launch",
    category: "Launch",
    problem:
      "A founder had a validated idea for a project management tool targeting freelancers but no technical co-founder. They needed to go from concept to a working product quickly to capture early users.",
    solution:
      "We built a full MVP with authentication, project boards, time tracking, and invoicing in 6 weeks using Next.js and a modern backend. Deployed on Vercel with Stripe integration for payments.",
    outcome: "Launched in 6 weeks with 200+ beta signups",
    metric: "6 weeks",
    metricLabel: "Idea to launch",
  },
  {
    title: "Platform Stability Overhaul",
    category: "Operate",
    problem:
      "An established SaaS product was experiencing frequent downtime, slow page loads, and mounting technical debt. The original developer had left, and the codebase was difficult to maintain.",
    solution:
      "We performed a full technical audit, fixed critical bugs, migrated to a modern infrastructure, added monitoring and alerting, and established a maintenance workflow for ongoing improvements.",
    outcome: "99.9% uptime, 60% faster load times",
    metric: "99.9%",
    metricLabel: "Uptime achieved",
  },
];

export default function CaseStudiesPage() {
  return (
    <>
      <section className="bg-cream pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-bark mb-4">Case Studies</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.1]">
                Real results for real businesses.
              </h1>
              <p className="mt-6 text-lg text-stone leading-relaxed">
                See how we&apos;ve helped founders and brands build, optimise, and scale their products.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-tan/60 bg-charcoal shadow-xl shadow-tan/20">
                <div className="absolute inset-0">
                  <AbstractBlobs variant="emerald" />
                </div>
                <div className="relative grid gap-4 p-8">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-cream/60">Recent wins</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {[
                        { value: "35%", label: "CRO" },
                        { value: "6w", label: "Launch" },
                        { value: "99.9%", label: "Uptime" },
                      ].map((item) => (
                        <div key={item.label} className="rounded-xl border border-white/10 bg-charcoal/45 p-3 text-center">
                          <div className="text-lg font-semibold text-cream">{item.value}</div>
                          <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-cream/45">{item.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-charcoal/55 p-5 text-sm text-cream/75 backdrop-blur-sm">
                    Practical examples of how Ascent moves products from bottlenecks to measurable outcomes.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-12">
          {caseStudies.map((study) => (
            <ScrollReveal key={study.title}>
              <div className="rounded-3xl border border-tan/60 overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3">
                  <CaseStudyMetric metric={study.metric} label={study.metricLabel} category={study.category} />

                  <div className="lg:col-span-2 p-8 sm:p-10 bg-cream">
                    <h2 className="text-xl sm:text-2xl font-semibold text-charcoal">{study.title}</h2>

                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                      <div>
                        <h3 className="text-xs font-medium tracking-wider uppercase text-bark mb-2">Problem</h3>
                        <p className="text-sm text-stone leading-relaxed">{study.problem}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium tracking-wider uppercase text-bark mb-2">Solution</h3>
                        <p className="text-sm text-stone leading-relaxed">{study.solution}</p>
                      </div>
                      <div>
                        <h3 className="text-xs font-medium tracking-wider uppercase text-bark mb-2">Outcome</h3>
                        <p className="text-sm font-medium text-charcoal">{study.outcome}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cream">
            Want results like these?
          </h2>
          <p className="mt-4 text-lg text-cream/60 max-w-xl mx-auto">
            Let&apos;s discuss how we can help you achieve your goals.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-charcoal transition-all hover:bg-sand"
            >
              Get in touch
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full border border-cream/20 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:border-cream/40"
            >
              Book a meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
