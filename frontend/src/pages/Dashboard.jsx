import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import {
  ArrowUpRight,
  CarFront,
  CalendarDays,
  Settings2,
  Headphones,
  ShieldCheck,
  Crown,
  Sparkles,
  ChevronRight
} from 'lucide-react';

import './Dashboard.css';

export default function Dashboard() {

  const { user, logout } = useAuth();

  const cards = [
    {
      icon: <CarFront size={22} strokeWidth={1.5} />,
      title: 'Explorer la Collection',
      desc: 'Découvrez nos modèles exclusifs Porsche & Mercedes.',
      link: '/vehicles',
      cta: 'Voir les modèles',
    },
    {
      icon: <CalendarDays size={22} strokeWidth={1.5} />,
      title: 'Essai Privé',
      desc: 'Réservez une expérience de conduite premium.',
      link: '/contact',
      cta: 'Réserver',
    },
    {
      icon: <Settings2 size={22} strokeWidth={1.5} />,
      title: 'Configuration',
      desc: 'Configurez votre véhicule selon vos préférences.',
      link: '/vehicles',
      cta: 'Personnaliser',
    },
    {
      icon: <Headphones size={22} strokeWidth={1.5} />,
      title: 'Conciergerie',
      desc: 'Votre conseiller dédié reste à votre disposition.',
      link: '/contact',
      cta: 'Contacter',
    },
  ];

  return (
    <main className="dashboard">

      {/* HERO */}
      <section className="dashboard__hero">

        <div className="dashboard__bg-grid" />
        <div className="dashboard__glow dashboard__glow--1" />
        <div className="dashboard__glow dashboard__glow--2" />

        <div className="container dashboard__hero-inner">

          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="dashboard__hero-content"
          >

            <div className="dashboard__eyebrow">
              <span className="dashboard__eyebrow-line" />
              <span>ESPACE CLIENT PRIVÉ</span>
            </div>

            <h1 className="dashboard__title">
              Bienvenue,
              <br />
              <span>{user?.firstName} {user?.lastName}</span>
            </h1>

            <p className="dashboard__subtitle">
              Accédez à votre univers premium et profitez d’une expérience
              automobile exclusive pensée pour les passionnés de luxe,
              de performance et d’innovation.
            </p>

            <div className="dashboard__hero-actions">

              <Link
                to="/vehicles"
                className="dashboard__primary-btn"
              >
                <span>Explorer les véhicules</span>
                <ArrowUpRight size={16} />
              </Link>

              <Link
                to="/contact"
                className="dashboard__secondary-btn"
              >
                Réserver un rendez-vous
              </Link>

            </div>

          </motion.div>

          <motion.div
            className="dashboard__premium-card"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >

            <div className="dashboard__premium-top">

              <div>
                <span className="dashboard__premium-label">
                  MEMBRE PREMIUM
                </span>

                <h3>
                  Client Signature
                </h3>
              </div>

              <div className="dashboard__premium-icon">
                <Crown size={18} />
              </div>

            </div>

            <div className="dashboard__premium-divider" />

            <div className="dashboard__premium-info">

              <div className="dashboard__premium-item">
                <span>Email</span>
                <strong>{user?.email}</strong>
              </div>

              <div className="dashboard__premium-item">
                <span>Statut</span>
                <strong className="gold">Actif</strong>
              </div>

              <div className="dashboard__premium-item">
                <span>Accès</span>
                <strong>Collection Exclusive</strong>
              </div>

            </div>

          </motion.div>

        </div>

      </section>

      {/* QUICK ACTIONS */}
      <section className="dashboard__section container">

        <div className="dashboard__section-head">

          <div>
            <span className="dashboard__mini-label">
              SERVICES EXCLUSIFS
            </span>

            <h2>
              Accès Rapide
            </h2>
          </div>

          <div className="dashboard__section-line" />

        </div>

        <div className="dashboard__cards">

          {cards.map((card, i) => (

            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.1
              }}
            >

              <Link
                to={card.link}
                className="dashboard__card dashboard__card-clickable"
              >

                <div className="dashboard__card-blur" />

                <div className="dashboard__card-icon">
                  {card.icon}
                </div>

                <h3>
                  {card.title}
                </h3>

                <p>
                  {card.desc}
                </p>

                <div className="dashboard__card-link">
                  <span>{card.cta}</span>
                  <ChevronRight size={15} />
                </div>

              </Link>

            </motion.div>

          ))}

        </div>

      </section>

      {/* ACCOUNT */}
      <section className="dashboard__section container">

        <div className="dashboard__section-head">

          <div>
            <span className="dashboard__mini-label">
              IDENTITÉ CLIENT
            </span>

            <h2>
              Informations du Compte
            </h2>
          </div>

          <div className="dashboard__section-line" />

        </div>

        <motion.div
          className="dashboard__account"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >

          <div className="dashboard__account-grid">

            <div className="dashboard__account-item">
              <span>Prénom</span>
              <strong>{user?.firstName}</strong>
            </div>

            <div className="dashboard__account-item">
              <span>Nom</span>
              <strong>{user?.lastName}</strong>
            </div>

            <div className="dashboard__account-item">
              <span>Email</span>
              <strong>{user?.email}</strong>
            </div>

            <div className="dashboard__account-item">
              <span>Statut</span>

              <strong className="gold">
                <ShieldCheck size={16} />
                Client Premium
              </strong>
            </div>

          </div>

        </motion.div>

      </section>

      {/* FOOTER ACTION */}
      <section className="dashboard__bottom container">

        <div className="dashboard__bottom-card">

          <div className="dashboard__bottom-left">

            <div className="dashboard__sparkle">
              <Sparkles size={18} />
            </div>

            <div>

              <span className="dashboard__mini-label">
                EXPÉRIENCE LUXURY AUTO
              </span>

              <h3>
                Votre univers automobile d’exception
              </h3>

              <p>
                Une expérience premium conçue pour les passionnés
                de performance, d’élégance et de raffinement.
              </p>

            </div>

          </div>

          <button
            onClick={logout}
            className="dashboard__logout"
          >
            Déconnexion
          </button>

        </div>

      </section>

    </main>
  );
}