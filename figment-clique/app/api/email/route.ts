import { NextResponse } from "next/server";
import Receipt from "@/app/emails/Receipt";
import { Resend } from 'resend'
import { formSchema } from "@/validation/form-schema";
import { z } from "zod";

const resend = new Resend(process.env.EMAIL_KEY)

export async function GET(data: z.infer<typeof formSchema>, orderId: string ) {
  const orderData = formSchema.safeParse(data)

  if (orderData.success) {
    const { firstName, lastName, address} = orderData.data
    try {
      const data  = await resend.emails.send({
        from: 'onboarding@resend.dev',
        to: 'matthewsantos120216@gmail.com',
        subject: 'FIGMENT CLIQUE RECEIPT',
        react: Receipt({firstName, lastName, address, orderId})
      });
      return NextResponse.json(data)
    }
    catch(error) {
      console.error(error)
      return NextResponse.json({error})
    }
  }
}
