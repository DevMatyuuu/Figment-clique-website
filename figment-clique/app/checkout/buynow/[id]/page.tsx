import { getCatalog } from '@/api/getCatalog';
import BuyNowProducts from '@/components/BuyNowProducts';
import CheckOutForm from '@/components/CheckOutForm';
import React from 'react'

interface ParamsProp {
  params: {
      id: string;
  };
}

export default async function page({params} : ParamsProp) {
  const { catalog } = await getCatalog();
  const paramsId = params.id;

  const productFromBuyNow = catalog?.find(item => item.id === paramsId)

  return (
    <div className='flex container mx-auto max-w-[1070px] px-5 gap-20'>
      <div className='flex w-[50%]'>
        <CheckOutForm productFromBuyNow={productFromBuyNow} paramsId={paramsId}/>
      </div>
      <div className='flex w-[50%]'>
        <BuyNowProducts paramsId={paramsId} catalog={catalog}/>
      </div>
    </div>
  )
}
