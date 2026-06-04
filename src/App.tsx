import React, { useState, useEffect } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';
import { InstallCafeAppButton } from './components/InstallCafeAppButton';
import { ShoppingCart, Trash2, X, Plus, Minus, Check, Loader2, Heart } from 'lucide-react';
import { CartProvider, useCart, MenuItem } from './CartContext';

// ---- Menu Data ----
const ALL_MENU_ITEMS: MenuItem[] = [
  { id: 'cafe_1', name: 'Premium Espresso',       price: 160, category: 'Coffee',   bestseller: true,  img: 'https://images.unsplash.com/photo-1510707577719-094119f7cc54?q=80&w=600', description: 'Rich, bold double shot espresso using 100% Arabica beans.' },
  { id: 'cafe_2', name: 'Classic Cappuccino',     price: 190, category: 'Coffee',   bestseller: true,  img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600', description: 'Vibrant espresso, steamed milk, and a thick layer of velvety foam.' },
  { id: 'cafe_3', name: 'Salted Caramel Latte',   price: 220, category: 'Coffee',   bestseller: false, img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600', description: 'Espresso shot with steamed milk, sweet caramel syrup, and a sea salt pinch.' },
  { id: 'cafe_4', name: 'Cold Brew Float',        price: 210, category: 'Coffee',   bestseller: false, img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600', description: 'Slow-steeped cold brew topped with premium vanilla ice cream.' },
  { id: 'cafe_5', name: 'Matcha Green Tea Latte', price: 240, category: 'Tea',      bestseller: false, img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=600', description: 'Pure ceremonial Japanese matcha whisked with creamy steamed milk.' },
  { id: 'cafe_6', name: 'Spiced Masala Chai',     price: 90,  category: 'Tea',      bestseller: true,  img: 'https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?q=80&w=600', description: 'Traditional Indian tea brewed with aromatic whole spices and fresh milk.' },
  { id: 'pizza_margherita_s', name: 'Margherita Pizza (S)', price: 249, category: 'Pizza', bestseller: false, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600', description: 'San Marzano tomatoes, fresh mozzarella, sweet basil, and olive oil.' },
  { id: 'pizza_margherita_m', name: 'Margherita Pizza (M)', price: 320, category: 'Pizza', bestseller: true,  img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600', description: 'San Marzano tomatoes, fresh mozzarella, sweet basil, and olive oil.' },
  { id: 'pizza_margherita_l', name: 'Margherita Pizza (L)', price: 420, category: 'Pizza', bestseller: false, img: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600', description: 'San Marzano tomatoes, fresh mozzarella, sweet basil, and olive oil.' },
  { id: 'pizza_pesto_s', name: 'Pesto Veggie Pizza (S)', price: 299, category: 'Pizza', bestseller: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600', description: 'Herby basil pesto, bell peppers, olives, mushrooms, and mozzarella.' },
  { id: 'pizza_pesto_m', name: 'Pesto Veggie Pizza (M)', price: 370, category: 'Pizza', bestseller: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600', description: 'Herby basil pesto, bell peppers, olives, mushrooms, and mozzarella.' },
  { id: 'pizza_pesto_l', name: 'Pesto Veggie Pizza (L)', price: 470, category: 'Pizza', bestseller: false, img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?q=80&w=600', description: 'Herby basil pesto, bell peppers, olives, mushrooms, and mozzarella.' },
  { id: 'cafe_9', name: 'Classic Beef Burger',    price: 280, category: 'Burger',   bestseller: true,  img: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=600', description: 'Juicy flame-grilled beef patty, cheddar, lettuce, tomato, and house sauce.' },
  { id: 'cafe_10', name: 'Crispy Chicken Burger',  price: 260, category: 'Burger',   bestseller: false, img: 'https://images.unsplash.com/photo-1550547660-d9450f859349?q=80&w=600', description: 'Golden crispy chicken breast, spicy mayo, and pickles on a toasted bun.' },
  { id: 'cafe_11', name: 'Artisan Butter Croissant', price: 130, category: 'Breads', bestseller: true,  img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600', description: 'Flaky, multi-layered French pastry baked fresh with pure premium butter.' },
  { id: 'cafe_12', name: 'Garlic Focaccia',        price: 150, category: 'Breads',   bestseller: false, img: 'https://images.unsplash.com/photo-1574234363531-a0ed40e7bcd6?q=80&w=600', description: 'Liguria-style flatbread topped with roasted garlic, rosemary, and olive oil.' },
  { id: 'cafe_13', name: 'Blueberry Cheesecake',   price: 260, category: 'Desserts', bestseller: true,  img: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=600', description: 'Creamy baked cheesecake with a graham cracker crust and sweet blueberry compote.' },
  { id: 'cafe_14', name: 'Belgian Waffle',         price: 220, category: 'Desserts', bestseller: false, img: 'https://images.unsplash.com/photo-1598214886806-c9d5d96e1c6d?q=80&w=600', description: 'Warm, fluffy waffle served with pure maple syrup and fresh whipped cream.' },
  { id: 'cafe_15', name: 'Veg Club Sandwich',      price: 180, category: 'Snacks',   bestseller: false, img: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=600', description: 'Double-decker sandwich loaded with crisp veggies, cheese, and herb spread.' },
  { id: 'cafe_16', name: 'Meal for Two',           price: 380, category: 'Combo',    bestseller: false, img: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600', description: 'Perfect café combo: Choose any 2 coffees, 1 pizza, and 1 pastry.' },
];

const PIZZA_TOPPINGS = [
  { id: "topping_capsicum", name: "Capsicum", price: 39 },
  { id: "topping_extra_cheese", name: "Extra Cheese", price: 59 },
  { id: "topping_black_olives", name: "Black Olives", price: 49 },
  { id: "topping_jalapenos", name: "Jalapenos", price: 49 },
];

// ---- Backend Configuration ----
const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';

// ---- Categories (Dhaba-style) ----
const CATEGORIES = [
  { name: 'All',      icon: '🍽️', color: '#13253a' },
  { name: 'Coffee',   icon: '☕',  color: '#6F4E37' },
  { name: 'Tea',      icon: '🍵',  color: '#2e7d32' },
  { name: 'Pizza',    icon: '🍕',  color: '#e53935' },
  { name: 'Burger',   icon: '🍔',  color: '#f0a500' },
  { name: 'Breads',   icon: '🥐',  color: '#d4a574' },
  { name: 'Desserts', icon: '🍰',  color: '#ec407a' },
  { name: 'Snacks',   icon: '🥪',  color: '#1976d2' },
  { name: 'Combo',    icon: '🎁',  color: '#7b1fa2' },
];

interface UserProfile {
  name: string;
  email: string;
  photoURL: string | null;
}

function LeeVaakkiCafeApp() {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('cafe_token'));
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [placingOrder, setPlacingOrder] = useState(false);

  // Custom Online Ordering & Admin states
  const [onlineOrderingOpen, setOnlineOrderingOpen] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [updatingConfig, setUpdatingConfig] = useState(false);

  // Cart operations from context
  const { items, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal } = useCart();

  // Check admin status helper
  const checkAdminStatus = async (userToken: string) => {
    try {
      const res = await fetch(`${API}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${userToken}`,
        }
      });
      if (res.ok) {
        const data = await res.json();
        const cafeRole = data.roles?.cafe;
        setIsAdmin(cafeRole === 'admin' || cafeRole === 'employee');
      }
    } catch (e) {
      console.error('Failed to check admin status:', e);
    }
  };

  // Fetch store status & Restore session on load
  useEffect(() => {
    const fetchOrderingStatus = async () => {
      try {
        const res = await fetch(`${API}/config/online-ordering`);
        if (res.ok) {
          const data = await res.json();
          setOnlineOrderingOpen(data.onlineOrderingOpen);
        }
      } catch (e) {
        console.error('Failed to fetch online ordering status:', e);
      }
    };
    fetchOrderingStatus();

    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        try {
          const idToken = await firebaseUser.getIdToken();
          localStorage.setItem('cafe_token', idToken);
          setToken(idToken);
          setUser({
            name: firebaseUser.displayName || 'Guest',
            email: firebaseUser.email || '',
            photoURL: firebaseUser.photoURL,
          });
          checkAdminStatus(idToken);
        } catch (e) {
          console.error('Failed to get user id token:', e);
        }
      } else {
        localStorage.removeItem('cafe_token');
        setToken(null);
        setUser(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleToggleOrdering = async (open: boolean) => {
    if (!token) return;
    setUpdatingConfig(true);
    try {
      const res = await fetch(`${API}/admin/online-ordering`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ open, brand: 'cafe' }),
      });
      if (res.ok) {
        const data = await res.json();
        setOnlineOrderingOpen(data.onlineOrderingOpen);
      } else {
        alert('Failed to update online ordering status');
      }
    } catch (e) {
      console.error(e);
      alert('Error updating online ordering status');
    } finally {
      setUpdatingConfig(false);
    }
  };

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const idToken = await result.user.getIdToken();
      localStorage.setItem('cafe_token', idToken);
      setToken(idToken);
      setUser({
        name: result.user.displayName || 'Guest',
        email: result.user.email || '',
        photoURL: result.user.photoURL,
      });
      checkAdminStatus(idToken);
    } catch (err) {
      console.error('Google sign-in failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
    } catch (err) {
      console.error('Failed to sign out from Firebase:', err);
    }
    localStorage.removeItem('cafe_token');
    setToken(null);
    setUser(null);
    setIsAdmin(false);
    clearCart();
  };

  const handleCheckout = async () => {
    if (!user) {
      handleGoogleLogin();
      return;
    }
    setPlacingOrder(true);
    try {
      // 1. Register order on the backend (returns Razorpay Order ID)
      const orderData = {
        items: items.map(i => ({ menu_item_id: i.menu_item.id, quantity: i.quantity })),
        order_type: 'dine-in',
        payment_method: 'online',
        customer_phone: '9999999999', // Fallback or prompt
      };

      const res = await fetch(`${API}/orders/own/cafe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        throw new Error('Order registration failed on API server');
      }

      const data = await res.json(); // { order_id, amount, currency, local_order_id }

      // 2. Open Razorpay Checkout Modal
      const options = {
        key: (import.meta as any).env?.VITE_RAZORPAY_KEY_ID || 'rzp_test_your_mock_key_id',
        amount: data.amount,
        currency: data.currency,
        name: 'Lee Vaakki Cafe',
        description: 'Artisan Coffee & Pastries Order',
        order_id: data.order_id,
        handler: async function (response: any) {
          setPlacingOrder(true);
          try {
            // Verify payment signature on backend
            const verifyRes = await fetch(`${API}/payments/verify`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify({
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_order_id: response.razorpay_order_id,
                razorpay_signature: response.razorpay_signature,
                local_order_id: data.local_order_id,
              }),
            });

            if (verifyRes.ok) {
              setCheckoutSuccess(data.local_order_id);
              clearCart();
              setCartOpen(false);
            } else {
              alert('Payment signature verification failed.');
            }
          } catch (err) {
            console.error('Error during signature verification:', err);
            alert('Unable to verify payment with server.');
          } finally {
            setPlacingOrder(false);
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: '',
        },
        theme: {
          color: '#13253a',
        },
      };

      const rzp = new (window as any).Razorpay(options);
      rzp.on('payment.failed', function (resp: any) {
        alert(`Payment failed: ${resp.error.description}`);
      });
      rzp.open();

    } catch (err) {
      console.error('Checkout failed:', err);
      alert('Failed to initialize checkout. Please try again.');
    } finally {
      setPlacingOrder(false);
    }
  };

  const filteredItems = selectedCategory === 'All'
    ? ALL_MENU_ITEMS
    : ALL_MENU_ITEMS.filter(i => i.category === selectedCategory);

  return (
    <div style={{ fontFamily: "'Inter', 'Roboto', sans-serif", minHeight: '100vh', background: '#f7f4ef', position: 'relative' }}>
      
      {/* Dynamic Keyframes Injection */}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .slide-in-drawer {
          animation: slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .fade-in-overlay {
          animation: fadeIn 0.25s ease-out forwards;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hidden {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* ===== HEADER ===== */}
      <header style={{
        background: '#13253a',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
      }}>
        {/* Logo & Status Badge */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '1.4rem' }}>☕</span>
            <span style={{ color: '#fff', fontWeight: 800, fontSize: '1.15rem', letterSpacing: '0.04em' }}>
              VAAKKI <span style={{ color: '#f0c040' }}>CAFE</span>
            </span>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.35rem',
            background: onlineOrderingOpen ? 'rgba(67,160,71,0.15)' : 'rgba(229,57,53,0.15)',
            border: `1px solid ${onlineOrderingOpen ? 'rgba(67,160,71,0.3)' : 'rgba(229,57,53,0.3)'}`,
            borderRadius: '999px',
            padding: '0.25rem 0.65rem',
            fontSize: '0.65rem',
            fontWeight: 700,
            color: onlineOrderingOpen ? '#81c784' : '#ef5350',
          }}>
            <span style={{
              width: 6,
              height: 6,
              background: onlineOrderingOpen ? '#43a047' : '#e53935',
              borderRadius: '50%',
              display: 'inline-block'
            }} />
            {onlineOrderingOpen ? 'OPEN' : 'CLOSED'}
          </div>
        </div>

        {/* Right: Menu Navigation, Cart, Login */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          {/* Admin panel button */}
          {isAdmin && (
            <button
              onClick={() => setAdminOpen(true)}
              style={{
                background: 'rgba(240,192,64,0.12)',
                border: '1px solid rgba(240,192,64,0.3)',
                borderRadius: '6px',
                padding: '0.35rem 0.75rem',
                fontSize: '0.75rem',
                fontWeight: 700,
                color: '#f0c040',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.25rem',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = 'rgba(240,192,64,0.22)'}
              onMouseOut={e => e.currentTarget.style.background = 'rgba(240,192,64,0.12)'}
            >
              ⚙️ Admin
            </button>
          )}

          <button
            onClick={() => {
              document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
            }}
            style={{
              background: '#e53935', color: '#fff', border: 'none',
              borderRadius: '6px', padding: '0.35rem 1rem',
              fontWeight: 700, fontSize: '0.78rem', letterSpacing: '0.08em', cursor: 'pointer',
            }}
          >
            MENU ↓
          </button>

          {/* Cart Icon Button */}
          <button
            onClick={() => setCartOpen(true)}
            style={{
              position: 'relative',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#fff',
              transition: 'all 0.2s',
            }}
            onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.15)'}
            onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.08)'}
          >
            <ShoppingCart size={18} />
            {itemCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-5px',
                right: '-5px',
                background: '#e53935',
                color: '#fff',
                fontSize: '0.65rem',
                fontWeight: 800,
                borderRadius: '50%',
                minWidth: '18px',
                height: '18px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
              }}>
                {itemCount}
              </span>
            )}
          </button>

          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              {user.photoURL && (
                <img src={user.photoURL} alt={user.name}
                  style={{ width: 32, height: 32, borderRadius: '50%', border: '2px solid #f0c040' }} />
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
            <button onClick={handleGoogleLogin} disabled={loading} style={{
              background: loading ? '#555' : '#e53935', color: '#fff', border: 'none',
              borderRadius: '8px', padding: '0.4rem 1.1rem', fontWeight: 700,
              fontSize: '0.82rem', letterSpacing: '0.04em',
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex', alignItems: 'center', gap: '0.4rem', transition: 'background 0.2s',
            }}>
              {loading ? 'Signing in...' : 'LOGIN / SIGN UP'}
            </button>
          )}
        </div>
      </header>

      {/* ===== HERO SECTION ===== */}
      <main>
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem 2rem' }}>
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr',
            gap: '3rem', alignItems: 'center',
          }}>
            {/* Left Content */}
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
                background: '#e8f5e9', color: '#2e7d32', borderRadius: '999px',
                padding: '0.35rem 1rem', fontSize: '0.78rem', fontWeight: 600,
                marginBottom: '1.5rem', border: '1px solid #a5d6a7',
              }}>
                <span style={{ width: 7, height: 7, background: '#43a047', borderRadius: '50%', display: 'inline-block' }} />
                Now Serving in Mahabalipuram
              </div>

              <h1 style={{
                fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 900, color: '#13253a',
                lineHeight: 1.15, marginBottom: '1.2rem', letterSpacing: '-0.02em',
              }}>
                Fresh Brews,<br />
                Quick Bites,<br />
                &amp; Feel-Good<br />
                Meals.
              </h1>

              <p style={{
                color: '#5a6a7a', fontSize: '0.95rem', lineHeight: 1.7,
                maxWidth: '420px', marginBottom: '2rem',
              }}>
                Experience the perfect blend of casual dining and coffee-shop vibes near Mahabalipuram.
                From breakfast to dinner, we've got your cravings covered.
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.2rem', marginBottom: '2rem' }}>
                <button
                  onClick={() => document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' })}
                  style={{
                    background: '#13253a', color: '#fff', border: 'none',
                    borderRadius: '999px', padding: '0.75rem 1.75rem',
                    fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    boxShadow: '0 4px 16px rgba(19,37,58,0.18)', transition: 'transform 0.15s, box-shadow 0.15s',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(19,37,58,0.24)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 4px 16px rgba(19,37,58,0.18)';
                  }}
                >
                  View Menu ↓
                </button>
                <a href="#about" style={{
                  color: '#13253a', fontWeight: 600, fontSize: '0.92rem', textDecoration: 'none',
                  borderBottom: '2px solid transparent', paddingBottom: '2px', transition: 'border-color 0.2s',
                }}
                  onMouseOver={e => (e.currentTarget.style.borderColor = '#13253a')}
                  onMouseOut={e => (e.currentTarget.style.borderColor = 'transparent')}
                >
                  Our Story
                </a>
              </div>

              <div style={{ display: 'flex', gap: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5a6a7a', fontSize: '0.82rem', fontWeight: 500 }}>
                  <span>☕</span> Premium Coffee
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#5a6a7a', fontSize: '0.82rem', fontWeight: 500 }}>
                  <span>🍽️</span> Fresh Ingredients
                </div>
              </div>
            </div>

            {/* Right: Photo + Badge */}
            <div style={{ position: 'relative' }}>
              <div style={{
                borderRadius: '20px', overflow: 'hidden',
                boxShadow: '0 20px 60px rgba(0,0,0,0.15)',
                aspectRatio: '4/3', background: '#ddd',
              }}>
                <img
                  src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=1200"
                  alt="Vaakki Cafe Interior"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{
                position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                background: '#f0c040', borderRadius: '12px', padding: '0.75rem 1.2rem',
                boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
              }}>
                <div style={{ fontWeight: 800, fontSize: '0.95rem', color: '#13253a' }}>Meal for Two</div>
                <div style={{ fontWeight: 700, fontSize: '0.85rem', color: '#13253a' }}>₹380</div>
              </div>
            </div>
          </div>
        </section>

        {/* ===== ONLINE ORDERING SPLASH ===== */}
        <section style={{ background: "#fdfcfa", padding: "4rem 2rem", borderTop: "1px solid #f0ebe4" }}>
          <div style={{ textAlign: "center" }}>
            <span style={{ color: "#e53935", fontWeight: "700", fontSize: "14px", letterSpacing: "1px", textTransform: "uppercase" }}>ONLINE ORDERING</span>
            <h2 style={{ fontSize: "28px", fontWeight: "800", color: "#1A1A1A", marginTop: "8px", marginBottom: "8px" }}>How would you like to order today?</h2>
            <p style={{ color: "#666", fontSize: "15px", maxWidth: "600px", margin: "0 auto", marginBottom: "2rem" }}>
              Craving our signature Napoleon pizza or house cappuccino? Order directly from the café for the best value and special offers!
            </p>
            
            <div style={{ background: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem", display: "inline-block", textAlign: "left" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", color: "#888", textTransform: "uppercase", letterSpacing: "0.5px" }}>Soon you can also order from:</span>
              <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", alignItems: "center" }}>
                <span style={{ fontWeight: "600", color: "#1A1A1A" }}>Swiggy</span>
                <span style={{ color: "#ccc" }}>•</span>
                <span style={{ fontWeight: "600", color: "#1A1A1A" }}>Zomato</span>
                <span style={{ color: "#ccc" }}>•</span>
                <span style={{ fontWeight: "600", color: "#1A1A1A" }}>Dining partners</span>
              </div>
            </div>
          </div>
        </section>

        {/* ===== CATEGORY ICON BAR (Dhaba-style) ===== */}
        <section id="menu-section" style={{
          background: '#fff',
          borderTop: '1px solid #f0ebe4',
          borderBottom: '1px solid #f0ebe4',
          padding: '2.5rem 2rem',
        }}>
          <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
            <h2 style={{
              fontSize: '1.6rem', fontWeight: 800, color: '#13253a',
              marginBottom: '0.4rem',
            }}>
              What's on your mind?
            </h2>
            <p style={{ color: '#5a6a7a', fontSize: '0.88rem', marginBottom: '1.8rem' }}>
              Browse by category — click to filter the menu below.
            </p>

            {/* Category Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
              gap: '1rem',
            }}>
              {CATEGORIES.map(cat => {
                const isActive = selectedCategory === cat.name;
                return (
                  <div
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    style={{
                      background: isActive ? cat.color : '#fff',
                      borderRadius: '14px',
                      padding: '1.2rem 0.75rem',
                      textAlign: 'center',
                      cursor: 'pointer',
                      border: `2px solid ${isActive ? cat.color : 'rgba(0,0,0,0.07)'}`,
                      boxShadow: isActive ? `0 4px 16px ${cat.color}40` : '0 2px 8px rgba(0,0,0,0.05)',
                      transition: 'all 0.2s ease',
                      transform: isActive ? 'translateY(-3px)' : 'none',
                    }}
                    onMouseOver={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = cat.color;
                        (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 16px ${cat.color}30`;
                      }
                    }}
                    onMouseOut={e => {
                      if (!isActive) {
                        (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(0,0,0,0.07)';
                        (e.currentTarget as HTMLDivElement).style.transform = 'none';
                        (e.currentTarget as HTMLDivElement).style.boxShadow = '0 2px 8px rgba(0,0,0,0.05)';
                      }
                    }}
                  >
                    {/* Icon circle */}
                    <div style={{
                      width: '54px', height: '54px', borderRadius: '50%',
                      background: isActive ? 'rgba(255,255,255,0.22)' : `${cat.color}18`,
                      border: `2px solid ${isActive ? 'rgba(255,255,255,0.35)' : cat.color + '35'}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      margin: '0 auto 0.7rem',
                      fontSize: '1.6rem',
                      transition: 'transform 0.2s',
                    }}>
                      {cat.icon}
                    </div>
                    <span style={{
                      fontWeight: 700, fontSize: '0.78rem',
                      color: isActive ? '#fff' : '#3a4a5a',
                      letterSpacing: '0.02em',
                    }}>
                      {cat.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ===== MENU SECTION (inline, filterable) ===== */}
        <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 2rem' }}>
          {/* Section header */}
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginBottom: '1.75rem', flexWrap: 'wrap', gap: '0.75rem',
          }}>
            <div>
              <h2 style={{ fontWeight: 800, color: '#13253a', fontSize: '1.4rem', margin: 0 }}>
                {selectedCategory === 'All' ? '🍽️ Full Menu' : `${CATEGORIES.find(c => c.name === selectedCategory)?.icon} ${selectedCategory}`}
              </h2>
              <p style={{ color: '#8a9aaa', fontSize: '0.82rem', margin: '0.25rem 0 0' }}>
                {filteredItems.length} item{filteredItems.length !== 1 ? 's' : ''} available
              </p>
            </div>
            {/* Category pill filter bar (scrollable on mobile) */}
            <div className="scrollbar-hidden" style={{
              display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '4px',
            }}>
              {CATEGORIES.map(cat => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  style={{
                    background: selectedCategory === cat.name ? cat.color : '#fff',
                    color: selectedCategory === cat.name ? '#fff' : '#3a4a5a',
                    border: `1.5px solid ${selectedCategory === cat.name ? cat.color : '#e0e0e0'}`,
                    borderRadius: '999px', padding: '0.3rem 0.9rem',
                    fontWeight: 600, fontSize: '0.75rem', cursor: 'pointer',
                    whiteSpace: 'nowrap', transition: 'all 0.18s ease',
                  }}
                >
                  {cat.icon} {cat.name}
                </button>
              ))}
            </div>
          </div>

          {/* Dish Cards Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
            gap: '1.5rem',
          }}>
            {filteredItems.map(item => {
              const cartItem = items.find(i => i.menu_item.id === item.id);
              const quantity = cartItem ? cartItem.quantity : 0;

              return (
                <div
                  key={item.id}
                  style={{
                    borderRadius: '16px', overflow: 'hidden', background: '#fff',
                    border: '1px solid #f0ebe4',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.06)',
                    transition: 'transform 0.18s, box-shadow 0.18s',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = 'translateY(-5px)';
                    e.currentTarget.style.boxShadow = '0 10px 28px rgba(0,0,0,0.13)';
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = '0 2px 10px rgba(0,0,0,0.06)';
                  }}
                >
                  {/* Image & Badges */}
                  <div>
                    <div style={{ position: 'relative', paddingTop: '65%', background: '#f5f0ea', overflow: 'hidden' }}>
                      <img
                        src={item.img}
                        alt={item.name}
                        loading="lazy"
                        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.3s' }}
                        onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                        onMouseOut={e => (e.currentTarget.style.transform = 'none')}
                      />
                      {/* Category chip */}
                      <span style={{
                        position: 'absolute', top: 10, right: 10,
                        background: 'rgba(255,255,255,0.92)',
                        borderRadius: '999px', padding: '2px 10px',
                        fontSize: '0.65rem', fontWeight: 700, color: '#13253a',
                        letterSpacing: '0.04em', backdropFilter: 'blur(4px)',
                      }}>
                        {item.category}
                      </span>
                      {item.bestseller && (
                        <span style={{
                          position: 'absolute', top: 10, left: 10,
                          background: '#13253a', color: '#f0c040',
                          borderRadius: '999px', padding: '2px 9px',
                          fontSize: '0.63rem', fontWeight: 700, letterSpacing: '0.04em',
                        }}>
                          ⭐ Bestseller
                        </span>
                      )}
                    </div>
                    {/* Info */}
                    <div style={{ padding: '1rem pb-0' }}>
                      <div style={{ fontWeight: 700, color: '#13253a', fontSize: '0.95rem', marginBottom: '0.25rem' }}>{item.name}</div>
                      <p style={{ fontSize: '0.75rem', color: '#7a8a9a', margin: '0 0 0.75rem', lineHeight: '1.4', height: '2.8rem', overflow: 'hidden' }}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Add to order / Quantity adjustments */}
                  <div style={{ padding: '0 1rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontWeight: 800, color: '#e53935', fontSize: '1.05rem' }}>₹{item.price}</span>
                    
                    {quantity === 0 ? (
                      <button
                        onClick={() => onlineOrderingOpen ? addItem(item) : null}
                        disabled={!onlineOrderingOpen}
                        style={{
                          background: onlineOrderingOpen ? '#13253a' : '#aaa', 
                          color: '#fff', border: 'none',
                          borderRadius: '999px', padding: '0.4rem 1.1rem',
                          fontSize: '0.78rem', fontWeight: 700, 
                          cursor: onlineOrderingOpen ? 'pointer' : 'not-allowed',
                          transition: 'all 0.18s',
                        }}
                        onMouseOver={e => {
                          if (onlineOrderingOpen) e.currentTarget.style.background = '#e53935';
                        }}
                        onMouseOut={e => {
                          if (onlineOrderingOpen) e.currentTarget.style.background = '#13253a';
                        }}
                      >
                        {onlineOrderingOpen ? '+ Add to Order' : 'Closed'}
                      </button>
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        background: '#f0ebe4',
                        borderRadius: '999px',
                        padding: '0.25rem 0.6rem',
                        border: '1px solid rgba(19,37,58,0.1)',
                      }}>
                        <button
                          onClick={() => updateQuantity(item.id, quantity - 1)}
                          style={{ background: 'transparent', border: 'none', color: '#13253a', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', padding: '0 0.2rem' }}
                        >
                          <Minus size={13} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '0.8rem', color: '#13253a', minWidth: '12px', textAlign: 'center' }}>{quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, quantity + 1)}
                          style={{ background: 'transparent', border: 'none', color: '#13253a', fontWeight: 800, fontSize: '0.9rem', cursor: 'pointer', padding: '0 0.2rem' }}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Login nudge if not signed in */}
          {!user && (
            <div style={{
              marginTop: '2.5rem',
              background: 'linear-gradient(135deg, #13253a 0%, #1e3a5f 100%)',
              borderRadius: '16px', padding: '2rem',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              flexWrap: 'wrap', gap: '1rem',
              boxShadow: '0 8px 32px rgba(19,37,58,0.18)',
            }}>
              <div>
                <div style={{ color: '#f0c040', fontWeight: 700, fontSize: '0.8rem', marginBottom: '0.3rem', letterSpacing: '0.06em' }}>
                  SIGN IN TO ORDER
                </div>
                <div style={{ color: '#fff', fontWeight: 800, fontSize: '1.1rem' }}>
                  Login with Google to place your order
                </div>
                <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.82rem', marginTop: '0.25rem' }}>
                  Quick &amp; secure · No password needed
                </div>
              </div>
              <button
                onClick={handleGoogleLogin}
                disabled={loading}
                style={{
                  background: '#fff', color: '#13253a', border: 'none',
                  borderRadius: '12px', padding: '0.85rem 1.75rem',
                  fontWeight: 700, fontSize: '0.9rem', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', gap: '0.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)', transition: 'transform 0.18s',
                }}
                onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                onMouseOut={e => (e.currentTarget.style.transform = 'none')}
              >
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.72v2.24h2.9c1.7-1.57 2.7-3.88 2.7-6.59z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.59-5.05-3.73H.95v2.3C2.43 15.89 5.5 18 9 18z" />
                  <path fill="#FBBC05" d="M3.95 10.7c-.18-.54-.28-1.12-.28-1.7s.1-1.16.28-1.7V5H.95C.35 6.2 0 7.57 0 9s.35 2.8 1 4l2.95-2.3z" />
                  <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.43 0 9 0 5.5 0 2.43 2.11.95 5.04l2.95 2.3c.71-2.14 2.7-3.76 5.05-3.76z" />
                </svg>
                {loading ? 'Signing in...' : 'Sign in with Google'}
              </button>
            </div>
          )}
        </section>
      </main>

      {/* ===== SHOPPING CART DRAWER OVERLAY ===== */}
      {cartOpen && (
        <div className="fade-in-overlay" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1000,
          background: 'rgba(19,37,58,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          {/* Backdrop click close */}
          <div onClick={() => setCartOpen(false)} style={{ position: 'absolute', inset: 0 }} />

          {/* Drawer Element */}
          <div className="slide-in-drawer" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '420px',
            height: '100%',
            background: '#FAF6F0',
            boxShadow: '-8px 0 32px rgba(19,37,58,0.22)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(19,37,58,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#13253a',
              color: '#fff',
            }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 800 }}>
                <ShoppingCart size={20} style={{ color: '#f0c040' }} /> Your Order
              </h3>
              <button
                onClick={() => setCartOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.8,
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
              >
                <X size={22} />
              </button>
            </div>

            {/* Cart Items List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '1.5rem' }}>
              {items.length === 0 ? (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#7a8a9a',
                  textAlign: 'center',
                  gap: '1rem',
                }}>
                  <span style={{ fontSize: '3rem' }}>🥐</span>
                  <div>
                    <h4 style={{ margin: '0 0 0.25rem', color: '#13253a', fontWeight: 700 }}>Your bag is empty</h4>
                    <p style={{ margin: 0, fontSize: '0.8rem', maxWidth: '240px', lineHeight: '1.5' }}>
                      Browse our premium cafe selection and add sweet delicacies!
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      document.getElementById('menu-section')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    style={{
                      background: '#13253a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '999px',
                      padding: '0.5rem 1.5rem',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      cursor: 'pointer',
                      marginTop: '0.5rem',
                    }}
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {items.map(({ menu_item, quantity }) => (
                    <div
                      key={menu_item.id}
                      style={{
                        background: '#fff',
                        borderRadius: '12px',
                        padding: '0.75rem',
                        display: 'flex',
                        gap: '0.75rem',
                        alignItems: 'center',
                        border: '1px solid #f0ebe4',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.03)',
                      }}
                    >
                      <img
                        src={menu_item.img}
                        alt={menu_item.name}
                        style={{ width: '56px', height: '56px', objectFit: 'cover', borderRadius: '8px', background: '#f5f0ea' }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 700, color: '#13253a', fontSize: '0.85rem', textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                          {menu_item.name}
                        </div>
                        <div style={{ color: '#e53935', fontWeight: 700, fontSize: '0.82rem', marginTop: '0.15rem' }}>
                          ₹{menu_item.price}
                        </div>
                      </div>

                      {/* Quantity Controls */}
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        background: '#f7f4ef',
                        borderRadius: '999px',
                        padding: '0.2rem 0.5rem',
                        border: '1px solid rgba(19,37,58,0.05)',
                      }}>
                        <button
                          onClick={() => updateQuantity(menu_item.id, quantity - 1)}
                          style={{ background: 'transparent', border: 'none', color: '#13253a', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          <Minus size={10} />
                        </button>
                        <span style={{ fontWeight: 800, fontSize: '0.75rem', color: '#13253a', minWidth: '10px', textAlign: 'center' }}>{quantity}</span>
                        <button
                          onClick={() => updateQuantity(menu_item.id, quantity + 1)}
                          style={{ background: 'transparent', border: 'none', color: '#13253a', fontWeight: 800, fontSize: '0.8rem', cursor: 'pointer' }}
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Remove item */}
                      <button
                        onClick={() => removeItem(menu_item.id)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#c2cfd6',
                          cursor: 'pointer',
                          padding: '4px',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        onMouseOver={e => e.currentTarget.style.color = '#e53935'}
                        onMouseOut={e => e.currentTarget.style.color = '#c2cfd6'}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Last-minute cravings */}
            {items.some(i => i.menu_item.category === 'Pizza') && (
              <div style={{ padding: '0 1.5rem 1.5rem' }}>
                <div style={{ background: "#fff", borderRadius: "16px", padding: "16px", border: "1px solid #eaeaea", boxShadow: "0 2px 8px rgba(0,0,0,0.02)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "2px" }}>
                    <span style={{ color: "#673ab7", fontWeight: "800", fontStyle: "italic", fontSize: "1.4rem", letterSpacing: "-1px" }}>café</span>
                    <h3 style={{ margin: 0, fontSize: "1.05rem", fontWeight: "700", color: "#1A1A1A" }}>Last-minute cravings?</h3>
                  </div>
                  <p style={{ color: "#757575", fontSize: "0.85rem", margin: "0 0 16px" }}>Add extra toppings to your pizza!</p>
                  
                  <div style={{ display: "flex", overflowX: "auto", gap: "12px", paddingBottom: "8px" }} className="scrollbar-hidden">
                    {PIZZA_TOPPINGS.map(top => {
                      const inCart = items.some(i => i.menu_item.id === top.id);
                      return (
                        <div key={top.id} style={{ minWidth: "135px", border: "1px solid #f0f0f0", borderRadius: "12px", padding: "12px", background: "#fff", position: "relative", boxShadow: "0 2px 6px rgba(0,0,0,0.04)" }}>
                          <Heart size={16} color="#e91e63" style={{ position: "absolute", top: "12px", right: "12px", zIndex: 2 }} />
                          <div style={{ fontSize: "0.9rem", fontWeight: 700, marginBottom: "8px", color: "#1A1A1A", paddingRight: "20px" }}>
                            {top.name}
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px" }}>
                            <span style={{ color: "#2E7D32", fontWeight: "800", fontSize: "0.95rem" }}>₹{top.price}</span>
                            <button 
                              onClick={() => {
                                if (!inCart) {
                                  addItem({
                                    id: top.id,
                                    name: `${top.name} (Topping)`,
                                    price: top.price,
                                    category: "Topping",
                                    bestseller: false,
                                    img: "https://images.unsplash.com/photo-1590080838960-ebcb9a8c17b5?q=80&w=200", // Generic toppings image
                                    description: "Extra pizza topping"
                                  });
                                }
                              }}
                              style={{ background: inCart ? "#4CAF50" : "#fff", border: inCart ? "none" : "1px solid #e91e63", color: inCart ? "#fff" : "#e91e63", borderRadius: "8px", width: "28px", height: "28px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", zIndex: 2 }}
                            >
                              {inCart ? <Check size={16} /> : <Plus size={16} strokeWidth={3} />}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Footer / Summary Checkout */}
            {items.length > 0 && (
              <div style={{
                padding: '1.5rem',
                background: '#fff',
                borderTop: '1px solid rgba(19,37,58,0.08)',
                boxShadow: '0 -4px 16px rgba(19,37,58,0.04)',
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
                  <span style={{ color: '#5a6a7a', fontSize: '0.85rem', fontWeight: 600 }}>Total Amount</span>
                  <span style={{ color: '#e53935', fontSize: '1.3rem', fontWeight: 900 }}>₹{subtotal}</span>
                </div>

                {/* Ordering Closed Alert */}
                {!onlineOrderingOpen && (
                  <div style={{
                    background: 'rgba(229,57,53,0.08)',
                    border: '1px solid rgba(229,57,53,0.2)',
                    borderRadius: '8px',
                    padding: '0.65rem',
                    color: '#e53935',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    textAlign: 'center',
                    marginBottom: '1rem',
                    lineHeight: '1.4',
                  }}>
                    Online ordering is closed right now. Please call us or visit our cafe.
                  </div>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={placingOrder || !onlineOrderingOpen}
                  style={{
                    width: '100%',
                    background: onlineOrderingOpen ? '#13253a' : '#aaa',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '0.9rem 0',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    cursor: onlineOrderingOpen ? (placingOrder ? 'not-allowed' : 'pointer') : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    boxShadow: '0 4px 12px rgba(19,37,58,0.18)',
                    transition: 'all 0.15s',
                  }}
                  onMouseOver={e => { if (!placingOrder && onlineOrderingOpen) e.currentTarget.style.background = '#e53935'; }}
                  onMouseOut={e => { if (!placingOrder && onlineOrderingOpen) e.currentTarget.style.background = '#13253a'; }}
                >
                  {placingOrder ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      <span>Creating Order...</span>
                    </>
                  ) : (
                    <>
                      <Check size={16} />
                      <span>{onlineOrderingOpen ? 'Proceed to Checkout' : 'Ordering Closed'}</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ===== ADMIN SETTINGS DRAWER OVERLAY ===== */}
      {adminOpen && (
        <div className="fade-in-overlay" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 1100,
          background: 'rgba(19,37,58,0.5)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          justifyContent: 'flex-end',
        }}>
          {/* Backdrop click close */}
          <div onClick={() => setAdminOpen(false)} style={{ position: 'absolute', inset: 0 }} />

          {/* Drawer Element */}
          <div className="slide-in-drawer" style={{
            position: 'relative',
            width: '100%',
            maxWidth: '380px',
            height: '100%',
            background: '#FAF6F0',
            boxShadow: '-8px 0 32px rgba(19,37,58,0.22)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(19,37,58,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              background: '#13253a',
              color: '#fff',
            }}>
              <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.1rem', fontWeight: 800 }}>
                ⚙️ Admin Settings
              </h3>
              <button
                onClick={() => setAdminOpen(false)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  opacity: 0.8,
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '1'}
                onMouseOut={e => e.currentTarget.style.opacity = '0.8'}
              >
                <X size={22} />
              </button>
            </div>

            {/* Content */}
            <div style={{ flex: 1, padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{
                background: '#fff',
                borderRadius: '16px',
                padding: '1.25rem',
                border: '1px solid #f0ebe4',
                boxShadow: '0 2px 10px rgba(0,0,0,0.03)',
              }}>
                <h4 style={{ margin: '0 0 0.5rem', color: '#13253a', fontWeight: 800, fontSize: '0.92rem' }}>
                  Store Operations
                </h4>
                <p style={{ margin: '0 0 1.25rem', fontSize: '0.75rem', color: '#7a8a9a', lineHeight: '1.4' }}>
                  Enable or disable online ordering. Toggling this off will immediately block customers from placing orders and disable checking out.
                </p>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  background: '#f7f4ef',
                  borderRadius: '12px',
                  padding: '0.85rem 1rem',
                  border: '1px solid rgba(0,0,0,0.04)',
                }}>
                  <span style={{ fontWeight: 700, fontSize: '0.82rem', color: '#13253a' }}>
                    Online Ordering
                  </span>
                  
                  <button
                    onClick={() => handleToggleOrdering(!onlineOrderingOpen)}
                    disabled={updatingConfig}
                    style={{
                      background: onlineOrderingOpen ? '#2e7d32' : '#c62828',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '8px',
                      padding: '0.4rem 1rem',
                      fontWeight: 700,
                      fontSize: '0.78rem',
                      cursor: updatingConfig ? 'not-allowed' : 'pointer',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                      transition: 'all 0.2s',
                    }}
                  >
                    {updatingConfig ? '...' : (onlineOrderingOpen ? 'ON (Accepting)' : 'OFF (Closed)')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ===== SUCCESS NOTIFICATION MODAL ===== */}
      {checkoutSuccess && (
        <div className="fade-in-overlay" style={{
          position: 'fixed',
          inset: 0,
          zIndex: 2000,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{
            width: '90%',
            maxWidth: '380px',
            background: '#FAF6F0',
            borderRadius: '24px',
            padding: '2rem',
            textAlign: 'center',
            boxShadow: '0 12px 40px rgba(0,0,0,0.3)',
            border: '1px solid rgba(111,78,55,0.1)',
            animation: 'slideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
          }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              background: '#e8f5e9',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              margin: '0 auto 1.25rem',
              color: '#2e7d32',
              boxShadow: '0 4px 10px rgba(76,175,80,0.2)',
            }}>
              🎉
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem', color: '#13253a', fontSize: '1.25rem', fontWeight: 800 }}>
              Order Placed Successfully!
            </h3>
            
            <p style={{ margin: '0 0 1rem', fontSize: '0.8rem', color: '#7a8a9a', lineHeight: '1.5' }}>
              Your gourmet delights are being freshly prepared at Vaakki Cafe. Here is your Order Reference ID:
            </p>

            <div style={{
              background: '#fff',
              border: '1px dashed #13253a30',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              fontWeight: 800,
              fontSize: '0.9rem',
              color: '#e53935',
              letterSpacing: '0.05em',
              marginBottom: '1.5rem',
              fontFamily: 'monospace',
              display: 'inline-block',
            }}>
              {checkoutSuccess}
            </div>

            <button
              onClick={() => setCheckoutSuccess(null)}
              style={{
                width: '100%',
                background: '#13253a',
                color: '#fff',
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem 0',
                fontSize: '0.85rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseOver={e => e.currentTarget.style.background = '#e53935'}
              onMouseOut={e => e.currentTarget.style.background = '#13253a'}
            >
              Wonderful, Thank You!
            </button>
          </div>
        </div>
      )}

      {/* ===== FOOTER ===== */}
      <footer style={{
        background: '#13253a', color: 'rgba(255,255,255,0.6)',
        textAlign: 'center', padding: '1.5rem 2rem',
        fontSize: '0.82rem', marginTop: '2rem',
      }}>
        © 2026 Vaakki Cafe · Near ECR, Mahabalipuram, Tamil Nadu
      </footer>

      <InstallCafeAppButton />
    </div>
  );
}

// Wrapper to inject CartProvider
export default function App() {
  return (
    <CartProvider>
      <LeeVaakkiCafeApp />
    </CartProvider>
  );
}