'use server'

import { createOrder } from "@/api/createOrder";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function createOrderAction(values: z.infer<typeof formSchema>) {
  await createOrder(values)
}