import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

// ---- Backend Configuration ----
const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

interface UserProfile {
  name: string;
  photoURL: string | null;
}

// ===== SHARED MENU DATA =====
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

// ===== DUMMY ORDERS =====
const DUMMY_ORDERS = [
  { id: '#1042', platform: 'Swiggy', color: '#fc8019', items: '1x Dal Makhani, 2x Butter Naan', status: 'new', time: '2 min ago' },
  { id: '#1041', platform: 'Zomato', color: '#e23744', items: '2x Rajma Chawal, 1x Lassi', status: 'preparing', time: '12 min ago' },
  { id: '#1040', platform: 'Swiggy', color: '#fc8019', items: '1x Full Dhaba Thali', status: 'ready', time: '20 min ago' },
];

// ===== ADMIN DASHBOARD DRAWER =====
function AdminDashboard({ onClose, onLogout }: { onClose: () => void; onLogout: () => void }) {
  const [orders, setOrders] = useState(DUMMY_ORDERS);

  const updateStatus = (id: string, status: string) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
  };

  const statusColor: Record<string, string> = {
    new: '#e67e22',
    preparing: '#3498db',
    ready: '#2ecc71',
  };

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', justifyContent: 'flex-end' }}>
      <div onClick={onClose} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
      <div style={{
        position: 'relative', width: '100%', maxWidth: '420px',
        background: '#1a1a2e', height: '100%',
        boxShadow: '-4px 0 32px rgba(0,0,0,0.5)',
        display: 'flex', flexDirection: 'column', overflowY: 'auto'
      }}>
        {/* Header */}
        <div style={{ background: '#2d0a00', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2 style={{ color: '#f39c12', margin: 0, fontSize: '1.1rem', fontWeight: 800 }}>Orders Dashboard</h2>
            <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', marginTop: '2px' }}>Mahabalipuram Cloud Kitchen</div>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', fontSize: '1.4rem', cursor: 'pointer' }}>✕</button>
        </div>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.75rem', padding: '1rem' }}>
          {[
            { label: "Today's", value: orders.length.toString(), color: '#3498db' },
            { label: 'Pending', value: orders.filter(o => o.status !== 'ready').length.toString(), color: '#e67e22' },
            { label: 'Ready', value: orders.filter(o => o.status === 'ready').length.toString(), color: '#2ecc71' },
          ].map(s => (
            <div key={s.label} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '10px', padding: '0.75rem', textAlign: 'center' }}>
              <div style={{ color: s.color, fontSize: '1.6rem', fontWeight: 800 }}>{s.value}</div>
              <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.7rem', marginTop: '2px' }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Orders List */}
        <div style={{ padding: '0 1rem', flex: 1 }}>
          <h3 style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 700, marginBottom: '0.75rem', opacity: 0.6, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Live Orders</h3>
          {orders.map(order => (
            <div key={order.id} style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '10px', padding: '1rem', marginBottom: '0.75rem'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ color: '#fff', fontWeight: 800, fontSize: '0.9rem' }}>{order.id}</span>
                  <span style={{ background: order.color, color: '#fff', fontSize: '0.6rem', fontWeight: 800, padding: '2px 6px', borderRadius: '4px' }}>{order.platform}</span>
                </div>
                <span style={{ background: statusColor[order.status], color: '#fff', fontSize: '0.6rem', fontWeight: 700, padding: '3px 8px', borderRadius: '999px' }}>
                  {order.status.toUpperCase()}
                </span>
              </div>
              <div style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.78rem', marginBottom: '0.75rem' }}>{order.items}</div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {order.status === 'new' && (
                  <>
                    <button onClick={() => updateStatus(order.id, 'preparing')} style={{ flex: 1, background: '#3498db', color: '#fff', border: 'none', padding: '0.45rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Accept</button>
                    <button onClick={() => updateStatus(order.id, 'ready')} style={{ flex: 1, background: 'transparent', color: '#e74c3c', border: '1px solid #e74c3c', padding: '0.45rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Reject</button>
                  </>
                )}
                {order.status === 'preparing' && (
                  <button onClick={() => updateStatus(order.id, 'ready')} style={{ flex: 1, background: '#2ecc71', color: '#fff', border: 'none', padding: '0.45rem', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer' }}>Mark Ready ✓</button>
                )}
                {order.status === 'ready' && (
                  <div style={{ color: '#2ecc71', fontSize: '0.78rem', fontWeight: 700 }}>✓ Ready for pickup</div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div style={{ padding: '1rem' }}>
          <button onClick={onLogout} style={{ width: '100%', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.6)', padding: '0.75rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 700, fontSize: '0.85rem' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}

// ===== Check admin role via backend =====
async function checkDhabaAdminStatus(idToken: string): Promise<boolean> {
  try {
    const res = await fetch(`${API}/auth/me`, {
      headers: { 'Authorization': `Bearer ${idToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      const dhabaRole = data.roles?.dhaba;
      return dhabaRole === 'admin' || dhabaRole === 'employee';
    }
  } catch (e) {
    console.error('Failed to check dhaba admin status:', e);
  }
  return false;
}

// ===== MAIN PAGE =====
export default function DhabaAdminPage() {
  const [activeCategory, setActiveCategory] = useState('Dal & Curries');
  const [isAdmin, setIsAdmin] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [user, setUser] = useState<UserProfile | null>(null);

  const activeGroup = DHABA_MENU.find(g => g.category === activeCategory)!;

  // Restore session & check admin role on mount
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          setUser({
            name: firebaseUser.displayName || 'Staff',
            photoURL: firebaseUser.photoURL,
          });
          const admin = await checkDhabaAdminStatus(idToken);
          setIsAdmin(admin);
        } catch (e) {
          console.error('Failed to restore session:', e);
        }
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGoogleLogin = async () => {
    try {
      setLoginLoading(true);
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      setUser({
        name: result.user.displayName || 'Staff',
        photoURL: result.user.photoURL,
      });
      const admin = await checkDhabaAdminStatus(idToken);
      setIsAdmin(admin);
    } catch (e) {
      console.error(e);
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    await auth.signOut();
    setUser(null);
    setIsAdmin(false);
    setDashboardOpen(false);
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
        .menu-card { transition: transform 0.2s ease, box-shadow 0.2s ease; }
        .menu-card:hover { transform: translateY(-4px); box-shadow: 0 12px 28px rgba(0,0,0,0.25) !important; }
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
        .gear-btn:hover { transform: scale(1.1) rotate(30deg); }
        .gear-btn { transition: transform 0.3s ease; }
      `}</style>

      <header style={{
        background: '#110500',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>☁️</span>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.04em' }}>
              VAAKKI <span style={{ color: '#f39c12' }}>CLOUD KITCHEN</span>
            </span>
          </a>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: 'rgba(243,156,18,0.15)',
            border: '1px solid rgba(243,156,18,0.3)',
            borderRadius: '999px',
            padding: '0.25rem 0.65rem',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: '#f39c12',
          }}>
            DELIVERY ONLY
          </div>
        </div>

        {/* Right: Menu Nav, Login, Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {isAdmin && (
            <button
              onClick={() => setDashboardOpen(true)}
              style={{
                background: 'rgba(243,156,18,0.12)',
                border: '1px solid rgba(243,156,18,0.3)',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#f39c12',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(243,156,18,0.22)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(243,156,18,0.12)'}
            >
              ⚙️ Admin
            </button>
          )}

          <button
            onClick={() => {
              document.getElementById('ck-menu')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: '#f39c12', color: '#2d0a00', border: 'none',
              borderRadius: '6px', padding: '0.35rem 1rem',
              fontWeight: 800, fontSize: '0.78rem', letterSpacing: '0.08em', cursor: 'pointer',
            }}
          >
            MENU ↓
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {user.photoURL && (
                <img src={user.photoURL} alt={user.name}
                  style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #f39c12' }} />
              )}
              <span style={{ color: '#fff', fontSize: '0.85rem', fontWeight: 600 }}>
                {user.name.split(' ')[0]}
              </span>
              <button onClick={handleLogout} style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff', borderRadius: '6px', padding: '0.3rem 0.75rem',
                fontSize: '0.75rem', cursor: 'pointer',
              }}>
                Sign Out
              </button>
            </div>
          ) : (
            <button onClick={handleGoogleLogin} disabled={loginLoading} style={{
              background: loginLoading ? '#555' : '#f39c12', color: '#2d0a00', border: 'none',
              borderRadius: '8px', padding: '0.4rem 1.1rem', fontWeight: 800,
              fontSize: '0.82rem', letterSpacing: '0.04em',
              cursor: loginLoading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'background 0.2s',
            }}>
              {loginLoading ? 'Signing in...' : 'LOGIN / SIGN UP'}
            </button>
          )}
        </div>
      </header>

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '380px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #2d0a00 0%, #7b1818 50%, #c0392b 100%)',
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1585937421612-70a008356fbe?q=80&w=1600)',
          backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.15,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(45,10,0,0.96) 0%, rgba(45,10,0,0.5) 60%, rgba(45,10,0,0.2) 100%)',
        }} />

        <div className="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(243,156,18,0.12)', border: '1px solid rgba(243,156,18,0.3)',
            borderRadius: '999px', padding: '0.3rem 0.9rem',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#f39c12', marginBottom: '1.25rem',
          }}>
            <span style={{ width: 6, height: 6, background: '#f39c12', borderRadius: '50%' }} />
            PURE VEG · DESI GHEE · FRESH DAILY
          </div>

          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.4rem)',
            fontWeight: 900, color: '#fff',
            lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem',
          }}>
            Ghar Ka Khaana,<br />
            <span style={{ color: '#f39c12' }}>Delivered to Your Door.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '460px', marginBottom: '2rem' }}>
            Order from our Mahabalipuram cloud kitchen via Swiggy or Zomato. Fast delivery, same great taste.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <a href="https://swiggy.com" target="_blank" rel="noreferrer" style={{
              background: '#fc8019', color: '#fff', border: 'none', textDecoration: 'none',
              borderRadius: '999px', padding: '0.7rem 1.6rem',
              fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
            }}>🛵 Order on Swiggy</a>
            <a href="https://zomato.com" target="_blank" rel="noreferrer" style={{
              background: '#e23744', color: '#fff', border: 'none', textDecoration: 'none',
              borderRadius: '999px', padding: '0.7rem 1.6rem',
              fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem'
            }}>🍽️ Order on Zomato</a>
            <button
              onClick={() => document.getElementById('ck-menu')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff', borderRadius: '999px', padding: '0.7rem 1.6rem',
                fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer',
              }}
            >View Menu ↓</button>
          </div>
        </div>
      </section>

      {/* ===== INFO STRIP ===== */}
      <section style={{
        background: '#f39c12', padding: '1rem 2rem',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '2.5rem', flexWrap: 'wrap',
      }}>
        {[
          { icon: '📍', text: 'Mahabalipuram, Tamil Nadu' },
          { icon: '🕐', text: 'Delivery 11 AM – 11 PM' },
          { icon: '📞', text: '+91 88888 88888' },
          { icon: '🥗', text: 'Pure Vegetarian' },
        ].map(item => (
          <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#2d0a00', fontWeight: 700, fontSize: '0.82rem' }}>
            <span>{item.icon}</span> {item.text}
          </div>
        ))}
      </section>

      {/* ===== MENU ===== */}
      <section id="ck-menu" style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <h2 style={{ color: '#fff', fontSize: '1.8rem', fontWeight: 900, marginBottom: '0.4rem' }}>Our Menu</h2>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          Same great flavours — now delivered to your door. Prices inclusive of taxes.
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
                borderRadius: '999px', padding: '0.45rem 1.1rem',
                fontWeight: 700, fontSize: '0.78rem',
                cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.2s',
              }}
            >
              {group.icon} {group.category}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {activeGroup.items.map(item => (
            <div key={item.name} className="menu-card" style={{
              background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: '16px', padding: '1.25rem',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)', position: 'relative',
            }}>
              {item.bestseller && (
                <span style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: '#f39c12', color: '#2d0a00',
                  borderRadius: '999px', padding: '2px 8px',
                  fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.06em',
                }}>⭐ Bestseller</span>
              )}
              <div style={{ fontWeight: 800, color: '#fff', fontSize: '1rem', marginBottom: '0.4rem', paddingRight: item.bestseller ? '80px' : '0' }}>
                {item.name}
              </div>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                {item.desc}
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ color: '#f39c12', fontWeight: 900, fontSize: '1.1rem' }}>₹{item.price}</div>
                <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem' }}>Order via Swiggy/Zomato</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#0f0400', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.25)', fontSize: '0.75rem' }}>
        © 2026 LV Dhaba – Mahabalipuram Cloud Kitchen · A Lee Vaakki Pvt Ltd Venture
      </footer>

      {/* ===== ADMIN DASHBOARD DRAWER ===== */}
      {dashboardOpen && (
        <AdminDashboard
          onClose={() => setDashboardOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </div>
  );
}
