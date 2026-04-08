"use client";

import { motion } from "framer-motion";

export function LaunchIllustration() {
  const phases = ["Scope", "Build", "Launch"];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#141c35] to-indigo-950">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />

      <motion.div
        className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-indigo-400/20 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.35, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-6 bottom-0 h-40 w-40 rounded-full bg-cyan-400/20 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div className="grid grid-cols-3 gap-2">
          {phases.map((phase, i) => (
            <div key={phase} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
              <div className="text-[10px] font-medium tracking-[0.18em] uppercase text-white/45">0{i + 1}</div>
              <div className="mt-1 text-[11px] text-white/80">{phase}</div>
            </div>
          ))}
        </div>

        <div className="relative mx-auto my-3 flex items-center justify-center">
          <motion.div
            className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-white/15 bg-white/10 backdrop-blur-sm"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className="h-9 w-9 text-cyan-300" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
            </svg>
            <motion.div
              className="absolute -bottom-4 h-2.5 w-10 rounded-full bg-cyan-400/35 blur-md"
              animate={{ opacity: [0.2, 0.65, 0.2], scaleX: [0.8, 1.15, 0.8] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
          <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.16em] uppercase">
            <span className="text-white/45">Launch readiness</span>
            <span className="text-cyan-300">74%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400"
              initial={{ width: "0%" }}
              animate={{ width: "74%" }}
              transition={{ duration: 1.8, delay: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function OptimiseIllustration() {
  const bars = [40, 55, 35, 70, 50, 80, 60, 90, 75, 95];
  return (
    <div className="relative w-full h-full bg-gradient-to-br from-emerald-950 via-[#1a2e1a] to-slate-900 flex items-end justify-center overflow-hidden p-5 pb-8">
      <div className="absolute top-4 right-4 flex items-center gap-2">
        <motion.div
          className="h-2 w-2 rounded-full bg-emerald-400"
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <div className="h-1.5 w-12 rounded bg-white/10" />
      </div>
      <div className="flex items-end gap-1.5 w-full h-3/4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-gradient-to-t from-emerald-500 to-emerald-400"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
      <motion.div
        className="absolute top-1/3 left-1/4 right-1/4"
        initial={{ opacity: 0, pathLength: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <svg viewBox="0 0 200 60" fill="none" className="w-full">
          <motion.path
            d="M0 50 Q30 45 50 35 T100 20 T150 10 T200 5"
            stroke="rgba(52,211,153,0.5)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
          />
        </svg>
      </motion.div>
    </div>
  );
}

export function OperateIllustration() {
  const serviceStatus = [
    { name: "API", uptime: "99.9%", width: 94, barClass: "bg-emerald-400", dotClass: "bg-emerald-400" },
    { name: "Database", uptime: "99.7%", width: 88, barClass: "bg-cyan-400", dotClass: "bg-cyan-400" },
    { name: "Queues", uptime: "99.8%", width: 91, barClass: "bg-amber-400", dotClass: "bg-amber-400" },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-slate-950 via-[#1b2431] to-[#2a1f1f] p-4">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />

      <motion.div
        className="absolute -left-8 top-6 h-32 w-32 rounded-full bg-cyan-400/20 blur-2xl"
        animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.38, 0.2] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-10 bottom-0 h-36 w-36 rounded-full bg-amber-400/20 blur-2xl"
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.42, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />

      <motion.div
        className="relative z-10 rounded-2xl border border-white/10 bg-[#101827]/75 p-3.5 backdrop-blur-sm"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/50">Operate mode</p>
          <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            Live
          </span>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.14em] text-white/45">System health</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.16)" strokeWidth="4" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="url(#operateRing)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 18 }}
                  transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                />
                <defs>
                  <linearGradient id="operateRing" x1="0" y1="0" x2="40" y2="40">
                    <stop stopColor="#22d3ee" />
                    <stop offset="1" stopColor="#34d399" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-white/80">99%</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">All systems stable</p>
              <p className="text-[11px] text-white/55">Monitoring and support active</p>
            </div>
          </div>
        </div>

        <div className="mt-3 space-y-2">
          {serviceStatus.map((service, i) => (
            <div key={service.name} className="rounded-lg border border-white/10 bg-white/5 p-2.5">
              <div className="flex items-center justify-between text-[11px]">
                <div className="flex items-center gap-2">
                  <motion.span
                    className={`h-2 w-2 rounded-full ${service.dotClass}`}
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.3 }}
                  />
                  <span className="text-white/80">{service.name}</span>
                </div>
                <span className="text-white/50">{service.uptime}</span>
              </div>
              <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${service.barClass}`}
                  initial={{ width: "0%" }}
                  animate={{ width: `${service.width}%` }}
                  transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: "easeOut" }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid grid-cols-12 gap-1">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="h-1.5 rounded-full bg-amber-400/35"
              animate={{ opacity: [0.25, 0.8, 0.25] }}
              transition={{ duration: 1.3, repeat: Infinity, delay: i * 0.08 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export function AbstractBlobs({ variant = "indigo" }: { variant?: "indigo" | "emerald" | "amber" }) {
  const colors = {
    indigo: { from: "from-indigo-950", via: "via-[#1a1a2e]", blob: "bg-indigo-400/20", accent: "bg-indigo-400/40" },
    emerald: { from: "from-emerald-950", via: "via-[#1a2e1a]", blob: "bg-emerald-400/20", accent: "bg-emerald-400/40" },
    amber: { from: "from-amber-950", via: "via-[#2e261a]", blob: "bg-amber-400/20", accent: "bg-amber-400/40" },
  };
  const c = colors[variant];
  return (
    <div className={`relative w-full h-full bg-gradient-to-br ${c.from} ${c.via} to-slate-900 overflow-hidden`}>
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${c.blob} blur-xl`}
          style={{
            width: 100 + i * 40,
            height: 100 + i * 40,
            left: `${10 + i * 20}%`,
            top: `${15 + (i % 2) * 40}%`,
          }}
          animate={{
            x: [0, 15, -10, 0],
            y: [0, -10, 15, 0],
            scale: [1, 1.1, 0.95, 1],
          }}
          transition={{ duration: 6 + i, repeat: Infinity, ease: "easeInOut", delay: i * 0.8 }}
        />
      ))}
      <motion.div
        className={`absolute bottom-6 right-6 h-3 w-3 rounded-full ${c.accent}`}
        animate={{ scale: [1, 1.5, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
