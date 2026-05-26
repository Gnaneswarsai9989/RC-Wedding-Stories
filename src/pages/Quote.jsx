/**
 * RC Wedding Stories — Cinematic Premium Wedding Quotation Builder
 * ================================================================
 * Single-file, self-contained quotation wizard.
 *
 * HOW TO CUSTOMISE:
 *   1. WhatsApp number  → change FOUNDER_WHATSAPP below
 *   2. Pricing          → change PRICING object below
 *   3. Add new events   → add entry to EVENT_PAGES array below
 *   4. Connect "Build Your Quote" button → call window.openQuoteBuilder?.()
 *      (already wired — any element can call this function after mount)
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiCamera, FiVideo, FiCheck, FiChevronLeft, FiChevronRight,
  FiUser, FiPhone, FiMail, FiMapPin, FiCalendar, FiPlus, FiMinus,
  FiDownload, FiMessageCircle, FiStar, FiHeart, FiX, FiNavigation,
  FiMic, FiFilm, FiBookOpen
} from 'react-icons/fi';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/* ─────────────────────────────────────────────────────────────
   ★  CONFIGURATION — Edit pricing & contact here
───────────────────────────────────────────────────────────── */
const FOUNDER_WHATSAPP = '916304000624'; // Change to founder's number

const PRICING = {
  // Photography types
  candidPhoto:      13000,
  traditionalPhoto: 8000,
  dronePhoto:       8000,

  // Per-event services
  tradPhoto:   8000,
  tradVideo:   8000,
  candPhoto:   13000,
  candVideo:   13000,
  drone:       8000,

  // Albums
  pressBook:    20000,
  magnumAlbum:  30000,

  // Output delivery
  delivery1Month:  50000,
  delivery3Months: 10000,
  delivery5Months: 25000,

  // Pre-wedding packages
  preWeddingBasic:   15000,
  preWeddingPremium: 30000,
  preWeddingLuxury:  50000,

  // Romantic couple shoot packages
  romanticPhotoOnly: 30000,
  romanticBoth:      50000,
};

/* ─────────────────────────────────────────────────────────────
   EVENT PAGES CONFIG — Add new events here
───────────────────────────────────────────────────────────── */
const EVENT_PAGES = [
  { id: 'engagement',    label: 'Engagement',     emoji: '💍', color: '#c9a96e' },
  { id: 'pellikoduku',   label: 'Pellikoduku',    emoji: '🎊', color: '#e07fa0' },
  { id: 'groomHaldi',   label: 'Groom Haldi',    emoji: '🌿', color: '#f4c842' },
  { id: 'pellikuthuru',  label: 'Pellikuthuru',   emoji: '👰', color: '#d4a8f0' },
  { id: 'brideHaldi',   label: 'Bride Haldi',    emoji: '🌸', color: '#f4c842' },
  { id: 'reception',    label: 'Reception',       emoji: '🥂', color: '#7ec8e3' },
  { id: 'bigDay',       label: 'The Big Day',     emoji: '💒', color: '#ff7b7b' },
  { id: 'vratham',      label: 'Vratham',         emoji: '🥥', color: '#88d49e' },
];

const EVENT_SERVICES = [
  { id: 'tradPhoto', label: 'Traditional Photo', price: PRICING.tradPhoto, icon: 'photo' },
  { id: 'tradVideo', label: 'Traditional Video', price: PRICING.tradVideo, icon: 'video' },
  { id: 'candPhoto', label: 'Candid Photo',      price: PRICING.candPhoto, icon: 'photo' },
  { id: 'candVideo', label: 'Candid Video',      price: PRICING.candVideo, icon: 'video' },
  { id: 'drone',     label: 'Drone',             price: PRICING.drone,     icon: 'drone' },
];

const SANGEETH_SERVICES = [
  { id: 'candPhoto', label: 'Candid Photo',      price: PRICING.candPhoto, icon: 'photo' },
  { id: 'candVideo', label: 'Candid Video',      price: PRICING.candVideo, icon: 'video' },
  { id: 'tradVideo', label: 'Traditional Video', price: PRICING.tradVideo, icon: 'video' },
  { id: 'drone',     label: 'Drone',             price: PRICING.drone,     icon: 'drone' },
];

const MEHENDI_SERVICES = [
  { id: 'candPhoto', label: 'Candid Photo',      price: PRICING.candPhoto, icon: 'photo' },
  { id: 'tradVideo', label: 'Traditional Video', price: PRICING.tradVideo, icon: 'video' },
];

const COCKTAIL_SERVICES = [
  { id: 'candPhoto', label: 'Candid Photo', price: PRICING.candPhoto, icon: 'photo' },
  { id: 'candVideo', label: 'Candid Video', price: PRICING.candVideo, icon: 'video' },
];

/* ─────────────────────────────────────────────────────────────
   STYLES — inline design tokens
───────────────────────────────────────────────────────────── */
const C = {
  bg:         '#ffffff',
  navy:       '#1a2340',
  navyLight:  '#2d3a5a',
  red:        '#0a0a0a',
  redLight:   '#1f1f1f',
  gold:       '#c9a96e',
  cream:      '#ffffff',
  text:       '#1a2340',
  textMuted:  '#6b7280',
  glass:      'rgba(255,255,255,0.7)',
  glassBorder:'rgba(255,255,255,0.9)',
  shadow:     '0 20px 60px rgba(26,35,64,0.12), 0 4px 16px rgba(26,35,64,0.08)',
  shadowHover:'0 32px 80px rgba(26,35,64,0.2), 0 8px 24px rgba(26,35,64,0.12)',
  red10:      'rgba(10,10,10,0.10)',
  red20:      'rgba(10,10,10,0.20)',
  green:      '#10b981',
};

/* ─────────────────────────────────────────────────────────────
   UTILITY — format currency
───────────────────────────────────────────────────────────── */
const fmt = (n) => '₹' + n.toLocaleString('en-IN');

/* ─────────────────────────────────────────────────────────────
   STEP IDS — full wizard flow
───────────────────────────────────────────────────────────── */
/* const STEPS = [
  'intro',
  'photoType',
  ...EVENT_PAGES.map(e => e.id),
  'sangeethQ', 'sangeeth',
  'mehendiQ',  'mehendi',
  'cocktailQ', 'cocktail',
  'albumQ',    'album',
  'output',
  'preWeddingQ','preWedding',
  'romanticQ', 'romantic',
  'shootingStyle',
  'clientDetails',
  'invoice',
]; */


/* ─────────────────────────────────────────────────────────────
   INITIAL STATE
───────────────────────────────────────────────────────────── */
const initialState = () => ({
  photoType:     null,   // 'candid' | 'traditional'
  events:        {},     // { [eventId]: { [serviceId]: qty } }
  sangeeth:      null,
  sangeethSvcs:  {},
  mehendi:       null,
  mehendiSvcs:   {},
  cocktail:      null,
  cocktailSvcs:  {},
  album:         null,
  albumSelections: {},
  traditionalAlbumSelections: {}, // traditional album selections for parents
  output:        null,
  preWedding:    null,
  preWeddingPkg: null,
  romantic:      null,
  romanticPkg:   'photo', // 'photo' (Photo Only) | 'both' (Both Photo & Video)
  shootingStyle: null,
  client: {
    bride:    '',
    groom:    '',
    phone:    '',
    email:    '',
    date:     '',
    location: '',
  },
});

/* ─────────────────────────────────────────────────────────────
   COMPUTE TOTAL
───────────────────────────────────────────────────────────── */
function computeTotal(state) {
  let total = 0;

  // Photography type is a style selection only — no price added

  // Standard events
  for (const ev of EVENT_PAGES) {
    const svcMap = state.events[ev.id] || {};
    for (const svc of EVENT_SERVICES) {
      const qty = svcMap[svc.id] || 0;
      total += qty * svc.price;
    }
  }

  // Sangeeth
  if (state.sangeeth === 'yes') {
    for (const svc of SANGEETH_SERVICES) {
      const qty = state.sangeethSvcs[svc.id] || 0;
      total += qty * svc.price;
    }
  }

  // Mehendi
  if (state.mehendi === 'yes') {
    for (const svc of MEHENDI_SERVICES) {
      const qty = state.mehendiSvcs[svc.id] || 0;
      total += qty * svc.price;
    }
  }

  // Cocktail
  if (state.cocktail === 'yes') {
    for (const svc of COCKTAIL_SERVICES) {
      const qty = state.cocktailSvcs[svc.id] || 0;
      total += qty * svc.price;
    }
  }

  // Albums
  if (state.album === 'yes') {
    // Albums for couple
    if (state.albumSelections.pressBook)   total += PRICING.pressBook;
    if (state.albumSelections.magnumAlbum) total += PRICING.magnumAlbum;
    
    // Traditional Albums for parents
    if (state.traditionalAlbumSelections?.pressBook)   total += PRICING.pressBook;
    if (state.traditionalAlbumSelections?.magnumAlbum) total += PRICING.magnumAlbum;
  }

  // Output
  if (state.output === '1month')  total += PRICING.delivery1Month;
  if (state.output === '3months') total += PRICING.delivery3Months;
  if (state.output === '5months') total += PRICING.delivery5Months;


  // Romantic
  if (state.romantic === 'yes') {
    if (state.romanticPkg === 'both') total += PRICING.romanticBoth;
    else total += PRICING.romanticPhotoOnly;
  }

  return total;
}

/* ─────────────────────────────────────────────────────────────
   FLOATING PARTICLES BACKGROUND
───────────────────────────────────────────────────────────── */
function FloatingParticles() {
  const [particles] = useState(() => Array.from({ length: 18 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: 2 + Math.random() * 4,
    dur: 6 + Math.random() * 10,
    delay: Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.25,
  })));
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
      {particles.map(p => (
        <motion.div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${C.gold} 0%, transparent 70%)`,
            opacity: p.opacity,
          }}
          animate={{ y: [-15, 15, -15], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
          transition={{ duration: p.dur, repeat: Infinity, delay: p.delay, ease: 'easeInOut' }}
        />
      ))}
      {/* Bokeh circles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`bokeh-${i}`}
          style={{
            position: 'absolute',
            left: `${10 + i * 16}%`,
            top: `${20 + (i % 3) * 25}%`,
            width: 80 + i * 30,
            height: 80 + i * 30,
            borderRadius: '50%',
            border: `1px solid rgba(201,169,110,${0.06 + i * 0.01})`,
            pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8 + i, repeat: Infinity, delay: i * 1.2, ease: 'easeInOut' }}
        />
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   PROGRESS BAR
───────────────────────────────────────────────────────────── */
function ProgressBar({ step, total }) {
  const pct = Math.round((step / (total - 1)) * 100);
  return (
    <div style={{ width: '100%', height: 3, background: 'rgba(26,35,64,0.08)', borderRadius: 2, overflow: 'hidden' }}>
      <motion.div
        style={{ height: '100%', background: `linear-gradient(90deg, ${C.red}, ${C.gold})`, borderRadius: 2 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
}

const SERVICE_IMAGES = {
  tradPhoto: '/cameras/traditional_photo.png',
  tradVideo: '/cameras/traditional_video.png',
  candPhoto: '/cameras/candid_photo.png',
  candVideo: '/cameras/candid_video.png',
  drone: '/cameras/drone.png',
};

/* ─────────────────────────────────────────────────────────────
   SERVICE CARD — used in event pages
───────────────────────────────────────────────────────────── */
function ServiceCard({ svc, qty, onChange }) {
  const [hovered, setHovered] = useState(false);
  const selected = qty > 0;
  const showPrice = hovered || selected;

  const icon = svc.icon === 'drone'
    ? <FiNavigation size={18} />
    : svc.icon === 'video'
    ? <FiVideo size={18} />
    : <FiCamera size={18} />;

  const imgUrl = SERVICE_IMAGES[svc.id];

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="service-card"
      style={{
        position: 'relative',
        background: 'transparent',
        border: 'none',
        borderRadius: 0,
        padding: '10px 4px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        boxShadow: 'none',
        cursor: 'pointer',
        minWidth: 0,
      }}
      onClick={() => onChange(qty > 0 ? 0 : 1)}
    >
      {/* Selected tick */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0 }}
            style={{
              position: 'absolute',
              top: 0,
              right: 12,
              width: 18,
              height: 18,
              borderRadius: '50%',
              background: C.green,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 10,
              boxShadow: '0 2px 8px rgba(16,185,129,0.4)',
            }}
          >
            <FiCheck size={10} color="#fff" strokeWidth={3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Icon / Camera Image */}
      <motion.div
        className="card-icon"
        animate={{
          scale: selected ? 1.12 : hovered ? 1.06 : 1,
          y: selected ? -8 : hovered ? -4 : 0,
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 15,
        }}
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: 'clamp(75px, 9vw, 115px)',
          width: '100%',
          overflow: 'visible',
          marginBottom: 20,
        }}
      >
        {imgUrl ? (
          <img
            src={imgUrl}
            alt={svc.label}
            style={{
              height: '100%',
              maxWidth: '100%',
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
              transition: 'filter 0.3s ease',
            }}
          />
        ) : (
          <span style={{ color: selected ? C.green : C.navy }}>{icon}</span>
        )}

        {/* Qty controls overlayed directly on the image */}
        <AnimatePresence>
          {selected && (
            <motion.div
              className="qty-controls"
              initial={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
              animate={{ opacity: 1, scale: 1, y: 0, x: '-50%' }}
              exit={{ opacity: 0, scale: 0.8, y: 10, x: '-50%' }}
              style={{
                position: 'absolute',
                bottom: -8,
                left: '50%',
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: `1px solid ${C.green}`,
                borderRadius: 100,
                padding: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 4,
                zIndex: 20,
                boxShadow: '0 8px 24px rgba(16,185,129,0.25)',
              }}
              onClick={e => e.stopPropagation()}
            >
              <motion.button
                className="qty-btn"
                whileTap={{ scale: 0.85 }}
                onClick={() => onChange(Math.max(0, qty - 1))}
                style={{
                  width: 17, height: 17,
                  borderRadius: '50%',
                  border: `1px solid ${C.green}`,
                  background: 'transparent',
                  color: C.green,
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, lineHeight: 1,
                }}
              >
                <FiMinus size={8} />
              </motion.button>
              <motion.span
                key={qty}
                initial={{ scale: 1.3 }}
                animate={{ scale: 1 }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontWeight: 800,
                  fontSize: 12,
                  color: C.navy,
                  minWidth: 12,
                  textAlign: 'center',
                  userSelect: 'none'
                }}
              >
                {qty}
              </motion.span>
              <motion.button
                className="qty-btn"
                whileTap={{ scale: 0.85 }}
                onClick={() => onChange(qty + 1)}
                style={{
                  width: 17, height: 17,
                  borderRadius: '50%',
                  border: `1px solid ${C.green}`,
                  background: C.green,
                  color: '#fff',
                  cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <FiPlus size={8} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Label */}
      <span
        className="card-label"
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: 9.5,
          fontWeight: 700,
          color: selected ? C.green : C.navy,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          textAlign: 'center',
          lineHeight: 1.3,
          marginTop: 14,
          transition: 'color 0.25s ease',
        }}
      >
        {svc.label}
      </span>

      {/* Price — navy tooltip badge (always visible) */}
      <motion.div
        className="card-price"
        animate={{
          opacity: 1,
          scale: 1,
          y: 0,
        }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        style={{
          position: 'relative',
          display: 'inline-block',
          marginTop: 10,
          textAlign: 'center',
        }}
      >
        {/* Triangle arrow */}
        <div style={{
          position: 'absolute',
          top: -6,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 0,
          height: 0,
          borderLeft: '6px solid transparent',
          borderRight: '6px solid transparent',
          borderBottom: `6px solid ${selected ? C.green : C.navy}`,
        }} />
        <div style={{
          background: selected ? C.green : C.navy,
          color: '#fff',
          padding: '7px 14px',
          borderRadius: 8,
          fontFamily: "'Inter', sans-serif",
          fontSize: 13,
          fontWeight: 700,
          boxShadow: selected
            ? '0 6px 18px rgba(16,185,129,0.35)'
            : '0 6px 18px rgba(26,35,64,0.22)',
          transition: 'background 0.25s ease, box-shadow 0.25s ease',
          whiteSpace: 'nowrap',
        }}>
          {fmt(svc.price)}
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ★  SHOOT INFO & DYNAMIC CONTENT COPTIONS
───────────────────────────────────────────────────────────── */
const SHOOT_INFO = {
  photoType: {
    title: "Understanding Photography Styles 📸",
    bullets: [
      { label: "Candid Photography", text: "Artistic, unscripted captures of true emotions, laughter, and teary-eyed glances as they naturally happen." },
      { label: "Traditional Photography", text: "Stage-led portraits, structured group shots, formal rituals, and high-clarity documentative lighting." }
    ]
  },
  engagement: {
    title: "Engagement Storytelling 💍",
    bullets: [
      { label: "The Promise", text: "We capture high-clarity close-ups of the ring exchange, nervous smiles, and deep-felt family blessings." },
      { label: "Creative Portraits", text: "Special editorial portrait session for the newly engaged couple in cinematic lighting." }
    ]
  },
  pellikoduku: {
    title: "Traditional Pellikoduku Rituals 🎊",
    bullets: [
      { label: "Groom Auspice", text: "Vibrant snapshots of turmeric oil baths, family laughter, and elegant traditional groom transformations." },
      { label: "Joyous Haldi Smears", text: "High-speed shutter captures of color splashes, laughing cousins, and grand ritual bathing moments." }
    ]
  },
  groomHaldi: {
    title: "Vibrant Groom Haldi Celebration 💛",
    bullets: [
      { label: "Turmeric Splash", text: "Action shots of yellow turmeric pastes, dramatic water pours, and active family banter." },
      { label: "Candid Energy", text: "Slow-motion laughter and bright, sunlit portraits capturing the sheer happiness of relatives." }
    ]
  },
  pellikuthuru: {
    title: "Auspicious Pellikuthuru Ceremony 🌸",
    bullets: [
      { label: "Bridal Glow", text: "Intimate close-ups of traditional jewellery, jasmine garlands, and sacred ancestral rituals." },
      { label: "Aura of Grace", text: "Soft, emotional portraits of the bride surrounded by women blessing her new journey." }
    ]
  },
  brideHaldi: {
    title: "Elegant Bride Haldi Joy 💛",
    bullets: [
      { label: "Floral Blessings", text: "Beautiful cinematic captures of turmeric paste applications, flower petal showers, and bridal smiles." },
      { label: "Color Harmony", text: "Richly graded warm color tones showcasing the colorful drapes, emotions, and group dances." }
    ]
  },
  reception: {
    title: "Gala Wedding Reception 🥂",
    bullets: [
      { label: "Grand Entry", text: "Capture royal stage entries, dramatic cold fire sparkles, smoke effects, and elegant designer couture." },
      { label: "Celebrity Portraits", text: "High-end studio style portraits of the couple together with all esteemed guests and family." }
    ]
  },
  bigDay: {
    title: "The Holy Muhurtham (Big Day) 💒",
    bullets: [
      { label: "Sacred Vows", text: "Ultra-crisp captures of the Jeelakarra Bellam ceremony, Mangalasutra tying, and emotional Talambralu flower showers." },
      { label: "Eternal Legacy", text: "High-fidelity preservation of core religious rituals, parental tears, and the couple's first union as husband and wife." }
    ]
  },
  vratham: {
    title: "Sacred Vratham Ceremony 🥥",
    bullets: [
      { label: "Sacred Homam", text: "Quiet, spiritual captures of the holy fire, chants, and intimate family prayer circles." },
      { label: "Pious Beginnings", text: "Beautiful documentative coverage of ancestral rites and blessings that start your big journey." }
    ]
  },
  sangeethQ: {
    title: "Why Add Sangeeth to Your Shoot? 💃",
    bullets: [
      { label: "High-Energy Motion", text: "We capture rapid dance choreography, dramatic lighting, spins, and explosive cheers." },
      { label: "Family Bond", text: "Lively, unfiltered candid moments of family performances, musicals, and pure late-night glamour." }
    ]
  },
  sangeeth: {
    title: "Why Add Sangeeth to Your Shoot? 💃",
    bullets: [
      { label: "High-Energy Motion", text: "We capture rapid dance choreography, dramatic lighting, spins, and explosive cheers." },
      { label: "Family Bond", text: "Lively, unfiltered candid moments of family performances, musicals, and pure late-night glamour." }
    ]
  },
  mehendiQ: {
    title: "Mehendi Details & Rituals 🌿",
    bullets: [
      { label: "Intricate Details", text: "Ultra-crisp macro photography of hand henna designs, bridal colors, and traditional dress details." },
      { label: "Color Burst Vibes", text: "Saturated, high-contrast, joyous candids of your friends, laughter, and cheerful wedding preparations." }
    ]
  },
  mehendi: {
    title: "Mehendi Details & Rituals 🌿",
    bullets: [
      { label: "Intricate Details", text: "Ultra-crisp macro photography of hand henna designs, bridal colors, and traditional dress details." },
      { label: "Color Burst Vibes", text: "Saturated, high-contrast, joyous candids of your friends, laughter, and cheerful wedding preparations." }
    ]
  },
  cocktailQ: {
    title: "Cocktail Party & Glamour 🥂",
    bullets: [
      { label: "After-Dark Elegance", text: "Capture deep low-light ambiance, beautiful night attire, dynamic club lights, and toasts." },
      { label: "Party Vibes", text: "Fascinating crowd candids on the dance floor, cake cutting, toasts, and champagne sparkles." }
    ]
  },
  cocktail: {
    title: "Cocktail Party & Glamour 🥂",
    bullets: [
      { label: "After-Dark Elegance", text: "Capture deep low-light ambiance, beautiful night attire, dynamic club lights, and toasts." },
      { label: "Party Vibes", text: "Fascinating crowd candids on the dance floor, cake cutting, toasts, and champagne sparkles." }
    ]
  },
  albumQ: {
    title: "The Legacy of a Printed Album 📖",
    bullets: [
      { label: "Archival Quality", text: "Handcrafted layout albums printed on heavy, matte lay-flat paper that never fades over generations." },
      { label: "A Tangible Storybook", text: "A physical family heirloom designed carefully with color-calibrated printing and premium cover options." }
    ]
  },
  album: {
    title: "The Legacy of a Printed Album 📖",
    bullets: [
      { label: "Archival Quality", text: "Handcrafted layout albums printed on heavy, matte lay-flat paper that never fades over generations." },
      { label: "A Tangible Storybook", text: "A physical family heirloom designed carefully with color-calibrated printing and premium cover options." }
    ]
  },
  output: {
    title: "Delivery & Post-Production Options 📦",
    bullets: [
      { label: "Artistic Curation", text: "Meticulous color grading, multi-camera audio syncing, and professional cinematic sound design." },
      { label: "Heirloom Quality", text: "Delivered in high-definition digital galleries and customized drives to preserve your memory forever." }
    ]
  },
  romanticQ: {
    title: "Cinematic Pre-Wedding Shoots 🌅",
    bullets: [
      { label: "Scenic Outdoor Magic", text: "Relaxed couple chemistry captured in breathtaking natural landscapes, forests, beaches, or historic architecture." },
      { label: "Cinematic Motion", text: "Slow-motion couple walks, artistic wind-blown dupatta flows, outfit coordinate shots, and beautiful golden hour lighting." }
    ]
  },
  romantic: {
    title: "Cinematic Pre-Wedding Shoots 🌅",
    bullets: [
      { label: "Scenic Outdoor Magic", text: "Relaxed couple chemistry captured in breathtaking natural landscapes, forests, beaches, or historic architecture." },
      { label: "Cinematic Motion", text: "Slow-motion couple walks, artistic wind-blown dupatta flows, outfit coordinate shots, and beautiful golden hour lighting." }
    ]
  },
  shootingStyle: {
    title: "Selecting Your Video Style 🎬",
    bullets: [
      { label: "Cinematic Style", text: "High dramatic value, movie-like aspect ratios, custom color grading, slow motions, and emotional music." },
      { label: "Documentary/Storytelling", text: "Real, chronological voiceover narrative focusing on natural pacing, real-audio, interviews, and chronological event progression." }
    ]
  }
};

function ShootInfoCard({ step }) {
  const info = SHOOT_INFO[step];
  if (!info) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 15, scale: 0.97 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{
        maxWidth: 600,
        width: '100%',
        margin: '60px auto 0',
        padding: '24px 28px',
        borderRadius: 24,
        border: '1px solid rgba(26,35,64,0.06)',
        background: 'rgba(255,255,255,0.45)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 8px 32px rgba(26,35,64,0.02)',
        textAlign: 'left',
      }}
    >
      <h4 style={{
        fontFamily: 'Cormorant Garamond, serif',
        fontSize: 19,
        fontWeight: 700,
        color: C.navy,
        marginBottom: 14,
        letterSpacing: '0.01em',
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        margin: 0,
        paddingBottom: 0,
      }}>
        {info.title}
      </h4>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 14 }}>
        {info.bullets.map((bullet, idx) => (
          <div key={idx} style={{ display: 'block', lineHeight: 1.6 }}>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 11.5,
              fontWeight: 800,
              color: C.red,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginRight: 8,
            }}>
              {bullet.label} —
            </span>
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: 13,
              color: C.textMuted,
            }}>
              {bullet.text}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   YES / NO CHOICE BUTTONS
───────────────────────────────────────────────────────────── */
function YesNoChoice({ value, onChange, question }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 40 }}>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(20px, 2.8vw, 34px)',
          fontWeight: 800,
          color: C.navy,
          textAlign: 'center',
          lineHeight: 1.2,
        }}
      >
        {question}
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        style={{ display: 'flex', gap: 40 }}
      >
        {['yes', 'no'].map(opt => {
          const sel = value === opt;
          return (
            <motion.button
              key={opt}
              onClick={() => onChange(opt)}
              whileHover={{ y: -6, scale: sel ? 1.15 : 1.02 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 160,
                height: 160,
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 12,
                transition: 'all 0.3s ease',
                opacity: value ? (sel ? 1 : 0.45) : 0.85,
              }}
            >
              {opt === 'yes' ? (
                <motion.img
                  src="/yes_choice.png"
                  alt="Yes"
                  animate={{
                    scale: sel ? 1.15 : 1,
                    filter: sel ? 'drop-shadow(0 12px 28px rgba(10,10,10,0.22))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.05))',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                  }}
                />
              ) : (
                <motion.img
                  src="/no_choice.png"
                  alt="No"
                  animate={{
                    scale: sel ? 1.15 : 1,
                    filter: sel ? 'drop-shadow(0 12px 28px rgba(26,35,64,0.15))' : 'drop-shadow(0 2px 6px rgba(0,0,0,0.05))',
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    width: 100,
                    height: 100,
                    objectFit: 'contain',
                  }}
                />
              )}
              <span
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 14,
                  fontWeight: 800,
                  color: sel ? C.red : C.navy,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  borderBottom: sel ? `2px solid ${C.red}` : '2px solid transparent',
                  paddingBottom: 4,
                  transition: 'all 0.3s ease',
                }}
              >
                {opt}
              </span>
            </motion.button>
          );
        })}
      </motion.div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   STEP WRAPPER — animated page container
───────────────────────────────────────────────────────────── */
const stepVariants = {
  initial: { opacity: 0, x: 60, filter: 'blur(8px)' },
  animate: { opacity: 1, x: 0,  filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] } },
  exit:    { opacity: 0, x: -60, filter: 'blur(8px)',
    transition: { duration: 0.35, ease: [0.55, 0, 1, 0.45] } },
};

function StepWrap({ children }) {
  return (
    <motion.div
      variants={stepVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      style={{ width: '100%' }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   NAV BUTTONS
───────────────────────────────────────────────────────────── */
function NavButtons({ onPrev, onNext, nextLabel = 'Next', prevDisabled, nextDisabled, hideNext }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 48, gap: 16, flexWrap: 'wrap' }}>
      <motion.button
        onClick={onPrev}
        disabled={prevDisabled}
        whileHover={!prevDisabled ? { x: -3, scale: 1.02 } : {}}
        whileTap={!prevDisabled ? { scale: 0.97 } : {}}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          padding: '12px 28px',
          borderRadius: 100,
          border: `1.5px solid rgba(26,35,64,0.2)`,
          background: 'transparent',
          color: prevDisabled ? '#ccc' : C.navy,
          fontFamily: 'Inter, sans-serif',
          fontSize: 13,
          fontWeight: 500,
          cursor: prevDisabled ? 'not-allowed' : 'pointer',
          letterSpacing: '0.05em',
          transition: 'all 0.3s ease',
        }}
      >
        <FiChevronLeft size={16} />
        Previous
      </motion.button>

      {!hideNext && (
        <motion.button
          onClick={onNext}
          disabled={nextDisabled}
          whileHover={!nextDisabled ? { scale: 1.04, y: -2 } : {}}
          whileTap={!nextDisabled ? { scale: 0.97 } : {}}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            padding: '14px 36px',
            borderRadius: 100,
            border: 'none',
            background: nextDisabled
              ? '#d0d0d0'
              : `linear-gradient(135deg, ${C.red} 0%, ${C.redLight} 100%)`,
            color: nextDisabled ? '#999' : '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: nextDisabled ? 'not-allowed' : 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: nextDisabled ? 'none' : '0 8px 30px rgba(10,10,10,0.35)',
            transition: 'all 0.3s ease',
          }}
        >
          {nextLabel}
          <FiChevronRight size={16} />
        </motion.button>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION TITLE
───────────────────────────────────────────────────────────── */
function SectionTitle({ emoji, title, subtitle }) {
  return (
    <div style={{ textAlign: 'center', marginBottom: 36 }}>
      {/* Emojis above headings removed per user request */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.1 }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: 'clamp(22px, 3vw, 36px)',
          fontWeight: 800,
          color: C.navy,
          lineHeight: 1.15,
          marginBottom: 10,
        }}
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 15, color: C.textMuted, lineHeight: 1.6 }}
        >
          {subtitle}
        </motion.p>
      )}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.75, delay: 0.3, ease: 'easeOut' }}
        style={{
          width: 64,
          height: 3.5,
          background: '#000000',
          borderRadius: 100,
          margin: '20px auto 0',
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   EVENT PAGE — generic event with service selection
───────────────────────────────────────────────────────────── */
function EventPage({ evtConfig, services, selections, onChange }) {
  return (
    <StepWrap>
      <SectionTitle
        emoji={evtConfig.emoji}
        title={evtConfig.label}
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${services.length}, 1fr)`,
          gap: 50,
          maxWidth: services.length * 210,
          margin: '0 auto',
          '--cols': services.length,
        }}
        className="services-grid"
      >
        {services.map(svc => (
          <ServiceCard
            key={svc.id}
            svc={svc}
            qty={selections[svc.id] || 0}
            onChange={qty => onChange(svc.id, qty)}
          />
        ))}
      </div>
    </StepWrap>
  );
}

/* ─────────────────────────────────────────────────────────────
   FLOATING INPUT — premium form field
───────────────────────────────────────────────────────────── */
function FloatInput({ label, id, type = 'text', value, onChange, icon, required }) {
  const [focused, setFocused] = useState(false);
  const hasVal = value && value.length > 0;
  const isFloat = focused || hasVal || type === 'date';

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <motion.label
        htmlFor={id}
        animate={{
          top: isFloat ? 8 : '50%',
          fontSize: isFloat ? 10 : 13,
          color: focused ? C.red : C.textMuted,
          y: isFloat ? 0 : '-50%',
        }}
        transition={{ duration: 0.2 }}
        style={{
          position: 'absolute',
          left: icon ? 44 : 16,
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          pointerEvents: 'none',
          zIndex: 2,
          transformOrigin: 'left center',
        }}
      >
        {label}{required && ' *'}
      </motion.label>

      {icon && (
        <div style={{
          position: 'absolute',
          left: 14,
          top: '50%',
          transform: 'translateY(-50%)',
          color: focused ? C.red : C.textMuted,
          transition: 'color 0.25s',
          zIndex: 2,
        }}>
          {icon}
        </div>
      )}

      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        autoComplete="off"
        style={{
          width: '100%',
          paddingTop: 24,
          paddingBottom: 10,
          paddingLeft: icon ? 44 : 16,
          paddingRight: 16,
          background: focused ? '#ffffff' : 'rgba(255, 255, 255, 0.75)',
          border: `1.5px solid ${focused ? C.red : 'rgba(26, 35, 64, 0.12)'}`,
          borderRadius: 14,
          fontFamily: 'Inter, sans-serif',
          fontSize: 14,
          fontWeight: 500,
          color: C.navy,
          outline: 'none',
          transition: 'all 0.25s ease',
          boxShadow: focused
            ? '0 8px 24px rgba(10,10,10,0.08), 0 0 0 3px rgba(10,10,10,0.06)'
            : '0 2px 4px rgba(26,35,64,0.01)',
        }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   INVOICE DISPLAY — read-only detailed bill
───────────────────────────────────────────────────────────── */
function InvoiceDisplay({ state, total, invoiceRef }) {
  const subtotal = total;
  // const gst = Math.round(subtotal * 0.18);      // re-enable to add GST
  // const discount = subtotal > 200000 ? Math.round(subtotal * 0.05) : 0;  // re-enable for loyalty discount
  const grand = subtotal;

  const rows = [];

  // Photography type is style only — not priced separately

  for (const ev of EVENT_PAGES) {
    const svcMap = state.events[ev.id] || {};
    for (const svc of EVENT_SERVICES) {
      const qty = svcMap[svc.id] || 0;
      if (qty > 0) {
        rows.push({ cat: ev.label, label: `${svc.label} × ${qty}`, amount: qty * svc.price });
      }
    }
  }

  const optionalEvents = [
    { key: 'sangeeth', label: 'Sangeeth', svcs: SANGEETH_SERVICES, svcState: state.sangeethSvcs },
    { key: 'mehendi',  label: 'Mehendi',  svcs: MEHENDI_SERVICES,  svcState: state.mehendiSvcs  },
    { key: 'cocktail', label: 'Cocktail Party', svcs: COCKTAIL_SERVICES, svcState: state.cocktailSvcs },
  ];
  for (const evt of optionalEvents) {
    if (state[evt.key] === 'yes') {
      for (const svc of evt.svcs) {
        const qty = evt.svcState[svc.id] || 0;
        if (qty > 0) {
          rows.push({ cat: evt.label, label: `${svc.label} × ${qty}`, amount: qty * svc.price });
        }
      }
    }
  }

  if (state.album === 'yes') {
    if (state.albumSelections.pressBook)   rows.push({ cat: 'Albums (Couple)', label: 'Press Book',    amount: PRICING.pressBook });
    if (state.albumSelections.magnumAlbum) rows.push({ cat: 'Albums (Couple)', label: 'Magnum Album',  amount: PRICING.magnumAlbum });
    
    // Traditional Parent Albums
    if (state.traditionalAlbumSelections?.pressBook)   rows.push({ cat: 'Albums (Parents)', label: 'Traditional Press Book',    amount: PRICING.pressBook });
    if (state.traditionalAlbumSelections?.magnumAlbum) rows.push({ cat: 'Albums (Parents)', label: 'Traditional Magnum',  amount: PRICING.magnumAlbum });
  }

  if (state.output) {
    const outMap = { 
      '1month': { l: '1 Month Delivery', p: PRICING.delivery1Month }, 
      '3months': { l: '3 Months Delivery', p: PRICING.delivery3Months },
      '5months': { l: '5 Months Delivery', p: PRICING.delivery5Months } 
    };
    const o = outMap[state.output];
    if (o) {
      if (o.p > 0) rows.push({ cat: 'Output Delivery', label: o.l, amount: o.p });
      else rows.push({ cat: 'Output Delivery', label: o.l + ' (No extra charge)', amount: 0 });
    }
  }

  if (state.preWedding === 'yes' && state.preWeddingPkg) {
    const pkgMap = { basic: PRICING.preWeddingBasic, premium: PRICING.preWeddingPremium, luxury: PRICING.preWeddingLuxury };
    rows.push({ cat: 'Pre-Wedding Shoot', label: `${state.preWeddingPkg.charAt(0).toUpperCase() + state.preWeddingPkg.slice(1)} Package`, amount: pkgMap[state.preWeddingPkg] });
  }

  if (state.romantic === 'yes') {
    const label = state.romanticPkg === 'both' ? 'Pre-Wedding Shoot (Photo & Video)' : 'Pre-Wedding Shoot (Photo Only)';
    const amount = state.romanticPkg === 'both' ? PRICING.romanticBoth : PRICING.romanticPhotoOnly;
    rows.push({ cat: 'Pre-Wedding Shoot', label, amount });
  }

  if (state.shootingStyle) {
    rows.push({ cat: 'Shooting Style', label: state.shootingStyle, amount: 0 });
  }

  return (
    <div
      ref={invoiceRef}
      style={{
        background: '#fff',
        borderRadius: 24,
        padding: 'clamp(24px, 4vw, 48px)',
        maxWidth: 700,
        margin: '0 auto',
        boxShadow: '0 24px 80px rgba(26,35,64,0.18)',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: `2px solid ${C.navy}`, paddingBottom: 24, marginBottom: 28, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 32, fontWeight: 700, color: C.navy, lineHeight: 1 }}>
            RC Wedding Stories
          </div>
          <div style={{ fontSize: 12, color: C.textMuted, marginTop: 4, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Premium Wedding Photography
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 12, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Quotation</div>
          <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, color: C.red, marginTop: 4 }}>
            ESTIMATE
          </div>
          <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>
            {new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })}
          </div>
        </div>
      </div>

      {/* Client Details */}
      {(state.client.bride || state.client.groom) && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 24px', marginBottom: 28, padding: 20, background: C.bg, borderRadius: 14 }}>
          {state.client.bride    && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Bride</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.bride}</strong></div>}
          {state.client.groom    && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Groom</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.groom}</strong></div>}
          {state.client.phone    && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Phone</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.phone}</strong></div>}
          {state.client.email    && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Email</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.email}</strong></div>}
          {state.client.date     && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Wedding Date</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.date}</strong></div>}
          {state.client.location && <div><span style={{ fontSize: 10, color: C.textMuted, textTransform: 'uppercase', letterSpacing: '0.1em' }}>Location</span><br /><strong style={{ color: C.navy, fontSize: 14 }}>{state.client.location}</strong></div>}
        </div>
      )}

      {/* Line items */}
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 28 }}>
        <thead>
          <tr style={{ background: C.navy }}>
            <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '8px 0 0 8px' }}>Category</th>
            <th style={{ padding: '10px 14px', textAlign: 'left', fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Service</th>
            <th style={{ padding: '10px 14px', textAlign: 'right', fontFamily: 'Inter', fontSize: 11, fontWeight: 600, color: '#fff', letterSpacing: '0.1em', textTransform: 'uppercase', borderRadius: '0 8px 8px 0' }}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid rgba(26,35,64,0.07)', background: i % 2 === 0 ? 'transparent' : 'rgba(26,35,64,0.02)' }}>
              <td style={{ padding: '10px 14px', fontSize: 12, color: C.textMuted, fontWeight: 500 }}>{r.cat}</td>
              <td style={{ padding: '10px 14px', fontSize: 13, color: C.navy, fontWeight: 500 }}>{r.label}</td>
              <td style={{ padding: '10px 14px', fontSize: 13, color: r.amount === 0 ? C.textMuted : C.navy, fontFamily: 'Inter, sans-serif', fontWeight: 600, textAlign: 'right' }}>{r.amount === 0 ? '—' : fmt(r.amount)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Totals */}
      <div style={{ borderTop: `2px solid rgba(26,35,64,0.1)`, paddingTop: 20 }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <div style={{ width: 280 }}>
            {/* GST & Discount rows removed — re-add here when needed */}
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', borderTop: `2px solid ${C.navy}` }}>
              <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, color: C.navy }}>Estimated Total</span>
              <span style={{ fontFamily: 'Inter, sans-serif', fontSize: 22, fontWeight: 700, color: C.red }}>{fmt(grand)}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer note */}
      <div style={{ marginTop: 28, padding: '16px 20px', background: `rgba(201,169,110,0.08)`, borderRadius: 12, borderLeft: `3px solid ${C.gold}` }}>
        <p style={{ fontSize: 11, color: C.textMuted, lineHeight: 1.7, margin: 0 }}>
          This is an estimated quotation. Final pricing may vary based on specific requirements.
          A 30% advance booking is required to confirm your date.
          Valid for 30 days from the date of issue.
        </p>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUCCESS OVERLAY
───────────────────────────────────────────────────────────── */
function SuccessOverlay({ onClose }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(26,35,64,0.8)',
        backdropFilter: 'blur(12px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24,
      }}
    >
      <motion.div
        initial={{ scale: 0.7, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 18, delay: 0.1 }}
        style={{
          background: '#fff',
          borderRadius: 28,
          padding: 'clamp(32px, 6vw, 60px)',
          maxWidth: 440,
          width: '100%',
          textAlign: 'center',
          boxShadow: '0 40px 120px rgba(0,0,0,0.4)',
        }}
      >
        {/* Animated checkmark ring */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 250, damping: 14, delay: 0.3 }}
          style={{
            width: 90, height: 90,
            borderRadius: '50%',
            background: `linear-gradient(135deg, ${C.red}, ${C.redLight})`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 24px',
            boxShadow: `0 12px 40px rgba(10,10,10,0.4)`,
          }}
        >
          <FiCheck size={40} color="#fff" strokeWidth={3} />
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 34, fontWeight: 700, color: C.navy, marginBottom: 12 }}
        >
          Quotation Ready! 🎉
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.65 }}
          style={{ fontFamily: 'Inter, sans-serif', fontSize: 14, color: C.textMuted, lineHeight: 1.7, marginBottom: 28 }}
        >
          Your PDF has been downloaded and your details have been sent to our team via WhatsApp. We'll be in touch very soon!
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          onClick={onClose}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '14px 40px',
            borderRadius: 100,
            border: 'none',
            background: `linear-gradient(135deg, ${C.red}, ${C.redLight})`,
            color: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: 13,
            fontWeight: 600,
            cursor: 'pointer',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            boxShadow: '0 8px 30px rgba(10,10,10,0.35)',
          }}
        >
          Start Over
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────────────────────
   MAIN QUOTE COMPONENT
───────────────────────────────────────────────────────────── */
export default function Quote() {
  const [stepIndex,  setStepIndex]  = useState(0);
  const [state,      setState]      = useState(initialState());
  const [showSuccess, setShowSuccess] = useState(false);
  const [pdfLoading,  setPdfLoading]  = useState(false);
  const invoiceRef = useRef(null);

  const total = computeTotal(state);

  // Expose openQuoteBuilder for external buttons
  useEffect(() => {
    window.openQuoteBuilder = () => {
      const el = document.getElementById('quote-builder');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    return () => { delete window.openQuoteBuilder; };
  }, []);

  /* Build dynamic step list (skip conditional steps) */
  const buildFlow = useCallback(() => {
    const flow = [
      'intro',
      'photoType',
      ...EVENT_PAGES.map(e => e.id),
      'sangeethQ',
      ...(state.sangeeth === 'yes' ? ['sangeeth'] : []),
      'mehendiQ',
      ...(state.mehendi === 'yes' ? ['mehendi'] : []),
      'cocktailQ',
      ...(state.cocktail === 'yes' ? ['cocktail'] : []),
      'albumQ',
      ...(state.album === 'yes' ? ['album', 'traditionalAlbum'] : []),
      'output',
      'romanticQ',
      ...(state.romantic === 'yes' ? ['romantic'] : []),
      'shootingStyle',
      'clientDetails',
      'invoice',
    ];
    return flow;
  }, [state.sangeeth, state.mehendi, state.cocktail, state.album, state.romantic]);

  const flow = buildFlow();
  const currentStep = flow[stepIndex] || 'intro';
  const totalSteps = flow.length;

  useEffect(() => {
    if (window.setHideNavbar) {
      window.setHideNavbar(currentStep !== 'intro');
    }
    return () => {
      if (window.setHideNavbar) {
        window.setHideNavbar(false);
      }
    };
  }, [currentStep]);

  const goNext = () => {
    setStepIndex(i => Math.min(i + 1, flow.length - 1));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goPrev = () => {
    setStepIndex(i => Math.max(i - 1, 0));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEventSvc = useCallback((evtId, svcId, qty) => {
    setState(s => ({
      ...s,
      events: {
        ...s.events,
        [evtId]: { ...(s.events[evtId] || {}), [svcId]: qty },
      },
    }));
  }, []);

  const handleSangeethSvc = useCallback((svcId, qty) => {
    setState(s => ({ ...s, sangeethSvcs: { ...s.sangeethSvcs, [svcId]: qty } }));
  }, []);

  const handleMehendiSvc = useCallback((svcId, qty) => {
    setState(s => ({ ...s, mehendiSvcs: { ...s.mehendiSvcs, [svcId]: qty } }));
  }, []);

  const handleCocktailSvc = useCallback((svcId, qty) => {
    setState(s => ({ ...s, cocktailSvcs: { ...s.cocktailSvcs, [svcId]: qty } }));
  }, []);

  /* PDF generation */
  const generatePDF = async (shouldSave = true) => {
    if (!invoiceRef.current) return null;
    setPdfLoading(true);
    try {
      const element = invoiceRef.current;
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        width: element.scrollWidth,
        height: element.scrollHeight,
      });

      const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' });
      const pageW = pdf.internal.pageSize.getWidth();   // 210mm
      const pageH = pdf.internal.pageSize.getHeight();  // 297mm

      const margin = 8; // mm on each side
      const imgW = pageW - margin * 2;
      const imgH = (canvas.height / canvas.width) * imgW;

      if (imgH <= pageH - margin * 2) {
        // Single page — fits cleanly
        pdf.addImage(canvas.toDataURL('image/png'), 'PNG', margin, margin, imgW, imgH);
      } else {
        // Multi-page — slice canvas into A4-height chunks
        const pageContentH = pageH - margin * 2; // printable height per page in mm
        const pxPerMm = canvas.width / imgW;     // canvas pixels per mm
        const pageContentPx = pageContentH * pxPerMm;
        let yOffset = 0;

        while (yOffset < canvas.height) {
          const sliceH = Math.min(pageContentPx, canvas.height - yOffset);
          const sliceCanvas = document.createElement('canvas');
          sliceCanvas.width = canvas.width;
          sliceCanvas.height = sliceH;
          sliceCanvas.getContext('2d').drawImage(canvas, 0, -yOffset);

          const sliceImgH = (sliceH / canvas.width) * imgW;
          pdf.addImage(sliceCanvas.toDataURL('image/png'), 'PNG', margin, margin, imgW, sliceImgH);
          yOffset += sliceH;
          if (yOffset < canvas.height) pdf.addPage();
        }
      }

      if (shouldSave === true || typeof shouldSave !== 'boolean') {
        pdf.save('Wedding-Quotation-RC.pdf');
      }

      const blob = pdf.output('blob');
      setPdfLoading(false);
      return blob;
    } catch (e) {
      console.error('PDF error:', e);
      setPdfLoading(false);
      return null;
    }
  };

  /* Upload PDF to file host and return a public download URL */
  const uploadPDF = async (blob) => {
    if (!blob) return null;

    // Primary: GoFile.io — reliable, CORS-friendly, free
    try {
      // 1. Get the best upload server
      const serversRes = await fetch('https://api.gofile.io/servers');
      const serversData = await serversRes.json();
      const server = serversData.data?.servers?.[0]?.name;
      if (!server) throw new Error('No GoFile server available');

      // 2. Upload the PDF
      const formData = new FormData();
      formData.append('file', blob, 'Wedding-Quotation-RC.pdf');
      const uploadRes = await fetch(`https://${server}.gofile.io/uploadFile`, {
        method: 'POST',
        body: formData,
      });
      const uploadData = await uploadRes.json();
      if (uploadData.status === 'ok' && uploadData.data?.downloadPage) {
        return uploadData.data.downloadPage;
      }
    } catch (err) {
      console.warn('GoFile.io upload failed, trying fallback:', err);
    }

    // Fallback: tmpfiles.org
    try {
      const formData = new FormData();
      formData.append('file', blob, 'Wedding-Quotation-RC.pdf');
      const response = await fetch('https://tmpfiles.org/api/v1/upload', {
        method: 'POST',
        body: formData,
      });
      const result = await response.json();
      if (result.status === 'success' && result.data?.url) {
        return result.data.url.replace('tmpfiles.org/', 'tmpfiles.org/dl/');
      }
    } catch (err) {
      console.warn('tmpfiles.org upload also failed:', err);
    }

    return null;
  };

  /* Done handler — 15-sec countdown loading screen, PDF + GoFile upload, then WhatsApp with link */
  const handleDone = async () => {
    setPdfLoading(true);

    // ── Build base WhatsApp message text (synchronous) ──
    const c = state.client;
    const name = [c.bride, c.groom].filter(Boolean).join(' & ') || 'Valued Client';
    const coupleAlbs = state.album === 'yes'
      ? (Object.keys(state.albumSelections).filter(k => state.albumSelections[k]).map(k => k === 'pressBook' ? 'Press Book' : 'Magnum Album').join(', ') || 'None')
      : 'No';
    const parentAlbs = state.album === 'yes'
      ? (Object.keys(state.traditionalAlbumSelections || {}).filter(k => state.traditionalAlbumSelections[k]).map(k => k === 'pressBook' ? 'Press Book' : 'Magnum').join(', ') || 'None')
      : 'No';
    const outputText = state.output === '1month' ? '1 Month' : state.output === '3months' ? '3 Months' : state.output === '5months' ? '5 Months' : 'Not selected';

    const baseMsg =
      `*Wedding Quotation — RC Wedding Stories*\n\n` +
      `*Couple:* ${name}\n` +
      `*Phone:* ${c.phone || 'N/A'}\n` +
      `*Email:* ${c.email || 'N/A'}\n` +
      `*Wedding Date:* ${c.date || 'TBD'}\n` +
      `*Location:* ${c.location || 'N/A'}\n\n` +
      `*Photography:* ${state.photoType === 'candid' ? 'Candid' : state.photoType === 'traditional' ? 'Traditional' : state.photoType === 'drone' ? 'Drone' : 'Not selected'}\n` +
      `*Shooting Style:* ${state.shootingStyle || 'Not selected'}\n` +
      `*Events:* ${EVENT_PAGES.filter(e => Object.values(state.events[e.id] || {}).some(v => v > 0)).map(e => e.label).join(', ') || 'None'}\n` +
      `*Sangeeth:* ${state.sangeeth === 'yes' ? 'Yes' : 'No'}\n` +
      `*Mehendi:* ${state.mehendi === 'yes' ? 'Yes' : 'No'}\n` +
      `*Cocktail:* ${state.cocktail === 'yes' ? 'Yes' : 'No'}\n` +
      `*Albums (Couple):* ${coupleAlbs}\n` +
      `*Albums (Parents):* ${parentAlbs}\n` +
      `*Pre-Wedding Shoot:* ${state.romantic === 'yes' ? (state.romanticPkg === 'both' ? 'Photo & Video' : 'Photo Only') : 'No'}\n` +
      `*Delivery:* ${outputText}\n\n` +
      `*Estimated Total: ${fmt(total)}*\n\n` +
      `I would like to discuss my wedding photography package.`;

    // ── Open blank window SYNCHRONOUSLY (before any await — bypass popup blocker) ──
    const waWindow = window.open('', '_blank');
    if (waWindow) {
      const loadingHTML = `<!DOCTYPE html><html><head><title>RC Wedding Stories</title>
<meta name="viewport" content="width=device-width,initial-scale=1">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box;}
body{width:100vw;height:100vh;display:flex;align-items:center;justify-content:center;overflow:hidden;background:#0d0d1a;}
.slides{position:fixed;inset:0;z-index:0;}
.slide{position:absolute;inset:0;background-size:cover;background-position:center;filter:blur(14px) brightness(0.35) saturate(1.2);opacity:0;transform:scale(1.08);animation:fade 20s infinite;}
.slide:nth-child(1){background-image:url('https://images.unsplash.com/photo-1519225421980-715cb0215aed?w=1600&q=70');animation-delay:0s;}
.slide:nth-child(2){background-image:url('https://images.unsplash.com/photo-1537633552985-df8429e8048b?w=1600&q=70');animation-delay:5s;}
.slide:nth-child(3){background-image:url('https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=1600&q=70');animation-delay:10s;}
.slide:nth-child(4){background-image:url('https://images.unsplash.com/photo-1591604466107-ec97de577aff?w=1600&q=70');animation-delay:15s;}
@keyframes fade{0%{opacity:0;transform:scale(1.08)}5%{opacity:1;transform:scale(1)}25%{opacity:1;transform:scale(1)}30%{opacity:0;transform:scale(1.08)}100%{opacity:0}}
.overlay{position:fixed;inset:0;z-index:1;background:radial-gradient(ellipse at center,rgba(0,0,0,0.2) 0%,rgba(0,0,0,0.55) 100%);}
.card{position:relative;z-index:10;background:rgba(255,255,255,0.07);backdrop-filter:blur(32px);-webkit-backdrop-filter:blur(32px);border:1px solid rgba(255,255,255,0.14);border-radius:32px;padding:44px 52px;text-align:center;width:420px;max-width:92vw;box-shadow:0 40px 100px rgba(0,0,0,0.5),inset 0 1px 0 rgba(255,255,255,0.1);}
.logo{font-family:'Cormorant Garamond',serif;font-size:11px;font-weight:700;color:rgba(255,255,255,0.4);letter-spacing:0.25em;text-transform:uppercase;margin-bottom:24px;}
.ring{font-size:48px;margin-bottom:20px;display:block;animation:bounce 1.6s ease-in-out infinite alternate;}
@keyframes bounce{from{transform:translateY(0) rotate(-5deg)}to{transform:translateY(-12px) rotate(5deg)}}
h2{font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:700;color:#fff;margin-bottom:8px;line-height:1.2;}
.sub{font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:32px;}
.sub strong{color:rgba(255,255,255,0.9);}
.timer-wrap{position:relative;width:114px;height:114px;margin:0 auto 20px;}
.t-svg{width:114px;height:114px;transform:rotate(-90deg);}
.t-bg{fill:none;stroke:rgba(255,255,255,0.1);stroke-width:6;}
.t-fill{fill:none;stroke:#0a0a0a;stroke-width:6;stroke-linecap:round;stroke-dasharray:328;stroke-dashoffset:0;transition:stroke-dashoffset 1s linear;filter:drop-shadow(0 0 6px rgba(10,10,10,0.6));}
.t-num{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);font-family:'Inter',sans-serif;font-size:36px;font-weight:700;color:#fff;}
.status{font-family:'Inter',sans-serif;font-size:11px;color:rgba(255,255,255,0.4);letter-spacing:0.15em;text-transform:uppercase;margin-bottom:28px;}
.dots{display:flex;gap:7px;justify-content:center;}
.dot{width:7px;height:7px;border-radius:50%;background:rgba(255,255,255,0.2);transition:all 0.5s ease;}
.dot.on{background:#0a0a0a;transform:scale(1.3);box-shadow:0 0 8px rgba(10,10,10,0.6);}
.divider{width:40px;height:1px;background:rgba(255,255,255,0.15);margin:0 auto 24px;}
</style></head><body>
<div class="slides">
  <div class="slide"></div><div class="slide"></div><div class="slide"></div><div class="slide"></div>
</div>
<div class="overlay"></div>
<div class="card">
  <div class="logo">RC Wedding Stories</div>
  <span class="ring">💍</span>
  <h2>Preparing Your Quotation</h2>
  <div class="divider"></div>
  <p class="sub">Generating your PDF and uploading it securely.<br>Redirecting to WhatsApp in <strong id="sec">15</strong> seconds...</p>
  <div class="timer-wrap">
    <svg class="t-svg" viewBox="0 0 114 114">
      <circle class="t-bg" cx="57" cy="57" r="52"/>
      <circle class="t-fill" id="arc" cx="57" cy="57" r="52"/>
    </svg>
    <div class="t-num" id="num">15</div>
  </div>
  <div class="status" id="status">Generating PDF...</div>
  <div class="dots">
    <div class="dot on" id="d0"></div>
    <div class="dot" id="d1"></div>
    <div class="dot" id="d2"></div>
    <div class="dot" id="d3"></div>
  </div>
</div>
<script>
var t=15,arc=document.getElementById('arc'),num=document.getElementById('num'),sec=document.getElementById('sec'),st=document.getElementById('status');
var full=2*Math.PI*52;arc.style.strokeDasharray=full;arc.style.strokeDashoffset=0;
var dots=[0,1,2,3],di=0;
var dv=setInterval(function(){document.getElementById('d'+dots[di]).classList.remove('on');di=(di+1)%4;document.getElementById('d'+dots[di]).classList.add('on');},5000);
var iv=setInterval(function(){t--;num.textContent=t;sec.textContent=t;arc.style.strokeDashoffset=full*(15-t)/15;if(t<=8)st.textContent='Uploading PDF...';if(t<=2)st.textContent='Opening WhatsApp...';if(t<=0){clearInterval(iv);clearInterval(dv);}},1000);
<\/script>
</body></html>`;
      waWindow.document.write(loadingHTML);
      waWindow.document.close();
    }

    // ── In parallel: generate PDF + upload to get a shareable link ──
    let pdfUrl = null;
    try {
      const pdfBlob = await generatePDF(true); // also saves to device
      if (pdfBlob) pdfUrl = await uploadPDF(pdfBlob);
    } catch (e) {
      console.warn('PDF/upload failed:', e);
    }

    // ── Build final message with PDF link if available ──
    const finalMsg = pdfUrl
      ? baseMsg + `\n\n*Download Quote PDF:* ${pdfUrl}`
      : baseMsg;

    // ── Navigate the pre-opened window to founder's WhatsApp ──
    const waUrl = `https://wa.me/${FOUNDER_WHATSAPP}?text=${encodeURIComponent(finalMsg)}`;
    if (waWindow && !waWindow.closed) {
      waWindow.location.href = waUrl;
    } else {
      window.open(waUrl, '_blank');
    }

    // ── Show success overlay ──
    setShowSuccess(true);
    setPdfLoading(false);
  };

  /* ── RENDER STEP ── */
  const renderStep = () => {
    switch (currentStep) {

      /* ════════════════════════════════════════════════
         INTRO
      ════════════════════════════════════════════════ */
      case 'intro': return (
        /* SPLIT HERO INTRO */
        <motion.div
          variants={stepVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          style={{ width: '100%' }}
        >
          {/* TOP HALF: Full-width cinematic image */}
          <div style={{
            position: 'relative',
            width: '100%',
            height: '55vh',
            minHeight: 300,
            overflow: 'hidden',
            borderRadius: '0 0 32px 32px',
          }}>
            <motion.img
              src="https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454187/IMG_7504.JPG_ifsymp.jpg"
              alt="RC Wedding Stories — Beautiful wedding moment"
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.4, ease: [0.25, 0.46, 0.45, 0.94] }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center 30%',
                display: 'block',
              }}
            />
            {/* Bottom fade to cream */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.12) 0%, rgba(10,10,10,0) 40%, rgba(255,255,255,0.15) 80%, rgba(255,255,255,1) 100%)',
              pointerEvents: 'none',
            }} />
            {/* Floating pill badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              style={{
                position: 'absolute',
                bottom: 36,
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'rgba(255,255,255,0.18)',
                backdropFilter: 'blur(18px)',
                WebkitBackdropFilter: 'blur(18px)',
                border: '1px solid rgba(255,255,255,0.45)',
                borderRadius: 100,
                padding: '9px 26px',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 500,
                color: '#fff',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
                boxShadow: '0 4px 24px rgba(0,0,0,0.25)',
              }}
            >
              Premium Wedding Photography
            </motion.div>
          </div>

          {/* BOTTOM HALF: Intro content */}
          <div style={{
            textAlign: 'center',
            maxWidth: 1100,
            margin: '0 auto',
            padding: 'clamp(36px, 5vw, 60px) clamp(16px, 4vw, 40px) clamp(24px, 3vw, 40px)',
          }}>
            {/* ── INTRO FEATURES GRID ── */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '40px 32px',
                marginTop: 20,
                marginBottom: 60,
                textAlign: 'center',
              }}
            >
              {[
                {
                  title: 'Watch Our Quick Video',
                  desc: 'Discover our services, including candid photography, traditional photography, albums, and more.',
                },
                {
                  title: 'Build Your Quote',
                  desc: 'Select what you love and see instant pricing with a real-time quote that updates as you make your selections.',
                },
                {
                  title: 'Seal The Deal And Save The Date',
                  desc: 'Enter your details to receive a personalized quote via email, connect with our team to finalize the details, and reserve your spot with a 30% deposit to secure your special day.',
                }
              ].map((feat) => (
                <div
                  key={feat.title}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: '0 10px',
                  }}
                >
                  <h3 style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(19px, 1.8vw, 22px)',
                    fontWeight: 600,
                    color: C.navy,
                    marginBottom: 12,
                    lineHeight: 1.3,
                    letterSpacing: '0.02em',
                  }}>
                    {feat.title}
                  </h3>
                  <p style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 'clamp(12.5px, 1.2vw, 13.5px)',
                    color: C.textMuted,
                    lineHeight: 1.65,
                    margin: 0,
                    maxWidth: 320,
                  }}>
                    {feat.desc}
                  </p>
                </div>
              ))}
            </motion.div>

            <div style={{ maxWidth: 660, margin: '0 auto' }}>
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.15 }}
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(28px, 4.5vw, 52px)',
                  fontWeight: 700,
                  color: C.navy,
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}
              >
                How Much To Shoot<br/>
                <span style={{ color: C.red, fontWeight: 700 }}>My Wedding?</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(14px, 2vw, 17px)',
                  color: C.textMuted,
                  lineHeight: 1.7,
                  marginBottom: 40,
                }}
              >
                Let's estimate the cost by selecting the Events,<br />
                Albums & Output duration!
              </motion.p>

              {/* Feature pills */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 40 }}
              >
                {['Live Pricing', 'PDF Quote', 'WhatsApp Ready', 'No Signup'].map(t => (
                  <span key={t} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '7px 16px',
                    borderRadius: 100,
                    border: `1px solid ${C.glassBorder}`,
                    background: C.glass,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    fontFamily: 'Inter, sans-serif',
                    fontSize: 12,
                    fontWeight: 500,
                    color: C.navy,
                    letterSpacing: '0.05em',
                  }}>
                    <FiStar size={11} color={C.gold} /> {t}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.button
              initial={{ opacity: 0, scale: 0.88 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, type: 'spring', stiffness: 200 }}
              onClick={goNext}
              whileHover={{ scale: 1.06, y: -3 }}
              whileTap={{ scale: 0.97 }}
              style={{
                padding: '18px 52px',
                borderRadius: 100,
                border: 'none',
                background: `linear-gradient(135deg, ${C.red} 0%, ${C.redLight} 100%)`,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 14,
                fontWeight: 700,
                cursor: 'pointer',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                boxShadow: `0 16px 50px rgba(10,10,10,0.4)`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
              }}
            >
              <FiCheck size={16} />
              Get Started
            </motion.button>

            {/* ── INTRO PHOTO GRID ── */}
            <div style={{ marginTop: 100, borderTop: '1px solid rgba(26,35,64,0.06)', paddingTop: 60 }}>
              <div style={{ marginBottom: 40 }}>
                <span style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 14,
                  fontWeight: 600,
                  color: C.red,
                  letterSpacing: '0.25em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: 8
                }}>
                  Captured Forever
                </span>
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(24px, 3.5vw, 42px)',
                  fontWeight: 700,
                  color: C.navy,
                  margin: 0,
                  lineHeight: 1.2
                }}>
                  Moments of Pure Magic
                </h2>
              </div>

              {/* Masonry / Column Grid */}
              <div style={{
                columnGap: '24px',
                width: '100%',
              }}
              className="intro-photo-masonry"
              >
                {[
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454200/IMG_7505.JPG_dadpjm.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454194/IMG_7508.JPG_rszuxv.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779456284/IMG_7491.JPG_m79gzc.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779456301/IMG_7493.JPG_pzyghh.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779456267/IMG_7489.JPG_bf2lbv.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454212/IMG_7512.JPG_fwnzyu.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454201/IMG_7509.JPG_hps8wp.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454209/IMG_7514.JPG_tfsbw3.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454187/IMG_7504.JPG_ifsymp.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454188/IMG_7500_aocokv.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454193/IMG_7507.JPG_iqysfw.jpg",
                  "https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_800/v1779454225/IMG_7498_rkswac.jpg",
                  "https://images.unsplash.com/photo-1519741497674-611481863552?w=600&q=80",
                  "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=600&q=80",
                  "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600&q=80",
                  "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=600&q=80",
                  "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=600&q=80",
                  "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=600&q=80",
                  "https://images.unsplash.com/photo-1507504038482-7621c97a0e5b?w=600&q=80",
                  "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=600&q=80"
                ].map((url, i) => (
                  <motion.div
                    key={url}
                    initial={{ opacity: 0, y: 70, scale: 0.88, rotate: i % 2 === 0 ? 1.5 : -1.5, filter: 'blur(3px)' }}
                    whileInView={{ opacity: 1, y: 0, scale: 1, rotate: 0, filter: 'blur(0px)' }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{
                      type: 'spring',
                      stiffness: 70,
                      damping: 15,
                      delay: Math.min(i * 0.04, 0.4)
                    }}
                    variants={{
                      hover: {
                        scale: 1.03,
                        y: -10,
                        boxShadow: '0 25px 50px rgba(26, 35, 64, 0.15), 0 0 30px rgba(10,10,10, 0.1)',
                        borderColor: 'rgba(10,10,10,0.25)',
                      }
                    }}
                    whileHover="hover"
                    style={{
                      breakInside: 'avoid',
                      marginBottom: '24px',
                      overflow: 'hidden',
                      borderRadius: 20,
                      border: '1px solid rgba(255,255,255,0.45)',
                      boxShadow: '0 10px 30px rgba(26,35,64,0.04)',
                      cursor: 'pointer',
                      background: '#fff',
                    }}
                  >
                    <motion.img
                      src={url}
                      alt="Wedding story candid"
                      loading="lazy"
                      variants={{
                        hover: { scale: 1.08 }
                      }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      style={{
                        width: '100%',
                        height: 'auto',
                        display: 'block',
                      }}
                    />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      );

      /* ════════════════════════════════════════════════
         PHOTO TYPE
      ════════════════════════════════════════════════ */
      case 'photoType': return (
        <StepWrap>
          <SectionTitle
            emoji="📸"
            title="What Photography Do You Want?"
            subtitle="Choose your primary photography style"
          />
          <div style={{
            display: 'flex',
            gap: 24,
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { id: 'candid',       label: 'Candid Photography',      desc: 'Natural, unposed, storytelling shots',     img: '/cameras/candid_photo.png' },
              { id: 'traditional',  label: 'Traditional Photography', desc: 'Classic posed, formal wedding photos',       img: '/cameras/traditional_photo.png' },
              { id: 'drone',        label: 'Drone Photography',        desc: 'Aerial landscape & venue photography',       img: '/cameras/drone.png' },
            ].map(opt => (
              <motion.div
                key={opt.id}
                onClick={() => setState(s => ({ ...s, photoType: opt.id }))}
                whileHover={{ y: -8, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 280, damping: 18 }}
                style={{
                  position: 'relative',
                  width: 'clamp(180px, 28vw, 270px)',
                  padding: '36px 28px',
                  borderRadius: 24,
                  border: state.photoType === opt.id ? `2px solid ${C.red}` : `2px solid ${C.glassBorder}`,
                  background: state.photoType === opt.id
                    ? `linear-gradient(135deg, rgba(10,10,10,0.07), rgba(10,10,10,0.02))`
                    : C.glass,
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  cursor: 'pointer',
                  textAlign: 'center',
                  boxShadow: state.photoType === opt.id
                    ? `0 0 40px rgba(10,10,10,0.2), ${C.shadowHover}`
                    : C.shadow,
                  transition: 'border 0.3s, box-shadow 0.3s, background 0.3s',
                }}
              >
                <AnimatePresence>
                  {state.photoType === opt.id && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      style={{
                        position: 'absolute', top: 14, right: 14,
                        width: 28, height: 28, borderRadius: '50%',
                        background: C.red,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <FiCheck size={14} color="#fff" strokeWidth={3} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <motion.div
                  animate={{ scale: state.photoType === opt.id ? 1.12 : 1 }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: 100,
                    width: '100%',
                    overflow: 'visible',
                    marginBottom: 16,
                  }}
                >
                  <img
                    src={opt.img}
                    alt={opt.label}
                    style={{
                      height: '100%',
                      maxWidth: '100%',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.06))',
                    }}
                  />
                </motion.div>
                <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 20, fontWeight: 700, color: state.photoType === opt.id ? C.red : C.navy, marginBottom: 8 }}>
                  {opt.label}
                </div>
                <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 12, color: C.textMuted, marginBottom: 14, lineHeight: 1.5 }}>
                  {opt.desc}
                </div>

              </motion.div>
            ))}
          </div>
          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.photoType}
            prevDisabled={stepIndex === 0}
          />
          <ShootInfoCard step="photoType" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         STANDARD EVENT PAGES
      ════════════════════════════════════════════════ */
      case 'engagement':
      case 'pellikoduku':
      case 'groomHaldi':
      case 'pellikuthuru':
      case 'brideHaldi':
      case 'reception':
      case 'bigDay':
      case 'vratham': {
        const evtConfig = EVENT_PAGES.find(e => e.id === currentStep);
        return (
          <StepWrap>
            <EventPage
              evtConfig={evtConfig}
              services={EVENT_SERVICES}
              selections={state.events[currentStep] || {}}
              onChange={(svcId, qty) => handleEventSvc(currentStep, svcId, qty)}
            />
            <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
            <ShootInfoCard step={currentStep} />
          </StepWrap>
        );
      }

      /* ════════════════════════════════════════════════
         SANGEETH QUESTION
      ════════════════════════════════════════════════ */
      case 'sangeethQ': return (
        <StepWrap>
          <YesNoChoice
            question="Do We Have Sangeeth?"
            value={state.sangeeth}
            onChange={v => { setState(s => ({ ...s, sangeeth: v })); if (v === 'no') setTimeout(goNext, 350); }}
          />
          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.sangeeth}
            prevDisabled={stepIndex === 0}
          />
          <ShootInfoCard step="sangeethQ" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         SANGEETH PAGE
      ════════════════════════════════════════════════ */
      case 'sangeeth': return (
        <StepWrap>
          <EventPage
            evtConfig={{ id: 'sangeeth', label: 'Sangeeth Night', emoji: '🎶', color: C.red }}
            services={SANGEETH_SERVICES}
            selections={state.sangeethSvcs}
            onChange={handleSangeethSvc}
          />
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="sangeeth" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         MEHENDI QUESTION
      ════════════════════════════════════════════════ */
      case 'mehendiQ': return (
        <StepWrap>
          <YesNoChoice
            question="Do We Have Mehendi?"
            value={state.mehendi}
            onChange={v => { setState(s => ({ ...s, mehendi: v })); if (v === 'no') setTimeout(goNext, 350); }}
          />
          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.mehendi}
            prevDisabled={stepIndex === 0}
          />
          <ShootInfoCard step="mehendiQ" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         MEHENDI PAGE
      ════════════════════════════════════════════════ */
      case 'mehendi': return (
        <StepWrap>
          <EventPage
            evtConfig={{ id: 'mehendi', label: 'Mehendi Ceremony', emoji: '🌿', color: '#4caf50' }}
            services={MEHENDI_SERVICES}
            selections={state.mehendiSvcs}
            onChange={handleMehendiSvc}
          />
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="mehendi" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         COCKTAIL QUESTION
      ════════════════════════════════════════════════ */
      case 'cocktailQ': return (
        <StepWrap>
          <YesNoChoice
            question="Do We Have Cocktail?"
            value={state.cocktail}
            onChange={v => { setState(s => ({ ...s, cocktail: v })); if (v === 'no') setTimeout(goNext, 350); }}
          />
          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.cocktail}
            prevDisabled={stepIndex === 0}
          />
          <ShootInfoCard step="cocktailQ" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         COCKTAIL PAGE
      ════════════════════════════════════════════════ */
      case 'cocktail': return (
        <StepWrap>
          <EventPage
            evtConfig={{ id: 'cocktail', label: 'Cocktail Party', emoji: '🥂', color: '#7ec8e3' }}
            services={COCKTAIL_SERVICES}
            selections={state.cocktailSvcs}
            onChange={handleCocktailSvc}
          />
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="cocktail" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         ALBUM QUESTION
      ════════════════════════════════════════════════ */
      case 'albumQ': return (
        <StepWrap>
          <YesNoChoice
            question="Do You Need Albums?"
            value={state.album}
            onChange={v => { setState(s => ({ ...s, album: v })); if (v === 'no') setTimeout(goNext, 350); }}
          />
          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.album}
            prevDisabled={stepIndex === 0}
          />
          <ShootInfoCard step="albumQ" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         ALBUM SELECTION
      ════════════════════════════════════════════════ */
      case 'album': return (
        <StepWrap>
          <SectionTitle title="Candid Album" subtitle="Select the album types you'd like" />
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'pressBook',    label: 'Press Book',    price: PRICING.pressBook,    desc: 'Elegant printed photo book with lay-flat pages', img: '/press_book_album.png' },
              { id: 'magnumAlbum',  label: 'Magnum Album',  price: PRICING.magnumAlbum,  desc: 'Luxury flush-mount album with premium leather cover', img: '/magnum_album.png' },
            ].map(alb => {
              const sel = !!state.albumSelections[alb.id];
              return (
                <motion.div
                  key={alb.id}
                  onClick={() => setState(s => ({ ...s, albumSelections: { ...s.albumSelections, [alb.id]: !sel } }))}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: 'clamp(200px, 36vw, 260px)',
                    padding: '24px 20px',
                    borderRadius: 22,
                    border: sel ? `2px solid ${C.red}` : `2px solid ${C.glassBorder}`,
                    background: sel ? `linear-gradient(135deg, rgba(10,10,10,0.07), rgba(10,10,10,0.02))` : C.glass,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: sel ? `0 0 40px rgba(10,10,10,0.18), ${C.shadow}` : C.shadow,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AnimatePresence>
                    {sel && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        <FiCheck size={13} color="#fff" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <img src={alb.img} alt={alb.label} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 10 }} />
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: sel ? C.red : C.navy, marginBottom: 8 }}>{alb.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.textMuted, lineHeight: 1.5, marginBottom: 14 }}>{alb.desc}</div>
                  
                  {sel ? (
                    <div style={{
                      background: C.navy,
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: 8,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      position: 'relative',
                      display: 'inline-block',
                      marginTop: 10,
                      boxShadow: '0 8px 20px rgba(26,35,64,0.18)',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${C.navy}`,
                      }} />
                      {fmt(alb.price)}
                    </div>
                  ) : (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: 16 }}>
                      <div style={{
                        position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${C.navy}`,
                      }} />
                      <div style={{
                        background: C.navy, color: '#fff',
                        padding: '8px 18px', borderRadius: 8,
                        fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                        boxShadow: '0 6px 18px rgba(26,35,64,0.18)',
                      }}>{fmt(alb.price)}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="album" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         TRADITIONAL ALBUM SELECTION (PARENTS)
      ════════════════════════════════════════════════ */
      case 'traditionalAlbum': return (
        <StepWrap>
          <SectionTitle title="Traditional Album" subtitle="For Amma Nanna!" />
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'pressBook',    label: 'Press Book',    price: PRICING.pressBook,    desc: 'Elegant printed photo parent book with lay-flat pages', img: '/press_book_album.png' },
              { id: 'magnumAlbum',  label: 'Magnum',  price: PRICING.magnumAlbum,  desc: 'Luxury traditional Parent album box packaging', img: '/magnum_album.png' },
            ].map(alb => {
              const sel = !!state.traditionalAlbumSelections?.[alb.id];
              return (
                <motion.div
                  key={alb.id}
                  onClick={() => setState(s => ({ ...s, traditionalAlbumSelections: { ...(s.traditionalAlbumSelections || {}), [alb.id]: !sel } }))}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: 'clamp(200px, 36vw, 260px)',
                    padding: '24px 20px',
                    borderRadius: 22,
                    border: sel ? `2px solid ${C.red}` : `2px solid ${C.glassBorder}`,
                    background: sel ? `linear-gradient(135deg, rgba(10,10,10,0.07), rgba(10,10,10,0.02))` : C.glass,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: sel ? `0 0 40px rgba(10,10,10,0.18), ${C.shadow}` : C.shadow,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AnimatePresence>
                    {sel && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ position: 'absolute', top: 14, right: 14, width: 26, height: 26, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
                        <FiCheck size={13} color="#fff" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                    <img src={alb.img} alt={alb.label} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain', borderRadius: 10 }} />
                  </div>
                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 700, color: sel ? C.red : C.navy, marginBottom: 8 }}>{alb.label}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.textMuted, lineHeight: 1.5, marginBottom: 14 }}>{alb.desc}</div>
                  
                  {sel ? (
                    <div style={{
                      background: C.navy,
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: 8,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      position: 'relative',
                      display: 'inline-block',
                      marginTop: 10,
                      boxShadow: '0 8px 20px rgba(26,35,64,0.18)',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${C.navy}`,
                      }} />
                      {fmt(alb.price)}
                    </div>
                  ) : (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: 16 }}>
                      <div style={{
                        position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${C.navy}`,
                      }} />
                      <div style={{
                        background: C.navy, color: '#fff',
                        padding: '8px 18px', borderRadius: 8,
                        fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                        boxShadow: '0 6px 18px rgba(26,35,64,0.18)',
                      }}>{fmt(alb.price)}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="album" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         OUTPUT DELIVERY
      ════════════════════════════════════════════════ */
      case 'output': return (
        <StepWrap>
          <SectionTitle title="Tell Us, When You Want Your Output? (Post Production)" subtitle="Faster delivery requires additional processing" />
          <div style={{ display: 'flex', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: '1month',  label: '1 Month',   num: '1', extra: PRICING.delivery1Month,  desc: 'Rush delivery — priority editing' },
              { id: '5months', label: '5 Months',  num: '5', extra: PRICING.delivery5Months, desc: 'Regular delivery' },
            ].map(opt => {
              const sel = state.output === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  onClick={() => setState(s => ({ ...s, output: opt.id }))}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: 'clamp(160px, 26vw, 220px)',
                    padding: '28px 20px',
                    borderRadius: 20,
                    border: sel ? `2px solid ${C.red}` : `2px solid ${C.glassBorder}`,
                    background: sel ? `linear-gradient(135deg, rgba(10,10,10,0.07), rgba(10,10,10,0.02))` : C.glass,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: sel ? `0 0 32px rgba(10,10,10,0.18), ${C.shadow}` : C.shadow,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AnimatePresence>
                    {sel && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ position: 'absolute', top: 12, right: 12, width: 24, height: 24, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCheck size={12} color="#fff" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  {/* Dark metallic number circle */}
                  <div style={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #3a3f4e, #1a1f2e)',
                    boxShadow: '0 6px 24px rgba(0,0,0,0.28), inset 0 1px 2px rgba(255,255,255,0.12), 0 0 0 4px rgba(255,255,255,0.85), 0 0 0 6px rgba(26,35,64,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    flexShrink: 0,
                  }}>
                    <span style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 36,
                      fontWeight: 900,
                      color: '#ffffff',
                      lineHeight: 1,
                      letterSpacing: '-0.02em',
                    }}>{opt.num}</span>
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: sel ? C.red : C.navy, marginBottom: 6 }}>
                    <span style={{ fontFamily: 'Inter, sans-serif' }}>{opt.num}</span>
                    <span style={{ fontFamily: 'Cormorant Garamond, serif' }}>{opt.id === '1month' ? ' Month' : ' Months'}</span>
                  </div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.textMuted, lineHeight: 1.5, marginBottom: 12 }}>{opt.desc}</div>
                  
                  {sel ? (
                    <div style={{
                      background: C.navy,
                      color: '#fff',
                      padding: '8px 18px',
                      borderRadius: 8,
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 14,
                      fontWeight: 700,
                      position: 'relative',
                      display: 'inline-block',
                      marginTop: 10,
                      boxShadow: '0 8px 20px rgba(26,35,64,0.18)',
                    }}>
                      <div style={{
                        position: 'absolute',
                        top: -6,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 0,
                        height: 0,
                        borderLeft: '6px solid transparent',
                        borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${C.navy}`,
                      }} />
                      {opt.extra > 0 ? `+${fmt(opt.extra)}` : 'No Extra Fee'}
                    </div>
                  ) : (
                    <div style={{ position: 'relative', display: 'inline-block', marginTop: 16 }}>
                      <div style={{
                        position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                        width: 0, height: 0,
                        borderLeft: '6px solid transparent', borderRight: '6px solid transparent',
                        borderBottom: `6px solid ${opt.extra > 0 ? C.navy : '#16a34a'}`,
                      }} />
                      <div style={{
                        background: opt.extra > 0 ? C.navy : '#16a34a', color: '#fff',
                        padding: '8px 18px', borderRadius: 8,
                        fontFamily: "'Inter', sans-serif", fontSize: 14, fontWeight: 700,
                        boxShadow: opt.extra > 0 ? '0 6px 18px rgba(26,35,64,0.18)' : '0 6px 18px rgba(22,163,74,0.25)',
                      }}>{opt.extra > 0 ? `+${fmt(opt.extra)}` : 'No Extra Fee'}</div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} nextDisabled={!state.output} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="output" />
        </StepWrap>
      );


      case 'romanticQ': return (
        <StepWrap>
          <YesNoChoice
            question="Do You Need Pre Wedding Shoot?"
            value={state.romantic}
            onChange={v => { setState(s => ({ ...s, romantic: v })); if (v === 'no') setTimeout(goNext, 350); }}
          />
          <NavButtons onPrev={goPrev} onNext={goNext} nextDisabled={!state.romantic} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="romanticQ" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         ROMANTIC PAGE
      ════════════════════════════════════════════════ */
      case 'romantic': return (
        <StepWrap>
          <SectionTitle title="Pre Wedding Shoot" subtitle="An intimate session to capture your chemistry" />
          <div style={{ display: 'flex', gap: 40, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
            {[
              { id: 'photo', label: 'Photo Only', price: PRICING.romanticPhotoOnly, img: '/aperture_icon.png', activeLabel: '₹ 30,000/-', inactiveLabel: 'Photo Only' },
              { id: 'both',  label: 'Both Photo & Video', price: PRICING.romanticBoth, img: '/video_icon.png', activeLabel: '₹ 50,000/-', inactiveLabel: 'Both Photo & Video' },
            ].map(pkg => {
              const sel = state.romanticPkg === pkg.id;
              return (
                <motion.div
                  key={pkg.id}
                  onClick={() => setState(s => ({ ...s, romanticPkg: pkg.id }))}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: 220,
                    padding: '24px',
                    borderRadius: 22,
                    border: sel ? `2px solid ${C.red}` : `2px solid transparent`,
                    background: 'transparent',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{ height: 120, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 18 }}>
                    <img src={pkg.img} alt={pkg.label} style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} />
                  </div>

                  <div style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 18,
                    fontWeight: 700,
                    color: sel ? C.red : C.navy,
                    letterSpacing: '0.02em',
                    transition: 'color 0.3s',
                    marginBottom: 14,
                  }}>
                    {pkg.label}
                  </div>

                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <div style={{
                      position: 'absolute', top: -6, left: '50%', transform: 'translateX(-50%)',
                      width: 0, height: 0,
                      borderLeft: '6px solid transparent',
                      borderRight: '6px solid transparent',
                      borderBottom: `6px solid ${C.navy}`,
                    }} />
                    <div style={{
                      background: C.navy,
                      color: '#fff',
                      padding: '8px 20px',
                      borderRadius: 8,
                      fontFamily: 'Inter, sans-serif',
                      fontSize: 14,
                      fontWeight: 700,
                      boxShadow: sel ? '0 8px 24px rgba(26,35,64,0.28)' : '0 6px 18px rgba(26,35,64,0.18)',
                    }}>
                      {fmt(pkg.price)}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="romantic" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         SHOOTING STYLE
      ════════════════════════════════════════════════ */
      case 'shootingStyle': return (
        <StepWrap>
          <SectionTitle title="What Shooting Style Do You Prefer?" subtitle="This shapes the overall mood of your wedding film" />
          <div style={{ display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
            {[
              { id: 'Documentary Style',  icon: <FiMic size={28} color="#ffffff" />, desc: 'Real moments, as they happen' },
              { id: 'Cinematic Style',    icon: <FiFilm size={28} color="#ffffff" />, desc: 'Movie-like, dramatic & emotional' },
              { id: 'Traditional Style',  icon: <FiCamera size={28} color="#ffffff" />, desc: 'Classic, timeless & formal' },
              { id: 'Storytelling Style', icon: <FiBookOpen size={28} color="#ffffff" />, desc: 'Narrative-driven visual story' },
            ].map(opt => {
              const sel = state.shootingStyle === opt.id;
              return (
                <motion.div
                  key={opt.id}
                  onClick={() => setState(s => ({ ...s, shootingStyle: opt.id }))}
                  whileHover={{ y: -6, scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    width: 'clamp(150px, 22vw, 200px)',
                    padding: '26px 18px',
                    borderRadius: 20,
                    border: sel ? `2px solid ${C.red}` : `2px solid ${C.glassBorder}`,
                    background: sel ? `linear-gradient(135deg, rgba(10,10,10,0.08), rgba(10,10,10,0.02))` : C.glass,
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    cursor: 'pointer',
                    textAlign: 'center',
                    position: 'relative',
                    boxShadow: sel ? `0 0 28px rgba(10,10,10,0.18), ${C.shadow}` : C.shadow,
                    transition: 'all 0.3s ease',
                  }}
                >
                  <AnimatePresence>
                    {sel && (
                      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                        style={{ position: 'absolute', top: 10, right: 10, width: 22, height: 22, borderRadius: '50%', background: C.red, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiCheck size={11} color="#fff" strokeWidth={3} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                  
                  {/* Dark metallic icon circle */}
                  <div style={{
                    width: 76,
                    height: 76,
                    borderRadius: '50%',
                    background: 'linear-gradient(145deg, #3a3f4e, #1a1f2e)',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.25), inset 0 1px 2px rgba(255,255,255,0.12), 0 0 0 4px rgba(255,255,255,0.85), 0 0 0 6px rgba(26,35,64,0.18)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 18px',
                    flexShrink: 0,
                  }}>
                    {opt.icon}
                  </div>

                  <div style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16, fontWeight: 700, color: sel ? C.red : C.navy, marginBottom: 6 }}>{opt.id}</div>
                  <div style={{ fontFamily: 'Inter, sans-serif', fontSize: 11, color: C.textMuted, lineHeight: 1.45 }}>{opt.desc}</div>
                </motion.div>
              );
            })}
          </div>
          <NavButtons onPrev={goPrev} onNext={goNext} nextDisabled={!state.shootingStyle} prevDisabled={stepIndex === 0} />
          <ShootInfoCard step="shootingStyle" />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         CLIENT DETAILS
      ════════════════════════════════════════════════ */
      case 'clientDetails': return (
        <StepWrap>
          <SectionTitle emoji="💌" title="Tell Us About You" subtitle="So we can personalise your quotation" />
          
          <div style={{
            maxWidth: 680,
            margin: '0 auto',
            padding: '40px 36px',
            borderRadius: 24,
            background: 'rgba(255, 255, 255, 0.45)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.7)',
            boxShadow: '0 24px 70px rgba(26,35,64,0.06), inset 0 1px 2px rgba(255,255,255,0.45)',
          }}>
            <div className="client-form-grid">
              {[
                { key: 'bride',    label: 'Bride Name',    icon: <FiUser size={16} />,     type: 'text',  required: true  },
                { key: 'groom',    label: 'Groom Name',    icon: <FiUser size={16} />,     type: 'text',  required: true  },
                { key: 'phone',    label: 'Phone Number',  icon: <FiPhone size={16} />,    type: 'tel',   required: true  },
                { key: 'email',    label: 'Email',         icon: <FiMail size={16} />,     type: 'email', required: false },
                { key: 'date',     label: 'Wedding Date',  icon: null,                     type: 'date',  required: false },
                { key: 'location', label: 'Location',      icon: <FiMapPin size={16} />,   type: 'text',  required: false },
              ].map(f => (
                <div key={f.key}>
                  <FloatInput
                    id={f.key}
                    label={f.label}
                    icon={f.icon}
                    type={f.type}
                    value={state.client[f.key]}
                    required={f.required}
                    onChange={e => setState(s => ({ ...s, client: { ...s.client, [f.key]: e.target.value } }))}
                  />
                </div>
              ))}
            </div>
          </div>

          <NavButtons
            onPrev={goPrev}
            onNext={goNext}
            nextDisabled={!state.client.bride || !state.client.groom || !state.client.phone}
            prevDisabled={stepIndex === 0}
            nextLabel="See My Quote"
          />
        </StepWrap>
      );

      /* ════════════════════════════════════════════════
         FINAL INVOICE
      ════════════════════════════════════════════════ */
      case 'invoice': return (
        <StepWrap>
          <SectionTitle emoji="🏆" title="Your Wedding Quotation" subtitle="Here's a complete breakdown of your package" />

          <InvoiceDisplay state={state} total={total} invoiceRef={invoiceRef} />

          <div style={{ maxWidth: 700, margin: '32px auto 0', display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <motion.button
              onClick={goPrev}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '13px 28px',
                borderRadius: 100,
                border: `1.5px solid rgba(26,35,64,0.2)`,
                background: 'transparent',
                color: C.navy,
                fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 500, cursor: 'pointer',
                letterSpacing: '0.05em',
              }}
            >
              <FiChevronLeft size={16} />
              Edit
            </motion.button>

            <motion.button
              onClick={generatePDF}
              disabled={pdfLoading}
              whileHover={!pdfLoading ? { scale: 1.04, y: -2 } : {}}
              whileTap={!pdfLoading ? { scale: 0.97 } : {}}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 30px',
                borderRadius: 100,
                border: `1.5px solid ${C.navy}`,
                background: C.navy,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, cursor: pdfLoading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '0 8px 30px rgba(26,35,64,0.25)',
                opacity: pdfLoading ? 0.7 : 1,
              }}
            >
              <FiDownload size={15} />
              {pdfLoading ? 'Generating…' : 'Download PDF'}
            </motion.button>

            <motion.button
              onClick={() => {
                const c = state.client;
                const name = [c.bride, c.groom].filter(Boolean).join(' & ') || 'Valued Client';
                const quickMsg =
                  `*Wedding Quotation Request — RC Wedding Stories*\n\n` +
                  `*Couple:* ${name}\n` +
                  `*Phone:* ${c.phone || 'N/A'}\n` +
                  `*Wedding Date:* ${c.date || 'TBD'}\n` +
                  `*Location:* ${c.location || 'N/A'}\n\n` +
                  `*Estimated Total: ${fmt(total)}*\n\n` +
                  `I would like to discuss my wedding photography package.`;
                window.open(`https://wa.me/${FOUNDER_WHATSAPP}?text=${encodeURIComponent(quickMsg)}`, '_blank');
              }}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 30px',
                borderRadius: 100,
                border: 'none',
                background: `linear-gradient(135deg, #25d366, #1da851)`,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 600, cursor: 'pointer',
                letterSpacing: '0.08em', textTransform: 'uppercase',
                boxShadow: '0 8px 30px rgba(37,211,102,0.35)',
              }}
            >
              <FiMessageCircle size={15} />
              WhatsApp Us
            </motion.button>

            <motion.button
              onClick={handleDone}
              disabled={pdfLoading}
              whileHover={!pdfLoading ? { scale: 1.06, y: -3 } : {}}
              whileTap={!pdfLoading ? { scale: 0.97 } : {}}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                padding: '14px 36px',
                borderRadius: 100,
                border: 'none',
                background: `linear-gradient(135deg, ${C.red}, ${C.redLight})`,
                color: '#fff',
                fontFamily: 'Inter, sans-serif',
                fontSize: 13, fontWeight: 700, cursor: pdfLoading ? 'not-allowed' : 'pointer',
                letterSpacing: '0.1em', textTransform: 'uppercase',
                boxShadow: `0 12px 40px rgba(10,10,10,0.4)`,
                opacity: pdfLoading ? 0.7 : 1,
              }}
            >
              <FiHeart size={15} />
              Done — Send &amp; Book!
            </motion.button>
          </div>
        </StepWrap>
      );

      default: return null;
    }
  };

  /* Navigate back to home (used after success reset) */
  const goHome = useCallback(() => {
    window.location.hash = '#home';
  }, []);

  /* ── RENDER ── */
  return (
    <>
      {/* ── STANDALONE PAGE ── */}
      <section
        id="quote-builder"
        style={{
          minHeight: '100vh',
          background: C.bg,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <FloatingParticles />

      {/* ── MOBILE HEADER (steps only) ── */}
      {currentStep !== 'intro' && currentStep !== 'output' && (
        <div 
          className="md:hidden flex items-center justify-between w-full"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 64,
            padding: '0 20px',
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            borderBottom: '1px solid #000000',
            zIndex: 100,
          }}
        >
          {/* Logo */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span 
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: 18,
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: C.navy,
                lineHeight: 1,
              }}
            >
              RC
            </span>
            <span 
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 6.5,
                fontWeight: 600,
                letterSpacing: '0.25em',
                color: 'rgba(26, 35, 64, 0.45)',
                textTransform: 'uppercase',
                marginTop: 2,
              }}
            >
              Wedding Stories
            </span>
          </div>

          {/* Exit / Close button */}
          <button
            onClick={() => window.location.hash = '#home'}
            style={{
              background: 'transparent',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: C.navy,
              padding: 8,
              borderRadius: '50%',
              border: '1px solid rgba(26, 35, 64, 0.1)',
            }}
            aria-label="Exit to Home"
          >
            <FiX size={16} />
          </button>
        </div>
      )}

        {/* ── STEP CONTENT ── */}
        <div style={{
          flex: 1,
          padding: currentStep === 'intro'
            ? '0 0 clamp(80px, 8vw, 100px) 0' // No top/side padding for intro bleed, but bottom padding to clear sticky progress bar
            : 'clamp(100px, 8vw, 130px) clamp(16px, 5vw, 48px) clamp(90px, 8vw, 120px)', // clear navbar at top & progress bar at bottom
          maxWidth: currentStep === 'intro'
            ? 'none'
            : ['engagement', 'pellikoduku', 'groomHaldi', 'pellikuthuru', 'brideHaldi', 'reception', 'bigDay', 'sangeeth', 'mehendi', 'cocktail'].includes(currentStep)
            ? 1400
            : ['photoType', 'output'].includes(currentStep)
            ? 1100
            : 860,
          width: '100%',
          margin: '0 auto',
          position: 'relative',
          zIndex: 2,
        }}>
          <AnimatePresence mode="wait">
            <motion.div key={currentStep}>
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── BOTTOM PROGRESS BAR ── */}
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 40,
          background: 'rgba(255,255,255,0.95)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          borderTop: '1px solid rgba(26,35,64,0.08)',
          padding: '8px clamp(16px, 4vw, 40px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {/* Progress Container - Expanded to 1200px to push Step left and Price right */}
          <div style={{ width: '100%', maxWidth: 1200 }}>
            <ProgressBar step={stepIndex} total={totalSteps} />
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 6,
              gap: 16,
              flexWrap: 'wrap',
            }}>
              {/* Left: Symmetrical Glass Pill for Step Counter */}
              <div style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '6px 14px',
                borderRadius: 100,
                background: 'rgba(26,35,64,0.03)',
                border: '1px solid rgba(26,35,64,0.06)',
                fontFamily: 'Inter, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                color: C.navy,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
              }}>
                <span style={{ display: 'inline-block', width: 6, height: 6, borderRadius: '50%', background: C.red }} />
                Step {stepIndex + 1} of {totalSteps}
              </div>

              {/* Right: Compact Symmetrical Circular Badge for Live Price with Wobble spring transition */}
              {currentStep !== 'intro' && currentStep !== 'invoice' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, x: 20 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 62,
                    height: 62,
                    borderRadius: '50%',
                    background: `linear-gradient(135deg, ${C.navy}, ${C.navyLight})`,
                    border: '1px solid rgba(255,255,255,0.15)',
                    boxShadow: '0 6px 20px rgba(26,35,64,0.18)',
                  }}
                >
                  <span style={{ color: C.gold, fontSize: 8, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: 1 }}>
                    Total
                  </span>
                  <motion.span
                    key={total}
                    initial={{ scale: 1.3, y: -4 }}
                    animate={{ scale: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 10 }}
                    style={{ fontSize: 11.5, fontWeight: 800, color: '#ffffff', fontFamily: 'Inter, sans-serif', letterSpacing: '-0.02em' }}
                  >
                    {fmt(total)}
                  </motion.span>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Sticky Total bubble disabled in favor of bottom progress bar capsule */}

      {/* Success Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <SuccessOverlay
            onClose={() => {
              setShowSuccess(false);
              setStepIndex(0);
              setState(initialState());
              goHome();
            }}
          />
        )}
      </AnimatePresence>

      {/* Global keyframes */}
      <style>{`
        * { box-sizing: border-box; }
        button { font-family: 'Inter', sans-serif; }
        
        .client-form-grid {
          display: grid !important;
          grid-template-columns: repeat(2, 1fr) !important;
          gap: 20px !important;
        }
        
        @media (max-width: 600px) {
          .client-form-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }

        .intro-photo-masonry {
          column-count: 2;
        }
        
        .services-grid {
          display: grid !important;
          grid-template-columns: repeat(var(--cols, 5), 1fr) !important;
          gap: 50px !important;
          width: 100% !important;
          max-width: 1100px !important;
          margin: 0 auto !important;
        }
        
        @media (max-width: 900px) {
          .services-grid {
            gap: 40px !important;
          }
          .service-card {
            padding: 8px 4px !important;
            gap: 4px !important;
            border-radius: 0 !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .service-card .card-icon {
            font-size: 15px !important;
            transform: scale(0.9);
          }
          .service-card .card-label {
            font-size: 8px !important;
            letter-spacing: 0.02em !important;
            margin-top: 10px !important;
          }
          .service-card .card-price {
            font-size: 10px !important;
          }
          .service-card .qty-controls {
            gap: 4px !important;
            margin-top: 0 !important;
          }
          .service-card .qty-btn {
            width: 14px !important;
            height: 14px !important;
            font-size: 8px !important;
          }
        }
        
        @media (max-width: 600px) {
          /* On mobile, let them scroll horizontally in a single row without breaking or squeezing */
          .services-grid {
            display: flex !important;
            flex-wrap: nowrap !important;
            overflow-x: auto !important;
            justify-content: flex-start !important;
            padding: 10px 8px !important;
            gap: 36px !important;
            -webkit-overflow-scrolling: touch;
          }
          .services-grid::-webkit-scrollbar {
            height: 4px;
          }
          .services-grid::-webkit-scrollbar-thumb {
            background: rgba(10,10,10,0.15);
            border-radius: 4px;
          }
          .services-grid > * {
            flex: 0 0 110px !important;
            min-width: 110px !important;
          }
        }

        @media (max-width: 640px) {
          .intro-photo-masonry {
            column-count: 1;
          }
          #quote-builder { padding-top: 0; }
        }
      `}</style>
    </>
  );
}

/* ─────────────────────────────────────────────────────────────
   ★  INTEGRATION GUIDE  (see bottom of file)
─────────────────────────────────────────────────────────────

  1.  npm install command:
      npm install jspdf html2canvas

  2.  Integration steps:
      - This file replaces src/pages/Quote.jsx entirely.
      - It is already wired into App.jsx via `<Quote />` on the home page.
      - No routing changes needed.

  3.  Change founder WhatsApp number:
      - Find FOUNDER_WHATSAPP at the top of this file.
      - Replace '916304000624' with your number (country code + number, no spaces).

  4.  Edit pricing:
      - Find the PRICING object near the top.
      - Change any value — all totals update automatically.

  5.  Add new events:
      - Add an entry to EVENT_PAGES array: { id, label, emoji, color }
      - The step will appear automatically in the wizard flow.
      - Services are picked from EVENT_SERVICES automatically.

  6.  Connect "Build Your Quote" button:
      - After mount, call:  window.openQuoteBuilder?.()
      - Or set href="javascript:window.openQuoteBuilder?.()".
      - Example in any component:
            <button onClick={() => window.openQuoteBuilder?.()}>
              Build Your Quote
            </button>

─────────────────────────────────────────────────────────────
*/
