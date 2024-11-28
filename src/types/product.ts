export interface ProductData {
  id: string;
  title: string;
  image?: string;
  price?: number;
  description?: string;
}

export interface ProductCardProps extends ProductData {
  viewDetails: (id: string) => void;
  addToCart: (id: string) => void;
}

export interface ProductInfoProps extends Omit<ProductData, 'id'> {
  addToCart: () => void;
  onClose: () => void;
}

export interface CartItem extends ProductData {
  quantity: number;
}

export interface CartProps {
  items: CartItem[];
  removeFromCart: (id: string) => void;
  changeQuantity: (id: string, quantity: number) => void;
}
