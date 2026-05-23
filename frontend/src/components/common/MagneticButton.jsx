import React, { useRef } from 'react';

export default function MagneticButton({ children, className = '', onClick, strength = 0.3 }) {
  const ref = useRef(null);

  const handleMouseMove = (e) => {
    const el = ref.current;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * strength;
    const dy = (e.clientY - cy) * strength;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleMouseLeave = () => {
    ref.current.style.transform = 'translate(0,0)';
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.25,0.46,0.45,0.94)';
  };

  const handleMouseEnter = () => {
    ref.current.style.transition = 'transform 0.1s linear';
  };

  return (
    <div
      ref={ref}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      style={{ display: 'inline-block' }}
    >
      {children}
    </div>
  );
}
