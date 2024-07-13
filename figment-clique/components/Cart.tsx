'use client'

import useCartStore from '@/store/CartStore';
import useModalStore from '@/store/ModalStore';
import React from 'react';
import CartItems from './CartItems';

const Cart = () => {
  const { isCartOpen, setCartClose } = useModalStore();
  const { cart, total, clearCart } = useCartStore();

  console.log(cart)

  return (
    <div className={`${isCartOpen ? 'z-50 opacity-1' : '-z-10 opacity-0'} w-full bg-black/50 h-full fixed top-0 duration-500 transition-all`}>
      <aside className={`${isCartOpen ? 'right-0' : 'right-[-2000px]'} fixed top-0 h-screen lg:w-[30%] lg:border lg:border-l-white/15 overflow-hidden w-[100%] z-50 bg-black transition-all duration-300 ease-in-out`}>
        <div className='flex items-start gap-10 py-8 mb-5 px-10 justify-between'>
          <span className='text-white text-4xl'>Cart</span>
          <div onClick={setCartClose} className='text-white cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 19L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </div>
        <div className='w-full flex flex-col gap-10 px-5'>
            {cart.map((item) => (
              <>
                <CartItems item={item} />
              </>
            ))}
          </div>
      </aside>
    </div>
  );
}

export default Cart;
