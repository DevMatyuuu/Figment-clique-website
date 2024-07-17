import Carousel from "@/components/Carousel";
import dynamic from "next/dynamic";

const FeaturedProducts = dynamic(() => import("@/components/FeaturedProducts"), {
  loading: () => <h1>Loading...</h1>,
});

export default async function Home() {

  return (
    <>
      <Carousel />
      <FeaturedProducts />
    </>
  );
}
