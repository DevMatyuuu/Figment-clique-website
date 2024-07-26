'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z.object({
  firstName: z.string().min(2).max(20),
  lastName: z.string().min(2).max(20),
  address: z.string().min(10).max(50),
  barangay: z.string().min(2).max(20),
  postalCode: z.string().min(4).max(4).optional(),
  city: z.string().min(5).max(15),
  phone: z.number().min(11).max(11),
})

export default function CheckOutForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      address: "",
      barangay: "",
      postalCode: "",
      city: "",
      phone: undefined,
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
}

  return (
    <div className='h-screen w-full pt-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className='text-4xl mb-10'>Delivery</h1>
            <div className='flex flex-col gap-5'>
              <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="First Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Last Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </form>
        </Form>
    </div>
  )
}