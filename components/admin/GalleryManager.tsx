"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { GalleryItemFormInput } from "@/lib/admin-schemas";
import { deleteGalleryItemAction, saveGalleryItemAction } from "@/app/admin/actions";
import AdminField from "@/components/admin/AdminField";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { GALLERY_CATEGORIES, type GalleryCategory, type GalleryItem } from "@/lib/types";

function createEmptyGalleryForm(): GalleryItemFormInput {
  return {
    caption: "",
    category: "events",
    thumbnailUrl: "",
    type: "photo",
    url: "",
  };
}

function createGalleryForm(item: GalleryItem): GalleryItemFormInput {
  return {
    caption: item.caption ?? "",
    category: item.category,
    id: item.id,
    thumbnailUrl: item.thumbnail_url ?? "",
    type: item.type,
    url: item.url,
  };
}

interface GalleryManagerProps {
  galleryItems: GalleryItem[];
}

export default function GalleryManager({ galleryItems }: GalleryManagerProps): ReactElement {
  const router = useRouter();
  const [formValues, setFormValues] = useState<GalleryItemFormInput>(createEmptyGalleryForm());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  function setField<Key extends keyof GalleryItemFormInput>(key: Key, value: GalleryItemFormInput[Key]): void {
    setFormValues((currentValues: GalleryItemFormInput): GalleryItemFormInput => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function startEdit(item: GalleryItem): void {
    setFormValues(createGalleryForm(item));
  }

  function resetForm(): void {
    setFormValues(createEmptyGalleryForm());
  }

  async function handleSubmit(): Promise<void> {
    setIsSaving(true);
    const response = await saveGalleryItemAction(formValues);
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
    if (!window.confirm("Delete this gallery item?")) {
      return;
    }

    setDeletingId(id);
    const response = await deleteGalleryItemAction(id);
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
      <Card className="border-gold/20 bg-[linear-gradient(160deg,rgba(200,168,75,0.12),rgba(7,7,7,0.96))]">
        <CardContent className="flex flex-col gap-6 p-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-4">
            <Badge>Gallery</Badge>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-tight text-dicon-text">Gallery manager.</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                Keep the school&apos;s media library current, organised, and ready for the public gallery experience.
              </p>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5">
            <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Items</p>
            <p className="mt-3 font-display text-4xl text-dicon-text">{galleryItems.length}</p>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Media Library</CardTitle>
            <CardDescription>Review live gallery items, then edit or remove entries from the panel beside it.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {galleryItems.length > 0 ? (
              galleryItems.map((item: GalleryItem): ReactElement => (
                <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5" key={item.id}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-3xl text-dicon-text">{item.caption ?? item.url}</h2>
                        <Badge>{item.type}</Badge>
                        <Badge variant="secondary">{item.category}</Badge>
                      </div>
                      <p className="break-all text-base leading-relaxed text-dicon-muted">{item.url}</p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={(): void => startEdit(item)} type="button" variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button disabled={deletingId === item.id} onClick={(): void => void handleDelete(item.id)} type="button" variant="ghost">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === item.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>

                  {item.thumbnail_url ? (
                    <div className="mt-4">
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Thumbnail</p>
                      <p className="mt-2 break-all text-base text-dicon-text">{item.thumbnail_url}</p>
                    </div>
                  ) : null}
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-6 text-base leading-relaxed text-dicon-muted">
                No gallery items have been created yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{formValues.id ? "Edit Gallery Item" : "Add Gallery Item"}</CardTitle>
            <CardDescription>Choose the media type, category, and public-facing caption before saving the entry.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <AdminField label="Media URL">
              <div className="space-y-3">
                <Input onChange={(event): void => setField("url", event.target.value)} placeholder="https://..." value={formValues.url} />
                <MediaUploadField
                  buttonLabel={formValues.type === "photo" ? "Upload Image" : "Upload Video"}
                  folder={formValues.type === "photo" ? "gallery/photos" : "gallery/videos"}
                  kind={formValues.type === "photo" ? "image" : "video"}
                  maxImageDimension={1920}
                  onThumbnailComplete={
                    formValues.type === "video"
                      ? (url: string): void => {
                          setField("thumbnailUrl", url);
                        }
                      : undefined
                  }
                  onUploadComplete={(url: string): void => setField("url", url)}
                />
              </div>
            </AdminField>

            <AdminField hint="Optional for video entries or when the source URL already exposes a preview image." label="Thumbnail URL">
              <Input onChange={(event): void => setField("thumbnailUrl", event.target.value)} placeholder="https://..." value={formValues.thumbnailUrl} />
            </AdminField>

            <AdminField label="Caption">
              <Textarea onChange={(event): void => setField("caption", event.target.value)} placeholder="Brief public caption for the gallery card." value={formValues.caption} />
            </AdminField>

            <AdminField label="Media Type">
              <div className="flex flex-wrap gap-3">
                {(["photo", "video"] as const).map((type: "photo" | "video"): ReactElement => (
                  <Button key={type} onClick={(): void => setField("type", type)} type="button" variant={formValues.type === type ? "default" : "outline"}>
                    {type}
                  </Button>
                ))}
              </div>
            </AdminField>

            <AdminField label="Category">
              <div className="flex flex-wrap gap-3">
                {GALLERY_CATEGORIES.map((category: GalleryCategory): ReactElement => (
                  <Button key={category} onClick={(): void => setField("category", category)} type="button" variant={formValues.category === category ? "default" : "outline"}>
                    {category}
                  </Button>
                ))}
              </div>
            </AdminField>

            <div className="flex flex-wrap gap-3">
              <Button disabled={isSaving} onClick={(): void => void handleSubmit()} type="button">
                {formValues.id ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {isSaving ? "Saving..." : formValues.id ? "Update Item" : "Create Item"}
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