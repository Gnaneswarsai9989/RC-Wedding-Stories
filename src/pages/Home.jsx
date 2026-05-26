import HeroSection          from '../sections/HeroSection';
import HeroStorySection     from '../sections/HeroStorySection';
import ShowcaseSection       from '../sections/ShowcaseSection';
import StorytellingSection   from '../sections/StorytellingSection';
import FeaturedWorksSection  from '../sections/FeaturedWorksSection';
import { motion }            from 'framer-motion';

const capturedImages = [
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454200/IMG_7505.JPG_dadpjm.jpg', label: 'A Love Eternal' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454194/IMG_7508.JPG_rszuxv.jpg', label: 'The Golden Hour' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779456284/IMG_7491.JPG_m79gzc.jpg', label: 'Timeless Moments' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779456301/IMG_7493.JPG_pzyghh.jpg', label: 'Pure Devotion' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779456267/IMG_7489.JPG_bf2lbv.jpg', label: 'Bridal Elegance' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454212/IMG_7512.JPG_fwnzyu.jpg', label: 'Sacred Vows' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454201/IMG_7509.JPG_hps8wp.jpg', label: 'Whispering Winds' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454209/IMG_7514.JPG_tfsbw3.jpg', label: 'Together Forever' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454187/IMG_7504.JPG_ifsymp.jpg', label: 'Joyful Heartbeats' },
  { url: 'https://res.cloudinary.com/dsl7vekda/image/upload/q_auto,f_auto,w_1600,c_scale/v1779454188/IMG_7500_aocokv.jpg', label: 'Infinite Grace' },
];

/**
 * Home Page — Hero → Story → Showcase → Storytelling → Featured Works → Captured Moments (sticky stack)
 */
export default function Home() {
  return (
    <>
      <HeroSection />
      <HeroStorySection />
      <ShowcaseSection />
      <StorytellingSection />
      <FeaturedWorksSection />

      {/* ── CAPTURED MOMENTS — Sticky Scroll Stack ── */}
      {/*
        Each section is position:sticky top:0 with increasing z-index.
        As you scroll, image 2 slides ON TOP of image 1 (which sticks),
        then image 3 slides on top of image 2, etc.
      */}
      <div style={{ position: 'relative', width: '100%' }}>
        {capturedImages.map((img, i) => (
          <div
            key={`sticky-${i}`}
            style={{
              position: 'sticky',
              top: 0,
              height: '100vh',
              overflow: 'hidden',
              zIndex: i + 1,
              transform: 'translate3d(0, 0, 0)',
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              willChange: 'transform',
            }}
          >
            {/* Background image */}
            <img
              src={img.url}
              alt={img.label}
              loading={i < 2 ? 'eager' : 'lazy'}
              decoding="async"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center',
                transform: 'translate3d(0, 0, 0)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />

            {/* Top + bottom dark gradient */}
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.02) 40%, rgba(0,0,0,0.02) 60%, rgba(0,0,0,0.7) 100%)',
              pointerEvents: 'none',
            }} />
          </div>
        ))}

        {/* ── View Gallery section with Titles — below the 10 images ── */}
        <div style={{
          position: 'relative',
          zIndex: capturedImages.length + 1,
          background: '#0a0a0a',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '110px 24px 60px',
        }}>
          <motion.div
            className="flex flex-col items-center gap-7 text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4">
              <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.2)' }} />
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 11,
                fontWeight: 400,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                Captured Moments
              </p>
              <div style={{ width: 30, height: 1, background: 'rgba(255,255,255,0.2)' }} />
            </div>

            {/* The 10 titles displayed beautifully together */}
            <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 my-3 max-w-3xl mx-auto px-4">
              {capturedImages.map((img, i) => (
                <span
                  key={i}
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: 'clamp(16px, 1.8vw, 22px)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: 'rgba(255,255,255,0.75)',
                    letterSpacing: '0.06em',
                    lineHeight: 1.4,
                  }}
                >
                  {img.label}
                  {i < capturedImages.length - 1 && (
                    <span style={{ color: 'rgba(255,255,255,0.15)', marginLeft: 16 }}>·</span>
                  )}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 'clamp(14px, 1.6vw, 18px)',
              fontStyle: 'italic',
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.08em',
              maxWidth: 550,
              margin: '0 auto 16px',
              lineHeight: 1.8,
            }}>
              Every frame tells a story, capturing the beauty of a fleeting moment to cherish forever.
            </p>

            <div className="flex flex-col items-center gap-3">
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 'clamp(10px, 1.1vw, 12px)',
                fontWeight: 400,
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
              }}>
                There's more to see
              </p>

              <motion.a
                href="#gallery"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  fontFamily: "Inter, sans-serif",
                  fontSize: 'clamp(11px, 1.2vw, 13px)',
                  fontWeight: 500,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: '#0a0a0a',
                  borderRadius: 999,
                  padding: '15px 44px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  background: '#ffffff',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                }}
                whileHover={{
                  background: '#f3f4f6',
                  scale: 1.03,
                  boxShadow: '0 12px 32px rgba(255,255,255,0.12)',
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                View Full Gallery
                <span style={{ fontSize: '1.05em', fontWeight: 600 }}>↗</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
