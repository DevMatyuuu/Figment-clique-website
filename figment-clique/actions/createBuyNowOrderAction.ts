'use server'

import { createBuyNowOrder } from "@/api/createOrder";
import { BuyNowData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function createBuyNowOrderAction(values: z.infer<typeof formSchema>, product: BuyNowData) {
  await createBuyNowOrder(values, product)
}