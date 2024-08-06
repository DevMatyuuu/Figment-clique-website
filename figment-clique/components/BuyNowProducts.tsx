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

  return (
    <div className='w-full pt-10'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex justify-between w-full'>
            <div className='flex relative gap-10'>
              <CldImage src={specificProduct?.image as string} alt={specificProduct?.title as string} width={100} height={80}/>
              <span className='text-sm mt-8 w-36'>{specificProduct?.title}</span>
              <span className='text-sm mt-8 w-36'>{buyNowProductSize}</span>
            </div>
            <span className='text-sm mt-8'>₱{specificProduct?.price}</span>
          </div>
        </div>
        <div>
          <span>{specificProduct?.price}</span>
        </div>
    </div>
  )
}
