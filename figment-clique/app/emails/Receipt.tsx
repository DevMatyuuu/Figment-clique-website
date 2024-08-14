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
  CodeInline
} from '@react-email/components'

interface ReceiptProps {
  firstName: string,
  lastName: string,
  address: string
  orderId: string;
}

export default function Receipt({firstName, lastName, address, orderId} : ReceiptProps) {

  return (
    <Html>
      <Head />
      <Tailwind>
        <Body>
          <Text className='text-black'>Hello {firstName}</Text>
          <Text>{orderId}</Text>
        </Body>
      </Tailwind>
    </Html>
  )
}
