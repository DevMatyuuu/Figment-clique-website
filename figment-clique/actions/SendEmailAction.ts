'use server'

import { POST } from "@/app/api/email/route";
import { Cart, CartOrderData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function SendEmailAction(data: z.infer<typeof formSchema>, orderId: string, cart: Cart[], totalQty: number, total: number) {
  await POST(data, orderId, cart, totalQty, total)
}
