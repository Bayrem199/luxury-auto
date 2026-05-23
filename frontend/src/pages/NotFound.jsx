import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <main className="page-wrapper" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <div style={{ textAlign: 'center', padding: '40px 20px' }}>
        <span style={{ fontFamily: 'var(--font-display)', fontSize: 140, color: 'var(--gold)', fontWeight: 300, lineHeight: 1, display: 'block', opacity: 0.4 }}>404</span>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 36, fontWeight: 300, color: 'var(--white)', margin: '16px 0 12px' }}>Page introuvable</h2>
        <p style={{ color: 'var(--white-muted)', marginBottom: 40, fontSize: 14 }}>Cette page n'existe pas ou a été déplacée.</p>
        <Link to="/" className="btn-gold"><span>Retour à l'accueil</span></Link>
      </div>
    </main>
  );
}
