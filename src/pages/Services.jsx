import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { services } from '../data/mediaData';
import { RiCalendarScheduleLine, RiArrowRightUpLine, RiCheckboxCircleLine } from 'react-icons/ri';

/**
 * Services Page
 *  - Fixed blurred background image that stays while content scrolls over it
 *  - Decorative design line below the "Our Services" heading
 *  - Each service in a glass card with 3-photo strip + details + CTA
 */
export default function Services() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: '-60px' });

  return (
    <section
      id="services"
      className="relative min-h-screen"
      style={{ background: 'transparent' }}
    >
      {/* ══ SCROLLABLE CONTENT ══ */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ── PAGE HEADER ── */}
        <div
          ref={headerRef}
          className="relative pt-24 pb-10 px-6 sm:px-10 md:px-16 max-w-7xl mx-auto"
        >
          {/* Top row: empty spacer | pill card | schedule button */}
          <div className="flex flex-col md:grid md:grid-cols-[1fr_auto_1fr] items-center gap-6 md:gap-4 mb-0">

            {/* Left spacer */}
            <div className="hidden md:block" />

            {/* Center: dark pill containing heading + line + subtitle */}
            <motion.div
              className="flex flex-col items-center rounded-3xl md:rounded-full px-6 py-5 md:px-14 md:py-3 w-full md:w-auto"
              style={{
                background: 'rgba(0,0,0,0.45)',
                border: '1px solid rgba(255,255,255,0.1)',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Heading */}
              <h1
                className="text-white text-center whitespace-nowrap"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(38px, 5.5vw, 72px)',
                  fontWeight: 600,
                  lineHeight: 1.08,
                  letterSpacing: '0.06em',
                }}
              >
                Our{' '}
                <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.85)' }}>
                  Services
                </em>
              </h1>

              {/* Decorative line */}
              <div className="flex items-center justify-center gap-3 mt-2 mb-2" style={{ width: '100%' }}>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.35))' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
                <div style={{ width: 60, height: 1, background: 'rgba(255,255,255,0.6)', boxShadow: '0 0 8px rgba(255,255,255,0.3)' }} />
                <span style={{ fontSize: 9, color: 'rgba(255,255,255,0.5)', fontFamily: "'Cormorant Garamond', serif" }}>✦</span>
                <div style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.35), transparent)' }} />
              </div>

              {/* Subtitle */}
              <p
                className="text-center whitespace-normal md:whitespace-nowrap px-2 md:px-0"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontStyle: 'italic',
                  fontSize: 'clamp(13px, 1.4vw, 16px)',
                  fontWeight: 300,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.08em',
                }}
              >
                Bespoke photography experiences crafted for life's most cherished moments.
              </p>
            </motion.div>

            {/* Right: 6 hours Schedule */}
            <div className="flex justify-center md:justify-end w-full md:w-auto">
              <motion.span
                className="inline-flex items-center gap-2"
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: 'clamp(12px, 1.2vw, 15px)',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.08em',
                  whiteSpace: 'nowrap',
                  border: '1px solid rgba(255,255,255,0.15)',
                  borderRadius: 999,
                  padding: '10px 20px',
                  background: 'rgba(0,0,0,0.65)',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
                  backdropFilter: 'blur(8px)',
                  WebkitBackdropFilter: 'blur(8px)',
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={headerInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <RiCalendarScheduleLine size={14} className="text-white" />
                6 hours Schedule
              </motion.span>
            </div>
          </div>
        </div>{/* end header */}

        {/* ── SERVICE SECTIONS ── */}
        <div className="pb-28">
          {services.map((service, i) => (
            <ServiceSection key={service.id} service={service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Individual Service Card ── */
function ServiceSection({ service, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <motion.div
      ref={ref}
      className="mx-auto px-6 sm:px-10 md:px-16 max-w-7xl py-10"
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Glass card */}
      <div
        className="relative w-full overflow-hidden"
        style={{
          border: '1px solid rgba(255,255,255,0.1)',
          borderRadius: 20,
          background: 'rgba(0,0,0,0.60)',
          padding: 'clamp(24px, 4vw, 48px)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* ── Service Title Row ── */}
        <div className="flex items-center justify-center gap-2 md:gap-4 mb-8 w-full">
          <div className="hidden sm:block" style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.18))' }} />
          <div className="flex items-center justify-center gap-2 flex-wrap text-center">
            <motion.h2
              className="text-center whitespace-normal md:whitespace-nowrap"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 'clamp(24px, 5.5vw, 42px)',
                fontWeight: 700,
                color: '#ffffff',
                letterSpacing: '0.07em',
                textTransform: 'uppercase',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              {service.title}
            </motion.h2>
            <span
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(16px, 2.2vw, 26px)',
                color: 'rgba(255,255,255,0.25)',
                lineHeight: 1,
              }}
            >
              &amp;
            </span>
          </div>
          <div className="hidden sm:block" style={{ flex: 1, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.18), transparent)' }} />
        </div>

        {/* ── 3-Photo Strip ── */}
        <div className="flex md:grid md:grid-cols-3 items-center gap-3.5 sm:gap-4 md:gap-5 overflow-x-auto md:overflow-x-visible snap-x snap-mandatory scrollbar-none mb-8 w-full px-6 md:px-0 -mx-6 md:-mx-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {service.gallery.map((imgUrl, j) => (
            <motion.div
              key={j}
              className="relative overflow-hidden w-[68%] xs:w-[60%] sm:w-[45%] md:w-auto flex-shrink-0 snap-center"
              initial={{ opacity: 0, scale: 0.97 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.1 + j * 0.08 }}
              whileHover={{ scale: 1.025 }}
              style={{
                borderRadius: 'clamp(10px, 2vw, 18px)',
                aspectRatio: j === 1 ? '4/5' : '3/4',
                background: '#0a0a0a',
                willChange: 'transform',
              }}
            >
              <img
                src={imgUrl}
                alt={`${service.title} ${j + 1}`}
                loading="lazy"
                decoding="async"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  transition: 'transform 0.65s ease',
                }}
                onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.07)'}
                onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
              />
              {/* Inset shine */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.07)' }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Details: description + features + CTA ── */}
        <motion.div
          className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          {/* Left: price + description + features */}
          <div className="flex-1 max-w-xl">

            <p
              className="mb-5 leading-relaxed"
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontStyle: 'italic',
                fontSize: 'clamp(14px, 1.6vw, 18px)',
                fontWeight: 300,
                color: 'rgba(255,255,255,0.6)',
                letterSpacing: '0.02em',
              }}
            >
              {service.description}
            </p>

            <div className="flex flex-wrap gap-2">
              {service.features.map(feat => (
                <div
                  key={feat}
                  className="flex items-center gap-1.5 px-3 py-1.5"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(11px, 1.1vw, 13px)',
                    fontWeight: 300,
                    color: 'rgba(255,255,255,0.55)',
                    letterSpacing: '0.05em',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: 999,
                    background: 'rgba(255,255,255,0.03)',
                  }}
                >
                  <RiCheckboxCircleLine size={11} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                  {feat}
                </div>
              ))}
            </div>
          </div>

          {/* CTA — white pill button */}
          <div className="flex justify-center mt-6">
            <motion.a
              href={service.ctaHash}
              onClick={(e) => {
                e.preventDefault();
                if (service.ctaLabel === 'Build a Quote') {
                  if (window.navigateToSection) {
                    window.navigateToSection(service.ctaHash);
                  } else {
                    window.location.hash = service.ctaHash;
                  }
                } else {
                  const messageText = `Hi RC Wedding Stories! I would like to book a story with you. I am interested in your *${service.title}* package. Could you please share more details?`;
                  const encodedText = encodeURIComponent(messageText);
                  const whatsappUrl = `https://wa.me/917730861421?text=${encodedText}`;
                  window.open(whatsappUrl, '_blank');
                }
              }}
              className="cursor-pointer inline-flex items-center justify-center gap-3 group px-8 py-4 md:px-14 md:py-5"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: 'clamp(11px, 1.1vw, 13px)',
                fontWeight: 400,
                color: '#1a1a1a',
                textDecoration: 'none',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                background: 'rgba(255,255,255,0.92)',
                borderRadius: 999,
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 24px rgba(0,0,0,0.18)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.3s ease',
              }}
              whileHover={{
                background: '#ffffff',
                boxShadow: '0 8px 40px rgba(0,0,0,0.25)',
                scale: 1.03,
              }}
              whileTap={{ scale: 0.97 }}
            >
              {service.ctaLabel}
              <RiArrowRightUpLine
                size={15}
                className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Thin divider between service cards */}
      {index < services.length - 1 && (
        <div
          className="mt-6 mx-auto"
          style={{
            height: 1,
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
            maxWidth: '80%',
          }}
        />
      )}
    </motion.div>
  );
}
