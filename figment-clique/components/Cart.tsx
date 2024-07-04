'use client'

import useModalStore from '@/store/ModalStore';
import React from 'react';

const Cart = () => {
  const [isCartOpen, setCartClose, setNavModalClose] = useModalStore((state) => [state.isCartOpen, state.setCartClose, state.setNavModalClose]);

  return (
    <div className={`${isCartOpen ? 'z-50 opacity-1' : '-z-10 opacity-0'} w-full bg-black/50 h-full fixed top-0 duration-500 transition-all`}>
      <aside className={`${isCartOpen ? 'right-0' : 'right-[-2000px]'} fixed top-0 h-screen lg:w-[30%] overflow-hidden w-[100%] z-50 bg-black transition-all duration-300 ease-in-out`}>
        <div className='flex flex-col items-start gap-10 py-10 px-10'>
          <div onClick={setCartClose} className='text-white cursor-pointer'>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19 5L5 19" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M19 19L5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
          <span className='text-white text-4xl'>Cart</span>
        </div>
      </aside>
    </div>
  );
}

export default Cart;
