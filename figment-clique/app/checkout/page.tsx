import CheckOutForm from '@/components/CheckOutForm'
import CheckOutProducts from '@/components/CheckOutProducts'
import React from 'react'


export default function page() {

  return (
    <div className='flex container mx-auto max-w-[1070px] px-5 gap-20'>
      <div className='flex w-[50%]'>
        <CheckOutForm />
      </div>
      <div className='flex w-[50%]'>
        <CheckOutProducts />
      </div>
    </div>
  )
}
