import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

export default function About() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Notre Histoire"
        title="Qui Sommes-Nous ?"
        subtitle="Deux décennies d'excellence au service des passionnés d'automobile de prestige."
        backgroundImage="/images/banner4.png"
      />

      {/* CONTENT */}
      <section className="inner-section container" ref={ref}>

        <div className="about-grid">

          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.9,
              ease: [0.77, 0, 0.175, 1]
            }}
          >

            <span className="section-label">
              Notre Mission
            </span>

            <h2 className="inner-h2">
              L'excellence, pas un objectif.
              <br />
              <em>Une philosophie.</em>
            </h2>

            <p className="inner-p">
              Fondée en 2005 au cœur de Tunis, Luxury Auto s'est imposée comme la référence en matière de distribution automobile premium.
              Concessionnaire officiel Mercedes-Benz et Porsche, notre mission est simple :
              offrir une expérience d'achat à la hauteur des véhicules exceptionnels que nous représentons.
            </p>

            <p className="inner-p">
              Chaque membre de notre équipe est formé aux standards les plus exigeants des deux marques,
              garantissant un conseil personnalisé et une expertise technique sans égal.
            </p>

            <div className="about-values">

              {['Excellence', 'Intégrité', 'Passion', 'Innovation'].map((v) => (

                <motion.div
                  key={v}
                  className="about-value"
                  whileHover={{ y: -3 }}
                >
                  <span className="about-value__dot" />
                  {v}
                </motion.div>

              ))}

            </div>
          </motion.div>

          {/* RIGHT SIDE */}
          <motion.div
            className="about-stats"
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.2,
              ease: [0.77, 0, 0.175, 1]
            }}
          >

            {[
              ['20+', "Années d'expérience"],
              ['1000+', 'Clients fidèles'],
              ['50+', 'Experts dédiés'],
              ['4.9★', 'Satisfaction']
            ].map(([v, l]) => (

              <div key={l} className="about-stat">

                <span className="about-stat__val">
                  {v}
                </span>

                <span className="about-stat__label">
                  {l}
                </span>

              </div>

            ))}

          </motion.div>

        </div>

      </section>
    </main>
  );
}