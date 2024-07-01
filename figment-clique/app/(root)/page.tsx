import FeaturedProducts from "@/components/FeaturedProducts";
import Hero from "@/components/Hero";
import { getFeatured } from "./data";

export default async function Home() {
  const featuredList = await getFeatured()

  return (
    <>
      <Hero />
      <FeaturedProducts featuredList={featuredList} />
    </>
  );
}
