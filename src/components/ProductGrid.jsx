import React from 'react';
import { ProductCard } from './ProductCard';

export const ProductGrid = ({ products, onQuickView, emptyMessage = 'No products found matching your criteria.' }) => {
  if (!products || products.length === 0) {
    return (
      <div className="empty-products-box">
        <div className="empty-icon">🌱</div>
        <h3>No Products Found</h3>
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="products-grid">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
};
