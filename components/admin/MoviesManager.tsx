"use client";

import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import type { MovieFormInput } from "@/lib/admin-schemas";
import { deleteMovieAction, saveMovieAction } from "@/app/admin/actions";
import AdminField from "@/components/admin/AdminField";
import MediaUploadField from "@/components/admin/MediaUploadField";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MOVIE_PLATFORMS, MOVIE_ROLES, type Movie, type MoviePlatform, type MovieRole } from "@/lib/types";

function createEmptyMovieForm(): MovieFormInput {
  return {
    description: "",
    genre: "",
    isFeatured: false,
    platform: "",
    posterUrl: "",
    role: ["Actor"],
    title: "",
    year: "",
    youtubeTrailerId: "",
  };
}

function createMovieForm(movie: Movie): MovieFormInput {
  return {
    description: movie.description ?? "",
    genre: movie.genre ?? "",
    id: movie.id,
    isFeatured: movie.is_featured,
    platform: movie.platform ?? "",
    posterUrl: movie.poster_url ?? "",
    role: movie.role,
    title: movie.title,
    year: movie.year?.toString() ?? "",
    youtubeTrailerId: movie.youtube_trailer_id ?? "",
  };
}

interface MoviesManagerProps {
  movies: Movie[];
}

export default function MoviesManager({ movies }: MoviesManagerProps): ReactElement {
  const router = useRouter();
  const [formValues, setFormValues] = useState<MovieFormInput>(createEmptyMovieForm());
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const featuredCount: number = movies.filter((movie: Movie): boolean => movie.is_featured).length;

  function setField<Key extends keyof MovieFormInput>(key: Key, value: MovieFormInput[Key]): void {
    setFormValues((currentValues: MovieFormInput): MovieFormInput => ({
      ...currentValues,
      [key]: value,
    }));
  }

  function toggleRole(role: MovieRole): void {
    setFormValues((currentValues: MovieFormInput): MovieFormInput => {
      const nextRoles: MovieRole[] = currentValues.role.includes(role)
        ? currentValues.role.filter((currentRole: MovieRole): boolean => currentRole !== role)
        : [...currentValues.role, role];

      return {
        ...currentValues,
        role: nextRoles.length > 0 ? nextRoles : [role],
      };
    });
  }

  function startEdit(movie: Movie): void {
    setFormValues(createMovieForm(movie));
  }

  function resetForm(): void {
    setFormValues(createEmptyMovieForm());
  }

  async function handleSubmit(): Promise<void> {
    setIsSaving(true);
    const response = await saveMovieAction(formValues);
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
    if (!window.confirm("Delete this movie from the filmography?")) {
      return;
    }

    setDeletingId(id);
    const response = await deleteMovieAction(id);
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
            <Badge>Movies</Badge>
            <div className="space-y-3">
              <h1 className="font-display text-5xl leading-tight text-dicon-text">Filmography editor.</h1>
              <p className="max-w-3xl text-lg leading-relaxed text-dicon-muted">
                Create, update, and retire movie entries from the live catalogue without leaving the admin area.
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5">
              <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Titles</p>
              <p className="mt-3 font-display text-4xl text-dicon-text">{movies.length}</p>
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
            <CardTitle>Live Catalogue</CardTitle>
            <CardDescription>Edit existing movie records or start a new entry from the editor panel.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {movies.length > 0 ? (
              movies.map((movie: Movie): ReactElement => (
                <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-5" key={movie.id}>
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-3">
                      <div className="flex flex-wrap items-center gap-3">
                        <h2 className="font-display text-3xl text-dicon-text">{movie.title}</h2>
                        {movie.is_featured ? <Badge>Featured</Badge> : null}
                        {movie.platform ? <Badge variant="secondary">{movie.platform}</Badge> : null}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {movie.role.map((role: MovieRole): ReactElement => (
                          <Badge key={`${movie.id}-${role}`} variant="outline">
                            {role}
                          </Badge>
                        ))}
                      </div>
                      <p className="text-base leading-relaxed text-dicon-muted">
                        {movie.description ?? "No synopsis added yet."}
                      </p>
                    </div>

                    <div className="flex gap-3">
                      <Button onClick={(): void => startEdit(movie)} type="button" variant="outline">
                        <Pencil className="mr-2 h-4 w-4" />
                        Edit
                      </Button>
                      <Button disabled={deletingId === movie.id} onClick={(): void => void handleDelete(movie.id)} type="button" variant="ghost">
                        <Trash2 className="mr-2 h-4 w-4" />
                        {deletingId === movie.id ? "Deleting..." : "Delete"}
                      </Button>
                    </div>
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-3">
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Release year</p>
                      <p className="mt-2 text-base text-dicon-text">{movie.year ?? "Not set"}</p>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Genre</p>
                      <p className="mt-2 text-base text-dicon-text">{movie.genre ?? "Not set"}</p>
                    </div>
                    <div>
                      <p className="font-accent text-xs uppercase tracking-[0.22em] text-gold-light">Trailer</p>
                      <p className="mt-2 text-base text-dicon-text">{movie.youtube_trailer_id ?? "Not set"}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 p-6 text-base leading-relaxed text-dicon-muted">
                No movies have been created yet.
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>{formValues.id ? "Edit Movie" : "Add Movie"}</CardTitle>
            <CardDescription>Use the form below to publish a new title or revise an existing record.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <AdminField label="Title">
              <Input onChange={(event): void => setField("title", event.target.value)} placeholder="Koleoso" value={formValues.title} />
            </AdminField>

            <div className="grid gap-5 sm:grid-cols-2">
              <AdminField label="Release Year">
                <Input onChange={(event): void => setField("year", event.target.value)} placeholder="2025" value={formValues.year} />
              </AdminField>

              <AdminField label="Genre">
                <Input onChange={(event): void => setField("genre", event.target.value)} placeholder="Supernatural / Drama" value={formValues.genre} />
              </AdminField>
            </div>

            <AdminField label="Description">
              <Textarea onChange={(event): void => setField("description", event.target.value)} placeholder="Short summary for the public site." value={formValues.description} />
            </AdminField>

            <AdminField hint="Leave blank if the public card should fall back to trailer thumbnails or text-only presentation." label="Poster URL">
              <div className="space-y-3">
                <Input onChange={(event): void => setField("posterUrl", event.target.value)} placeholder="https://..." value={formValues.posterUrl} />
                <MediaUploadField
                  buttonLabel="Upload Poster"
                  folder="movies/posters"
                  kind="image"
                  maxImageDimension={1800}
                  onUploadComplete={(url: string): void => setField("posterUrl", url)}
                />
              </div>
            </AdminField>

            <AdminField hint="Store the raw YouTube video ID only." label="YouTube Trailer ID">
              <Input onChange={(event): void => setField("youtubeTrailerId", event.target.value)} placeholder="tWRZyt1tsas" value={formValues.youtubeTrailerId} />
            </AdminField>

            <AdminField label="Platform">
              <div className="flex flex-wrap gap-3">
                {MOVIE_PLATFORMS.map((platform: MoviePlatform): ReactElement => (
                  <Button
                    key={platform}
                    onClick={(): void => setField("platform", formValues.platform === platform ? "" : platform)}
                    type="button"
                    variant={formValues.platform === platform ? "default" : "outline"}
                  >
                    {platform}
                  </Button>
                ))}
              </div>
            </AdminField>

            <AdminField label="Creative Roles">
              <div className="flex flex-wrap gap-3">
                {MOVIE_ROLES.map((role: MovieRole): ReactElement => (
                  <Button key={role} onClick={(): void => toggleRole(role)} type="button" variant={formValues.role.includes(role) ? "default" : "outline"}>
                    {role}
                  </Button>
                ))}
              </div>
            </AdminField>

            <label className="flex items-center gap-3 rounded-[1.5rem] border border-dicon-border bg-dicon-surface/70 px-4 py-4">
              <input checked={formValues.isFeatured} onChange={(event): void => setField("isFeatured", event.target.checked)} type="checkbox" />
              <span className="text-base text-dicon-text">Feature this movie on the public site</span>
            </label>

            <div className="flex flex-wrap gap-3">
              <Button disabled={isSaving} onClick={(): void => void handleSubmit()} type="button">
                {formValues.id ? <Pencil className="mr-2 h-4 w-4" /> : <Plus className="mr-2 h-4 w-4" />}
                {isSaving ? "Saving..." : formValues.id ? "Update Movie" : "Create Movie"}
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