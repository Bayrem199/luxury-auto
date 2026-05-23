import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

const articles = [
  {
    date: 'Mars 2024',
    category: 'Lancement',
    title: 'Mercedes-Benz présente la nouvelle Classe E : l\'élégance réinventée',
    excerpt: 'La nouvelle Classe E redéfinit les standards avec un habitacle repensé et le MBUX de 4ème génération.'
  },
  {
    date: 'Février 2024',
    category: 'Électrique',
    title: 'Porsche Taycan : record du Nürburgring pour les véhicules de série',
    excerpt: 'Le Taycan Turbo S établit un nouveau record en 7 minutes et 33 secondes.'
  },
  {
    date: 'Janvier 2024',
    category: 'Innovation',
    title: 'Luxury Auto ouvre son nouveau showroom digital à Paris',
    excerpt: 'Découvrez nos véhicules en réalité augmentée dans notre espace immersif.'
  },
  {
    date: 'Décembre 2023',
    category: 'Prix',
    title: 'Mercedes AMG GT élu "Supercar de l\'Année" par Auto Hebdo',
    excerpt: 'Le jury d\'Auto Hebdo distingue l\'AMG GT pour ses performances et son design révolutionnaire.'
  },
  {
    date: 'Novembre 2023',
    category: 'Événement',
    title: 'Luxury Auto au Mondial de l\'Automobile de Paris',
    excerpt: 'Retrouvez-nous sur le plus grand salon auto français avec nos dernières exclusivités.'
  },
  {
    date: 'Octobre 2023',
    category: 'Partenariat',
    title: 'Nouveau partenariat avec le circuit Paul Ricard',
    excerpt: 'Nos clients réservent des journées circuit exclusives sur le mythique Paul Ricard.'
  },
];

function NewsCard({ article, index }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15
  });

  return (
    <motion.div
      ref={ref}
      className="news-card"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: (index % 3) * 0.1
      }}
      whileHover={{ y: -6 }}
    >

      <div className="news-card__meta">

        <span className="news-card__category">
          {article.category}
        </span>

        <span className="news-card__date">
          {article.date}
        </span>

      </div>

      <h3 className="news-card__title">
        {article.title}
      </h3>

      <p className="news-card__excerpt">
        {article.excerpt}
      </p>

      <span className="news-card__read">
        Lire la suite →
      </span>

    </motion.div>
  );
}

export default function News() {
  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Restez Informé"
        title="Actualités"
        subtitle="Les dernières nouvelles de Mercedes-Benz, Porsche et Luxury Auto."
        backgroundImage="/images/banner5.png"
      />

      {/* CONTENT */}
      <section className="inner-section container">

        <div className="news-grid">

          {articles.map((a, i) => (
            <NewsCard
              key={a.title}
              article={a}
              index={i}
            />
          ))}

        </div>

      </section>

    </main>
  );
}