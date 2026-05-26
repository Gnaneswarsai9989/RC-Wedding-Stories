import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { RiArrowDownLine } from 'react-icons/ri';
import { heroImages } from '../data/mediaData';

/**
 * HeroSection — cinematic hero with milky glass overlay,
 * silver border accents, and premium text animations.
 */
export default function HeroSection() {
  const [current, setCurrent] = useState(0);
  const [prev,    setPrev]    = useState(null);
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const imageY    = useTransform(scrollYProgress, [0, 1], ['0%',   '25%']);
  const textY     = useTransform(scrollYProgress, [0, 1], ['0%',   '12%']);
  const overlayOp = useTransform(scrollYProgress, [0, 0.6], [0.55, 0.88]);
  const glassOp   = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-slide every 5 s
  useEffect(() => {
    const id = setInterval(() => {
      setPrev(current);
      setCurrent(c => (c + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, [current]);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden"
      style={{ minHeight: '100svh' }}
    >
      {/* ── Background Background Images ── */}
      <div className="absolute inset-0 z-0">
        {/* Outgoing image — pure opacity fade out */}
        <AnimatePresence>
          {prev !== null && (
            <motion.div
              key={`prev-${prev}`}
              className="absolute inset-0"
              initial={{ opacity: 1 }}
              animate={{ opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2.2, ease: 'easeInOut' }}
            >
              <motion.img
                src={heroImages[prev].url}
                alt={heroImages[prev].alt}
                className="w-full h-full object-cover"
                style={{
                  y: imageY,
                  scale: 1.12,
                  willChange: 'transform',
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Incoming image — pure opacity fade in, no scale animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`curr-${current}`}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
          >
            <motion.img
              src={heroImages[current].url}
              alt={heroImages[current].alt}
              className="w-full h-full object-cover"
              style={{
                y: imageY,
                scale: 1.12,
                willChange: 'transform',
              }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Dark gradient overlay ── */}
      <motion.div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ opacity: overlayOp, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.5) 100%)' }}
      />

      {/* ── Tagline — bottom left on desktop, centered bottom on mobile ── */}
      <div className="absolute z-20 pointer-events-none w-full md:w-auto left-0 md:left-16 bottom-[12%] md:bottom-14 px-8 md:px-0 flex flex-col items-center md:items-start">
        <motion.p
          className="text-center md:text-left"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: 700,
            color: 'rgba(255,255,255,0.97)',
            letterSpacing: '0.02em',
            lineHeight: 1.4,
            textShadow: '0 4px 32px rgba(0,0,0,0.8), 0 2px 8px rgba(0,0,0,0.6)',
            maxWidth: 600,
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          Your love story,<br />
          <em style={{ color: 'rgba(255,255,255,0.85)', fontWeight: 700 }}>captured with elegance and emotion.</em>
        </motion.p>
        
        {/* Short decorative line below */}
        <motion.div
          className="mx-auto md:mx-0"
          style={{
            marginTop: 18,
            width: 120,
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
          }}
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.9 }}
        />
      </div>

      {/* ── Silver Decorative Side Lines ── */}
      <div className="side-line-left z-20" />
      <div className="side-line-right z-20" />

    </section>
  );
}
