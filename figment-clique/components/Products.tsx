'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import useCatalogStore from '@/store/CatalogStore';
import Image from 'next/image';


const Products = () => {
  const catalogItems = useCatalogStore((state) => state.catalogItems);
  const loading = useCatalogStore((state) => state.loading);

  const router = useRouter();

  const seeProduct = (title: string | undefined) => {
    router.push(`/catalog/${title}`)
  }

  useEffect(() => {
    AOS.init();
  })

  useEffect(() => {
    useCatalogStore.getState().fetchCatalogData();
  }, []);
  
  if (loading) {
    return (
      <div className='h-screen bg-black'>
        <p className='text-white'>loading...</p>
      </div>
    )
  }
  

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {catalogItems.map((item, index) => {
        const duration = index < 8 ? (200 * index) + 400 : 400 ;
        return (
        <div onClick={() => seeProduct(item.title) } key={item.id} data-aos="fade-zoom-in" data-aos-once="true" data-aos-easing="ease-in-back" data-aos-duration={duration} className="relative flex flex-col w-full justify-center items-center bg-white  text-black rounded-xl group cursor-pointer pb-4">
          <Image src={item.image} alt={item.title} width="150" height="185" className="rounded-xl lg:w-[250px] py-10 h-full object-cover group-hover:scale-105 duration-500 cursor-pointer" />
          <h1 className="text-base z-40 group-hover:underline underline-offset-2 underline-black">
            {item.title}
          </h1>
          <h1 className="text-sm">
            ₱{item.price}
          </h1>
        </div>
        )
      })}
    </div>
  );
};

export default Products;
