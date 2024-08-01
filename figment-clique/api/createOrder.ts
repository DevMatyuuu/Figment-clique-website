import { formSchema } from "@/validation/form-schema";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function createOrder(values: z.infer<typeof formSchema>) {
  try {
    await prisma.orders.create({
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
        address: values.address,
        barangay: values.barangay,
        postal_code: values.postalCode,
        city: values.city,
      },
    });
    return { message: 'Order created successfully' };
  } catch (error) {
    console.error('Error creating order:', error);
    return { message: 'Failed to create order' };
  }
    
}