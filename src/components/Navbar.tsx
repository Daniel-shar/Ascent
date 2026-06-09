"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AscentInline } from "@/components/AscentLogo";
import { navLinks as links } from "@/lib/navigation";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-charcoal/10 bg-cream/86 backdrop-blur-xl">
      <div className="w-full px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="text-charcoal">
            <AscentInline />
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-4 py-2 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-charcoal text-cream font-medium"
                    : "text-stone hover:bg-sand hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-3 rounded-full bg-warm px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-warm/25 transition-all hover:bg-bark"
            >
              Inquire now
            </Link>
          </div>

          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-charcoal/10 bg-white text-charcoal"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                {mobileOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9h16.5m-16.5 6.75h16.5" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden border-t border-charcoal/10 bg-cream/96 backdrop-blur-xl">
          <div className="space-y-1 px-6 py-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={`block rounded-md px-3 py-3 text-sm transition-colors ${
                  pathname === link.href
                    ? "bg-charcoal text-cream font-medium"
                    : "text-stone hover:bg-sand hover:text-charcoal"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/contact"
              onClick={() => setMobileOpen(false)}
              className="mt-3 block rounded-full bg-warm px-5 py-3 text-center text-sm font-semibold text-white"
            >
              Inquire now
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
