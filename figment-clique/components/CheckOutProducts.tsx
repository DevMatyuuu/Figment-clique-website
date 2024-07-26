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
          <div className='flex items-center justify-between w-full'>
            <CldImage src={item.image} alt={item.title} width={100} height={80}/>
            <span className='text-sm'>{item.title}</span>
            <span>₱{item.price}</span>
          </div>
        </div>
      ))}
        <div>
          <span>{total}</span>
        </div>
    </div>
  )
}
