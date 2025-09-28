'use client';

import { shippingFee } from '@/constants/shipping-fee';
import React, { useEffect, useState } from 'react';

export default function ShippingMethod() {
  const [selectedShipping, setSelectedShipping] = useState<{ label: string; value: number | null }>({
    label: '',
    value: null,
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    const shippingLabel = url.searchParams.get('shipping');

    if (shippingLabel && shippingLabel !== 'not-selected') {
      // Find the shipping fee object based on the LABEL from the URL
      const initialSelection = shippingFee.find((shipping) => shipping.label === shippingLabel);

      if (initialSelection) {
        setSelectedShipping(initialSelection);
      } else {
        // Handle case where a user types in a non-existent label
        console.warn(`Shipping method '${shippingLabel}' not found.`);
        url.searchParams.set('shipping', 'not-selected');
      }
    } else if (!shippingLabel) {
      // Set default 'not-selected' if param is missing
      url.searchParams.set('shipping', 'not-selected');
      window.history.replaceState({}, '', url.toString());
    }
  }, []);

  const handleShippingChange = (label: string) => {
    const selected = shippingFee.find((shipping) => shipping.label === label);
    if (selected) {
      setSelectedShipping({ label: selected.label, value: selected.value });

      const url = new URL(window.location.href);
      url.searchParams.set('shipping', selected.label || '');
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
