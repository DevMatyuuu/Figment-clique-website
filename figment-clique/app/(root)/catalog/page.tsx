import { Metadata } from "next";
import Products from "@/components/Products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const metadata: Metadata = {
  title: "Figment Clique | Catalog",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Catalog',
  },
};

export default async function Catalog() {
  const queryClient = new QueryClient()
  await queryClient. prefetchQuery({
    queryKey: ["catalog"],
    queryFn: async () => {
      const respose = await axios.get('/api/catalog');
      return respose.data
    }
  })

  return (
    <div className='flex flex-col container mx-auto h-auto max-w-[1070px] pt-[130px] lg:pt-[250px] px-5 py-20 gap-10'>
      <h1 className="text-white text-4xl">Catalog</h1>
      <HydrationBoundary state={dehydrate(queryClient)} >
        <Products />
      </HydrationBoundary>
    </div>
  );
}
