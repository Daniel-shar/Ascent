import type { Metadata } from "next";
import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { AbstractBlobs, LaunchIllustration } from "@/components/Illustrations";

export const metadata: Metadata = {
  title: "About — Ascent",
  description: "Ascent was built to help founders and businesses move faster with end-to-end technical execution.",
};

const values = [
  {
    title: "Execution over everything",
    description: "We don't just talk strategy. We ship real products, fast. Every decision is made with speed and quality in mind.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
      </svg>
    ),
  },
  {
    title: "Founder-first mindset",
    description: "We understand the pressure of building a business. We communicate clearly, move quickly, and treat your product like our own.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
      </svg>
    ),
  },
  {
    title: "Long-term thinking",
    description: "We build things that last. Clean code, scalable architecture, and systems designed to grow with your business.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605" />
      </svg>
    ),
  },
  {
    title: "Data-driven decisions",
    description: "We don't guess. Every optimisation is backed by analytics, user behaviour data, and measurable outcomes.",
    icon: (
      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "50+", label: "Projects delivered" },
  { value: "6 weeks", label: "Average time to launch" },
  { value: "98%", label: "Client satisfaction" },
  { value: "24/7", label: "Ongoing support" },
];

function AgencyVisual() {
  const bars = [95, 78, 62];
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-stone-700 via-zinc-700 to-neutral-800">
      <div className="absolute inset-0 opacity-25 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute left-6 right-6 top-6 space-y-2.5">
        {bars.map((width, i) => (
          <div key={width} className="rounded-md border border-white/15 bg-white/10 p-2">
            <div className="h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-white/40" style={{ width: `${width - i * 7}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-5 left-6 right-6 flex items-center justify-between">
        <div className="h-2 w-2 rounded-full bg-amber-300/70" />
        <div className="h-1.5 w-20 rounded-full bg-white/20" />
        <div className="h-2 w-2 rounded-full bg-white/35" />
      </div>
    </div>
  );
}

function FreelancerVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_28%,rgba(129,140,248,0.25),transparent_45%)]" />
      <div className="absolute left-1/2 top-[44%] flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white/80">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.7} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6.75a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
      </div>
      <div className="absolute bottom-5 left-6 right-6">
        <div className="h-1.5 rounded-full bg-white/10">
          <div className="h-full w-[42%] rounded-full bg-indigo-400/80" />
        </div>
      </div>
    </div>
  );
}

function AscentVisual() {
  const bars = [88, 93, 91];
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-[#0f1b2a] via-[#15253a] to-[#1f2d3b]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="absolute left-5 right-5 top-5 space-y-2">
        {bars.map((width, i) => (
          <div key={width} className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-300/90" />
            <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-cyan-400 to-indigo-400" style={{ width: `${width - i * 4}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="absolute right-5 top-5 h-2.5 w-2.5 rounded-full bg-emerald-300/90 shadow-[0_0_12px_rgba(110,231,183,0.7)]" />
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="bg-cream pt-20 pb-12 sm:pt-24 sm:pb-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div>
              <p className="text-sm font-medium tracking-widest uppercase text-bark mb-4">About Ascent</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.1]">
                A technical partner for founders.
              </h1>
              <p className="mt-6 text-lg text-stone leading-relaxed">
                Ascent was built to help founders and businesses move faster. Instead of juggling developers, designers, and growth teams, we provide everything in one place.
              </p>
              <p className="mt-4 text-lg text-stone leading-relaxed">
                We focus on execution, speed, and real outcomes. No fluff, no endless meetings — just shipping great products that grow your business.
              </p>
            </div>
            <div className="relative hidden lg:block">
              <div className="relative overflow-hidden rounded-2xl border border-tan/60 bg-charcoal shadow-xl shadow-tan/20">
                <div className="absolute inset-0">
                  <AbstractBlobs variant="emerald" />
                </div>
                <div className="relative grid gap-4 p-8">
                  <div className="rounded-2xl border border-white/10 bg-charcoal/55 p-5 backdrop-blur-sm">
                    <p className="text-xs font-medium uppercase tracking-[0.22em] text-cream/60">Partner model</p>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-2xl font-semibold text-cream">50+</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/45">Projects</div>
                      </div>
                      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                        <div className="text-2xl font-semibold text-cream">6w</div>
                        <div className="mt-1 text-xs uppercase tracking-[0.18em] text-cream/45">Avg launch</div>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm">
                    <div className="flex items-center justify-between text-sm text-cream">
                      <span>Founder support</span>
                      <span className="text-emerald-300">Active</span>
                    </div>
                    <div className="mt-4 space-y-3">
                      {["Product strategy", "Build execution", "Growth optimisation"].map((item) => (
                        <div key={item} className="rounded-xl border border-white/10 bg-charcoal/45 px-4 py-3 text-sm text-cream/75">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <ScrollReveal key={stat.label} delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-3xl sm:text-4xl font-semibold text-charcoal">{stat.value}</div>
                  <p className="mt-2 text-sm text-stone">{stat.label}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <ScrollReveal>
                <p className="text-sm font-medium tracking-widest uppercase text-bark mb-4">Our values</p>
                <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
                  What drives how we work.
                </h2>
              </ScrollReveal>
              <ScrollReveal delay={0.15}>
                <div className="mt-8 h-[350px] rounded-2xl overflow-hidden border border-tan/60 shadow-lg shadow-tan/20">
                  <LaunchIllustration />
                </div>
              </ScrollReveal>
            </div>

            <div className="grid grid-cols-1 gap-5">
              {values.map((value, i) => (
                <ScrollReveal key={value.title} delay={i * 0.08}>
                  <div className="rounded-2xl border border-tan/60 bg-cream p-6 transition-all hover:shadow-lg hover:shadow-tan/20 flex gap-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sand text-bark border border-tan/60 flex-shrink-0">
                      {value.icon}
                    </div>
                    <div>
                      <h3 className="text-base font-semibold text-charcoal">{value.title}</h3>
                      <p className="mt-1.5 text-sm text-stone leading-relaxed">{value.description}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-sand py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <ScrollReveal>
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-charcoal">
                How we&apos;re different
              </h2>
              <p className="mt-6 text-base text-stone leading-relaxed">
                Most agencies hand you a proposal, disappear for weeks, and deliver something that doesn&apos;t match your vision. We work differently.
              </p>
            </div>
          </ScrollReveal>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-8">
            <ScrollReveal delay={0}>
              <div className="rounded-2xl bg-cream border border-tan/60 overflow-hidden">
                <div className="relative h-36 overflow-hidden bg-charcoal">
                  <AgencyVisual />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-sm font-semibold text-charcoal">Traditional agency</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-stone">
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      Long timelines
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      Rigid scope
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      Disappears after launch
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl bg-cream border border-tan/60 overflow-hidden">
                <div className="relative h-36 overflow-hidden bg-charcoal">
                  <FreelancerVisual />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-sm font-semibold text-charcoal">Freelancer</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-stone">
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      Limited capacity
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      No growth expertise
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-stone/40 mt-0.5">&#x2717;</span>
                      Single point of failure
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl bg-cream border border-tan/60 overflow-hidden">
                <div className="relative h-36 overflow-hidden bg-charcoal">
                  <AscentVisual />
                </div>
                <div className="p-6 relative">
                  <h3 className="text-sm font-semibold text-charcoal">Ascent</h3>
                  <ul className="mt-4 space-y-2.5 text-sm text-stone">
                    <li className="flex items-start gap-2">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Fast execution
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Build + growth
                    </li>
                    <li className="flex items-start gap-2">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Long-term partner
                    </li>
                  </ul>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <section className="relative bg-charcoal py-14 sm:py-16 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(196,168,130,0.22),_transparent_30%),radial-gradient(circle_at_bottom_right,_rgba(99,102,241,0.2),_transparent_34%)]" />
        <div className="absolute left-10 top-8 h-40 w-40 rounded-full bg-warm/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-cream">
            Let&apos;s work together.
          </h2>
          <p className="mt-3 text-base text-cream/60 max-w-lg mx-auto">
            Whether you&apos;re just starting out or looking to scale, we&apos;re here to help.
          </p>
          <div className="mt-8">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-charcoal transition-all hover:bg-sand"
            >
              Book a meeting
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
