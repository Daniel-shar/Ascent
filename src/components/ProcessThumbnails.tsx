"use client";

import { motion } from "framer-motion";

function DiscoveryThumb() {
  return (
    <div className="relative h-full w-full bg-charcoal overflow-hidden p-4 flex flex-col justify-between">
      <div className="space-y-2">
        {[75, 55, 40].map((w, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 + i * 0.15 }}
          >
            <motion.div
              className="h-full rounded-full bg-warm/60"
              initial={{ width: 0 }}
              animate={{ width: `${w}%` }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: "easeOut" }}
            />
          </motion.div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          className="h-2 w-2 rounded-full bg-warm"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <div className="h-1 w-10 rounded bg-white/10" />
      </div>
    </div>
  );
}

function BuildThumb() {
  return (
    <div className="relative h-full w-full bg-charcoal overflow-hidden p-4 flex flex-col justify-center gap-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <motion.div
            className="h-1.5 w-1.5 rounded-full bg-cyan-400/70"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.2 }}
          />
          <motion.div
            className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 + i * 0.1 }}
          >
            <motion.div
              className="h-full rounded-full bg-cyan-400/40"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.5 + i * 0.3, duration: 1.2, ease: "easeOut" }}
            />
          </motion.div>
        </div>
      ))}
    </div>
  );
}

function LaunchThumb() {
  return (
    <div className="relative h-full w-full bg-charcoal overflow-hidden flex items-center justify-center">
      <motion.div
        className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/5"
        animate={{ y: [0, -4, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg className="h-6 w-6 text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.841m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
        </svg>
      </motion.div>
      <motion.div
        className="absolute bottom-3 left-4 right-4 h-1.5 rounded-full bg-white/10 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <motion.div
          className="h-full rounded-full bg-emerald-400/60"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
        />
      </motion.div>
    </div>
  );
}

function OptimiseThumb() {
  const bars = [35, 50, 40, 65, 55, 80, 70, 90];
  return (
    <div className="relative h-full w-full bg-charcoal overflow-hidden p-4 flex items-end">
      <div className="flex items-end gap-1 w-full h-3/4">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="flex-1 rounded-t bg-amber-400/50"
            initial={{ height: 0 }}
            animate={{ height: `${h}%` }}
            transition={{ delay: 0.2 + i * 0.08, duration: 0.5, ease: "easeOut" }}
          />
        ))}
      </div>
    </div>
  );
}

function ScaleThumb() {
  return (
    <div className="relative h-full w-full bg-charcoal overflow-hidden p-4 flex flex-col justify-center">
      {["API", "DB", "CDN"].map((label, i) => (
        <div key={label} className="flex items-center gap-2 py-1.5">
          <motion.div
            className="h-2 w-2 rounded-full bg-emerald-400"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.4 }}
          />
          <span className="text-[9px] font-medium text-white/50 w-6">{label}</span>
          <div className="h-1.5 flex-1 rounded-full bg-white/10 overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-emerald-400/50"
              initial={{ width: 0 }}
              animate={{ width: `${92 - i * 4}%` }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

const thumbnails = [DiscoveryThumb, BuildThumb, LaunchThumb, OptimiseThumb, ScaleThumb];

export default function ProcessThumbnail({ index }: { index: number }) {
  const Component = thumbnails[index];
  return <Component />;
}
