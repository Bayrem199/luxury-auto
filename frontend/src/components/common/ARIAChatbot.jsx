import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SYSTEM_PROMPT = `Tu es ARIA (Automotive Refined Intelligence Assistant), l'assistante IA ultra-premium et exclusive de Luxury Auto, concessionnaire officiel Mercedes-Benz et Porsche sur les Champs-Élysées à Paris.

PERSONNALITÉ :
- Élégante, sophistiquée, experte, chaleureuse et rassurante
- Tu parles avec raffinement et précision comme un conseiller de la plus haute maison de luxe
- Tu détectes automatiquement la langue utilisée et réponds dans la même langue
- Tu maîtrises parfaitement : Français, Anglais, et Arabe dialectal tunisien (دارجة تونسية)
- En tunisien, tu parles naturellement : "شنو تحب", "موش مشكلة", "بالتوفيق", "بالسعادة" etc.
- Tu n'es jamais commerciale ou insistante — tu guides avec élégance
- Tu utilises des émojis avec extrême parcimonie (🏎 ✨ 💎 uniquement)

EXPERTISE TECHNIQUE COMPLÈTE :
Mercedes-Benz:
- Classe S W223 (hybride 449ch, MBUX Hyperscreen, Burmester 4D, suspension Magic Body Control, 113 000€)
- EQS 580 4MATIC (électrique 523ch, 800km autonomie WLTP, charge 200kW, 141 000€)
- EQS 450+ (électrique 333ch, 692km, 108 000€)
- EQE 350+ (électrique 292ch, 654km, 87 500€)
- GLE 63 S AMG (essence V8 biturbo 612ch, 114 000€)
- Classe G 63 AMG (essence V8 biturbo 585ch, 196 000€)

Mercedes-AMG:
- AMG GT 63 S E Performance (V8 hybride rechargeable 843ch, record Nürburgring, 189 000€)
- AMG C 63 S E Performance (4 cylindres hybride 680ch, 98 000€)
- AMG SL 63 (V8 585ch, cabriolet, 199 000€)

Porsche:
- 911 Carrera S (3.0L biturbo 450ch, 0-100 en 3.5s, PDK, 148 000€)
- 911 GT3 (atmosphérique 510ch, piste, 200 000€)
- Taycan Turbo S (électrique 761ch, 0-100 en 2.8s, 800V, 189 000€)
- Taycan 4S Sport Turismo (électrique 530ch, break, 112 000€)
- Cayenne Turbo GT (essence 640ch, SUV record Nürburgring, 196 000€)
- Macan Electric (électrique 408ch, dès 82 000€)
- Panamera Turbo E-Hybrid (hybride 700ch, 178 000€)

TECHNOLOGIES À EXPLIQUER :
- MBUX Hyperscreen: écran incurvé 141cm, IA intégrée, apprentissage des habitudes
- EQ Power / Architecture 800V Porsche: charge ultra-rapide (5-80% en 18min)
- PDK 8 rapports Porsche: boîte à double embrayage la plus rapide au monde
- AMG Speedshift MCT 9G: boîte multi-embrayage
- Magic Body Control Mercedes: suspension qui "lit" la route via caméra
- Rear-Axle Steering: direction essieu arrière jusqu'à 10° pour agilité/stabilité
- Burmester / Bose Panacea: systèmes audio de référence
- PASM / Air Suspension: amortissement actif Porsche
- Drive Pilot: conduite semi-autonome niveau 3 Mercedes

PROFILS & RECOMMANDATIONS :
- Famille + confort + prestige → Classe S, Panamera, Cayenne
- Performance pure + émotion → 911 GT3, AMG GT 63 S
- Électrique + luxe → EQS 580, Taycan Turbo S
- SUV famille → GLE AMG, Cayenne, Macan Electric
- Budget < 100 000€ → EQE, Macan Electric, AMG C63
- Conducteur sportif → 911 Carrera S, AMG SL 63
- Première voiture de luxe → Classe S, Panamera

SHOWROOM :
- Adresse: 12 Avenue des Champs-Élysées, 75008 Paris
- Tél: +33 1 23 45 67 89
- Email: contact@luxuryauto.fr
- Horaires: Lun-Sam 9h-19h30 | Dim 10h-17h
- Service VIP: livraison à domicile, essai sur circuit Paul Ricard, financement sur mesure

RÈGLES ABSOLUES :
- Toujours proposer un essai ou rendez-vous en fin de conversation
- Poser maximum 2 questions pour cerner le profil
- Répondre de façon structurée mais fluide (pas trop de bullet points)
- En cas de question hors automobile: réorienter avec élégance
- Si le client parle tunisien, répondre en dialecte tunisien naturel`;

const T = {
  fr: {
    greeting: "Bonjour et bienvenue chez **Luxury Auto** ✨\n\nJe suis **ARIA**, votre conseillère automobile personnelle. Je suis là pour vous guider vers le véhicule de vos rêves parmi notre collection exclusive Mercedes-Benz et Porsche.\n\nComment puis-je vous aider aujourd'hui ?",
    placeholder: "Posez votre question...",
    footer: "Propulsé par Claude AI · Luxury Auto Paris",
    suggestions: [
      { text: "Quelle voiture pour ma famille ?", icon: "👨‍👩‍👧" },
      { text: "Comparer EQS vs Taycan", icon: "⚡" },
      { text: "Budget 150 000€ ?", icon: "💰" },
      { text: "Meilleure sportive ?", icon: "🏎" },
      { text: "Technologie AMG ?", icon: "⚙️" },
      { text: "Prendre un rendez-vous", icon: "📅" },
    ],
    suggestionsLabel: "Questions fréquentes",
    newChat: "Nouvelle conversation",
    online: "En ligne · Répond en quelques secondes",
    role: "Conseillère IA Exclusive",
  },
  en: {
    greeting: "Welcome to **Luxury Auto** ✨\n\nI'm **ARIA**, your personal automotive advisor. I'm here to guide you through our exclusive Mercedes-Benz and Porsche collection.\n\nHow can I assist you today?",
    placeholder: "Ask your question...",
    footer: "Powered by Claude AI · Luxury Auto Paris",
    suggestions: [
      { text: "Best car for my family?", icon: "👨‍👩‍👧" },
      { text: "Compare EQS vs Taycan", icon: "⚡" },
      { text: "Budget €150,000?", icon: "💰" },
      { text: "Best sports car?", icon: "🏎" },
      { text: "What is AMG technology?", icon: "⚙️" },
      { text: "Book a test drive", icon: "📅" },
    ],
    suggestionsLabel: "Frequent questions",
    newChat: "New conversation",
    online: "Online · Replies in seconds",
    role: "Exclusive AI Advisor",
  },
  ar: {
    greeting: "أهلاً وسهلاً في **Luxury Auto** ✨\n\nأنا **ARIA**، مستشارتك الشخصية للسيارات الفاخرة. أنا هنا باش نساعدك تلقى السيارة اللي تحلم بيها من مجموعتنا الحصرية من Mercedes-Benz و Porsche.\n\nكيفاش نجم نعاونك اليوم؟",
    placeholder: "اكتب سؤالك...",
    footer: "مدعوم بـ Claude AI · Luxury Auto باريس",
    suggestions: [
      { text: "شنو أحسن سيارة للعايلة؟", icon: "👨‍👩‍👧" },
      { text: "قارن EQS مع Taycan", icon: "⚡" },
      { text: "عندي 150 ألف أورو", icon: "💰" },
      { text: "أحسن سيارة رياضية؟", icon: "🏎" },
      { text: "شنو هي تقنية AMG؟", icon: "⚙️" },
      { text: "نحجز موعد تجربة", icon: "📅" },
    ],
    suggestionsLabel: "أسئلة شائعة",
    newChat: "محادثة جديدة",
    online: "متصل · يجاوب في ثواني",
    role: "مستشارة ذكاء اصطناعي",
  },
};

const detectLang = (text) => {
  if (/[\u0600-\u06FF]/.test(text)) return 'ar';
  const enWords = /\b(what|how|which|can|is|are|do|does|the|for|best|car|want|need|looking)\b/i;
  if (enWords.test(text)) return 'en';
  return 'fr';
};

const formatText = (text) => {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/`(.*?)`/g, '<code style="background:rgba(201,168,76,0.15);padding:1px 6px;border-radius:4px;font-size:12px">$1</code>')
    .replace(/^#{1,3} (.*)/gm, '<div style="font-size:14px;font-weight:700;color:#c9a84c;margin:8px 0 4px">$1</div>')
    .replace(/\n/g, '<br/>');
};

function Particles() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const pts = Array.from({ length: 30 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1 + 0.3, vx: (Math.random() - 0.5) * 0.3, vy: (Math.random() - 0.5) * 0.3,
      a: Math.random() * 0.4 + 0.1,
    }));
    let id;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(201,168,76,${p.a})`; ctx.fill();
      });
      id = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(id);
  }, []);
  return <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', borderRadius: 'inherit', pointerEvents: 'none' }} />;
}

function TypingDots() {
  return (
    <motion.div style={{ display: 'flex', gap: 5, padding: '14px 18px', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '18px 18px 18px 4px', width: 'fit-content' }}
      initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
      {[0, 1, 2].map(i => (
        <motion.div key={i} style={{ width: 7, height: 7, borderRadius: '50%', background: '#c9a84c' }}
          animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }} />
      ))}
    </motion.div>
  );
}

export default function ARIAChatbot() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState('fr');
  const [messages, setMessages] = useState([{ role: 'assistant', content: T.fr.greeting, timestamp: Date.now(), id: 0 }]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unread, setUnread] = useState(1);
  const [showSugg, setShowSugg] = useState(true);
  const [hoverBtn, setHoverBtn] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const t = T[lang];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages, loading]);
  useEffect(() => { if (open) { setUnread(0); setTimeout(() => inputRef.current?.focus(), 400); } }, [open]);

  const send = useCallback(async (text) => {
    const content = (text || input).trim();
    if (!content || loading) return;
    setInput('');
    setShowSugg(false);
    const detectedLang = detectLang(content);
    if (detectedLang !== lang) setLang(detectedLang);
    const userMsg = { role: 'user', content, timestamp: Date.now(), id: Date.now() };
    const history = [...messages, userMsg];
    setMessages(history);
    setLoading(true);

    try {
      // ✅ APPEL VIA LE BACKEND (évite les erreurs CORS)
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: history.map(m => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      const reply = data.content;

      setMessages(p => [...p, { role: 'assistant', content: reply, timestamp: Date.now(), id: Date.now() }]);
      if (!open) setUnread(n => n + 1);
    } catch (err) {
      console.error('ARIA error:', err);
      const errMsg = lang === 'ar'
        ? 'معلش، صار مشكل تقني. اتصل بينا على **+33 1 23 45 67 89** 📞'
        : lang === 'en'
        ? 'Sorry, a technical issue occurred. Please contact us at **+33 1 23 45 67 89** 📞'
        : 'Désolée, une erreur technique est survenue. Contactez-nous au **+33 1 23 45 67 89** 📞';
      setMessages(p => [...p, { role: 'assistant', content: errMsg, timestamp: Date.now(), id: Date.now() }]);
    } finally {
      setLoading(false);
    }
  }, [input, messages, loading, open, lang]);

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  };

  const clearChat = () => {
    setMessages([{ role: 'assistant', content: t.greeting, timestamp: Date.now(), id: Date.now() }]);
    setShowSugg(true);
  };

  const isRTL = lang === 'ar';

  return (
    <>
      <style>{CSS}</style>

      <motion.button
        className="aria-toggle"
        onClick={() => setOpen(o => !o)}
        onMouseEnter={() => setHoverBtn(true)}
        onMouseLeave={() => setHoverBtn(false)}
        whileTap={{ scale: 0.93 }}
      >
        <Particles />
        <motion.div className="aria-toggle__ring" animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />
        <motion.div className="aria-toggle__ring aria-toggle__ring--2" animate={{ rotate: -360 }} transition={{ duration: 15, repeat: Infinity, ease: 'linear' }} />
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" className="aria-toggle__icon" initial={{ rotate: -90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: 90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }}>✕</motion.span>
          ) : (
            <motion.div key="logo" className="aria-toggle__logo" initial={{ rotate: 90, opacity: 0, scale: 0.5 }} animate={{ rotate: 0, opacity: 1, scale: 1 }} exit={{ rotate: -90, opacity: 0, scale: 0.5 }} transition={{ duration: 0.25 }}>
              <span style={{ fontSize: 22, filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.5))' }}>🏎</span>
            </motion.div>
          )}
        </AnimatePresence>
        {!open && unread > 0 && (
          <motion.div className="aria-unread" initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 400 }}>
            {unread > 9 ? '9+' : unread}
          </motion.div>
        )}
        <AnimatePresence>
          {!open && hoverBtn && (
            <motion.div className="aria-tooltip" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }}>
              <span style={{ fontSize: 10, color: '#c9a84c', letterSpacing: 2, textTransform: 'uppercase', fontWeight: 700 }}>ARIA</span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Conseillère IA</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="aria-window"
            dir={isRTL ? 'rtl' : 'ltr'}
            initial={{ opacity: 0, y: 30, scale: 0.92, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.92 }}
            transition={{ duration: 0.4, ease: [0.34, 1.1, 0.64, 1] }}
          >
            <div className="aria-glow aria-glow--tl" />
            <div className="aria-glow aria-glow--br" />

            <div className="aria-header">
              <Particles />
              <div className="aria-header__inner">
                <div className="aria-header__left">
                  <div className="aria-avatar">
                    <motion.div className="aria-avatar__ring" animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: 'linear' }} />
                    <div className="aria-avatar__inner">A</div>
                    <div className="aria-avatar__dot" />
                  </div>
                  <div>
                    <div className="aria-header__name">ARIA</div>
                    <div className="aria-header__role">{t.role}</div>
                    <div className="aria-header__status">
                      <motion.div style={{ width: 6, height: 6, borderRadius: '50%', background: '#22c55e' }} animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      <span>{t.online}</span>
                    </div>
                  </div>
                </div>
                <div className="aria-header__right">
                  <div className="aria-langs">
                    {['fr', 'en', 'ar'].map(l => (
                      <motion.button key={l} className={`aria-lang ${lang === l ? 'aria-lang--active' : ''}`}
                        onClick={() => setLang(l)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                        {l === 'fr' ? '🇫🇷' : l === 'en' ? '🇬🇧' : '🇹🇳'}
                      </motion.button>
                    ))}
                  </div>
                  <motion.button className="aria-header-btn" onClick={clearChat} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} title={t.newChat}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-3.61"/></svg>
                  </motion.button>
                  <motion.button className="aria-header-btn aria-header-btn--close" onClick={() => setOpen(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>✕</motion.button>
                </div>
              </div>
              <div className="aria-header__gold-line" />
            </div>

            <div className="aria-messages">
              {messages.map((msg, i) => {
                const isBot = msg.role === 'assistant';
                return (
                  <motion.div key={msg.id || i}
                    className={`aria-msg ${isBot ? 'aria-msg--bot' : 'aria-msg--user'}`}
                    initial={{ opacity: 0, y: 14, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    {isBot && (<div className="aria-msg__avatar"><span>A</span></div>)}
                    <div className={`aria-bubble ${isBot ? 'aria-bubble--bot' : 'aria-bubble--user'}`}>
                      {isBot && <div className="aria-bubble__shine" />}
                      <p dangerouslySetInnerHTML={{ __html: formatText(msg.content) }} style={{ margin: 0, textAlign: isRTL ? 'right' : 'left' }} />
                      <div className="aria-bubble__time" style={{ textAlign: isRTL ? 'left' : 'right' }}>
                        {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </div>
                    {!isBot && <div className="aria-msg__avatar aria-msg__avatar--user"><span>V</span></div>}
                  </motion.div>
                );
              })}
              {loading && (
                <motion.div className="aria-msg aria-msg--bot" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <div className="aria-msg__avatar"><span>A</span></div>
                  <TypingDots />
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            <AnimatePresence>
              {showSugg && messages.length <= 1 && (
                <motion.div className="aria-suggestions"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10, height: 0 }}>
                  <div className="aria-suggestions__label">
                    <div style={{ width: 20, height: 1, background: 'linear-gradient(90deg, transparent, #c9a84c)' }} />
                    {t.suggestionsLabel}
                    <div style={{ width: 20, height: 1, background: 'linear-gradient(90deg, #c9a84c, transparent)' }} />
                  </div>
                  <div className="aria-sugg-grid">
                    {t.suggestions.map((s, i) => (
                      <motion.button key={i} className="aria-sugg"
                        onClick={() => send(s.text)}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                        whileHover={{ scale: 1.03, borderColor: 'rgba(201,168,76,0.5)' }} whileTap={{ scale: 0.97 }}>
                        <span style={{ fontSize: 16 }}>{s.icon}</span>
                        <span style={{ fontSize: 11, lineHeight: 1.3 }}>{s.text}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="aria-input-area">
              <div className="aria-input-wrap">
                <textarea
                  ref={inputRef}
                  className="aria-input"
                  placeholder={t.placeholder}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKey}
                  rows={1}
                  disabled={loading}
                  dir={isRTL ? 'rtl' : 'ltr'}
                  style={{ textAlign: isRTL ? 'right' : 'left' }}
                />
                <motion.button
                  className="aria-send"
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
                >
                  {loading
                    ? <motion.div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: '#000', borderRadius: '50%' }} animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }} />
                    : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M2 21l21-9L2 3v7l15 2-15 2z" /></svg>
                  }
                </motion.button>
              </div>
              <div className="aria-footer-note">{t.footer}</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
.aria-toggle {
  position: fixed; bottom: 28px; right: 28px;
  width: 64px; height: 64px; border-radius: 50%;
  background: linear-gradient(135deg, #5c3a0a, #c9a84c, #f0d080, #c9a84c);
  border: none; cursor: pointer; z-index: 9999;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 40px rgba(201,168,76,0.5), 0 2px 10px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.2);
  overflow: visible;
}
.aria-toggle__ring {
  position: absolute; inset: -6px; border-radius: 50%;
  border: 1px solid rgba(201,168,76,0.3); border-top-color: rgba(201,168,76,0.8);
}
.aria-toggle__ring--2 { inset: -10px; border-color: rgba(201,168,76,0.15); border-right-color: rgba(201,168,76,0.5); }
.aria-toggle__icon { color: #000; font-size: 18px; font-weight: 800; position: relative; z-index: 2; }
.aria-toggle__logo { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; }
.aria-unread {
  position: absolute; top: -3px; right: -3px;
  background: #ef4444; color: #fff; font-size: 9px; font-weight: 800;
  min-width: 18px; height: 18px; border-radius: 9px;
  display: flex; align-items: center; justify-content: center;
  padding: 0 4px; border: 2px solid #000; font-family: Inter, sans-serif;
}
.aria-tooltip {
  position: absolute; right: calc(100% + 12px); top: 50%; transform: translateY(-50%);
  background: rgba(10,10,10,0.98); border: 1px solid rgba(201,168,76,0.3);
  border-radius: 10px; padding: 8px 14px;
  display: flex; flex-direction: column; gap: 2px;
  white-space: nowrap; pointer-events: none; box-shadow: 0 8px 24px rgba(0,0,0,0.6);
}
.aria-tooltip::after {
  content: ''; position: absolute; right: -6px; top: 50%; transform: translateY(-50%);
  border: 6px solid transparent; border-left-color: rgba(201,168,76,0.3); border-right: none;
}
.aria-window {
  position: fixed; bottom: 104px; right: 28px;
  width: 420px; height: 660px; background: #000;
  border: 1px solid rgba(201,168,76,0.2); border-radius: 24px;
  box-shadow: 0 40px 100px rgba(0,0,0,0.9), 0 0 0 1px rgba(201,168,76,0.08), 0 0 80px rgba(201,168,76,0.06);
  display: flex; flex-direction: column; overflow: hidden;
  z-index: 9998; font-family: Inter, -apple-system, sans-serif; backdrop-filter: blur(20px);
}
@media(max-width:480px){
  .aria-window { width: calc(100vw - 16px); right: 8px; bottom: 96px; height: 82vh; border-radius: 20px; }
  .aria-toggle { bottom: 18px; right: 16px; width: 56px; height: 56px; }
}
.aria-glow { position: absolute; width: 200px; height: 200px; border-radius: 50%; pointer-events: none; z-index: 0; background: radial-gradient(circle, rgba(201,168,76,0.08) 0%, transparent 70%); }
.aria-glow--tl { top: -60px; left: -60px; }
.aria-glow--br { bottom: -60px; right: -60px; }
.aria-header { position: relative; overflow: hidden; flex-shrink: 0; background: linear-gradient(135deg, rgba(15,10,0,0.98) 0%, rgba(5,3,0,0.99) 100%); border-bottom: 1px solid rgba(201,168,76,0.12); }
.aria-header__inner { position: relative; z-index: 2; padding: 16px 18px; display: flex; align-items: flex-start; justify-content: space-between; }
.aria-header__left { display: flex; gap: 13px; align-items: flex-start; }
.aria-header__gold-line { height: 1px; background: linear-gradient(90deg, transparent 0%, rgba(201,168,76,0.6) 30%, rgba(201,168,76,0.8) 50%, rgba(201,168,76,0.6) 70%, transparent 100%); }
.aria-avatar { width: 46px; height: 46px; position: relative; flex-shrink: 0; display: flex; align-items: center; justify-content: center; }
.aria-avatar__ring { position: absolute; inset: 0; border-radius: 50%; border: 1px solid transparent; background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0)) padding-box, linear-gradient(135deg, #c9a84c, transparent, #c9a84c) border-box; }
.aria-avatar__inner { width: 40px; height: 40px; border-radius: 14px; background: linear-gradient(135deg, #5c3a0a, #c9a84c, #f0d080); display: flex; align-items: center; justify-content: center; font-size: 16px; font-weight: 800; color: #000; box-shadow: 0 4px 16px rgba(201,168,76,0.4); }
.aria-avatar__dot { position: absolute; bottom: 1px; right: 1px; width: 11px; height: 11px; border-radius: 50%; background: #22c55e; border: 2px solid #000; box-shadow: 0 0 6px rgba(34,197,94,0.6); }
.aria-header__name { font-size: 16px; font-weight: 700; color: #fff; letter-spacing: 0.5px; }
.aria-header__role { font-size: 10px; color: #c9a84c; letter-spacing: 1px; margin-top: 1px; text-transform: uppercase; }
.aria-header__status { display: flex; align-items: center; gap: 5px; margin-top: 4px; }
.aria-header__status span { font-size: 10px; color: rgba(255,255,255,0.4); }
.aria-header__right { display: flex; align-items: center; gap: 8px; }
.aria-langs { display: flex; gap: 4px; background: rgba(255,255,255,0.05); border-radius: 8px; padding: 3px; border: 1px solid rgba(255,255,255,0.07); }
.aria-lang { width: 28px; height: 26px; border-radius: 6px; background: none; border: none; cursor: pointer; font-size: 14px; display: flex; align-items: center; justify-content: center; transition: background 0.2s; opacity: 0.5; }
.aria-lang--active { background: rgba(201,168,76,0.2); opacity: 1; }
.aria-lang:hover { opacity: 0.8; }
.aria-header-btn { width: 30px; height: 30px; border-radius: 8px; background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08); color: rgba(255,255,255,0.4); cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.2s; font-size: 14px; }
.aria-header-btn:hover { background: rgba(255,255,255,0.12); color: #fff; }
.aria-header-btn--close:hover { background: rgba(239,68,68,0.15); color: #ef4444; border-color: rgba(239,68,68,0.2); }
.aria-messages { flex: 1; overflow-y: auto; padding: 18px 14px; display: flex; flex-direction: column; gap: 14px; background: linear-gradient(180deg, rgba(5,3,0,0.9) 0%, #000 100%); }
.aria-messages::-webkit-scrollbar { width: 3px; }
.aria-messages::-webkit-scrollbar-thumb { background: rgba(201,168,76,0.25); border-radius: 2px; }
.aria-msg { display: flex; align-items: flex-end; gap: 9px; }
.aria-msg--user { flex-direction: row-reverse; }
.aria-msg__avatar { width: 30px; height: 30px; border-radius: 10px; flex-shrink: 0; background: linear-gradient(135deg, #5c3a0a, #c9a84c); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #000; }
.aria-msg__avatar--user { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.1); color: rgba(255,255,255,0.4); }
.aria-bubble { max-width: 80%; padding: 12px 15px; border-radius: 18px; position: relative; line-height: 1.65; }
.aria-bubble p { font-size: 13.5px; color: inherit; word-break: break-word; }
.aria-bubble p strong { font-weight: 700; }
.aria-bubble--bot { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.07); border-bottom-left-radius: 4px; color: rgba(255,255,255,0.85); position: relative; overflow: hidden; }
.aria-bubble--bot .aria-bubble__shine { position: absolute; top: 0; left: 0; right: 0; height: 1px; background: linear-gradient(90deg, transparent, rgba(201,168,76,0.5), rgba(201,168,76,0.3), transparent); }
.aria-bubble--user { background: linear-gradient(135deg, rgba(201,168,76,0.18), rgba(201,168,76,0.08)); border: 1px solid rgba(201,168,76,0.22); border-bottom-right-radius: 4px; color: rgba(255,255,255,0.92); }
.aria-bubble__time { font-size: 9.5px; color: rgba(255,255,255,0.2); margin-top: 6px; }
.aria-suggestions { padding: 0 12px 10px; border-top: 1px solid rgba(255,255,255,0.05); background: rgba(5,3,0,0.95); flex-shrink: 0; }
.aria-suggestions__label { display: flex; align-items: center; gap: 8px; font-size: 9px; letter-spacing: 3px; text-transform: uppercase; color: rgba(201,168,76,0.6); font-weight: 700; padding: 10px 2px 8px; justify-content: center; }
.aria-sugg-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; }
.aria-sugg { display: flex; align-items: center; gap: 7px; padding: 9px 10px; border-radius: 10px; background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); color: rgba(255,255,255,0.55); font-family: inherit; cursor: pointer; transition: all 0.2s; text-align: left; }
.aria-sugg:hover { background: rgba(201,168,76,0.07); color: rgba(255,255,255,0.85); }
.aria-input-area { padding: 10px 12px 8px; border-top: 1px solid rgba(255,255,255,0.06); background: rgba(3,2,0,0.98); flex-shrink: 0; }
.aria-input-wrap { display: flex; align-items: flex-end; gap: 8px; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); border-radius: 14px; padding: 8px 8px 8px 14px; transition: border-color 0.25s, box-shadow 0.25s; }
.aria-input-wrap:focus-within { border-color: rgba(201,168,76,0.4); box-shadow: 0 0 0 3px rgba(201,168,76,0.06); }
.aria-input { flex: 1; background: none; border: none; outline: none; color: rgba(255,255,255,0.9); font-family: inherit; font-size: 13px; resize: none; max-height: 100px; line-height: 1.5; padding: 2px 0; }
.aria-input::placeholder { color: rgba(255,255,255,0.2); }
.aria-send { width: 36px; height: 36px; border-radius: 10px; flex-shrink: 0; background: linear-gradient(135deg, #5c3a0a, #c9a84c); border: none; color: #000; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 2px 12px rgba(201,168,76,0.3); transition: opacity 0.2s; }
.aria-send:disabled { opacity: 0.3; cursor: not-allowed; }
.aria-footer-note { font-size: 9px; color: rgba(255,255,255,0.15); text-align: center; margin-top: 6px; letter-spacing: 0.3px; }
`;