import { shippingFee } from '@/constants/shipping-fee'
import React, { useState } from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

export default function ShippingMethod() {
  const [selectedShipping, setSelectedShipping] = useState<string | undefined>(undefined)

  return (
    <div>
      <h2 className='font-semibold text-2xl'>
        Shipping Method
      </h2>
      <div className='flex flex-col gap-3 mt-10'>
        <RadioGroup value={selectedShipping} onValueChange={setSelectedShipping}>
          {shippingFee.map((shipping, index) => (
            <div className="flex justify-between items-center" key={index}>
              <RadioGroupItem 
                value={shipping.label} 
                id={`shipping${index + 1}`} 
                className="radio-button__input" 
              />
              <Label htmlFor={`shipping${index + 1}`} className="radio-button__label">
                <span className="radio-button__custom"></span>
                {shipping.label}
              </Label>
              <span>{shipping.value}</span>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}
