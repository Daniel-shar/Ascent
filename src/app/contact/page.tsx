"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { OptimiseIllustration } from "@/components/Illustrations";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (isSubmitting) return;

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
    };

    setSubmitError(null);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const data = (await response.json().catch(() => null)) as { error?: string } | null;
        throw new Error(data?.error ?? "Unable to send your message right now.");
      }

      setSubmitted(true);
      form.reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "Unable to send your message right now.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <>
      <section className="bg-cream pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            <div>
              <p className="text-sm font-medium tracking-[0.15em] uppercase text-bark mb-4">Contact</p>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-charcoal leading-[1.1]">
                Let&apos;s build something.
              </h1>
              <p className="mt-6 text-lg text-stone leading-relaxed">
                Tell us about your project and we&apos;ll get back to you within 24 hours to discuss next steps.
              </p>

              <div className="mt-8 max-w-[520px] rounded-2xl overflow-hidden border border-tan/60 bg-charcoal shadow-lg shadow-tan/20">
                <div className="grid sm:grid-cols-[1fr_0.9fr]">
                  <div className="relative min-h-[180px]">
                    <OptimiseIllustration />
                  </div>
                  <div className="space-y-3 bg-charcoal p-4 text-cream">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-xs uppercase tracking-[0.15em] text-cream/50">What happens next</p>
                      <p className="mt-2 text-sm text-cream/80">We review your goals, identify priorities, and follow up with practical next steps.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-lg font-semibold">01. Share context</p>
                      <p className="mt-1 text-sm text-cream/65">Tell us what you&apos;re building and where you&apos;re stuck.</p>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <p className="text-lg font-semibold">02. Book a meeting</p>
                      <p className="mt-1 text-sm text-cream/65">We respond with priorities, technical direction, and next steps.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-8">
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-2">Email us</h3>
                  <p className="text-sm text-stone">hello@ascent.dev</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-charcoal mb-2">What to expect</h3>
                  <ul className="space-y-2.5 text-sm text-stone">
                    <li className="flex items-start gap-2.5">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Focused review of your current setup
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Clear next steps for your goals
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      No commitment, no pressure
                    </li>
                    <li className="flex items-start gap-2.5">
                      <svg className="h-4 w-4 mt-0.5 text-warm flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                      Response within 24 hours
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="rounded-2xl border border-tan/60 bg-sand p-10 text-center">
                  <div className="flex h-14 w-14 mx-auto items-center justify-center rounded-full bg-cream text-warm border border-tan/60">
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                  <h2 className="mt-6 text-xl font-semibold text-charcoal">Message sent</h2>
                  <p className="mt-2 text-sm text-stone">
                    Thanks for reaching out. We&apos;ll get back to you within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-2xl border border-tan/60 bg-sand p-8 sm:p-10">
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-charcoal mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full rounded-xl border border-tan bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-warm/30 focus:border-warm transition-all"
                        placeholder="Your name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-charcoal mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full rounded-xl border border-tan bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-warm/30 focus:border-warm transition-all"
                        placeholder="you@company.com"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-charcoal mb-2">
                        What are you building?
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={5}
                        required
                        className="w-full rounded-xl border border-tan bg-cream px-4 py-3 text-sm text-charcoal placeholder:text-stone/50 focus:outline-none focus:ring-2 focus:ring-warm/30 focus:border-warm transition-all resize-none"
                        placeholder="Tell us about your project, idea, or challenge..."
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-full bg-charcoal px-7 py-3.5 text-sm font-medium text-cream transition-all hover:bg-bark"
                    >
                      {isSubmitting ? "Sending..." : "Send message"}
                    </button>
                    {submitError && (
                      <p className="rounded-xl border border-rose-300/40 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                        {submitError}
                      </p>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
