import React, { useState } from 'react';
import { UnitNav } from '../components/UnitNav';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// ===== DATA CONFIG =====

const DHABA_MENU = [
  {
    category: 'Dal & Curries',
    icon: '🍲',
    items: [
      { name: 'Dal Tadka', price: 90, desc: 'Yellow lentils tempered with ghee, cumin and dried red chillies.', bestseller: true },
      { name: 'Dal Makhani', price: 110, desc: 'Slow-cooked black lentils in a rich buttery tomato gravy.', bestseller: false },
      { name: 'Paneer Butter Masala', price: 140, desc: 'Soft paneer cubes in a velvety, aromatic tomato-cashew sauce.', bestseller: true },
      { name: 'Aloo Gobi', price: 95, desc: 'Potato and cauliflower dry-sautéed with turmeric and spices.', bestseller: false },
    ],
  },
  {
    category: 'Breads',
    icon: '🫓',
    items: [
      { name: 'Tawa Roti', price: 15, desc: 'Soft whole-wheat flatbread cooked fresh on an iron tawa.', bestseller: true },
      { name: 'Butter Naan', price: 35, desc: 'Leavened bread baked in a tandoor, slathered with fresh butter.', bestseller: true },
      { name: 'Laccha Paratha', price: 40, desc: 'Flaky, layered whole-wheat bread cooked with desi ghee.', bestseller: false },
      { name: 'Puri', price: 20, desc: 'Deep-fried golden puffed bread, perfect with sabzi or aachar.', bestseller: false },
    ],
  },
  {
    category: 'Rice & Thali',
    icon: '🍚',
    items: [
      { name: 'Jeera Rice', price: 70, desc: 'Fragrant basmati rice seasoned with cumin and pure ghee.', bestseller: false },
      { name: 'Rajma Chawal', price: 120, desc: 'Hearty kidney bean curry served over steamed basmati rice.', bestseller: true },
      { name: 'Full Dhaba Thali', price: 180, desc: 'Dal, 2 sabzi, rice, 4 rotis, salad, papad & sweet — complete meal.', bestseller: true },
      { name: 'Veg Biryani', price: 150, desc: 'Aromatic basmati layered with seasonal vegetables and saffron.', bestseller: false },
    ],
  },
  {
    category: 'Snacks & Starters',
    icon: '🥣',
    items: [
      { name: 'Masala Papad', price: 40, desc: 'Crispy papad topped with onion, tomato, coriander and chaat masala.', bestseller: false },
      { name: 'Aloo Tikki', price: 60, desc: 'Golden potato patties served with green chutney and tamarind sauce.', bestseller: true },
      { name: 'Samosa (2 pcs)', price: 30, desc: 'Flaky pastry stuffed with spiced potato and peas, served hot.', bestseller: false },
      { name: 'Lassi', price: 55, desc: 'Chilled hand-churned yoghurt drink — sweet or salted.', bestseller: true },
    ],
  },
];

const LOCATIONS = {
  dineIn: [
    {
      id: 'omr',
      name: 'Chennai – OMR',
      type: 'dinein',
      address: 'LV Dhaba, Near ECR Highway, Mahabalipuram, Tamil Nadu – 603104',
      phone: '+91 99999 99999',
      timings: 'Open Daily 7 AM – 11 PM',
      orderDirectUrl: '/dhaba/dinein',
      swiggyLink: null,  // coming soon
      zomatoLink: null,  // coming soon
      mapLink: 'https://maps.app.goo.gl/qx8JhX2z6xJLmMDA6',
      navigateTo: '/dhaba/dinein',  // external route — opens Dhaba site
    }
  ],
  cloud: [
    {
      id: 'mahabalipuram',
      name: 'Mahabalipuram',
      type: 'cloud',
      address: 'Cloud Kitchen (Delivery Only), Mahabalipuram, Tamil Nadu – 603104',
      phone: '+91 88888 88888',
      timings: 'Delivery Only 11 AM – 11 PM',
      orderDirectUrl: null,
      swiggyLink: null,  // coming soon
      zomatoLink: null,  // coming soon
      mapLink: null,
      navigateTo: '/dhaba/cloud/mahabalipuram',  // opens cloud kitchen page
    }
  ]
};

// Find location helper
const getLocationById = (id: string) => {
  return LOCATIONS.dineIn.find(l => l.id === id) || LOCATIONS.cloud.find(l => l.id === id) || LOCATIONS.dineIn[0];
};

// ===== LOCATION SELECTOR COMPONENT =====
function DhabaLocationSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<'dineIn' | 'cloud'>('dineIn');

  const handleSelect = (loc: any) => {
    setIsOpen(false);
    if (loc.navigateTo.startsWith('http')) {
      window.location.href = loc.navigateTo;
    } else if (window.location.pathname === loc.navigateTo || window.location.pathname === loc.navigateTo + '/') {
      // Already on this page — scroll to menu instead of reloading
      document.getElementById('dhaba-menu')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.pathname = loc.navigateTo;
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 100 }}>
      {/* Pill Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff', borderRadius: '999px', padding: '0.5rem 1rem',
          fontSize: '0.85rem', fontWeight: 700, cursor: 'pointer',
          transition: 'background 0.2s'
        }}
      >
        <span>📍 Select Location ▾</span>
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <>
          <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 8px)', right: 0,
            background: '#2d0a00', border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '12px', width: '300px', boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            overflow: 'hidden'
          }}>
            {/* Tabs */}
            <div style={{ display: 'flex', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <button
                onClick={() => setActiveTab('dineIn')}
                style={{
                  flex: 1, padding: '0.75rem', border: 'none',
                  background: activeTab === 'dineIn' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: activeTab === 'dineIn' ? '#f39c12' : 'rgba(255,255,255,0.6)',
                  fontWeight: activeTab === 'dineIn' ? 800 : 600,
                  fontSize: '0.8rem', cursor: 'pointer'
                }}
              >🍽️ Dine-in</button>
              <button
                onClick={() => setActiveTab('cloud')}
                style={{
                  flex: 1, padding: '0.75rem', border: 'none',
                  background: activeTab === 'cloud' ? 'rgba(255,255,255,0.05)' : 'transparent',
                  color: activeTab === 'cloud' ? '#f39c12' : 'rgba(255,255,255,0.6)',
                  fontWeight: activeTab === 'cloud' ? 800 : 600,
                  fontSize: '0.8rem', cursor: 'pointer'
                }}
              >🛵 Cloud Kitchen</button>
            </div>

            {/* List */}
            <div style={{ padding: '0.5rem' }}>
              {(activeTab === 'dineIn' ? LOCATIONS.dineIn : LOCATIONS.cloud).map(loc => (
                <button
                  key={loc.id}
                  onClick={() => handleSelect(loc)}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    width: '100%', textAlign: 'left',
                    padding: '0.85rem 1rem', border: 'none', borderRadius: '8px',
                    background: 'transparent',
                    color: '#fff', fontSize: '0.85rem', fontWeight: 600,
                    cursor: 'pointer', marginBottom: '2px',
                    transition: 'background 0.15s'
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(243,156,18,0.1)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <span>{loc.name}</span>
                  <span style={{ color: '#f39c12', fontSize: '0.75rem' }}>
                    {activeTab === 'dineIn' ? 'Open site →' : 'Open kitchen →'}
                  </span>
                </button>
              ))}
            </div>

            <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid rgba(255,255,255,0.07)', fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)' }}>
              Now serving Chennai · Bangalore coming soon
            </div>
          </div>
        </>
      )}
    </div>
  );
}


// ===== MAIN PAGE =====
export default function DhabaPage() {
  const [activeCategory, setActiveCategory] = useState('Dal & Curries');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);

  const activeGroup = DHABA_MENU.find(g => g.category === activeCategory)!;
  // Default info shown is OMR dine-in
  const loc = LOCATIONS.dineIn[0];

  const handleAdminLogin = async () => {
    try {
      if (isAdmin) {
        setAdminOpen(true);
        return;
      }
      await signInWithPopup(auth, googleProvider);
      setIsAdmin(true);
      setAdminOpen(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#1a0800' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
        .menu-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .menu-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 28px rgba(0,0,0,0.25) !important;
        }
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <UnitNav unitName="Dhaba" unitIcon="🍛" accentColor="#f39c12" bgColor="#2d0a00" />

      {/* Sub-header Location Bar */}
      <div style={{ background: '#110500', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0.75rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: '0', zIndex: 90 }}>
        <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', fontWeight: 600 }}>Now serving Chennai · Bangalore coming soon</span>
        <DhabaLocationSelector />
      </div>

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '400px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #2d0a00 0%, #7b1818 50%, #c0392b 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1600)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.18,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(45,10,0,0.95) 0%, rgba(45,10,0,0.5) 60%, rgba(45,10,0,0.2) 100%)',
        }} />

        <div className="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(243,156,18,0.12)',
            border: '1px solid rgba(243,156,18,0.3)',
            borderRadius: '999px',
            padding: '0.3rem 0.9rem',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#f39c12', marginBottom: '1.25rem',
          }}>
            <span style={{ width: 6, height: 6, background: '#f39c12', borderRadius: '50%' }} />
            PURE VEG · DESI GHEE · FRESH DAILY
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.02em',
            marginBottom: '1rem',
          }}>
            Order from Lee Vaakki Dhaba<br />
            <span style={{ color: '#f39c12' }}>{loc.name}</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '460px', marginBottom: '2rem' }}>
            Wholesome home-style cooking made with love. Currently ordering for {loc.type === 'dinein' ? 'Dine-in & Delivery' : 'Delivery only'}.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            {(loc as any).orderDirectUrl && (
              <a
                href={(loc as any).orderDirectUrl}
                target="_blank" rel="noreferrer"
                style={{
                  background: '#25D366', color: '#fff', border: 'none', textDecoration: 'none',
                  borderRadius: '999px', padding: '0.7rem 1.6rem',
                  fontWeight: 800, fontSize: '0.88rem', cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(37,211,102,0.3)',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                }}
              >
                🛒 Order Direct
              </a>
            )}
            {loc.swiggyLink ? (
              <a href={loc.swiggyLink} target="_blank" rel="noreferrer"
                style={{
                  background: '#fc8019', color: '#fff', border: 'none', textDecoration: 'none',
                  borderRadius: '999px', padding: '0.7rem 1.6rem',
                  fontWeight: 700, fontSize: '0.88rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                }}
              >Order on Swiggy</a>
            ) : (
              <span style={{
                background: 'rgba(252,128,25,0.15)', color: 'rgba(252,128,25,0.6)',
                border: '1px dashed rgba(252,128,25,0.4)',
                borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 700, fontSize: '0.78rem'
              }}>Swiggy – Coming Soon</span>
            )}
            {loc.zomatoLink ? (
              <a href={loc.zomatoLink} target="_blank" rel="noreferrer"
                style={{
                  background: '#e23744', color: '#fff', border: 'none', textDecoration: 'none',
                  borderRadius: '999px', padding: '0.7rem 1.6rem',
                  fontWeight: 700, fontSize: '0.88rem',
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
                }}
              >Order on Zomato</a>
            ) : (
              <span style={{
                background: 'rgba(226,55,68,0.15)', color: 'rgba(226,55,68,0.6)',
                border: '1px dashed rgba(226,55,68,0.4)',
                borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 700, fontSize: '0.78rem'
              }}>Zomato – Coming Soon</span>
            )}
          </div>
        </div>
      </section>

      {/* ===== INFO STRIP ===== */}
      <section style={{
        background: '#f39c12',
        padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem', flexWrap: 'wrap',
      }}>
        {[
          { icon: '📍', text: loc.name },
          { icon: '🕐', text: loc.timings },
          { icon: '📞', text: loc.phone },
          { icon: '🥗', text: 'Pure Vegetarian' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2d0a00', fontWeight: 700, fontSize: '0.82rem' }}>
            <span>{item.icon}</span> {item.text}
          </div>
        ))}
      </section>

      {/* ===== MENU ===== */}
      <section id="dhaba-menu" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.5rem' }}>Our Menu</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          All dishes prepared fresh daily. Prices inclusive of taxes.
        </p>

        {/* Category tabs */}
        <div className="scrollbar-hidden" style={{ display: 'flex', gap: '0.6rem', overflowX: 'auto', marginBottom: '2rem', paddingBottom: '4px' }}>
          {DHABA_MENU.map(group => (
            <button
              key={group.category}
              onClick={() => setActiveCategory(group.category)}
              style={{
                background: activeCategory === group.category ? '#f39c12' : 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${activeCategory === group.category ? '#f39c12' : 'rgba(255,255,255,0.1)'}`,
                color: activeCategory === group.category ? '#2d0a00' : 'rgba(255,255,255,0.6)',
                borderRadius: '999px',
                padding: '0.45rem 1.1rem',
                fontWeight: 700, fontSize: '0.78rem',
                cursor: 'pointer', whiteSpace: 'nowrap',
                transition: 'all 0.2s',
              }}
            >
              {group.icon} {group.category}
            </button>
          ))}
        </div>

        {/* Menu items grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {activeGroup.items.map(item => (
            <div
              key={item.name}
              className="menu-card"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '1.25rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                position: 'relative',
              }}
            >
              {item.bestseller && (
                <span style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: '#f39c12', color: '#2d0a00',
                  borderRadius: '999px', padding: '2px 8px',
                  fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.06em',
                }}>
                  ⭐ Bestseller
                </span>
              )}
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', marginBottom: '0.4rem', paddingRight: item.bestseller ? '80px' : '0' }}>
                {item.name}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {item.desc}
              </p>
              <div style={{ color: '#f39c12', fontWeight: 900, fontSize: '1.1rem' }}>₹{item.price}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TIMINGS CARD ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 4rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #7b1818 0%, #c0392b 100%)',
          borderRadius: '20px',
          padding: '2rem',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '2rem',
          boxShadow: '0 12px 40px rgba(192,57,43,0.25)',
        }}>
          <div>
            <h3 style={{ color: '#f39c12', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Selected Location Info
            </h3>
            <div style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Hours</div>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 800 }}>{loc.timings}</div>
            </div>
            <div style={{ padding: '0.6rem 0', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
              <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.2rem' }}>Contact</div>
              <div style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 800 }}>{loc.phone}</div>
            </div>
          </div>
          <div>
            <h3 style={{ color: '#f39c12', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '1rem' }}>
              Address
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '1rem' }}>
              {loc.address}
            </p>
            {loc.mapLink && (
              <a
                href={loc.mapLink}
                target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                  background: 'rgba(255,255,255,0.15)', color: '#fff',
                  borderRadius: '999px', padding: '0.5rem 1.1rem',
                  fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                }}
              >
                📍 Get Directions
              </a>
            )}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f0400', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
        © 2026 LV Dhaba · A Lee Vaakki Pvt Ltd Venture
      </footer>

      {/* Admin Button */}
      <button
        onClick={handleAdminLogin}
        style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          background: isAdmin ? '#25D366' : 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.2)',
          borderRadius: '50%',
          width: '45px',
          height: '45px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 100,
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          color: '#fff',
          fontSize: '1.2rem',
        }}
        title="Admin Login"
      >
        ⚙️
      </button>

      {/* Admin Drawer */}
      {adminOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          <div onClick={() => setAdminOpen(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
          <div style={{
            position: 'relative',
            width: '100%',
            maxWidth: '350px',
            background: '#2d0a00',
            height: '100%',
            boxShadow: '-4px 0 24px rgba(0,0,0,0.5)',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h2 style={{ color: '#f39c12', marginBottom: '2rem', fontSize: '1.5rem', fontWeight: 800 }}>Dhaba Admin Settings</h2>
            
            <div style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1rem', fontSize: '0.9rem', lineHeight: 1.5 }}>
              Logged in as Admin.<br />
              Menu management features coming soon.
            </div>
            
            <button
              style={{
                background: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                padding: '0.8rem',
                borderRadius: '8px',
                marginTop: 'auto',
                cursor: 'pointer',
                fontWeight: 700,
              }}
              onClick={() => {
                setIsAdmin(false);
                setAdminOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
