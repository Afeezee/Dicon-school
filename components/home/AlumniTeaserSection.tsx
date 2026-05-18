"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactElement } from "react";

import SectionHeader from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Alumni } from "@/lib/types";

interface AlumniTeaserSectionProps {
  alumni: Alumni[];
}

function getInitials(fullName: string): string {
  return fullName
    .split(/\s+/)
    .slice(0, 2)
    .map((part: string): string => part.charAt(0).toUpperCase())
    .join("");
}

export default function AlumniTeaserSection({ alumni }: AlumniTeaserSectionProps): ReactElement {
  return (
    <section className="section-padding">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="Graduates of D'Icon School are building their own legacies across performance, directing, filmmaking, and institution building." tag="Alumni" title="The Next *Generation*" />

        <div className="grid gap-6 lg:grid-cols-3">
          {alumni.map((alumnus: Alumni, index: number): ReactElement => (
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              key={alumnus.id}
              transition={{ duration: 0.58, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true, amount: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <Card className="h-full border-t border-t-gold/45">
                <CardContent className="flex h-full flex-col gap-5 p-6">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[linear-gradient(135deg,#E8C96A,#C8A84B,#8B6914)] text-2xl font-accent uppercase tracking-[0.14em] text-dicon-bg">
                    {getInitials(alumnus.full_name)}
                  </div>
                  <div className="space-y-2">
                    <h3 className="font-display text-3xl text-dicon-text">{alumnus.stage_name ?? alumnus.full_name}</h3>
                    <Badge variant="outline">{alumnus.current_role}</Badge>
                  </div>
                  <p className="line-clamp-3 text-lg leading-relaxed text-dicon-muted">{alumnus.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <Button asChild={true} variant="outline">
          <Link href="/alumni">Meet All Alumni →</Link>
        </Button>
      </div>
    </section>
  );
}