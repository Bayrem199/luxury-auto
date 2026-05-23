import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Register() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await register(form); navigate('/dashboard'); }
    catch (err) {
      const errs = err.response?.data?.errors;
      setError(errs ? errs[0].msg : (err.response?.data?.message || 'Erreur inscription'));
    }
    finally { setLoading(false); }
  };

  return (
    <main className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
        <div className="auth-bg__grid" />
      </div>
      <motion.div className="auth-card auth-card--wide"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}>
        <div className="auth-card__top-line" />
        <div className="auth-card__header">
          <Link to="/" className="auth-logo">
            <span className="auth-logo__main">LUXURY AUTO</span>
            <span className="auth-logo__sub">Mercedes · Porsche</span>
          </Link>
          <h1 className="auth-title">Créer un compte</h1>
          <p className="auth-subtitle">Rejoignez l'expérience Luxury Auto</p>
        </div>
        {error && <motion.div className="auth-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>{error}</motion.div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-row">
            <div className="auth-field">
              <label className="auth-label">Prénom</label>
              <input type="text" name="firstName" value={form.firstName} onChange={handleChange} required className="auth-input" placeholder="Jean" />
            </div>
            <div className="auth-field">
              <label className="auth-label">Nom</label>
              <input type="text" name="lastName" value={form.lastName} onChange={handleChange} required className="auth-input" placeholder="Dupont" />
            </div>
          </div>
          <div className="auth-field">
            <label className="auth-label">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="auth-input" placeholder="votre@email.com" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="auth-input" placeholder="Minimum 6 caractères" />
          </div>
          <div className="auth-benefits">
            {['Accès aux configurations exclusives', 'Essais routiers privés', 'Offres personnalisées', 'Suivi commande temps réel'].map(b => (
              <div key={b} className="auth-benefit"><span className="auth-benefit__dot" />{b}</div>
            ))}
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <><span className="auth-spinner" /> Création...</> : 'Créer mon espace client'}
          </button>
        </form>
        <div className="auth-card__footer">
          <p>Déjà client ? <Link to="/login" className="auth-switch-link">Se connecter →</Link></p>
        </div>
      </motion.div>
    </main>
  );
}
