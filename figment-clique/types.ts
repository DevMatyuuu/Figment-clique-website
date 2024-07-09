export type catalogProps = {
    amount: number
    id: string,
    title: string,
    image: string,
    image2: string,
    price: number,
    featured: boolean
  }

export type stockProps = {
  id: string,
  catalogTitle: string,
  small: number,
  medium: number,
  large: number,
  xl: number,
  xxl: number
}

export type Cart = {
  id: string;
  title: string,
  image: string,
  amount: number;
  price: number;
}