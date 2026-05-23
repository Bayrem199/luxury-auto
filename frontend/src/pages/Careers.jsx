import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';

const jobs = [
  {
    dept:'Vente',
    title:'Conseiller Véhicules Neufs',
    type:'CDI',
    location:'Paris 8ème'
  },
  {
    dept:'Technique',
    title:'Technicien Électronique EV',
    type:'CDI',
    location:'Paris 8ème'
  },
  {
    dept:'Marketing',
    title:'Responsable Expérience Client',
    type:'CDI',
    location:'Paris 8ème'
  },
  {
    dept:'Finance',
    title:'Conseiller Financement Auto',
    type:'CDI',
    location:'Paris 8ème'
  },
  {
    dept:'Alternance',
    title:'Assistant Marketing Digital',
    type:'Alternance',
    location:'Paris 8ème'
  },
];

function JobRow({ job, index }) {

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2
  });

  return (
    <motion.div
      ref={ref}
      className="job-row"
      initial={{ opacity:0, x:-30 }}
      animate={inView ? { opacity:1, x:0 } : {}}
      transition={{
        duration:0.6,
        delay:index * 0.07
      }}
    >

      <span className="job-row__dept">
        {job.dept}
      </span>

      <h3 className="job-row__title">
        {job.title}
      </h3>

      <span className="job-row__type">
        {job.type}
      </span>

      <span className="job-row__location">
        {job.location}
      </span>

      <Link
        to="/contact"
        className="job-row__apply"
      >
        Postuler →
      </Link>

    </motion.div>
  );
}

export default function Careers() {

  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Rejoignez-nous"
        title="Espace Carrière"
        subtitle="Construisez votre avenir au sein d'une maison d'exception."
        backgroundImage="/images/banner9.png"
      />

      {/* CONTENT */}
      <section className="inner-section container">

        <div className="careers-intro">

          <h2 className="inner-h2">
            Travailler chez<br />
            <em>Luxury Auto</em>
          </h2>

          <p
            className="inner-p"
            style={{ maxWidth:600 }}
          >
            Intégrer Luxury Auto, c'est rejoindre une équipe de passionnés et bénéficier de formations aux normes des deux plus grandes marques premium mondiales.
          </p>

        </div>

        <div className="jobs-list">

          {jobs.map((j, i) => (

            <JobRow
              key={j.title}
              job={j}
              index={i}
            />

          ))}

        </div>

      </section>

    </main>
  );
}