import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Components
import Navbar             from './components/Navbar';
import Footer             from './components/Footer';
import LoadingScreen      from './components/LoadingScreen';

// Pages & Sections
import Home         from './pages/Home';
import About        from './pages/About';
import Gallery      from './pages/Gallery';
import Services     from './pages/Services';
import Quote        from './pages/Quote';
import Testimonials from './pages/Testimonials';

/**
 * Page transition variants — pure crossfade, no black flash
 */
const pageVariants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: { duration: 0.45, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [hideNavbar, setHideNavbar] = useState(false);

  useEffect(() => {
    document.body.classList.remove('light-mode');
  }, []);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash || '#home';
      if (hash === '#gallery') {
        setCurrentPage('clicks');
        window.scrollTo({ top: 0 });
      } else if (hash === '#services') {
        setCurrentPage('services');
        window.scrollTo({ top: 0 });
      } else if (hash === '#about') {
        setCurrentPage('about');
        window.scrollTo({ top: 0 });
      } else if (hash === '#testimonials') {
        setCurrentPage('testimonials');
        window.scrollTo({ top: 0 });
      } else if (hash === '#quote') {
        setCurrentPage('quote');
        window.scrollTo({ top: 0 });
      } else {
        setCurrentPage('home');
        if (hash && hash !== '#home') {
          setTimeout(() => {
            const target = document.querySelector(hash);
            if (target) {
              if (window.lenis) window.lenis.scrollTo(target, { duration: 1.2 });
              else target.scrollIntoView({ behavior: 'smooth' });
            }
          }, 500);
        } else {
          if (window.lenis) window.lenis.scrollTo(0, { duration: 1.2 });
          else window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    };
    window.navigateToSection = (hash) => {
      if (window.location.hash === hash) {
        handleHashChange();
      } else {
        window.location.hash = hash;
      }
    };

    window.setHideNavbar = setHideNavbar;

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      delete window.navigateToSection;
      delete window.setHideNavbar;
    };
  }, []);

  useEffect(() => {
    setHideNavbar(false);
  }, [currentPage]);

  useEffect(() => {
    if (!loaded) return;
    let lenis;
    import('lenis').then(({ default: Lenis }) => {
      lenis = new Lenis({
        duration: 1.4,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smooth: true,
      });
      const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
      window.lenis = lenis;
    }).catch(() => {});
    return () => { lenis?.destroy?.(); window.lenis = null; };
  }, [loaded]);

  useEffect(() => {
    if (!loaded) return;
    const timer = setTimeout(() => window.lenis?.resize(), 150);
    return () => clearTimeout(timer);
  }, [currentPage, loaded]);

  const handleLoadComplete = useCallback(() => setLoaded(true), []);

  const pages = {
    home:         <Home />,
    about:        <About />,
    clicks:       <Gallery />,
    services:     <Services />,
    testimonials: <Testimonials />,
    quote:        <Quote />,
  };

  return (
    <>
      {/* ══ SERVICES FIXED BACKGROUND ══
          Must be the FIRST element in root fragment — before LoadingScreen,
          before AnimatePresence, before every motion.div.
          position:fixed here is in the TRUE root stacking context
          (no ancestor with transform/opacity/will-change to trap it).   */}
      {loaded && currentPage === 'services' && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <img
            src="https://res.cloudinary.com/dsl7vekda/image/upload/v1779454187/IMG_7504.JPG_ifsymp.jpg"
            alt=""
            aria-hidden="true"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
              filter: 'blur(4px) brightness(0.85) saturate(0.8)',
              transform: 'scale(1.06) translateZ(0)',
              willChange: 'transform',
              display: 'block',
            }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.08)' }} />
        </div>
      )}

      {/* ── Loading Screen ── */}
      {!loaded && <LoadingScreen onComplete={handleLoadComplete} />}

      {/* ── Main Site ── */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative', zIndex: 2 }}
          >
            {/* Floating Navbar */}
            {!hideNavbar && <Navbar currentPage={currentPage} />}


            {/* ── Animated Page Content ── */}
            <main style={{ position: 'relative' }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentPage}
                  variants={pageVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  style={{ width: '100%', willChange: 'auto' }}
                >
                  {pages[currentPage]}
                </motion.div>
              </AnimatePresence>
            </main>

            {/* Footer */}
            {currentPage !== 'quote' && <Footer />}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
