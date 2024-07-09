'use client'

import useCartStore from '@/store/CartStore';
import { Cart } from '@/types';
import Image from 'next/image';
import React, { useEffect, useState } from 'react'

interface cartItems {
  item: Cart
}

const CartItems = ({item} : cartItems) => {
  const [itemQty, setItemQty] = useState(item.amount);
  const { increment, decrement } = useCartStore();

  useEffect(() => {
    setItemQty(item.amount);
  }, [item.amount]);

  const handleDecrement = () => {
    const decrementValue = 1;
    const newDecQty = itemQty - decrementValue;
    if (newDecQty >= 1) {
      setItemQty(newDecQty);
      decrement(item.id);
    }
  };

  const handleIncrement = () => {
    const incrementValue = 1;
    const newIncQty = itemQty + incrementValue;
    setItemQty(newIncQty);
    increment(item.id);
  };

  
  const multipleTotal = itemQty * item.price;

  return (
    <>
    <div className='w-full h-auto'>
      <div className='w-full flex py-5 rounded-xl gap-10'>
        <div className='flex flex-col items-center w-max'>
          <Image src={item.image as string} alt={item.title} width={150} height={150} className='lg:h-32 h-40 lg:w-40 w-60'/>
        </div>
        <div className='w-full'>
          <h2 className='text-white'>{item.title}</h2>
          <span className='text-white'>{multipleTotal}</span>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartItems