import React, { useEffect, useRef, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { vehicles } from '../utils/vehicleData';
import './VehicleDetail.css';

// ── COULEURS DISPONIBLES PAR VÉHICULE ──
const vehicleColors = {
  'mercedes-s-class': [
    { name: 'Noir Obsidian',    hex: '#0a0a0a' },
    { name: 'Blanc Diamant',    hex: '#e8e8e8' },
    { name: 'Gris Selenite',    hex: '#6b7280' },
    { name: 'Bleu Cavansite',   hex: '#1e3a5f' },
    { name: 'Or Mojave',        hex: '#b8924a' },
  ],
  'mercedes-eqs': [
    { name: 'Noir Obsidian',    hex: '#0a0a0a' },
    { name: 'Blanc Diamant',    hex: '#e8e8e8' },
    { name: 'Bleu Spectral',    hex: '#1a3a6e' },
    { name: 'Gris Graphite',    hex: '#4a4a4a' },
  ],
  'porsche-911': [
    { name: 'Rouge Carmin',     hex: '#8b0000' },
    { name: 'Blanc Carrara',    hex: '#f0ede8' },
    { name: 'Jaune Racing',     hex: '#f0c040' },
    { name: 'Noir Jet',         hex: '#0a0a0a' },
    { name: 'Bleu Gentiane',    hex: '#1a2a6e' },
    { name: 'Vert Python',      hex: '#2d5a27' },
  ],
  'porsche-taycan': [
    { name: 'Frozen Blue',      hex: '#a8c5d8' },
    { name: 'Noir Jet',         hex: '#0a0a0a' },
    { name: 'Blanc Carrara',    hex: '#f0ede8' },
    { name: 'Violet Acid',      hex: '#6b21a8' },
    { name: 'Vert Mamba',       hex: '#1a3a2a' },
  ],
  'mercedes-amg-gt': [
    { name: 'Noir Obsidian',    hex: '#0a0a0a' },
    { name: 'Rouge Jupiter',    hex: '#7a1515' },
    { name: 'Gris Selenite',    hex: '#6b7280' },
    { name: 'Blanc Diamant',    hex: '#e8e8e8' },
  ],
  'porsche-cayenne': [
    { name: 'Blanc Carrara',    hex: '#f0ede8' },
    { name: 'Noir Jet',         hex: '#0a0a0a' },
    { name: 'Brun Mahogany',    hex: '#4a2010' },
    { name: 'Gris Craie',       hex: '#8a8a7a' },
    { name: 'Rouge Carmin',     hex: '#8b0000' },
  ],
};

// ── SPECS ÉTENDUES ──
const extendedSpecs = {
  'mercedes-s-class': {
    engine:      'Hybride 3.0L 6-cyl',
    torque:      '500 Nm',
    transmission:'9G-Tronic',
    weight:      '2 175 kg',
    length:      '5 179 mm',
    wheelbase:   '3 216 mm',
    trunk:       '510 L',
    warranty:    '4 ans',
  },
  'mercedes-eqs': {
    engine:      'Bi-moteur électrique',
    torque:      '858 Nm',
    transmission:'Réducteur 1 vitesse',
    weight:      '2 585 kg',
    length:      '5 216 mm',
    wheelbase:   '3 210 mm',
    trunk:       '610 L',
    warranty:    '4 ans',
  },
  'porsche-911': {
    engine:      'Flat-6 3.0L Biturbo',
    torque:      '530 Nm',
    transmission:'PDK 8 rapports',
    weight:      '1 500 kg',
    length:      '4 519 mm',
    wheelbase:   '2 450 mm',
    trunk:       '132 L',
    warranty:    '2 ans',
  },
  'porsche-taycan': {
    engine:      'Bi-moteur 800V',
    torque:      '1 050 Nm',
    transmission:'2 réducteurs',
    weight:      '2 370 kg',
    length:      '4 963 mm',
    wheelbase:   '2 900 mm',
    trunk:       '407 L',
    warranty:    '4 ans',
  },
  'mercedes-amg-gt': {
    engine:      'V8 4.0L Biturbo',
    torque:      '900 Nm',
    transmission:'AMG Speedshift DCT 9G',
    weight:      '2 045 kg',
    length:      '5 047 mm',
    wheelbase:   '3 005 mm',
    trunk:       '461 L',
    warranty:    '2 ans',
  },
  'porsche-cayenne': {
    engine:      'V8 4.0L Biturbo',
    torque:      '850 Nm',
    transmission:'Tiptronic S 8G',
    weight:      '2 245 kg',
    length:      '4 918 mm',
    wheelbase:   '2 895 mm',
    trunk:       '770 L',
    warranty:    '2 ans',
  },
};

// ── FEATURE ICONS ──
const featureIcons = {
  'MBUX Hyperscreen':        '◎',
  'Massage 5 zones':         '◈',
  'Suspension pneumatique':  '◇',
  'Drive Pilot':             '◉',
  "523 km d'autonomie":      '◈',
  'Charge 200kW':            '⚡',
  'MBUX Hyperscreen 1.41m':  '▣',
  'EQ Power':                '◎',
  'PDK 8 rapports':          '◷',
  'PASM Sport':              '◈',
  'Sport Chrono Package':    '◎',
  'Rear-Axle Steering':      '◇',
  '800V Architecture':       '⚡',
  '0-100 en 2.8s':           '◎',
  '2 moteurs électriques':   '◈',
  'Launch Control':          '◉',
  'V8 Biturbo 4.0L':         '◈',
  'AMG Speedshift DCT 9G':   '◷',
  'AMG Ride Control+':       '◇',
  'Drift Mode':              '◉',
  'Rear-Axle Steering 2.8°': '◇',
  'Titanium Package':        '◈',
  'Nürburgring Record':      '◎',
};

// ── PARTICLES ──
function Particles() {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id:    i,
    x:     `${Math.random() * 100}%`,
    y:     `${40 + Math.random() * 60}%`,
    dur:   `${4 + Math.random() * 7}s`,
    delay: `${Math.random() * 7}s`,
  }));

  return (
    <div className="vd-hero__particles">
      {particles.map(p => (
        <div key={p.id} className="vd-particle"
          style={{ '--x': p.x, '--y': p.y, '--dur': p.dur, '--delay': p.delay }}
        />
      ))}
    </div>
  );
}

// ── COLOR SWATCH ──
function ColorPicker({ colors, accent }) {
  const [selected, setSelected] = useState(0);
  return (
    <div className="vd-colors">
      <div className="vd-colors__header">
        <span className="vd-section-label">Couleur</span>
        <span className="vd-colors__name">{colors[selected].name}</span>
      </div>
      <div className="vd-colors__swatches">
        {colors.map((c, i) => (
          <button
            key={c.hex}
            className={`vd-swatch ${i === selected ? 'active' : ''}`}
            style={{ background: c.hex, boxShadow: i === selected ? `0 0 0 2px #111, 0 0 0 4px ${accent}` : 'none' }}
            onClick={() => setSelected(i)}
            title={c.name}
          />
        ))}
      </div>
    </div>
  );
}

// ── TAB PANEL ──
function TabPanel({ vehicle, specs }) {
  const [tab, setTab] = useState('features');
  const tabs = [
    { id: 'features',  label: 'Équipements' },
    { id: 'specs',     label: 'Fiche Technique' },
    { id: 'financing', label: 'Financement' },
  ];

  return (
    <div className="vd-tabs">
      <div className="vd-tabs__nav">
        {tabs.map(t => (
          <button
            key={t.id}
            className={`vd-tab-btn ${tab === t.id ? 'active' : ''}`}
            style={ tab === t.id ? { borderColor: vehicle.accent, color: vehicle.accent } : {} }
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'features' && (
        <div className="vd-features-grid">
          {vehicle.features.map(f => (
            <div key={f} className="vd-feature">
              <div className="vd-feature__icon" style={{ color: vehicle.accent }}>
                {featureIcons[f] || '◈'}
              </div>
              <span>{f}</span>
            </div>
          ))}
        </div>
      )}

      {tab === 'specs' && specs && (
        <div className="vd-techspecs">
          {Object.entries(specs).map(([key, val]) => {
            const labels = {
              engine: 'Moteur', torque: 'Couple', transmission: 'Transmission',
              weight: 'Poids', length: 'Longueur', wheelbase: 'Empattement',
              trunk: 'Coffre', warranty: 'Garantie',
            };
            return (
              <div key={key} className="vd-techspec-row">
                <span className="vd-techspec-label">{labels[key] || key}</span>
                <span className="vd-techspec-dots" />
                <span className="vd-techspec-value" style={{ color: vehicle.accent }}>{val}</span>
              </div>
            );
          })}
        </div>
      )}

      {tab === 'financing' && (
        <div className="vd-financing">
          {[
            { type: 'LOA',    duration: '48 mois', deposit: '20%',  monthly: `${Math.round(parseInt(vehicle.price.replace(' ','')) * 0.018)} €/mois` },
            { type: 'Crédit', duration: '60 mois', deposit: '10%',  monthly: `${Math.round(parseInt(vehicle.price.replace(' ','')) * 0.022)} €/mois` },
            { type: 'LLD',    duration: '36 mois', deposit: '15%',  monthly: `${Math.round(parseInt(vehicle.price.replace(' ','')) * 0.025)} €/mois` },
          ].map(plan => (
            <div key={plan.type} className="vd-finance-card">
              <span className="vd-finance-type" style={{ color: vehicle.accent }}>{plan.type}</span>
              <div className="vd-finance-row"><span>Durée</span><strong>{plan.duration}</strong></div>
              <div className="vd-finance-row"><span>Apport</span><strong>{plan.deposit}</strong></div>
              <div className="vd-finance-monthly">{plan.monthly}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── MAIN COMPONENT ──
export default function VehicleDetail() {
  const { id }           = useParams();
  const { isAuthenticated } = useAuth();
  const heroRef          = useRef(null);
  const cursorRef        = useRef(null);
  const [loaded, setLoaded] = useState(false);

  const vehicle = vehicles.find(v => v.id === id);
  const colors  = vehicleColors[id] || [{ name: 'Noir Jet', hex: '#0a0a0a' }];
  const specs   = extendedSpecs[id];

  // CURSOR
  useEffect(() => {
    const move = e => {
      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + 'px';
        cursorRef.current.style.top  = e.clientY + 'px';
      }
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // PARALLAX
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const bg      = hero.querySelector('.vd-hero__bg img');
    const content = hero.querySelector('.vd-hero__content');
    const onScroll = () => {
      const y = window.scrollY;
      if (bg)      bg.style.transform      = `scale(1.06) translateY(${y * 0.22}px)`;
      if (content) content.style.transform = `translateY(${y * 0.1}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [loaded]);

  // SCROLL REVEAL
  useEffect(() => {
    if (!vehicle) return;
    const items = document.querySelectorAll('.vd-spec-item, .vd-feature, .vd-techspec-row, .vd-finance-card');
    const obs = new IntersectionObserver(entries =>
      entries.forEach((e, i) => {
        if (e.isIntersecting) {
          e.target.style.transitionDelay = `${i * 0.06}s`;
          e.target.style.opacity         = '1';
          e.target.style.transform       = 'translateY(0)';
        }
      }), { threshold: 0.1 }
    );
    items.forEach(el => {
      el.style.opacity    = '0';
      el.style.transform  = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s cubic-bezier(0.16,1,0.3,1), transform 0.6s cubic-bezier(0.16,1,0.3,1)';
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, [loaded, vehicle]);

  // 404
  if (!vehicle) {
    return (
      <main className="page-wrapper vd-404">
        <div>
          <h2 style={{ fontFamily: 'Cormorant Garamond,serif', fontSize: 80, color: 'var(--gold)', fontWeight: 300 }}>404</h2>
          <p style={{ fontFamily: 'Josefin Sans,sans-serif', letterSpacing: 4, fontSize: 10, color: 'var(--white-muted)', marginTop: 12, textTransform: 'uppercase' }}>
            Véhicule introuvable
          </p>
          <Link to="/vehicles" className="btn-gold-luxury" style={{ marginTop: 40, display: 'inline-flex' }}>
            Retour à la collection
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="page-wrapper vd-page">

      {/* CURSOR */}
      <div className="vd-cursor-glow" ref={cursorRef} />

      {/* ══ HERO ══ */}
      <div
        ref={heroRef}
        className={`vd-hero ${loaded ? 'is-loaded' : ''}`}
        style={{ background: `linear-gradient(135deg, ${vehicle.color} 0%, #030303 100%)` }}
      >
        <div className="vd-hero__bg">
          <img src={vehicle.image} alt={vehicle.model} onLoad={() => setLoaded(true)} />
        </div>
        <div className="vd-hero__overlay" />
        <div className="vd-hero__grid" />
        <Particles />

        <div className="vd-hero__content">
          <Link to="/vehicles" className="vd-back">Retour à la collection</Link>

          <div className="vd-hero__meta">
            <span className="vd-hero__category">{vehicle.category}</span>
            {vehicle.isNew    && <span className="vd-hero__badge vd-hero__badge--new">Nouveau</span>}
            {vehicle.isElectric && <span className="vd-hero__badge vd-hero__badge--ev" style={{ background: vehicle.accent }}>100% EV</span>}
          </div>

          <span className="vd-hero__brand">{vehicle.brand}</span>
          <h1 className="vd-hero__model">{vehicle.model}</h1>

          <div className="vd-hero__divider">
            <div className="vd-hero__divider-gem" style={{ background: vehicle.accent, boxShadow: `0 0 16px ${vehicle.accent}` }} />
          </div>

          <p className="vd-hero__tagline">{vehicle.tagline}</p>

          {/* HERO MINI SPECS */}
          <div className="vd-hero__minispecs">
            {[
              { icon: '⚡', label: 'Puissance',   value: vehicle.power },
              { icon: '◷', label: '0 → 100 km/h', value: vehicle.acceleration },
              { icon: '▶', label: 'Vmax',          value: vehicle.speed },
            ].map(s => (
              <div key={s.label} className="vd-hero__minispec">
                <span className="vd-hero__minispec-icon" style={{ color: vehicle.accent }}>{s.icon}</span>
                <span className="vd-hero__minispec-value">{s.value}</span>
                <span className="vd-hero__minispec-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="vd-hero__price-badge">
            <span className="vd-price-from">Prix de départ</span>
            <span className="vd-price-amount">{vehicle.price}<span>€</span></span>
          </div>
        </div>

        <div className="vd-scroll-indicator">
          <div className="vd-scroll-line" />
          <span className="vd-scroll-text">Découvrir</span>
        </div>
      </div>

      {/* ══ SPECS BAR ══ */}
      <div className="vd-specs-bar">
        {[
          { label: 'Puissance',    value: vehicle.power },
          { label: '0 → 100',      value: vehicle.acceleration },
          { label: 'Vitesse max',  value: vehicle.speed },
          { label: 'Énergie',      value: vehicle.fuel },
          ...(specs ? [
            { label: 'Couple',     value: specs.torque },
            { label: 'Poids',      value: specs.weight },
            { label: 'Coffre',     value: specs.trunk },
            { label: 'Garantie',   value: specs.warranty },
          ] : []),
        ].map(s => (
          <div key={s.label} className="vd-spec-item">
            <span className="vd-spec-item__value" style={{ color: vehicle.accent }}>{s.value}</span>
            <span className="vd-spec-item__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ══ BODY ══ */}
      <section className="vd-details">
        <div className="vd-body">

          {/* LEFT COLUMN */}
          <div className="vd-left">

            {/* COLOR PICKER */}
            <ColorPicker colors={colors} accent={vehicle.accent} />

            {/* TABS */}
            <TabPanel vehicle={vehicle} specs={specs} />

          </div>

          {/* RIGHT COLUMN — CTA */}
          <div className="vd-cta-panel">

            {/* PRICE */}
            <div className="vd-price-block">
              <span className="vd-price-label">Prix de départ</span>
              <div className="vd-price-value">
                {vehicle.price}
                <span className="vd-price-currency">€</span>
              </div>
              <span className="vd-price-note">Financement · LOA · Crédit</span>
            </div>

            {/* ENGINE BADGE */}
            {specs && (
              <div className="vd-engine-badge">
                <span className="vd-engine-icon" style={{ color: vehicle.accent }}>◈</span>
                <div>
                  <span className="vd-engine-label">Motorisation</span>
                  <span className="vd-engine-value">{specs.engine}</span>
                </div>
              </div>
            )}

            {/* TRANSMISSION */}
            {specs && (
              <div className="vd-engine-badge" style={{ marginTop: 12 }}>
                <span className="vd-engine-icon" style={{ color: vehicle.accent }}>◷</span>
                <div>
                  <span className="vd-engine-label">Transmission</span>
                  <span className="vd-engine-value">{specs.transmission}</span>
                </div>
              </div>
            )}

            <div className="vd-cta-divider" />

            {isAuthenticated ? (
              <div className="vd-actions">
                <Link to="/contact" className="btn-gold-luxury">Demander un essai</Link>
                <Link to="/contact" className="btn-outline-luxury">Configurer mon véhicule</Link>
                <a href="tel:+33123456789" className="vd-phone-cta">
                  <span style={{ color: vehicle.accent }}>✆</span>
                  Parler à un conseiller
                </a>
              </div>
            ) : (
              <div className="vd-auth-prompt">
                <p>Connectez-vous pour accéder à la configuration, l'essai routier et les offres personnalisées.</p>
                <Link to="/login" className="btn-gold-luxury" style={{ marginTop: 24, display: 'flex' }}>
                  Se connecter
                </Link>
              </div>
            )}

            {/* TRUST BADGES */}
            <div className="vd-trust">
              {['Livraison offerte', 'Reprise estimée', 'Essai 48h'].map(t => (
                <div key={t} className="vd-trust-item">
                  <span style={{ color: vehicle.accent }}>✓</span> {t}
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

    </main>
  );
}