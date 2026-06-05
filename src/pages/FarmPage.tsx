import React from 'react';
import { UnitNav } from '../components/UnitNav';

const PRODUCE = [
  { name: 'Curry Leaf Bunches', unit: 'per bunch', price: 20, season: 'Year Round', icon: '🌿', desc: 'Freshly harvested aromatic curry leaves — essential for South Indian tempering.' },
  { name: 'Country Tomatoes', unit: 'per kg', price: 45, season: 'Oct – Mar', icon: '🍅', desc: 'Vine-ripened desi tomatoes, firm and tangy — grown without chemical pesticides.' },
  { name: 'Ladies Finger (Okra)', unit: 'per kg', price: 40, season: 'Jun – Sep', icon: '🫑', desc: 'Tender, fresh-picked okra from our raised beds. Best for sambar and fry.' },
  { name: 'Moringa Drumsticks', unit: 'per kg', price: 55, season: 'Year Round', icon: '🌱', desc: 'Nutrient-dense drumsticks straight from the tree — zero food miles.' },
  { name: 'Brinjal (Eggplant)', unit: 'per kg', price: 35, season: 'Year Round', icon: '🍆', desc: 'Glossy purple brinjals great for bharwa, gothsu or curry.' },
  { name: 'Fresh Coriander', unit: 'per bunch', price: 15, season: 'Nov – Feb', icon: '🪴', desc: 'Hand-cut coriander packed with flavour — perfect garnish for any dish.' },
  { name: 'Green Chillies', unit: 'per 250g', price: 25, season: 'Year Round', icon: '🌶️', desc: 'Medium-hot country green chillies, naturally grown on our farm.' },
  { name: 'Seasonal Greens Box', unit: 'weekly box', price: 199, season: 'Rotating', icon: '📦', desc: 'Curated weekly box of 6–8 seasonal vegetables from the farm, delivered fresh.' },
];

const STORY_POINTS = [
  { icon: '🌱', title: 'Grown Without Chemicals', desc: 'We use natural composts, cow dung manure and neem-based pest control — no synthetic pesticides.' },
  { icon: '🚰', title: 'Rainwater Harvesting', desc: 'Our farm collects rainwater and uses drip irrigation to minimise waste and conserve groundwater.' },
  { icon: '🌾', title: '3 Acres of Farmland', desc: 'Located adjacent to our cafe operations near Mahabalipuram — supplying produce directly to LV kitchens.' },
  { icon: '🤝', title: 'Zero Food Miles', desc: 'From soil to kitchen in under 24 hours. Our produce feeds LV Cafe, LV Dhaba and direct buyers.' },
];

export default function FarmPage() {
  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#0d1a0a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
        .produce-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .produce-card:hover { transform: translateY(-5px); box-shadow: 0 14px 32px rgba(0,0,0,0.3) !important; }
      `}</style>

      <UnitNav unitName="Farm" unitIcon="🌾" accentColor="#aed581" bgColor="#1b3a1b" />

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '460px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #1b5e20 0%, #2e7d32 60%, #388e3c 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1500937386664-56d1dfef3854?q=80&w=1600)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(27,94,32,0.95) 0%, rgba(27,94,32,0.55) 60%, transparent 100%)',
        }} />

        <div className="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '4.5rem 2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(174,213,129,0.12)', border: '1px solid rgba(174,213,129,0.3)',
            borderRadius: '999px', padding: '0.3rem 0.9rem',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#aed581', marginBottom: '1.25rem',
          }}>
            🌿 3 ACRES · MAHABALIPURAM · NATURAL FARMING
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem',
          }}>
            From Our Soil<br />
            <span style={{ color: '#aed581' }}>To Your Table.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '460px', marginBottom: '2rem' }}>
            LV Farm grows seasonal vegetables, herbs and greens using natural farming practices — supplying our kitchens and local buyers near Mahabalipuram.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/919999999999?text=Hi%20LV%20Farm!%20I'd%20like%20to%20order%20fresh%20produce."
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
              }}
            >
              📱 Order Produce
            </a>
            <button
              onClick={() => document.getElementById('produce-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              }}
            >
              See What's Fresh ↓
            </button>
          </div>
        </div>
      </section>

      {/* ===== OUR STORY ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            How We Grow
          </div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
            Responsible Farming at Every Step
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.25rem' }}>
          {STORY_POINTS.map(pt => (
            <div key={pt.title} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(174,213,129,0.15)',
              borderRadius: '16px', padding: '1.5rem',
            }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '0.75rem' }}>{pt.icon}</div>
              <div style={{ color: '#aed581', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.4rem' }}>{pt.title}</div>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.6 }}>{pt.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ===== PRODUCE ===== */}
      <section id="produce-section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>
              Available Now
            </div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>
              Fresh from the Farm
            </h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
            {PRODUCE.map(item => (
              <div
                key={item.name}
                className="produce-card"
                style={{
                  background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '16px', padding: '1.25rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{item.name}</div>
                <div style={{ color: '#aed581', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                  {item.season}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.55, marginBottom: '1rem' }}>
                  {item.desc}
                </p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#aed581', fontWeight: 900, fontSize: '1.05rem' }}>₹{item.price}</span>
                  <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>{item.unit}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== ENQUIRY BANNER ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
          borderRadius: '20px', padding: '2.5rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1.5rem',
          boxShadow: '0 12px 40px rgba(46,125,50,0.25)',
        }}>
          <div>
            <div style={{ color: '#aed581', fontWeight: 700, fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Bulk & Restaurant Orders
            </div>
            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.4rem' }}>
              Need regular supply?
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', maxWidth: '420px', lineHeight: 1.6 }}>
              We supply restaurants, hotels and households with consistent fresh produce. Contact us for weekly or monthly packages.
            </p>
          </div>
          <a
            href="mailto:farm@leevaakki.com"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#aed581', color: '#1b5e20',
              borderRadius: '999px', padding: '0.75rem 1.75rem',
              fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
            }}
          >
            📧 Get in Touch
          </a>
        </div>
      </section>

      <footer style={{ background: '#050d05', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        © 2026 LV Farm · A Lee Vaakki Pvt Ltd Venture
      </footer>
    </div>
  );
}
