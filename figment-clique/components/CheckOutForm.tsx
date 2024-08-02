'use client'

import React from 'react'
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { defaultValues } from '@/constants/formDefaultValues'
import { formSchema } from '@/validation/form-schema'
import { Button } from './ui/button'
import { createOrderAction } from '@/actions/createOrderAction'

export default function CheckOutForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues
  })
  
  async function onSubmit(values: z.infer<typeof formSchema>) {
    await createOrderAction(values)
  }

  return (
    <div className='h-screen w-full pt-10'>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <h1 className='text-4xl mb-10'>Delivery</h1>
            <div className='flex flex-col gap-5'>
              <div className='flex items-center justify-between gap-5'>
                <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem className='w-full'>
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
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input placeholder="Last Name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="barangay"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Barangay" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className='flex items-center justify-between gap-5'>
                <FormField
                control={form.control}
                name="postalCode"
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder="Postal Code" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem className='w-full'>
                      <FormControl>
                        <Input placeholder="City" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Phone" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
            </div>
            <Button type='submit' className='bg-red-500 text-white hover:bg-red-600'>
              Complete Order
            </Button>
          </form>
        </Form>
    </div>
  )
}