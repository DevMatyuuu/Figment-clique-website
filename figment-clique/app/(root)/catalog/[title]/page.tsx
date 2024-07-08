
import ProductDetails from '@/components/ProductDetails';
import React from 'react'

interface Params {
  params: {
      title: string;
  };
}

const page = ({ params }: Params) => {

  const paramsTitle = params.title

  return (
    <div>
      <ProductDetails paramsTitle = {paramsTitle} />
    </div>
  )
}

export default page