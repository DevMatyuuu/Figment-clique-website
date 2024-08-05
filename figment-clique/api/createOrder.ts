import { CartOrderData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { PrismaClient } from "@prisma/client";
import { z } from "zod";

const prisma = new PrismaClient();

export async function createOrder(values: z.infer<typeof formSchema>, cart: CartOrderData) {

  try {
    const productCount = cart.title.length;
      if (productCount !== cart.quantity.length || 
        productCount !== cart.price.length || 
        productCount !== cart.size.length) {
      throw new Error('Mismatched array lengths in searchParams');
    }

    const productsData = cart.title.map((_, index) => ({
      title: cart.title[index],
      quantity: cart.quantity[index],
      price: cart.price[index],
      size: cart.size[index],
    }));


    const order = await prisma.orders.create({
      data: {
        country: values.country,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        barangay: values.barangay,
        postal_code: values.postalCode,
        city: values.city,
        phone: values.phone,
        products: productsData.map(item => item.title)
      },
    });
    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { message: 'Failed to create order' };
  }
}
