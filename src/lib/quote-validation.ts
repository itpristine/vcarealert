import { z } from "zod";

export const usStates = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
] as const;

const allowedGenders: readonly string[] = ["Male", "Female", "Other"];
const allowedStates: readonly string[] = [...usStates.map(({ code }) => code), "OTHER"];
const allowedDevices: readonly string[] = ["Home System", "Mobile System", "Smartwatch", "Business Leads"];
const quoteProducts: readonly string[] = ["Home System", "Mobile System", "Smartwatch"];
const yesNoAnswers: readonly string[] = ["Yes", "No"];
const allowedReferralSources: readonly string[] = [
  "Google Search",
  "Facebook/Social Media",
  "TV Commercial",
  "Friend/Family",
  "Healthcare Provider",
];

export function sanitizeQuoteEmailInput(value: string) {
  const filtered = value.replace(/[^A-Za-z0-9._%+-@]/g, "");
  const atIndex = filtered.indexOf("@");
  return atIndex === -1
    ? filtered
    : `${filtered.slice(0, atIndex + 1)}${filtered.slice(atIndex + 1).replace(/@/g, "")}`;
}

export const quoteFormSchema = z.object({
  firstName: z.string().trim().min(2, "Enter a first name with at least 2 characters.").max(80, "First name must be 80 characters or fewer."),
  lastName: z.string().trim().min(2, "Enter a last name with at least 2 characters.").max(80, "Last name must be 80 characters or fewer."),
  age: z.string()
    .trim()
    .regex(/^(?:[1-9]\d?|1[01]\d|120)$/, "Enter a whole-number age between 1 and 120."),
  gender: z.string().min(1, "Please select a gender.")
    .refine((value) => allowedGenders.includes(value), "Please select a valid gender."),
  phoneNumber: z.string()
    .trim()
    .refine((value) => {
      if (!/^[+\d\s().-]+$/.test(value)) return false;
      const digits = value.replace(/\D/g, "");
      return /^(?:1)?[2-9]\d{2}[2-9]\d{6}$/.test(digits);
    }, "Enter a valid 10-digit US phone number."),
  emailAddress: z.string()
    .trim()
    .email("Enter a valid email address.")
    .regex(/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+$/, "Use only letters, numbers, and common email characters (., _, %, +, -).")
    .max(254, "Email address must be 254 characters or fewer."),
  streetAddress: z.string().trim().min(5, "Enter a valid street address.").max(200, "Street address must be 200 characters or fewer."),
  city: z.string().trim().min(2, "Enter a city with at least 2 characters.").max(100, "City must be 100 characters or fewer."),
  state: z.string().min(1, "Please select a state.")
    .refine((value) => allowedStates.includes(value), "Please select a valid state."),
  zipCode: z.string()
    .trim()
    .regex(/^\d{5}(?:-\d{4})?$/, "Enter a valid ZIP code (12345 or 12345-6789)."),
  device: z.string().min(1, "Please select a device.")
    .refine((value) => allowedDevices.includes(value), "Please select a valid device."),
  mobilityIssues: z.string().min(1, "Please answer whether there are mobility issues.")
    .refine((value) => yesNoAnswers.includes(value), "Please select a valid answer."),
  searchingForDevice: z.string().min(1, "Please answer whether you are searching for a medical alert device.")
    .refine((value) => yesNoAnswers.includes(value), "Please select a valid answer."),
  heardAboutUs: z.string().min(1, "Please select how you heard about us.")
    .refine((value) => allowedReferralSources.includes(value), "Please select a valid referral source."),
  comments: z.string().trim().max(2000, "Comments must be 2,000 characters or fewer.").optional(),
});

export const quoteSubmissionSchema = quoteFormSchema
  .extend({
    pageUrl: z.string().url("Invalid page URL.").max(2048).optional(),
    recaptchaToken: z.string().max(4096).optional(),
  })
  .refine((data) => quoteProducts.includes(data.device), {
    path: ["device"],
    message: "Business lead requests must use the lead generation quote form.",
  });

export type QuoteFormData = z.infer<typeof quoteFormSchema>;
