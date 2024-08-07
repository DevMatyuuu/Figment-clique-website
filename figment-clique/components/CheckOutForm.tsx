'use client';

import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { defaultValues } from '@/constants/formDefaultValues';
import { formSchema } from '@/validation/form-schema';
import { Button } from './ui/button';
import { createOrderAction } from '@/actions/createOrderAction';
import useCartStore from '@/store/CartStore';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import countryList from 'react-select-country-list';
import { catalog } from '@prisma/client';
import { useSearchParams } from 'next/navigation';
import { createBuyNowOrderAction } from '@/actions/createBuyNowOrderAction';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import ShippingMethod from './ShippingMethod';



type CountryOption = {
  label: string;
  value: string;
};

interface CheckOutFormProps {
  productFromBuyNow: catalog | undefined
  paramsId: string | undefined
}


export default function CheckOutForm({productFromBuyNow, paramsId} : CheckOutFormProps) {

  const searchParams = useSearchParams();

  const buyNowProductSize = searchParams.get('size')

  const { cart } = useCartStore();

  const options: CountryOption[] = useMemo(() => countryList().getData(), []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const { reset } = form;

    const cartData = {
      title: cart.map((item) => item.title),
      quantity: cart.map((item) => item.quantity),
      price: cart.map((item) => item.price),
      size: cart.map((item) => item.size),
    };

    const buyNowData = {
      title: productFromBuyNow?.title as string,
      quantity: 1,
      price: Number(productFromBuyNow?.price),
      size: buyNowProductSize as string
    }

    if (paramsId) {
      await createBuyNowOrderAction(values, buyNowData)
    } else {
      await createOrderAction(values, cartData);
    }
    reset(defaultValues);
  }

  return (
    <div className='h-auto w-full pt-10 pb-40'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <h1 className='text-4xl mb-10'>Delivery</h1>
          <div className='flex flex-col gap-5'>

            {/* country select */}
            <FormField
              control={form.control}
              name='country'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className='w-full'>
                        <SelectValue placeholder='Select Country' />
                      </SelectTrigger>
                      <SelectContent>
                        {options.map((country: CountryOption) => (
                          <SelectItem key={country.value} value={country.label}>
                            {country.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* first name and last name field */}
            <div className='flex items-center justify-between gap-5'>
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='First Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='Last Name' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* email field */}
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Email' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* address field */}
            <FormField
              control={form.control}
              name='address'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Address' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* barangay field */}
            <FormField
              control={form.control}
              name='barangay'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Barangay' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* postal code and city field */}
            <div className='flex items-center justify-between gap-5'>
              <FormField
                control={form.control}
                name='postalCode'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='Postal Code' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='city'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormControl>
                      <Input placeholder='City' {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* phone field */}
            <FormField
              control={form.control}
              name='phone'
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder='Phone' {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          
          {/* shipping method */}
          <div className='mt-10'>
            <ShippingMethod />
          </div>

          {/* payment method */}
          <div>

          </div>

          <Button
            type='submit'
            className='w-full h-14 bg-red-500 text-white hover:bg-red-600 mt-10'
          >
            Complete Order
          </Button>
        </form>
      </Form>
    </div>
  );
}
