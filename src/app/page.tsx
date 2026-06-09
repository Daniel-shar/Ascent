import Link from "next/link";
import { CinematicHero } from "@/components/ui/cinematic-landing-hero";
import ScrollReveal from "@/components/ScrollReveal";
import CheckIcon from "@/components/CheckIcon";
import {
  LaunchIllustration,
  OptimiseIllustration,
  OperateIllustration,
} from "@/components/Illustrations";

const proof = [
  "Custom web apps",
  "Shopify stores",
  "Conversion optimisation",
  "Monthly tech support",
];

const services = [
  {
    title: "Build",
    description: "Turn a business idea into a working website, app, store, or internal tool.",
    items: ["SaaS MVPs", "Shopify stores", "Landing pages"],
    visual: <LaunchIllustration />,
  },
  {
    title: "Grow",
    description: "Improve the experience after launch so more visitors become customers.",
    items: ["CRO audits", "UX improvements", "Analytics setup"],
    visual: <OptimiseIllustration />,
  },
  {
    title: "Maintain",
    description: "Stay on as your technical team for fixes, features, performance, and support.",
    items: ["Bug fixes", "Feature updates", "Ongoing support"],
    visual: <OperateIllustration />,
  },
];

const businessModels = [
  {
    title: "Fixed launch sprint",
    description: "A defined build for a new website, app, Shopify store, MVP, or landing page.",
    detail: "Best when you need to get from idea to a live product quickly.",
  },
  {
    title: "Growth sprint",
    description: "A focused optimisation block for conversion, UX, speed, analytics, or funnel fixes.",
    detail: "Best when you already have traffic but the product is not converting well enough.",
  },
  {
    title: "Monthly technical partner",
    description: "Ongoing development, maintenance, bug fixes, features, and product improvements.",
    detail: "Best when you want a reliable tech team without hiring in-house.",
  },
];

const process = [
  ["01", "Map the business goal", "Define the sharpest version of the product and the fastest useful path to market."],
  ["02", "Build in tight sprints", "Ship visible progress weekly, with scope controlled around the outcome that matters."],
  ["03", "Launch and measure", "Deploy cleanly, track the funnel, and turn real behaviour into the next improvement loop."],
  ["04", "Keep compounding", "Improve conversion, stability, speed, and product depth once users are actually there."],
];

const outcomes = [
  { value: "6w", label: "average MVP launch cycle" },
  { value: "+35%", label: "conversion lift target from focused CRO" },
  { value: "99.9%", label: "uptime standard for operated products" },
];

function ProofStrip() {
  return (
    <section className="border-b border-charcoal/10 bg-cream">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-6 py-4 sm:grid-cols-4 lg:px-8">
        {proof.map((item) => (
          <div key={item} className="min-h-14 border-charcoal/10 px-3 py-3 text-center text-sm font-medium text-stone sm:border-l first:border-l-0">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}

function OperatingModel() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 lg:grid-cols-[0.88fr_1.12fr] lg:px-8">
        <ScrollReveal>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-bark">What Ascends does</p>
          <h2 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
            We are the technical team behind your launch, store, app, or growth plan.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone">
            Ascends helps non-technical founders, Shopify brands, and growing
            businesses build the digital product they need, improve the parts
            that affect revenue, and keep the technical side moving after launch.
          </p>
          <p className="mt-4 max-w-xl text-base leading-8 text-stone">
            You can hire us for a fixed project, a focused growth sprint, or an
            ongoing monthly partnership.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {services.map((service, index) => (
            <ScrollReveal key={service.title} delay={index * 0.08}>
              <article className="h-full overflow-hidden rounded-lg border border-charcoal/10 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-charcoal/10">
                <div className="relative h-28 border-b border-charcoal/10">
                  {service.visual}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-charcoal">{service.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone">{service.description}</p>
                  <ul className="mt-4 space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-stone">
                        <CheckIcon className="mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function BusinessModel() {
  return (
    <section className="border-y border-charcoal/10 bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-bark">How we work</p>
            <h2 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              Clear ways to work with us, without hiring a full internal team.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone">
              We combine product strategy, design, development, analytics, and
              optimisation into one partner model. You choose the level of
              support based on where the business is right now.
            </p>
          </ScrollReveal>

          <div className="grid gap-4">
            {businessModels.map((model, index) => (
              <ScrollReveal key={model.title} delay={index * 0.06}>
                <article className="grid gap-4 rounded-lg border border-charcoal/10 bg-cream p-5 sm:grid-cols-[11rem_1fr] sm:p-6">
                  <h3 className="text-lg font-semibold text-charcoal">{model.title}</h3>
                  <div>
                    <p className="text-sm leading-7 text-stone">{model.description}</p>
                    <p className="mt-2 text-sm font-medium leading-6 text-bark">{model.detail}</p>
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessPanel() {
  return (
    <section className="bg-sand py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_1.4fr]">
          <ScrollReveal>
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-bark">The system</p>
            <h2 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
              A practical path that keeps momentum visible.
            </h2>
            <p className="mt-5 text-base leading-8 text-stone">
              Each step is designed to remove ambiguity. You always know what is
              being built, why it matters, and what happens after launch.
            </p>
            <Link
              href="/process"
              className="mt-8 inline-flex min-h-11 items-center justify-center rounded-full bg-charcoal px-6 py-3 text-sm font-semibold text-cream transition-colors hover:bg-bark"
            >
              View process
            </Link>
          </ScrollReveal>

          <div className="grid gap-3">
            {process.map(([number, title, description], index) => (
              <ScrollReveal key={number} delay={index * 0.06}>
                <div className="grid gap-4 rounded-lg border border-charcoal/10 bg-cream p-5 sm:grid-cols-[4rem_1fr]">
                  <div className="font-mono text-sm font-semibold text-warm">{number}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-charcoal">{title}</h3>
                    <p className="mt-2 text-sm leading-7 text-stone">{description}</p>
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

function Outcomes() {
  return (
    <section className="bg-cream py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="overflow-hidden rounded-lg border border-charcoal/10 bg-charcoal text-cream">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.1fr]">
            <div className="p-8 sm:p-10">
              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-emerald-200">Why Ascends</p>
              <h2 className="text-3xl font-semibold leading-tight sm:text-4xl">
                Built for people who need technical execution, not another vague agency.
              </h2>
              <p className="mt-5 text-base leading-8 text-cream/68">
                You get practical product thinking, fast implementation, clear
                communication, and a team that stays close to revenue, stability,
                and user experience after the first release.
              </p>
            </div>
            <div className="grid border-t border-white/10 lg:grid-cols-3 lg:border-l lg:border-t-0">
              {outcomes.map((item) => (
                <div key={item.value} className="border-b border-white/10 p-8 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0">
                  <div className="text-4xl font-semibold text-white">{item.value}</div>
                  <p className="mt-3 text-sm leading-6 text-cream/60">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA() {
  return (
    <section className="bg-cream pb-20 sm:pb-28">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-lg border border-charcoal/10 bg-white p-8 text-center shadow-sm sm:p-12">
          <h2 className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            Need a website, app, store, or technical team?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone">
            Bring the messy context. We will help you choose the right path:
            fixed build, growth sprint, or ongoing technical partnership.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-warm px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-warm/25 transition-colors hover:bg-bark"
            >
              Inquire now
            </Link>
            <Link
              href="/services"
              className="inline-flex min-h-11 items-center justify-center rounded-full border border-charcoal/14 px-7 py-3 text-sm font-semibold text-charcoal transition-colors hover:bg-sand"
            >
              Explore services
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <CinematicHero />
      <ProofStrip />
      <OperatingModel />
      <BusinessModel />
      <ProcessPanel />
      <Outcomes />
      <FinalCTA />
    </main>
  );
}
