'use client'

import { catalog } from '@prisma/client';
import { CldImage } from 'next-cloudinary';
import { useSearchParams } from 'next/navigation';
import React from 'react'

interface paramsProp {
  paramsId: string
  catalog: Array<catalog> | undefined
}

export default function BuyNowProducts({paramsId, catalog}: paramsProp) {

  const specificProduct = catalog?.find(item => item.id === paramsId);

  const searchParams = useSearchParams();

  const buyNowProductSize = searchParams.get('size')
  const shippingFee = searchParams.get('shipping')

  const finalTotal = Number(specificProduct?.price) + Number(shippingFee);

  const vat = finalTotal * 0.12;


  return (
    <div className='w-full pt-10'>
        <div className='flex w-full justify-between items-center'>
            <div className='flex justify-between w-full'>
              <div className='flex items-start gap-5'>
                <div className='relative'>
                  <CldImage src={specificProduct?.image as string} alt={specificProduct?.title as string} width={100} height={80} className='border border-black/10 rounded-lg lg:h-24 lg:w-24'/>
                  <span className='absolute top-0 -right-2 bg-black text-white p-0.5 h-max w-5 text-center text-xs rounded-full'>1</span>
                </div>
                <div className='flex flex-col gap-2'>
                  <span className='text-sm mt-5 w-36'>{specificProduct?.title}</span>
                  <span className='text-sm w-36'>{buyNowProductSize}</span>
                </div>
              </div>   
              <span className='text-sm mt-5'>₱{specificProduct?.price}.00</span>
            </div>
        </div>
        <div className='flex flex-col gap-5 mt-5'>
          <div className='flex w-full justify-between text-sm'>
            <span>Subtotal:</span>
            <span>₱{specificProduct?.price}.00</span>
          </div>
          <div className='flex w-full justify-between text-sm'>
            <span>Shipping Fee:</span>
            <span>₱{shippingFee}.00</span>
          </div>
          <div className='flex w-full justify-between items-center mt-5'>
            <div className='flex flex-col gap-2'>
              <span className='text-2xl'>Total:</span>
              <span className='text-gray-500 text-sm'>Including ₱{vat.toFixed(2)} in taxes</span>
            </div>
            <span>₱{finalTotal.toFixed(2)}</span>
          </div>
        </div>
    </div>
  )
}
