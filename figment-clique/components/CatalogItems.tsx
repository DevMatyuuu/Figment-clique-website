'use client'

import React, { useState, useEffect } from 'react';
import { Skeleton } from "@/components/ui/skeleton"


type catalogProps = {
  id: string,
  title: string,
  image: string,
  image2: string,
  price: string
}

const CatalogItems = () => {
  const [catalogData, setCatalogData] = useState<Array<catalogProps>>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
  
        const response = await fetch('/api/catalog');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setLoading(false);
        setCatalogData(data);
      } catch (error) {
        console.error('Error fetching catalog data', error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  
  if (isLoading) {
    return (
      <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
          <div className="relative flex flex-col w-full h-[370px] bg-white justify-center items-center rounded-xl py-10">
            <Skeleton className='h-[200px] w-[80%] my-5'/>
            <div className='flex flex-col items-center justify-center w-full gap-4'>
              <Skeleton className='h-10 w-[80%]'/>
              <Skeleton className='h-10 w-[80%]'/>
            </div>
          </div>
    </div>
    )
  }

  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 w-full gap-4'>
      {catalogData.map((item) => (
        <div key={item.id} className="relative flex flex-col w-full justify-center items-center bg-white text-black rounded-xl group cursor-pointer pb-4">
          <img src={item.image} alt={item.title} width="150" height="185" className="rounded-xl lg:w-[250px] h-full object-cover duration-500 cursor-pointer" />
          <h1 className="text-base z-40 group-hover:underline underline-offset-2 underline-black" data-aos="fade-up">
            {item.title}
          </h1>
          <h1 className="text-sm" data-aos="fade-up">
            {item.price}
          </h1>
        </div>
      ))}
    </div>
  );
};

export default CatalogItems;
