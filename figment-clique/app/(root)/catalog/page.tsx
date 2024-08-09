import { Metadata } from "next";
import Products from "@/components/Products";
import { getCatalog } from "@/api/getCatalog";
import { getStocks } from "@/api/getStocks";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Figment Clique | Catalog",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Catalog',
  },
};

export default async function Catalog() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['catalog'],
    queryFn: getCatalog
  })

  const { stocks } = await getStocks();

  return (
    <div className='flex flex-col container mx-auto h-full max-w-[1070px] lg:pt-14 px-5 py-10 gap-10'>
      <h1 className="text-white text-4xl">Catalog</h1>
      <div className="flex flex-col lg:gap-16 gap-10">
        <HydrationBoundary state={dehydrate(queryClient)}>
          <Suspense fallback={<div>Loading...</div>}>
            <Products stocks={stocks} />
          </Suspense>
        </HydrationBoundary>
      </div>
    </div>
  );
}
