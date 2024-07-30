import { getCatalog } from "@/actions/getCatalog";
import { getStocks } from "@/actions/getStocks";
import Carousel from "@/components/Carousel";
import dynamic from "next/dynamic";

const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), {
  loading: () => <h1>Loading...</h1>,
});

export default async function Home() {

  const { catalog } = await getCatalog();
  const { stocks } = await getStocks();

  return (
    <>
      <Carousel />
      <FeaturedProducts catalog={catalog} stocks={stocks} />
    </>
  );
}
