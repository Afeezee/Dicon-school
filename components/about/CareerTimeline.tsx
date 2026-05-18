"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import { CAREER_TIMELINE, type TimelineItem } from "@/lib/constants";

export default function CareerTimeline(): ReactElement {
  return (
    <section className="section-padding pt-0">
      <div className="mx-auto max-w-5xl space-y-10">
        <SectionHeader subtitle="A career built through performance discipline, production ambition, and a commitment to Yoruba storytelling at cinematic scale." tag="Timeline" title="A Career in *Motion*" />

        <div className="relative pl-6 md:pl-10">
          <div className="absolute left-[0.55rem] top-0 h-full w-px bg-gradient-to-b from-gold via-gold/30 to-transparent md:left-4" />
          <div className="space-y-10">
            {CAREER_TIMELINE.map((item: TimelineItem, index: number): ReactElement => (
              <motion.div
                className="relative"
                initial={{ opacity: 0, x: 16 }}
                key={item.year}
                transition={{ duration: 0.55, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                whileInView={{ opacity: 1, x: 0 }}
              >
                <div className="absolute left-[-1.12rem] top-2 h-4 w-4 rounded-full border border-gold/70 bg-dicon-bg shadow-[0_0_0_4px_rgba(200,168,75,0.12)] md:left-[-2.05rem]" />
                <p className="font-accent text-lg uppercase tracking-[0.24em] text-gold-light">{item.year}</p>
                <h3 className="mt-2 font-display text-3xl text-dicon-text">{item.title}</h3>
                <p className="mt-3 text-lg leading-relaxed text-dicon-muted">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}