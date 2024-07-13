'use client'

import useCatalogStore from '@/store/CatalogStore';
import { Cart, stockProps } from '@/types';
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import useModalStore from '@/store/ModalStore';
import useCartStore from '@/store/CartStore';
import Image from 'next/image';


interface params {
  paramsTitle: string
}


const ProductDetails = ({paramsTitle} : params) => {
  const { addToCart, setSelectedSize, selectedSize } = useCartStore();
  const { catalogItems } = useCatalogStore();
  const { setCartOpen } = useModalStore();
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

  const addToCartDisabled = !selectedSize
                            || catalogStocks?.small as number === 0 && selectedSize === 'Small' 
                            || catalogStocks?.medium as number === 0 && selectedSize === 'Medium'
                            || catalogStocks?.large as number === 0 && selectedSize === 'Large'
                            || catalogStocks?.xl as number === 0 && selectedSize === 'XL'
                            || catalogStocks?.xxl as number === 0 && selectedSize === 'XXL'


  return (

    <div className='h-screen w-full pt-60'>
      <div className="text-white flex container mx-auto max-w-[1070px] px-5">
        <div className='flex flex-col'>
          <h1 className='text-4xl'>{catalogItemData?.title}</h1>
          <div>
            <span className='text-lg'>{catalogItemData?.price} PHP</span>
          </div>
          <Select onValueChange={(value) => setSelectedSize(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sizes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='Small'>{catalogStocks?.small as number > 0 ? <span>Small</span> : <span>Small - Unavailable</span> }</SelectItem>
              <SelectItem value='Medium'>{catalogStocks?.medium as number > 0 ? <span>Medium</span> : <span>Medium - Unavailable</span> }</SelectItem>
              <SelectItem value='Large'>{catalogStocks?.large as number > 0 ? <span>Large</span> : <span>Large - Unavailable</span> }</SelectItem>
              <SelectItem value='XL'>{catalogStocks?.xl as number > 0 ? <span>XL</span> : <span>XL - Unavailable</span> }</SelectItem>
              <SelectItem value='XXL'>{catalogStocks?.xxl as number > 0 ? <span>XXL</span> : <span>XXL - Unavailable</span> }</SelectItem>
            </SelectContent>
          </Select>
          <button onClick={() => {addToCart(catalogItemData as unknown as Cart); setCartOpen(); setSelectedSize('')}} disabled={addToCartDisabled} className={`${addToCartDisabled ? 'cursor-not-allowed bg-white/60' : ''} bg-white text-black mt-20`}>Add to cart</button>
        </div>
        <div>
          <Image src={catalogItemData?.image as string} alt={catalogItemData?.title as string} width={600} height={400} />
        </div>
      </div>
    </div>
  )
}

export default ProductDetails