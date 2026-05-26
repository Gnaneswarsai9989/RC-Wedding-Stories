import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { testimonials } from '../data/mediaData';
import { RiDoubleQuotesL } from 'react-icons/ri';

const leftParticles = [
  { id: 1, size: 2, left: '10%', duration: 14, delay: 0 },
  { id: 2, size: 3, left: '35%', duration: 18, delay: 2.5 },
  { id: 3, size: 1.5, left: '60%', duration: 12, delay: 4.2 },
  { id: 4, size: 2.5, left: '25%', duration: 16, delay: 1.1 },
  { id: 5, size: 2, left: '50%', duration: 20, delay: 3.4 },
  { id: 6, size: 3, left: '18%', duration: 13, delay: 5.0 },
  { id: 7, size: 1, left: '70%', duration: 15, delay: 0.8 },
  { id: 8, size: 2.5, left: '42%', duration: 17, delay: 6.2 },
  { id: 9, size: 1.5, left: '8%', duration: 11, delay: 2.1 },
  { id: 10, size: 3.5, left: '55%', duration: 22, delay: 7.5 },
  { id: 11, size: 2, left: '30%', duration: 15, delay: 4.8 },
  { id: 12, size: 1.5, left: '65%', duration: 13, delay: 1.9 },
];

const rightParticles = [
  { id: 1, size: 2.5, right: '12%', duration: 16, delay: 1.2 },
  { id: 2, size: 1.5, right: '38%', duration: 13, delay: 3.1 },
  { id: 3, size: 3.5, right: '58%', duration: 20, delay: 0.5 },
  { id: 4, size: 2, right: '28%', duration: 15, delay: 5.3 },
  { id: 5, size: 3, right: '48%', duration: 17, delay: 2.1 },
  { id: 6, size: 1.5, right: '18%', duration: 11, delay: 4.0 },
  { id: 7, size: 2, right: '70%', duration: 18, delay: 1.8 },
  { id: 8, size: 1, right: '82%', duration: 14, delay: 6.5 },
  { id: 9, size: 3, right: '22%', duration: 19, delay: 7.2 },
  { id: 10, size: 2, right: '52%', duration: 15, delay: 3.9 },
  { id: 11, size: 1.5, right: '7%', duration: 12, delay: 0.2 },
  { id: 12, size: 2.5, right: '62%', duration: 16, delay: 4.7 },
];


/**
 * Testimonials Page — full-page love letters from RC Wedding Stories couples
 */
export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <main
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* Self-contained CSS for high-performance margin particles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        @keyframes floatUpLeftTestimonials {
          0% {
            top: 100%;
            opacity: 0;
            transform: scale(0.5);
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            top: -5%;
            opacity: 0;
            transform: scale(1.2);
          }
        }
        @keyframes floatUpRightTestimonials {
          0% {
            top: 100%;
            opacity: 0;
            transform: scale(0.5);
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            top: -5%;
            opacity: 0;
            transform: scale(1.2);
          }
        }
      ` }} />

      {/* Left side floating particles (confined to left 15% width, behind content) */}
      <div className="absolute left-0 top-0 bottom-0 w-[15vw] pointer-events-none overflow-hidden z-0">
        {leftParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.5)',
              animation: `floatUpLeftTestimonials ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Right side floating particles (confined to right 15% width, behind content) */}
      <div className="absolute right-0 top-0 bottom-0 w-[15vw] pointer-events-none overflow-hidden z-0">
        {rightParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              right: p.right,
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.5)',
              animation: `floatUpRightTestimonials ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>
      {/* ── Page Hero Header ── */}
      <section className="relative pt-24 md:pt-40 pb-16 md:pb-24 text-center overflow-hidden">
        {/* Background orbs */}
        <div
          className="silver-orb pointer-events-none"
          style={{ width: 600, height: 600, top: -200, left: '50%', transform: 'translateX(-50%)' }}
        />

        {/* Side lines */}
        <div className="side-line-left z-10" />
        <div className="side-line-right z-10" />

        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <motion.p
            className="text-xs tracking-[0.45em] uppercase mb-6"
            style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(255,255,255,0.35)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            Love Letters
          </motion.p>

          <motion.h1
            className="text-white mb-6"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(42px, 6vw, 82px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            What Our Couples{' '}
            <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>
              Say
            </em>
          </motion.h1>

          <motion.div
            className="section-divider-wide mb-8"
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ duration: 1, delay: 0.35 }}
          />

          <motion.p
            className="text-white/40 leading-relaxed mt-6 md:mt-8"
            style={{ fontFamily: 'Inter', fontWeight: 300, fontSize: 15 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            Real stories from the couples who trusted us with their most
            precious memories — from Nellore and beyond.
          </motion.p>
        </div>
      </section>

      {/* ── Testimonial Cards Grid ── */}
      <section className="relative pb-28 px-6 md:px-12">
        {/* Background orbs */}
        <div
          className="silver-orb pointer-events-none"
          style={{ width: 500, height: 500, top: 0, right: -100 }}
        />
        <div
          className="silver-orb pointer-events-none"
          style={{ width: 300, height: 300, bottom: 0, left: -50, animationDelay: '3s' }}
        />

        <div className="max-w-7xl mx-auto" ref={ref}>

          {/* ── Instagram teaser ── */}
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ fontFamily: 'Inter', color: 'rgba(255,255,255,0.25)' }}>
              Follow our journey
            </p>
            <motion.a
              href="https://www.instagram.com/rc_wedding_stories_nellore?igsh=MXRlYzYxYW9rcG5nNw=="
              target="_blank" rel="noopener noreferrer"
              className="inline-block cursor-pointer"
              style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 28, fontWeight: 300, fontStyle: 'italic', color: 'rgba(255,255,255,0.45)', textDecoration: 'none' }}
              whileHover={{ color: 'rgba(255,255,255,0.9)' }}
            >
              @rc_wedding_stories_nellore ↗
            </motion.a>
          </motion.div>

          {/* ── Testimonial Cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                className="group flex flex-col gap-5 p-8 relative"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 16,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
                }}
                initial={{ opacity: 0, y: 60 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: Math.min(0.6 + i * 0.09, 0.95), ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, background: 'rgba(255,255,255,0.07)' }}
              >
                <RiDoubleQuotesL size={22} style={{ color: 'rgba(255,255,255,0.15)' }} />
                <p className="flex-1 italic leading-8" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 17, color: 'rgba(255,255,255,0.6)' }}>
                  {t.text}
                </p>
                <div className="flex items-center gap-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}>
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" style={{ filter: 'grayscale(25%)' }} />
                  </div>
                  <div>
                    <p className="text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{t.name}</p>
                    <p className="text-xs tracking-wider" style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(255,255,255,0.3)' }}>{t.date}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 3 FULL-SCREEN CINEMATIC IMAGES ── */}
      {[
        {
          url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto/v1779454209/IMG_7514.JPG_tfsbw3.jpg',
          label: 'A Love Eternal',
        },
        {
          url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto/v1779454194/IMG_7508.JPG_rszuxv.jpg',
          label: 'The Golden Hour',
        },
        {
          url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto/v1779456284/IMG_7491.JPG_m79gzc.jpg',
          label: 'Timeless Moments',
        },
      ].map((img, i) => (
        <section
          key={i}
          className="relative overflow-hidden"
          style={{ width: '100%', height: '100vh' }}
        >
          {/* Full-screen image */}
          <motion.img
            src={img.url}
            alt={img.label}
            loading="lazy"
            decoding="async"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
              willChange: 'transform',
            }}
            initial={{ scale: 1.08 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Dark gradient overlay — top & bottom */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.55) 100%)',
            pointerEvents: 'none',
          }} />

          {/* Center label */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            pointerEvents: 'none',
          }}>
            <motion.div
              className="flex flex-col items-center gap-3"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <div style={{ width: 50, height: 1, background: 'rgba(255,255,255,0.4)' }} />
              <span style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(20px, 3vw, 42px)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.88)',
                letterSpacing: '0.06em',
                textShadow: '0 4px 32px rgba(0,0,0,0.6)',
              }}>
                {img.label}
              </span>
              <div style={{ width: 50, height: 1, background: 'rgba(255,255,255,0.4)' }} />
            </motion.div>
          </div>
        </section>
      ))}

    </main>
  );
}
