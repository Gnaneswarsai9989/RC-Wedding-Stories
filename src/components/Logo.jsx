import React from 'react';
import logoImg from '../assets/logo.png';

/**
 * Logo — Premium component rendering the official RC Wedding Stories golden logo
 */
export default function Logo({ className = '', style = {}, height = 40, scale = 3.2 }) {
  return (
    <img
      src={logoImg}
      alt="RC Wedding Stories Logo"
      className={`object-contain transition-transform duration-300 ${className}`}
      style={{
        height: height,
        width: 'auto',
        transform: `scale(${scale})`,
        transformOrigin: 'center',
        ...style
      }}
    />
  );
}
