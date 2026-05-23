import React from 'react';
import PageHero from '../components/ui/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';
import './InnerPages.css';

function PartnerCard({ partner, index }) {
  const [ref, visible] = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`partner-card ${visible ? 'reveal' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
    >

      <span className="partner-card__type">
        {partner.type}
      </span>

      <h3 className="partner-card__name">
        {partner.name}
      </h3>

      <p className="partner-card__desc">
        {partner.desc}
      </p>

    </div>
  );
}

export default function Collaborations() {

  const partners = [
    {
      name: 'Hôtel de Crillon',
      type: 'Hôtellerie de Luxe',
      desc: "Partenariat exclusif pour la mise à disposition de véhicules de prestige pour les clients du palace parisien."
    },
    {
      name: 'Louis Vuitton',
      type: 'Mode & Lifestyle',
      desc: "Collection capsule d'accessoires auto en collaboration avec la maison emblématique."
    },
    {
      name: 'Circuit Paul Ricard',
      type: 'Sport Auto',
      desc: "Journées circuit exclusives pour nos clients les plus passionnés sur le mythique tracé provençal."
    },
    {
      name: 'Jet Aviation',
      type: 'Aviation Privée',
      desc: "Service de transfert premium entre l'aéroport du Bourget et nos showrooms pour une expérience porte-à-porte."
    },
    {
      name: 'Château Margaux',
      type: 'Art de Vivre',
      desc: "Soirées privées de dégustation avec livraison dans un véhicule électrique de prestige."
    },
    {
      name: 'Bang & Olufsen',
      type: 'Audio Premium',
      desc: "Intégration exclusive de systèmes audio sur mesure dans nos éditions spéciales."
    },
  ];

  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Écosystème Premium"
        title="Collaborations"
        subtitle="Des partenariats exclusifs qui étendent l'expérience Luxury Auto bien au-delà du showroom."
        backgroundImage="/images/banner6.png"
      />

      {/* CONTENT */}
      <section className="inner-section container">

        <div className="partners-grid">

          {partners.map((p, i) => (
            <PartnerCard
              key={p.name}
              partner={p}
              index={i}
            />
          ))}

        </div>

      </section>

    </main>
  );
}