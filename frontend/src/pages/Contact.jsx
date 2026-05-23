import React, { useState } from 'react';
import PageHero from '../components/ui/PageHero';
import './InnerPages.css';
import './Auth.css';

export default function Contact() {

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [sent, setSent] = useState(false);

  const handleChange = (e) =>
    setForm((f) => ({
      ...f,
      [e.target.name]: e.target.value
    }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="page-wrapper">

      {/* HERO BANNER */}
      <PageHero
        label="Parlons-nous"
        title="Contact"
        subtitle="Notre équipe vous répond dans les plus brefs délais."
        backgroundImage="/images/banner8.png"
      />

      {/* CONTENT */}
      <section className="inner-section container">

        <div className="contact-grid">

          {/* LEFT */}
          <div className="contact-info">

            <h2 className="inner-h2">
              Venez nous<br />
              <em>rencontrer</em>
            </h2>

            <div className="contact-details">

              {[
                {
                  icon: '📍',
                  label: 'Adresse',
                  val: '12 Riadh el andalous \n75008 Ariana, Tunis'
                },
                {
                  icon: '📞',
                  label: 'Téléphone',
                  val: '+216 90 160 918'
                },
                {
                  icon: '✉️',
                  label: 'Email',
                  val: 'bayrembhibah@outlook.com'
                },
                {
                  icon: '🕐',
                  label: 'Horaires',
                  val: 'Lun–Sam : 9h–19h\nDim : 10h–17h'
                },
              ].map((d) => (

                <div
                  key={d.label}
                  className="contact-detail"
                >

                  <span className="contact-detail__icon">
                    {d.icon}
                  </span>

                  <div>

                    <span className="contact-detail__label">
                      {d.label}
                    </span>

                    <span
                      className="contact-detail__val"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {d.val}
                    </span>

                  </div>

                </div>

              ))}

            </div>

          </div>

          {/* RIGHT */}
          <div className="contact-form-wrap">

            {sent ? (

              <div className="contact-success">

                <span
                  style={{
                    fontSize: 48,
                    display: 'block',
                    marginBottom: 20
                  }}
                >
                  ✓
                </span>

                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 32,
                    fontWeight: 300,
                    color: 'var(--white)',
                    marginBottom: 12
                  }}
                >
                  Message envoyé !
                </h3>

                <p
                  style={{
                    color: 'var(--white-muted)',
                    fontSize: 14
                  }}
                >
                  Notre équipe vous contactera dans les 24 heures ouvrées.
                </p>

              </div>

            ) : (

              <form
                className="contact-form"
                onSubmit={handleSubmit}
              >

                <div className="auth-row">

                  <div className="auth-field">
                    <label className="auth-label">
                      Nom complet
                    </label>

                    <input
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      className="auth-input"
                      placeholder="Jean Dupont"
                    />
                  </div>

                  <div className="auth-field">
                    <label className="auth-label">
                      Email
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="auth-input"
                      placeholder="jean@email.com"
                    />
                  </div>

                </div>

                <div className="auth-row">

                  <div className="auth-field">
                    <label className="auth-label">
                      Téléphone
                    </label>

                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="auth-input"
                      placeholder="+33 6 00 00 00 00"
                    />
                  </div>

                  <div className="auth-field">

                    <label className="auth-label">
                      Sujet
                    </label>

                    <select
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      className="auth-input"
                      style={{
                        background: 'var(--black-soft)',
                        color: form.subject
                          ? 'var(--white)'
                          : 'var(--gray-400)'
                      }}
                    >
                      <option value="">
                        Sélectionner...
                      </option>

                      <option>
                        Achat véhicule
                      </option>

                      <option>
                        Essai routier
                      </option>

                      <option>
                        Service après-vente
                      </option>

                      <option>
                        Financement
                      </option>

                      <option>
                        Autre
                      </option>

                    </select>

                  </div>

                </div>

                <div className="auth-field">

                  <label className="auth-label">
                    Message
                  </label>

                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    required
                    className="auth-input"
                    rows={5}
                    placeholder="Votre message..."
                    style={{ resize: 'vertical' }}
                  />

                </div>

                <button
                  type="submit"
                  className="auth-submit"
                >
                  Envoyer le message
                </button>

              </form>

            )}

          </div>

        </div>

      </section>

    </main>
  );
}