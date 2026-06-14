import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata, Viewport } from "next";
import type { ReactElement, ReactNode } from "react";
import { Toaster } from "sonner";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/ThemeProvider";
import { absoluteUrl, siteConfig } from "@/lib/site";

import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "education",
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
    shortcut: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/brand-icon.svg", type: "image/svg+xml" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: absoluteUrl(siteConfig.ogImagePath),
        width: 1200,
        height: 630,
        alt: siteConfig.ogImageAlt,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [absoluteUrl(siteConfig.twitterImagePath)],
  },
};

export const viewport: Viewport = {
  themeColor: siteConfig.themeColor,
  colorScheme: "dark light",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps): ReactElement {
  return (
    <html className="bg-dicon-bg text-dicon-text" lang="en-GB" suppressHydrationWarning>
      <body className="min-h-screen bg-dicon-bg text-dicon-text antialiased">
        <ThemeProvider>
          <div className="relative flex min-h-screen flex-col overflow-hidden">
            {/* Background decorations — dark mode */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 hidden dark:block">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(6,7,8,0.92),rgba(8,8,10,0.8)_38%,rgba(10,10,10,0.96))]" />
              <div className="absolute inset-0 bg-hero-grid opacity-[0.14] mix-blend-screen" />
              <div className="absolute left-[-8%] top-[-16%] h-[34rem] w-[34rem] rounded-full bg-gold/12 blur-3xl" />
              <div className="absolute bottom-[-18%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-crimson/12 blur-3xl" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,201,106,0.12),transparent_26%),radial-gradient(circle_at_82%_16%,rgba(178,34,34,0.12),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_18%)]" />
            </div>

            {/* Background decorations — light mode */}
            <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 block dark:hidden">
              <div className="absolute left-[-8%] top-[-16%] h-[34rem] w-[34rem] rounded-full bg-gold/[0.05] blur-3xl" />
              <div className="absolute bottom-[-18%] right-[-8%] h-[28rem] w-[28rem] rounded-full bg-crimson/[0.03] blur-3xl" />
            </div>

            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>

          <Analytics />
          <SpeedInsights />
          <Toaster position="top-right" richColors={true} />
        </ThemeProvider>
      </body>
    </html>
  );
}
