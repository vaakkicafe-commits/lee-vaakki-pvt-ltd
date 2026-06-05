import React, { useState } from 'react';
import { UnitNav } from '../components/UnitNav';

// ===== FRESH PRODUCE =====
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

// ===== FROZEN B2B PRODUCTS =====
type B2BProduct = {
  id: string;
  brand: string;
  name: string;
  category: string;
  packSize: string;
  cartonSize: string;
  moqCartons: number;
  suitableFor: string[];
  badge?: string;
  emoji: string;
};

const FROZEN_PRODUCTS: B2BProduct[] = [
  { id: 'p1', brand: 'Farm Form', name: 'Classic French Fries (9mm)', category: 'Fries & Potato', packSize: '2.5 kg bag', cartonSize: '5 x 2.5 kg', moqCartons: 1, suitableFor: ['QSR', 'Cafes', 'Burger Joints'], badge: 'Fast Moving', emoji: '🍟' },
  { id: 'p2', brand: 'Farm Form', name: 'Spicy Potato Wedges', category: 'Fries & Potato', packSize: '1.5 kg bag', cartonSize: '6 x 1.5 kg', moqCartons: 1, suitableFor: ['Cafes', 'Pubs', 'Restaurants'], emoji: '🥔' },
  { id: 'p3', brand: 'Vaakki', name: 'Chicken Nuggets', category: 'Momos & Nuggets', packSize: '1 kg pack', cartonSize: '10 x 1 kg', moqCartons: 2, suitableFor: ['QSR', 'Cafes', 'Retail'], badge: 'Best for QSRs', emoji: '🍗' },
  { id: 'p4', brand: 'Vaakki', name: 'Veg Momos (Darjeeling Style)', category: 'Momos & Nuggets', packSize: '100 pcs bag', cartonSize: '5 bags', moqCartons: 1, suitableFor: ['Street Food', 'Cafes', 'Restaurants'], emoji: '🥟' },
  { id: 'p5', brand: 'Farm Form', name: 'Malabar Paratha', category: 'Breads & Parathas', packSize: '30 pcs pack', cartonSize: '10 packs', moqCartons: 1, suitableFor: ['Dhabas', 'Restaurants', 'Caterers'], emoji: '🫓' },
  { id: 'p6', brand: 'Farm Form', name: 'Aloo Tikki Burger Patty', category: 'Ready-to-Fry Snacks', packSize: '20 pcs pack', cartonSize: '8 packs', moqCartons: 2, suitableFor: ['QSR', 'Burger Joints'], emoji: '🍔' },
  { id: 'p7', brand: 'Vaakki', name: 'Tandoori Mayo', category: 'Sauces & Dips', packSize: '1 kg pouch', cartonSize: '12 pouches', moqCartons: 1, suitableFor: ['QSR', 'Cafes', 'Street Food'], emoji: '🥫' },
  { id: 'p8', brand: 'Lee Vaakki', name: 'Hickory Smoked Veal Strips', category: 'Meats & Cold Cuts', packSize: '280g pack', cartonSize: '20 packs', moqCartons: 1, suitableFor: ['Cafes', 'Restaurants', 'Delis'], badge: 'Premium Halal', emoji: '🥩' },
  { id: 'p9', brand: 'Lee Vaakki', name: 'Chicken Curry Cut Skinless', category: 'Meats & Cold Cuts', packSize: '400g pack', cartonSize: '15 packs', moqCartons: 1, suitableFor: ['Dhabas', 'Restaurants', 'Retail'], emoji: '🍖' },
  { id: 'p10', brand: 'Lee Vaakki', name: 'Popcorn Chicken', category: 'Ready-to-Fry Snacks', packSize: '1.0 kg bag', cartonSize: '6 bags', moqCartons: 1, suitableFor: ['QSR', 'Cafes', 'Food Trucks'], emoji: '🍿' },
  { id: 'p11', brand: 'Lee Vaakki', name: 'Chicken Breast Strips', category: 'Ready-to-Fry Snacks', packSize: '26 pieces pack', cartonSize: '8 packs', moqCartons: 1, suitableFor: ['Cafes', 'Burger Joints', 'QSR'], emoji: '🍗' },
];

const FROZEN_CATEGORIES = ['All', 'Fries & Potato', 'Momos & Nuggets', 'Breads & Parathas', 'Ready-to-Fry Snacks', 'Sauces & Dips', 'Meats & Cold Cuts'];

const STORY_POINTS = [
  { icon: '🌱', title: 'Grown Without Chemicals', desc: 'We use natural composts, cow dung manure and neem-based pest control — no synthetic pesticides.' },
  { icon: '🚰', title: 'Rainwater Harvesting', desc: 'Our farm collects rainwater and uses drip irrigation to minimise waste and conserve groundwater.' },
  { icon: '🌾', title: '3 Acres of Farmland', desc: 'Located adjacent to our cafe operations near Mahabalipuram — supplying produce directly to LV kitchens.' },
  { icon: '🤝', title: 'Zero Food Miles', desc: 'From soil to kitchen in under 24 hours. Our produce feeds LV Cafe, LV Dhaba and direct buyers.' },
];

export default function FarmPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeTab, setActiveTab] = useState<'fresh' | 'frozen'>('fresh');
  const [enquiry, setEnquiry] = useState({ name: '', shopName: '', phone: '', city: '', message: '' });
  const [enquiryStatus, setEnquiryStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const filteredFrozen = activeCategory === 'All'
    ? FROZEN_PRODUCTS
    : FROZEN_PRODUCTS.filter(p => p.category === activeCategory);

  const handleEnquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setEnquiryStatus('submitting');
    setTimeout(() => {
      setEnquiryStatus('success');
      setEnquiry({ name: '', shopName: '', phone: '', city: '', message: '' });
    }, 1000);
  };

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
        .tab-btn { transition: all 0.2s ease; }
        .cat-pill { transition: all 0.2s ease; cursor: pointer; }
        .cat-pill:hover { background: rgba(174,213,129,0.2) !important; }
        input, textarea { outline: none; font-family: inherit; }
        input:focus, textarea:focus { border-color: #aed581 !important; }
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
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15,
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
            🌿 3 ACRES · MAHABALIPURAM · NATURAL FARMING · ❄️ B2B FROZEN FOODS
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem',
          }}>
            From Our Soil &<br />
            <span style={{ color: '#aed581' }}>Cold Chain — To You.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', marginBottom: '2rem' }}>
            LV Farm grows seasonal vegetables and herbs using natural farming. We also supply premium frozen & ready-to-cook B2B products to restaurants, cafes, and retail shops.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/917358096393?text=Hi%20LV%20Farm!%20I'd%20like%20to%20place%20a%20B2B%20order."
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
              }}
            >
              📱 WhatsApp: 7358096393
            </a>
            <button
              onClick={() => document.getElementById('catalogue-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              }}
            >
              Browse Catalogue ↓
            </button>
          </div>

          {/* Trusted Brands */}
          <div style={{ marginTop: '2.5rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(174,213,129,0.15)' }}>
            <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.35)', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Brands We Distribute
            </div>
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontWeight: 800, fontSize: '0.9rem', color: 'rgba(174,213,129,0.7)' }}>
              {['ITC MasterChef', 'CP Easy Snack', 'McCain', 'Sumeru', 'Vaakki'].map(b => (
                <span key={b}>{b}</span>
              ))}
            </div>
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

      {/* ===== CATALOGUE TABS ===== */}
      <section id="catalogue-section" style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>

          {/* Tab Switcher */}
          <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2.5rem', flexWrap: 'wrap' }}>
            <button
              className="tab-btn"
              onClick={() => setActiveTab('fresh')}
              style={{
                padding: '0.65rem 1.5rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.88rem',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'fresh' ? '#aed581' : 'rgba(174,213,129,0.1)',
                color: activeTab === 'fresh' ? '#1b3a1b' : '#aed581',
                boxShadow: activeTab === 'fresh' ? '0 4px 16px rgba(174,213,129,0.3)' : 'none',
              }}
            >
              🌿 Fresh Produce
            </button>
            <button
              className="tab-btn"
              onClick={() => setActiveTab('frozen')}
              style={{
                padding: '0.65rem 1.5rem', borderRadius: '999px', fontWeight: 800, fontSize: '0.88rem',
                border: 'none', cursor: 'pointer',
                background: activeTab === 'frozen' ? '#aed581' : 'rgba(174,213,129,0.1)',
                color: activeTab === 'frozen' ? '#1b3a1b' : '#aed581',
                boxShadow: activeTab === 'frozen' ? '0 4px 16px rgba(174,213,129,0.3)' : 'none',
              }}
            >
              ❄️ Frozen B2B Catalogue
            </button>
          </div>

          {/* ===== FRESH PRODUCE TAB ===== */}
          {activeTab === 'fresh' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Available Now</div>
                <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Fresh from the Farm</h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.25rem' }}>
                {PRODUCE.map(item => (
                  <div key={item.name} className="produce-card" style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '16px', padding: '1.25rem', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}>
                    <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                    <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '0.3rem' }}>{item.name}</div>
                    <div style={{ color: '#aed581', fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{item.season}</div>
                    <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.55, marginBottom: '1rem' }}>{item.desc}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ color: '#aed581', fontWeight: 900, fontSize: '1.05rem' }}>₹{item.price}</span>
                      <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>{item.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ===== FROZEN B2B TAB ===== */}
          {activeTab === 'frozen' && (
            <>
              <div style={{ marginBottom: '2rem' }}>
                <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>B2B Wholesale · For Distributors & Retail Shops</div>
                <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>❄️ Frozen Food Catalogue</h2>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Call <strong style={{ color: '#aed581' }}>7358096393</strong> for today's wholesale pricing.</p>
              </div>

              {/* Category Filters */}
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {FROZEN_CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    className="cat-pill"
                    onClick={() => setActiveCategory(cat)}
                    style={{
                      padding: '0.4rem 1rem', borderRadius: '999px', fontSize: '0.78rem', fontWeight: 700,
                      border: '1px solid',
                      borderColor: activeCategory === cat ? '#aed581' : 'rgba(174,213,129,0.2)',
                      background: activeCategory === cat ? 'rgba(174,213,129,0.2)' : 'transparent',
                      color: activeCategory === cat ? '#aed581' : 'rgba(255,255,255,0.45)',
                    }}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Product Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {filteredFrozen.map(product => (
                  <div key={product.id} className="produce-card" style={{
                    background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(174,213,129,0.1)',
                    borderRadius: '16px', overflow: 'hidden', boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                  }}>
                    {/* Top image area */}
                    <div style={{
                      background: 'linear-gradient(135deg, rgba(27,94,32,0.6) 0%, rgba(56,142,60,0.4) 100%)',
                      padding: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                      position: 'relative',
                    }}>
                      <span style={{ fontSize: '2.8rem' }}>{product.emoji}</span>
                      <div style={{ textAlign: 'right' }}>
                        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: 'rgba(174,213,129,0.7)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{product.brand}</div>
                        {product.badge && (
                          <div style={{
                            marginTop: '0.3rem', background: '#aed581', color: '#1b3a1b',
                            padding: '0.2rem 0.6rem', borderRadius: '6px', fontSize: '0.62rem', fontWeight: 800,
                            letterSpacing: '0.05em', textTransform: 'uppercase',
                          }}>
                            {product.badge}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '1.25rem' }}>
                      <div style={{ fontSize: '0.65rem', color: 'rgba(174,213,129,0.6)', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{product.category}</div>
                      <div style={{ fontWeight: 800, color: '#fff', fontSize: '0.95rem', marginBottom: '1rem' }}>{product.name}</div>

                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
                        {[
                          { label: 'Pack Size', val: product.packSize },
                          { label: 'Carton Size', val: product.cartonSize },
                          { label: 'MOQ', val: `${product.moqCartons} Carton(s)` },
                        ].map(row => (
                          <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '0.35rem' }}>
                            <span style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.35)' }}>{row.label}</span>
                            <span style={{ fontSize: '0.72rem', color: '#fff', fontWeight: 700 }}>{row.val}</span>
                          </div>
                        ))}
                        <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.2rem' }}>
                          Suitable for: {product.suitableFor.join(', ')}
                        </div>
                      </div>

                      <a
                        href={`https://wa.me/917358096393?text=Hi Lee Vaakki Farm, I'd like to enquire about wholesale pricing for ${product.name} (${product.cartonSize}).`}
                        target="_blank" rel="noreferrer"
                        style={{
                          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem',
                          background: '#25D366', color: '#fff', borderRadius: '8px',
                          padding: '0.55rem', fontWeight: 800, fontSize: '0.78rem',
                          textDecoration: 'none', transition: 'opacity 0.2s',
                        }}
                        onMouseOver={e => (e.currentTarget.style.opacity = '0.85')}
                        onMouseOut={e => (e.currentTarget.style.opacity = '1')}
                      >
                        💬 Send Enquiry on WhatsApp
                      </a>
                    </div>
                  </div>
                ))}
              </div>

              {/* How to Order */}
              <div style={{ marginTop: '4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
                  <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Simple Process</div>
                  <h2 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900 }}>How to Order</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem' }}>
                  {[
                    { step: '1', icon: '📦', title: 'Browse & Select', desc: 'Check our catalogue for product details, pack sizes, and carton quantities.' },
                    { step: '2', icon: '📞', title: 'Call or WhatsApp', desc: 'Contact our sales team at 7358096393 to confirm pricing, stock and MOQ.' },
                    { step: '3', icon: '🚚', title: 'Delivery Dispatch', desc: 'Once confirmed, we dispatch via our cold-chain network to your shop.' },
                  ].map(s => (
                    <div key={s.step} style={{
                      background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(174,213,129,0.15)',
                      borderRadius: '16px', padding: '1.5rem', textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{s.icon}</div>
                      <div style={{ color: '#aed581', fontWeight: 900, fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>Step {s.step}</div>
                      <div style={{ color: '#fff', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.5rem' }}>{s.title}</div>
                      <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.6 }}>{s.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Service Areas */}
              <div style={{ marginTop: '3rem', textAlign: 'center', background: 'rgba(174,213,129,0.05)', border: '1px solid rgba(174,213,129,0.15)', borderRadius: '16px', padding: '2rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>📍</div>
                <div style={{ color: '#aed581', fontWeight: 700, fontSize: '0.7rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Service Areas</div>
                <p style={{ color: '#fff', fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>
                  Chennai, Bangalore & Surrounding Regions
                </p>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.82rem' }}>
                  Minimum order value applies per delivery route (e.g. ₹5,000 per route).<br />
                  Contact us for exact delivery schedules in your locality.
                </p>
              </div>

              {/* Quick Enquiry Form */}
              <div style={{ marginTop: '3rem', maxWidth: '700px', margin: '3rem auto 0' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div style={{ color: '#aed581', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Bulk Orders</div>
                  <h2 style={{ color: '#fff', fontSize: 'clamp(1.4rem, 3vw, 2rem)', fontWeight: 900 }}>Quick Enquiry</h2>
                  <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', marginTop: '0.5rem' }}>Our sales team will call you back within 24 hours.</p>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(174,213,129,0.15)', borderRadius: '20px', padding: '2rem' }}>
                  {enquiryStatus === 'success' ? (
                    <div style={{ textAlign: 'center', padding: '2rem', color: '#aed581' }}>
                      <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                      <h3 style={{ fontWeight: 800, marginBottom: '0.5rem' }}>Enquiry Received!</h3>
                      <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem' }}>Our team will contact you shortly.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleEnquiry} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                          { label: 'Your Name *', key: 'name', placeholder: 'John Doe' },
                          { label: 'Shop / Business Name *', key: 'shopName', placeholder: 'My Cafe' },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#aed581', marginBottom: '0.4rem' }}>{f.label}</label>
                            <input
                              required value={enquiry[f.key as keyof typeof enquiry]}
                              onChange={e => setEnquiry({ ...enquiry, [f.key]: e.target.value })}
                              placeholder={f.placeholder}
                              style={{
                                width: '100%', padding: '0.75rem', borderRadius: '8px',
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(174,213,129,0.2)',
                                color: '#fff', fontSize: '0.85rem',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        {[
                          { label: 'Phone Number *', key: 'phone', placeholder: '10-digit number', type: 'tel' },
                          { label: 'City / Area *', key: 'city', placeholder: 'e.g. Chennai' },
                        ].map(f => (
                          <div key={f.key}>
                            <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#aed581', marginBottom: '0.4rem' }}>{f.label}</label>
                            <input
                              required type={f.type || 'text'} value={enquiry[f.key as keyof typeof enquiry]}
                              onChange={e => setEnquiry({ ...enquiry, [f.key]: e.target.value })}
                              placeholder={f.placeholder}
                              style={{
                                width: '100%', padding: '0.75rem', borderRadius: '8px',
                                background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(174,213,129,0.2)',
                                color: '#fff', fontSize: '0.85rem',
                              }}
                            />
                          </div>
                        ))}
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 700, color: '#aed581', marginBottom: '0.4rem' }}>What are you looking for? (Optional)</label>
                        <textarea
                          value={enquiry.message}
                          onChange={e => setEnquiry({ ...enquiry, message: e.target.value })}
                          placeholder="e.g. I need 50 cartons of French Fries per month."
                          rows={3}
                          style={{
                            width: '100%', padding: '0.75rem', borderRadius: '8px',
                            background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(174,213,129,0.2)',
                            color: '#fff', fontSize: '0.85rem', resize: 'vertical',
                          }}
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={enquiryStatus === 'submitting'}
                        style={{
                          background: '#aed581', color: '#1b3a1b', border: 'none',
                          borderRadius: '999px', padding: '0.85rem', fontWeight: 800, fontSize: '0.9rem',
                          cursor: 'pointer', marginTop: '0.5rem',
                          opacity: enquiryStatus === 'submitting' ? 0.7 : 1,
                        }}
                      >
                        {enquiryStatus === 'submitting' ? 'Submitting...' : '📧 Send Enquiry'}
                      </button>
                    </form>
                  )}
                </div>
              </div>
            </>
          )}
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
            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.4rem', marginBottom: '0.4rem' }}>Need regular supply?</h3>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', maxWidth: '420px', lineHeight: 1.6 }}>
              We supply restaurants, hotels and households with consistent fresh produce and frozen goods. Contact us for weekly or monthly packages.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <a href="tel:7358096393" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#aed581', color: '#1b5e20',
              borderRadius: '999px', padding: '0.75rem 1.75rem',
              fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
            }}>
              📞 7358096393
            </a>
            <a href="mailto:farm@leevaakki.com" style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff',
              borderRadius: '999px', padding: '0.75rem 1.75rem',
              fontWeight: 800, fontSize: '0.88rem', textDecoration: 'none',
            }}>
              📧 Email Us
            </a>
          </div>
        </div>
      </section>

      <footer style={{ background: '#050d05', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        © 2026 LV Farm · A Lee Vaakki Pvt Ltd Venture · 7358096393
      </footer>
    </div>
  );
}
