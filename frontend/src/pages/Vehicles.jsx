import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero';
import { vehicles } from '../utils/vehicleData';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './Vehicles.css';

const filters = ['Tous', 'Mercedes', 'Porsche', 'Électrique', 'Sport'];

export default function Vehicles() {
  const [active, setActive] = useState('Tous');

  const filtered = vehicles.filter(v => {
    if (active === 'Tous')       return true;
    if (active === 'Mercedes')   return v.brand.includes('Mercedes');
    if (active === 'Porsche')    return v.brand.includes('Porsche');
    if (active === 'Électrique') return v.isElectric;
    if (active === 'Sport')      return v.category.toLowerCase().includes('sport');
    return true;
  });

  return (
    <main className="page-wrapper">

      <PageHero
        label="Collection 2024–2025"
        title="Nos Véhicules"
        subtitle="Chaque modèle est une œuvre d'ingénierie et de design, sélectionnée pour sublimer votre quotidien."
        backgroundImage="/images/banner1.png"
      />

      <section className="vehicles-page">
        <div className="container">

          {/* FILTERS */}
          <div className="vehicles-page__filters">
            {filters.map(f => (
              <button
                key={f}
                className={`vehicles-page__filter ${active === f ? 'vehicles-page__filter--active' : ''}`}
                onClick={() => setActive(f)}
              >
                {f}
              </button>
            ))}
          </div>

          {/* GRID */}
          <div className="vehicles-page__grid">
            {filtered.map((v, i) => (
              <VehicleItem key={v.id} vehicle={v} index={i} />
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}

function VehicleItem({ vehicle, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`vp-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${(index % 3) * 0.12}s` }}
    >
      {/* CARD VISUAL */}
      <div
        className="vp-card__visual"
        style={{ background: `linear-gradient(135deg, ${vehicle.color}, #111)` }}
      >
        {/* IMAGE */}
        <img
          src={vehicle.image}
          alt={vehicle.model}
          className="vp-card__image"
        />

        {/* DARK OVERLAY */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.15))',
          zIndex: 1,
        }} />

        {/* TEXT */}
        <div className="vp-card__placeholder-name" style={{ position: 'relative', zIndex: 2 }}>
          <span>{vehicle.brand}</span>
          <strong>{vehicle.model}</strong>
        </div>

        {/* BADGES */}
        <div className="vp-card__badges" style={{ zIndex: 3 }}>
          {vehicle.isElectric && (
            <span className="vp-badge" style={{ background: vehicle.accent }}>EV</span>
          )}
          {vehicle.isNew && (
            <span className="vp-badge vp-badge--new">Nouveau</span>
          )}
        </div>
      </div>

      {/* BODY */}
      <div className="vp-card__body">
        <p className="vp-card__category">{vehicle.category}</p>
        <h3 className="vp-card__name">{vehicle.brand} {vehicle.model}</h3>

        <div className="vp-card__specs">
          <div className="vp-spec">
            <span className="vp-spec__label">Puissance</span>
            <span className="vp-spec__value" style={{ color: vehicle.accent }}>{vehicle.power}</span>
          </div>
          <div className="vp-spec">
            <span className="vp-spec__label">0-100</span>
            <span className="vp-spec__value">{vehicle.acceleration}</span>
          </div>
          <div className="vp-spec">
            <span className="vp-spec__label">Energie</span>
            <span className="vp-spec__value">{vehicle.fuel}</span>
          </div>
        </div>

        <div className="vp-card__footer">
          <span className="vp-card__price">Dès {vehicle.price} €</span>
          <Link
            to={`/vehicles/${vehicle.id}`}
            className="btn-gold"
            style={{ padding: '10px 20px', fontSize: '10px' }}
          >
            <span>Découvrir</span>
          </Link>
        </div>
      </div>
    </div>
  );
}