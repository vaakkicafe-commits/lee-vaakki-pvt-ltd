import React, { useState } from 'react';
import { UnitNav } from '../components/UnitNav';

const SERVICES = [
  {
    icon: '🌐',
    name: 'Web & App Development',
    tag: 'FULL STACK',
    desc: 'Custom web platforms, progressive web apps, and mobile-first experiences built with React, Next.js and Node.js.',
    highlights: ['React / Next.js', 'Node.js & REST APIs', 'PWA & Mobile', 'Firebase & Cloud'],
    color: '#4fc3f7',
  },
  {
    icon: '⚓',
    name: 'Marine LMS',
    tag: 'FLAGSHIP PRODUCT',
    desc: 'An elite digital training deck for maritime cadets — HD lectures shot on real ships, mock tests, PDFs and analytics for MEO Class 1–4 exams.',
    highlights: ['HD Video Lectures', 'Mock Test Engine', 'PDF Study Library', 'Student Analytics'],
    color: '#80deea',
    featured: true,
    link: 'https://marine.leevaakki.com',
    linkLabel: 'Visit SSA Marine →',
  },
  {
    icon: '🖥️',
    name: 'POS & Billing Systems',
    tag: 'HOSPITALITY TECH',
    desc: 'Integrated point-of-sale systems for cafes, dhabas and restaurants — real-time order management, inventory and sales reports.',
    highlights: ['Real-time Orders', 'Inventory Tracking', 'Sales Dashboard', 'Multi-device Sync'],
    color: '#ce93d8',
  },
  {
    icon: '📡',
    name: 'IoT & Automation',
    tag: 'SMART SYSTEMS',
    desc: 'Sensor networks, automation pipelines, and smart device integrations for farms, facilities and commercial spaces.',
    highlights: ['Sensor Networks', 'Smart Controls', 'Remote Monitoring', 'Data Pipelines'],
    color: '#a5d6a7',
  },
  {
    icon: '🎨',
    name: 'UI/UX Design',
    tag: 'DESIGN',
    desc: 'Pixel-perfect interfaces that delight users — from wireframes and design systems to polished production-ready assets.',
    highlights: ['Design Systems', 'Prototyping', 'Mobile UI', 'Brand Identity'],
    color: '#ffcc80',
  },
  {
    icon: '☁️',
    name: 'Cloud & DevOps',
    tag: 'INFRASTRUCTURE',
    desc: 'Deployment pipelines, hosting, CI/CD and monitoring — we keep your products running fast and reliably at scale.',
    highlights: ['Vercel / AWS', 'CI/CD Pipelines', 'Performance', 'Uptime Monitoring'],
    color: '#ef9a9a',
  },
];

const PROJECTS = [
  {
    name: 'Seafarer Success Academy',
    category: 'Marine LMS',
    desc: "India's #1 maritime e-learning platform with 100+ HD videos recorded on real ships — serving 1000+ cadets.",
    tech: ['React', 'Firebase', 'Razorpay', 'Node.js'],
    live: true,
    url: 'https://marine.leevaakki.com',
    color: '#006064',
  },
  {
    name: 'Vaakki Cafe PWA',
    category: 'Ordering App',
    desc: 'Progressive web app for the cafe — online ordering with Razorpay payments, Google auth, and real-time admin controls.',
    tech: ['React', 'Vite', 'Firebase', 'Razorpay'],
    live: true,
    url: 'https://leevaakki.com/cafe',
    color: '#4e342e',
  },
  {
    name: 'LV Farm Dashboard',
    category: 'IoT + Web',
    desc: 'Soil moisture sensors, weather station data and automated irrigation controls for the 3-acre LV Farm.',
    tech: ['IoT', 'Node.js', 'React', 'Charts'],
    live: false,
    color: '#1b5e20',
  },
];

export default function LvTechPage() {
  const [hoveredService, setHoveredService] = useState<string | null>(null);

  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#050d1a' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(79,195,247,0.4); }
          50% { box-shadow: 0 0 0 10px rgba(79,195,247,0); }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
        .svc-card { transition: transform 0.24s cubic-bezier(.16,1,.3,1), box-shadow 0.24s ease; }
        .svc-card:hover { transform: translateY(-6px); }
        .proj-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .proj-card:hover { transform: translateY(-4px); }
        .tech-pill {
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 999px;
          padding: 3px 10px;
          font-size: 0.65rem;
          font-weight: 700;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.04em;
        }
      `}</style>

      <UnitNav unitName="Tech" unitIcon="💻" accentColor="#4fc3f7" bgColor="#051020" />

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '480px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(135deg, #050d1a 0%, #0d1b2a 50%, #1565c0 100%)',
      }}>
        {/* Grid lines decorative */}
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.05,
          backgroundImage: 'linear-gradient(rgba(79,195,247,1) 1px, transparent 1px), linear-gradient(90deg, rgba(79,195,247,1) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }} />
        <div style={{
          position: 'absolute', top: '20%', right: '5%',
          width: '400px', height: '400px', borderRadius: '50%',
          background: 'rgba(21,101,192,0.3)', filter: 'blur(80px)',
          pointerEvents: 'none',
        }} />

        <div className="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(79,195,247,0.1)', border: '1px solid rgba(79,195,247,0.25)',
            borderRadius: '999px', padding: '0.3rem 0.9rem',
            fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#4fc3f7', marginBottom: '1.25rem',
          }}>
            💡 WEB · MARINE LMS · IoT · POS SYSTEMS
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 3.8rem)', fontWeight: 900, color: '#fff',
            lineHeight: 1.08, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            We Build Digital<br />
            <span style={{ color: '#4fc3f7' }}>Products That Last.</span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '1rem', lineHeight: 1.7, maxWidth: '500px', marginBottom: '2rem' }}>
            LV Tech designs, builds and deploys digital solutions — from marine e-learning platforms and cafe ordering apps to IoT farm dashboards.
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="mailto:tech@leevaakki.com"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#4fc3f7', color: '#050d1a',
                borderRadius: '999px', padding: '0.75rem 1.75rem',
                fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(79,195,247,0.3)',
              }}
            >
              Get a Quote →
            </a>
            <a
              href="https://marine.leevaakki.com"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', borderRadius: '999px', padding: '0.75rem 1.75rem',
                fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
              }}
            >
              ⚓ Visit Marine LMS
            </a>
          </div>
        </div>
      </section>

      {/* ===== SERVICES ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        <div style={{ marginBottom: '3rem' }}>
          <div style={{ color: '#4fc3f7', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>What We Build</div>
          <h2 style={{ color: '#fff', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Services & Products</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '1.25rem' }}>
          {SERVICES.map(svc => (
            <div
              key={svc.name}
              className="svc-card"
              onMouseEnter={() => setHoveredService(svc.name)}
              onMouseLeave={() => setHoveredService(null)}
              style={{
                background: svc.featured ? `linear-gradient(135deg, #002f35 0%, #006064 100%)` : 'rgba(255,255,255,0.03)',
                border: `1px solid ${svc.featured ? 'rgba(128,222,234,0.3)' : 'rgba(255,255,255,0.07)'}`,
                borderRadius: '18px',
                padding: '1.6rem',
                boxShadow: hoveredService === svc.name
                  ? `0 16px 40px ${svc.color}25`
                  : '0 4px 16px rgba(0,0,0,0.2)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {svc.featured && (
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: '#80deea', color: '#002f35',
                  borderRadius: '999px', padding: '2px 10px',
                  fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.06em',
                }}>
                  ⭐ FLAGSHIP
                </div>
              )}

              <div style={{
                width: '46px', height: '46px', borderRadius: '12px',
                background: `${svc.color}18`, border: `1px solid ${svc.color}35`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '1.4rem', marginBottom: '1.1rem',
              }}>
                {svc.icon}
              </div>

              <div style={{ color: svc.color, fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{svc.tag}</div>
              <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1.05rem', marginBottom: '0.6rem' }}>{svc.name}</h3>
              <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.65, marginBottom: '1.1rem' }}>{svc.desc}</p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: svc.link ? '1rem' : '0' }}>
                {svc.highlights.map(h => (
                  <span key={h} style={{
                    background: `${svc.color}14`,
                    border: `1px solid ${svc.color}25`,
                    color: svc.color,
                    borderRadius: '999px', padding: '2px 9px',
                    fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.04em',
                  }}>{h}</span>
                ))}
              </div>

              {svc.link && (
                <a
                  href={svc.link}
                  target="_blank" rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: '0.3rem',
                    color: svc.color, fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                    borderBottom: `1px solid ${svc.color}40`,
                    paddingBottom: '1px', transition: 'border-color 0.2s',
                  }}
                >
                  {svc.linkLabel}
                </a>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ===== PROJECTS ===== */}
      <section style={{ background: 'rgba(255,255,255,0.02)', borderTop: '1px solid rgba(255,255,255,0.05)', padding: '4rem 2rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <div style={{ color: '#4fc3f7', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '0.6rem' }}>Built In-House</div>
            <h2 style={{ color: '#fff', fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: 900, letterSpacing: '-0.02em' }}>Live Projects</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.25rem' }}>
            {PROJECTS.map(proj => (
              <div
                key={proj.name}
                className="proj-card"
                style={{
                  background: `linear-gradient(135deg, ${proj.color}22 0%, rgba(255,255,255,0.03) 100%)`,
                  border: `1px solid ${proj.color}30`,
                  borderRadius: '16px', padding: '1.5rem',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{ color: 'rgba(255,255,255,0.35)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.3rem' }}>{proj.category}</div>
                    <div style={{ color: '#fff', fontWeight: 800, fontSize: '1rem' }}>{proj.name}</div>
                  </div>
                  {proj.live && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '0.3rem',
                      background: 'rgba(76,175,80,0.1)', border: '1px solid rgba(76,175,80,0.2)',
                      borderRadius: '999px', padding: '2px 8px',
                      fontSize: '0.58rem', fontWeight: 700, color: '#81c784',
                    }}>
                      <span style={{ width: 5, height: 5, background: '#4CAF50', borderRadius: '50%' }} />
                      LIVE
                    </div>
                  )}
                </div>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', lineHeight: 1.6, marginBottom: '1rem' }}>{proj.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: proj.url ? '1rem' : '0' }}>
                  {proj.tech.map(t => <span key={t} className="tech-pill">{t}</span>)}
                </div>
                {proj.url && (
                  <a href={proj.url} target="_blank" rel="noreferrer" style={{
                    color: '#4fc3f7', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none',
                  }}>
                    Visit Site →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 2rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #0d1b2a 0%, #1565c0 100%)',
          borderRadius: '20px', padding: '3rem',
          textAlign: 'center',
          boxShadow: '0 12px 40px rgba(21,101,192,0.3)',
          border: '1px solid rgba(79,195,247,0.15)',
        }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🚀</div>
          <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.6rem', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Have a project in mind?
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.9rem', maxWidth: '460px', margin: '0 auto 2rem', lineHeight: 1.6 }}>
            We'd love to build it. From idea to deployment — LV Tech handles every layer of your digital product.
          </p>
          <a
            href="mailto:tech@leevaakki.com?subject=Project Enquiry"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: '#4fc3f7', color: '#050d1a',
              borderRadius: '999px', padding: '0.8rem 2rem',
              fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
              boxShadow: '0 6px 20px rgba(79,195,247,0.35)',
            }}
          >
            📧 Start a Conversation
          </a>
        </div>
      </section>

      <footer style={{ background: '#030810', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        © 2026 LV Tech · A Lee Vaakki Pvt Ltd Venture
      </footer>
    </div>
  );
}
