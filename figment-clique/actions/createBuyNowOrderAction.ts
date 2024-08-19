'use server'

import { createBuyNowOrder } from "@/app/api/createOrder";
import { BuyNowData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function createBuyNowOrderAction(values: z.infer<typeof formSchema>, product: BuyNowData, orderId: string) {
  await createBuyNowOrder(values, product, orderId)
}