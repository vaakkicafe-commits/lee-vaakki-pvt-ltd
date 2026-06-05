import React, { useState } from 'react';
import { UnitNav } from '../components/UnitNav';

const COURSES = [
  {
    name: 'MEO Class 4 – Full Prep',
    category: 'Marine Engineering',
    badge: 'Most Popular',
    badgeColor: '#f0c040',
    desc: 'Complete preparation for MMD MEO Class 4 exam — Motor, KOM, EK, and General Engineering papers with 100+ video lectures.',
    duration: '6 Months',
    videos: '100+',
    tests: '40+',
    price: 4999,
    icon: '⚙️',
  },
  {
    name: 'MEO Class 3 – Advanced Modules',
    category: 'Marine Engineering',
    badge: 'New',
    badgeColor: '#4fc3f7',
    desc: 'Advanced engine room operations, refrigeration, automation and watchkeeping — designed for Class 3 candidates.',
    duration: '4 Months',
    videos: '60+',
    tests: '25+',
    price: 3999,
    icon: '🔧',
  },
  {
    name: 'GP Rating Foundation',
    category: 'Deck / Rating',
    badge: 'Beginner Friendly',
    badgeColor: '#a5d6a7',
    desc: 'Everything a GP Rating trainee needs — watchkeeping duties, safety equipment, STCW basics and oral preparation.',
    duration: '3 Months',
    videos: '45+',
    tests: '20+',
    price: 1999,
    icon: '⚓',
  },
  {
    name: 'Navigation & Chartwork',
    category: 'Deck Officers',
    badge: null,
    badgeColor: '',
    desc: 'Terrestrial and celestial navigation, chartwork, IALA buoyage, colregs and passage planning for deck officers.',
    duration: '2 Months',
    videos: '35+',
    tests: '15+',
    price: 2499,
    icon: '🗺️',
  },
];

const STATS = [
  { value: '1000+', label: 'Students Enrolled', icon: '🎓' },
  { value: '100+', label: 'Real Ship Videos', icon: '🎥' },
  { value: '70%', label: 'Job Placement Rate', icon: '💼' },
  { value: 'Class 1–4', label: 'MMD Exam Coverage', icon: '📋' },
];

const FEATURES = [
  { icon: '🎥', title: 'HD Lectures on Real Ships', desc: 'Every video is recorded aboard active vessels by serving officers — not in classrooms.' },
  { icon: '📝', title: 'Mock Test Engine', desc: 'Timed, exam-pattern mock tests with instant feedback, scoring and topic breakdowns.' },
  { icon: '📄', title: 'PDF Study Library', desc: 'Curated notes, cheat sheets, previous year papers and oral guides for every paper.' },
  { icon: '📊', title: 'Progress Analytics', desc: 'Track your scores, study hours and weak areas with an intelligent student dashboard.' },
  { icon: '📱', title: 'Study Anywhere', desc: 'Mobile-first PWA — watch offline, take tests on the go, no app download required.' },
  { icon: '🤝', title: 'Coaching Network', desc: 'Access to a growing network of maritime coaching institutes and mentors across India.' },
];

export default function MarinePage() {
  const [activeTab, setActiveTab] = useState<'courses' | 'features'>('courses');

  return (
    <div style={{ fontFamily: "'Inter','Roboto',sans-serif", minHeight: '100vh', background: '#020d10' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes wave {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        .fade-up { animation: fadeUp 0.6s cubic-bezier(.16,1,.3,1) both; }
        .wave { animation: wave 4s ease-in-out infinite; }
        .course-card { transition: transform 0.22s ease, box-shadow 0.22s ease; }
        .course-card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(0,131,143,0.25) !important; }
        .feat-card { transition: transform 0.2s ease; }
        .feat-card:hover { transform: translateY(-4px); }
      `}</style>

      <UnitNav unitName="Marine" unitIcon="⚓" accentColor="#80deea" bgColor="#002f35" />

      {/* ===== HERO ===== */}
      <section style={{
        position: 'relative', overflow: 'hidden',
        minHeight: '520px', display: 'flex', alignItems: 'center',
        background: 'linear-gradient(160deg, #002f35 0%, #006064 50%, #00838f 100%)',
      }}>
        {/* Ocean image overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(https://images.unsplash.com/photo-1559825481-12a05cc00344?q=80&w=1600)',
          backgroundSize: 'cover', backgroundPosition: 'center bottom',
          opacity: 0.12,
        }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to right, rgba(2,13,16,0.95) 0%, rgba(2,13,16,0.6) 60%, rgba(2,13,16,0.2) 100%)',
        }} />
        {/* Animated ship icon */}
        <div className="wave" style={{
          position: 'absolute', right: '5%', top: '15%', fontSize: '8rem', opacity: 0.12,
          userSelect: 'none',
        }}>🚢</div>

        <div className="fade-up" style={{ position: 'relative', zIndex: 1, maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.45rem',
            background: 'rgba(128,222,234,0.1)', border: '1px solid rgba(128,222,234,0.25)',
            borderRadius: '999px', padding: '0.35rem 1rem',
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em',
            color: '#80deea', marginBottom: '1.25rem',
          }}>
            ⚓ INDIA'S #1 MARITIME E-LEARNING PLATFORM
          </div>

          <h1 style={{
            fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 900, color: '#fff',
            lineHeight: 1.05, letterSpacing: '-0.03em', marginBottom: '1rem',
          }}>
            Seafarer Success<br />
            <span style={{
              background: 'linear-gradient(90deg, #80deea, #4fc3f7, #80deea)',
              backgroundSize: '200% auto',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              animation: 'shimmer 3s linear infinite',
            }}>
              Academy.
            </span>
          </h1>

          <p style={{ color: 'rgba(255,255,255,0.58)', fontSize: '1rem', lineHeight: 1.75, maxWidth: '500px', marginBottom: '0.75rem' }}>
            An elite digital training deck for maritime cadets — HD lectures recorded on <strong style={{ color: 'rgba(255,255,255,0.85)' }}>real ships</strong>, mock tests, PDFs and analytics to prepare for MEO Class 1–4 exams.
          </p>
          <p style={{ color: 'rgba(128,222,234,0.7)', fontSize: '0.82rem', fontWeight: 600, marginBottom: '2rem' }}>
            1000+ students enrolled · 70% job placement rate · Trusted by coaching institutes across India
          </p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a
              href="https://marine.leevaakki.com"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#80deea', color: '#002f35',
                borderRadius: '999px', padding: '0.8rem 2rem',
                fontWeight: 800, fontSize: '0.92rem', textDecoration: 'none',
                boxShadow: '0 8px 28px rgba(128,222,234,0.35)',
              }}
            >
              🚢 Enroll Now →
            </a>
            <button
              onClick={() => document.getElementById('courses-section')?.scrollIntoView({ behavior: 'smooth' })}
              style={{
                background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.18)',
                color: '#fff', borderRadius: '999px', padding: '0.8rem 2rem',
                fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer',
              }}
            >
              View Courses ↓
            </button>
          </div>
        </div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{
        background: 'rgba(128,222,234,0.05)',
        borderTop: '1px solid rgba(128,222,234,0.1)',
        borderBottom: '1px solid rgba(128,222,234,0.1)',
        padding: '2rem',
      }}>
        <div style={{
          maxWidth: '900px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem', textAlign: 'center',
        }}>
          {STATS.map(s => (
            <div key={s.label}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.3rem' }}>{s.icon}</div>
              <div style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.9rem)', fontWeight: 900, color: '#80deea', letterSpacing: '-0.02em' }}>{s.value}</div>
              <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.35)', fontWeight: 600, letterSpacing: '0.06em', marginTop: '0.2rem', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== TABS: COURSES / FEATURES ===== */}
      <section id="courses-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '5rem 2rem' }}>
        {/* Tab switcher */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '3rem' }}>
          {(['courses', 'features'] as const).map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                background: activeTab === tab ? '#80deea' : 'rgba(255,255,255,0.05)',
                border: `1.5px solid ${activeTab === tab ? '#80deea' : 'rgba(255,255,255,0.1)'}`,
                color: activeTab === tab ? '#002f35' : 'rgba(255,255,255,0.55)',
                borderRadius: '999px',
                padding: '0.5rem 1.4rem',
                fontWeight: 700, fontSize: '0.82rem', cursor: 'pointer',
                letterSpacing: '0.04em', textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {tab === 'courses' ? '📚 Courses' : '✨ Platform Features'}
            </button>
          ))}
        </div>

        {activeTab === 'courses' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {COURSES.map(course => (
              <div
                key={course.name}
                className="course-card"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(128,222,234,0.12)',
                  borderRadius: '18px', padding: '1.6rem',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.25)',
                  position: 'relative',
                }}
              >
                {course.badge && (
                  <span style={{
                    position: 'absolute', top: '1.1rem', right: '1.1rem',
                    background: course.badgeColor, color: '#002f35',
                    borderRadius: '999px', padding: '2px 9px',
                    fontSize: '0.58rem', fontWeight: 800, letterSpacing: '0.06em',
                  }}>
                    {course.badge}
                  </span>
                )}

                <div style={{ fontSize: '1.8rem', marginBottom: '0.85rem' }}>{course.icon}</div>
                <div style={{ color: 'rgba(128,222,234,0.6)', fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.35rem' }}>{course.category}</div>
                <h3 style={{ color: '#fff', fontWeight: 800, fontSize: '1rem', marginBottom: '0.6rem', paddingRight: course.badge ? '70px' : '0' }}>{course.name}</h3>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.78rem', lineHeight: 1.6, marginBottom: '1.2rem' }}>{course.desc}</p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '1.25rem' }}>
                  {[
                    { label: 'Duration', val: course.duration },
                    { label: 'Videos', val: course.videos },
                    { label: 'Tests', val: course.tests },
                  ].map(m => (
                    <div key={m.label} style={{
                      background: 'rgba(128,222,234,0.06)', border: '1px solid rgba(128,222,234,0.1)',
                      borderRadius: '8px', padding: '0.5rem', textAlign: 'center',
                    }}>
                      <div style={{ color: '#80deea', fontWeight: 800, fontSize: '0.82rem' }}>{m.val}</div>
                      <div style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.58rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{m.label}</div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ color: '#80deea', fontWeight: 900, fontSize: '1.2rem' }}>₹{course.price.toLocaleString()}</span>
                    <span style={{ color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', marginLeft: '0.3rem' }}>/ course</span>
                  </div>
                  <a
                    href="https://marine.leevaakki.com"
                    target="_blank" rel="noreferrer"
                    style={{
                      background: '#80deea', color: '#002f35',
                      borderRadius: '999px', padding: '0.45rem 1.1rem',
                      fontSize: '0.75rem', fontWeight: 800, textDecoration: 'none',
                    }}
                  >
                    Enroll →
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'features' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {FEATURES.map(feat => (
              <div
                key={feat.title}
                className="feat-card"
                style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(128,222,234,0.1)',
                  borderRadius: '16px', padding: '1.5rem',
                }}
              >
                <div style={{ fontSize: '1.8rem', marginBottom: '0.85rem' }}>{feat.icon}</div>
                <div style={{ color: '#80deea', fontWeight: 800, fontSize: '0.95rem', marginBottom: '0.45rem' }}>{feat.title}</div>
                <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.8rem', lineHeight: 1.65 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* ===== CTA ===== */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem 5rem' }}>
        <div style={{
          background: 'linear-gradient(135deg, #002f35 0%, #00838f 100%)',
          borderRadius: '20px', padding: '3rem',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '2rem',
          boxShadow: '0 12px 40px rgba(0,131,143,0.3)',
          border: '1px solid rgba(128,222,234,0.15)',
        }}>
          <div>
            <div style={{ color: '#80deea', fontWeight: 700, fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Ready to Set Sail?
            </div>
            <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.5rem', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
              Start Your Maritime Career Today
            </h3>
            <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: '0.85rem', maxWidth: '420px', lineHeight: 1.6 }}>
              Join over 1,000 cadets who have already enrolled with Seafarer Success Academy. MEO Class 4 to Class 1 — we've got every rank covered.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <a
              href="https://marine.leevaakki.com"
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#80deea', color: '#002f35',
                borderRadius: '999px', padding: '0.8rem 1.8rem',
                fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(128,222,234,0.35)',
              }}
            >
              🚢 Go to SSA Marine
            </a>
            <a
              href="https://wa.me/919999999999?text=Hi!%20I%20want%20to%20know%20more%20about%20SSA%20Marine%20courses."
              target="_blank" rel="noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: '#25D366', color: '#fff',
                borderRadius: '999px', padding: '0.8rem 1.8rem',
                fontWeight: 800, fontSize: '0.9rem', textDecoration: 'none',
              }}
            >
              📱 Ask on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <footer style={{ background: '#010809', textAlign: 'center', padding: '1.5rem', color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
        © 2026 Seafarer Success Academy · Powered by LV Tech · A Lee Vaakki Pvt Ltd Venture
      </footer>
    </div>
  );
}
