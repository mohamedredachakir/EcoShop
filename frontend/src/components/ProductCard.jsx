import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#f9f9f9' }}>
        <img 
          src={product.image_url || product.image || 'https://images.unsplash.com/photo-1591336361888-4baf571fa446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'} 
          alt={product.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
        />
        {product.isNew && (
          <span className="badge badge-eco" style={{ position: 'absolute', top: '12px', right: '12px' }}>
            New
          </span>
        )}
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ fontSize: '12px', color: 'var(--primary)', fontWeight: 600, textTransform: 'uppercase', marginBottom: '4px' }}>
          {product.category}
        </div>
        <h4 style={{ marginBottom: '8px', fontSize: '18px' }}>{product.name}</h4>
        <p style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '16px', flex: 1 }}>
          {product.description}
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
          <span style={{ fontWeight: 700, fontSize: '20px' }}>${product.price}</span>
          <button 
            className="btn btn-primary" 
            style={{ padding: '10px', borderRadius: '12px' }}
            onClick={() => addToCart(product)}
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
