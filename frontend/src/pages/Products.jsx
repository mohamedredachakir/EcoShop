import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal, ChevronDown, Search, Loader2 } from 'lucide-react';
import api from '../services/api';

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [productsRes, categoriesRes] = await Promise.all([
          api.get('/products'),
          api.get('/categories')
        ]);
        setProducts(productsRes.data);
        setCategories(['All', ...categoriesRes.data.map(c => c.name)]);
      } catch (error) {
        console.error('Failed to fetch data', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category?.name === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="products-page" style={{ padding: '40px 0' }}>
      <div className="container">
        <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <h1 style={{ fontSize: '40px', marginBottom: '8px' }}>Sustainable Collection</h1>
            <p style={{ color: 'var(--on-surface-variant)' }}>Showing {filteredProducts.length} high-impact products.</p>
          </div>
          
          <div style={{ position: 'relative', width: '300px' }}>
            <Search style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--outline)' }} size={18} />
            <input 
              type="text" 
              placeholder="Search products..." 
              className="input-field"
              style={{ paddingLeft: '48px' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar Filters */}
          <aside style={{ width: '260px', flexShrink: 0 }}>
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Filter size={18} /> Categories
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {categories.map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      textAlign: 'left',
                      padding: '8px 0',
                      color: activeCategory === cat ? 'var(--primary)' : 'var(--on-surface-variant)',
                      fontWeight: activeCategory === cat ? 600 : 400,
                      transition: 'all 0.2s'
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <h3 style={{ fontSize: '18px', marginBottom: '20px' }}>Price Range</h3>
              <input type="range" style={{ width: '100%', accentColor: 'var(--primary)' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', marginTop: '8px', color: 'var(--on-surface-variant)' }}>
                <span>$0</span>
                <span>$100+</span>
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div style={{ flex: 1 }}>
            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '100px 0' }}>
                <Loader2 className="animate-spin text-primary" size={48} />
              </div>
            ) : (
              <>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'flex-end', 
                  marginBottom: '24px',
                  gap: '16px' 
                }}>
                  <button style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    border: '1px solid var(--outline-variant)',
                    fontSize: '14px'
                  }}>
                    Sort by: Featured <ChevronDown size={16} />
                  </button>
                </div>

                {filteredProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '64px 0' }}>
                    <p style={{ fontSize: '18px', color: 'var(--on-surface-variant)' }}>No products found matching your criteria.</p>
                  </div>
                ) : (
                  <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '32px'
                  }}>
                    {filteredProducts.map(product => (
                      <ProductCard key={product.id} product={{
                        ...product,
                        category: product.category?.name,
                      }} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Products;
