'use client'

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';
import { paymentMethods } from '@/constants/payment-methods';

export default function PaymentMethod() {

  const [openItem, setOpenItem] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setOpenItem(openItem === value ? null : value);
  };

  return (
    <>
      <h2 className='text-2xl font-semibold'>Payment Method</h2>
      <div className='mt-8'>
        <Accordion type="single" value={openItem as string} collapsible>
          {paymentMethods.map((method, index) => (
            <AccordionItem key={index} value={`item-${index + 1}`}>
              <AccordionTrigger className='flex items-center space-x-2'>
                <div className="radio-button">
                  <input
                    name="radio-group"
                    id={`radio${index + 1}`}
                    className="radio-button__input"
                    type="radio"
                    onChange={() => handleRadioChange(`item-${index + 1}`)}
                  />
                  <label htmlFor={`radio${index + 1}`} className="radio-button__label">
                    <span className="radio-button__custom"></span>
                    {method.label}
                  </label>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div dangerouslySetInnerHTML={{ __html: method.description }} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
