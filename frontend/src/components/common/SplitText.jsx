import React, { useEffect, useRef } from 'react';

export default function SplitText({ text, className = '', delay = 0, tag: Tag = 'span' }) {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const chars = ref.current.querySelectorAll('.char');
        chars.forEach((c, i) => {
          setTimeout(() => { c.style.opacity = '1'; c.style.transform = 'translateY(0)'; }, delay + i * 40);
        });
        observer.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {text.split('').map((char, i) => (
        <span
          key={i}
          className="char"
          style={{
            display: 'inline-block',
            opacity: 0,
            transform: 'translateY(60px)',
            transition: `opacity 0.6s cubic-bezier(0.77,0,0.175,1), transform 0.6s cubic-bezier(0.77,0,0.175,1)`,
            whiteSpace: char === ' ' ? 'pre' : 'normal',
          }}
        >
          {char}
        </span>
      ))}
    </Tag>
  );
}
