"use client";

import { startTransition, useDeferredValue, useState, type ReactElement } from "react";

import AlumniCard from "@/components/alumni/AlumniCard";
import SectionHeader from "@/components/ui/SectionHeader";
import SkeletonCard from "@/components/ui/SkeletonCard";
import { Button } from "@/components/ui/button";
import type { Alumni } from "@/lib/types";

type AlumniFilterKey = "actors" | "all" | "directors" | "school-founders";

interface AlumniSectionProps {
  alumni: Alumni[];
}

const alumniFilters: Array<{ label: string; value: AlumniFilterKey }> = [
  { label: "All", value: "all" },
  { label: "Actors", value: "actors" },
  { label: "Directors", value: "directors" },
  { label: "School Founders", value: "school-founders" },
];

function filterAlumni(alumni: Alumni[], filter: AlumniFilterKey): Alumni[] {
  if (filter === "all") {
    return alumni;
  }

  if (filter === "actors") {
    return alumni.filter((alumnus: Alumni): boolean => alumnus.current_role.toLowerCase().includes("actor") || alumnus.current_role.toLowerCase().includes("actress"));
  }

  if (filter === "directors") {
    return alumni.filter((alumnus: Alumni): boolean => alumnus.current_role.toLowerCase().includes("director"));
  }

  return alumni.filter((alumnus: Alumni): boolean => alumnus.current_role.toLowerCase().includes("school founder") || alumnus.current_role.toLowerCase().includes("founder"));
}

export default function AlumniSection({ alumni }: AlumniSectionProps): ReactElement {
  const [activeFilter, setActiveFilter] = useState<AlumniFilterKey>("all");
  const deferredFilter: AlumniFilterKey = useDeferredValue(activeFilter);
  const visibleAlumni: Alumni[] = filterAlumni(alumni, deferredFilter);
  const isFiltering: boolean = deferredFilter !== activeFilter;

  return (
    <section className="section-padding pt-8">
      <div className="mx-auto max-w-7xl space-y-10">
        <SectionHeader subtitle="Every legend was once a student. The artists who trained at D'Icon School of Performing Arts have gone on to headline movies, found their own schools, and win industry awards - carrying Itele's legacy forward." tag="Alumni" title="Where Talent *Goes Next*" />

        <div className="flex flex-wrap gap-3">
          {alumniFilters.map((filter: { label: string; value: AlumniFilterKey }): ReactElement => (
            <Button key={filter.value} onClick={(): void => startTransition((): void => setActiveFilter(filter.value))} size="sm" variant={activeFilter === filter.value ? "default" : "outline"}>
              {filter.label}
            </Button>
          ))}
        </div>

        {isFiltering ? (
          <div className="grid gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index: number): ReactElement => (
              <SkeletonCard key={index.toString()} variant="alumni" />
            ))}
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-3">
            {visibleAlumni.map((alumnus: Alumni): ReactElement => (
              <AlumniCard alumnus={alumnus} key={alumnus.id} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}