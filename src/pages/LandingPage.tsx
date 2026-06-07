import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UNITS = [
  {
    id: 'cafe',
    icon: '☕',
    name: 'Vaakki Cafe',
    tagline: 'Artisan Coffee & Bites',
    desc: 'Premium espresso, wood-fired pizzas, fresh pastries and feel-good meals — near ECR, Mahabalipuram.',
    color: '#6F4E37',
    gradient: 'linear-gradient(135deg, #13253a 0%, #2c4a6e 100%)',
    accent: '#f0c040',
    tag: 'DINE IN · ORDER ONLINE',
    route: '/cafe',
    live: true,
    liveLabel: 'Open on Swiggy & Zomato',
  },
  {
    id: 'dhaba',
    icon: '🍛',
    name: 'LV Dhaba',
    tagline: 'Authentic Indian Flavours',
    desc: 'Wholesome daal, hot rotis, sabzi straight from the tawa — rustic dhaba cooking that feeds the soul.',
    color: '#c0392b',
    gradient: 'linear-gradient(135deg, #7b1818 0%, #c0392b 100%)',
    accent: '#f39c12',
    tag: 'DINE IN · TAKEAWAY',
    route: '/dhaba',
    live: true,
    liveLabel: 'Now Serving',
  },
  {
    id: 'farm',
    icon: '🌾',
    name: 'LV Farm',
    tagline: 'Farm-Fresh Produce',
    desc: 'Seasonal vegetables, organic herbs and natural dairy — grown with care, delivered with love.',
    color: '#2e7d32',
    gradient: 'linear-gradient(135deg, #1b5e20 0%, #388e3c 100%)',
    accent: '#aed581',
    tag: 'SEASONAL · ORGANIC',
    route: '/farm',
    live: true,
    liveLabel: 'Fresh Harvest',
  },
  {
    id: 'lvtech',
    icon: '💻',
    name: 'LV Tech',
    tagline: 'Digital Solutions & Marine LMS',
    desc: 'Web platforms, POS systems, IoT deployments — and the engine powering Seafarer Success Academy.',
    color: '#1565c0',
    gradient: 'linear-gradient(135deg, #0d1b2a 0%, #1565c0 100%)',
    accent: '#4fc3f7',
    tag: 'TECH · MARINE LMS',
    route: '/lvtech',
    live: true,
    liveLabel: 'Accepting Projects',
  },
  {
    id: 'marine',
    icon: '⚓',
    name: 'SSA Marine',
    tagline: "India's #1 Maritime LMS",
    desc: "Seafarer Success Academy — HD lectures shot on real ships, mock tests, PDFs & analytics for MEO Class 1–4 exams.",
    color: '#006064',
    gradient: 'linear-gradient(135deg, #002f35 0%, #00838f 100%)',
    accent: '#80deea',
    tag: 'E-LEARNING · MARITIME',
    route: '/marine',
    live: true,
    liveLabel: '1000+ Students Enrolled',
  },
];

const STATS = [
  { value: '5', label: 'Business Units' },
  { value: '2019', label: 'Established' },
  { value: '1000+', label: 'Happy Customers' },
  { value: 'ECR', label: 'Based Near Chennai' },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [hoveredUnit, setHoveredUnit] = useState<string | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // Subtle parallax on hero
  useEffect(() => {
    const onScroll = () => {
      if (heroRef.current) {
        heroRef.current.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#0a0f1a', color: '#fff' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .fade-up { animation: fadeUp 0.7s cubic-bezier(.16,1,.3,1) both; }
        .unit-card {
          transition: transform 0.28s cubic-bezier(.16,1,.3,1), box-shadow 0.28s ease;
          cursor: pointer;
        }
        .unit-card:hover {
          transform: translateY(-8px) scale(1.015);
        }
        .cta-btn {
          transition: all 0.2s ease;
          display: inline-flex; align-items: center; gap: 0.5rem;
          font-weight: 800; border: none; border-radius: 999px;
          cursor: pointer; letter-spacing: 0.04em;
        }
        .cta-btn:hover { transform: translateY(-2px); }
        .scrollbar-hidden::-webkit-scrollbar { display: none; }
        .scrollbar-hidden { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* ===== TOP NAV ===== */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 500,
        background: 'rgba(10,15,26,0.82)',
        backdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 2rem', height: '60px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🏛️</span>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1rem', letterSpacing: '0.06em', color: '#fff' }}>
              LEE VAAKKI
            </div>
            <div style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.15em', textTransform: 'uppercase', marginTop: '-2px' }}>
              Private Limited
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {UNITS.map(u => (
            <button
              key={u.id}
              onClick={() => u.route.startsWith('http') ? window.location.href = u.route : navigate(u.route)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px',
                padding: '0.3rem 0.75rem',
                color: 'rgba(255,255,255,0.65)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
              onMouseOver={e => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseOut={e => {
                e.currentTarget.style.background = 'transparent';
                e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {u.icon} {u.name.split(' ')[1] || u.name}
            </button>
          ))}
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        position: 'relative', overflow: 'hidden',
        paddingTop: '60px',
      }}>
        {/* Background mesh gradient */}
        <div ref={heroRef} style={{
          position: 'absolute', inset: 0, zIndex: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(99,55,155,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 40% at 80% 60%, rgba(21,101,192,0.14) 0%, transparent 60%)',
        }} />

        {/* Floating unit orbs */}
        {UNITS.map((u, i) => (
          <div key={u.id} style={{
            position: 'absolute',
            width: `${60 + i * 10}px`, height: `${60 + i * 10}px`,
            borderRadius: '50%',
            background: u.color,
            opacity: 0.06,
            filter: 'blur(40px)',
            top: `${15 + i * 16}%`,
            left: i % 2 === 0 ? `${5 + i * 8}%` : `${70 - i * 8}%`,
            pointerEvents: 'none',
          }} />
        ))}

        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '780px', padding: '0 2rem' }}>
          {/* Eyebrow */}
          <div className="fade-up" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: '999px',
            padding: '0.4rem 1.2rem',
            fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.14em',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: '2rem',
            animationDelay: '0s',
          }}>
            <span style={{ width: 6, height: 6, background: '#4CAF50', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
            MAHABALIPURAM · TAMIL NADU · EST. 2019
          </div>

          {/* Headline */}
          <h1 className="fade-up" style={{
            fontSize: 'clamp(2.8rem, 6vw, 5rem)',
            fontWeight: 900,
            lineHeight: 1.08,
            letterSpacing: '-0.03em',
            marginBottom: '1.5rem',
            animationDelay: '0.1s',
          }}>
            One Company,<br />
            <span style={{
              background: 'linear-gradient(90deg, #f0c040, #e07830, #f0c040)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite',
            }}>Five Ventures.</span>
          </h1>

          <p className="fade-up" style={{
            fontSize: '1.05rem', color: 'rgba(255,255,255,0.55)',
            lineHeight: 1.7, maxWidth: '560px', margin: '0 auto 2.5rem',
            animationDelay: '0.2s',
          }}>
            From artisan coffee and farm-fresh produce to maritime education and cutting-edge tech — Lee Vaakki Pvt Ltd powers five distinct businesses from the Coromandel Coast.
          </p>

          <div className="fade-up" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', animationDelay: '0.3s' }}>
            <button
              className="cta-btn"
              onClick={() => document.getElementById('units-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: '#f0c040', color: '#13253a',
                padding: '0.8rem 2rem', fontSize: '0.9rem',
                boxShadow: '0 8px 24px rgba(240,192,64,0.3)',
              }}
            >
              Explore Our Units ↓
            </button>
            <button
              className="cta-btn"
              onClick={() => navigate('/cafe')}
              style={{
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff',
                padding: '0.8rem 2rem', fontSize: '0.9rem',
              }}
            >
              ☕ Order at Cafe
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem',
          color: 'rgba(255,255,255,0.25)', fontSize: '0.7rem', letterSpacing: '0.1em',
        }}>
          <div style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, transparent, rgba(255,255,255,0.25))' }} />
          SCROLL
        </div>
      </section>

      {/* ===== STATS BAR ===== */}
      <section style={{
        background: 'rgba(255,255,255,0.04)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', textAlign: 'center',
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, color: '#f0c040', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600, letterSpacing: '0.08em', marginTop: '0.2rem', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== UNIT CARDS ===== */}
      <section id="units-section" style={{ padding: '6rem 2rem', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '999px',
            padding: '0.3rem 1rem',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.45)',
            marginBottom: '1.2rem',
          }}>
            OUR BUSINESS UNITS
          </div>
          <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', fontWeight: 900, letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
            What We Do
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto', lineHeight: 1.6 }}>
            Five specialised divisions, each built with the same Lee Vaakki commitment to quality.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
          gap: '1.5rem',
        }}>
          {UNITS.map((unit, idx) => (
            <div
              key={unit.id}
              className="unit-card"
              onClick={() => unit.route.startsWith('http') ? window.location.href = unit.route : navigate(unit.route)}
              onMouseEnter={() => setHoveredUnit(unit.id)}
              onMouseLeave={() => setHoveredUnit(null)}
              style={{
                background: unit.gradient,
                borderRadius: '20px',
                padding: '2rem',
                border: `1px solid rgba(255,255,255,0.08)`,
                boxShadow: hoveredUnit === unit.id
                  ? `0 20px 60px ${unit.color}40`
                  : '0 4px 20px rgba(0,0,0,0.3)',
                position: 'relative',
                overflow: 'hidden',
                animationDelay: `${idx * 0.08}s`,
              }}
            >
              {/* Background glow */}
              <div style={{
                position: 'absolute', top: '-30%', right: '-10%',
                width: '160px', height: '160px',
                borderRadius: '50%',
                background: unit.accent,
                opacity: 0.07, filter: 'blur(40px)',
                pointerEvents: 'none',
              }} />

              {/* Live badge */}
              {unit.live && (
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.35rem',
                  background: 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: '999px',
                  padding: '0.2rem 0.65rem',
                  fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.8)',
                  marginBottom: '1.25rem',
                }}>
                  <span style={{ width: 5, height: 5, background: '#4CAF50', borderRadius: '50%', display: 'inline-block', animation: 'pulse-dot 2s infinite' }} />
                  {unit.liveLabel}
                </div>
              )}

              {/* Icon */}
              <div style={{
                width: '56px', height: '56px', borderRadius: '14px',
                background: 'rgba(255,255,255,0.12)',
                border: `1px solid rgba(255,255,255,0.18)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.6rem',
                marginBottom: '1.25rem',
              }}>
                {unit.icon}
              </div>

              {/* Tag */}
              <div style={{
                fontSize: '0.6rem', fontWeight: 700, letterSpacing: '0.12em',
                color: unit.accent, marginBottom: '0.5rem', textTransform: 'uppercase',
              }}>
                {unit.tag}
              </div>

              {/* Name */}
              <h3 style={{ fontSize: '1.3rem', fontWeight: 900, color: '#fff', marginBottom: '0.5rem', letterSpacing: '-0.01em' }}>
                {unit.name}
              </h3>
              <div style={{ fontSize: '0.78rem', fontWeight: 700, color: unit.accent, marginBottom: '0.75rem' }}>
                {unit.tagline}
              </div>

              {/* Description */}
              <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6, marginBottom: '1.75rem' }}>
                {unit.desc}
              </p>

              {/* CTA */}
              <button
                style={{
                  background: unit.accent,
                  color: '#0a0f1a',
                  border: 'none',
                  borderRadius: '999px',
                  padding: '0.55rem 1.25rem',
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  cursor: 'pointer',
                  letterSpacing: '0.04em',
                  transition: 'opacity 0.2s',
                }}
                onMouseOver={e => e.currentTarget.style.opacity = '0.85'}
                onMouseOut={e => e.currentTarget.style.opacity = '1'}
              >
                Visit {unit.name} →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.06)',
        padding: '3rem 2rem',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>🏛️</div>
        <div style={{ fontWeight: 900, fontSize: '1.1rem', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
          LEE VAAKKI PVT LTD
        </div>
        <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.78rem', marginBottom: '1.5rem' }}>
          Near ECR, Mahabalipuram, Tamil Nadu · info@leevaakki.com
        </div>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {UNITS.map(u => (
            <button
              key={u.id}
              onClick={() => u.route.startsWith('http') ? window.location.href = u.route : navigate(u.route)}
              style={{
                background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '6px', padding: '0.3rem 0.85rem',
                color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem', fontWeight: 600,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
              onMouseOut={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.45)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            >
              {u.icon} {u.name}
            </button>
          ))}
        </div>
        <div style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.72rem' }}>
          © 2026 Lee Vaakki Pvt Ltd · All Rights Reserved
        </div>
      </footer>
    </div>
  );
}
