import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import {
  Leaf,
  Recycle,
  Zap,
  Factory,
  ShieldCheck,
  Globe
} from 'lucide-react';

import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

const items = [
  {
    icon: <Leaf size={26} />,
    color: '#4ade80',
    title: 'Neutralité Carbone 2039',
    desc: "Mercedes-Benz s'engage à être neutre en carbone sur l'ensemble de sa chaîne de valeur d'ici 2039."
  },
  {
    icon: <Recycle size={26} />,
    color: '#c9a84c',
    title: 'Matériaux Recyclés',
    desc: "Utilisation croissante de matériaux recyclés et biosourcés dans nos intérieurs premium."
  },
  {
    icon: <Zap size={26} />,
    color: '#00d4ff',
    title: 'Électrification Totale',
    desc: "Porsche vise 80% de ventes électriques d'ici 2030. Mercedes 100% électrique en Europe d'ici 2030."
  },
  {
    icon: <Factory size={26} />,
    color: '#7c3aed',
    title: 'Usines Vertes',
    desc: "Toutes nos usines partenaires fonctionnent à 100% aux énergies renouvelables depuis 2022."
  },
  {
    icon: <ShieldCheck size={26} />,
    color: '#38bdf8',
    title: 'Zéro Déchet',
    desc: "Programme de zéro déchet en décharge. 99% des déchets de production sont recyclés ou valorisés."
  },
  {
    icon: <Globe size={26} />,
    color: '#f97316',
    title: 'Responsabilité Sociale',
    desc: "Programmes de formation et d'emploi pour les jeunes dans les communautés locales."
  },
];

function SustCard({ item, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      className="sust-card modern-sust-card"
      initial={{ opacity: 0, y: 60, scale: 0.95 }}
      animate={
        inView
          ? { opacity: 1, y: 0, scale: 1 }
          : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1]
      }}
      whileHover={{
        y: -14,
        scale: 1.02
      }}
    >
      <div
        className="sust-card__glow"
        style={{
          background: `radial-gradient(circle, ${item.color}40 0%, transparent 70%)`
        }}
      />

      <div
        className="sust-card__icon modern-icon"
        style={{
          borderColor: `${item.color}55`,
          color: item.color
        }}
      >
        {item.icon}
      </div>

      <div className="sust-card__content">

        <span
          className="sust-card__line"
          style={{ background: item.color }}
        />

        <h3
          className="sust-card__title modern-title"
          style={{ color: item.color }}
        >
          {item.title}
        </h3>

        <p className="sust-card__desc modern-desc">
          {item.desc}
        </p>

      </div>

      <div className="sust-card__blur" />
    </motion.div>
  );
}

export default function Sustainability() {
  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Notre Responsabilité"
        title="Engagements Responsables"
        subtitle="Luxe et durabilité : deux valeurs qui ne s'opposent plus."
        backgroundImage="/images/banner7.png"
      />

      {/* CONTENT */}
      <section className="inner-section container sustainability-modern">

        <motion.div
          className="sust-intro"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
        >
          <span className="section-label">
            Luxury Sustainable Vision
          </span>

          <h2 className="inner-h2">
            Un futur plus propre.<br />
            <em>Sans compromis sur le luxe.</em>
          </h2>

          <p className="inner-p modern-intro-text">
            Luxury Auto transforme l'expérience automobile premium grâce
            à des technologies durables, une ingénierie responsable
            et une vision tournée vers l'avenir.
          </p>
        </motion.div>

        <div className="sust-grid modern-sust-grid">
          {items.map((item, i) => (
            <SustCard
              key={item.title}
              item={item}
              index={i}
            />
          ))}
        </div>

      </section>

    </main>
  );
}