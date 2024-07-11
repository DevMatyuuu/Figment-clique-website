export type catalogProps = {
    quantity: number
    id: string,
    title: string,
    image: string,
    image2: string,
    price: number,
    featured: boolean,
    size: string
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
  size: string
  id: string;
  title: string,
  image: string,
  quantity: number;
  price: number;
}