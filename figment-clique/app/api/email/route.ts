import { NextResponse } from "next/server";
import Receipt from "@/emails/Receipt";
import { Resend } from 'resend'
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";
import { Cart, CartOrderData } from "@/types";


const resend = new Resend(process.env.EMAIL_KEY)

export async function POST(data: z.infer<typeof formSchema>, orderId: string, cart: Cart[], totalQty: number, total: number ) {
  const orderData = formSchema.safeParse(data)

  if (orderData.success) {
    const { firstName, lastName, address, email} = orderData.data
    try {
      const data  = await resend.batch.send([
        {
        from: 'email@figmentclique.store',
        to: email,
        subject: 'FIGMENT CLIQUE RECEIPT',
        react: Receipt({firstName, lastName, address, orderId, cart, totalQty, total})
      },
      {
        from: 'email@figmentclique.store',
        to: 'matthewsantos120216@gmail.com',
        subject: 'FIGMENT CLIQUE RECEIPT',
        react: Receipt({firstName, lastName, address, orderId, cart, totalQty, total})
      }
    ]);
      return NextResponse.json(data)
    }
    catch(error) {
      console.error(error)
      return NextResponse.json({error})
    }
  }
}
