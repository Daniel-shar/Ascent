"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const dashboardMetrics = [
  { label: "Revenue", value: "$48.2K", change: "+12.5%" },
  { label: "Users", value: "2,847", change: "+8.3%" },
  { label: "Conversion", value: "3.6%", change: "+1.2%" },
];

const chartBars = [35, 52, 41, 68, 55, 72, 60, 78, 65, 85, 74, 90];
const entranceEase = [0.16, 1, 0.3, 1] as const;

function LaptopScreen() {
  return (
    <div className="absolute inset-0 flex flex-col gap-3 overflow-hidden bg-[#0f1b2a] p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
          <div className="h-2 w-20 rounded bg-white/20" />
        </div>
        <div className="flex gap-1.5">
          <div className="h-2 w-12 rounded bg-white/10" />
          <div className="h-2 w-12 rounded bg-white/10" />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2">
        {dashboardMetrics.map((metric) => (
          <div key={metric.label} className="rounded-lg bg-white/5 p-2.5">
            <div className="text-[8px] text-white/40">{metric.label}</div>
            <div className="mt-0.5 text-sm font-semibold text-white">
              {metric.value}
            </div>
            <div className="mt-0.5 text-[8px] text-emerald-400">
              {metric.change}
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-1 flex-col justify-end rounded-lg bg-white/5 p-3">
        <div className="flex h-full items-end gap-[3px]">
          {chartBars.map((height, index) => (
            <motion.div
              key={index}
              className="flex-1 rounded-t bg-emerald-400"
              initial={{ height: `${Math.max(height - 24, 12)}%` }}
              animate={{ height: `${height}%` }}
              transition={{
                delay: 1.3 + index * 0.08,
                duration: 1.15,
                ease: entranceEase,
              }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/5 p-2.5">
          <div className="mb-1.5 text-[8px] text-white/40">
            Active Projects
          </div>
          <div className="flex gap-1">
            {[70, 45, 85].map((width, index) => (
              <div key={index} className="flex-1">
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    className={`h-full rounded-full ${
                      ["bg-cyan-400", "bg-emerald-400", "bg-amber-400"][index]
                    }`}
                    initial={{ width: `${Math.max(width - 28, 16)}%` }}
                    animate={{ width: `${width}%` }}
                    transition={{
                      delay: 1.85 + index * 0.16,
                      duration: 1.1,
                      ease: entranceEase,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white/5 p-2.5">
          <div className="mb-1 text-[8px] text-white/40">Traffic Source</div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full border-2 border-emerald-400 border-b-amber-400 border-r-cyan-400" />
            <div className="flex flex-col gap-0.5">
              <div className="h-1 w-10 rounded bg-emerald-400/60" />
              <div className="h-1 w-7 rounded bg-cyan-400/60" />
              <div className="h-1 w-4 rounded bg-amber-400/60" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroLaptop() {
  return (
    <section className="relative flex min-h-[calc(100dvh-4rem)] overflow-hidden bg-charcoal">
      <div className="absolute inset-0 border-b border-cream/10" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_74%_48%,rgba(15,118,110,0.24),transparent_30rem),radial-gradient(circle_at_28%_42%,rgba(79,124,255,0.16),transparent_26rem)]" />
      <div className="relative mx-auto flex w-full max-w-[92rem] px-6 py-8 sm:py-10 lg:px-8">
        <div className="grid w-full grid-cols-1 items-center gap-10 lg:grid-cols-[0.85fr_1.45fr] lg:gap-10">
          <div className="mx-auto max-w-xl text-center lg:mx-0 lg:max-w-2xl lg:text-left">
            <motion.p
              className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-cream/65"
              initial={{ opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your technical partner
            </motion.p>
            <motion.h1
              className="mx-auto max-w-[18.5rem] text-[2rem] font-semibold leading-[1.08] tracking-tight text-cream sm:max-w-xl sm:text-5xl lg:mx-0 lg:max-w-none lg:text-[2.9rem] xl:text-[3.6rem]"
              initial={{ opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Build, launch, and scale your business
              <br />
              <span className="text-warm">
                without the technical headaches.
              </span>
            </motion.h1>
            <motion.p
              className="mx-auto mt-4 max-w-[18.5rem] text-base leading-relaxed text-cream/70 sm:max-w-lg sm:text-lg lg:mx-0"
              initial={{ opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Ascends is your technical partner from idea to growth. We build
              products, optimise performance, and manage everything long-term.
            </motion.p>
            <motion.div
              className="mt-6 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start"
              initial={{ opacity: 1, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link
                href="/contact"
                className="hero-primary-cta inline-flex items-center justify-center rounded-full bg-cream px-7 py-3.5 text-sm font-medium text-charcoal shadow-lg shadow-black/10 transition-all hover:bg-sand"
              >
                Get in touch
              </Link>
              <Link
                href="/contact"
                className="hero-secondary-cta inline-flex items-center justify-center rounded-full border border-cream/20 px-7 py-3.5 text-sm font-medium text-cream transition-all hover:border-cream/40 hover:bg-white/5"
              >
                Book a meeting
              </Link>
            </motion.div>
          </div>

          <div
            className="relative flex min-h-[18rem] items-center justify-center sm:min-h-[25rem] lg:min-h-[36rem]"
            style={{ perspective: "1800px" }}
          >
            <motion.div
              className="relative w-[min(96vw,820px)] lg:w-full lg:max-w-[920px]"
              initial={{ rotateY: -42, rotateX: 12, opacity: 1, scale: 0.88 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 2.65,
                ease: entranceEase,
                delay: 0.15,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -inset-10 -z-10 rounded-full bg-emerald-400/10 blur-3xl" />
              <div className="relative rounded-t-lg bg-[#2C2825] p-2 pb-0 shadow-2xl shadow-black/40 sm:p-3 sm:pb-0">
                <div className="flex items-center gap-1.5 px-2 pb-2 sm:pb-3">
                  <div className="h-2 w-2 rounded-full bg-red-400/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                  <div className="ml-auto h-2 w-24 rounded bg-white/10" />
                </div>
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-t-sm bg-[#0f1b2a]">
                  <LaptopScreen />
                </div>
              </div>

              <div className="relative h-3 rounded-b-lg bg-[#3a3632] sm:h-4">
                <div className="absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 rounded-b bg-[#555]" />
              </div>

              <div className="relative mx-4 h-1.5 rounded-b-lg bg-[#5a5550] sm:h-2" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
