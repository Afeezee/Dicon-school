"use client";

import { motion, type Variants } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

import GoldDivider from "@/components/ui/GoldDivider";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { HOME_STATS } from "@/lib/constants";
import LazyYouTube from "@/components/ui/LazyYouTube";
import { VIDEO_IDS } from "@/lib/types";

interface HeroSectionProps {
  primaryCtaLabel: string;
  secondaryCtaLabel: string;
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.72,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const heroPillars: string[] = ["Screen Presence", "Stage Discipline", "Yoruba Storytelling"];

export default function HeroSection({ primaryCtaLabel, secondaryCtaLabel }: HeroSectionProps): ReactElement {
  const heroPoster: string = "/media/hero/koleoso-hero-v2-poster.jpg";
  const heroVideoSrc: string = "/media/hero/koleoso-hero-v2.mp4";

  return (
    <section className="dark relative flex min-h-[calc(100vh-5rem)] items-end overflow-hidden border-b border-white/10">
      <div className="absolute inset-0">
        <video
          aria-hidden={true}
          autoPlay={true}
          className="h-full w-full scale-[1.01] object-cover opacity-[0.52] brightness-[1.14] contrast-[1.05] saturate-[1.02]"
          loop={true}
          muted={true}
          playsInline={true}
          poster={heroPoster}
          preload="metadata"
        >
          <source src={heroVideoSrc} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,6,8,0.72)_0%,rgba(5,6,8,0.42)_46%,rgba(5,6,8,0.62)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(232,201,106,0.3),transparent_28%),radial-gradient(circle_at_84%_18%,rgba(178,34,34,0.18),transparent_26%)]" />
        <div className="absolute inset-0 bg-hero-grid opacity-15" />
      </div>

      <div className="section-padding relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-10">
        <div className="grid gap-10 xl:grid-cols-[1.06fr_0.54fr] xl:items-end">
          <motion.div className="max-w-4xl" initial="hidden" variants={containerVariants} whileInView="visible" viewport={{ once: true, amount: 0.25 }}>
            <motion.div className="glass-panel mb-6 inline-flex items-center gap-3 rounded-full px-4 py-3" variants={itemVariants}>
              <span className="h-2.5 w-2.5 rounded-full bg-gold-light shadow-[0_0_18px_rgba(241,217,142,0.75)]" />
              <span className="font-accent text-sm uppercase tracking-[0.34em] text-gold-light">Serious Performing Arts Training</span>
            </motion.div>

            <motion.p className="mb-5 font-accent text-sm uppercase tracking-[0.38em] text-gold-light" variants={itemVariants}>
              {"D'Icon School of Performing Arts"}
            </motion.p>

            <motion.h1 className="text-shadow-hero max-w-4xl font-display text-[clamp(3.25rem,9vw,7rem)] font-semibold leading-[0.9] text-[#fff7eb]" variants={itemVariants}>
              <span className="block">Where Talent</span>
              <span className="block italic text-gold-light">Becomes</span>
              <span className="block">Legacy</span>
            </motion.h1>

            <motion.p className="mt-6 max-w-2xl text-[clamp(1.22rem,2.1vw,1.62rem)] leading-relaxed text-[#efe3cc]" variants={itemVariants}>
              Nigeria&apos;s premier Yoruba performing arts school, founded by award-winning actor Ibrahim Yekini (Itele D&apos;Icon), where disciplined craft meets cinematic scale.
            </motion.p>

            <motion.div className="mt-10 flex flex-wrap gap-4" variants={itemVariants}>
              <Button asChild={true} size="lg">
                <Link href="/school">{primaryCtaLabel}</Link>
              </Button>

              <Dialog>
                <DialogTrigger asChild={true}>
                  <Button size="lg" variant="outline">
                    {secondaryCtaLabel}
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl">
                  <DialogHeader>
                    <DialogTitle>Koleoso 2025</DialogTitle>
                    <DialogDescription>Watch the official trailer for Koleoso — Ibrahim Yekini&apos;s latest cinematic masterpiece.</DialogDescription>
                  </DialogHeader>
                  <LazyYouTube className="w-full" title="Koleoso 2025 Trailer" videoId={VIDEO_IDS.koleoso_pt1} />
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          <motion.aside
            className="glass-panel-strong hidden rounded-[2rem] p-6 xl:block"
            initial={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
            viewport={{ once: true, amount: 0.45 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <p className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">Inside the Programme</p>
            <div className="mt-5 space-y-4">
              <h2 className="font-display text-3xl leading-tight text-[#fff7eb]">Training shaped by set discipline and live theatre intensity.</h2>
              <p className="text-lg leading-relaxed text-dicon-muted">
                Students are immersed in screen presence, line delivery, performance truth, and the working culture behind serious Yoruba storytelling.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {heroPillars.map((pillar: string): ReactElement => (
                <span className="glass-panel rounded-full px-4 py-2 font-accent text-sm uppercase tracking-[0.24em] text-[#fff0cf]" key={pillar}>
                  {pillar}
                </span>
              ))}
            </div>
          </motion.aside>
        </div>

        <motion.div className="glass-panel-strong grid gap-5 rounded-[2rem] px-6 py-5 md:grid-cols-4 md:gap-0 md:px-8" initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.4 }} transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}>
          {HOME_STATS.map((stat, index) => (
            <div className="relative flex flex-col items-start gap-1 md:px-5" key={stat.label}>
              <span className="font-accent text-3xl uppercase tracking-[0.18em] text-gold-light">{stat.value}</span>
              <span className="text-base uppercase tracking-[0.22em] text-[#f0e3c6]">{stat.label}</span>
              {index < HOME_STATS.length - 1 ? <GoldDivider className="absolute -right-2 top-0 hidden h-full md:block" glow={true} orientation="vertical" /> : null}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}