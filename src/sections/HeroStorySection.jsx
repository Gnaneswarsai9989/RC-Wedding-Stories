import { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { heroStoryImage } from '../data/mediaData';

/**
 * HeroStorySection — Full-screen cinematic image section immediately
 * below the hero slideshow. Features the brand headline and a
 * "Build a Quote" CTA button, beautifully centred over the image.
 *
 * Swap `heroStoryImage` in mediaData.js with your Cloudinary URL.
 */
export default function HeroStorySection() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax: image drifts at a slower rate than scroll
  const imageY  = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const textY   = useTransform(scrollYProgress, [0, 1], ['-4%', '4%']);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ height: '120vh', minHeight: 800, background: '#000000' }}
    >
      {/* ── Full-bleed Parallax Image ── */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          y: imageY,
          scale: 1.25,
          willChange: 'transform',
        }}
      >
        <img
          src={heroStoryImage}
          alt="Your story, beautifully told"
          className="w-full h-full object-cover"
          style={{ filter: 'none' }}
        />
      </motion.div>

      {/* Soft bottom fade to prevent harsh edge against black section below */}
      <div
        className="absolute inset-x-0 bottom-0 z-10 pointer-events-none"
        style={{
          height: '12%',
          background: 'linear-gradient(to top, #000000 0%, transparent 100%)',
        }}
      />

      {/* Silver decorative side lines */}
      <div className="side-line-left z-20" />
      <div className="side-line-right z-20" />

      {/* ── Main Content ── */}
      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-start justify-center text-left pl-[8%] md:pl-[14%] lg:pl-[18%] pr-6"
        style={{ y: textY, paddingBottom: '8%' }}
      >
        <div 
          className="flex flex-col items-start"
          style={{ maxWidth: 'min(90%, 650px)' }}
        >
          {/* Eyebrow accent */}
          <motion.div
            className="flex items-center gap-4 mb-7"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,212,240,0.55))' }} />
            <span className="pill-border">RC Wedding Stories</span>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, rgba(200,212,240,0.55), transparent)' }} />
          </motion.div>

          {/* Headline — constrained to container */}
          <motion.h2
            className="text-white"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(38px, 5vw, 82px)',
              fontWeight: 600,
              lineHeight: 1.1,
              letterSpacing: '-0.015em',
              textShadow: '0 4px 40px rgba(0,0,0,0.55)',
              maxWidth: '100%',
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.4, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            Your Story,
            <br />
            <em
              className="text-gradient-silver"
              style={{ fontStyle: 'italic' }}
            >
              Beautifully
            </em>
            <br />
            Told.
          </motion.h2>

          {/* Thin divider */}
          <motion.div
            className="mt-8 mb-0"
            style={{
              width: 260,
              height: 1,
              background: 'linear-gradient(90deg, rgba(200,212,240,0.6), transparent)',
            }}
            initial={{ opacity: 0, scaleX: 0 }}
            animate={inView ? { opacity: 1, scaleX: 1 } : {}}
            transition={{ duration: 1.1, delay: 0.7 }}
          />
        </div>
      </motion.div>

      {/* Centered Build a Quote CTA at the bottom with increased size */}
      <div className="absolute inset-x-0 bottom-20 z-30 flex justify-center">
        <motion.a
          href="#quote"
          onClick={(e) => { e.preventDefault(); window.location.hash = '#quote'; }}
          className="btn-luxury cursor-pointer"
          style={{
            fontSize: 15,
            letterSpacing: '0.22em',
            padding: '18px 84px',
            borderRadius: 9999,
            minWidth: 320,
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.04, boxShadow: '0 0 45px rgba(255,255,255,0.18)' }}
          whileTap={{ scale: 0.97 }}
        >
          Build a Quote
        </motion.a>
      </div>
    </section>
  );
}
