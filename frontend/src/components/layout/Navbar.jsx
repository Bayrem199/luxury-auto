import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navbar.css';

const navLinks = [
  { label: 'Accueil', path: '/' },

  {
    label: 'Véhicules',
    path: '/vehicles',
    sub: [
      { label: 'Tous les Modèles', path: '/vehicles' },
      { label: 'Électrique & Hybride', path: '/electric-hybrid' },
      { label: 'Technologie', path: '/technology' },
    ],
  },

  { label: 'À Propos', path: '/about' },

  { label: 'Actualités', path: '/news' },

  {
    label: 'Découvrir',
    path: '#',
    sub: [
      { label: 'Engagements', path: '/sustainability' },
      { label: 'Collaborations', path: '/collaborations' },
      { label: 'Carrières', path: '/careers' },
    ],
  },

  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const location = useLocation();
  const navigate = useNavigate();

  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);

      const total =
        document.documentElement.scrollHeight -
        window.innerHeight;

      setScrollProgress(
        total > 0
          ? (window.scrollY / total) * 100
          : 0
      );
    };

    window.addEventListener('scroll', onScroll);

    return () =>
      window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  return (
    <nav
      className={`navbar ${
        scrolled ? 'navbar--scrolled' : ''
      } ${menuOpen ? 'navbar--open' : ''}`}
    >
      <div
        className="navbar__progress"
        style={{ width: `${scrollProgress}%` }}
      />

      <div className="navbar__inner">

        {/* LOGO */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-main">
            LUXURY AUTO
          </span>

          <span className="navbar__logo-sub">
            Mercedes · Porsche
          </span>
        </Link>

        {/* DESKTOP LINKS */}
        <ul className="navbar__links">

          {navLinks.map((link) => (

            <li
              key={link.label}
              className={`navbar__item ${
                link.sub
                  ? 'navbar__item--has-sub'
                  : ''
              }`}

              onMouseEnter={() => {
                if (link.sub) {
                  clearTimeout(window.navTimeout);

                  setActiveDropdown(link.label);
                }
              }}

              onMouseLeave={() => {
                window.navTimeout = setTimeout(() => {
                  setActiveDropdown(null);
                }, 220);
              }}
            >

              <Link
                to={link.path}
                className={`navbar__link ${
                  location.pathname === link.path
                    ? 'navbar__link--active'
                    : ''
                }`}
              >
                {link.label}

                {link.sub && (
                  <span className="navbar__caret">
                    ›
                  </span>
                )}
              </Link>

              {link.sub && (
                <div
                  className={`navbar__dropdown ${
                    activeDropdown === link.label
                      ? 'navbar__dropdown--visible'
                      : ''
                  }`}
                >

                  <div className="navbar__dropdown-line" />

                  {link.sub.map((s) => (

                    <Link
                      key={s.label}
                      to={s.path}
                      className="navbar__dropdown-item"
                    >
                      <span className="navbar__dropdown-dot" />

                      <span>{s.label}</span>
                    </Link>

                  ))}

                </div>
              )}

            </li>

          ))}

        </ul>

        {/* AUTH */}
        <div className="navbar__auth">

          {isAuthenticated ? (

            <div className="navbar__user">

              <Link
                to="/dashboard"
                className="navbar__user-name"
              >
                <span className="navbar__user-pulse" />

                {user?.firstName}
              </Link>

              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="navbar__logout"
              >
                Déconnexion
              </button>

            </div>

          ) : (

            <>

              <Link
                to="/login"
                className="navbar__auth-link"
              >
                Connexion
              </Link>

              <Link
                to="/register"
                className="navbar__cta"
              >
                <span>Espace Client</span>

                <span className="navbar__cta-arrow">
                  →
                </span>
              </Link>

            </>

          )}

        </div>

        {/* HAMBURGER */}
        <button
          className={`navbar__hamburger ${
            menuOpen
              ? 'navbar__hamburger--open'
              : ''
          }`}
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
        >
          <span />
          <span />
          <span />
        </button>

      </div>

      {/* MOBILE MENU */}
      <div
        className={`navbar__mobile ${
          menuOpen
            ? 'navbar__mobile--open'
            : ''
        }`}
      >

        <div className="navbar__mobile-links">

          {navLinks.map((link) => (

            <React.Fragment key={link.label}>

              <Link
                to={link.path}
                className="navbar__mobile-link"
              >
                {link.label}
              </Link>

              {link.sub?.map((s) => (

                <Link
                  key={s.label}
                  to={s.path}
                  className="navbar__mobile-link navbar__mobile-link--sub"
                >
                  — {s.label}
                </Link>

              ))}

            </React.Fragment>

          ))}

          <div className="navbar__mobile-auth">

            {isAuthenticated ? (

              <>

                <Link
                  to="/dashboard"
                  className="navbar__mobile-link"
                >
                  Mon Espace
                </Link>

                <button
                  onClick={() => {
                    logout();
                    navigate('/');
                    setMenuOpen(false);
                  }}
                  className="navbar__mobile-link navbar__mobile-logout"
                >
                  Déconnexion
                </button>

              </>

            ) : (

              <>

                <Link
                  to="/login"
                  className="navbar__mobile-link"
                >
                  Connexion
                </Link>

                <Link
                  to="/register"
                  className="navbar__mobile-link navbar__mobile-cta"
                >
                  Espace Client →
                </Link>

              </>

            )}

          </div>

        </div>

      </div>

    </nav>
  );
}