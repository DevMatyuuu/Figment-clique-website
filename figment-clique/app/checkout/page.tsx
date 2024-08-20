import CheckOutForm from '@/components/CheckOutForm'
import CheckOutProducts from '@/components/CheckOutProducts'
import React from 'react'


export default function page() {

  return (
    <div className='flex lg:flex-row flex-col container mx-auto max-w-[1070px] px-5 lg:gap-20'>
      <div className='flex lg:w-[50%] w-full'>
        <CheckOutForm productFromBuyNow={undefined} paramsId={undefined} />
      </div>
      <div className='flex lg:w-[50%] w-full'>
        <CheckOutProducts />
      </div>
    </div>
  )
}
