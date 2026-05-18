"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactElement, ReactNode } from "react";

interface SectionHeaderProps {
  align?: "left" | "center";
  subtitle?: string;
  tag: string;
  title: string;
}

function renderTitle(title: string): ReactNode[] {
  return title.split(/(\*[^*]+\*)/g).filter(Boolean).map((segment: string, index: number): ReactNode => {
    if (segment.startsWith("*") && segment.endsWith("*")) {
      return (
        <span className="font-display italic text-gold-light" key={`${segment}-${index}`}>
          {segment.slice(1, -1)}
        </span>
      );
    }

    return <span key={`${segment}-${index}`}>{segment}</span>;
  });
}

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
    },
  },
};

const tagVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const titleVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const subtitleVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.65,
      ease: "easeOut",
    },
  },
};

export default function SectionHeader({
  align = "left",
  subtitle,
  tag,
  title,
}: SectionHeaderProps): ReactElement {
  const alignmentClass: string = align === "center" ? "items-center text-center" : "items-start text-left";
  const tagAlignmentClass: string = align === "center" ? "justify-center" : "justify-start";

  return (
    <motion.div
      className={`flex flex-col gap-5 ${alignmentClass}`}
      initial="hidden"
      variants={containerVariants}
      viewport={{ amount: 0.35, once: true }}
      whileInView="visible"
    >
      <motion.div className={`flex items-center gap-4 ${tagAlignmentClass}`} variants={tagVariants}>
        <span className="h-px w-10 bg-gold" />
        <span className="font-accent text-sm uppercase tracking-[0.32em] text-gold-light">{tag}</span>
      </motion.div>

      <motion.h2
        className="max-w-4xl font-display text-[clamp(2rem,4vw,3.5rem)] font-semibold leading-[1.02] text-[#fff6e8]"
        variants={titleVariants}
      >
        {renderTitle(title)}
      </motion.h2>

      {subtitle ? (
        <motion.p className="max-w-[39rem] text-[1.18rem] leading-relaxed text-dicon-muted" variants={subtitleVariants}>
          {subtitle}
        </motion.p>
      ) : null}
    </motion.div>
  );
}