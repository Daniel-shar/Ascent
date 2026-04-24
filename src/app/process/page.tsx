import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { AbstractBlobs, LaunchIllustration, OperateIllustration, OptimiseIllustration } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "Process — Ascent",
  description: "Our proven 5-step process takes you from idea to scalable product.",
};

const steps = [
  {
    number: "01",
    title: "Discovery",
    description:
      "We start by understanding your idea, goals, target audience, and requirements. We map out the scope, define priorities, and create a clear roadmap so everyone is aligned from day one.",
    details: [
      "Deep-dive into your business goals",
      "User & market understanding",
      "Technical requirements gathering",
      "Project roadmap & timeline",
    ],
    visual: <AbstractBlobs variant="indigo" />,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build",
    description:
      "We develop your product quickly with a focus on core functionality. Using modern tech and iterative sprints, we ship fast without compromising quality.",
    details: [
      "Iterative development sprints",
      "Core feature prioritisation",
      "Modern tech stack (Next.js, React, Shopify)",
      "Regular progress updates",
    ],
    visual: <LaunchIllustration />,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Launch",
    description:
      "We deploy your product and ensure everything works flawlessly in production. From hosting setup to monitoring, we handle every detail of a smooth launch.",
    details: [
      "Production deployment",
      "Performance testing",
      "Monitoring & error tracking setup",
      "Launch support",
    ],
    visual: <OptimiseIllustration />,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Optimise",
    description:
      "Once live, we analyse real user data to improve performance, UX, and conversion. Every change is backed by data, not guesswork.",
    details: [
      "Analytics & tracking setup",
      "Conversion rate optimisation",
      "UX improvements based on data",
      "A/B testing",
    ],
    visual: <AbstractBlobs variant="emerald" />,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Scale",
    description:
      "We provide ongoing support, continuous improvements, and new feature development. As your business grows, your product grows with it.",
    details: [
      "Ongoing development & maintenance",
      "New feature development",
      "Performance optimisation",
      "Strategic technical guidance",
    ],
    visual: <OperateIllustration />,
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
];

export default function ProcessPage() {
  return (
    <>
      <section className="bg-cream pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-bark mb-4">Our process</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.1]">
                A proven path from idea to scale.
              </h1>
              <p className="mt-6 text-lg text-stone leading-relaxed">
                We follow a structured 5-step process that&apos;s been refined across dozens of projects. No ambiguity, no surprises.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-tan/60 bg-charcoal shadow-xl shadow-tan/20">
                <div className="absolute inset-0">
                  <AbstractBlobs variant="amber" />
                </div>
                <div className="relative grid gap-4 p-8">
                  {steps.map((step) => (
                    <div key={step.number} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-charcoal/55 p-4 backdrop-blur-sm">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cream">
                        {step.icon}
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.15em] text-cream/55">{step.number}</div>
                        <div className="text-sm font-medium text-cream">{step.title}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream pb-16 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="space-y-0">
            {steps.map((step, i) => (
              <ScrollReveal key={step.number}>
                <div className="relative">
                  {i < steps.length - 1 && (
                    <div className="absolute left-[27px] top-[72px] bottom-0 w-px bg-tan hidden sm:block" />
                  )}
                  <div className="grid grid-cols-1 sm:grid-cols-[56px_1fr] gap-6 sm:gap-10 py-10 border-b border-tan/60 last:border-b-0">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-sand border border-tan/60 text-bark flex-shrink-0">
                      {step.icon}
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_200px] gap-8 items-start">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm sm:text-base font-semibold text-bark">{step.number}</span>
                          <h2 className="text-2xl font-semibold text-charcoal">{step.title}</h2>
                        </div>
                        <p className="text-base text-stone leading-relaxed">{step.description}</p>
                        <ul className="mt-4 space-y-2">
                          {step.details.map((detail) => (
                            <li key={detail} className="flex items-start gap-3 text-sm text-stone">
                              <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                              </svg>
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="hidden lg:block relative h-32 rounded-xl overflow-hidden border border-tan/60 bg-charcoal">
                        {step.visual}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-charcoal py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cream">
            Ready to start your journey?
          </h2>
          <p className="mt-4 text-lg text-cream/60 max-w-xl mx-auto">
            Let&apos;s talk about where you are and map out the next steps together.
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
