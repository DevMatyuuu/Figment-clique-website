import { Metadata } from "next";
import Products from "@/components/Products";
import { getCatalog } from "@/actions/getCatalog";
import CatalogPaginationControls from "@/components/CatalogPaginationControls";
import { getStocks } from "@/actions/getStocks";

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
  const { catalog } = await getCatalog();
  const { stocks } = await getStocks();

  const page = searchParams['page'] ?? '1'
  const per_page = searchParams['per_page'] ?? '8'

  const start = (Number(page) - 1) * Number(per_page)
  const end = start + Number(per_page)

  const entries = catalog?.slice(start, end)

  return (
    <div className='flex flex-col container mx-auto h-full max-w-[1070px] lg:pt-14 px-5 py-10 gap-10'>
      <h1 className="text-white text-4xl">Catalog</h1>
      <div className="flex flex-col lg:gap-16 gap-10">
        <Products catalog={entries} stocks={stocks} />
        <CatalogPaginationControls hasNextPage={catalog && end < catalog.length} hasPrevPage={start > 0} catalog={catalog} />
      </div>
    </div>
  );
}
