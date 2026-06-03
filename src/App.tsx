import React, { createContext, useContext, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, ShoppingCart, User, MapPin, Trash2, X, Plus, Minus, Check, Heart, Loader2, Compass, AlertCircle } from 'lucide-react';
import { InstallCafeAppButton } from './components/InstallCafeAppButton';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from './firebase';

// Backend Configuration
// In dev (no VITE_BACKEND_URL set), use a relative /api path so Vite's proxy
// forwards requests to http://localhost:8000 without any CORS issues.
// In production, set VITE_BACKEND_URL to your deployed backend URL.
const BACKEND_URL = (import.meta as any).env?.VITE_BACKEND_URL || '';
const API = BACKEND_URL ? `${BACKEND_URL}/api` : '/api';
// For Google OAuth popup we always need the real absolute backend URL
// (can't use a relative path for window.open or postMessage origin checks)
const BACKEND_ORIGIN = BACKEND_URL || 'http://localhost:8000';

// ============== TYPES ==============
interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image_url: string;
  is_veg: boolean;
  is_bestseller: boolean;
  is_available: boolean;
  tags: string[];
}

interface CartItem {
  menu_item: MenuItem;
  quantity: number;
}

interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  is_admin: boolean;
}

// Fallback Cafe items if backend does not list them
const FALLBACK_CAFE_ITEMS: MenuItem[] = [
  { id: "cafe_1", name: "Premium Espresso", description: "Rich, dark espresso shot pulled from freshly ground Arabica beans", price: 160, category: "Coffee", image_url: "https://images.unsplash.com/photo-1510707577719-094119f7cc54?q=80&w=800", is_veg: true, is_bestseller: true, is_available: true, tags: ["Signature", "Hot"] },
  { id: "cafe_2", name: "Classic Cappuccino", description: "Smooth espresso blended with steamed milk and topped with rich foam", price: 190, category: "Coffee", image_url: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800", is_veg: true, is_bestseller: true, is_available: true, tags: ["Best Seller"] },
  { id: "cafe_3", name: "Salted Caramel Latte", description: "Espresso shot with rich milk, sweet caramel syrup, and a touch of sea salt", price: 220, category: "Coffee", image_url: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=800", is_veg: true, is_bestseller: false, is_available: true, tags: ["Sweet", "Cold Option"] },
  { id: "cafe_4", name: "Artisan Butter Croissant", description: "Flaky, layered French pastry baked fresh with premium European butter", price: 130, category: "Pastries", image_url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=800", is_veg: true, is_bestseller: true, is_available: true, tags: ["Freshly Baked"] },
  { id: "cafe_5", name: "Blueberry Cheesecake", description: "Creamy New York style cheesecake topped with rich, tart blueberry compote", price: 260, category: "Desserts", image_url: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?q=80&w=800", is_veg: true, is_bestseller: true, is_available: true, tags: ["Premium"] },
  { id: "cafe_6", name: "Matcha Green Tea Latte", description: "Pure Japanese ceremonial matcha whisked with velvety steamed milk", price: 240, category: "Teas", image_url: "https://images.unsplash.com/photo-1536256263959-770b48d82b0a?q=80&w=800", is_veg: true, is_bestseller: false, is_available: true, tags: ["Organic", "Healthy"] },
];

// ============== CONTEXTS ==============
interface AuthContextType {
  user: UserProfile | null;
  token: string | null;
  loading: boolean;
  loginWithGoogle: () => Promise<UserProfile>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};

interface CartContextType {
  items: CartItem[];
  addItem: (item: MenuItem, qty?: number) => void;
  updateQuantity: (itemId: string, qty: number) => void;
  removeItem: (itemId: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};

// ============== PROVIDERS ==============
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('cafe_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async (authToken: string) => {
      try {
        const res = await fetch(`${API}/auth/me`, {
          headers: { Authorization: `Bearer ${authToken}` },
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data);
        } else {
          logout();
        }
      } catch (err) {
        console.error('Failed to fetch user profiles:', err);
        logout();
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchUser(token);
    } else {
      setLoading(false);
    }
  }, [token]);

  const loginWithGoogle = async (): Promise<UserProfile> => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const token = await user.getIdToken();
      
      const userProfile: UserProfile = {
        id: user.uid,
        name: user.displayName || 'Guest',
        email: user.email || '',
        phone: user.phoneNumber || '',
        is_admin: false,
      };

      localStorage.setItem('cafe_token', token);
      setToken(token);
      setUser(userProfile);
      
      return userProfile;
    } catch (error) {
      console.error('Firebase Google Login Error:', error);
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('cafe_token');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cafe_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cafe_cart', JSON.stringify(items));
  }, [items]);

  const addItem = (menuItem: MenuItem, quantity = 1) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.menu_item.id === menuItem.id);
      if (existing) {
        return prev.map((i) =>
          i.menu_item.id === menuItem.id ? { ...i, quantity: i.quantity + quantity } : i
        );
      }
      return [...prev, { menu_item: menuItem, quantity }];
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      setItems((prev) => prev.filter((i) => i.menu_item.id !== itemId));
    } else {
      setItems((prev) =>
        prev.map((i) => (i.menu_item.id === itemId ? { ...i, quantity } : i))
      );
    }
  };

  const removeItem = (itemId: string) => {
    setItems((prev) => prev.filter((i) => i.menu_item.id !== itemId));
  };

  const clearCart = () => setItems([]);

  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.menu_item.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, addItem, updateQuantity, removeItem, clearCart, itemCount, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ============== COMPONENTS ==============

// Sleek glassmorphic checkout gate modal
const GoogleLoginModal = ({
  isOpen,
  onClose,
  onSuccess,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}) => {
  const { loginWithGoogle } = useAuth();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    setError('');
    setLoading(true);
    try {
      await loginWithGoogle();
      onSuccess();
    } catch (err: any) {
      if (err.message !== 'Closed by user' && err.message !== 'Popup blocked') {
        setError('Authentication failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 10 }}
        className="relative w-[90%] max-w-[420px] rounded-3xl bg-[#FAF6F0] p-8 text-center shadow-2xl border border-[#6F4E37]/10"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 rounded-full p-1.5 text-gray-400 hover:bg-[#6F4E37]/5 hover:text-[#6F4E37] transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#6F4E37]/10 text-2xl">
          ☕
        </div>

        <h3 className="mb-2 text-2xl font-bold text-[#3E2723]">Sign in to Checkout</h3>
        <p className="mb-6 text-sm text-[#5D4037] leading-relaxed">
          Please log in with Google to place your order securely and proceed to checkout.
        </p>

        {error && (
          <div className="mb-4 rounded-xl bg-red-50 p-3 text-left text-xs text-red-600 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <button
          type="button"
          disabled={loading}
          onClick={handleGoogleLogin}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-gray-300 bg-white px-5 py-3.5 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-50 active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-5 h-5 animate-spin text-[#6F4E37]" />
          ) : (
            <>
              <svg className="w-5 h-5" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.63-.06-1.25-.16-1.84H9v3.47h4.84c-.21 1.12-.84 2.07-1.8 2.72v2.24h2.9c1.7-1.57 2.7-3.88 2.7-6.59z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.47-.8 5.96-2.2l-2.9-2.24c-.8.54-1.84.87-3.06.87-2.35 0-4.34-1.59-5.05-3.73H.95v2.3C2.43 15.89 5.5 18 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.95 10.7c-.18-.54-.28-1.12-.28-1.7s.1-1.16.28-1.7V5H.95C.35 6.2 0 7.57 0 9s.35 2.8 1 4l2.95-2.3z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.32 0 2.5.45 3.44 1.35L15 2.4C13.46.97 11.43 0 9 0 5.5 0 2.43 2.11.95 5.04l2.95 2.3c.71-2.14 2.7-3.76 5.05-3.76z"
                />
              </svg>
              <span>Continue with Google</span>
            </>
          )}
        </button>

        <div className="mt-6 text-[10px] text-gray-400">
          By signing in, you agree to our Terms of Service & Privacy Policy.
        </div>
      </motion.div>
    </div>
  );
};

// Storefront components
const CafeNavbar = ({ onCartClick }: { onCartClick: () => void }) => {
  const { user, logout, loginWithGoogle } = useAuth();
  const { itemCount } = useCart();
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-40 bg-white/70 backdrop-blur-md border-b border-[#6F4E37]/5 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-2xl">☕</span>
        <span className="text-xl font-extrabold tracking-tight text-[#3E2723]">
          Lee Vaakki <span className="text-[#6F4E37]">Café</span>
        </span>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={onCartClick}
          className="relative rounded-full p-2.5 bg-[#6F4E37]/5 text-[#6F4E37] hover:bg-[#6F4E37]/10 active:scale-95 transition-all"
        >
          <ShoppingCart className="w-5 h-5" />
          {itemCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#E53935] text-[10px] font-bold text-white ring-2 ring-white">
              {itemCount}
            </span>
          )}
        </button>

        {user ? (
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 rounded-full border border-[#6F4E37]/10 bg-white px-3 py-1.5 hover:shadow-sm"
            >
              <User className="w-4 h-4 text-[#6F4E37]" />
              <span className="text-xs font-semibold text-[#3E2723] max-w-[80px] truncate">
                {user.name.split(' ')[0]}
              </span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-2xl bg-white p-2 shadow-xl border border-gray-100 animate-slide-up">
                <div className="px-3 py-2 text-xs font-bold text-gray-400 uppercase tracking-wider">
                  Account Settings
                </div>
                <button
                  onClick={() => {
                    logout();
                    setProfileOpen(false);
                  }}
                  className="w-full text-left px-3 py-2 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={() => loginWithGoogle().catch(() => {})}
            className="rounded-full bg-[#6F4E37] hover:bg-[#5C3E2B] px-5 py-2 text-xs font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
          >
            Google Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

const MenuItemCard = ({ item }: { item: MenuItem }) => {
  const { addItem, items, updateQuantity } = useCart();
  const cartItem = items.find((i) => i.menu_item.id === item.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="group rounded-3xl bg-white p-4 shadow-md hover:shadow-xl border border-[#6F4E37]/5 transition-all flex flex-col justify-between">
      <div className="relative mb-4 overflow-hidden rounded-2xl pt-[80%] bg-gray-50">
        <img
          src={item.image_url}
          alt={item.name}
          className="absolute inset-0 h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {item.is_bestseller && (
          <span className="absolute top-3 left-3 rounded-full bg-[#6F4E37] px-3 py-1 text-[10px] font-bold text-white shadow-md">
            ⭐ Bestseller
          </span>
        )}
      </div>

      <div>
        <div className="flex items-start justify-between mb-1.5">
          <h4 className="font-extrabold text-gray-800 text-base leading-tight group-hover:text-[#6F4E37] transition-colors">
            {item.name}
          </h4>
          <span className="font-bold text-base text-[#6F4E37] shrink-0 ml-2">₹{item.price}</span>
        </div>
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-4">
          {item.description}
        </p>
      </div>

      <div className="mt-auto">
        {quantity === 0 ? (
          <button
            onClick={() => addItem(item)}
            className="w-full rounded-full bg-[#6F4E37]/5 text-[#6F4E37] hover:bg-[#6F4E37] hover:text-white py-2 text-xs font-bold active:scale-95 transition-all"
          >
            Add to Order
          </button>
        ) : (
          <div className="flex items-center justify-between rounded-full bg-[#FAF6F0] p-1 border border-[#6F4E37]/10">
            <button
              onClick={() => updateQuantity(item.id, quantity - 1)}
              className="rounded-full p-1.5 bg-white text-[#6F4E37] hover:bg-gray-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="text-xs font-bold text-[#3E2723]">{quantity}</span>
            <button
              onClick={() => updateQuantity(item.id, quantity + 1)}
              className="rounded-full p-1.5 bg-white text-[#6F4E37] hover:bg-gray-100"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Core application view wrapper
const LeeVaakkiCafeApp = () => {
  const { user, token } = useAuth();
  const { items, itemCount, subtotal, clearCart, updateQuantity, removeItem } = useCart();
  const [menuItems, setMenuItems] = useState<MenuItem[]>(FALLBACK_CAFE_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [cartOpen, setCartOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = useState<string | null>(null);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const res = await fetch(`${API}/menu`);
        if (res.ok) {
          const data = await res.json();
          // Filter items that fit a premium Cafe environment
          const cafeCats = ['Beverages', 'Desserts', 'Snacks', 'Coffee', 'Pastries'];
          const filtered = data.items.filter((i: MenuItem) => cafeCats.includes(i.category));
          if (filtered.length > 0) {
            setMenuItems(filtered);
          }
        }
      } catch (err) {
        console.warn('Backend load failed, utilizing high-fidelity fallback items');
      }
    };
    loadMenu();
  }, []);

  const categories = ['All', ...new Set(menuItems.map((i) => i.category))];

  const filteredItems =
    selectedCategory === 'All'
      ? menuItems
      : menuItems.filter((i) => i.category === selectedCategory);

  const handleCheckout = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }

    setLoadingCheckout(true);
    try {
      const orderData = {
        items: items.map((i) => ({ menu_item_id: i.menu_item.id, quantity: i.quantity })),
        order_type: 'dine-in',
        payment_method: 'online',
        customer_phone: user.phone || '9999999999',
      };

      const res = await fetch(`${API}/orders/own/cafe`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (res.ok) {
        const data = await res.json();
        setCheckoutSuccess(data.order_id);
        clearCart();
        setCartOpen(false);
      } else {
        alert('Order creation failed on backend.');
      }
    } catch (err) {
      console.error(err);
      alert('Network error placing order.');
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] pb-24 text-gray-800">
      <CafeNavbar onCartClick={() => setCartOpen(true)} />

      {/* Hero Banner */}
      <header className="px-6 py-12 text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-[#3E2723] mb-4">
          Artisan Coffee & <span className="text-[#6F4E37]">Gourmet Delights</span>
        </h1>
        <p className="text-[#5D4037] text-sm md:text-base max-w-lg mx-auto leading-relaxed">
          Sip on freshly roasted specialty blends and indulge in sweet French pastries baked fresh every morning.
        </p>
      </header>

      {/* Categories */}
      <section className="flex gap-2.5 overflow-x-auto px-6 mb-8 scrollbar-hide max-w-6xl mx-auto">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`rounded-full px-5 py-2.5 text-xs font-bold shrink-0 transition-all ${
              selectedCategory === cat
                ? 'bg-[#6F4E37] text-white shadow-md'
                : 'bg-white border border-[#6F4E37]/10 text-[#5D4037] hover:bg-[#6F4E37]/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </section>

      {/* Grid */}
      <main className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6 max-w-6xl mx-auto">
        {filteredItems.map((item) => (
          <MenuItemCard key={item.id} item={item} />
        ))}
      </main>

      {/* Floating cart drawer */}
      <AnimatePresence>
        {cartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-xs"
              onClick={() => setCartOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-[420px] bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between border-b border-gray-100 p-6">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <ShoppingCart className="w-5 h-5 text-[#6F4E37]" /> Your Order
                </h3>
                <button
                  onClick={() => setCartOpen(false)}
                  className="rounded-full p-1.5 hover:bg-gray-100 text-gray-400"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {items.length === 0 ? (
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <span className="text-4xl mb-4">🥐</span>
                  <h4 className="font-bold text-gray-800 mb-1">Your bag is empty</h4>
                  <p className="text-xs text-gray-400 leading-normal max-w-[200px]">
                    Browse our gourmet selection and add sweet delicacies!
                  </p>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {items.map(({ menu_item, quantity }) => (
                      <div
                        key={menu_item.id}
                        className="flex items-center gap-4 border-b border-gray-50 pb-4"
                      >
                        <img
                          src={menu_item.image_url}
                          alt={menu_item.name}
                          className="h-14 w-14 rounded-xl object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-sm text-gray-800 truncate">
                            {menu_item.name}
                          </h4>
                          <span className="text-xs text-[#6F4E37] font-semibold">
                            ₹{menu_item.price} each
                          </span>
                        </div>
                        <div className="flex items-center gap-2.5 rounded-full bg-gray-50 px-2.5 py-1 border border-gray-100">
                          <button
                            onClick={() => updateQuantity(menu_item.id, quantity - 1)}
                            className="text-gray-500 hover:text-[#6F4E37]"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="text-xs font-bold">{quantity}</span>
                          <button
                            onClick={() => updateQuantity(menu_item.id, quantity + 1)}
                            className="text-gray-500 hover:text-[#6F4E37]"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <button
                          onClick={() => removeItem(menu_item.id)}
                          className="text-gray-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-100 p-6 bg-gray-50">
                    <div className="flex justify-between font-bold text-sm text-gray-800 mb-6">
                      <span>Total Amount</span>
                      <span>₹{subtotal}</span>
                    </div>

                    <button
                      onClick={handleCheckout}
                      disabled={loadingCheckout}
                      className="w-full flex items-center justify-center gap-2 rounded-full bg-[#6F4E37] hover:bg-[#5C3E2B] py-4 text-sm font-bold text-white shadow-md active:scale-95 transition-all cursor-pointer"
                    >
                      {loadingCheckout ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <>
                          <Check className="w-4 h-4" /> Secure Razorpay Checkout
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Google login gate */}
      <GoogleLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={() => {
          setShowLoginModal(false);
          setCartOpen(true);
        }}
      />

      {/* Success notification */}
      <AnimatePresence>
        {checkoutSuccess && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="w-[90%] max-w-[400px] rounded-3xl bg-[#FAF6F0] p-8 text-center border border-[#6F4E37]/10 shadow-2xl"
            >
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#6F4E37]/10 text-3xl">
                🎉
              </div>
              <h3 className="mb-2 text-2xl font-bold text-[#3E2723]">Order Placed Successfully!</h3>
              <p className="mb-4 text-xs text-[#5D4037]">
                Your gourmet delights are being freshly prepared. Razorpay Order Reference ID:
              </p>
              <div className="mb-6 rounded-xl bg-white border border-[#6F4E37]/5 px-4 py-3 font-mono text-xs font-bold text-[#6F4E37] tracking-wider select-all shadow-inner">
                {checkoutSuccess}
              </div>
              <button
                onClick={() => setCheckoutSuccess(null)}
                className="w-full rounded-full bg-[#6F4E37] py-3 text-xs font-bold text-white shadow-md hover:bg-[#5C3E2B] transition-colors cursor-pointer"
              >
                Wonderful
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <InstallCafeAppButton />
    </div>
  );
};

// Main root component
export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <LeeVaakkiCafeApp />
      </CartProvider>
    </AuthProvider>
  );
}