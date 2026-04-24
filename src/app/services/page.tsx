import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import {
  AbstractBlobs,
  LaunchIllustration,
  OperateIllustration,
  OptimiseIllustration,
} from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Services — Ascent",
  description: "From MVP development to CRO and ongoing maintenance. Ascent handles the entire journey.",
};

const services = [
  {
    tag: "Launch",
    headline: "Turn your idea into a real product.",
    description:
      "We take your concept and build it into a fully functional product, ready for real users. From SaaS platforms to Shopify stores, we handle the entire technical build so you can focus on your business.",
    includes: [
      "SaaS MVP development",
      "Shopify store builds",
      "Landing pages",
      "Payment integration",
      "Authentication systems",
    ],
    outcome: "A fully functional product ready for real users.",
    visual: <LaunchIllustration />,
  },
  {
    tag: "Optimise",
    headline: "Increase conversion and performance.",
    description:
      "Already have traffic but not seeing results? We audit your product, identify friction points, and implement data-driven improvements that turn visitors into customers.",
    includes: [
      "CRO audits",
      "A/B testing",
      "UX improvements",
      "Funnel optimisation",
      "Analytics setup",
    ],
    outcome: "More revenue from the same traffic.",
    visual: <OptimiseIllustration />,
  },
  {
    tag: "Operate",
    headline: "We handle the technical side so you don't have to.",
    description:
      "Technology needs maintenance. We provide ongoing development, fix issues fast, and continuously improve your product so it stays stable, secure, and performant.",
    includes: [
      "Ongoing development",
      "Bug fixes",
      "Feature updates",
      "Performance optimisation",
    ],
    outcome: "A stable, scalable product.",
    visual: <OperateIllustration />,
  },
];

export default function ServicesPage() {
  return (
    <>
      <section className="bg-cream pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-bark mb-4">Services</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.1]">
                Everything you need to build, grow, and maintain.
              </h1>
              <p className="mt-6 text-lg text-stone leading-relaxed">
                We provide end-to-end technical services so you can focus on what matters — your business.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-tan/60 bg-charcoal shadow-xl shadow-tan/20">
                <div className="absolute inset-0">
                  <AbstractBlobs variant="indigo" />
                </div>
                <div className="relative grid gap-4 p-8">
                  <div className="rounded-2xl border border-white/10 bg-charcoal/55 p-5 backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.15em] text-cream/60">Service stack</p>
                    <div className="mt-4 grid grid-cols-3 gap-3">
                      {["Launch", "Optimise", "Operate"].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-white/5 p-3 text-center text-sm font-medium text-cream">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm text-cream">
                      <span>Execution coverage</span>
                      <span className="text-emerald-300">End-to-end</span>
                    </div>
                    <div className="mt-4 h-2 rounded-full bg-white/10">
                      <div className="h-full w-[88%] rounded-full bg-indigo-400" />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 text-xs text-cream/55">
                      <div className="rounded-xl border border-white/10 bg-charcoal/45 p-3">MVP builds</div>
                      <div className="rounded-xl border border-white/10 bg-charcoal/45 p-3">Growth loops</div>
                      <div className="rounded-xl border border-white/10 bg-charcoal/45 p-3">Ongoing support</div>
                      <div className="rounded-xl border border-white/10 bg-charcoal/45 p-3">Analytics</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 space-y-16">
          {services.map((service, i) => (
            <ScrollReveal key={service.tag}>
              <div
                className={`grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl border border-tan/60 overflow-hidden ${
                  i % 2 === 1 ? "bg-sand" : "bg-cream"
                }`}
              >
                <div className={`relative h-64 lg:h-auto ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  {service.visual}
                </div>

                <div className={`p-8 sm:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <span className="inline-block rounded-full bg-sand-dark px-4 py-1.5 text-xs font-medium tracking-wider uppercase text-bark">
                    {service.tag}
                  </span>
                  <h2 className="mt-5 text-2xl sm:text-3xl font-semibold tracking-tight text-charcoal">
                    {service.headline}
                  </h2>
                  <p className="mt-4 text-base text-stone leading-relaxed">{service.description}</p>

                  <h3 className="text-sm font-medium text-charcoal mt-6 mb-3">What&apos;s included</h3>
                  <ul className="space-y-2.5">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-stone">
                        <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 rounded-xl bg-cream border border-tan/60 p-4">
                    <p className="text-xs font-medium tracking-wider uppercase text-bark mb-1">Outcome</p>
                    <p className="text-sm text-charcoal font-medium">{service.outcome}</p>
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
            Not sure what you need?
          </h2>
          <p className="mt-4 text-lg text-cream/60 max-w-xl mx-auto">
            Get in touch and we&apos;ll help you choose the right path for your business.
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
