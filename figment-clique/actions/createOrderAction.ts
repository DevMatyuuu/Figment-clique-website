'use server'

import { createOrder } from "@/api/createOrder";
import { CartOrderData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

export async function createOrderAction(values: z.infer<typeof formSchema>, cart: CartOrderData, orderNumber: string) {
    await createOrder(values, cart, orderNumber)
}