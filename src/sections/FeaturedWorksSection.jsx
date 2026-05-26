import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiArrowRightUpLine } from 'react-icons/ri';
import { featuredImages } from '../data/mediaData';

/**
 * FeaturedWorksSection — Auto-adaptive masonry gallery.
 * Uses CSS columns so portrait images appear tall and landscape images
 * appear wide automatically — no manual wide/tall flags needed.
 * Replace `cloudinaryUrl` values in mediaData.js with your Cloudinary links.
 */
export default function FeaturedWorksSection() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  const [hovered, setHovered]   = useState(null);

  // Responsive column count
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)  setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else setCols(3);
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  // Cloudinary image auto-optimization helper
  const getOptimizedUrl = (url) => {
    if (url && url.includes('cloudinary.com') && url.includes('/upload/')) {
      return url.replace('/upload/', '/upload/q_auto,f_auto,w_1000/');
    }
    return url;
  };

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: '#080808' }}
    >
      {/* ── Section Header ── */}
      <div ref={ref} className="relative z-10 text-center pt-24 pb-16 px-6">
        <motion.p
          className="text-xs tracking-[0.45em] uppercase mb-5"
          style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(200,212,240,0.4)' }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          Our Recent Work
        </motion.p>

        <motion.h2
          className="text-white"
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(36px, 5vw, 70px)',
            fontWeight: 600,
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
          }}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          Captured{' '}
          <em className="text-gradient-silver" style={{ fontStyle: 'italic' }}>
            Forever
          </em>
        </motion.h2>

        <motion.div
          className="section-divider-wide mt-8 mb-0"
          initial={{ opacity: 0, scaleX: 0 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1, delay: 0.25 }}
        />
      </div>

      {/* ── Masonry Grid — auto-adapts to any image orientation ── */}
      <div
        className="w-full px-[3px]"
        style={{
          columnCount: cols,
          columnGap: '3px',
        }}
      >
        {featuredImages.map((img, i) => (
          <motion.div
            key={img.id}
            className="relative overflow-hidden cursor-pointer group"
            style={{
              breakInside: 'avoid',
              marginBottom: '3px',
              display: 'block',
            }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.85,
              delay: Math.min(i * 0.06, 0.55),
              ease: [0.16, 1, 0.3, 1],
            }}
            onMouseEnter={() => setHovered(img.id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Image — height:auto preserves natural aspect ratio */}
            <motion.img
              src={getOptimizedUrl(img.cloudinaryUrl)}
              alt={img.alt}
              loading="lazy"
              style={{
                width: '100%',
                height: 'auto',
                display: 'block',
                transformOrigin: 'center center',
                willChange: 'transform, opacity',
              }}
              animate={{
                scale: hovered === img.id ? 1.04 : 1,
                opacity: hovered === img.id ? 1.0 : 0.88,
              }}
              transition={{ duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
            />

            {/* Cinematic hover overlay */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-end p-5 pointer-events-none"
              style={{
                background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.12) 45%, transparent 100%)',
              }}
              animate={{ opacity: hovered === img.id ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.p
                className="text-white/90"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 19,
                  fontWeight: 400,
                  letterSpacing: '0.01em',
                }}
                animate={{
                  y:       hovered === img.id ? 0 : 12,
                  opacity: hovered === img.id ? 1 : 0,
                }}
                transition={{ duration: 0.32, delay: 0.04 }}
              >
                {img.label}
              </motion.p>
              <motion.div
                style={{
                  height: 1,
                  marginTop: 7,
                  background: 'rgba(255,255,255,0.45)',
                }}
                animate={{ width: hovered === img.id ? 38 : 0 }}
                transition={{ duration: 0.38, delay: 0.07 }}
              />
            </motion.div>

            {/* Inset border shimmer */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.04)' }}
            />
          </motion.div>
        ))}
      </div>

      {/* ── View Full Gallery CTA ── */}
      <motion.div
        className="text-center py-16"
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <p
          className="text-xs tracking-[0.35em] uppercase mb-6"
          style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(255,255,255,0.25)' }}
        >
          There's more to see
        </p>
        <motion.a
          href="#gallery"
          onClick={(e) => { e.preventDefault(); window.location.hash = '#gallery'; }}
          className="btn-luxury cursor-pointer inline-flex items-center justify-center gap-2"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: '0.22em',
            borderRadius: 9999,
            padding: '16px 54px',
            textTransform: 'uppercase',
          }}
        >
          <span>View Full Gallery</span>
          <RiArrowRightUpLine size={16} />
        </motion.a>
      </motion.div>
    </section>
  );
}
