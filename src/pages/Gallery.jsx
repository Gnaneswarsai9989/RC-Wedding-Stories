import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { galleryImages, galleryHeaderImage } from '../data/mediaData';
import { RiCloseLine, RiArrowLeftLine, RiArrowRightLine } from 'react-icons/ri';

/**
 * Gallery / Our Clicks — Full-screen edge-to-edge masonry grid
 * styled identically to the "Captured Forever" section on the home page.
 * Cinematic dark hover overlays, CSS column layout, 3px gaps.
 */
const FILTERS = ['All', 'Wedding', 'Child', 'Event'];

export default function Gallery() {
  const sectionRef = useRef(null);
  const inView     = useInView(sectionRef, { once: true, margin: '-60px' });

  const [activeFilter, setActiveFilter] = useState('All');
  const [lightbox,     setLightbox]     = useState(null);
  const [hovered,      setHovered]      = useState(null);

  // Responsive column count — same logic as FeaturedWorksSection
  const [cols, setCols] = useState(3);
  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640)       setCols(1);
      else if (window.innerWidth < 1024) setCols(2);
      else                               setCols(3);
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

  const filtered =
    activeFilter === 'All'
      ? galleryImages
      : galleryImages.filter(
          img => img.category.toLowerCase() === activeFilter.toLowerCase()
        );

  const openLightbox  = (img) => setLightbox(img);
  const closeLightbox = ()    => setLightbox(null);

  const navigate = (dir) => {
    const arr = filtered;
    const idx = arr.findIndex(i => i.id === lightbox.id);
    const next = (idx + dir + arr.length) % arr.length;
    setLightbox(arr[next]);
  };

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="relative"
      style={{ background: '#080808' }}
    >
      {/* ─── Panoramic Ripped Paper Header Banner (Fixed z-0) ─── */}
      <div className="fixed top-0 left-0 w-full h-[410px] sm:h-[450px] md:h-[520px] overflow-hidden flex items-center justify-center z-0">
        {/* Background Panoramic Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={galleryHeaderImage}
            alt="Scenic wedding couple landscape"
            className="w-full h-full object-cover"
            style={{
              filter: 'none',
              objectPosition: '50% 35%'
            }}
          />
        </div>

        {/* Banner Content (Big Text, Subtitle) */}
        <motion.div
          className="relative z-10 text-center px-6 max-w-4xl pb-20 sm:pb-28 md:pb-36"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Hand-drawn Camera Sketch Icon matching user reference image */}
          <svg
            viewBox="0 0 150 100"
            className="w-20 h-14 sm:w-32 sm:h-22 md:w-36 md:h-26 mx-auto mb-1 pointer-events-none select-none"
          >
            {/* Top Button / Dial */}
            <path
              d="M 30,35 C 28,35 25,37 25,40 L 41,40 C 41,37 38,35 36,35 Z"
              fill="#111111"
              stroke="#111111"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            
            {/* Camera Body (Left side, shoulder, raised viewfinder, and right side - open at the bottom) */}
            <path
              d="M 22,76 C 20,68 20,54 20,46 C 20,42 22,39 28,39 L 45,39 C 48,34 50,22 62,22 L 88,22 C 100,22 102,34 105,39 L 122,39 C 128,39 130,42 130,46 C 130,54 130,68 128,76"
              stroke="#111111"
              strokeWidth="4.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />

            {/* Center Lens */}
            <circle
              cx="75"
              cy="55"
              r="20"
              stroke="#111111"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
            />
          </svg>

          {/* Main Title */}
          <h2
            className="mb-1"
            style={{
              fontFamily: "'Caveat', cursive",
              fontSize: 'clamp(34px, 5vw, 48px)',
              fontWeight: 700,
              lineHeight: 1.1,
              color: '#111111',
              letterSpacing: '0.02em',
              marginTop: '-12px',
              textShadow: '0 1px 2px rgba(255,255,255,0.45)'
            }}
          >
            Our Clicks
          </h2>

          {/* Divider */}
          <div className="flex items-center justify-center gap-3 mt-1 mb-5">
            <div className="w-24 h-[1px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,0,0,0.22))' }} />
            <span className="text-[13px] text-black/35 font-light" style={{ letterSpacing: '0.15em' }}>✦</span>
            <div className="w-24 h-[1px]" style={{ background: 'linear-gradient(90deg, rgba(0,0,0,0.22), transparent)' }} />
          </div>

          {/* Description */}
          <p 
            className="mx-auto leading-relaxed max-w-md"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: 'italic',
              fontSize: 'clamp(13px, 1.8vw, 16px)',
              fontWeight: 400,
              color: '#333333',
              letterSpacing: '0.04em',
              textShadow: '0 1px 2px rgba(255,255,255,0.45)'
            }}
          >
            A curated selection of moments — each frame handpicked for its
            emotional depth and visual poetry.
          </p>
        </motion.div>
      </div>

      {/* ─── Scrolling Body (sits over fixed banner as user scrolls) ─── */}
      <div className="relative w-full z-10 bg-[#080808] mt-[410px] sm:mt-[450px] md:mt-[520px]">
        {/* Realistic Double-Layered Ripped Scrapbook Paper Borders */}
        <svg
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
          className="absolute top-0 left-0 w-full h-14 sm:h-16 md:h-20 z-20 pointer-events-none select-none -translate-y-[97%] drop-shadow-[0_-3px_10px_rgba(0,0,0,0.45)]"
        >
          {/* Layer 1: Warm off-white deckled paper tear strip */}
          <path
            d="M0,35 L40,38 L85,32 L130,42 L185,35 L240,45 L290,38 L345,42 L395,33 L450,45 L510,38 L570,42 L620,32 L675,44 L730,35 L785,42 L840,32 L895,45 L945,36 L1000,43 L1055,34 L1110,46 L1160,37 L1215,43 L1270,33 L1325,44 L1380,35 L1440,40 L1440,60 L0,60 Z"
            fill="#f7f5f0"
          />
          {/* Layer 2: Main solid background-matching tear strip */}
          <path
            d="M0,45 L40,48 L85,42 L130,52 L185,45 L240,55 L290,48 L345,52 L395,43 L450,55 L510,48 L570,52 L620,42 L675,54 L730,45 L785,52 L840,42 L895,55 L945,46 L1000,53 L1055,44 L1110,56 L1160,47 L1215,53 L1270,43 L1325,54 L1380,45 L1440,50 L1440,100 L0,100 Z"
            fill="#080808"
          />
        </svg>

        {/* ── Filter Tabs ── */}
        <motion.div
          className="flex items-center justify-center gap-2 pt-16 pb-10 flex-wrap px-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="cursor-pointer px-6 py-2 rounded-full text-xs tracking-widest uppercase transition-all duration-400"
              style={{
                fontFamily: 'Inter',
                fontWeight: 400,
                letterSpacing: '0.15em',
                background:     activeFilter === f ? 'rgba(255,255,255,0.12)' : 'transparent',
                border:         `1px solid ${activeFilter === f ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.08)'}`,
                color:          activeFilter === f ? 'white' : 'rgba(255,255,255,0.4)',
                backdropFilter: 'blur(12px)',
              }}
            >
              {f}
            </button>
          ))}
        </motion.div>

        {/* ── Full-width edge-to-edge masonry grid (same as Captured Forever) ── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              columnCount: cols,
              columnGap: '3px',
              width: '100%',
            }}
          >
            {filtered.map((img, i) => (
              <motion.div
                key={img.id}
                className="relative overflow-hidden cursor-pointer group"
                style={{
                  breakInside: 'avoid',
                  marginBottom: '3px',
                  display: 'block',
                }}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.85,
                  delay: Math.min(i * 0.06, 0.55),
                  ease: [0.16, 1, 0.3, 1],
                }}
                onMouseEnter={() => setHovered(img.id)}
                onMouseLeave={() => setHovered(null)}
                onClick={() => openLightbox(img)}
              >
                {/* Image — height:auto preserves natural aspect ratio */}
                <motion.img
                  src={getOptimizedUrl(img.url)}
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
                    scale:   hovered === img.id ? 1.04 : 1,
                    opacity: hovered === img.id ? 1.0  : 0.88,
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
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: 19,
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      color: 'rgba(255,255,255,0.9)',
                    }}
                    animate={{
                      y:       hovered === img.id ? 0  : 12,
                      opacity: hovered === img.id ? 1  : 0,
                    }}
                    transition={{ duration: 0.32, delay: 0.04 }}
                  >
                    {img.alt}
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
          </motion.div>
        </AnimatePresence>

        {/* Bottom spacer */}
        <div className="pb-24" />
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center"
            style={{ background: 'rgba(0,0,0,0.95)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* Image */}
            <motion.div
              className="relative max-w-5xl w-full mx-6"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.url}
                alt={lightbox.alt}
                className="w-full max-h-[80vh] object-contain rounded-sm"
              />
              <p className="text-center text-white/30 text-xs mt-4 tracking-widest uppercase" style={{ fontFamily: 'Inter' }}>
                {lightbox.alt}
              </p>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 glass w-10 h-10 rounded-full flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-colors"
              aria-label="Close lightbox"
            >
              <RiCloseLine size={18} />
            </button>

            {/* Prev / Next */}
            <button
              onClick={(e) => { e.stopPropagation(); navigate(-1); }}
              className="absolute left-6 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-colors"
              aria-label="Previous"
            >
              <RiArrowLeftLine size={18} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); navigate(1); }}
              className="absolute right-6 top-1/2 -translate-y-1/2 glass w-12 h-12 rounded-full flex items-center justify-center text-white/60 hover:text-white cursor-pointer transition-colors"
              aria-label="Next"
            >
              <RiArrowRightLine size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
