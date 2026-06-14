"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactElement } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Programme } from "@/lib/constants";

interface ProgrammePageContentProps {
  programme: Programme;
}

const CONTENT_BG_IMAGES: Record<string, string> = {
  "film-directing": "/media/programmes/directing-bg-cameraman.jpg",
  "film-production": "/media/programmes/production-bg-dolly.jpg",
  "acting-and-performance": "/media/programmes/acting-and-performance-hero.png",
  "scriptwriting": "/media/programmes/scriptwriting-hero.png",
};

const ON_SET_IMAGES: Record<string, { src: string; alt: string; badge: string; caption: string }> = {
  "film-directing": {
    src: "/media/programmes/founder-with-veterans-on-set.jpg",
    alt: "Founder Ibrahim Yekini (Itele D'Icon) with veteran Yoruba Nollywood actors on the set of Kesari",
    badge: "On Set",
    caption: "Founder Ibrahim Yekini (Itele D’Icon) with veteran Yoruba Nollywood actors on the set of Kesari — the calibre of industry professionals our students learn alongside.",
  },
  "film-production": {
    src: "/media/programmes/production-crew-on-set.jpg",
    alt: "Production crew coordinating camera equipment and dolly track on the set of Kesari",
    badge: "On Set",
    caption: "Crew coordinating camera rigs and equipment on location — the real-world production logistics our students master.",
  },
  "scriptwriting": {
    src: "/media/programmes/founder-directing-with-script.jpg",
    alt: "Founder Ibrahim Yekini (Itele D'Icon) directing an actor on set with script in hand",
    badge: "Script to Screen",
    caption: "Founder Ibrahim Yekini (Itele D’Icon) working through a script with an actor on the set of Tani Mi — where the written word meets performance.",
  },
};

export default function ProgrammePageContent({ programme }: ProgrammePageContentProps): ReactElement {
  const isActingProgramme = programme.slug === "acting-and-performance";
  const contentBgImage = CONTENT_BG_IMAGES[programme.slug];
  const onSetImage = ON_SET_IMAGES[programme.slug];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative isolate flex min-h-[70vh] flex-col justify-end overflow-hidden border-b border-gold/20 pt-32 pb-16 lg:min-h-[85vh] lg:pb-24">
        {/* Parallax Background */}
        <div className="absolute inset-0 -z-10">
          <Image
            alt={`${programme.name} Hero`}
            className="object-cover"
            fill
            priority
            quality={90}
            src={programme.heroImage}
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,10,10,0.05)_0%,rgba(10,10,10,0.15)_20%,rgba(10,10,10,0.6)_45%,rgba(10,10,10,0.95)_62%,rgba(10,10,10,1)_78%)]" />
          <div className="absolute inset-0 bg-hero-grid opacity-30 mix-blend-screen" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 lg:px-10">
          <div className="max-w-4xl space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3"
            >
              <Badge variant="outline" className="border-gold/50 text-gold-light bg-black/40 backdrop-blur-md px-3 py-1 text-sm tracking-widest uppercase">
                {programme.duration}
              </Badge>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-semibold leading-[1.05] text-[#fff6e8] text-shadow-hero"
            >
              {programme.name.replace('&', '&\n')}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.65, delay: 0.2 }}
              className="text-xl md:text-2xl leading-relaxed text-[#dacdb4] max-w-3xl"
            >
              {programme.summary}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Main Content Grid */}
      <section className="relative isolate section-padding pt-8 lg:pt-12 overflow-hidden">
        {/* Fainted background image */}
        {contentBgImage && (
          <div className="absolute inset-0 -z-10">
            <Image
              alt=""
              src={contentBgImage}
              fill
              className="object-cover object-center blur-sm scale-110"
              quality={30}
            />
            <div className="absolute inset-0 bg-[rgba(253,251,247,0.92)] dark:bg-black/[0.75]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(253,251,247,1)_0%,transparent_12%,transparent_88%,rgba(253,251,247,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(10,10,10,1)_0%,transparent_12%,transparent_88%,rgba(10,10,10,1)_100%)]" />
          </div>
        )}
        <div className="mx-auto max-w-7xl grid gap-16 lg:grid-cols-12">

          {/* Left Column: Description, On-Set Image & Curriculum */}
          <div className="lg:col-span-7 xl:col-span-8 space-y-16">
            <div className="space-y-6">
              <SectionHeader tag="Overview" title="The *Philosophy*" />
              <div className="prose dark:prose-invert prose-lg max-w-none text-dicon-muted prose-p:leading-relaxed">
                {programme.detailedDescription.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* On-Set Image or Rehearsal Video — between description and syllabus */}
            {isActingProgramme && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative aspect-video w-full overflow-hidden rounded-2xl border border-gold/30 shadow-lifted gold-border-glow bg-black"
              >
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src="/media/programmes/rehearsal-tutoring.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.6)_100%)]" />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4 z-10">
                  <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md border-white/20 mb-2 font-accent tracking-widest text-xs">
                    Behind the Scenes
                  </Badge>
                  <p className="text-white/90 text-xs md:text-sm max-w-md font-medium drop-shadow-md">
                    Founder Ibrahim Yekini (Itele D&apos;Icon) tutoring students during an intense rehearsal session.
                  </p>
                </div>
              </motion.div>
            )}
            {onSetImage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7 }}
                className="relative w-full overflow-hidden rounded-2xl border border-gold/30 shadow-lifted gold-border-glow bg-black"
              >
                <Image
                  alt={onSetImage.alt}
                  src={onSetImage.src}
                  width={900}
                  height={506}
                  className="w-full h-auto object-cover"
                  quality={90}
                />
                <div className="absolute inset-0 pointer-events-none rounded-2xl border border-white/5 bg-[linear-gradient(180deg,transparent_40%,rgba(0,0,0,0.75)_100%)]" />

                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 right-4 z-10">
                  <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-md border-white/20 mb-2 font-accent tracking-widest text-xs">
                    {onSetImage.badge}
                  </Badge>
                  <p className="text-white/90 text-xs md:text-sm max-w-md font-medium drop-shadow-md">
                    {onSetImage.caption}
                  </p>
                </div>
              </motion.div>
            )}

            <div className="space-y-8">
              <SectionHeader tag="Syllabus" title="What You Will *Learn*" />
              <div className="grid gap-4 sm:grid-cols-2">
                {programme.curriculum.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="h-full border-gold/10 bg-gold/[0.05] dark:bg-black/40 hover:border-gold/30 transition-colors">
                      <CardContent className="p-5 flex items-start gap-4">
                        <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gold/20 text-gold-light">
                          <span className="text-xs font-bold font-accent">{index + 1}</span>
                        </div>
                        <p className="text-sm md:text-base leading-snug">{item}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Outcomes & Info Box */}
          <div className="lg:col-span-5 xl:col-span-4 space-y-10">
            <Card className="border-gold/20 bg-gradient-to-b from-gold/[0.1] to-gold/[0.02] dark:from-gold/10 dark:to-black/60 shadow-lg sticky top-28">
              <CardContent className="p-8 space-y-8">
                <div>
                  <h3 className="font-display text-2xl mb-3 text-gold-light">Learning Outcomes</h3>
                  <ul className="space-y-4">
                    {programme.learningOutcomes.map((outcome, index) => (
                      <li key={index} className="flex items-start gap-3 text-sm text-dicon-muted">
                        <CheckCircle2 className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-gold/10">
                  <h4 className="font-accent tracking-widest text-gold text-sm mb-2 uppercase">Who Should Apply</h4>
                  <p className="text-sm leading-relaxed text-dicon-muted">
                    {programme.idealFor}
                  </p>
                </div>

                <Button className="w-full h-12 text-base shadow-[0_0_20px_rgba(200,168,75,0.3)]" asChild>
                  <Link href="/admission">
                    Apply for this Programme
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="section-padding py-0">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold/25 bg-[linear-gradient(135deg,rgba(200,168,75,0.16),rgba(139,105,20,0.08),rgba(245,240,232,0.7))] dark:bg-[linear-gradient(135deg,rgba(200,168,75,0.14),rgba(139,105,20,0.08),rgba(10,10,10,0.65))] p-8 lg:flex lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold-light">Next Steps</p>
            <h2 className="font-display text-4xl leading-tight text-dicon-text">Ready to begin your journey?</h2>
            <p className="text-lg leading-relaxed text-dicon-muted">
              Admissions are currently open. Join the next cohort of the {programme.name} programme.
            </p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button asChild size="lg" className="bg-gold hover:bg-gold-light text-black">
              <Link href="/admission">Begin Your Application</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
