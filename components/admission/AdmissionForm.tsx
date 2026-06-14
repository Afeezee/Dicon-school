"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2 } from "lucide-react";
import { useState, type ReactElement } from "react";
import { useForm, type FieldPath } from "react-hook-form";
import { toast } from "sonner";
import type { ZodIssue } from "zod";

import { submitAdmissionApplicationAction } from "@/app/actions";
import { PROGRAMME_INTERESTS, REFERRAL_SOURCES } from "@/lib/constants";
import {
  admissionFormSchema,
  motivationStepSchema,
  personalDetailsSchema,
  programmeSelectionSchema,
  type AdmissionFormValues,
} from "@/lib/form-schemas";
import { NIGERIAN_STATES } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import SectionHeader from "@/components/ui/SectionHeader";
import { Textarea } from "@/components/ui/textarea";

const stepTitles: string[] = ["Personal Details", "Programme Selection", "Motivation"];
const experienceOptions: ReadonlyArray<{ label: string; value: AdmissionFormValues["hasExperience"] }> = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

function applyZodIssues(issues: readonly ZodIssue[], setError: ReturnType<typeof useForm<AdmissionFormValues>>["setError"]): void {
  issues.forEach((issue: ZodIssue): void => {
    const fieldName: string | undefined = typeof issue.path[0] === "string" ? issue.path[0] : undefined;

    if (fieldName) {
      setError(fieldName as FieldPath<AdmissionFormValues>, { message: issue.message });
    }
  });
}

function validateStep(step: number, values: AdmissionFormValues): readonly ZodIssue[] {
  const schema = step === 0 ? personalDetailsSchema : step === 1 ? programmeSelectionSchema : motivationStepSchema;
  const result = schema.safeParse(values);

  return result.success ? [] : result.error.issues;
}

export default function AdmissionForm(): ReactElement {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [submittedName, setSubmittedName] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionFormSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      stateOfOrigin: "",
      programmeInterest: "",
      referralSource: "",
      hasExperience: "no",
      experienceDescription: "",
      motivation: "",
      careerGoals: "",
    },
  });

  async function handleNext(): Promise<void> {
    form.clearErrors();
    const issues: readonly ZodIssue[] = validateStep(currentStep, form.getValues());

    if (issues.length > 0) {
      applyZodIssues(issues, form.setError);
      return;
    }

    setCurrentStep((value: number): number => Math.min(value + 1, 2));
  }

  function handlePrevious(): void {
    setCurrentStep((value: number): number => Math.max(value - 1, 0));
  }

  async function onSubmit(values: AdmissionFormValues): Promise<void> {
    form.clearErrors();
    const issues: readonly ZodIssue[] = validateStep(2, values);

    if (issues.length > 0) {
      applyZodIssues(issues, form.setError);
      return;
    }

    setIsSubmitting(true);
    const response = await submitAdmissionApplicationAction(values);
    setIsSubmitting(false);

    if (!response.success) {
      toast.error(response.message);
      return;
    }

    setSubmittedName(values.fullName);
    toast.success("Application received.");
  }

  if (submittedName) {
    return (
      <section className="section-padding pt-8">
        <div className="mx-auto max-w-5xl">
          <Card className="border-gold/35 bg-[linear-gradient(145deg,rgba(200,168,75,0.08),rgba(245,240,232,1))] dark:bg-[linear-gradient(145deg,rgba(200,168,75,0.12),rgba(20,20,20,1))]">
            <CardContent className="flex flex-col items-center gap-5 p-10 text-center">
              <CheckCircle2 className="h-16 w-16 text-gold-light" />
              <CardTitle>Application Received!</CardTitle>
              <CardDescription className="max-w-2xl text-xl">
                Thank you, {submittedName}. We will contact you within 5 working days. Follow @dicon_schoolofpfa on Instagram for updates.
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  return (
    <section className="section-padding pt-8">
      <div className="mx-auto max-w-5xl space-y-8">
        <SectionHeader
          subtitle="Complete the three-step application below to begin your journey into acting, directing, writing, or film production at D'Icon School of Performing Arts."
          tag="Admissions"
          title="Begin Your *Application*"
        />

        <Card className="border-gold/25 bg-[linear-gradient(145deg,rgba(200,168,75,0.06),rgba(245,240,232,0.95))] dark:bg-[linear-gradient(145deg,rgba(200,168,75,0.08),rgba(20,20,20,0.9))]">
          <CardContent className="p-6 md:p-8 space-y-6">
            <div className="text-center space-y-2">
              <h3 className="font-display text-2xl md:text-3xl text-gold-light">Welcome to D&apos;Icon School of Performing Arts</h3>
              <p className="text-dicon-muted text-base italic">Where we grow with love, learn with peace, and perform with purpose.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] dark:bg-black/40 p-4 text-center space-y-1">
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-gold">School Fees (Standard)</p>
                <p className="font-display text-2xl text-dicon-text">{"₦"}400,000</p>
              </div>
              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] dark:bg-black/40 p-4 text-center space-y-1">
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-gold">VIP Package</p>
                <p className="font-display text-2xl text-dicon-text">{"₦"}600,000</p>
              </div>
              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] dark:bg-black/40 p-4 text-center space-y-1">
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-gold">Duration</p>
                <p className="font-display text-2xl text-dicon-text">2 Years</p>
              </div>
              <div className="rounded-xl border border-gold/15 bg-gold/[0.06] dark:bg-black/40 p-4 text-center space-y-1">
                <p className="font-accent text-xs uppercase tracking-[0.2em] text-gold">Rehearsals</p>
                <p className="font-display text-2xl text-dicon-text">Once a Month</p>
              </div>
            </div>

            <div className="space-y-3 rounded-xl border border-gold/10 bg-gold/[0.04] dark:bg-black/30 p-4 md:p-5">
              <h4 className="font-accent text-sm uppercase tracking-[0.2em] text-gold">Payment Plan</h4>
              <p className="text-sm leading-relaxed text-dicon-muted">
                You can pay in two installments, but a minimum of <span className="text-dicon-text font-medium">70%</span> must be paid upfront if you&apos;re not paying in full.
              </p>
              <div className="border-t border-gold/10 pt-3">
                <h4 className="font-accent text-sm uppercase tracking-[0.2em] text-gold mb-1">VIP Student Package</h4>
                <p className="text-sm leading-relaxed text-dicon-muted">
                  The difference between VIP and standard students will be explained directly by the CEO, Ibrahim Yekini Bakare.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-4">
                <CardTitle>{stepTitles[currentStep]}</CardTitle>
                <span className="font-accent text-sm uppercase tracking-[0.24em] text-gold-light">Step {currentStep + 1} of 3</span>
              </div>
              <div className="grid grid-cols-3 gap-3">
                {stepTitles.map((title: string, index: number): ReactElement => (
                  <div className="space-y-2" key={title}>
                    <div className={`h-2 rounded-full ${index <= currentStep ? "bg-gold" : "bg-dicon-surface"}`} />
                    <p className={`text-xs uppercase tracking-[0.18em] ${index === currentStep ? "text-gold-light" : "text-dicon-muted"}`}>{title}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
                {currentStep === 0 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="fullName"
                      render={({ field }): ReactElement => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter your full name" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="you@example.com" type="email" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <Input placeholder="+2348012345678" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="dateOfBirth"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Date of Birth</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stateOfOrigin"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>State of Origin</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a state" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {NIGERIAN_STATES.map((state: string): ReactElement => (
                                <SelectItem key={state} value={state}>
                                  {state}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                {currentStep === 1 ? (
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="programmeInterest"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Programme Interest</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose a programme" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {PROGRAMME_INTERESTS.map((programme: string): ReactElement => (
                                <SelectItem key={programme} value={programme}>
                                  {programme}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="referralSource"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>How did you hear about us?</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Choose one option" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {REFERRAL_SOURCES.map((source: string): ReactElement => (
                                <SelectItem key={source} value={source}>
                                  {source}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="hasExperience"
                      render={({ field }): ReactElement => (
                        <FormItem className="md:col-span-2">
                          <FormLabel>Prior acting or filmmaking experience?</FormLabel>
                          <FormControl>
                            <RadioGroup className="grid gap-4 md:grid-cols-2" onValueChange={field.onChange} value={field.value}>
                              {experienceOptions.map((option: { label: string; value: AdmissionFormValues["hasExperience"] }): ReactElement => (
                                <label className="flex items-center gap-3 rounded-2xl border border-dicon-border bg-dicon-surface px-4 py-3 text-dicon-text" key={option.value}>
                                  <RadioGroupItem value={option.value} />
                                  <span>{option.label}</span>
                                </label>
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {form.watch("hasExperience") === "yes" ? (
                      <FormField
                        control={form.control}
                        name="experienceDescription"
                        render={({ field }): ReactElement => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>If Yes, describe your experience</FormLabel>
                            <FormControl>
                              <Textarea placeholder="Tell us about your acting, writing, directing, or production background." {...field} value={field.value ?? ""} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    ) : null}
                  </div>
                ) : null}

                {currentStep === 2 ? (
                  <div className="grid gap-6">
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Why join Dicon School?</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Tell us why you want to train at D'Icon School of Performing Arts." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="careerGoals"
                      render={({ field }): ReactElement => (
                        <FormItem>
                          <FormLabel>Career goals in Nollywood</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Describe the kind of actor, writer, director, or producer you want to become." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                ) : null}

                <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
                  <Button disabled={currentStep === 0 || isSubmitting} onClick={handlePrevious} type="button" variant="outline">
                    Previous
                  </Button>

                  {currentStep < 2 ? (
                    <Button disabled={isSubmitting} onClick={(): void => void handleNext()} type="button">
                      Next
                    </Button>
                  ) : (
                    <Button disabled={isSubmitting} type="submit">
                      {isSubmitting ? "Submitting..." : "Submit Application"}
                    </Button>
                  )}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}