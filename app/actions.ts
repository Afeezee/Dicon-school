"use server";

import { admissionFormSchema, calculateAgeFromDateString, contactFormSchema, type AdmissionFormValues, type ContactFormValues, type PublicActionResponse } from "@/lib/form-schemas";
import { submitAdmission, submitMessage } from "@/lib/supabase/queries";
import { hasSupabaseEnv } from "@/lib/utils";

export async function submitAdmissionApplicationAction(values: AdmissionFormValues): Promise<PublicActionResponse> {
  const validation = admissionFormSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      message: "The application details are not valid. Please review the form and try again.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The admissions backend is not configured yet. Add the Supabase environment variables before accepting applications.",
    };
  }

  const age: number = calculateAgeFromDateString(validation.data.dateOfBirth);
  const motivation: string = [
    `Why join Dicon School:\n${validation.data.motivation}`,
    `Career goals in Nollywood:\n${validation.data.careerGoals}`,
    `How the applicant heard about the school: ${validation.data.referralSource}`,
    `Prior experience: ${validation.data.hasExperience === "yes" ? validation.data.experienceDescription ?? "Yes" : "No"}`,
  ].join("\n\n");

  try {
    await submitAdmission({
      full_name: validation.data.fullName,
      email: validation.data.email,
      phone: validation.data.phone,
      state_of_origin: validation.data.stateOfOrigin,
      age,
      programme_interest: validation.data.programmeInterest,
      motivation,
    });

    return {
      success: true,
      message: `Thank you, ${validation.data.fullName}. We will contact you within 5 working days.`,
    };
  } catch {
    return {
      success: false,
      message: "We could not submit the application at the moment. Please try again shortly.",
    };
  }
}

export async function submitEnquiryAction(values: ContactFormValues): Promise<PublicActionResponse> {
  const validation = contactFormSchema.safeParse(values);

  if (!validation.success) {
    return {
      success: false,
      message: "The enquiry details are not valid. Please review the form and try again.",
    };
  }

  if (!hasSupabaseEnv()) {
    return {
      success: false,
      message: "The enquiry backend is not configured yet. Add the Supabase environment variables before using the contact form.",
    };
  }

  try {
    await submitMessage({
      full_name: validation.data.name,
      email: validation.data.email,
      message: validation.data.message,
    });

    return {
      success: true,
      message: "Message sent! We'll be in touch soon.",
    };
  } catch {
    return {
      success: false,
      message: "We could not send the message at the moment. Please try again shortly.",
    };
  }
}