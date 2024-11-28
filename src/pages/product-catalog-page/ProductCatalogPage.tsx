import React, { useState } from 'react';
import ProductCard from '../../components/product-card/ProductCard';
import ProductInfo from '../../components/product-info/ProductInfo';
import { mockProducts } from '../../mocks/products';
import { ProductData } from '../../types/product';
import styles from './style/ProductCatalog.module.scss';

const ProductCatalogPage: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductData | null>(
    null,
  );

  const handleViewDetails = (id: string) => {
    const product = mockProducts.find((prod) => prod.id === id);
    setSelectedProduct(product || null);
  };

  const handleAddToCart = (id: string) => {
    console.log('Added to cart:', id);
  };

  return (
    <div className={styles.container}>
      <div className={styles.cards}>
        {mockProducts.map((product) => (
          <ProductCard
            key={product.id}
            {...product}
            viewDetails={handleViewDetails}
            addToCart={handleAddToCart}
          />
        ))}
      </div>
      {selectedProduct && (
        <ProductInfo
          {...selectedProduct}
          addToCart={() => handleAddToCart(selectedProduct.id)}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default ProductCatalogPage;
