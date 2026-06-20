"use client";

import { Save } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { SiteSettingsFormInput } from "@/lib/admin-schemas";
import { saveSiteSettingsAction } from "@/app/admin/actions";
import AdminField from "@/components/admin/AdminField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import type { SiteSettings } from "@/lib/types";

function createSettingsForm(settings: SiteSettings): SiteSettingsFormInput {
  return {
    admissionsOpen: settings.admissions_open,
    contactEmail: settings.contact_email,
    heroCtaPrimary: settings.hero_cta_primary,
    heroCtaSecondary: settings.hero_cta_secondary,
    ownerInstagram: settings.owner_instagram,
    ownerName: settings.owner_name,
    schoolInstagram: settings.school_instagram,
    schoolName: settings.school_name,
    schoolTagline: settings.school_tagline,
    youtubeChannel: settings.youtube_channel,
  };
}

interface SettingsManagerProps {
  settings: SiteSettings;
}

export default function SettingsManager({ settings }: SettingsManagerProps): ReactElement {
  const router = useRouter();
  const [formValues, setFormValues] = useState<SiteSettingsFormInput>(createSettingsForm(settings));
  const [isSaving, setIsSaving] = useState<boolean>(false);

  useEffect((): void => {
    setFormValues(createSettingsForm(settings));
  }, [settings]);

  function setField<Key extends keyof SiteSettingsFormInput>(key: Key, value: SiteSettingsFormInput[Key]): void {
    setFormValues((currentValues: SiteSettingsFormInput): SiteSettingsFormInput => ({
      ...currentValues,
      [key]: value,
    }));
  }

  async function handleSave(): Promise<void> {
    setIsSaving(true);
    const response = await saveSiteSettingsAction(formValues);
    setIsSaving(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <Card className="border-gold/20 admin-hero">
        <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge>Settings</Badge>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-tight text-dicon-text">Site content settings.</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                Update the core site labels, home-page CTA copy, and admissions state from one admin panel.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5">
            <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Live mode</p>
            <p className="mt-3 font-display text-4xl text-dicon-text">{formValues.admissionsOpen === "true" ? "Open" : "Closed"}</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Editable Content</CardTitle>
          <CardDescription>These values feed the public site content layer and can be revised without code changes.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-5 lg:grid-cols-2">
          <AdminField label="School Name">
            <Input onChange={(event): void => setField("schoolName", event.target.value)} value={formValues.schoolName} />
          </AdminField>

          <AdminField label="School Tagline">
            <Input onChange={(event): void => setField("schoolTagline", event.target.value)} value={formValues.schoolTagline} />
          </AdminField>

          <AdminField label="School Instagram">
            <Input onChange={(event): void => setField("schoolInstagram", event.target.value)} value={formValues.schoolInstagram} />
          </AdminField>

          <AdminField label="Owner Name">
            <Input onChange={(event): void => setField("ownerName", event.target.value)} value={formValues.ownerName} />
          </AdminField>

          <AdminField label="Owner Instagram">
            <Input onChange={(event): void => setField("ownerInstagram", event.target.value)} value={formValues.ownerInstagram} />
          </AdminField>

          <AdminField label="Contact Email">
            <Input onChange={(event): void => setField("contactEmail", event.target.value)} type="email" value={formValues.contactEmail} />
          </AdminField>

          <AdminField label="Primary Hero CTA">
            <Input onChange={(event): void => setField("heroCtaPrimary", event.target.value)} value={formValues.heroCtaPrimary} />
          </AdminField>

          <AdminField label="Secondary Hero CTA">
            <Input onChange={(event): void => setField("heroCtaSecondary", event.target.value)} value={formValues.heroCtaSecondary} />
          </AdminField>

          <AdminField label="YouTube Channel Label">
            <Input onChange={(event): void => setField("youtubeChannel", event.target.value)} value={formValues.youtubeChannel} />
          </AdminField>

          <AdminField label="Admissions Status">
            <div className="flex flex-wrap gap-3">
              {(["true", "false"] as const).map((value: "true" | "false"): ReactElement => (
                <Button
                  key={value}
                  onClick={(): void => setField("admissionsOpen", value)}
                  type="button"
                  variant={formValues.admissionsOpen === value ? "default" : "outline"}
                >
                  {value === "true" ? "Admissions Open" : "Admissions Closed"}
                </Button>
              ))}
            </div>
          </AdminField>

          <div className="lg:col-span-2">
            <Button disabled={isSaving} onClick={(): void => void handleSave()} type="button">
              <Save className="mr-2 h-4 w-4" />
              {isSaving ? "Saving..." : "Save Site Settings"}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}