import React from 'react'
import {
  Body,
  Html,
  Container,
  Tailwind,
  Text,
  Img,
  Heading,
  Head,
  Hr,
  Row,
  Column,
  Section,
} from '@react-email/components'
import logo from '../../assets/logo.webp'
import { Cart } from '@/types';

interface ReceiptProps {
  firstName: string,
  lastName: string,
  address: string
  orderId: string;
  cart: Cart[],
  totalQty: number,
  total: number
}

export default function Receipt({firstName, lastName, address, orderId, cart, totalQty, total} : ReceiptProps) {

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body className='bg-black/80 text-black px-2 lg:px-0 my-10'>
          <Container className='bg-white px-5'>
            <Section>
              <Row>
                <Column align='left'>
                  <Img src='' alt='logo'/>
                </Column>
                <Column align='right'>
                  <Text className='w-[40%] text-end text-xs'>If you have questions about your purchase please contact us at </Text>
                </Column>
              </Row>
            </Section>
            <Hr />
            <Section>
              <Heading className='uppercase font-extrabold text-3xl w-full text-start'>Thank you for shopping at Figment clique</Heading>
              <Row className='text-sm lg:text-base'>
                <Column align='left'>
                  <Row>
                    <Column align='left' className='flex gap-2'>
                     <Text>Your Purchase</Text>
                     <Text className='text-orange-500'>({totalQty})</Text>
                    </Column>
                  </Row>
                </Column>
                <Column align='right'>
                  <Text className='uppercase'>Order ID: {orderId}</Text>
                </Column>
              </Row>
            </Section>
            <Section>
              {cart && cart.map((item) => (
                <Row key={item.id}>
                  <Column align='left'>
                    <Img src={item.image} alt={item.title} width={80} height={100} className='h-24 w-20'/>
                  </Column>
                  <Column align='right' className='flex flex-col'>
                    <Text>{item.title}</Text>
                    <Text>{item.price}</Text>
                    <Text>{item.size}</Text>
                  </Column>
                </Row>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}
