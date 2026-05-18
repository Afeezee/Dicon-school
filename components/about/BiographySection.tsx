"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";

import { FOUNDER_AWARDS, FOUNDER_BIO_PARAGRAPHS, FOUNDER_QUOTE } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FounderPortrait from "@/components/ui/FounderPortrait";

export default function BiographySection(): ReactElement {
  return (
    <section className="section-padding">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.div
          className="lg:sticky lg:top-28 lg:self-start"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden bg-[radial-gradient(circle_at_top,rgba(232,201,106,0.16),transparent_26%),linear-gradient(180deg,#17110b_0%,#0a0a0a_100%)] p-8">
            <CardContent className="space-y-8 p-0">
              <FounderPortrait
                className="aspect-[4/5] rounded-[1.75rem] border border-gold/25 bg-black/30"
                imageClassName="rounded-[1.75rem]"
                initialsClassName="text-8xl"
                priority={true}
                sizes="(min-width: 1024px) 30vw, 90vw"
              />
              <div className="space-y-4">
                <p className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">Awards</p>
                <div className="flex flex-wrap gap-3">
                  {FOUNDER_AWARDS.map((award: string): ReactElement => (
                    <Badge key={award}>{award}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.68, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, amount: 0.2 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {FOUNDER_BIO_PARAGRAPHS.map((paragraph: string, index: number): ReactElement => (
            <p className="text-xl leading-relaxed text-dicon-muted" key={index.toString()}>
              {paragraph}
            </p>
          ))}

          <blockquote className="rounded-[1.75rem] border-l-4 border-gold bg-dicon-card px-6 py-6 font-display text-3xl italic leading-snug text-gold-light">
            “{FOUNDER_QUOTE}”
            <span className="mt-4 block font-body text-lg uppercase tracking-[0.2em] text-dicon-muted">
              Ibrahim Yekini
            </span>
          </blockquote>
        </motion.div>
      </div>
    </section>
  );
}