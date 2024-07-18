'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import useFetchCatalog from '@/hooks/useFetchCatalog';
import useFetchStocks from '@/hooks/useFetchStocks';
import Link from 'next/link';
import { CldImage } from 'next-cloudinary';

const Products = () => {
  const { data: catalogData, error: catalogError, isLoading: isCatalogLoading} = useFetchCatalog();
  const {data: stocksData, error: stocksError, isLoading: isStocksLoading} = useFetchStocks()

  useEffect(() => {
    AOS.init();
  })

  if (catalogError) return <div>{catalogError.message}</div>

  if (isCatalogLoading) {
    return (
      <div className='h-screen bg-black'>
        <p className='text-white'>loading...</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {catalogData?.map((item, index) => {
        const duration = (200 * index) + 400;

        const stockEntry = stocksData?.find((stock) => stock.catalogTitle === item.title);
            const isOutOfStock = 
              stockEntry?.small as number === 0 &&
              stockEntry?.medium as number === 0 &&
              stockEntry?.large as number === 0 &&
              stockEntry?.xl as number === 0 &&
              stockEntry?.xxl as number === 0

        return (
        <Link href={`/catalog/${item.title}`} key={item.id} data-aos="fade-zoom-in" data-aos-once="true" data-aos-easing="ease-in-back" data-aos-duration={duration} className={`${item.image ? 'flex ' : 'hidden'} relative flex-col w-full justify-center items-center bg-white  text-black rounded-xl group cursor-pointer pb-4`}>
          <CldImage src={item.image} alt={item.title} width="200" height='200' className="rounded-xl lg:w-[250px] py-10 lg:h-[300px] h-[220px] object-cover group-hover:scale-105 duration-500 cursor-pointer" />
          <h1 className="text-xs text-center lg:text-base z-40 group-hover:underline underline-offset-2 underline-black">
            {item.title}
          </h1>
          <h1 className="text-sm">
            ₱{item.price}
          </h1>
          <div className='absolute lg:top-5 top-2 left-3'>
            {isOutOfStock 
            ? 
              <span className='bg-black py-1 px-3 lg:text-sm text-[8px] rounded-full text-white'>Out of Stock</span> 
            : 
              ''  
            }
          </div>
        </Link>
        )
      })}
    </div>
  );
};

export default Products;
