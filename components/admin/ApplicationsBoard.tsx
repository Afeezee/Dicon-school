"use client";

import { Clock3, Search, ShieldCheck, Users, XCircle, type LucideIcon } from "lucide-react";
import { startTransition, useDeferredValue, useMemo, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { updateAdmissionStatusAction } from "@/app/admin/actions";
import { Badge, type BadgeProps } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Admission, AdmissionStatus } from "@/lib/types";

type AdmissionFilterKey = "all" | AdmissionStatus;

interface ApplicationsBoardProps {
  admissions: Admission[];
  heading?: string;
  showMetrics?: boolean;
  subtitle?: string;
}

interface DashboardMetric {
  icon: LucideIcon;
  label: string;
  value: number;
}

const filterOptions: Array<{ label: string; value: AdmissionFilterKey }> = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Reviewed", value: "reviewed" },
  { label: "Accepted", value: "accepted" },
  { label: "Declined", value: "declined" },
];

function getStatusBadgeVariant(status: AdmissionStatus): BadgeProps["variant"] {
  if (status === "accepted") {
    return "default";
  }

  if (status === "declined") {
    return "crimson";
  }

  if (status === "reviewed") {
    return "outline";
  }

  return "secondary";
}

function formatAdmissionDate(value: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function buildMetrics(admissions: Admission[]): DashboardMetric[] {
  return [
    { icon: Users, label: "Total Applications", value: admissions.length },
    { icon: Clock3, label: "Pending Review", value: admissions.filter((admission: Admission): boolean => admission.status === "pending").length },
    { icon: ShieldCheck, label: "Reviewed", value: admissions.filter((admission: Admission): boolean => admission.status === "reviewed").length },
    { icon: XCircle, label: "Closed Out", value: admissions.filter((admission: Admission): boolean => admission.status === "accepted" || admission.status === "declined").length },
  ];
}

export default function ApplicationsBoard({
  admissions: initialAdmissions,
  heading = "Applications queue.",
  showMetrics = true,
  subtitle = "Search by name, email, programme, or state, then update the review status for each applicant.",
}: ApplicationsBoardProps): ReactElement {
  const router = useRouter();
  const [admissions, setAdmissions] = useState<Admission[]>(initialAdmissions);
  const [draftStatuses, setDraftStatuses] = useState<Record<string, AdmissionStatus>>({});
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<AdmissionFilterKey>("all");
  const [updatingAdmissionId, setUpdatingAdmissionId] = useState<string | null>(null);
  const deferredSearchTerm: string = useDeferredValue(searchTerm);
  const deferredFilter: AdmissionFilterKey = useDeferredValue(activeFilter);
  const metrics: DashboardMetric[] = useMemo((): DashboardMetric[] => buildMetrics(admissions), [admissions]);
  const visibleAdmissions: Admission[] = useMemo((): Admission[] => {
    const normalisedQuery: string = deferredSearchTerm.trim().toLowerCase();

    return admissions.filter((admission: Admission): boolean => {
      const matchesStatus: boolean = deferredFilter === "all" || admission.status === deferredFilter;
      const matchesQuery: boolean =
        normalisedQuery.length === 0 ||
        admission.full_name.toLowerCase().includes(normalisedQuery) ||
        admission.email.toLowerCase().includes(normalisedQuery) ||
        admission.programme_interest.toLowerCase().includes(normalisedQuery) ||
        admission.state_of_origin.toLowerCase().includes(normalisedQuery);

      return matchesStatus && matchesQuery;
    });
  }, [admissions, deferredFilter, deferredSearchTerm]);

  async function handleStatusSave(admission: Admission): Promise<void> {
    const nextStatus: AdmissionStatus = draftStatuses[admission.id] ?? admission.status;

    if (nextStatus === admission.status) {
      return;
    }

    setUpdatingAdmissionId(admission.id);
    const response = await updateAdmissionStatusAction({
      id: admission.id,
      status: nextStatus,
    });
    setUpdatingAdmissionId(null);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setAdmissions((currentAdmissions: Admission[]): Admission[] =>
      currentAdmissions.map((currentAdmission: Admission): Admission =>
        currentAdmission.id === admission.id ? { ...currentAdmission, status: nextStatus } : currentAdmission,
      ),
    );
    toast.success(response.message);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      {showMetrics ? (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric: DashboardMetric): ReactElement => {
            const Icon: LucideIcon = metric.icon;

            return (
              <Card key={metric.label}>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div className="space-y-2">
                    <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">{metric.label}</p>
                    <p className="font-display text-4xl text-dicon-text">{metric.value}</p>
                  </div>
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 bg-gold/10">
                    <Icon className="h-5 w-5 text-gold-light" />
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : null}

      <Card>
        <CardHeader>
          <CardTitle>{heading}</CardTitle>
          <CardDescription>{subtitle}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-2">
              <label className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light" htmlFor="admin-search">
                Search Applications
              </label>
              <div className="relative">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gold-light" />
                <Input
                  className="pl-11"
                  id="admin-search"
                  onChange={(event): void => setSearchTerm(event.target.value)}
                  placeholder="Search by applicant, email, programme, or state"
                  value={searchTerm}
                />
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Status Filter</p>
              <div className="flex flex-wrap gap-3">
                {filterOptions.map((filterOption: { label: string; value: AdmissionFilterKey }): ReactElement => (
                  <Button
                    key={filterOption.value}
                    onClick={(): void => startTransition((): void => setActiveFilter(filterOption.value))}
                    size="sm"
                    variant={activeFilter === filterOption.value ? "default" : "outline"}
                  >
                    {filterOption.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {visibleAdmissions.length > 0 ? (
            <div className="grid gap-5">
              {visibleAdmissions.map((admission: Admission): ReactElement => {
                const selectedStatus: AdmissionStatus = draftStatuses[admission.id] ?? admission.status;
                const isSaving: boolean = updatingAdmissionId === admission.id;

                return (
                  <Card className="border border-dicon-border/90 bg-dicon-surface/80" key={admission.id}>
                    <CardContent className="space-y-6 p-6">
                      <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-3">
                            <h2 className="font-display text-3xl text-dicon-text">{admission.full_name}</h2>
                            <Badge variant={getStatusBadgeVariant(admission.status)}>{admission.status}</Badge>
                          </div>
                          <p className="font-accent text-xs uppercase tracking-[0.24em] text-dicon-muted">Submitted {formatAdmissionDate(admission.created_at)}</p>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-[minmax(0,14rem)_auto] xl:min-w-[23rem]">
                          <div className="space-y-2">
                            <p className="font-accent text-xs uppercase tracking-[0.24em] text-gold-light">Update Status</p>
                            <Select
                              onValueChange={(value: AdmissionStatus): void =>
                                setDraftStatuses((currentStatuses: Record<string, AdmissionStatus>): Record<string, AdmissionStatus> => ({
                                  ...currentStatuses,
                                  [admission.id]: value,
                                }))
                              }
                              value={selectedStatus}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="reviewed">Reviewed</SelectItem>
                                <SelectItem value="accepted">Accepted</SelectItem>
                                <SelectItem value="declined">Declined</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div className="flex items-end">
                            <Button disabled={isSaving || selectedStatus === admission.status} onClick={(): void => void handleStatusSave(admission)}>
                              {isSaving ? "Saving..." : "Save"}
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Email</p>
                          <p className="text-base text-dicon-text">{admission.email}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Phone</p>
                          <p className="text-base text-dicon-text">{admission.phone}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Programme</p>
                          <p className="text-base text-dicon-text">{admission.programme_interest}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">State of Origin</p>
                          <p className="text-base text-dicon-text">{admission.state_of_origin}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Age</p>
                          <p className="text-base text-dicon-text">{admission.age ?? "Not supplied"}</p>
                        </div>
                      </div>

                      <div className="space-y-2 rounded-[1.5rem] border border-dicon-border bg-dicon-card/80 p-4">
                        <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Motivation</p>
                        <p className="whitespace-pre-line text-base leading-relaxed text-dicon-muted">{admission.motivation}</p>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          ) : (
            <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/80 p-8 text-lg leading-relaxed text-dicon-muted">
              No applications match the current search and filter combination.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}