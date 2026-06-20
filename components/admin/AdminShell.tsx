"use client";

import {
  Film,
  FolderOpen,
  GraduationCap,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Settings,
  X,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, type ReactElement, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

type AdminNavItem = {
  description: string;
  href: string;
  icon: LucideIcon;
  label: string;
};

const adminNavigation: AdminNavItem[] = [
  {
    href: "/admin",
    label: "Dashboard",
    description: "Overview and shortcuts",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/movies",
    label: "Movies",
    description: "Manage filmography",
    icon: Film,
  },
  {
    href: "/admin/alumni",
    label: "Alumni",
    description: "Manage alumni profiles",
    icon: GraduationCap,
  },
  {
    href: "/admin/gallery",
    label: "Gallery",
    description: "Manage gallery",
    icon: FolderOpen,
  },
  {
    href: "/admin/applications",
    label: "Applications",
    description: "Review school applications",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/messages",
    label: "Messages",
    description: "Read contact messages",
    icon: MessageSquare,
  },
  {
    href: "/admin/settings",
    label: "Settings",
    description: "Update site content",
    icon: Settings,
  },
];

function isActivePath(pathname: string, href: string): boolean {
  if (href === "/admin") {
    return pathname === href;
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

interface AdminShellProps {
  children: ReactNode;
}

export default function AdminShell({ children }: AdminShellProps): ReactElement {
  const pathname: string = usePathname();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);

  useEffect((): void => {
    setIsMobileNavOpen(false);
  }, [pathname]);

  useEffect((): void => {
    adminNavigation.forEach((item: AdminNavItem): void => {
      if (item.href !== pathname) {
        router.prefetch(item.href);
      }
    });
  }, [pathname, router]);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-dicon-bg text-dicon-text dark:bg-[linear-gradient(180deg,#06070a_0%,#0a0b10_42%,#0a0b0e_100%)]">
      <div className="flex min-h-screen">
        <aside className="hidden w-[20rem] shrink-0 border-r border-dicon-border/80 bg-dicon-surface/80 lg:flex lg:flex-col">
          <div className="border-b border-dicon-border/80 px-6 py-6">
            <Link className="flex flex-col gap-2" href="/admin">
              <span className="font-accent text-xs uppercase tracking-[0.35em] text-gold-light">D&apos;Icon School</span>
              <span className="font-display text-3xl italic text-dicon-text">Admin Studio</span>
              <span className="text-sm leading-relaxed text-dicon-muted">Private workspace for content, admissions, and everyday school updates.</span>
            </Link>
          </div>

          <nav className="flex-1 space-y-2 px-4 py-6">
            {adminNavigation.map((item: AdminNavItem): ReactElement => {
              const active: boolean = isActivePath(pathname, item.href);
              const Icon: LucideIcon = item.icon;

              return (
                <Link
                  className={cn(
                    "group flex items-start gap-4 rounded-[1.5rem] border px-4 py-4 transition",
                    active
                      ? "border-gold/45 bg-gold/10 text-gold-light shadow-[0_18px_45px_rgba(200,168,75,0.12)]"
                      : "border-transparent bg-transparent text-dicon-muted hover:border-dicon-border hover:bg-dicon-surface/70 hover:text-dicon-text",
                  )}
                  href={item.href}
                  key={item.href}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition",
                      active
                        ? "border-gold/40 bg-gold/10 text-gold-light"
                        : "border-dicon-border/70 bg-dicon-surface/60 text-dicon-muted group-hover:border-gold/30 group-hover:text-gold-light",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </span>

                  <span className="space-y-1">
                    <span className="block font-accent text-sm uppercase tracking-[0.22em]">{item.label}</span>
                    <span className="block text-sm leading-relaxed text-dicon-muted group-hover:text-dicon-muted">{item.description}</span>
                  </span>
                </Link>
              );
            })}
          </nav>

          <div className="border-t border-dicon-border/80 px-6 py-5">
            <div className="flex items-center justify-between gap-4">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Appearance</p>
              <ThemeToggle />
            </div>
            <p className="mt-4 font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Admin access</p>
            <p className="mt-3 text-sm leading-relaxed text-dicon-muted">Access is limited to approved school staff accounts.</p>
          </div>
        </aside>

        <div className="flex min-h-screen min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-40 border-b border-dicon-border/80 bg-dicon-surface/90 backdrop-blur-xl lg:hidden">
            <div className="flex items-center justify-between px-5 py-4">
              <div className="min-w-0">
                <p className="font-accent text-[11px] uppercase tracking-[0.3em] text-gold-light">D&apos;Icon School</p>
                <p className="truncate font-display text-2xl italic text-dicon-text">Admin Studio</p>
              </div>

              <div className="flex items-center gap-3">
                <ThemeToggle />
                <Button
                  aria-controls="admin-mobile-navigation"
                  aria-expanded={isMobileNavOpen}
                  onClick={(): void => setIsMobileNavOpen((currentValue: boolean): boolean => !currentValue)}
                  size="icon"
                  type="button"
                  variant="outline"
                >
                  {isMobileNavOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            {isMobileNavOpen ? (
              <div className="border-t border-dicon-border/80 bg-dicon-surface px-4 py-4" id="admin-mobile-navigation">
                <nav className="space-y-2">
                  {adminNavigation.map((item: AdminNavItem): ReactElement => {
                    const active: boolean = isActivePath(pathname, item.href);
                    const Icon: LucideIcon = item.icon;

                    return (
                      <Link
                        className={cn(
                          "flex items-center gap-3 rounded-[1.35rem] border px-4 py-4 transition",
                          active
                            ? "border-gold/45 bg-gold/10 text-gold-light"
                            : "border-dicon-border bg-dicon-surface/80 text-dicon-text hover:border-gold/35 hover:text-gold-light",
                        )}
                        href={item.href}
                        key={item.href}
                      >
                        <Icon className="h-5 w-5 shrink-0" />
                        <span className="space-y-1">
                          <span className="block font-accent text-sm uppercase tracking-[0.22em]">{item.label}</span>
                          <span className="block text-xs leading-relaxed text-dicon-muted">{item.description}</span>
                        </span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            ) : null}
          </header>

          <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 lg:px-8 lg:py-8">{children}</main>
        </div>
      </div>
    </div>
  );
}