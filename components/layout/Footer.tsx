"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactElement } from "react";

import GoldDivider from "@/components/ui/GoldDivider";
import { OWNER_YOUTUBE_URL } from "@/lib/constants";
import type { NavLink } from "@/lib/types";

const quickLinks: NavLink[] = [
  { label: "About the Founder", href: "/about" },
  { label: "Programmes", href: "/school" },
  { label: "Filmography", href: "/movies" },
  { label: "Admissions", href: "/admission" },
];

const socialLinks: NavLink[] = [
  { label: "Instagram", href: "https://instagram.com/dicon_schoolofpfa", isExternal: true },
  { label: "Owner Instagram", href: "https://instagram.com/iteledicon01", isExternal: true },
  { label: "YouTube", href: OWNER_YOUTUBE_URL, isExternal: true },
];

export default function Footer(): ReactElement {
  const pathname: string = usePathname();
  const currentYear: number = new Date().getFullYear();

  if (pathname.startsWith("/admin")) {
    return <></>;
  }

  return (
    <footer className="bg-transparent">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="glass-panel-strong flex flex-col gap-10 rounded-[2.2rem] px-6 py-10 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div className="space-y-5">
            <p className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">{"D'Icon School of Performing Arts"}</p>
            <h2 className="max-w-lg font-display text-3xl leading-tight text-[#fff7eb]">
              Cinematic training for the next generation of Yoruba screen icons.
            </h2>
            <p className="max-w-xl text-lg leading-relaxed text-dicon-muted">
              {"Founded by Ibrahim Yekini (Itele D'Icon), the school blends disciplined craft, on-set exposure, and living Nollywood experience."}
            </p>
          </div>

          <div className="space-y-4">
            <p className="font-accent text-sm uppercase tracking-[0.28em] text-gold-light">Explore</p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link: NavLink): ReactElement => (
                <Link className="text-base text-[#f1e4ca] transition hover:text-gold-light" href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <p className="font-accent text-sm uppercase tracking-[0.28em] text-gold-light">Follow</p>
            <div className="flex flex-col gap-3">
              {socialLinks.map((link: NavLink): ReactElement => (
                <a
                  className="text-base text-[#f1e4ca] transition hover:text-gold-light"
                  href={link.href}
                  key={link.href}
                  rel="noreferrer"
                  target="_blank"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        <GoldDivider glow={true} />

        <div className="flex flex-col gap-3 text-sm uppercase tracking-[0.24em] text-dicon-muted md:flex-row md:items-center md:justify-between">
          <p>{`© ${currentYear} D'Icon School of Performing Arts`}</p>
          <p>Where Talent Becomes Legacy</p>
        </div>
        </div>
      </div>
    </footer>
  );
}