'use client'

import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { catalog } from '@prisma/client';

const Products = () => {
  const {data, error, isLoading} = useQuery<Array<catalog>>({
    queryKey: ["catalog"],
    queryFn: async () => {
      const response = await axios.get('/api/catalog');
      return response.data
    },
  })

  const router = useRouter();

  const seeProduct = (title: string | undefined) => {
    router.push(`/catalog/${title}`)
  }

  useEffect(() => {
    AOS.init();
  })

  if (isLoading) {
    return (
      <div className='h-screen bg-black'>
        <p className='text-white'>loading...</p>
      </div>
    )
  }

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {data?.map((item, index) => {
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
