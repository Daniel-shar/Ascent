"use client";

import { motion } from "framer-motion";

export function LaunchIllustration() {
  const phases = ["Scope", "Build", "Launch"];

  return (
    <div className="relative h-full w-full overflow-hidden bg-[#141c2e]">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:22px_22px]" />

      <div className="relative z-10 flex h-full flex-col justify-between p-4">
        <div className="grid grid-cols-3 gap-2">
          {phases.map((phase, i) => (
            <div key={phase} className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-2">
              <div className="text-[10px] font-medium tracking-[0.15em] uppercase text-white/45">0{i + 1}</div>
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
          </motion.div>
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-2.5">
          <div className="mb-2 flex items-center justify-between text-[10px] tracking-[0.15em] uppercase">
            <span className="text-white/45">Launch readiness</span>
            <span className="text-cyan-300">74%</span>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-cyan-400"
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
    <div className="relative w-full h-full bg-[#132218] flex items-end justify-center overflow-hidden p-5 pb-8">
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
            className="flex-1 rounded-t bg-emerald-400"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.3 + i * 0.08, duration: 0.6, ease: "easeOut" }}
          />
        ))}
      </div>
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
    <div className="relative h-full w-full overflow-hidden bg-[#161d2a] p-4">
      <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] [background-size:20px_20px]" />

      <motion.div
        className="relative z-10 rounded-2xl border border-white/10 bg-white/5 p-3.5"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-white/50">Operate mode</p>
          <span className="rounded-full border border-emerald-400/35 bg-emerald-400/10 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
            Live
          </span>
        </div>

        <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-3">
          <p className="text-[10px] uppercase tracking-[0.15em] text-white/45">System health</p>
          <div className="mt-2 flex items-center gap-3">
            <div className="relative h-12 w-12">
              <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40" fill="none">
                <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.16)" strokeWidth="4" />
                <motion.circle
                  cx="20"
                  cy="20"
                  r="16"
                  stroke="#22d3ee"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: 100 }}
                  animate={{ strokeDashoffset: 18 }}
                  transition={{ duration: 1.6, delay: 0.4, ease: "easeOut" }}
                />
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
    indigo: "#1a1a2e",
    emerald: "#132218",
    amber: "#2e261a",
  };
  return (
    <div className="relative w-full h-full overflow-hidden" style={{ backgroundColor: colors[variant] }}>
      <div className="absolute inset-0 opacity-15 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:20px_20px]" />
    </div>
  );
}
