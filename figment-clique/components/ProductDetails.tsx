'use client'

import useCatalogStore from '@/store/CatalogStore';
import { stockProps } from '@/types';
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


interface params {
  paramsTitle: string
}


const ProductDetails = ({paramsTitle} : params) => {
  const catalogItems = useCatalogStore((state) => state.catalogItems);
  const [stocks, setStocks] = useState<Array<stockProps>>([])

  const decodedParams = decodeURIComponent(paramsTitle);
  
   useEffect(() => {
    useCatalogStore.getState().fetchCatalogData();
  }, []);

  useEffect(() => {
    fetch('/api/stocks')
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        return res.json();
      })
      .then((data) => {
        setStocks(data);
      })
      .catch((error) => {
        console.error('Error fetching catalog data', error);
      });
  }, []);

  const catalogItemData = catalogItems.find(item => item.title === decodedParams);
  const catalogStocks = stocks.find(item => item.catalogTitle === decodedParams)

  console.log(catalogItemData)


  return (

    <div className='h-screen w-full pt-60'>
      <div className="text-white flex container mx-auto max-w-[1070px] px-5">
        <div className='flex flex-col'>
          <h1 className='text-4xl'>{catalogItemData?.title}</h1>
          <div>
            <span className='text-lg'>{catalogItemData?.price} PHP</span>
          </div>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='small'>{catalogStocks?.small as number > 0 ? <span>small</span> : <span>small - Unavailable</span> }</SelectItem>
              <SelectItem value="dark">Dark</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default ProductDetails