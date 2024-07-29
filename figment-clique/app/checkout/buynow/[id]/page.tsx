import BuyNowProducts from '@/components/BuyNowProducts';
import CheckOutForm from '@/components/CheckOutForm';
import CheckOutProducts from '@/components/CheckOutProducts';
import React from 'react'

interface ParamsProp {
  params: {
      id: string;
  };
}

export default function page({params} : ParamsProp) {
  const paramsId = params.id;
  console.log(paramsId)

  return (
    <div className='flex container mx-auto max-w-[1070px] px-5 gap-20'>
      <div className='flex w-[50%]'>
        <CheckOutForm />
      </div>
      <div className='flex w-[50%]'>
        <BuyNowProducts paramsId={paramsId}/>
      </div>
    </div>
  )
}
