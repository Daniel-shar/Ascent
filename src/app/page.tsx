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
  "Next.js product builds",
  "Shopify growth systems",
  "CRO and analytics",
  "Ongoing technical ownership",
];

const services = [
  {
    title: "Launch",
    description: "Plan, build, and ship the first serious version.",
    items: ["MVP development", "Shopify builds", "Landing pages"],
    visual: <LaunchIllustration />,
  },
  {
    title: "Optimise",
    description: "Improve funnels, speed, UX, and conversion.",
    items: ["Conversion audits", "UX improvements", "Analytics setup"],
    visual: <OptimiseIllustration />,
  },
  {
    title: "Operate",
    description: "Keep the product stable and moving forward.",
    items: ["Bug fixes", "Feature updates", "Ongoing support"],
    visual: <OperateIllustration />,
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
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-bark">What changes</p>
          <h2 className="text-3xl font-semibold leading-tight text-charcoal sm:text-4xl">
            One team for the parts founders normally have to stitch together.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-stone">
            The redesign is built around a more direct promise: Ascends is not a
            loose collection of services. It is an operating partner for getting
            from idea, to launch, to measurable growth.
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
                Built for founders who need traction, not theatre.
              </h2>
              <p className="mt-5 text-base leading-8 text-cream/68">
                You get senior execution, short feedback loops, and a team that
                stays close to business outcomes after the first release.
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
            Ready to turn the idea into something users can touch?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-stone">
            Bring the messy context. We will help shape it into a clear first
            sprint, a realistic launch plan, and the systems to keep improving.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-warm px-7 py-3 text-sm font-semibold text-white shadow-sm shadow-warm/25 transition-colors hover:bg-bark"
            >
              Start the conversation
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
      <ProcessPanel />
      <Outcomes />
      <FinalCTA />
    </main>
  );
}
