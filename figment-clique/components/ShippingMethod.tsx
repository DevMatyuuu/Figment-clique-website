import { shippingFee } from '@/constants/shipping-fee'
import React, { useState } from 'react'

export default function ShippingMethod() {
  const [selectedShipping, setSelectedShipping] = useState<{ label: string, value: number | null }>({ label: '', value: null });

  const handleShippingChange = (label: string) => {
    const selected = shippingFee.find(shipping => shipping.label === label);
    if (selected) {
      setSelectedShipping({ label: selected.label, value: selected.value });

      const url = new URL(window.location.href);
      url.searchParams.set('shipping', selected.value?.toString() || ''); 
      window.history.pushState({}, '', url.toString());
    }
  };

  return (
    <div className="shipping-method">
      <h2 className="font-semibold text-2xl">Shipping Method</h2>
      <div className="flex flex-col gap-3 mt-10">
        {shippingFee.map((shipping, index) => (
          <div className="shipping-radio-button" key={index}> 
            <input
              name="shipping-radio-group"
              id={`shipping-radio${index + 1}`}
              className="shipping-radio-button__input" 
              type="radio"
              value={shipping.label}
              onChange={() => handleShippingChange(shipping.label)} 
            />
            <label htmlFor={`shipping-radio${index + 1}`} className="shipping-radio-button__label">
              <span className="shipping-radio-button__custom"></span>
              {shipping.label}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}
