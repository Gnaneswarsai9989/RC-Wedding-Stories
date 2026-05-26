import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { RiDoubleQuotesL } from 'react-icons/ri';

/**
 * StorytellingSection — parallax quote banner only.
 * Testimonials moved to the dedicated Testimonials page.
 */
export default function StorytellingSection() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const bgY     = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const textY   = useTransform(scrollYProgress, [0.1, 0.9], ['5%', '-5%']);
  const quoteOp = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative h-[65vh] md:h-[72vh] overflow-hidden flex items-center justify-center"
    >
      {/* Parallax BG image */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY }}>
        <img
          src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1920&q=80"
          alt="Romantic wedding ceremony"
          className="w-full h-full object-cover"
          style={{ filter: 'grayscale(25%)', transform: 'scale(1.18)' }}
        />
      </motion.div>

      {/* Dark overlay */}
      <div className="absolute inset-0 z-10" style={{ background: 'rgba(10,10,10,0.7)' }} />

      {/* Silver centre bloom */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,212,240,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Silver side lines */}
      <div className="side-line-left z-20" />
      <div className="side-line-right z-20" />

      {/* Quote Content */}
      <motion.div
        className="relative z-20 text-center px-6 max-w-4xl mx-auto"
        style={{ y: textY, opacity: quoteOp }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: 60 } : {}}
          transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mb-8"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,212,240,0.6), transparent)' }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <RiDoubleQuotesL size={38} className="mx-auto mb-8" style={{ color: 'rgba(200,212,240,0.2)' }} />
        </motion.div>

        <motion.blockquote
          className="text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.3, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(26px, 4vw, 54px)',
            fontWeight: 300,
            lineHeight: 1.3,
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            textShadow: '0 2px 40px rgba(0,0,0,0.4)',
          }}
        >
          "A great photograph is one that fully expresses what one feels,
          in the deepest sense, about what is being photographed."
        </motion.blockquote>

        <motion.p
          className="mt-8 text-xs tracking-widest uppercase"
          style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(200,212,240,0.4)' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
        >
          — Ansel Adams
        </motion.p>

        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: 60 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mx-auto mt-8"
          style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,212,240,0.6), transparent)' }}
        />
      </motion.div>
    </section>
  );
}
