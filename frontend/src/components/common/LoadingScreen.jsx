import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LoadingScreen.css';

const CRITICAL_ASSETS = [
  '/logos/logof.png',
  '/logos/mercedes.png',
  '/logos/porsche.png',
  '/videos/hero.mp4',
];

function preloadAsset(src) {
  return new Promise((resolve) => {
    if (src.match(/\.(mp4|webm)$/i)) {
      const v = document.createElement('video');
      v.oncanplaythrough = resolve;
      v.onerror = resolve;
      v.src = src; v.load();
      setTimeout(resolve, 4000);
    } else {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    }
  });
}

export default function LoadingScreen({ onComplete }) {
  const canvasRef   = useRef(null);
  const mouse       = useRef({ x: 0.5, y: 0.5 });
  const [progress, setProgress] = useState(0);
  const [phase, setPhase]       = useState(0); // 0=intro 1=loading 2=done
  const [exiting, setExiting]   = useState(false);

  /* ── Particles canvas ── */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let raf, W, H;

    const resize = () => {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const onMove = e => {
      mouse.current.x = e.clientX / window.innerWidth;
      mouse.current.y = e.clientY / window.innerHeight;
    };
    window.addEventListener('mousemove', onMove);

    const lines = Array.from({ length: 26 }, () => ({
      x: Math.random(), y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0003,
      vy: (Math.random() - 0.5) * 0.0003,
      size: Math.random() * 100 + 35,
      alpha: Math.random() * 0.45 + 0.05,
    }));

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const mx = mouse.current.x;
      const my = mouse.current.y;
      lines.forEach(l => {
        l.x += l.vx + (mx - 0.5) * 0.00012;
        l.y += l.vy + (my - 0.5) * 0.00012;
        if (l.x < 0 || l.x > 1) l.vx *= -1;
        if (l.y < 0 || l.y > 1) l.vy *= -1;
        const gx = l.x * W, gy = l.y * H;
        const dist = Math.hypot(mx * W - gx, my * H - gy);
        const pull = Math.max(0, 1 - dist / 320);
        ctx.save();
        ctx.globalAlpha = (l.alpha + pull * 0.28) * 0.65;
        ctx.strokeStyle = `rgba(201,168,76,${0.12 + pull * 0.38})`;
        ctx.lineWidth = 0.4 + pull * 0.9;
        ctx.beginPath(); ctx.moveTo(gx - l.size, gy); ctx.lineTo(gx + l.size, gy); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(gx, gy - l.size * 0.25); ctx.lineTo(gx, gy + l.size * 0.25); ctx.stroke();
        ctx.restore();
      });
      raf = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  /* ── Asset preload ── */
  useEffect(() => {
    let cancelled = false;
    const total = CRITICAL_ASSETS.length;
    let loaded = 0;

    setTimeout(() => setPhase(1), 800);

    const minDelay = new Promise(r => setTimeout(r, 2200));
    const promises = CRITICAL_ASSETS.map(src =>
      preloadAsset(src).then(() => {
        if (cancelled) return;
        loaded++;
        setProgress(Math.round((loaded / total) * 100));
      })
    );

    Promise.all([...promises, minDelay]).then(() => {
      if (cancelled) return;
      setProgress(100);
      setTimeout(() => {
        if (cancelled) return;
        setPhase(2);
        setTimeout(() => {
          if (cancelled) return;
          setExiting(true);
          setTimeout(() => { if (!cancelled) onComplete?.(); }, 900);
        }, 500);
      }, 400);
    });

    return () => { cancelled = true; };
  }, [onComplete]);

  const dotIdx = Math.floor(progress / 25);

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="ls"
          exit={{ opacity: 0, scale: 1.06 }}
          transition={{ duration: 0.9, ease: [0.77, 0, 0.175, 1] }}
        >
          {/* Canvas particles */}
          <canvas ref={canvasRef} className="ls__canvas" />

          {/* Grid */}
          <div className="ls__grid" />

          {/* Ambient glow */}
          <div className="ls__glow" />

          {/* Scan line */}
          <div className="ls__scan" />

          {/* Main content */}
          <div className="ls__content">

            {/* Animated ring + diamond */}
            <motion.div
              className="ls__ring-wrap"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="ls__ring ls__ring--1">
                <div className="ls__ring-dot" />
              </div>
              <div className="ls__ring ls__ring--2">
                <div className="ls__ring-dot ls__ring-dot--2" />
              </div>
              <div className="ls__ring ls__ring--3" />
              <div className="ls__diamond">
                <div className="ls__diamond-inner" />
              </div>
            </motion.div>

            {/* Brand */}
            <motion.span
              className="ls__brand"
              initial={{ letterSpacing: '22px', opacity: 0 }}
              animate={{ letterSpacing: '10px', opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.77, 0, 0.175, 1] }}
            >
              LUXURY AUTO
            </motion.span>

            <motion.span
              className="ls__sub"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Mercedes · Porsche
            </motion.span>

            {/* Progress */}
            <motion.div
              className="ls__progress"
              initial={{ opacity: 0 }}
              animate={{ opacity: phase >= 1 ? 1 : 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="ls__track">
                <motion.div
                  className="ls__fill"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: progress / 100 }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  style={{ transformOrigin: 'left' }}
                />
              </div>
              <div className="ls__progress-foot">
                <span className="ls__pct">{progress}%</span>
                <div className="ls__dots">
                  {[0, 1, 2, 3].map(i => (
                    <span key={i} className={`ls__dot ${i <= dotIdx ? 'ls__dot--on' : ''}`} />
                  ))}
                </div>
              </div>
            </motion.div>

          </div>

          {/* Corner ornaments */}
          <div className="ls__corner ls__corner--tl" />
          <div className="ls__corner ls__corner--tr" />
          <div className="ls__corner ls__corner--bl" />
          <div className="ls__corner ls__corner--br" />

          {/* Side labels */}
          <div className="ls__side ls__side--left">LUXURY AUTO</div>
          <div className="ls__side ls__side--right">© 2025</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}