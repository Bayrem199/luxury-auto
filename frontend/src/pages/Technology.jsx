import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

const techs = [
  {
    icon: '🧠',
    title: 'Intelligence Artificielle',
    desc: "MBUX et PCM intègrent une IA qui apprend vos habitudes pour une expérience totalement personnalisée."
  },
  {
    icon: '🛡️',
    title: 'Sécurité Prédictive',
    desc: "Radar, LiDAR et caméras 360° anticipent les situations dangereuses en temps réel."
  },
  {
    icon: '⚡',
    title: 'Architecture 800V',
    desc: "La plateforme haute tension Porsche permet une charge 0→80% en moins de 20 minutes."
  },
  {
    icon: '🎵',
    title: 'Son & Acoustique',
    desc: "Burmester et Bose Surround s'adaptent à l'acoustique de chaque habitacle."
  },
  {
    icon: '🔗',
    title: 'Connectivité OTA',
    desc: "Mises à jour Over-The-Air qui font évoluer votre véhicule sans visite atelier."
  },
  {
    icon: '🏎',
    title: 'Aérodynamique Active',
    desc: "Spoilers adaptatifs et diffuseurs actifs selon la vitesse et le mode de conduite."
  },
];

function TechCard({ tech, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      className="tech-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1
      }}
      whileHover={{ y: -8 }}
    >
      <span className="tech-card__icon">
        {tech.icon}
      </span>

      <h3 className="tech-card__title">
        {tech.title}
      </h3>

      <p className="tech-card__desc">
        {tech.desc}
      </p>
    </motion.div>
  );
}

export default function Technology() {
  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Innovation"
        title="Technologie & Innovations"
        subtitle="À la pointe de l'ingénierie automobile mondiale."
        backgroundImage="/images/banner3.png"
      />

      {/* CONTENT */}
      <section className="inner-section container">

        <div className="tech-grid">
          {techs.map((t, i) => (
            <TechCard
              key={t.title}
              tech={t}
              index={i}
            />
          ))}
        </div>

      </section>
    </main>
  );
}