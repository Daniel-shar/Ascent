"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const dashboardMetrics = [
  { label: "Revenue", value: "$48.2K", change: "+12.5%" },
  { label: "Users", value: "2,847", change: "+8.3%" },
  { label: "Conversion", value: "3.6%", change: "+1.2%" },
];

const chartBars = [35, 52, 41, 68, 55, 72, 60, 78, 65, 85, 74, 90];

function LaptopScreen() {
  return (
    <div className="absolute inset-0 bg-[#0f1b2a] p-4 flex flex-col gap-3 overflow-hidden">
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
        {dashboardMetrics.map((m) => (
          <div key={m.label} className="rounded-lg bg-white/5 p-2.5">
            <div className="text-[8px] text-white/40">{m.label}</div>
            <div className="text-sm font-semibold text-white mt-0.5">{m.value}</div>
            <div className="text-[8px] text-emerald-400 mt-0.5">{m.change}</div>
          </div>
        ))}
      </div>

      <div className="flex-1 rounded-lg bg-white/5 p-3 flex flex-col justify-end">
        <div className="flex items-end gap-[3px] h-full">
          {chartBars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t bg-emerald-400"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 1.2 + i * 0.05, duration: 0.5, ease: "easeOut" }}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-white/5 p-2.5">
          <div className="text-[8px] text-white/40 mb-1.5">Active Projects</div>
          <div className="flex gap-1">
            {[70, 45, 85].map((w, i) => (
              <div key={i} className="flex-1">
                <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${
                      ["bg-cyan-400", "bg-emerald-400", "bg-amber-400"][i]
                    }`}
                    initial={{ width: 0 }}
                    animate={{ width: `${w}%` }}
                    transition={{ delay: 1.5 + i * 0.1, duration: 0.6, ease: "easeOut" }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="rounded-lg bg-white/5 p-2.5">
          <div className="text-[8px] text-white/40 mb-1">Traffic Source</div>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full border-2 border-emerald-400 border-r-cyan-400 border-b-amber-400" />
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
    <section className="relative overflow-hidden bg-charcoal">
      <div className="absolute inset-0 border-b border-cream/10" />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-10 lg:gap-12 items-center">
          <div>
            <motion.p
              className="text-xs font-medium tracking-[0.15em] uppercase text-cream/65 mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Your technical partner
            </motion.p>
            <motion.h1
              className="text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold tracking-tight text-cream leading-[1.15]"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Build, launch, and scale your business —{" "}
              <span className="text-warm">without the technical headaches.</span>
            </motion.h1>
            <motion.p
              className="mt-4 text-base leading-relaxed text-cream/70 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              Ascent is your technical partner from idea to growth. We build
              products, optimise performance, and manage everything long-term.
            </motion.p>
            <motion.div
              className="mt-8 flex flex-col sm:flex-row gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
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
            </motion.div>
          </div>

          <div className="relative hidden lg:flex items-center justify-center" style={{ perspective: "1400px" }}>
            <motion.div
              className="relative w-full max-w-[600px]"
              initial={{ rotateY: -90, rotateX: 15, opacity: 0, scale: 0.8 }}
              animate={{ rotateY: 0, rotateX: 0, opacity: 1, scale: 1 }}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.3,
              }}
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="relative rounded-t-xl bg-[#2C2825] p-2 pb-0 shadow-2xl shadow-charcoal/30">
                <div className="flex items-center gap-1.5 px-2 pb-2">
                  <div className="h-2 w-2 rounded-full bg-red-400/80" />
                  <div className="h-2 w-2 rounded-full bg-yellow-400/80" />
                  <div className="h-2 w-2 rounded-full bg-green-400/80" />
                  <div className="ml-auto h-2 w-24 rounded bg-white/10" />
                </div>
                <div className="relative aspect-[16/10] w-full rounded-t-sm overflow-hidden bg-[#0f1b2a]">
                  <LaptopScreen />
                </div>
              </div>

              <div className="relative h-3 bg-[#3a3632] rounded-b-xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-1 w-16 rounded-b bg-[#555] " />
              </div>

              <div className="relative h-1.5 bg-[#5a5550] rounded-b-lg mx-4" />

            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
