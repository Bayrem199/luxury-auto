import React from 'react';
import './PageHero.css';

export default function PageHero({
  label,
  title,
  subtitle,
  size = 'medium',
  backgroundImage
}) {
  return (
    <div className={`page-hero page-hero--${size}`}>

      {/* IMAGE BACKGROUND */}
      {backgroundImage && (
        <div
          className="page-hero__image"
          style={{
            backgroundImage: `url(${backgroundImage})`
          }}
        />
      )}

      {/* ORIGINAL EFFECTS */}
      <div className="page-hero__bg" />
      <div className="page-hero__grid" />
      <div className="page-hero__overlay" />

      {/* CONTENT */}
      <div className="page-hero__content container">
        {label && (
          <span className="section-label">
            {label}
          </span>
        )}

        <h1 className="page-hero__title">
          {title}
        </h1>

        {subtitle && (
          <p className="page-hero__subtitle">
            {subtitle}
          </p>
        )}

        <div
          className="gold-line-left"
          style={{ marginTop: 28 }}
        />
      </div>
    </div>
  );
}