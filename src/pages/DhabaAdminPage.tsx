import React, { useState } from 'react';
import { UnitNav } from '../components/UnitNav';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '../firebase';

export default function DhabaAdminPage() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      // Simplified: Just mark as admin on successful Google sign-in.
      // In production, we'd verify the user's role against our database.
      setIsAdmin(true);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  if (!isAdmin) {
    return (
      <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#1a0800', display: 'flex', flexDirection: 'column' }}>
        <UnitNav unitName="Dhaba Admin" unitIcon="🔒" accentColor="#f39c12" bgColor="#2d0a00" />
        
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
          <div style={{ background: '#2d0a00', padding: '3rem 2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', maxWidth: '400px', width: '100%', boxShadow: '0 12px 30px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👩‍🍳</div>
            <h2 style={{ color: '#fff', marginBottom: '0.5rem', fontWeight: 800 }}>Staff Login</h2>
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', marginBottom: '2rem' }}>
              Mahabalipuram Cloud Kitchen
            </p>

            <button
              onClick={handleLogin}
              disabled={loading}
              style={{
                background: '#fff', color: '#1a0800', border: 'none', padding: '0.8rem 1.5rem', borderRadius: '8px',
                fontWeight: 700, cursor: 'pointer', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem'
              }}
            >
              {loading ? 'Authenticating...' : 'Sign in with Google'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard View
  return (
    <div style={{ fontFamily: "'Inter', sans-serif", minHeight: '100vh', background: '#f4f6f8' }}>
      <header style={{ background: '#2d0a00', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800, color: '#f39c12' }}>Cloud Kitchen Dashboard</h1>
          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)' }}>Location: Mahabalipuram</div>
        </div>
        <button 
          onClick={() => setIsAdmin(false)}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          Logout
        </button>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Stats Row */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: "Today's Orders", value: "12", color: "#3498db" },
            { label: "Pending", value: "3", color: "#e67e22" },
            { label: "Completed", value: "9", color: "#2ecc71" },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', padding: '1.5rem', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e1e8ed' }}>
              <div style={{ color: '#7f8c8d', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.5rem' }}>{stat.label}</div>
              <div style={{ color: stat.color, fontSize: '2rem', fontWeight: 800 }}>{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Active Orders List */}
        <div style={{ background: '#fff', borderRadius: '12px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #e1e8ed', overflow: 'hidden' }}>
          <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid #e1e8ed', background: '#fafbfc' }}>
            <h2 style={{ margin: 0, fontSize: '1.1rem', color: '#2c3e50' }}>Live Orders (Mahabalipuram)</h2>
          </div>
          
          <div style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Dummy Order 1 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ecf0f1', borderRadius: '8px', background: '#fff' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#2c3e50', marginBottom: '0.2rem' }}>Order #1042 <span style={{ background: '#f39c12', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Swiggy</span></div>
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>1x Dal Makhani, 2x Butter Naan</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: '#3498db', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Accept</button>
                <button style={{ background: '#fff', color: '#e74c3c', border: '1px solid #e74c3c', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Reject</button>
              </div>
            </div>

            {/* Dummy Order 2 */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem', border: '1px solid #ecf0f1', borderRadius: '8px', background: '#f9fbfd' }}>
              <div>
                <div style={{ fontWeight: 700, color: '#2c3e50', marginBottom: '0.2rem' }}>Order #1041 <span style={{ background: '#e74c3c', color: '#fff', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', marginLeft: '8px' }}>Zomato</span></div>
                <div style={{ fontSize: '0.85rem', color: '#7f8c8d' }}>2x Rajma Chawal, 1x Lassi</div>
              </div>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button style={{ background: '#2ecc71', color: '#fff', border: 'none', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>Mark Ready</button>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
