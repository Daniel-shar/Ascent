import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-tan/60 bg-sand">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div className="md:col-span-2">
            <Link href="/" className="text-xl font-semibold tracking-tight text-charcoal">
              Ascent
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
              <li>hello@ascent.dev</li>
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
          <p className="text-xs text-stone">Build. Launch. Grow.</p>
        </div>
      </div>
    </footer>
  );
}
