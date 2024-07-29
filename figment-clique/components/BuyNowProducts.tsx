'use client'

import useFetchCatalog from '@/hooks/useFetchCatalog';
import { CldImage } from 'next-cloudinary';
import React from 'react'

interface paramsProp {
  paramsId: string
}

export default function BuyNowProducts({paramsId}: paramsProp) {
  const { data, error, isLoading } = useFetchCatalog();

  const specificProduct = data?.find(item => item.id === paramsId);

  return (
    <div className='w-full pt-10'>
        <div className='flex w-full justify-between items-center'>
          <div className='flex justify-between w-full'>
            <div className='flex relative gap-10'>
              <CldImage src={specificProduct?.image as string} alt={specificProduct?.title as string} width={100} height={80}/>
              <span className='text-sm mt-8 w-36'>{specificProduct?.title}</span>
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
