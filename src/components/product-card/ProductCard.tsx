import React from 'react';
import { ProductCardProps } from '../../types/product';
import styles from './style/ProductCard.module.scss';

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  image,
  price,
  viewDetails,
  addToCart,
}) => {
  return (
    <div className={styles.card}>
      {image && <img src={image} alt={title} className={styles.image} />}
      <h3 className={styles.title}>{title}</h3>
      {price && <p className={styles.price}>${price}</p>}
      <div className={styles.actions}>
        {viewDetails && (
          <button
            onClick={() => viewDetails(id!)}
            className={styles.detailsButton}
          >
            details
          </button>
        )}
        <button onClick={() => addToCart(id)} className={styles.addButton}>
          add to cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
