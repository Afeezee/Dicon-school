"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import type { ReactElement } from "react";

import type { NavLink } from "@/lib/types";

const navigationLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "School", href: "/school" },
  { label: "Movies", href: "/movies" },
  { label: "Alumni", href: "/alumni" },
  { label: "Gallery", href: "/gallery" },
  { label: "Admission", href: "/admission" },
  { label: "Contact", href: "/contact" },
];

function isActiveLink(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === href;
  }

  return pathname.startsWith(href);
}

export default function Navbar(): ReactElement {
  const pathname: string = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  useEffect((): void => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect((): void => {
    navigationLinks.forEach((link: NavLink): void => {
      if (link.href !== pathname) {
        router.prefetch(link.href);
      }
    });
  }, [pathname, router]);

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[linear-gradient(180deg,rgba(8,8,8,0.88),rgba(8,8,8,0.58))] shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-10">
        <Link className="group flex flex-col rounded-full px-3 py-2 transition hover:bg-[rgba(255,255,255,0.06)]" href="/">
          <span className="font-accent text-sm uppercase tracking-[0.35em] text-gold-light transition group-hover:text-gold">
            {"D'Icon School"}
          </span>
          <span className="font-display text-lg italic text-[#fff5df] transition group-hover:text-gold-light">
            Where Talent Becomes Legacy
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navigationLinks.map((link: NavLink): ReactElement => {
            const active: boolean = isActiveLink(pathname, link.href);

            return (
              <Link
                className={`text-sm uppercase tracking-[0.24em] transition ${
                  active ? "text-gold-light" : "text-[#e6d8bc] hover:text-white"
                }`}
                href={link.href}
                key={link.href}
              >
                {link.label}
              </Link>
            );
          })}

          <Link
            className="rounded-full border border-gold/50 bg-[linear-gradient(135deg,rgba(250,227,154,0.96),rgba(194,140,52,0.92))] px-5 py-2 font-accent text-sm uppercase tracking-[0.22em] text-[#140b00] shadow-[0_18px_40px_rgba(200,168,75,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_24px_54px_rgba(200,168,75,0.3)]"
            href="/admission"
          >
            Apply Now
          </Link>
        </nav>

        <button
          aria-controls="mobile-navigation"
          aria-expanded={isMenuOpen}
          className="glass-panel rounded-full px-4 py-2 font-accent text-sm uppercase tracking-[0.24em] text-gold-light lg:hidden"
          onClick={(): void => setIsMenuOpen((currentValue: boolean): boolean => !currentValue)}
          type="button"
        >
          {isMenuOpen ? "Close" : "Menu"}
        </button>
      </div>

      {isMenuOpen ? (
        <div className="glass-panel border-t border-white/10 px-6 py-5 lg:hidden" id="mobile-navigation">
          <nav className="flex flex-col gap-4">
            {navigationLinks.map((link: NavLink): ReactElement => {
              const active: boolean = isActiveLink(pathname, link.href);

              return (
                <Link
                  className={`rounded-2xl border px-4 py-3 font-accent text-base uppercase tracking-[0.22em] transition ${
                    active
                      ? "border-gold/60 bg-[rgba(241,217,142,0.12)] text-gold-light"
                      : "border-white/10 text-dicon-text hover:border-gold/40 hover:text-gold-light"
                  }`}
                  href={link.href}
                  key={link.href}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </div>
      ) : null}
    </header>
  );
}