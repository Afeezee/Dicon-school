"use client";

import { Camera, Clapperboard, Film, PenSquare } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { ReactElement } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { PROGRAMMES, type Programme } from "@/lib/constants";

const programmeIcons: LucideIcon[] = [Clapperboard, PenSquare, Camera, Film];

export default function SchoolPreview(): ReactElement {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="D'Icon School blends professional discipline with real production experience so students train in the conditions that shape actual Yoruba screen careers." tag="The School" title="Train Where *Icons* Are Made" />

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {PROGRAMMES.map((programme: Programme, index: number) => {
            const Icon: LucideIcon = programmeIcons[index] ?? Film;

            return (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                key={programme.name}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, amount: 0.2 }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="h-full border-t-2 border-t-gold/70">
                  <CardContent className="flex h-full flex-col gap-4 p-6">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gold/10 text-gold-light">
                      <Icon className="h-7 w-7" />
                    </div>
                    <CardTitle>{programme.name}</CardTitle>
                    <CardDescription className="text-lg">{programme.summary}</CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <Button asChild={true} variant="outline">
          <Link href="/school">View All Programmes →</Link>
        </Button>
      </div>
    </section>
  );
}