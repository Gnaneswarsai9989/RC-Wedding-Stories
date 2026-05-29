import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import { FiArrowUpRight } from 'react-icons/fi';
import Logo from './Logo';

/**
 * Navbar — premium milky glass pill with animated borders & micro-interactions
 */

const NAV_LINKS = [
  { label: 'Home',         href: '#home'         },
  { label: 'Our Clicks',   href: '#gallery'      },
  { label: 'Services',     href: '#services'     },
  { label: 'Testimonials', href: '#testimonials' },
  { label: 'About Us',     href: '#about'        },
];

export default function Navbar({ currentPage }) {
  const [scrolled,   setScrolled]   = useState(false);
  const [active,     setActive]     = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  // Sync active nav with currentPage
  useEffect(() => {
    if (currentPage === 'clicks') {
      setActive('gallery');
    } else if (currentPage === 'services') {
      setActive('services');
    } else if (currentPage === 'about') {
      setActive('about');
    } else if (currentPage === 'testimonials') {
      setActive('testimonials');
    } else if (currentPage === 'quote') {
      setActive('quote');
    } else {
      const hash = window.location.hash.slice(1);
      if (['home', 'quote'].includes(hash)) {
        setActive(hash);
      } else {
        setActive('home');
      }
    }
  }, [currentPage]);

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Intersection observer for section highlighting
  useEffect(() => {
    const sectionIds = NAV_LINKS.map(l => l.href.slice(1));
    const observers  = [];
    sectionIds.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.3 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, [currentPage]);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.slice(1);
    setActive(targetId);
    window.location.hash = href;
    setMobileOpen(false);
  };

  return (
    <>
      {/* ── Desktop Navbar ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 flex justify-center"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{ paddingTop: scrolled ? '10px' : '20px', transition: 'padding 0.5s ease' }}
      >
        <motion.nav
          className="hidden md:flex items-center gap-1 pr-3 py-2 relative rounded-full"
          style={{
            background: 'rgba(15, 15, 15, 0.55)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            boxShadow: scrolled
              ? '0 8px 40px rgba(0,0,0,0.65), inset 0 1px 0 rgba(255,255,255,0.05)'
              : '0 4px 24px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.08)',
            transition: 'all 0.5s ease',
            paddingLeft: scrolled ? '75px' : '90px',
          }}
          animate={{ scale: scrolled ? 0.97 : 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          {/* Top inset shine line */}
          <div
            className="absolute top-0 left-6 right-6 pointer-events-none"
            style={{
              height: 1,
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18), transparent)',
              borderRadius: 999,
            }}
          />

          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="flex items-center cursor-pointer group"
            style={{
              marginLeft: '5px',
              marginRight: scrolled ? '65px' : '80px',
              transition: 'all 0.5s ease',
            }}
          >
            <Logo height={42} scale={2.4} style={{ transform: 'scale(2.4) translateY(1.5px)' }} />
          </a>

          {/* Separator */}
          <div
            className="w-px h-6 mr-10"
            style={{ background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.22), transparent)' }}
          />

          {/* Nav Links */}
          <div className="relative flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const isActive = active === link.href.slice(1);
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className="relative px-4 py-2 rounded-full text-xs tracking-widest uppercase cursor-pointer whitespace-nowrap group"
                  style={{
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 400,
                    color: isActive ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                    textDecoration: 'none',
                    letterSpacing: '0.1em',
                    fontSize: 11,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {/* Animated glass capsule background */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 rounded-full"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      style={{
                        zIndex: 0,
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.08)',
                      }}
                    />
                  )}

                  {/* Hover shimmer */}
                  <motion.div
                    className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 pointer-events-none"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(200,210,240,0.04) 100%)',
                      transition: 'opacity 0.3s ease',
                      zIndex: 0,
                    }}
                  />

                  <span className="relative z-10">{link.label}</span>
                </a>
              );
            })}
          </div>

          {/* CTA Button */}
          <div
            className="ml-3 pl-3"
            style={{ borderLeft: '1px solid rgba(255,255,255,0.08)' }}
          >
            <a
              href="#quote"
              onClick={(e) => handleNavClick(e, '#quote')}
              className="btn-luxury cursor-pointer text-xs py-2 px-5"
              style={{ borderRadius: 9999, fontSize: 10.5, display: 'inline-flex', alignItems: 'center', gap: 5 }}
            >
              Build a Quote
              <FiArrowUpRight size={12} strokeWidth={2.5} />
            </a>
          </div>
        </motion.nav>
      </motion.header>

      {/* ── Mobile Navbar ── */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center md:hidden px-5"
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingTop: 16, paddingBottom: 16,
          background: 'transparent',
          backdropFilter: mobileOpen ? 'none' : 'blur(6px)',
          WebkitBackdropFilter: mobileOpen ? 'none' : 'blur(6px)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          maskImage: 'linear-gradient(to bottom, black 0%, black 55%, transparent 100%)',
          transition: 'backdrop-filter 0.4s ease',
        }}
      >
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="cursor-pointer flex items-center"
          style={{ marginLeft: '25px' }}
        >
          <Logo height={36} scale={2.2} style={{ transform: 'scale(2.2) translateY(1px)' }} />
        </a>

        <motion.button
          onClick={() => setMobileOpen(o => !o)}
          className="rounded-full p-3 text-white cursor-pointer"
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.08), rgba(200,210,240,0.05))',
            backdropFilter: 'blur(16px)',
            border: '1px solid rgba(255,255,255,0.12)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.10)',
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen
              ? <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}><RiCloseLine size={20} /></motion.div>
              : <motion.div key="menu"  initial={{ rotate: 90, opacity: 0 }}  animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}><RiMenu3Line size={20} /></motion.div>
            }
          </AnimatePresence>
        </motion.button>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop Dimmer */}
            <motion.div
              className="fixed inset-0 z-30 md:hidden bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              onClick={() => setMobileOpen(false)}
            />

            {/* Slide-down Menu Container */}
            <motion.div
              className="fixed top-0 left-0 right-0 z-40 md:hidden flex flex-col items-center justify-center rounded-b-[2rem]"
              style={{
                height: '42vh',
                minHeight: '380px',
                background: 'rgba(10, 10, 10, 0.95)',
                backdropFilter: 'blur(32px)',
                WebkitBackdropFilter: 'blur(32px)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 20px 40px rgba(0,0,0,0.7)',
              }}
              initial={{ y: '-100%' }}
              animate={{ y: 0 }}
              exit={{ y: '-100%' }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Silver orb behind menu */}
              <div
                className="absolute rounded-full pointer-events-none"
                style={{
                  width: 300, height: 300,
                  top: '55%', left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 70%)',
                  filter: 'blur(40px)',
                }}
              />

              <div className="relative z-10 flex flex-col items-center justify-center gap-3.5 pt-16 pb-4 w-full h-full">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ delay: i * 0.04 + 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="cursor-pointer relative group"
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 22,
                      fontWeight: 400,
                      color: active === link.href.slice(1) ? 'rgba(255,255,255,0.95)' : 'rgba(255,255,255,0.45)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'color 0.3s ease, text-shadow 0.3s ease',
                    }}
                    whileHover={{ color: 'rgba(255,255,255,0.9)', textShadow: '0 0 20px rgba(255,255,255,0.2)' }}
                  >
                    {link.label}
                    {/* Underline on active */}
                    {active === link.href.slice(1) && (
                      <motion.div
                        layoutId="mobileActiveUnderline"
                        className="absolute -bottom-0.5 left-0 right-0"
                        style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)' }}
                      />
                    )}
                  </motion.a>
                ))}

                <motion.a
                  href="#quote"
                  onClick={(e) => handleNavClick(e, '#quote')}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ delay: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="btn-luxury mt-2 cursor-pointer text-xs py-2 px-5"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 7, borderRadius: 9999 }}
                >
                  Build a Quote
                  <FiArrowUpRight size={13} strokeWidth={2.5} />
                </motion.a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
