"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import FounderPortrait from "@/components/ui/FounderPortrait";

export default function AboutOwnerPreview(): ReactElement {
  return (
    <section className="section-padding">
      <motion.div
        className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center"
        initial={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        viewport={{ once: true, amount: 0.2 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <div className="relative mx-auto w-full max-w-xl">
          <div className="absolute left-4 top-4 h-16 w-16 border-l border-t border-gold/60" />
          <div className="absolute bottom-4 right-4 h-16 w-16 border-b border-r border-gold/60" />
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(232,201,106,0.15),transparent_28%),linear-gradient(145deg,#16110a_0%,#0b0b0b_70%)] p-8">
            <CardContent className="p-0">
              <FounderPortrait
                className="aspect-[4/5] rounded-[1.75rem] border border-gold/25 bg-black/30"
                fallbackClassName="shadow-[0_0_35px_rgba(200,168,75,0.18)]"
                imageClassName="rounded-[1.75rem]"
                initialsClassName="text-7xl"
                priority={true}
                sizes="(min-width: 1024px) 32vw, 88vw"
              />
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <p className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">The Founder</p>
          <h2 className="font-display text-[clamp(2.3rem,5vw,4.4rem)] leading-[1.02] text-dicon-text">
            Ibrahim Yekini <span className="italic text-gold">(Itele D&apos;Icon)</span>
          </h2>
          <p className="max-w-2xl text-xl leading-relaxed text-dicon-muted">
            Actor, director, producer, and mentor whose career has shaped modern Yoruba cinema and inspired a new generation of performers and filmmakers.
          </p>
          <div className="flex flex-wrap gap-3">
            <Badge>Actor</Badge>
            <Badge>Director</Badge>
            <Badge>Producer</Badge>
          </div>
          <p className="max-w-2xl text-lg leading-relaxed text-dicon-muted">
            From live theatre roots to Netflix-scale productions and record-breaking YouTube series, Itele&apos;s work carries the same mission: build excellence on screen and help the next generation go further.
          </p>
          <Button asChild={true} variant="ghost">
            <Link href="/about">Read Full Story →</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}