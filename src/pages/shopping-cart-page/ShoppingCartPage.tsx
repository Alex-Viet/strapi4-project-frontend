import React, { useState } from 'react';
import Cart from '../../components/cart/Cart';
import { mockProducts } from '../../mocks/products';
import { CartItem } from '../../types/product';
import styles from './style/ShoppingCart.module.scss';

const ShoppingCartPage: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>(
    mockProducts.map((product) => ({
      ...product,
      quantity: 1,
    })),
  );

  const handleRemoveFromCart = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, quantity } : item)),
    );
  };

  return (
    <div className={styles.container}>
      <Cart
        items={cartItems}
        removeFromCart={handleRemoveFromCart}
        changeQuantity={handleQuantityChange}
      />
    </div>
  );
};

export default ShoppingCartPage;
