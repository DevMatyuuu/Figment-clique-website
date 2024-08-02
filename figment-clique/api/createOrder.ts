import { formSchema } from "@/validation/form-schema";
import { z } from "zod";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createOrder(values: z.infer<typeof formSchema>) {
  try {
    const order = await prisma.orders.create({
      data: {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        barangay: values.barangay,
        postal_code: values.postalCode,
        city: values.city,
        phone: values.phone, 
      },
    });
    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { message: 'Failed to create order' };
  }
}
