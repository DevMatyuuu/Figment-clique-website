'use client'

import useCartStore from '@/store/CartStore';
import { Cart } from '@/types';
import { CldImage } from 'next-cloudinary';
import React, { useEffect, useState } from 'react'
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

interface cartItems {
  item: Cart
}

const CartItems = ({item} : cartItems) => {
  const [itemQty, setItemQty] = useState(item.quantity);
  const { increment, decrement, removeFromCart } = useCartStore();

  useEffect(() => {
    setItemQty(item.quantity);
  }, [item.quantity]);

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
    <div className='flex flex-col w-full h-auto'>
      <div className='w-full flex px-5 rounded-xl gap-5 justify-center items-center'>
        <div className='flex flex-col items-center w-max h-max'>
          <CldImage src={item.image as string} alt={item.title} width={150} height={150} className='lg:h-36 h-48 lg:w-32 w-36'/>
        </div>
        <div  className='flex justify-between w-[60%] px-5'>
          <div className='flex flex-col'>
            <h2 className='text-white mb-2 text-sm lg:text-base w-[80%]'>{item.title}</h2>
            <h2 className='text-white/80 lg:mb-2 mb-1 text-sm lg:text-base'>Price: ₱{item.price}</h2>
            <h2 className='text-white/80 lg:mb-6 mb-4 text-sm lg:text-base'>Size: {item.size}</h2>
            <div className='flex items-center gap-5'>
              <div className='flex lg:h-10 h-10 w-24 lg:w-28 items-center justify-around bg-black text-white border border-white rounded-lg'>
                <FiMinus onClick={() => handleDecrement()} className='cursor-pointer text-white/70 hover:text-white duration-200'/>
                <span className='text-xs'>{itemQty}</span>
                <FiPlus onClick={() => handleIncrement()} className='cursor-pointer text-white/70 hover:text-white duration-200'/>
              </div>
              <FiTrash2 onClick={() => removeFromCart(item.id)} className='text-white size-5 cursor-pointer'/>
            </div>
          </div>
          <div>
            <span className='text-white'>₱{multipleTotal}</span>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default CartItems