export type Cart = {
  size: string
  id: string;
  title: string,
  image: string,
  quantity: number;
  price: number;
}

export type CartOrderData = {
  title: string[];
  quantity: number[];
  size: string[];
  price: number[];
}

export type BuyNowData = {
  title: string;
  quantity: number;
  price: number;
  size: string;
};
