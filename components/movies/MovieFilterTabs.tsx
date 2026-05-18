"use client";

import type { ReactElement } from "react";

import { Button } from "@/components/ui/button";

export type MovieFilterKey = "actor" | "all" | "director" | "netflix" | "producer" | "youtube";

interface MovieFilterTabsProps {
  activeFilter: MovieFilterKey;
  onChange: (filter: MovieFilterKey) => void;
}

const filterTabs: Array<{ label: string; value: MovieFilterKey }> = [
  { label: "All", value: "all" },
  { label: "As Actor", value: "actor" },
  { label: "As Director", value: "director" },
  { label: "As Producer", value: "producer" },
  { label: "On Netflix", value: "netflix" },
  { label: "On YouTube", value: "youtube" },
];

export default function MovieFilterTabs({ activeFilter, onChange }: MovieFilterTabsProps): ReactElement {
  return (
    <div className="flex flex-wrap gap-3">
      {filterTabs.map((tab: { label: string; value: MovieFilterKey }): ReactElement => (
        <Button key={tab.value} onClick={(): void => onChange(tab.value)} size="sm" variant={activeFilter === tab.value ? "default" : "outline"}>
          {tab.label}
        </Button>
      ))}
    </div>
  );
}