// Version: 1.0.2 - Sparkle/Stardust Particle System (Bubble-free)
import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { stats } from '../data/mediaData';
import CinematicVideoBlock from './CinematicVideoBlock';

/**
 * ShowcaseSection — stats + feature cards with premium glass animations
 */
export default function ShowcaseSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  const canvasRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width = section.offsetWidth);
    let h = (canvas.height = section.offsetHeight);
    let animId;

    class Particle {
      constructor(init = false) {
        this.reset(init);
      }
      reset(init = false) {
        this.x = Math.random() * w;
        // Only spawn in the bottom 28% of the section (stats + feature cards area, below video)
        const topBoundary = h * 0.72;
        this.y = init
          ? topBoundary + Math.random() * (h - topBoundary)
          : h + Math.random() * 60 + 10;
        // Tiny dot radius between 0.8px and 2.5px
        this.r = Math.random() * 1.7 + 0.8;
        // Slow upward drift speed
        this.vy = -(Math.random() * 0.35 + 0.1);
        // Very slight horizontal sway
        this.vx = (Math.random() - 0.5) * 0.08;
        this.swaySpeed = Math.random() * 0.003 + 0.001;
        this.swayPhase = Math.random() * Math.PI * 2;
        // Pure soft white particles only
        this.color = 'rgba(255, 255, 255,';
        this.maxOpacity = Math.random() * 0.5 + 0.2;
      }
      update() {
        this.x += this.vx + Math.sin(Date.now() * this.swaySpeed + this.swayPhase) * 0.15;
        this.y += this.vy;
        if (this.y < -10 || this.x < -20 || this.x > w + 20) {
          this.reset(false);
        }
      }
      draw() {
        // Hard cutoff: don't render above 72% of section height (video area)
        const topBoundary = h * 0.72;
        if (this.y < topBoundary) return;

        // Fade in just below the boundary, fade near bottom
        let fade = Math.min(1, (this.y - topBoundary) / 80);
        if (this.y > h - 80) fade = Math.min(fade, (h - this.y) / 80);
        const alpha = this.maxOpacity * fade;
        if (alpha <= 0.01) return;

        const isLight = document.body.classList.contains('light-mode');
        const colorStr = isLight ? 'rgba(0, 0, 0,' : 'rgba(255, 255, 255,';

        // Soft outer glow
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3.5);
        grd.addColorStop(0, `${colorStr}${alpha})`);
        grd.addColorStop(0.4, `${colorStr}${alpha * 0.5})`);
        grd.addColorStop(1, `${colorStr}0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Sharp inner dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${colorStr}${Math.min(1, alpha * 1.8)})`;
        ctx.fill();
      }
    }

    const COUNT = 55;
    const particlesList = Array.from({ length: COUNT }, () => new Particle(true));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particlesList.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(render);
    };
    render();

    const resizeObserver = new ResizeObserver(() => {
      w = canvas.width = section.offsetWidth;
      h = canvas.height = section.offsetHeight;
    });
    resizeObserver.observe(section);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
    };
  }, []);


  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12 } },
  };
  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } },
  };

  const features = [
    { icon: '◇', title: 'Cinematic Style', desc: 'Film-inspired color grading that gives every frame a timeless, magazine-quality look.' },
    { icon: '◈', title: 'Candid Moments', desc: 'We blend invisibly into your celebration to capture genuine emotions as they unfold.' },
    { icon: '✥', title: 'Traditional Style', desc: 'Timeless posed portraits and complete ritual coverage preserving your heritage.' },
    { icon: '◉', title: 'Premium Delivery', desc: 'Hand-edited gallery in a private online portal with lifetime cloud storage.' },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
      style={{ background: '#000000' }}
    >
      {/* White floating dot particles — only in stats/cards area below the video */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 w-full h-full"
      />

      <div className="max-w-6xl mx-auto" ref={ref}>
        {/* Tagline Header (Above the video) */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-5"
            style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(200,212,240,0.4)' }}
          >
            Why Choose Us
          </p>
          <h2
            className="font-semibold text-white"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.4,
              letterSpacing: '0.01em',
              textShadow: '0 0 20px rgba(255,255,255,0.12), 0 0 40px rgba(255,255,255,0.06)',
            }}
          >
            We don't just take photos
            <br />
            <em className="text-gradient-silver" style={{ fontStyle: 'italic' }}>
              we craft forever memories.
            </em>
          </h2>

          <div className="section-divider-wide mt-10" />
        </motion.div>

        {/* ── Cinematic Video Block — full-bleed wider than the content column ── */}
        <motion.div
          className="mb-20 mt-4"
          style={{ marginLeft: 'calc(-50vw + 50%)', marginRight: 'calc(-50vw + 50%)', paddingLeft: '1.5rem', paddingRight: '1.5rem' }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <CinematicVideoBlock />
        </motion.div>

        {/* Branding Header (Below the video) */}
        <motion.div
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            className="text-xs tracking-[0.4em] uppercase mb-5"
            style={{ fontFamily: 'Inter', fontWeight: 300, color: 'rgba(200,212,240,0.4)' }}
          >
            Our Philosophy
          </p>
          <h2
            className="font-semibold text-white"
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(36px, 5vw, 72px)',
              lineHeight: 1.1,
              letterSpacing: '-0.01em',
            }}
          >
            <em className="text-gradient-silver" style={{ fontStyle: 'normal' }}>
              RC Wedding Stories
            </em>
          </h2>

          <div className="section-divider-wide mt-10" />
        </motion.div>


        {/* Stats Grid */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 mb-20 max-w-4xl mx-auto"
          ref={ref}
          variants={container}
          initial="hidden"
          animate={inView ? 'show' : 'hidden'}
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              variants={item}
              className="flex flex-col items-center justify-center py-6 px-4 text-center group"
            >
              <span
                className="stat-value text-gradient block"
                style={{
                  fontFamily: 'Inter, sans-serif',
                  fontSize: 'clamp(24px, 3.5vw, 36px)',
                  fontWeight: 600,
                  lineHeight: 1,
                  marginBottom: 8,
                }}
              >
                {stat.value}
              </span>
              <span
                className="text-white/30 text-[10px] tracking-[0.22em] uppercase group-hover:text-white/60 transition-colors duration-400"
                style={{ fontFamily: 'Inter', fontWeight: 300 }}
              >
                {stat.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* Feature Cards */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {features.map((feat, i) => (
            <motion.div
              key={i}
              className="glass-card-anim milk-shimmer card-top-accent corner-full p-8 rounded-sm group"
              whileHover={{ y: -6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              {/* All 4 corner brackets */}
              <span className="c-tl" />
              <span className="c-tr" />
              <span className="c-bl" />
              <span className="c-br" />

              {/* Icon */}
              <motion.span
                className="text-2xl block mb-5"
                style={{ color: 'rgba(200,212,240,0.25)' }}
                whileHover={{ color: 'rgba(200,212,240,0.7)', scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                {feat.icon}
              </motion.span>

              <h3
                className="text-white/80 mb-3 group-hover:text-white transition-colors duration-400"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 22, fontWeight: 400 }}
              >
                {feat.title}
              </h3>
              <p
                className="text-white/35 text-sm leading-relaxed group-hover:text-white/55 transition-colors duration-400"
                style={{ fontFamily: 'Inter', fontWeight: 300 }}
              >
                {feat.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
