"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SectionHeader from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PROGRAMMES, SCHOOL_FAQS, WHY_DICON_REASONS, type FAQItem, type Programme, type ReasonItem } from "@/lib/constants";
import { Camera, Clapperboard, Film, PenSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

const programmeIcons: LucideIcon[] = [Clapperboard, PenSquare, Camera, Film];

export default function SchoolPageContent(): ReactElement {
  return (
    <div className="space-y-16 pb-20 pt-8">
      <section className="section-padding pb-0">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeader
            subtitle="Founded by Ibrahim Yekini (Itele D'Icon), D'Icon School of Performing Arts (@dicon_schoolofpfa) is dedicated to training the next generation of Yoruba Nollywood talent in acting, scriptwriting, directing, and production. Itele's guiding philosophy: “I always want my students to go higher than me.”"
            tag="About the School"
            title="D'Icon School of *Performing Arts*"
          />
        </div>
      </section>

      <section className="section-padding py-0">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAMMES.map((programme: Programme, index: number): ReactElement => {
            const Icon: LucideIcon = programmeIcons[index] ?? Film;

            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                key={programme.name}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full border-t-2 border-t-gold/65">
                  <CardContent className="flex h-full flex-col gap-5 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold-light">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle>{programme.name}</CardTitle>
                    <CardDescription>{programme.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="section-padding py-0">
        <div className="mx-auto max-w-7xl space-y-8">
          <SectionHeader tag="Why Dicon?" title="Why Students Choose *This Path*" />
          <div className="grid gap-6 lg:grid-cols-3">
            {WHY_DICON_REASONS.map((reason: ReasonItem, index: number): ReactElement => (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                key={reason.title}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.15 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full">
                  <CardContent className="space-y-4 p-6">
                    <Badge variant="outline">Reason {index + 1}</Badge>
                    <CardTitle>{reason.title}</CardTitle>
                    <CardDescription>{reason.description}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding py-0">
        <div className="mx-auto max-w-5xl space-y-8">
          <SectionHeader tag="FAQ" title="Questions *Answered*" />
          <Accordion className="space-y-4" collapsible={true} type="single">
            {SCHOOL_FAQS.map((faq: FAQItem, index: number): ReactElement => (
              <AccordionItem key={faq.question} value={`faq-${index}`}>
                <AccordionTrigger>{faq.question}</AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="section-padding py-0">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-gold/25 bg-[linear-gradient(135deg,rgba(200,168,75,0.14),rgba(139,105,20,0.08),rgba(10,10,10,0.65))] p-8 lg:flex lg:items-center lg:justify-between lg:p-10">
          <div className="max-w-2xl space-y-3">
            <p className="font-accent text-sm uppercase tracking-[0.3em] text-gold-light">Admissions</p>
            <h2 className="font-display text-4xl leading-tight text-dicon-text">Admissions are open - apply today.</h2>
            <p className="text-lg leading-relaxed text-dicon-muted">Take the next step towards acting, directing, writing, or producing within a working Yoruba film ecosystem.</p>
          </div>
          <div className="mt-6 lg:mt-0">
            <Button asChild={true} size="lg">
              <Link href="/admission">Begin Your Application</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}