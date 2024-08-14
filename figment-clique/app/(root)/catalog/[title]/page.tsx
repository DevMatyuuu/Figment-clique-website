import { getCatalog } from '@/app/api/getCatalog';
import { getStocks } from '@/app/api/getStocks';
import ProductDetails from '@/components/ProductDetails';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { Metadata } from 'next';
import React, { Suspense } from 'react'

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
        <Suspense fallback={<div>Loading...</div>}>
          <ProductDetails paramsTitle = {paramsTitle} stocks={stocks} catalog={catalog} />
        </Suspense>
    </div>
  )
}

export default page