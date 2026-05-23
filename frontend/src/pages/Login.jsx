import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleSubmit = async e => {
    e.preventDefault(); setError(''); setLoading(true);
    try { await login(form.email, form.password); navigate('/dashboard'); }
    catch (err) { setError(err.response?.data?.message || 'Erreur de connexion'); }
    finally { setLoading(false); }
  };

  return (
    <main className="auth-page">
      <div className="auth-bg">
        <div className="auth-bg__orb auth-bg__orb--1" />
        <div className="auth-bg__orb auth-bg__orb--2" />
        <div className="auth-bg__grid" />
      </div>
      <motion.div className="auth-card"
        initial={{ opacity: 0, y: 40, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.77, 0, 0.175, 1] }}>
        <div className="auth-card__top-line" />
        <div className="auth-card__header">
          <Link to="/" className="auth-logo">
            <span className="auth-logo__main">LUXURY AUTO</span>
            <span className="auth-logo__sub">Mercedes · Porsche</span>
          </Link>
          <h1 className="auth-title">Connexion</h1>
          <p className="auth-subtitle">Accédez à votre espace client exclusif</p>
        </div>
        {error && <motion.div className="auth-error" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>{error}</motion.div>}
        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="auth-field">
            <label className="auth-label">Adresse email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} required className="auth-input" placeholder="votre@email.com" />
          </div>
          <div className="auth-field">
            <label className="auth-label">Mot de passe</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} required className="auth-input" placeholder="••••••••" />
          </div>
          <button type="submit" className="auth-submit" disabled={loading}>
            {loading ? <><span className="auth-spinner" /> Connexion...</> : 'Se connecter'}
          </button>
        </form>
        <div className="auth-card__footer">
          <p>Pas encore de compte ? <Link to="/register" className="auth-switch-link">Créer un compte →</Link></p>
        </div>
      </motion.div>
    </main>
  );
}
