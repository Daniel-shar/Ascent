"use client";

import React, { useEffect, useRef } from "react";
import { ArrowRight, Flame, Handshake, Check, CheckCircle2 } from "lucide-react";
import { gsap } from "gsap";
import { AscentInline } from "@/components/AscentLogo";
import { cn } from "@/lib/utils";

const INJECTED_STYLES = `
  .gsap-reveal { visibility: hidden; }

  .film-grain {
      position: absolute; inset: 0; width: 100%; height: 100%;
      pointer-events: none; z-index: 50; opacity: 0.05; mix-blend-mode: overlay;
      background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg"><filter id="noiseFilter"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch"/></filter><rect width="100%" height="100%" filter="url(%23noiseFilter)"/></svg>');
  }

  .bg-grid-theme {
      background-size: 60px 60px;
      background-image:
          linear-gradient(to right, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px),
          linear-gradient(to bottom, color-mix(in srgb, var(--color-foreground) 5%, transparent) 1px, transparent 1px);
      mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, black 0%, transparent 70%);
  }

  .text-3d-matte {
      color: var(--color-foreground);
      text-shadow:
          0 10px 30px color-mix(in srgb, var(--color-foreground) 20%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 10%, transparent);
  }

  .text-silver-matte {
      color: color-mix(in srgb, var(--color-foreground) 68%, transparent);
      transform: translateZ(0);
      text-shadow:
          0 10px 22px color-mix(in srgb, var(--color-foreground) 16%, transparent),
          0 2px 4px color-mix(in srgb, var(--color-foreground) 8%, transparent);
  }

  .text-card-silver-matte {
      background: linear-gradient(180deg, #FFFFFF 0%, #A1A1AA 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: translateZ(0);
      filter:
          drop-shadow(0px 12px 24px rgba(0,0,0,0.8))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.6));
  }

  .hero-ascent-logo {
      color: #E7E9EA;
      filter:
          drop-shadow(0px 18px 28px rgba(0,0,0,0.46))
          drop-shadow(0px 4px 8px rgba(0,0,0,0.34));
  }
  .hero-ascent-logo svg {
      width: clamp(4.6rem, 8vw, 7.4rem) !important;
      height: clamp(4.6rem, 8vw, 7.4rem) !important;
  }
  .hero-ascent-logo span {
      margin-left: -0.16em;
      font-size: clamp(4.6rem, 8vw, 7.4rem);
      font-weight: 650;
      letter-spacing: -0.035em;
  }

  @media (max-width: 767px) {
      .hero-ascent-logo svg {
          width: clamp(3.3rem, 15vw, 4.6rem) !important;
          height: clamp(3.3rem, 15vw, 4.6rem) !important;
      }
      .hero-ascent-logo span {
          font-size: clamp(3.3rem, 15vw, 4.6rem);
      }
  }

  .premium-depth-card {
      background: linear-gradient(145deg, #5F85FF 0%, #284BD9 48%, #121C47 100%);
      box-shadow:
          0 40px 100px -20px rgba(0, 0, 0, 0.9),
          0 20px 40px -20px rgba(0, 0, 0, 0.8),
          inset 0 1px 2px rgba(255, 255, 255, 0.26),
          inset 0 -2px 4px rgba(0, 0, 0, 0.8);
      border: 1px solid rgba(255, 255, 255, 0.04);
      position: relative;
  }

  .card-sheen {
      position: absolute; inset: 0; border-radius: inherit; pointer-events: none; z-index: 50;
      background: radial-gradient(800px circle at 50% 38%, rgba(255,255,255,0.06) 0%, transparent 42%);
      mix-blend-mode: screen; transition: opacity 0.3s ease;
  }

  .iphone-bezel {
      background-color: #111;
      box-shadow:
          inset 0 0 0 2px #52525B,
          inset 0 0 0 7px #000,
          0 40px 80px -15px rgba(0,0,0,0.9),
          0 15px 25px -5px rgba(0,0,0,0.7);
      transform-style: preserve-3d;
  }

  .hardware-btn {
      background: linear-gradient(90deg, #404040 0%, #171717 100%);
      box-shadow:
          -2px 0 5px rgba(0,0,0,0.8),
          inset -1px 0 1px rgba(255,255,255,0.15),
          inset 1px 0 2px rgba(0,0,0,0.8);
      border-left: 1px solid rgba(255,255,255,0.05);
  }

  .screen-glare {
      background: linear-gradient(110deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0) 45%);
  }

  .widget-depth {
      background: linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%);
      box-shadow:
          0 10px 20px rgba(0,0,0,0.3),
          inset 0 1px 1px rgba(255,255,255,0.05),
          inset 0 -1px 1px rgba(0,0,0,0.5);
      border: 1px solid rgba(255,255,255,0.03);
  }

  .floating-ui-badge {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.01) 100%);
      backdrop-filter: blur(24px);
      -webkit-backdrop-filter: blur(24px);
      box-shadow:
          0 0 0 1px rgba(255, 255, 255, 0.1),
          0 25px 50px -12px rgba(0, 0, 0, 0.8),
          inset 0 1px 1px rgba(255,255,255,0.2),
          inset 0 -1px 1px rgba(0,0,0,0.5);
  }

  .btn-modern-light, .btn-modern-dark {
      transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
  }
  .btn-modern-light {
      background: linear-gradient(180deg, #FFFFFF 0%, #F1F5F9 100%);
      color: #0F172A;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 2px 4px rgba(0,0,0,0.1), 0 12px 24px -4px rgba(0,0,0,0.3), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:hover {
      transform: translateY(-3px);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.05), 0 6px 12px -2px rgba(0,0,0,0.15), 0 20px 32px -6px rgba(0,0,0,0.4), inset 0 1px 1px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.06);
  }
  .btn-modern-light:active {
      transform: translateY(1px);
      background: linear-gradient(180deg, #F1F5F9 0%, #E2E8F0 100%);
      box-shadow: 0 0 0 1px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.1), inset 0 3px 6px rgba(0,0,0,0.1), inset 0 0 0 1px rgba(0,0,0,0.02);
  }
  .btn-modern-dark {
      background: linear-gradient(180deg, #27272A 0%, #18181B 100%);
      color: #FFFFFF;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.1), 0 2px 4px rgba(0,0,0,0.6), 0 12px 24px -4px rgba(0,0,0,0.9), inset 0 1px 1px rgba(255,255,255,0.15), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:hover {
      transform: translateY(-3px);
      background: linear-gradient(180deg, #3F3F46 0%, #27272A 100%);
      box-shadow: 0 0 0 1px rgba(255,255,255,0.15), 0 6px 12px -2px rgba(0,0,0,0.7), 0 20px 32px -6px rgba(0,0,0,1), inset 0 1px 1px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.8);
  }
  .btn-modern-dark:active {
      transform: translateY(1px);
      background: #18181B;
      box-shadow: 0 0 0 1px rgba(255,255,255,0.05), inset 0 3px 8px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(0,0,0,0.5);
  }

  .btn-contact-clean {
      background: linear-gradient(180deg, #FFFFFF 0%, #F3F6FF 100%);
      color: #0B1220;
      border: 2px solid rgba(255, 255, 255, 0.78);
      box-shadow:
          0 22px 44px -18px rgba(3, 7, 18, 0.48),
          0 0 0 1px rgba(15, 23, 42, 0.12),
          inset 0 1px 0 rgba(255, 255, 255, 1),
          inset 0 -4px 10px rgba(79, 124, 255, 0.12);
      cursor: pointer;
      transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
  }
  .btn-contact-clean:hover {
      transform: translateY(-3px);
      background: #FFFFFF;
      box-shadow:
          0 28px 52px -18px rgba(3, 7, 18, 0.58),
          0 0 0 1px rgba(79, 124, 255, 0.3),
          inset 0 1px 0 rgba(255, 255, 255, 1),
          inset 0 -4px 10px rgba(79, 124, 255, 0.14);
  }
  .btn-contact-clean:active {
      transform: translateY(1px);
      background: #EEF2FF;
      box-shadow:
          0 12px 28px -18px rgba(3, 7, 18, 0.5),
          0 0 0 1px rgba(15, 23, 42, 0.16),
          inset 0 3px 8px rgba(15, 23, 42, 0.11);
  }

  .progress-ring {
      transform: rotate(-90deg);
      transform-origin: center;
      stroke-dasharray: 402;
      stroke-dashoffset: 402;
      stroke-linecap: round;
  }
`;

export interface CinematicHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  brandName?: string;
  tagline1?: string;
  tagline2?: string;
  cardHeading?: string;
  cardDescription?: React.ReactNode;
  metricValue?: number;
  metricLabel?: string;
  ctaHeading?: string;
  ctaDescription?: string;
}

export function CinematicHero({
  tagline1 = "We build websites & apps.",
  tagline2 = "Then help them grow.",
  cardHeading = "Web apps, Shopify stores, CRO, and ongoing tech support.",
  cardDescription = (
    <>
      <span className="font-semibold text-white">Ascends</span> is your
      technical partner: we scope, design, build, launch, optimise, and maintain
      the digital product behind your business.
    </>
  ),
  metricValue = 42,
  metricLabel = "Days to Launch",
  className,
  ...props
}: CinematicHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mainCardRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const ctx = gsap.context(() => {
      gsap.set(".text-track", { autoAlpha: 0, y: 60, scale: 0.85, filter: "blur(20px)", rotationX: -20 });
      gsap.set(".text-days", { autoAlpha: 0, y: 34, filter: "blur(16px)" });
      gsap.set(".main-card", { y: window.innerHeight + 200, autoAlpha: 1 });
      gsap.set([".card-left-text", ".card-right-text", ".mockup-scroll-wrapper", ".floating-badge", ".phone-widget", ".card-contact-cta"], { autoAlpha: 0 });

      const timedTl = gsap.timeline({ delay: 0.1 });
      timedTl
        .to(".text-track", { duration: 0.9, autoAlpha: 1, y: 0, scale: 1, filter: "blur(0px)", rotationX: 0, ease: "expo.out" })
        .to(".text-days", { duration: 0.78, autoAlpha: 1, y: 0, filter: "blur(0px)", ease: "power4.out" }, "-=0.42")
        .to([".hero-text-wrapper", ".bg-grid-theme"], { scale: 1.04, filter: "blur(8px)", opacity: 0.08, ease: "power2.inOut", duration: 0.54 }, "+=0.3")
        .to(".main-card", { y: 0, ease: "power3.inOut", duration: 0.54 }, "<")
        .to(".main-card", { width: "100%", height: "100%", borderRadius: "0px", ease: "power3.inOut", duration: 0.4 });

      if (isMobile) {
        timedTl
          .fromTo(".card-right-text", { y: -14, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power4.out", duration: 0.42 }, "-=0.12")
          .fromTo(".card-left-text", { y: 18, autoAlpha: 0 }, { y: 0, autoAlpha: 1, ease: "power4.out", duration: 0.42 }, "-=0.28")
          .fromTo(".card-contact-cta", { y: 12, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 0.34 }, "-=0.26");
      }

      timedTl
        .fromTo(
          ".mockup-scroll-wrapper",
          { y: 300, z: -500, rotationX: 50, rotationY: -30, autoAlpha: 0, scale: 0.6 },
          { y: 0, z: 0, rotationX: 0, rotationY: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 0.82 },
          "-=0.28",
        )
        .fromTo(".phone-widget", { y: 40, autoAlpha: 0, scale: 0.95 }, { y: 0, autoAlpha: 1, scale: 1, stagger: 0.08, ease: "back.out(1.2)", duration: 0.6 }, "-=0.52")
        .to(".progress-ring", { strokeDashoffset: 60, duration: 0.68, ease: "power3.inOut" }, "-=0.58")
        .to(".counter-val", { innerHTML: metricValue, snap: { innerHTML: 1 }, duration: 0.68, ease: "expo.out" }, "-=0.68")
        .fromTo(".floating-badge", { y: 70, autoAlpha: 0, scale: 0.7, rotationZ: -8 }, { y: 0, autoAlpha: 1, scale: 1, rotationZ: 0, ease: "back.out(1.5)", duration: 0.54, stagger: 0.1 }, "-=0.56");

      if (!isMobile) {
        timedTl
          .fromTo(".card-left-text", { x: -50, autoAlpha: 0 }, { x: 0, autoAlpha: 1, ease: "power4.out", duration: 0.58 }, "-=0.34")
          .fromTo(".card-right-text", { x: 50, autoAlpha: 0, scale: 0.9 }, { x: 0, autoAlpha: 1, scale: 1, ease: "expo.out", duration: 0.58 }, "<")
          .fromTo(".card-contact-cta", { y: 18, autoAlpha: 0, scale: 0.96 }, { y: 0, autoAlpha: 1, scale: 1, ease: "power3.out", duration: 0.44 }, "-=0.14");
      }
    }, containerRef);

    return () => ctx.revert();
  }, [metricValue]);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex h-[calc(100dvh-4rem)] w-screen items-center justify-center overflow-hidden bg-background font-sans text-foreground antialiased", className)}
      style={{ perspective: "1500px" }}
      {...props}
    >
      <style dangerouslySetInnerHTML={{ __html: INJECTED_STYLES }} />
      <div className="film-grain" aria-hidden="true" />
      <div className="bg-grid-theme pointer-events-none absolute inset-0 z-0 opacity-50" aria-hidden="true" />

      <div className="hero-text-wrapper transform-style-3d absolute z-10 flex w-full max-w-7xl flex-col items-center justify-center px-6 text-center will-change-transform">
        <h1 className="text-track gsap-reveal text-3d-matte mb-2 max-w-[11ch] text-balance text-5xl font-bold tracking-tight sm:max-w-none md:text-7xl lg:text-[5.4rem]">
          {tagline1}
        </h1>
        <h1 className="text-days gsap-reveal text-silver-matte max-w-[12ch] text-balance text-5xl font-extrabold tracking-tight sm:max-w-none md:text-7xl lg:text-[5.4rem]">
          {tagline2}
        </h1>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center" style={{ perspective: "1500px" }}>
        <div
          ref={mainCardRef}
          className="main-card premium-depth-card gsap-reveal pointer-events-auto relative flex h-[92vh] w-[92vw] items-center justify-center overflow-hidden rounded-[32px] md:h-[85vh] md:w-[85vw] md:rounded-[40px]"
        >
          <div className="card-sheen" aria-hidden="true" />

          <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col items-center justify-center gap-2 px-4 py-4 sm:gap-3 md:justify-between md:pb-7 md:pt-4 lg:grid lg:grid-cols-[1.2fr_1fr_1.2fr] lg:gap-12 lg:px-8 lg:py-0 xl:gap-16 xl:px-4">
            <div className="card-right-text gsap-reveal order-1 z-20 flex w-full shrink-0 flex-col items-center justify-center lg:order-1 lg:items-start">
              <AscentInline className="hero-ascent-logo" />
              <p className="mt-2 hidden max-w-xs text-center text-sm font-medium leading-6 text-blue-100/75 sm:block lg:text-left">
                We build and improve the websites, apps, stores, and systems
                your business runs on.
              </p>
              <a href="/contact" aria-label="Get in touch with Ascends" className="card-contact-cta btn-contact-clean group mt-5 hidden min-h-14 items-center justify-center gap-2 rounded-2xl px-8 text-base font-bold tracking-normal focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-blue-700 lg:inline-flex">
                Inquire now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>

            <div className="mockup-scroll-wrapper order-2 relative z-10 flex h-[255px] w-full shrink-0 items-center justify-center sm:h-[320px] md:h-[430px] lg:order-2 lg:h-[600px]" style={{ perspective: "1000px" }}>
              <div className="relative flex h-full w-full scale-[0.44] items-center justify-center sm:scale-[0.55] md:scale-[0.74] lg:scale-100">
                <div
                  ref={mockupRef}
                  className="iphone-bezel transform-style-3d relative flex h-[580px] w-[280px] flex-col rounded-[3rem] will-change-transform"
                >
                  <div className="hardware-btn absolute -left-[3px] top-[120px] z-0 h-[25px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[160px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -left-[3px] top-[220px] z-0 h-[45px] w-[3px] rounded-l-md" aria-hidden="true" />
                  <div className="hardware-btn absolute -right-[3px] top-[170px] z-0 h-[70px] w-[3px] scale-x-[-1] rounded-r-md" aria-hidden="true" />

                  <div className="absolute inset-[7px] z-10 overflow-hidden rounded-[2.5rem] bg-[#050914] text-white shadow-[inset_0_0_15px_rgba(0,0,0,1)]">
                    <div className="screen-glare pointer-events-none absolute inset-0 z-40" aria-hidden="true" />

                    <div className="absolute left-1/2 top-[5px] z-50 flex h-[28px] w-[100px] -translate-x-1/2 items-center justify-end rounded-full bg-black px-3 shadow-[inset_0_-1px_2px_rgba(255,255,255,0.1)]">
                      <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>

                    <div className="relative flex h-full w-full flex-col px-5 pb-8 pt-12">
                      <div className="phone-widget mb-8 flex items-center justify-between">
                        <div className="flex flex-col">
                          <span className="mb-1 text-[10px] font-bold uppercase tracking-widest text-neutral-400">Today</span>
                          <span className="text-xl font-bold tracking-tight text-white drop-shadow-md">Plan</span>
                        </div>
                        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-sm font-bold text-neutral-200 shadow-lg shadow-black/50">AS</div>
                      </div>

                      <div className="phone-widget relative mx-auto mb-8 flex h-44 w-44 items-center justify-center drop-shadow-[0_15px_25px_rgba(0,0,0,0.8)]">
                        <svg className="absolute inset-0 h-full w-full" aria-hidden="true">
                          <circle cx="88" cy="88" r="64" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="12" />
                          <circle className="progress-ring" cx="88" cy="88" r="64" fill="none" stroke="#3B82F6" strokeWidth="12" />
                        </svg>
                        <div className="z-10 flex flex-col items-center text-center">
                          <span className="counter-val text-4xl font-extrabold tracking-tighter text-white">0</span>
                          <span className="mt-0.5 text-[8px] font-bold uppercase tracking-[0.1em] text-blue-200/50">{metricLabel}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-400/20 bg-gradient-to-br from-blue-500/20 to-blue-600/5 shadow-inner">
                            <CheckCircle2 className="h-4 w-4 text-blue-400 drop-shadow-md" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 h-2 w-20 rounded-full bg-neutral-300 shadow-inner" />
                            <div className="h-1.5 w-12 rounded-full bg-neutral-600 shadow-inner" />
                          </div>
                        </div>
                        <div className="phone-widget widget-depth flex items-center rounded-2xl p-3">
                          <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-xl border border-emerald-400/20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 shadow-inner">
                            <Check className="h-4 w-4 text-emerald-400 drop-shadow-md" aria-hidden="true" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-2 h-2 w-16 rounded-full bg-neutral-300 shadow-inner" />
                            <div className="h-1.5 w-24 rounded-full bg-neutral-600 shadow-inner" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute bottom-2 left-1/2 h-[4px] w-[120px] -translate-x-1/2 rounded-full bg-white/20 shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    </div>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute left-[-15px] top-6 z-30 flex items-center gap-3 rounded-xl p-3 lg:left-[-80px] lg:top-12 lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-400/30 bg-gradient-to-b from-blue-500/20 to-blue-900/10 shadow-inner lg:h-10 lg:w-10">
                    <Flame className="h-4 w-4 text-blue-200 drop-shadow-lg lg:h-5 lg:w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white lg:text-sm">Launch Plan</p>
                    <p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">Next steps clear</p>
                  </div>
                </div>

                <div className="floating-badge floating-ui-badge absolute bottom-12 right-[-15px] z-30 flex items-center gap-3 rounded-xl p-3 lg:bottom-20 lg:right-[-80px] lg:gap-4 lg:rounded-2xl lg:p-4">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-indigo-400/30 bg-gradient-to-b from-indigo-500/20 to-indigo-900/10 shadow-inner lg:h-10 lg:w-10">
                    <Handshake className="h-4 w-4 text-indigo-200 drop-shadow-lg lg:h-5 lg:w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-xs font-bold tracking-tight text-white lg:text-sm">Revenue Growing</p>
                    <p className="text-[10px] font-medium text-blue-200/50 lg:text-xs">Tech ready to scale</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-left-text gsap-reveal order-3 z-20 flex w-full shrink-0 flex-col justify-center px-2 text-center sm:px-4 lg:order-3 lg:max-w-none lg:px-0 lg:text-right">
              <h3 className="mb-0 text-[1.35rem] font-bold leading-tight tracking-tight text-white sm:text-2xl md:text-3xl lg:mb-5 lg:text-4xl">
                {cardHeading}
              </h3>
              <p className="mx-auto mt-2 hidden max-w-sm text-sm font-normal leading-relaxed text-blue-100/70 sm:block lg:ml-auto lg:mr-0 lg:mt-0 lg:max-w-md lg:text-lg">
                {cardDescription}
              </p>
              <div className="mx-auto mt-3 hidden max-w-sm grid-cols-3 gap-2 sm:grid lg:ml-auto lg:mr-0 lg:mt-4">
                {["Build", "Optimise", "Maintain"].map((item) => (
                  <span key={item} className="rounded-full border border-white/15 bg-white/8 px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-blue-50/85">
                    {item}
                  </span>
                ))}
              </div>
              <a href="/contact" aria-label="Inquire with Ascends" className="card-contact-cta btn-contact-clean group mt-3 inline-flex min-h-12 items-center justify-center gap-2 self-center rounded-2xl px-7 text-sm font-bold tracking-normal focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-blue-700 sm:mt-4 sm:min-h-14 sm:px-8 sm:text-base lg:hidden">
                Inquire now
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
