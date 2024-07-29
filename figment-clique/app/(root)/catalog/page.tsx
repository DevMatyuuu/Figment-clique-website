import { Metadata } from "next";
import Products from "@/components/Products";
import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import { getCatalog } from "@/actions/getCatalog";
import CatalogPaginationControls from "@/components/CatalogPaginationControls";

export const metadata: Metadata = {
  title: "Figment Clique | Catalog",
  description: "Figment Clique is a Clothing Brand based in the philippines",
  openGraph: {
    title: 'Figment Clique | Catalog',
  },
};

export default async function Catalog({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const { data } = await getCatalog();

  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '8'

  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const entries = data?.slice(start, end)

  return (
    <div className='flex flex-col container mx-auto h-auto max-w-[1070px] pt-[130px] lg:pt-14 px-5 py-20 gap-10'>
      <h1 className="text-white text-4xl">Catalog</h1>
       <Products catalog={entries} />
       <CatalogPaginationControls hasNextPage={data && end < data.length} hasPrevPage={start > 0}/>
    </div>
  );
}
