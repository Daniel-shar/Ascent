"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function CaseStudyMetric({
  metric,
  label,
  category,
}: {
  metric: string;
  label: string;
  category: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      className="relative flex h-full min-h-[280px] flex-col items-center justify-center bg-sand p-8 sm:p-10 text-center"
    >
      <motion.span
        className="inline-block rounded-full bg-cream px-3 py-1 text-xs font-medium tracking-[0.15em] uppercase text-bark mb-6 border border-tan/60"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {category}
      </motion.span>
      <motion.div
        className="text-5xl sm:text-6xl font-semibold text-charcoal"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {metric}
      </motion.div>
      <motion.p
        className="mt-2 text-sm text-stone"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
      >
        {label}
      </motion.p>
    </div>
  );
}
