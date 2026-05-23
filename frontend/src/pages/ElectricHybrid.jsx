import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

export default function ElectricHybrid() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const models = [
    {
      brand: 'Mercedes-Benz',
      model: 'EQS 580',
      range: '523 km',
      charge: '200 kW',
      power: '523 ch',
      accent: '#00d4ff',
    },
    {
      brand: 'Mercedes-Benz',
      model: 'EQE 350+',
      range: '654 km',
      charge: '170 kW',
      power: '292 ch',
      accent: '#00d4ff',
    },
    {
      brand: 'Porsche',
      model: 'Taycan Turbo S',
      range: '630 km',
      charge: '270 kW',
      power: '761 ch',
      accent: '#7b2d8b',
    },
    {
      brand: 'Porsche',
      model: 'Taycan 4S',
      range: '590 km',
      charge: '270 kW',
      power: '530 ch',
      accent: '#7b2d8b',
    },
  ];

  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Mobilité du Futur"
        title="Électrique & Hybride"
        subtitle="L'avenir de la mobilité de luxe, aujourd'hui."
        backgroundImage="/images/banner2.png"
      />

      {/* CONTENT */}
      <section className="inner-section container" ref={ref}>

        <motion.div
          className="ev-intro"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="section-label">Notre Engagement EV</span>

          <h2 className="inner-h2">
            Puissance silencieuse,
            <br />
            <em>impact zéro compromis</em>
          </h2>

          <p
            className="inner-p"
            style={{ maxWidth: 600 }}
          >
            Mercedes-Benz et Porsche réinventent la performance
            électrique. Autonomie record, charge ultra-rapide
            et dynamique exaltante.
          </p>
        </motion.div>

        {/* GRID */}
        <div className="ev-grid">
          {models.map((m, i) => (
            <motion.div
              key={m.model}
              className="ev-card"
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
              }}
              whileHover={{ y: -8 }}
            >
              <div className="ev-card__top">
                <span className="ev-card__brand">
                  {m.brand}
                </span>

                <h3
                  className="ev-card__model"
                  style={{ color: m.accent }}
                >
                  {m.model}
                </h3>
              </div>

              <div className="ev-specs">

                <div className="ev-spec">
                  <span>Autonomie</span>
                  <strong>{m.range}</strong>
                </div>

                <div className="ev-spec">
                  <span>Charge max</span>
                  <strong>{m.charge}</strong>
                </div>

                <div className="ev-spec">
                  <span>Puissance</span>
                  <strong style={{ color: m.accent }}>
                    {m.power}
                  </strong>
                </div>

              </div>

              <Link
                to="/vehicles"
                className="ev-card__link"
                style={{ color: m.accent }}
              >
                Découvrir →
              </Link>
            </motion.div>
          ))}
        </div>

      </section>
    </main>
  );
}