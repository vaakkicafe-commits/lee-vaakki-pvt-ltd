import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UnitNavProps {
  unitName: string;
  unitIcon: string;
  accentColor: string;
  bgColor?: string;
}

export function UnitNav({ unitName, unitIcon, accentColor, bgColor = '#13253a' }: UnitNavProps) {
  const navigate = useNavigate();

  return (
    <header style={{
      background: bgColor,
      padding: '0 1.5rem',
      height: '56px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 200,
      boxShadow: '0 2px 16px rgba(0,0,0,0.18)',
    }}>
      {/* Back button */}
      <button
        onClick={() => navigate('/')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.18)',
          borderRadius: '8px',
          padding: '0.3rem 0.85rem',
          color: '#fff',
          fontSize: '0.78rem',
          fontWeight: 700,
          cursor: 'pointer',
          letterSpacing: '0.03em',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.18)'}
        onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
      >
        ← All Units
      </button>

      {/* Unit name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span style={{ fontSize: '1.2rem' }}>{unitIcon}</span>
        <span style={{
          color: '#fff',
          fontWeight: 800,
          fontSize: '1rem',
          letterSpacing: '0.05em',
        }}>
          VAAKKI <span style={{ color: accentColor }}>{unitName.toUpperCase()}</span>
        </span>
      </div>

      {/* LV Brand */}
      <div style={{
        fontSize: '0.65rem',
        fontWeight: 700,
        color: 'rgba(255,255,255,0.45)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
      }}>
        Lee Vaakki Pvt Ltd
      </div>
    </header>
  );
}
