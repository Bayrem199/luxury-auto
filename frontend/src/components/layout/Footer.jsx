import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Footer.css';

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__top-line" />
      <div className="footer__top">
        <div className="container">
          <div className="footer__grid">
            <div className="footer__brand">
              <div className="footer__logo">
                <span className="footer__logo-main">LUXURY AUTO</span>
                <span className="footer__logo-sub">Mercedes · Porsche</span>
              </div>
              <p className="footer__tagline">L'excellence automobile au service<br />de votre passion.</p>
              <div className="footer__socials">
                {['Instagram', 'LinkedIn', 'YouTube', 'Facebook'].map(s => (
                  <a key={s} href="#!" className="footer__social">{s}</a>
                ))}
              </div>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Véhicules</h4>
              <ul className="footer__col-links">
                {[['Tous les Modèles','/vehicles'],['Électrique & Hybride','/electric-hybrid'],['Technologie','/technology'],['Mercedes AMG','/vehicles'],['Porsche 911','/vehicles']].map(([l,p]) => (
                  <li key={l}><Link to={p}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Marque</h4>
              <ul className="footer__col-links">
                {[['À Propos','/about'],['Engagements','/sustainability'],['Collaborations','/collaborations'],['Carrières','/careers'],['Actualités','/news']].map(([l,p]) => (
                  <li key={l}><Link to={p}>{l}</Link></li>
                ))}
              </ul>
            </div>
            <div className="footer__col">
              <h4 className="footer__col-title">Contact</h4>
              <ul className="footer__col-links">
                <li><Link to="/contact">Nous contacter</Link></li>
                <li><a href="tel:+21690160918">+216 90 160 918</a></li>
                <li><a href="mailto:contact@luxuryauto.fr">bayrembhibah@outlook.com</a></li>
                <li className="footer__address">12 Riadh el andalous<br />75008 Ariana, Tunis</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        <div className="container">
          <div className="footer__bottom-inner">
            <p className="footer__copy">© {year} Luxury Auto. Tous droits réservés.</p>
            <div className="footer__legal">
              {['Mentions légales','Confidentialité','Cookies'].map((l,i) => (
                <React.Fragment key={l}>{i > 0 && <span>·</span>}<a href="#!">{l}</a></React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
