import React from 'react';
import { ProductInfoProps } from '../../types/product';
import styles from './style/ProductInfo.module.scss';

const ProductInfo: React.FC<ProductInfoProps> = ({
  title,
  image,
  price,
  description,
  addToCart,
  onClose,
}) => {
  return (
    <div className={styles.container}>
      <button onClick={onClose} className={styles.closeButton}>
        &times;
      </button>
      {image && <img src={image} alt={title} className={styles.image} />}
      <h2 className={styles.title}>{title}</h2>
      {price && <p className={styles.price}>${price}</p>}
      {description && <p className={styles.description}>{description}</p>}
      <button onClick={() => addToCart()} className={styles.addButton}>
        add to cart
      </button>
    </div>
  );
};

export default ProductInfo;
