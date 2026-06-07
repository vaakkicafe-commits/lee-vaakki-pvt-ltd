import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function DhabaGateway() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#1a0800', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        .fade-in { animation: fadeIn 0.8s ease forwards; }
        .slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .delay-1 { animation-delay: 0.1s; }
        .delay-2 { animation-delay: 0.2s; }
        
        .gateway-card {
          flex: 1;
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          min-height: 280px;
          border: 1px solid rgba(255,255,255,0.05);
        }
        .gateway-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          border-color: rgba(243,156,18,0.4);
        }
        .gateway-card:hover .bg-img {
          transform: scale(1.05);
          opacity: 0.4;
        }
        .gateway-card .bg-img {
          position: absolute; inset: 0;
          background-size: cover; background-position: center;
          opacity: 0.25; transition: all 0.6s ease;
        }
        .gateway-card .overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(26,8,0,0.95) 0%, rgba(26,8,0,0.4) 50%, transparent 100%);
        }
        .gateway-content {
          position: absolute; bottom: 0; left: 0; right: 0;
          padding: 2.5rem;
          display: flex; flexDirection: column; gap: 0.5rem;
        }
      `}</style>

      {/* Header */}
      <header className="fade-in" style={{ padding: '2rem', textAlign: 'center', zIndex: 10 }}>
        <a href="/" style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.6rem' }}>
          <span style={{ fontSize: '1.8rem' }}>🍛</span>
          <span style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '0.04em' }}>
            LV <span style={{ color: '#f39c12' }}>DHABA</span>
          </span>
        </a>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '0 2rem 4rem', zIndex: 10 }}>
        <div className="slide-up" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h1 style={{ color: '#fff', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, marginBottom: '1rem', letterSpacing: '-0.02em' }}>
            Welcome to LV Dhaba
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Authentic, wholesome, and pure veg home-style cooking. How would you like to experience us today?
          </p>
        </div>

        <div style={{ display: 'flex', gap: '2rem', width: '100%', maxWidth: '1000px', flexWrap: 'wrap' }}>
          
          {/* DINE IN CARD */}
          <div 
            className="gateway-card slide-up delay-1" 
            onClick={() => navigate('/dhaba/dinein')}
            style={{ background: 'linear-gradient(135deg, #7b1818 0%, #c0392b 100%)' }}
          >
            <div className="bg-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1600)' }} />
            <div className="overlay" />
            <div className="gateway-content">
              <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, color: '#f39c12', width: 'fit-content', marginBottom: '0.5rem', border: '1px solid rgba(243,156,18,0.3)' }}>
                📍 CHENNAI - OMR
              </div>
              <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800 }}>Dine-In & Takeaway</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                Visit our rustic dhaba to enjoy hot rotis straight from the tawa and full hearty thalis.
              </p>
              <div style={{ color: '#f39c12', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Explore Menu <span>→</span>
              </div>
            </div>
          </div>

          {/* CLOUD KITCHEN CARD */}
          <div 
            className="gateway-card slide-up delay-2"
            onClick={() => navigate('/dhaba/cloud/mahabalipuram')}
            style={{ background: 'linear-gradient(135deg, #2d0a00 0%, #5a1800 100%)' }}
          >
            <div className="bg-img" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1600)' }} />
            <div className="overlay" />
            <div className="gateway-content">
              <div style={{ display: 'inline-block', background: 'rgba(0,0,0,0.3)', padding: '0.4rem 0.8rem', borderRadius: '999px', fontSize: '0.75rem', fontWeight: 800, color: '#f39c12', width: 'fit-content', marginBottom: '0.5rem', border: '1px solid rgba(243,156,18,0.3)' }}>
                🛵 MAHABALIPURAM
              </div>
              <h2 style={{ color: '#fff', fontSize: '2rem', fontWeight: 800 }}>Cloud Kitchen Delivery</h2>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                Same great flavors delivered hot and fresh directly to your door via Swiggy and Zomato.
              </p>
              <div style={{ color: '#f39c12', fontWeight: 800, fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Order Now <span>→</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <footer className="fade-in" style={{ padding: '2rem', textAlign: 'center', color: 'rgba(255,255,255,0.3)', fontSize: '0.8rem' }}>
        © 2026 LV Dhaba · A Lee Vaakki Pvt Ltd Venture
      </footer>
    </div>
  );
}
