// ===================== ABOUT =====================
import React, { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Link } from 'react-router-dom';
import './InnerPages.css';

export function About() {
  return (
    <main className="page-wrapper">
      <PageHero label="Notre Histoire" title="Qui Sommes-Nous ?" subtitle="Deux décennies d'excellence au service des passionnés d'automobile de prestige." />
      <section className="inner-section container">
        <AboutContent />
      </section>
    </main>
  );
}

function AboutContent() {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`about-grid ${visible ? 'reveal' : ''}`}>
      <div className="about-text">
        <span className="section-label">Notre Mission</span>
        <h2 className="inner-h2">L'excellence, pas un objectif.<br /><em>Une philosophie.</em></h2>
        <p className="inner-p">Fondée en 2005 au cœur de Paris, Luxury Auto s'est imposée comme la référence en matière de distribution automobile premium. Concessionnaire officiel Mercedes-Benz et Porsche, notre mission est simple : offrir une expérience d'achat à la hauteur des véhicules exceptionnels que nous représentons.</p>
        <p className="inner-p">Chaque membre de notre équipe est formé aux standards les plus exigeants des deux marques, garantissant un conseil personnalisé et une expertise technique sans égal.</p>
        <div className="about-values">
          {['Excellence', 'Intégrité', 'Passion', 'Innovation'].map(v => (
            <div key={v} className="about-value"><span className="about-value__dot" />{v}</div>
          ))}
        </div>
      </div>
      <div className="about-stats">
        {[['20+', 'Années d\'expérience'], ['1000+', 'Clients fidèles'], ['50+', 'Experts dédiés'], ['4.9★', 'Satisfaction client']].map(([val, label]) => (
          <div key={label} className="about-stat">
            <span className="about-stat__val">{val}</span>
            <span className="about-stat__label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// ===================== ELECTRIC =====================
export function ElectricHybrid() {
  const [ref, visible] = useScrollReveal();
  const models = [
    { brand: 'Mercedes-Benz', model: 'EQS 580', range: '523 km', charge: '200 kW', power: '523 ch', accent: '#00d4ff' },
    { brand: 'Mercedes-Benz', model: 'EQE 350+', range: '654 km', charge: '170 kW', power: '292 ch', accent: '#00d4ff' },
    { brand: 'Porsche', model: 'Taycan Turbo S', range: '630 km', charge: '270 kW', power: '761 ch', accent: '#7b2d8b' },
    { brand: 'Porsche', model: 'Taycan 4S', range: '590 km', charge: '270 kW', power: '530 ch', accent: '#7b2d8b' },
  ];

  return (
    <main className="page-wrapper">
      <PageHero label="Mobilité du Futur" title="Électrique & Hybride" subtitle="L'avenir de la mobilité de luxe, aujourd'hui." />
      <section className="inner-section container">
        <div ref={ref} className={`ev-intro ${visible ? 'reveal' : ''}`}>
          <span className="section-label">Notre Engagement EV</span>
          <h2 className="inner-h2">Puissance silencieuse,<br /><em>impact zéro compromis</em></h2>
          <p className="inner-p" style={{ maxWidth: 600 }}>Mercedes-Benz et Porsche réinventent la performance électrique. Découvrez des véhicules qui allient autonomie record, charge ultra-rapide et dynamique de conduite exaltante.</p>
        </div>
        <div className="ev-grid">
          {models.map(m => (
            <div key={m.model} className="ev-card">
              <div className="ev-card__top">
                <span className="ev-card__brand">{m.brand}</span>
                <h3 className="ev-card__model" style={{ color: m.accent }}>{m.model}</h3>
              </div>
              <div className="ev-specs">
                <div className="ev-spec"><span>Autonomie</span><strong>{m.range}</strong></div>
                <div className="ev-spec"><span>Charge max</span><strong>{m.charge}</strong></div>
                <div className="ev-spec"><span>Puissance</span><strong style={{ color: m.accent }}>{m.power}</strong></div>
              </div>
              <Link to="/vehicles" className="ev-card__link" style={{ color: m.accent }}>Découvrir →</Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ===================== TECHNOLOGY =====================
export function Technology() {
  const techs = [
    { icon: '🧠', title: 'Intelligence Artificielle', desc: 'MBUX et PCM intègrent une IA qui apprend vos habitudes et anticipe vos besoins pour une expérience totalement personnalisée.' },
    { icon: '🛡️', title: 'Sécurité Prédictive', desc: 'Systèmes radar, LiDAR et caméras 360° offrent une vision périphérique totale et anticipent les situations dangereuses.' },
    { icon: '⚡', title: 'Architecture 800V', desc: 'La plateforme haute tension de Porsche permet une charge record de 0 à 80% en moins de 20 minutes.' },
    { icon: '🎵', title: 'Son & Acoustique', desc: 'Burmester et Bose Surround s\'adaptent à l\'acoustique de chaque habitacle pour une expérience audio de concert.' },
    { icon: '🔗', title: 'Connectivité OTA', desc: 'Mises à jour à distance Over-The-Air qui évoluent votre véhicule en permanence sans visite atelier.' },
    { icon: '🏎', title: 'Aérodynamique Active', desc: 'Spoilers adaptatifs, diffuseurs actifs et soubassements profilés qui s\'ajustent selon la vitesse et le mode de conduite.' },
  ];

  return (
    <main className="page-wrapper">
      <PageHero label="Innovation" title="Technologie & Innovations" subtitle="À la pointe de l'ingénierie automobile mondiale." />
      <section className="inner-section container">
        <div className="tech-grid">
          {techs.map((t, i) => (
            <TechCard key={t.title} tech={t} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function TechCard({ tech, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`tech-card ${visible ? 'reveal' : ''}`} style={{ transitionDelay: `${(index % 3) * 0.1}s` }}>
      <span className="tech-card__icon">{tech.icon}</span>
      <h3 className="tech-card__title">{tech.title}</h3>
      <p className="tech-card__desc">{tech.desc}</p>
    </div>
  );
}

// ===================== SUSTAINABILITY =====================
export function Sustainability() {
  return (
    <main className="page-wrapper">
      <PageHero label="Notre Responsabilité" title="Engagements Responsables" subtitle="Luxe et durabilité : deux valeurs qui ne s'opposent plus." />
      <section className="inner-section container">
        <div className="sust-grid">
          {[
            { icon: '🌿', color: '#2d8b4e', title: 'Neutralité Carbone 2039', desc: 'Mercedes-Benz s\'engage à être neutre en carbone sur l\'ensemble de sa chaîne de valeur d\'ici 2039.' },
            { icon: '♻️', color: '#c9a84c', title: 'Matériaux Recyclés', desc: 'Utilisation croissante de matériaux recyclés et biosourcés dans nos intérieurs premium.' },
            { icon: '⚡', color: '#00d4ff', title: 'Électrification Totale', desc: 'Porsche vise 80% de ventes électriques d\'ici 2030. Mercedes 100% électrique en Europe d\'ici 2030.' },
            { icon: '🏭', color: '#7b2d8b', title: 'Usines Vertes', desc: 'Toutes nos usines partenaires fonctionnent à 100% aux énergies renouvelables depuis 2022.' },
            { icon: '🌊', color: '#0099cc', title: 'Zéro Déchet', desc: 'Programme de zéro déchet en décharge. 99% des déchets de production sont recyclés ou valorisés.' },
            { icon: '🤝', color: '#e85d04', title: 'Responsabilité Sociale', desc: 'Programmes de formation et d\'emploi pour les jeunes dans les communautés locales.' },
          ].map((item, i) => (
            <SustCard key={item.title} item={item} index={i} />
          ))}
        </div>
      </section>
    </main>
  );
}

function SustCard({ item, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`sust-card ${visible ? 'reveal' : ''}`} style={{ transitionDelay: `${(index % 3) * 0.1}s`, borderTopColor: item.color }}>
      <span className="sust-card__icon">{item.icon}</span>
      <h3 className="sust-card__title" style={{ color: item.color }}>{item.title}</h3>
      <p className="sust-card__desc">{item.desc}</p>
    </div>
  );
}

// ===================== NEWS =====================
export function News() {
  const articles = [
    { date: 'Mars 2024', category: 'Lancement', title: 'Mercedes-Benz présente la nouvelle Classe E : l\'élégance réinventée', excerpt: 'La nouvelle Classe E redéfinit les standards de la berline de luxe avec un habitacle entièrement repensé et le nouveau MBUX de 4ème génération.' },
    { date: 'Février 2024', category: 'Électrique', title: 'Porsche Taycan : record du Nürburgring pour les véhicules de série', excerpt: 'Le Taycan Turbo S établit un nouveau record sur le mythique circuit allemand en 7 minutes et 33 secondes.' },
    { date: 'Janvier 2024', category: 'Innovation', title: 'Luxury Auto ouvre son nouveau showroom digital à Paris', excerpt: 'Découvrez nos véhicules en réalité augmentée et configurez votre prochain bolide depuis notre espace immersif.' },
    { date: 'Décembre 2023', category: 'Prix', title: 'Mercedes AMG GT élu "Supercar de l\'Année" par Auto Hebdo', excerpt: 'Le jury d\'experts d\'Auto Hebdo a distingué le nouveau AMG GT pour ses performances et son design révolutionnaire.' },
    { date: 'Novembre 2023', category: 'Événement', title: 'Luxury Auto au Mondial de l\'Automobile de Paris', excerpt: 'Retrouvez-nous sur le plus grand salon automobile français avec nos dernières exclusivités et des essais en avant-première.' },
    { date: 'Octobre 2023', category: 'Partenariat', title: 'Nouveau partenariat avec le circuit Paul Ricard', excerpt: 'Nos clients peuvent désormais réserver des journées circuit exclusives sur le mythique Paul Ricard avec nos véhicules.' },
  ];

  return (
    <main className="page-wrapper">
      <PageHero label="Restez Informé" title="Actualités" subtitle="Les dernières nouvelles de Mercedes-Benz, Porsche et Luxury Auto." />
      <section className="inner-section container">
        <div className="news-grid">
          {articles.map((a, i) => <NewsCard key={a.title} article={a} index={i} />)}
        </div>
      </section>
    </main>
  );
}

function NewsCard({ article, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`news-card ${visible ? 'reveal' : ''}`} style={{ transitionDelay: `${(index % 3) * 0.1}s` }}>
      <div className="news-card__meta">
        <span className="news-card__category">{article.category}</span>
        <span className="news-card__date">{article.date}</span>
      </div>
      <h3 className="news-card__title">{article.title}</h3>
      <p className="news-card__excerpt">{article.excerpt}</p>
      <span className="news-card__read">Lire la suite →</span>
    </div>
  );
}

// ===================== CAREERS =====================
export function Careers() {
  const jobs = [
    { dept: 'Vente', title: 'Conseiller Véhicules Neufs', type: 'CDI', location: 'Paris 8ème' },
    { dept: 'Technique', title: 'Technicien Électronique EV', type: 'CDI', location: 'Paris 8ème' },
    { dept: 'Marketing', title: 'Responsable Expérience Client', type: 'CDI', location: 'Paris 8ème' },
    { dept: 'Finance', title: 'Conseiller Financement Auto', type: 'CDI', location: 'Paris 8ème' },
    { dept: 'Alternance', title: 'Assistant Marketing Digital', type: 'Alternance', location: 'Paris 8ème' },
  ];

  return (
    <main className="page-wrapper">
      <PageHero label="Rejoignez-nous" title="Espace Carrière" subtitle="Construisez votre avenir au sein d'une maison d'exception." />
      <section className="inner-section container">
        <div className="careers-intro">
          <h2 className="inner-h2">Travailler chez<br /><em>Luxury Auto</em></h2>
          <p className="inner-p" style={{ maxWidth: 600 }}>Intégrer Luxury Auto, c'est rejoindre une équipe de passionnés, évoluer dans un cadre d'exception et bénéficier de formations aux normes des deux plus grandes marques premium mondiales.</p>
        </div>
        <div className="jobs-list">
          {jobs.map((j, i) => <JobRow key={j.title} job={j} index={i} />)}
        </div>
      </section>
    </main>
  );
}

function JobRow({ job, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`job-row ${visible ? 'reveal' : ''}`} style={{ transitionDelay: `${index * 0.07}s` }}>
      <span className="job-row__dept">{job.dept}</span>
      <h3 className="job-row__title">{job.title}</h3>
      <span className="job-row__type">{job.type}</span>
      <span className="job-row__location">{job.location}</span>
      <Link to="/contact" className="job-row__apply">Postuler →</Link>
    </div>
  );
}

// ===================== COLLABORATIONS =====================
export function Collaborations() {
  const partners = [
    { name: 'Hôtel de Crillon', type: 'Hôtellerie de Luxe', desc: 'Partenariat exclusif pour la mise à disposition de véhicules de prestige pour les clients du palace parisien.' },
    { name: 'Louis Vuitton', type: 'Mode & Lifestyle', desc: 'Collection capsule d\'accessoires auto en collaboration avec la maison emblématique.' },
    { name: 'Circuit Paul Ricard', type: 'Sport Auto', desc: 'Journées circuit exclusives pour nos clients les plus passionnés sur le mythique tracé provençal.' },
    { name: 'Jet Aviation', type: 'Aviation Privée', desc: 'Service de transfert premium entre l\'aéroport du Bourget et nos showrooms pour une expérience porte-à-porte.' },
  ];

  return (
    <main className="page-wrapper">
      <PageHero label="Écosystème Premium" title="Collaborations" subtitle="Des partenariats exclusifs qui étendent l'expérience Luxury Auto bien au-delà du showroom." />
      <section className="inner-section container">
        <div className="partners-grid">
          {partners.map((p, i) => <PartnerCard key={p.name} partner={p} index={i} />)}
        </div>
      </section>
    </main>
  );
}

function PartnerCard({ partner, index }) {
  const [ref, visible] = useScrollReveal();
  return (
    <div ref={ref} className={`partner-card ${visible ? 'reveal' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <span className="partner-card__type">{partner.type}</span>
      <h3 className="partner-card__name">{partner.name}</h3>
      <p className="partner-card__desc">{partner.desc}</p>
    </div>
  );
}

// ===================== CONTACT =====================
export function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = e => { e.preventDefault(); setSent(true); };

  return (
    <main className="page-wrapper">
      <PageHero label="Parlons-nous" title="Contact" subtitle="Notre équipe vous répond dans les plus brefs délais." />
      <section className="inner-section container">
        <div className="contact-grid">
          <div className="contact-info">
            <h2 className="inner-h2">Venez nous<br /><em>rencontrer</em></h2>
            <div className="contact-details">
              {[
                { icon: '📍', label: 'Adresse', val: '12 Avenue des Champs-Élysées\n75008 Paris, France' },
                { icon: '📞', label: 'Téléphone', val: '+33 1 23 45 67 89' },
                { icon: '✉️', label: 'Email', val: 'contact@luxuryauto.fr' },
                { icon: '🕐', label: 'Horaires', val: 'Lun-Sam : 9h–19h\nDim : 10h–17h' },
              ].map(d => (
                <div key={d.label} className="contact-detail">
                  <span className="contact-detail__icon">{d.icon}</span>
                  <div>
                    <span className="contact-detail__label">{d.label}</span>
                    <span className="contact-detail__val" style={{ whiteSpace: 'pre-line' }}>{d.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="contact-form-wrap">
            {sent ? (
              <div className="contact-success">
                <span style={{ fontSize: 40 }}>✓</span>
                <h3>Message envoyé !</h3>
                <p>Notre équipe vous contactera dans les 24 heures ouvrées.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="auth-row">
                  <div className="auth-field">
                    <label className="auth-label">Nom complet</label>
                    <input name="name" value={form.name} onChange={handleChange} required className="auth-input" placeholder="Jean Dupont" />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Email</label>
                    <input type="email" name="email" value={form.email} onChange={handleChange} required className="auth-input" placeholder="jean@email.com" />
                  </div>
                </div>
                <div className="auth-row">
                  <div className="auth-field">
                    <label className="auth-label">Téléphone</label>
                    <input name="phone" value={form.phone} onChange={handleChange} className="auth-input" placeholder="+33 6 00 00 00 00" />
                  </div>
                  <div className="auth-field">
                    <label className="auth-label">Sujet</label>
                    <select name="subject" value={form.subject} onChange={handleChange} className="auth-input" style={{ background: 'var(--black-soft)', color: form.subject ? 'var(--white)' : 'var(--gray-400)' }}>
                      <option value="">Sélectionner...</option>
                      <option>Achat véhicule</option>
                      <option>Essai routier</option>
                      <option>Service après-vente</option>
                      <option>Financement</option>
                      <option>Autre</option>
                    </select>
                  </div>
                </div>
                <div className="auth-field">
                  <label className="auth-label">Message</label>
                  <textarea name="message" value={form.message} onChange={handleChange} required className="auth-input" rows={5} placeholder="Votre message..." style={{ resize: 'vertical' }} />
                </div>
                <button type="submit" className="auth-submit">Envoyer le message</button>
              </form>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

// ===================== NOT FOUND =====================
export function NotFound() {
  return (
    <main className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 120, color: 'var(--gold)', fontWeight: 300, lineHeight: 1, display: 'block' }}>404</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 32, fontWeight: 300, color: 'var(--white)', margin: '16px 0 12px' }}>Page introuvable</h2>
        <p style={{ color: 'var(--white-muted)', marginBottom: 40 }}>Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn-gold"><span>Retour à l'accueil</span></Link>
      </div>
    </main>
  );
}
