import { useRef } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import { aboutImages, founderPortrait } from '../data/mediaData';


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
  { id: 13, size: 3, left: '15%', duration: 19, delay: 3.7 },
  { id: 14, size: 2, left: '48%', duration: 16, delay: 5.5 },
  { id: 15, size: 1, left: '78%', duration: 14, delay: 0.3 },
  { id: 16, size: 2.5, left: '22%', duration: 18, delay: 6.9 },
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
  { id: 13, size: 1.5, right: '32%', duration: 14, delay: 2.8 },
  { id: 14, size: 3, right: '42%', duration: 18, delay: 5.9 },
  { id: 15, size: 2, right: '75%', duration: 17, delay: 1.0 },
  { id: 16, size: 1, right: '15%', duration: 13, delay: 3.5 },
];

const centerParticles = [
  { id: 1, size: 2, left: '15%', duration: 17, delay: 0.8 },
  { id: 2, size: 3, left: '30%', duration: 21, delay: 2.9 },
  { id: 3, size: 1.5, left: '45%', duration: 15, delay: 4.6 },
  { id: 4, size: 2.5, left: '60%', duration: 19, delay: 1.3 },
  { id: 5, size: 2, left: '75%', duration: 23, delay: 3.8 },
  { id: 6, size: 3, left: '85%', duration: 16, delay: 5.2 },
  { id: 7, size: 1, left: '22%', duration: 18, delay: 0.4 },
  { id: 8, size: 2.5, left: '38%', duration: 20, delay: 6.7 },
  { id: 9, size: 1.5, left: '52%', duration: 14, delay: 2.3 },
  { id: 10, size: 3.5, left: '68%', duration: 25, delay: 7.9 },
  { id: 11, size: 2, left: '80%', duration: 18, delay: 4.1 },
  { id: 12, size: 1.5, left: '28%', duration: 16, delay: 1.7 },
  { id: 13, size: 3, left: '40%', duration: 22, delay: 3.5 },
  { id: 14, size: 2, left: '58%', duration: 19, delay: 5.8 },
  { id: 15, size: 1, left: '72%', duration: 17, delay: 0.2 },
  { id: 16, size: 2.5, left: '88%', duration: 21, delay: 7.1 },
];


/**
 * About Page — premium storytelling layout with parallax images
 */
export default function About() {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, margin: '-80px' });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });
  const imgY1 = useTransform(scrollYProgress, [0, 1], ['-8%', '8%']);
  const imgY2 = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-32 overflow-hidden"
      style={{ background: '#000000', paddingTop: '120px', minHeight: '100vh' }}
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 pointer-events-none opacity-30"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 50%, rgba(255,255,255,0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.02) 0%, transparent 40%)',
        }}
      />

      {/* Self-contained CSS for high-performance margin particles */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes floatUpLeft {
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
        @keyframes floatUpRight {
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
        @keyframes floatUpCenter {
          0% {
            top: 100%;
            opacity: 0;
            transform: scale(0.4);
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            top: -5%;
            opacity: 0;
            transform: scale(1.1);
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
              animation: `floatUpLeft ${p.duration}s linear infinite`,
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
              animation: `floatUpRight ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      {/* Center background floating particles (floating behind content, highly visible in vertical gaps) */}
      <div className="absolute left-[15vw] right-[15vw] top-0 bottom-0 pointer-events-none overflow-hidden z-0">
        {centerParticles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{
              width: p.size,
              height: p.size,
              left: p.left,
              boxShadow: '0 0 10px rgba(255,255,255,0.8), 0 0 4px rgba(255,255,255,0.5)',
              animation: `floatUpCenter ${p.duration}s linear infinite`,
              animationDelay: `${p.delay}s`,
              opacity: 0,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <motion.div
          className="flex items-baseline gap-3 mb-10"
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div style={{ width: 60, height: 1, background: 'linear-gradient(90deg, rgba(255,255,255,0.5), transparent)' }} />
          <h2 className="text-white" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 600, letterSpacing: '0.02em', lineHeight: 1 }}>
            About <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>Us</em>
          </h2>
        </motion.div>

        {/* Founder & Brand Story Intro Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center mb-16 md:mb-20">
          {/* Left Column — Cinematic Portrait Container (lg:col-span-5) */}
          <motion.div
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            {/* Elegant Background Frame */}
            <div className="absolute -inset-4 rounded-sm border border-white/5 pointer-events-none" />
            
            {/* Image Container with Luxury Glow */}
            <div className="relative overflow-hidden rounded-sm group shadow-2xl border border-white/10">
              <motion.img
                src={founderPortrait}
                alt="Chotu - Founder of RC Wedding Stories"
                className="w-full aspect-[4/5] object-cover filter contrast-[1.02] brightness-[0.95]"
                whileHover={{ scale: 1.03 }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              />
              {/* Luxury Cinematic Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-80 pointer-events-none transition-opacity duration-500 group-hover:opacity-60" />
            </div>

            {/* Floating Luxury Glassmorphic Badge */}
            <motion.div
              className="absolute -bottom-6 -right-4 md:right-4 glass-dark px-6 py-5 rounded-sm border border-white/10 shadow-2xl max-w-[280px] z-10"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <p className="text-[10px] tracking-[0.25em] text-white/40 uppercase mb-1" style={{ fontFamily: 'Inter' }}>
                Founder & Lead Storyteller
              </p>
              <h4 className="text-white text-xl font-semibold tracking-wide mb-2" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                Chotu
              </h4>
              <div className="w-8 h-[1px] bg-white/20 mb-2" />
              <p className="text-white/50 text-[11px] leading-relaxed italic" style={{ fontFamily: 'Inter', fontWeight: 300 }}>
                "Every wedding has a pulse, an invisible string of emotions. My life's work is to capture that string."
              </p>
            </motion.div>
          </motion.div>

          {/* Right Column — Biography & Brand Specifications (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <motion.p
                className="text-[10px] tracking-[0.35em] text-white/40 uppercase mb-3"
                style={{ fontFamily: 'Inter' }}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                The Visionary Behind the Lens
              </motion.p>
              <motion.h3
                className="text-white mb-6"
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  fontWeight: 600,
                  lineHeight: 1.1,
                  letterSpacing: '-0.01em',
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, delay: 0.4 }}
              >
                Chotu
              </motion.h3>
            </div>

            <motion.div
              className="space-y-6 text-white/50 text-sm leading-8"
              style={{ fontFamily: 'Inter', fontWeight: 300 }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <p>
                With over <strong className="text-white/80 font-normal">8 years of dedicated experience</strong> behind the lens, Chotu has pioneered a distinctive style of candid wedding storytelling. A native of Nellore who refined his craft in the vibrant, high-stakes wedding landscapes of Chennai, Chotu blends absolute technical precision with intuitive emotional sensitivity.
              </p>
              <p>
                For Chotu, wedding photography isn't merely about capturing structured rituals; it's about freezing a feeling in its purest, most authentic state. His commitment to cinematic perfection ensures that each frame resonates with the same heartbeat felt on your wedding day.
              </p>
              
              <div className="section-divider my-8 ml-0" style={{ margin: '32px 0' }} />
              
              <div className="space-y-4">
                <h4 className="text-white text-lg font-semibold tracking-wide uppercase text-xs text-white/60 mb-2" style={{ fontFamily: 'Inter', letterSpacing: '0.2em' }}>
                  RC Wedding Stories Details
                </h4>
                <p className="text-xs leading-6">
                  Founded in <strong className="text-white/80 font-normal">2025</strong> in Chennai, RC Wedding Stories was born out of a desire to move beyond stiff, traditional poses and center the visual narrative around raw, unscripted human emotions.
                </p>
                <p className="text-xs leading-6">
                  Now operating out of both <strong className="text-white/80 font-normal">Nellore, Andhra Pradesh</strong> and <strong className="text-white/80 font-normal">Chennai, Tamil Nadu</strong>, our team of passionate visual artists travels across all of South India. Over <strong className="text-white/80 font-normal">500+ couples</strong> have trusted us to document their sacred milestones, knowing we treat every event not as a routine project, but as an eternal piece of art.
                </p>
              </div>

              {/* Dynamic Metadata Specs Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                {[
                  { label: 'Established', value: '2025 · Chennai' },
                  { label: 'Bases', value: 'Nellore & Chennai' },
                  { label: 'Coverage', value: 'South India & Beyond' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="text-white/20 text-[9px] tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter' }}>{label}</p>
                    <p className="text-white/70 text-xs font-normal" style={{ fontFamily: 'Inter' }}>{value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Cinematic Section Separator Line */}
        <motion.div
          className="w-full h-[1px] mb-16 md:mb-20"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2) 20%, rgba(255,255,255,0.2) 80%, transparent)',
          }}
          initial={{ opacity: 0, scaleX: 0.5 }}
          animate={inView ? { opacity: 1, scaleX: 1 } : {}}
          transition={{ duration: 1.5, delay: 0.4 }}
        />

        {/* Brand Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-28">
          {/* Left — Text */}
          <div>
            <motion.h2
              className="text-white mb-8"
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(40px, 5vw, 80px)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.01em',
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
            >
              We believe every
              <br />
              love story deserves
              <br />
              <em style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                to be eternal.
              </em>
            </motion.h2>

            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: 0.4 }}
            >
              <p className="text-white/50 text-sm leading-8" style={{ fontFamily: 'Inter', fontWeight: 300 }}>
                RC Wedding Stories was born from a single obsession — the fleeting,
                unrepeatable magic of human connection. Founded in Chennai with a
                camera and a dream, we have spent nearly a decade transforming wedding
                days into cinematic masterpieces.
              </p>

              <p className="text-white/50 text-sm leading-8" style={{ fontFamily: 'Inter', fontWeight: 300 }}>
                Our approach is rooted in documentary storytelling — we blend into
                your celebration, observe, and capture moments exactly as they
                unfold: raw, real, and breathtakingly beautiful.
              </p>

              <div className="pt-4">
                <div className="section-divider mb-8 ml-0" style={{ margin: '0 0 32px 0' }} />
                <div className="grid grid-cols-2 gap-8">
                  {[
                    { label: 'Philosophy', value: 'Emotion First' },
                    { label: 'Style', value: 'Cinematic & Candid' },
                    { label: 'Coverage', value: 'All of South India' },
                    { label: 'Turnaround', value: '3 – 4 Weeks' },
                  ].map(({ label, value }) => (
                    <div key={label}>
                      <p className="text-white/25 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter' }}>{label}</p>
                      <p className="text-white/70 text-sm" style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 18 }}>{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.a
              href="#quote"
              className="btn-luxury inline-flex mt-10 cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                if (window.navigateToSection) {
                  window.navigateToSection('#quote');
                } else {
                  window.location.hash = '#quote';
                }
              }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.7 }}
            >
              Book Your Story With Us
            </motion.a>
          </div>

          {/* Right — Stacked Images */}
          <div className="relative h-[600px] lg:h-[700px]">
            {/* Primary image */}
            <motion.div
              className="absolute right-0 top-0 w-3/4 h-4/5 overflow-hidden rounded-sm"
              style={{ y: imgY1 }}
              initial={{ opacity: 0, x: 60 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={aboutImages[0].url}
                alt={aboutImages[0].alt}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(20%)' }}
              />
              {/* Subtle overlay */}
              <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, rgba(0,0,0,0.2), transparent)' }} />
            </motion.div>

            {/* Secondary image */}
            <motion.div
              className="absolute left-0 bottom-0 w-3/5 h-1/2 overflow-hidden rounded-sm"
              style={{ y: imgY2 }}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <img
                src={aboutImages[1].url}
                alt={aboutImages[1].alt}
                className="w-full h-full object-cover"
                style={{ filter: 'grayscale(20%)' }}
              />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(315deg, rgba(0,0,0,0.3), transparent)' }} />
            </motion.div>

            {/* Floating accent card */}
            <motion.div
              className="absolute left-1/4 top-[22%] -translate-y-1/2 glass-dark px-6 py-5 rounded-sm z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <p className="text-white/30 text-xs tracking-widest uppercase mb-1" style={{ fontFamily: 'Inter' }}>Est.</p>
              <p style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 40, fontWeight: 300, color: 'white', lineHeight: 1 }}>2025</p>
              <p className="text-white/40 text-xs mt-1" style={{ fontFamily: 'Inter', fontWeight: 300 }}>Chennai, India</p>
            </motion.div>
          </div>
        </div>

        {/* Testimonials Strip */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t pt-16"
          style={{ borderColor: 'rgba(255,255,255,0.06)' }}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          {[
            { quote: '"Every photograph is a certificate of presence." — Susan Sontag' },
            { quote: '"We are all stories in the end. Make it a good one." — The Doctor' },
            { quote: '"In photography there is a reality so subtle that it becomes more real than reality." — Dali' },
          ].map((q, i) => (
            <div key={i} className="text-center px-4">
              <p
                className="text-white/30 text-sm leading-relaxed italic"
                style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 16 }}
              >
                {q.quote}
              </p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
