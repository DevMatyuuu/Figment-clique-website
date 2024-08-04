'use client'

import useCartStore from '@/store/CartStore';
import useModalStore from '@/store/ModalStore';
import React, { useEffect, useState } from 'react';
import CartItems from './CartItems';
import Link from 'next/link';


const Cart = () => {
  const { isCartOpen, setCartClose } = useModalStore();
  const { cart, total, clearCart, setTotal } = useCartStore();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);


  const handleCheckOut = () => {
    setIsCheckoutLoading(true);
  };

  useEffect(() => {
    const total = cart.reduce((a, c) => {
      return a + c.price * c.quantity;
    }, 0);
    setTotal(total);
  }, [cart]);


  return (
    <div className={`${isCartOpen ? 'z-50 opacity-1' : '-z-10 opacity-0'} w-full bg-black/50 h-full fixed top-0 duration-500 transition-all`}>
      <aside className={`${isCartOpen ? 'right-0' : 'right-[-2000px]'} fixed top-0 h-full lg:w-[25%] lg:border-l lg:border-l-white/15 w-[100%] z-50 bg-black transition-all duration-300 ease-in-out`}>
        <div className='flex justify-between items-center gap-10 py-8 px-10'>
          <span className='text-white text-3xl'>Cart</span>
          <div onClick={setCartClose} className='text-white cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5L5 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19 19L5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
        {cart.length >= 1 
        ? 
        <div className='flex flex-col w-full mt-5 h-full'>
          <div className='w-full h-[600px] flex flex-col gap-10 overflow-y-auto pb-20'>
            {cart.map((item, index) => (
              <CartItems key={index} item={item} />
            ))}
          </div>
          <div className='flex flex-col gap-10 absolute bottom-0 justify-center items-center w-full border-t bg-black border-t-white/30 h-auto py-10'>
            <div className='flex flex-col w-[80%] justify-center items-center'>
              <div className='flex w-full justify-between'>
                <span className='text-white text-2xl'>Total:</span>
                <span className='text-white text-2xl'>₱{total}</span>
              </div>
            </div>
            <div className='flex flex-col gap-5 w-[80%]'>
              <Link href={`/checkout`} onClick={handleCheckOut} className='flex justify-center items-center w-full h-12 bg-white hover:bg-slate-500 hover:text-white text-black rounded-md duration-200'>
                {isCheckoutLoading ? <span>Loading...</span> : <span>Checkout</span>}
              </Link>
              <button onClick={clearCart} className='w-full h-12 bg-white hover:bg-slate-500 hover:text-white text-black rounded-md duration-200'>Clear Cart</button>
            </div>
          </div>
        </div>
        : 
        <div className='flex flex-col items-center justify-center -mt-28 w-full h-full'>
          <div className='flex flex-col items-center gap-10 w-[80%]'>
            <span className='text-white text-3xl'>Your cart is empty</span>
            <Link href='/catalog' onClick={setCartClose} className='w-full py-3 bg-white hover:bg-slate-500 text-center hover:text-white text-black rounded-md duration-200'>Continue Shopping</Link>
          </div>
        </div>
        }
      </aside>
    </div>
  );
}

export default Cart;
