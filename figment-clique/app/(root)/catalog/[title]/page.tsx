import { getCatalog } from '@/actions/getCatalog';
import { getStocks } from '@/actions/getStocks';
import ProductDetails from '@/components/ProductDetails';
import { Metadata } from 'next';
import React from 'react'

export const metadata: Metadata = {
  title: "Figment Clique | Home",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Home',
  },
};

interface Params {
  params: {
      title: string;
  };
}

const page = async ({ params }: Params) => {
  const { catalog } = await getCatalog();
  const { stocks } = await getStocks();

  const paramsTitle = params.title

  return (
    <div>
      <ProductDetails paramsTitle = {paramsTitle} catalog={catalog} stocks={stocks} />
    </div>
  )
}

export default page