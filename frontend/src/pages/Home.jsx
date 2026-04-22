import React from 'react';
import { ArrowRight, Star, ShieldCheck, Truck } from 'lucide-react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section style={{
        padding: '80px 0',
        backgroundColor: 'var(--surface-container-low)',
        overflow: 'hidden',
        position: 'relative'
      }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '64px',
          alignItems: 'center'
        }}>
          <div>
            <span className="badge badge-eco" style={{ marginBottom: '16px' }}>
              Sustainable Choice
            </span>
            <h1 style={{ fontSize: '56px', marginBottom: '24px' }}>
              Kind to you, <br />
              <span className="text-primary">Kind to Earth.</span>
            </h1>
            <p style={{ fontSize: '18px', color: 'var(--on-surface-variant)', marginBottom: '32px', maxWidth: '480px' }}>
              Discover curated eco-friendly essentials that don't compromise on quality or style. Join our community of conscious consumers.
            </p>
            <div style={{ display: 'flex', gap: '16px' }}>
              <Link to="/products" className="btn btn-primary">
                Shop Collection <ArrowRight size={20} style={{ marginLeft: '8px' }} />
              </Link>
              <Link to="/about" className="btn btn-secondary">
                Learn Our Story
              </Link>
            </div>
          </div>
          <div style={{ position: 'relative' }}>
             <img 
               src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
               alt="Eco products" 
               style={{ 
                 width: '100%', 
                 borderRadius: '24px', 
                 boxShadow: '0 20px 40px rgba(0,0,0,0.1)' 
               }} 
             />
             <div style={{
               position: 'absolute',
               bottom: '-20px',
               left: '-20px',
               backgroundColor: 'white',
               padding: '24px',
               borderRadius: '16px',
               boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
               display: 'flex',
               gap: '16px',
               alignItems: 'center'
             }}>
               <div style={{ backgroundColor: 'var(--primary-container)', padding: '12px', borderRadius: '12px' }}>
                 <ShieldCheck className="text-primary" />
               </div>
               <div>
                 <div style={{ fontWeight: 700 }}>100% Certified</div>
                 <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)' }}>Organic & Ethical</div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section style={{ padding: '64px 0' }}>
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '32px'
        }}>
          {[
            { icon: <Truck />, title: 'Carbon Neutral Delivery', desc: 'Every shipment is carbon offset through verified projects.' },
            { icon: <Star />, title: 'Premium Quality', desc: 'Sustainable materials that are built to last a lifetime.' },
            { icon: <ShieldCheck />, title: 'Transparent Sourcing', desc: 'Know exactly where and how your products are made.' }
          ].map((feature, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px' }}>
              <div style={{ 
                color: 'var(--primary)', 
                backgroundColor: 'var(--primary-container)', 
                padding: '16px', 
                borderRadius: '50%',
                height: 'fit-content'
              }}>
                {feature.icon}
              </div>
              <div>
                <h3 style={{ fontSize: '18px', marginBottom: '8px' }}>{feature.title}</h3>
                <p style={{ color: 'var(--on-surface-variant)', fontSize: '14px' }}>{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products teaser */}
      <section style={{ padding: '80px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
            <div>
              <h2 style={{ fontSize: '32px' }}>Featured Essentials</h2>
              <p style={{ color: 'var(--on-surface-variant)' }}>Our best-selling sustainable swaps.</p>
            </div>
            <Link to="/products" className="text-primary" style={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
              View All <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}>
            {[1, 2, 3, 4].map(item => (
              <div key={item} className="card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ position: 'relative', aspectRatio: '1', backgroundColor: '#f0f0f0' }}>
                  <img src={`https://images.unsplash.com/photo-1591336361888-4baf571fa446?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80`} alt="Product" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span className="badge badge-eco" style={{ position: 'absolute', top: '12px', right: '12px' }}>New</span>
                </div>
                <div style={{ padding: '20px' }}>
                  <h4 style={{ marginBottom: '4px' }}>Bamboo Cutlery Set</h4>
                  <div style={{ fontSize: '14px', color: 'var(--on-surface-variant)', marginBottom: '12px' }}>Travel Essentials</div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 700, fontSize: '18px' }}>$24.00</span>
                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '14px' }}>Add</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
