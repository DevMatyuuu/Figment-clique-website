import { getCatalog } from '@/actions/getCatalog';
import { getStocks } from '@/actions/getStocks';
import ProductDetails from '@/components/ProductDetails';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
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
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['catalog'],
    queryFn: getCatalog
  })
  
  const { stocks } = await getStocks();

  const paramsTitle = params.title

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <ProductDetails paramsTitle = {paramsTitle} stocks={stocks} />
      </HydrationBoundary>
    </div>
  )
}

export default page