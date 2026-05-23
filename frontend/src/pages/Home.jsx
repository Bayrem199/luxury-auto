import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useScrollReveal } from '../hooks/useScrollReveal';
import ParticleField from '../components/common/ParticleField';
import { vehicles } from '../utils/vehicleData';
import './Home.css';

/* ── MARQUEE DATA ── */
const marqueeItems = [
  'Mercedes-Benz','Porsche','AMG','Taycan','EQS','911 Carrera',
  'Luxe','Performance','Innovation','Électrique','Prestige','Excellence'
];

/* ══════════════════════════════════════
   HERO
══════════════════════════════════════ */
function HeroSection() {
  const canvasRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });

  /* Magnetic canvas lines */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf;
    let w, h;

    const resize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = e => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener('mousemove', onMove);

    const lines = Array.from({ length: 28 }, (_, i) => ({
      x: Math.random() * 1,
      y: Math.random() * 1,
      vx: (Math.random() - 0.5) * 0.0004,
      vy: (Math.random() - 0.5) * 0.0004,
      size: Math.random() * 120 + 40,
      alpha: Math.random() * 0.5 + 0.1,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const mx = mouse.current.x / w;
      const my = mouse.current.y / h;

      lines.forEach(l => {
        l.x += l.vx + (mx - 0.5) * 0.00015;
        l.y += l.vy + (my - 0.5) * 0.00015;
        if (l.x < 0 || l.x > 1) l.vx *= -1;
        if (l.y < 0 || l.y > 1) l.vy *= -1;

        const gx = l.x * w;
        const gy = l.y * h;
        const dist = Math.hypot(mx * w - gx, my * h - gy);
        const pull = Math.max(0, 1 - dist / 400);

        ctx.save();
        ctx.globalAlpha = (l.alpha + pull * 0.3) * 0.6;
        ctx.strokeStyle = `rgba(201,168,76,${0.15 + pull * 0.4})`;
        ctx.lineWidth = 0.5 + pull;
        ctx.beginPath();
        ctx.moveTo(gx - l.size, gy);
        ctx.lineTo(gx + l.size, gy);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(gx, gy - l.size * 0.3);
        ctx.lineTo(gx, gy + l.size * 0.3);
        ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return (
    <section className="hero">
      {/* VIDEO BG */}
      <video className="hero__video" autoPlay muted loop playsInline>
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* OVERLAYS */}
      <div className="hero__overlay-base" />
      <div className="hero__overlay-vignette" />
      <div className="hero__noise" />

      {/* CANVAS LINES */}
      <canvas ref={canvasRef} className="hero__canvas" />

      {/* GRID */}
      <div className="hero__grid" />

      {/* SCANLINE */}
      <div className="hero__scanline" />

      {/* DIAGONAL ACCENT */}
      <div className="hero__diagonal" />

      {/* CONTENT */}
      <div className="hero__content">

        

        <div className="hero__title-wrap">
          <h1 className="hero__title">
            <span className="hero__title-line" style={{ '--d': '0.4s' }}>
              <span className="hero__title-inner">L'Art</span>
            </span>
            <span className="hero__title-line hero__title-line--gold" style={{ '--d': '0.6s' }}>
              <span className="hero__title-inner">de l'Excellence</span>
            </span>
            <span className="hero__title-line" style={{ '--d': '0.8s' }}>
              <span className="hero__title-inner">Automobile</span>
            </span>
          </h1>

          {/* VERTICAL LABEL */}
          <div className="hero__vertical-label">
          </div>
        </div>

        <p className="hero__subtitle">
          Une sélection d'exception, choisie pour les esprits les plus exigeants.
          Ingénierie allemande. Raffinement absolu.
        </p>

        <div className="hero__actions">
          <Link to="/vehicles" className="btn-hero-primary">
            <span className="btn-hero-primary__text">Explorer la collection</span>
            <span className="btn-hero-primary__arrow">→</span>
            <span className="btn-hero-primary__shimmer" />
          </Link>
          <Link to="/contact" className="btn-hero-ghost">
            <span>Prendre rendez-vous</span>
            <span className="btn-hero-ghost__line" />
          </Link>
        </div>

      </div>

      {/* SCROLL */}
      <div className="hero__scroll-cue">
        <div className="hero__scroll-track">
          <div className="hero__scroll-thumb" />
        </div>
        <span>Défiler</span>
      </div>

      {/* STATS */}
      <div className="hero__stats">
        {[
          { end: 20,   suffix: '+',  label: "Années d'expertise", decimals: 0 },
          { end: 1200, suffix: '+',  label: 'Clients satisfaits',  decimals: 0 },
          { end: 50,   suffix: '+',  label: 'Modèles disponibles', decimals: 0 },
          { end: 4.9,  suffix: '★', label: 'Note moyenne',         decimals: 1 },
        ].map(s => (
          <div key={s.label} className="hero__stat">
            <span className="hero__stat-value">
              <CountUp end={s.end} suffix={s.suffix} decimals={s.decimals}
                duration={2.5} enableScrollSpy scrollSpyOnce />
            </span>
            <span className="hero__stat-label">{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ══════════════════════════════════════
   MARQUEE
══════════════════════════════════════ */
function MarqueeSection() {
  const items = [...marqueeItems, ...marqueeItems];
  return (
    <div className="marquee-section">
      <div className="marquee-track">
        {items.map((item, i) => (
          <div key={i} className="marquee-item">
            <span className="marquee-gem" />
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   MANIFESTO (remplace BrandSection)
══════════════════════════════════════ */
function ManifestoSection() {
  const [ref, visible] = useScrollReveal();

  return (
    <section className="manifesto">
      <div className="manifesto__left">
        <div ref={ref} className={`manifesto__text-block reveal-up ${visible ? 'visible' : ''}`}>
          <span className="section-label">Notre Philosophie</span>
          <h2 className="manifesto__title">
            Deux légendes,<br />
            <em>une seule passion</em>
          </h2>
          <p className="manifesto__body">
            Depuis vingt ans, Luxury Auto incarne l'élite de l'automobile mondiale.
            Chaque véhicule est sélectionné avec une exigence absolue — ingénierie,
            esthétique, sensation. Nous ne vendons pas des voitures. Nous transmettons
            des émotions.
          </p>
          <Link to="/about" className="manifesto__link">
            <span>Découvrir notre histoire</span>
            <svg width="40" height="1" viewBox="0 0 40 1"><line x1="0" y1="0.5" x2="40" y2="0.5" stroke="currentColor"/></svg>
          </Link>
        </div>
      </div>

      <div className="manifesto__right">
        <BrandCard
          name="Mercedes-Benz"
          tagline="The Best or Nothing"
          logo="/logos/mercedes.png"
          delay="0s"
        />
        <BrandCard
          name="Porsche"
          tagline="There is no substitute"
          logo="/logos/porsche.png"
          delay="0.15s"
        />
      </div>

      {/* AMBIENT */}
      <div className="manifesto__ambient" />
    </section>
  );
}

function BrandCard({ name, tagline, logo, delay }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`brand-card reveal-up ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: delay }}
    >
      <div className="brand-card__inner">
        <div className="brand-card__logo-wrap">
          <img src={logo} alt={name} className="brand-card__logo" />
        </div>
        <div className="brand-card__info">
          <span className="brand-card__name">{name}</span>
          <span className="brand-card__tagline">{tagline}</span>
        </div>
        <div className="brand-card__corner brand-card__corner--tl" />
        <div className="brand-card__corner brand-card__corner--tr" />
        <div className="brand-card__corner brand-card__corner--bl" />
        <div className="brand-card__corner brand-card__corner--br" />
        <div className="brand-card__glow" />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   FEATURED VEHICLES
══════════════════════════════════════ */
function VehiclesSection() {
  const [ref, visible] = useScrollReveal();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const featured = vehicles.slice(0, 3);

  return (
    <section className="vehicles-section">

      {/* SECTION HEADER */}
      <div ref={ref} className={`vehicles-section__header reveal-up ${visible ? 'visible' : ''}`}>
        <div className="vehicles-section__header-line" />
        <div className="vehicles-section__header-center">
          <span className="section-label">Collection Exclusive 2025</span>
          <h2 className="vehicles-section__title">Véhicules <em>Prestige</em></h2>
        </div>
        <div className="vehicles-section__header-line" />
      </div>

      {/* CARDS */}
      <div className="vehicles-grid">
        {featured.map((v, i) => (
          <VehicleCard
            key={v.id}
            vehicle={v}
            index={i}
            isHovered={hoveredIndex === i}
            isDimmed={hoveredIndex !== null && hoveredIndex !== i}
            onHover={() => setHoveredIndex(i)}
            onLeave={() => setHoveredIndex(null)}
          />
        ))}
      </div>

      {/* CTA */}
      <div className="vehicles-section__footer">
        <div className="vehicles-section__footer-line" />
        <Link to="/vehicles" className="btn-collection">
          <span>Voir toute la collection</span>
          <span className="btn-collection__count">{vehicles.length} modèles</span>
        </Link>
        <div className="vehicles-section__footer-line" />
      </div>
    </section>
  );
}

function VehicleCard({ vehicle, index, isHovered, isDimmed, onHover, onLeave }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`vehicle-card ${visible ? 'reveal' : ''} ${isHovered ? 'is-hovered' : ''} ${isDimmed ? 'is-dimmed' : ''}`}
      style={{ transitionDelay: `${index * 0.14}s` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      {/* VISUAL */}
      <div className="vehicle-card__visual" style={{ background: vehicle.color }}>

        <img src={vehicle.image} alt={vehicle.model} className="vehicle-card__image" />

        {/* GRADIENT */}
        <div className="vehicle-card__gradient"
          style={{ background: `linear-gradient(to top, ${vehicle.color}ee 0%, ${vehicle.color}44 40%, transparent 100%)` }} />

        {/* OVERLAY HOVER */}
        <div className="vehicle-card__hover-overlay" style={{ '--accent': vehicle.accent }} />

        {/* BADGES */}
        <div className="vehicle-card__badges">
          {vehicle.isElectric && (
            <span className="vc-badge vc-badge--ev" style={{ background: vehicle.accent, color: '#050505' }}>EV</span>
          )}
          {vehicle.isNew && (
            <span className="vc-badge vc-badge--new">Nouveau</span>
          )}
        </div>

        {/* HOVER SPECS REVEAL */}
        <div className="vehicle-card__specs-reveal">
          <div className="vehicle-card__spec-row">
            <span>0 → 100</span>
            <span style={{ color: vehicle.accent }}>{vehicle.acceleration}</span>
          </div>
          <div className="vehicle-card__spec-row">
            <span>Vitesse max</span>
            <span style={{ color: vehicle.accent }}>{vehicle.speed}</span>
          </div>
          <div className="vehicle-card__spec-row">
            <span>Puissance</span>
            <span style={{ color: vehicle.accent }}>{vehicle.power}</span>
          </div>
        </div>

        {/* INDEX NUMBER */}
        <span className="vehicle-card__number">0{index + 1}</span>
      </div>

      {/* INFO */}
      <div className="vehicle-card__info">
        <div className="vehicle-card__top">
          <span className="vehicle-card__category">{vehicle.category}</span>
          <span className="vehicle-card__fuel" style={{ color: vehicle.accent }}>
            {vehicle.isElectric ? '⚡' : '◈'} {vehicle.fuel}
          </span>
        </div>

        <h3 className="vehicle-card__name">
          <span className="vehicle-card__brand">{vehicle.brand}</span>
          <span className="vehicle-card__model">{vehicle.model}</span>
        </h3>

        <p className="vehicle-card__tagline">{vehicle.tagline}</p>

        <div className="vehicle-card__footer">
          <div className="vehicle-card__price-wrap">
            <span className="vehicle-card__price-from">Dès</span>
            <span className="vehicle-card__price">{vehicle.price} €</span>
          </div>
          <Link to={`/vehicles/${vehicle.id}`} className="vehicle-card__cta" style={{ '--accent': vehicle.accent }}>
            <span>Découvrir</span>
            <svg width="20" height="1" viewBox="0 0 20 1"><line x1="0" y1="0.5" x2="20" y2="0.5" stroke="currentColor" strokeWidth="1"/></svg>
          </Link>
        </div>

        {/* BOTTOM ACCENT LINE */}
        <div className="vehicle-card__accent-line" style={{ background: vehicle.accent }} />
      </div>
    </div>
  );
}

/* ══════════════════════════════════════
   EXPERIENCE STRIP
══════════════════════════════════════ */
function ExperienceSection() {
  const services = [
    { icon: '◎', title: 'Essai Exclusif',  desc: 'Prenez le volant 48h, sans engagement. Vivez l\'expérience dans votre quotidien.' },
    { icon: '◈', title: 'Configuration',   desc: 'Dessinez votre véhicule idéal avec notre configurateur haute définition.' },
    { icon: '◇', title: 'Financement',     desc: 'LOA, LLD, crédit sur mesure. Nos experts financiers s\'adaptent à votre profil.' },
    { icon: '▣', title: 'Après-Vente',     desc: 'Techniciens certifiés, pièces d\'origine, service de remplacement premium.' },
  ];

  return (
    <section className="experience-section">
      <div className="experience-section__header">
        <span className="section-label">Nos Services</span>
        <h2 className="experience-section__title">
          Une expérience <em>sans compromis</em>
        </h2>
      </div>

      <div className="experience-grid">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>
    </section>
  );
}

function ServiceCard({ service, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`service-card reveal-up ${visible ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >
      <span className="service-card__icon">{service.icon}</span>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.desc}</p>
      <div className="service-card__line" />
      <div className="service-card__number">0{index + 1}</div>
    </div>
  );
}

/* ══════════════════════════════════════
   CTA FINALE
══════════════════════════════════════ */
function CtaSection() {
  const [ref, visible] = useScrollReveal();
  return (
    <section className="cta-final">
      <div className="cta-final__bg" />
      <div className="cta-final__grid" />

      <div ref={ref} className={`cta-final__inner reveal-up ${visible ? 'visible' : ''}`}>
        <span className="section-label">Prêt à vivre l'expérience ?</span>
        <h2 className="cta-final__title">
          Votre prochain chef-d'œuvre<br /><em>vous attend</em>
        </h2>
        <p className="cta-final__sub">
          Prenez rendez-vous avec l'un de nos conseillers.<br />
          Une rencontre. Une passion. Une décision.
        </p>
        <div className="cta-final__actions">
          <Link to="/vehicles" className="btn-hero-primary">
            <span className="btn-hero-primary__text">Voir la collection</span>
            <span className="btn-hero-primary__arrow">→</span>
            <span className="btn-hero-primary__shimmer" />
          </Link>
          <Link to="/contact" className="btn-hero-ghost">
            <span>Nous contacter</span>
            <span className="btn-hero-ghost__line" />
          </Link>
        </div>
      </div>

      {/* DECORATIVE CIRCLES */}
      <div className="cta-final__circle cta-final__circle--1" />
      <div className="cta-final__circle cta-final__circle--2" />
    </section>
  );
}

/* ══════════════════════════════════════
   PAGE
══════════════════════════════════════ */
export default function Home() {
  return (
    <main className="home">
      <HeroSection />
      <MarqueeSection />
      <ManifestoSection />
      <VehiclesSection />
      <ExperienceSection />
      <CtaSection />
    </main>
  );
}