'use client';

import useCartStore from '@/store/CartStore';
import { CldImage } from 'next-cloudinary';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import { shippingFee as shippingFeeOptions } from '@/constants/shipping-fee';

export default function CheckOutProducts() {
  const { cart, total } = useCartStore();
  const searchParams = useSearchParams();

  const shippingLabel = searchParams.get('shipping');

  const getNumericShippingFee = (label: string | null) => {
    if (!label || label === 'not-selected') {
      return null;
    }
    const selectedOption = shippingFeeOptions.find((option) => option.label === label);
    
    return selectedOption ? selectedOption.value : null;
  };

  const numericShippingFee = getNumericShippingFee(shippingLabel);

  const cartTotal = Number(total); 

  const finalTotal = numericShippingFee !== null 
    ? cartTotal + numericShippingFee 
    : cartTotal;

  const vat = finalTotal * 0.12;

  return (
    <div className="flex flex-col gap-5 w-full lg:pt-10 py-20 h-auto">
      {cart.map((item, index) => (
        <div key={index} className="flex w-full justify-between items-center">
          <div className="flex justify-between w-full">
            <div className="flex items-start gap-5">
              <div className="relative">
                <CldImage
                  src={item.image}
                  alt={item.title}
                  width={100}
                  height={80}
                  className="border border-black/10 rounded-lg lg:h-24 lg:w-24"
                />
                <span className="absolute top-0 -right-2 bg-black text-white p-0.5 h-max w-5 text-center text-xs rounded-full">
                  {item.quantity}
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-sm mt-5 w-36">{item.title}</span>
                <span className="text-sm w-36">{item.size}</span>
              </div>
            </div>
            <span className="text-sm mt-5">₱{item.price * item.quantity}.00</span>
          </div>
        </div>
      ))}

      <div className="flex flex-col gap-5 mt-5">
        <div className="flex w-full justify-between text-sm">
          <span>Subtotal:</span>
          <span>₱{total}.00</span>
        </div>

        <div className="flex w-full justify-between text-sm">
          <span>Shipping Fee:</span>
          <span className={`${numericShippingFee !== null ? "text-black" : "text-muted-foreground"}`}>
            {numericShippingFee !== null ? `₱${numericShippingFee}.00` : 'Please select a shipping method'}
          </span>
        </div>

        <div className="flex w-full justify-between items-center mt-5">
          <div className="flex flex-col gap-2">
            <span className="text-2xl">Total:</span>
            {numericShippingFee !== null && (
              <span className="text-gray-500 text-sm">
                Including ₱{vat.toFixed(2)} in taxes
              </span>
            )}
          </div>
          <span>₱{finalTotal.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
}
