import Link from "next/link";
import HeroLaptop from "@/components/HeroLaptop";
import ScrollReveal from "@/components/ScrollReveal";
import {
  LaunchIllustration,
  OptimiseIllustration,
  OperateIllustration,
  AbstractBlobs,
} from "@/components/Illustrations";

function TrustBar() {
  const trustItems = [
    "Trusted by founders",
    "Built for startups & Shopify brands",
    "End-to-end execution",
  ];

  return (
    <section className="border-y border-tan/70 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-7">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {trustItems.map((item, i) => (
            <div key={item} className="flex items-center gap-3">
              <span className="inline-flex items-center rounded-full border border-tan/70 bg-cream px-4 py-2 text-sm font-medium text-charcoal shadow-sm shadow-tan/20">
                {item}
              </span>
              {i < trustItems.length - 1 && (
                <span className="hidden sm:block h-1.5 w-1.5 rounded-full bg-warm/80" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhatWeDoSection() {
  return (
    <section className="bg-gradient-to-b from-cream to-sand/40 py-16 sm:py-20 border-b border-tan/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-bark mb-4">What we do</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
              From idea to scale — we handle the entire journey.
            </h2>
            <p className="mt-4 text-lg text-stone leading-relaxed">
              Whether you&apos;re starting from scratch or looking to grow, Ascent helps you build, optimise, and maintain your business.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.15} direction="right">
            <div className="grid gap-4">
              <div className="rounded-2xl border border-tan/70 bg-cream p-6 sm:p-7 shadow-sm">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-bark">How we help</p>
                <ul className="mt-4 space-y-3">
                  {[
                    "Strategy and technical planning from day one",
                    "Fast build cycles focused on shipping outcomes",
                    "Ongoing optimisation and long-term support",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-sm text-stone leading-relaxed">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-tan/70 bg-sand/65 p-5">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-bark">Speed</p>
                  <p className="mt-2 text-lg font-semibold text-charcoal">Move from idea to launch in weeks</p>
                </div>
                <div className="rounded-2xl border border-tan/70 bg-sand/65 p-5">
                  <p className="text-xs font-medium tracking-[0.18em] uppercase text-bark">Support</p>
                  <p className="mt-2 text-lg font-semibold text-charcoal">Stay stable, improve, and scale</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

const services = [
  {
    title: "Launch",
    description: "We turn your idea into a real product.",
    items: ["MVP development", "Shopify store setup", "Landing pages", "Payments & backend systems"],
    illustration: <LaunchIllustration />,
  },
  {
    title: "Optimise",
    description: "We improve how your product performs.",
    items: ["Conversion rate optimisation", "UX improvements", "Funnel optimisation", "Analytics & tracking"],
    illustration: <OptimiseIllustration />,
  },
  {
    title: "Operate",
    description: "We manage everything ongoing.",
    items: ["Bug fixes", "Feature updates", "Performance improvements", "Ongoing support"],
    illustration: <OperateIllustration />,
  },
];

function ServicesOverview() {
  return (
    <section className="bg-sand-dark py-16 sm:py-20 border-b border-tan/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <ScrollReveal key={service.title} delay={i * 0.1}>
              <div className="group rounded-2xl bg-cream border border-tan/60 overflow-hidden transition-all hover:shadow-lg hover:shadow-tan/30">
                <div className="relative h-44 overflow-hidden rounded-t-2xl">
                  {service.illustration}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-charcoal">{service.title}</h3>
                  <p className="mt-2 text-sm text-stone leading-relaxed">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-stone">
                        <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-sm font-medium text-bark hover:text-charcoal transition-colors"
          >
            View all services
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    title: "Define your idea",
    description: "We understand your vision, goals, and requirements.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Build your product fast",
    description: "We develop with a focus on core functionality.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Launch to real users",
    description: "We deploy and ensure everything works in production.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Improve conversion",
    description: "We optimise performance, UX, and revenue.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Scale and maintain",
    description: "We provide ongoing support and improvements.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
];

function ProcessSection() {
  return (
    <section className="bg-cream py-16 sm:py-20 border-b border-tan/70">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
          <ScrollReveal>
            <p className="text-sm font-medium tracking-widest uppercase text-bark mb-4">Our process</p>
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
              A clear path from idea to scale.
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1} direction="right">
            <div className="relative overflow-hidden rounded-2xl border border-tan/60 bg-charcoal shadow-xl shadow-tan/20">
              <div className="absolute inset-0">
                <AbstractBlobs variant="emerald" />
              </div>
              <div className="relative grid gap-3 p-6 sm:p-8">
                {steps.slice(0, 3).map((step) => (
                  <div key={step.number} className="flex items-center gap-4 rounded-2xl border border-white/10 bg-charcoal/55 p-4 backdrop-blur-sm">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-cream">
                      {step.icon}
                    </div>
                    <div>
                      <p className="text-[11px] uppercase tracking-[0.2em] text-cream/45">{step.number}</p>
                      <p className="text-sm font-medium text-cream">{step.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {steps.map((step, i) => (
            <ScrollReveal key={step.number} delay={i * 0.08}>
              <div className="relative rounded-2xl border border-tan/60 bg-sand/50 p-5 transition-all hover:shadow-md hover:shadow-tan/20">
                {i < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-px bg-tan" />
                )}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-cream text-bark border border-tan/60">
                    {step.icon}
                  </div>
                  <span className="text-xs font-semibold text-tan">{step.number}</span>
                </div>
                <h3 className="text-base font-semibold text-charcoal">{step.title}</h3>
                <p className="mt-1.5 text-sm text-stone leading-relaxed">{step.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            href="/process"
            className="inline-flex items-center gap-2 text-sm font-medium text-bark hover:text-charcoal transition-colors"
          >
            Learn about our process
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}

const reasons = [
  {
    number: "01",
    title: "Technical + growth focused",
    description: "We don't just build — we optimise for conversions, performance, and real business outcomes.",
    highlight: "Build + conversion under one team",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Fast execution",
    description: "We ship fast without cutting corners. Your product goes from idea to live in weeks, not months.",
    highlight: "Clear sprints and direct communication",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Long-term partner",
    description: "We're not just a freelancer. We're your technical team that grows with your business.",
    highlight: "Ongoing support and product ownership",
    icon: (
      <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
      </svg>
    ),
  },
];

function WhyAscent() {
  return (
    <section className="relative overflow-hidden bg-cream py-16 sm:py-20 border-b border-tan/70">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,168,130,0.2),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.1),_transparent_36%)]" />
      <div className="absolute left-8 top-10 h-40 w-40 rounded-full bg-warm/12 blur-3xl" />
      <div className="absolute right-0 bottom-0 h-56 w-56 rounded-full bg-indigo-400/8 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-10 lg:gap-14 items-start">
          <ScrollReveal>
            <div className="max-w-xl">
              <p className="text-sm font-medium tracking-widest uppercase text-bark mb-4">Why Ascent</p>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal leading-[1.15]">
                A partner built for speed, quality, and outcomes.
              </h2>
              <p className="mt-5 text-base text-stone leading-relaxed">
                Most teams force you to choose between speed and quality. We design for both — and stay accountable after launch.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-3 max-w-md">
                {["Fast onboarding", "Senior execution", "Growth mindset", "Ongoing support"].map((item) => (
                  <div key={item} className="rounded-xl border border-tan/70 bg-sand/65 px-3 py-2.5 text-xs text-stone">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="space-y-4">
            {reasons.map((reason, i) => (
              <ScrollReveal key={reason.title} delay={i * 0.08} direction="right">
                <div className="rounded-2xl border border-charcoal/40 bg-charcoal p-5 sm:p-6 backdrop-blur-sm transition-all shadow-lg shadow-charcoal/10 hover:border-charcoal/60 hover:bg-charcoal/95">
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cream/20 bg-cream/10 text-cream flex-shrink-0">
                      {reason.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-3">
                        <h3 className="text-lg font-semibold text-cream">{reason.title}</h3>
                        <span className="rounded-full border border-cream/20 bg-cream/10 px-2 py-0.5 text-[11px] font-medium tracking-wider text-cream/65">
                          {reason.number}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-cream/70 leading-relaxed">{reason.description}</p>
                      <p className="mt-3 inline-flex rounded-full border border-warm/35 bg-warm/10 px-3 py-1 text-xs text-warm">
                        {reason.highlight}
                      </p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="relative bg-charcoal py-16 sm:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,168,130,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(129,140,248,0.2),_transparent_35%)]" />
      <div className="absolute left-10 top-10 h-40 w-40 rounded-full bg-warm/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-cream">
          Ready to build something real?
        </h2>
        <p className="mt-4 text-lg text-cream/60 max-w-xl mx-auto">
          Let&apos;s talk about your idea and how we can bring it to life together.
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
  );
}

export default function Home() {
  return (
    <>
      <HeroLaptop />
      <TrustBar />
      <WhatWeDoSection />
      <ServicesOverview />
      <ProcessSection />
      <WhyAscent />
      <FinalCTA />
    </>
  );
}
