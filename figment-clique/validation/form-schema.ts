import { z } from "zod";

export const formSchema = z.object({
  country: z.string().min(1, { message: "Please select a country" }),

  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters" })
    .max(20, { message: "First name cannot be longer than 20 characters" })
    .min(1, { message: "First name is required" }),

  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters" })
    .max(20, { message: "Last name cannot be longer than 20 characters" })
    .min(1, { message: "Last name is required" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .min(1, { message: "Email is required" }),

  address: z
    .string()
    .min(10, { message: "Address must be at least 10 characters" })
    .max(50, { message: "Address cannot be longer than 50 characters" })
    .min(1, { message: "Address is required" }),

  barangay: z
    .string()
    .min(2, { message: "Barangay name must be at least 2 characters" })
    .max(20, { message: "Barangay name cannot be longer than 20 characters" })
    .min(1, { message: "Barangay is required" }),

  postalCode: z
    .string()
    .length(4, { message: "Postal code must be exactly 4 digits" })
    .min(1, { message: "Postal code is required" }),

  city: z
    .string()
    .min(5, { message: "City name must be at least 5 characters" })
    .max(15, { message: "City name cannot be longer than 15 characters" })
    .min(1, { message: "City name is required" }),

  phone: z
    .string()
    .length(11, { message: "Phone number must be exactly 11 digits" })
    .min(1, { message: "Phone number is required" }),
});
