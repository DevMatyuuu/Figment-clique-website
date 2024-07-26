'use client'

import useCartStore from '@/store/CartStore';
import { CldImage } from 'next-cloudinary';
import React from 'react'

export default function CheckOutProducts() {
  const { cart, total} = useCartStore();
  return (
    <div className='w-full pt-10'>
      {cart.map((item) => (
        <div className='flex w-full justify-between items-center'>
          <div className='flex justify-between w-full'>
            <div className='flex relative gap-10'>
              <CldImage src={item.image} alt={item.title} width={100} height={80}/>
              <span className='text-sm mt-8 w-36'>{item.title}</span>
              <span className='absolute top-4 left-20 bg-black text-white h-max w-5 text-center text-sm rounded-full'>{item.quantity}</span>
            </div>
            <span className='text-sm mt-8'>₱{item.price * item.quantity}</span>
          </div>
        </div>
      ))}
        <div>
          <span>{total}</span>
        </div>
    </div>
  )
}
