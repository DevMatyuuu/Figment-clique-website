'use client'

import { useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

export default function ShippingMethod() {

const [openItem, setOpenItem] = useState<string | null>(null);

const handleRadioChange = (value: string) => {
    setOpenItem(openItem === value ? null : value);
};

  return (
    <>
    <h2 className='text-2xl'>Shipping Method</h2>
    <div className='mt-8'>
        <Accordion type="single" value={openItem as string} collapsible>
            <AccordionItem value="item-1">
                <AccordionTrigger className='flex items-center space-x-2' >
                <div className="radio-button">
                    <input name="radio-group" id="radio1" className="radio-button__input" type="radio" onChange={() => handleRadioChange("item-1")}/>
                    <label htmlFor="radio1" className="radio-button__label">
                        <span className="radio-button__custom"></span> 
                            GCASH
                    </label>
                </div>
                </AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
                <AccordionTrigger className='flex items-center space-x-2'>
                <div className="radio-button">
                    <input name="radio-group" id="radio2" className="radio-button__input" type="radio" onChange={() => handleRadioChange("item-2")}/>
                    <label htmlFor="radio2" className="radio-button__label">
                        <span className="radio-button__custom"></span> 
                            BPI
                    </label>
                </div>
                </AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
                <AccordionTrigger className='flex items-center space-x-2'>
                <div className="radio-button">
                    <input name="radio-group" id="radio3" className="radio-button__input" type="radio" onChange={() => handleRadioChange("item-3")}/>
                    <label htmlFor="radio3" className="radio-button__label">
                        <span className="radio-button__custom"></span> 
                            Cash On Delivery
                    </label>
                </div>
                </AccordionTrigger>
                <AccordionContent>
                Yes. It adheres to the WAI-ARIA design pattern.
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
    </>
  );
}
