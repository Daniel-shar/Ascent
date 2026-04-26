import Link from "next/link";
import { AscentMark } from "@/components/AscentLogo";

export default function Footer() {
  return (
    <footer className="border-t border-tan/60 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 text-charcoal">
              <AscentMark className="h-8 w-8" />
              <span className="text-xl font-semibold leading-none" style={{ letterSpacing: "-0.02em" }}>
                Ascent
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-stone">
              Your end-to-end technical partner that helps founders turn ideas into real, scalable businesses.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-charcoal mb-4">Pages</h4>
            <ul className="space-y-2.5">
              {[
                { href: "/services", label: "Services" },
                { href: "/process", label: "Process" },
                { href: "/case-studies", label: "Case Studies" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-stone hover:text-charcoal transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-medium text-charcoal mb-4">Get in touch</h4>
            <ul className="space-y-2.5 text-sm text-stone">
              <li>
                <a
                  href="mailto:ascentinquiryform@gmail.com"
                  className="inline-flex items-center gap-2 hover:text-charcoal transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21.75 7.5v9A2.25 2.25 0 0 1 19.5 18.75h-15A2.25 2.25 0 0 1 2.25 16.5v-9m19.5 0A2.25 2.25 0 0 0 19.5 5.25h-15A2.25 2.25 0 0 0 2.25 7.5m19.5 0v.243a2.25 2.25 0 0 1-.832 1.755l-7.5 6.136a2.25 2.25 0 0 1-2.836 0l-7.5-6.136A2.25 2.25 0 0 1 2.25 7.743V7.5"
                    />
                  </svg>
                  ascentinquiryform@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+61435174559"
                  className="inline-flex items-center gap-2 hover:text-charcoal transition-colors"
                >
                  <svg
                    aria-hidden="true"
                    className="h-4 w-4 flex-shrink-0"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.8}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 4.5A2.25 2.25 0 0 1 4.5 2.25h2.176c.966 0 1.792.694 1.987 1.64l.876 4.204a2.25 2.25 0 0 1-.97 2.31l-1.51 1.007a12.042 12.042 0 0 0 5.53 5.53l1.007-1.51a2.25 2.25 0 0 1 2.31-.97l4.204.876a2.25 2.25 0 0 1 1.64 1.987V19.5a2.25 2.25 0 0 1-2.25 2.25h-.75C9.447 21.75 2.25 14.553 2.25 5.25V4.5Z"
                    />
                  </svg>
                  0435 174 559
                </a>
              </li>
              <li>
                <Link href="/contact" className="hover:text-charcoal transition-colors">
                  Book a meeting
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-tan/60 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-stone">&copy; {new Date().getFullYear()} Ascent. All rights reserved.</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-bark/70">Build · Launch · Grow</p>
        </div>
      </div>
    </footer>
  );
}
