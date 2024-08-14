'use server'

import { GET } from "@/app/api/email/route";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function SendEmailAction(data: z.infer<typeof formSchema>, orderId: string) {
  await GET(data, orderId)
}
