import { BuyNowData, CartOrderData } from "@/types";
import { formSchema } from "@/validation/form-schema";
import { PrismaClient } from "@prisma/client";
import ShortUniqueId from "short-unique-id";
import { z } from "zod";

const prisma = new PrismaClient();

export async function createOrder(values: z.infer<typeof formSchema>, cart: CartOrderData, orderId: string) {
  try {
    
    const productsData = cart.title.map((_, index) => ({
      title: cart.title[index],
      quantity: cart.quantity[index],
      price: cart.price[index],
      size: cart.size[index],
    }));


    const order = await prisma.orders.create({
      data: {
        order_id: orderId, 
        country: values.country,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        barangay: values.barangay,
        postal_code: values.postalCode,
        city: values.city,
        phone: values.phone,
        products: productsData
      },
    });
    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { message: 'Failed to create order' };
  }
}

export async function createBuyNowOrder(values: z.infer<typeof formSchema>, product: BuyNowData, orderId: string) {
  try {

    const productsData = {
      title: product.title,
      quantity: product.quantity,
      price: product.price,
      size: product.size,
    };


    const order = await prisma.orders.create({
      data: {
        order_id: orderId, 
        country: values.country,
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        address: values.address,
        barangay: values.barangay,
        postal_code: values.postalCode,
        city: values.city,
        phone: values.phone,
        products: [
          productsData
        ],
      },
    });
    return { order };
  } catch (error) {
    console.error('Error creating order:', error);
    return { message: 'Failed to create order' };
  }
}
