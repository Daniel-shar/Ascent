"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const tabs = [
  { href: "/portal", label: "Send request" },
  { href: "/portal/board", label: "Execution board" },
];

export default function PortalTabs() {
  const pathname = usePathname();

  return (
    <div className="inline-flex rounded-full border border-tan/70 bg-cream/90 p-1 shadow-sm shadow-tan/15">
      {tabs.map((tab) => {
        const isActive =
          pathname === tab.href ||
          (tab.href === "/portal/board" && pathname.startsWith("/portal/board/"));

        return (
          <Link
            key={tab.href}
            href={tab.href}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              isActive
                ? "bg-charcoal text-cream shadow-sm"
                : "text-stone hover:text-charcoal"
            }`}
          >
            {tab.label}
          </Link>
        );
      })}
    </div>
  );
}
