"use client";

import { motion } from "framer-motion";
import type { ReactElement } from "react";

import { FOUNDER_BIO_PARAGRAPHS, FOUNDER_QUOTE, FOUNDER_RECOGNITIONS, type FounderRecognition } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import FounderPortrait from "@/components/ui/FounderPortrait";

function RecognitionLink({ href, label }: { href?: string; label: string }): ReactElement {
  if (!href) {
    return <span className="text-dicon-text">{label}</span>;
  }

  return (
    <a className="transition hover:text-gold-light" href={href} rel="noreferrer" target="_blank">
      {label}
    </a>
  );
}

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
            <CardContent className="p-0">
              <FounderPortrait
                className="aspect-[4/5] rounded-[1.75rem] border border-gold/25 bg-black/30"
                imageClassName="rounded-[1.75rem]"
                initialsClassName="text-8xl"
                priority={true}
                sizes="(min-width: 1024px) 30vw, 90vw"
              />
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

          <div className="rounded-[1.75rem] border border-black/10 bg-[radial-gradient(circle_at_top,rgba(200,168,75,0.14),transparent_42%),rgba(255,255,255,0.92)] p-6 dark:border-white/10 dark:bg-[radial-gradient(circle_at_top,rgba(232,201,106,0.12),transparent_38%),rgba(12,12,12,0.78)]">
            <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <div className="space-y-2">
                <p className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">Awards and nominations</p>
                <p className="max-w-2xl text-lg leading-relaxed text-dicon-muted">
                  A concise record of Ibrahim Yekini&apos;s acting and producing recognition across key releases.
                </p>
              </div>
              <Badge className="w-fit text-dicon-text" variant="secondary">
                {`${FOUNDER_RECOGNITIONS.length} recognitions`}
              </Badge>
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {FOUNDER_RECOGNITIONS.map((recognition: FounderRecognition): ReactElement => (
                <Card
                  className="border-black/10 bg-white/80 shadow-none dark:border-white/10 dark:bg-black/25"
                  key={`${recognition.year}-${recognition.award}-${recognition.category}`}
                >
                  <CardContent className="space-y-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-accent text-sm uppercase tracking-[0.24em] text-gold-light">{recognition.year}</p>
                      <Badge variant={recognition.result === "Won" ? "default" : "outline"}>{recognition.result}</Badge>
                    </div>

                    <div className="space-y-1">
                      <p className="font-display text-xl leading-tight text-dicon-text">
                        <RecognitionLink href={recognition.awardUrl} label={recognition.award} />
                      </p>
                      <p className="text-sm uppercase tracking-[0.18em] text-gold dark:text-[#e6d2a0]">{recognition.category}</p>
                    </div>

                    {recognition.film ? (
                      <p className="text-base leading-relaxed text-dicon-muted">
                        Film: <RecognitionLink href={recognition.filmUrl} label={recognition.film} />
                      </p>
                    ) : null}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

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