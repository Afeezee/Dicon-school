import { z } from "zod";

const nigerianPhonePattern: RegExp = /^(?:\+234|0)[789][01]\d{8}$/;

export function calculateAgeFromDateString(dateOfBirth: string): number {
  const birthDate: Date = new Date(dateOfBirth);
  const today: Date = new Date();
  let age: number = today.getFullYear() - birthDate.getFullYear();
  const monthDifference: number = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age -= 1;
  }

  return age;
}

function isValidDate(value: string): boolean {
  return !Number.isNaN(new Date(value).getTime());
}

const admissionFormShape = {
  fullName: z.string().min(2, "Please enter your full name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().regex(nigerianPhonePattern, "Please enter a valid Nigerian phone number."),
  dateOfBirth: z
    .string()
    .refine(isValidDate, "Please enter a valid date of birth.")
    .refine((value: string): boolean => calculateAgeFromDateString(value) >= 16, "Applicants must be at least 16 years old."),
  stateOfOrigin: z.string().min(1, "Please select your state of origin."),
  programmeInterest: z.string().min(1, "Please select a programme."),
  referralSource: z.string().min(1, "Please tell us how you heard about the school."),
  hasExperience: z.enum(["yes", "no"]),
  experienceDescription: z.string().optional(),
  motivation: z.string().min(100, "Please tell us why you want to join in at least 100 characters."),
  careerGoals: z.string().min(50, "Please describe your career goals in at least 50 characters."),
};

const admissionFormBaseSchema = z.object(admissionFormShape);

export const admissionFormSchema = admissionFormBaseSchema.superRefine((value, context): void => {
  if (value.hasExperience === "yes" && (!value.experienceDescription || value.experienceDescription.trim().length < 20)) {
    context.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Please describe your experience in at least 20 characters.",
      path: ["experienceDescription"],
    });
  }
});

export const personalDetailsSchema = admissionFormBaseSchema.pick({
  fullName: true,
  email: true,
  phone: true,
  dateOfBirth: true,
  stateOfOrigin: true,
});

export const programmeSelectionSchema = admissionFormBaseSchema
  .pick({
    programmeInterest: true,
    referralSource: true,
    hasExperience: true,
    experienceDescription: true,
  })
  .superRefine((value, context): void => {
    if (value.hasExperience === "yes" && (!value.experienceDescription || value.experienceDescription.trim().length < 20)) {
      context.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Please describe your experience in at least 20 characters.",
        path: ["experienceDescription"],
      });
    }
  });

export const motivationStepSchema = admissionFormBaseSchema.pick({
  motivation: true,
  careerGoals: true,
});

export type AdmissionFormValues = z.infer<typeof admissionFormSchema>;

export const adminLoginSchema = z.object({
  email: z.string().email("Please enter a valid admin email address."),
  password: z.string().min(8, "Please enter your admin password."),
});

export type AdminLoginValues = z.infer<typeof adminLoginSchema>;

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  message: z.string().min(20, "Please enter a message of at least 20 characters."),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

export interface PublicActionResponse {
  message: string;
  success: boolean;
}