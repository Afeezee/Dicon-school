"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { AlumniFormInput } from "@/lib/admin-schemas";
import { deleteAlumniAction, saveAlumniAction } from "@/app/admin/actions";
import AdminField from "@/components/admin/AdminField";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { Alumni } from "@/lib/types";

function createEmptyAlumniForm(): AlumniFormInput {
  return {
    avatarUrl: "",
    bio: "",
    currentRole: "",
    fullName: "",
    graduationYear: "",
    isFeatured: false,
    socialInstagram: "",
    stageName: "",
  };
}

function createAlumniForm(alumnus: Alumni): AlumniFormInput {
  return {
    avatarUrl: alumnus.avatar_url ?? "",
    bio: alumnus.bio,
    currentRole: alumnus.current_role,
    fullName: alumnus.full_name,
    graduationYear: alumnus.graduation_year?.toString() ?? "",
    id: alumnus.id,
    isFeatured: alumnus.is_featured,
    socialInstagram: alumnus.social_instagram ?? "",
    stageName: alumnus.stage_name ?? "",
  };
}

interface AlumniManagerProps {
  alumni: Alumni[];
}

export default function AlumniManager({ alumni }: AlumniManagerProps): ReactElement {
  const router = useRouter();
  const [formValues, setFormValues] = useState<AlumniFormInput>(createEmptyAlumniForm());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const featuredCount: number = alumni.filter((entry: Alumni): boolean => entry.is_featured).length;

  function setField<Key extends keyof AlumniFormInput>(key: Key, value: AlumniFormInput[Key]): void {
    setFormValues((currentValues: AlumniFormInput): AlumniFormInput => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function startEdit(alumnus: Alumni): void {
    setFormValues(createAlumniForm(alumnus));
  }

  function resetForm(): void {
    setFormValues(createEmptyAlumniForm());
  }

  async function handleSubmit(): Promise<void> {
    setIsSaving(true);
    const response = await saveAlumniAction(formValues);
    setIsSaving(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    toast.success(response.message);
    resetForm();
    router.refresh();
  }

  async function handleDelete(id: string): Promise<void> {
    if (!window.confirm("Delete this alumni profile?")) {
      return;
    }

    setDeletingId(id);
    const response = await deleteAlumniAction(id);
    setDeletingId(null);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    if (formValues.id === id) {
      resetForm();
    }

    toast.success(response.message);
    router.refresh();
  }

  return (
    <div className="space-y-8">
      <Card className="border-gold/20 admin-hero">
        <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge>Alumni</Badge>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-tight text-dicon-text">Alumni profiles.</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                Maintain the school&apos;s graduate and apprentice spotlight pages with direct profile editing and featured selection.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5">
              <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Profiles</p>
              <p className="mt-3 font-display text-4xl text-dicon-text">{alumni.length}</p>
            </div>
            <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5">
              <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Featured</p>
              <p className="mt-3 font-display text-4xl text-dicon-text">{featuredCount}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Profile List</CardTitle>
            <CardDescription>Edit existing alumni records or create a new profile from the editor panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alumni.length > 0 ? (
              alumni.map((alumnus: Alumni): ReactElement => (
                <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5" key={alumnus.id}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-3xl text-dicon-text">{alumnus.stage_name ?? alumnus.full_name}</h2>
                        {alumnus.is_featured ? <Badge>Featured</Badge> : null}
                      </div>
                      <p className="text-base text-dicon-muted">{alumnus.full_name}</p>
                      <p className="text-base leading-relaxed text-dicon-muted">{alumnus.bio}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={(): void => startEdit(alumnus)} type="button" variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button disabled={deletingId === alumnus.id} onClick={(): void => void handleDelete(alumnus.id)} type="button" variant="ghost">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === alumnus.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Current role</p>
                      <p className="mt-2 text-base text-dicon-text">{alumnus.current_role}</p>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Graduation year</p>
                      <p className="mt-2 text-base text-dicon-text">{alumnus.graduation_year ?? "Not set"}</p>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Instagram</p>
                      <p className="mt-2 text-base text-dicon-text">{alumnus.social_instagram ?? "Not set"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-6 text-base leading-relaxed text-dicon-muted">
                No alumni profiles have been created yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{formValues.id ? "Edit Profile" : "Add Profile"}</CardTitle>
            <CardDescription>Populate the public alumni profile fields and decide whether this record should be featured.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <AdminField label="Full Name">
              <Input onChange={(event): void => setField("fullName", event.target.value)} placeholder="Ariyo Oluwakemisola Apesin" value={formValues.fullName} />
            </AdminField>

            <div className="grid gap-5 sm:grid-cols-2">
              <AdminField label="Stage Name">
                <Input onChange={(event): void => setField("stageName", event.target.value)} placeholder="Kemity" value={formValues.stageName} />
              </AdminField>
              <AdminField label="Graduation Year">
                <Input onChange={(event): void => setField("graduationYear", event.target.value)} placeholder="2025" value={formValues.graduationYear} />
              </AdminField>
            </div>

            <AdminField label="Current Role">
              <Input onChange={(event): void => setField("currentRole", event.target.value)} placeholder="Actress, Filmmaker" value={formValues.currentRole} />
            </AdminField>

            <AdminField label="Bio">
              <Textarea onChange={(event): void => setField("bio", event.target.value)} placeholder="Write the alumni story and public profile summary." value={formValues.bio} />
            </AdminField>

            <AdminField label="Avatar URL">
              <div className="space-y-3">
                <Input onChange={(event): void => setField("avatarUrl", event.target.value)} placeholder="https://..." value={formValues.avatarUrl} />
                <MediaUploadField
                  buttonLabel="Upload Avatar"
                  folder="alumni/avatars"
                  kind="image"
                  maxImageDimension={1200}
                  onUploadComplete={(url: string): void => setField("avatarUrl", url)}
                />
              </div>
            </AdminField>

            <AdminField label="Instagram Handle">
              <Input onChange={(event): void => setField("socialInstagram", event.target.value)} placeholder="@kemity" value={formValues.socialInstagram} />
            </AdminField>

            <label className="flex items-center gap-3 rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 px-4 py-4">
              <input checked={formValues.isFeatured} onChange={(event): void => setField("isFeatured", event.target.checked)} type="checkbox" />
              <span className="text-base text-dicon-text">Feature this alumni profile on the public site</span>
            </label>

            <div className="flex flex-wrap gap-3">
              <Button disabled={isSaving} onClick={(): void => void handleSubmit()} type="button">
                {formValues.id ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {isSaving ? "Saving..." : formValues.id ? "Update Profile" : "Create Profile"}
              </Button>
              <Button onClick={resetForm} type="button" variant="outline">
                Reset Form
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}