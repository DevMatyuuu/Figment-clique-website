import { z } from "zod";

export const formSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  address: z.string().min(10).max(50),
  barangay: z.string().min(2).max(20),
  postalCode: z.string().min(4).max(4),
  city: z.string().min(5).max(15),
  phone: z.string().min(11).max(11),
})