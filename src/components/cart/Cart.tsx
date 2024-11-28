import React from 'react';
import { CartProps } from '../../types/product';
import styles from './style/Cart.module.scss';

const Cart: React.FC<CartProps> = ({
  items,
  removeFromCart,
  changeQuantity,
}) => {
  const handleQuantityChange = (id: string, increment: boolean) => {
    const item = items.find((item) => item.id === id);
    if (!item) return;
    const newQuantity = increment ? item.quantity + 1 : item.quantity - 1;
    changeQuantity(id, Math.max(newQuantity, 1));
  };

  return (
    <div className={styles.cart}>
      <h2 className={styles.title}>Cart</h2>
      {items.length === 0 ? (
        <p className={styles.empty}>Your cart is empty</p>
      ) : (
        <ul className={styles.list}>
          {items.map((item) => (
            <li key={item.id} className={styles.item}>
              {item.image && (
                <img
                  src={item.image}
                  alt={item.title}
                  className={styles.image}
                />
              )}
              <div className={styles.info}>
                <h3 className={styles.name}>{item.title}</h3>
                {item.price && <p className={styles.price}>${item.price}</p>}
                <div className={styles.quantity}>
                  <button
                    className={styles.button}
                    onClick={() => handleQuantityChange(item.id, false)}
                  >
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    className={styles.button}
                    onClick={() => handleQuantityChange(item.id, true)}
                  >
                    +
                  </button>
                </div>
              </div>
              {item.description && (
                <div className={styles.descBox}>
                  <p className={styles.description}>{item.description}</p>
                </div>
              )}
              <button
                className={styles.remove}
                onClick={() => removeFromCart(item.id)}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Cart;
