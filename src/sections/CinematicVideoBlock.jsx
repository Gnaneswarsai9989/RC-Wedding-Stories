import { useRef, useState, useEffect } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { showcaseVideoUrl } from '../data/mediaData';

const CONTAINER_HEIGHT = 640;
const CAMERAMAN_SIZE   = 230;

/**
 * CinematicVideoBlock — Immersive 3D Wedding Parallax Scene
 * Features:
 *  - Twin synchronized video players (base desaturated video, overlay colorful video with spotlight mask).
 *  - Automated right-to-left moving cameraman (cutout from public/cameraman.jpg with checkerboard keyed out at runtime).
 *  - Volumetric spotlight projection emitting from the camera lens.
 *  - Floating golden sparkles and rose petals drifting in Z-depth.
 *  - Viewfinder-style HUD frames for a premium cinematic aesthetic.
 */
export default function CinematicVideoBlock() {
  const containerRef = useRef(null);
  const vidRef       = useRef(null); // single full-color video

  // Refs for high-performance direct DOM mutations
  const cameramanWrapperRef = useRef(null);
  const beamRef             = useRef(null);
  const dimensionsRef       = useRef({ width: 1080, height: 640 });

  const inView = useInView(containerRef, { once: false, margin: '-20px' });
  const [processedSrc, setProcessedSrc] = useState(null);

  // Guarantee continuous looping playback and automatic resumption
  useEffect(() => {
    const video = vidRef.current;
    if (!video) return;

    video.muted = true;

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Continuous playback autoplay trigger:", err);
        });
      }
    };

    // Trigger play immediately on mount
    playVideo();

    // Re-trigger play when in view (handles tab/view activations)
    if (inView) {
      playVideo();
    }

    // Tab focus restoration
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playVideo();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [inView]);

  // Video load failure fallback handler
  const handleVideoError = () => {
    const video = vidRef.current;
    if (video) {
      const localSrc = window.location.origin + '/weddingvideo.mp4';
      if (video.src !== localSrc) {
        console.warn("Cloudinary video failed to load, falling back to local /weddingvideo.mp4");
        video.src = '/weddingvideo.mp4';
        video.load();
        video.play().catch(err => console.log("Local fallback playback failed:", err));
      }
    }
  };

  // Center of the camera lens relative to the container height (offset for bottom: -25px placement)
  const lensCenterY = CONTAINER_HEIGHT + 25 - 0.82 * CAMERAMAN_SIZE;

  // Mouse Parallax Springs (adds organic depth as mouse moves)
  const springX = useSpring(0, { stiffness: 40, damping: 18 });
  const springY = useSpring(0, { stiffness: 40, damping: 18 });

  // 1. Process uploaded cameraman image to remove checkered background
  useEffect(() => {
    const img = new Image();
    // Register event handlers BEFORE setting src to avoid cached load timing bugs
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      try {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imgData.data;

        // Loop pixels, keying out checkered pattern (white and light gray pixels)
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // Gray/White detection
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const isGrayscale = (max - min) < 18;
          const isLight = max > 175;

          if (isGrayscale && isLight) {
            data[i + 3] = 0; // Transparent
          }
        }
        ctx.putImageData(imgData, 0, 0);
        setProcessedSrc(canvas.toDataURL());
      } catch (e) {
        console.warn("Canvas keying failed, using original image:", e);
        setProcessedSrc('/cameraman.jpg');
      }
    };
    img.onerror = (e) => {
      console.warn("Cameraman image load failed:", e);
      setProcessedSrc('/cameraman.jpg');
    };
    // Do not set crossOrigin for same-origin local assets as it can trigger CORS blocks
    img.src = '/cameraman.jpg';
  }, []);


  // Track container dimensions using ResizeObserver for pixel-accurate sync
  // (window resize misses layout-driven changes like negative-margin full-bleed)
  useEffect(() => {
    if (!containerRef.current) return;
    const updateSize = () => {
      if (!containerRef.current) return;
      dimensionsRef.current = {
        width:  containerRef.current.clientWidth,
        height: containerRef.current.clientHeight,
      };
    };
    updateSize();
    const ro = new ResizeObserver(updateSize);
    ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  // 3. Animate Cameraman from Right to Left continuously when in view (DOM-driven for zero lag)
  useEffect(() => {
    if (!inView) return;
    let animId;
    let start = null;
    const duration = 16000; // 16 seconds to cross screen

    const step = (timestamp) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = (elapsed % duration) / duration;

      const xPos = 115 - progress * 140;

      // Smooth fade in/out at loop edges
      let camOpacity = 1;
      if (xPos > 90) {
        camOpacity = Math.max(0, 1 - (xPos - 90) / 20);
      } else if (xPos < 35) {
        camOpacity = Math.max(0, (xPos - 8) / 27);
      }

      const width  = containerRef.current ? containerRef.current.clientWidth  : dimensionsRef.current.width;
      const height = containerRef.current ? containerRef.current.clientHeight : dimensionsRef.current.height;

      const camCenterPx = (xPos / 100) * width;
      const camXPx      = camCenterPx - 44;

      // Beam target: ahead (left) of the lens
      const xPx = camXPx - width * 0.22;
      const yPx = height * 0.46;

      const bobbleY      = Math.sin((xPos / 100) * Math.PI * 18) * 6;
      const cameramanTilt = Math.sin((xPos / 100) * Math.PI * 18) * 1.5;

      // 1. Cameraman position, sway & opacity
      if (cameramanWrapperRef.current) {
        cameramanWrapperRef.current.style.left    = `${xPos}%`;
        cameramanWrapperRef.current.style.opacity = camOpacity;
        const inner = cameramanWrapperRef.current.querySelector('.cameraman-inner');
        if (inner) inner.style.transform = `scaleX(-1) translateY(${bobbleY}px) rotate(${cameramanTilt}deg)`;
      }

      // 2. Beam polygon — from lens toward target ahead
      if (beamRef.current) {
        beamRef.current.setAttribute('points', `
          ${camXPx} , ${lensCenterY - 18 + bobbleY}
          ${xPx}    , ${yPx - 140}
          ${xPx}    , ${yPx + 140}
          ${camXPx} , ${lensCenterY + 18 + bobbleY}
        `);
      }

      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [inView]);

  // Handle Mouse Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    springX.set(nx * 15);
    springY.set(ny * 8);
  };

  const handleMouseLeave = () => {
    springX.set(0);
    springY.set(0);
  };

  // Parallax calculations for Z-layers
  const rotateY = useTransform(springX, v => `${v}deg`);
  const rotateX = useTransform(springY, v => `${-v}deg`);

  const bgParallaxX = useTransform(springX, v => `${v * -0.6}px`);
  const bgParallaxY = useTransform(springY, v => `${v * -0.6}px`);
  const fgParallaxX = useTransform(springX, v => `${v * 0.4}px`);
  const fgParallaxY = useTransform(springY, v => `${v * 0.4}px`);

  // Walking bobble placeholder (handled directly inside the step animation loop for zero-lag performance)

  return (
    <div className="w-full relative py-28 px-4 md:px-28 flex justify-center items-center overflow-hidden">
      <div
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative select-none w-full"
        style={{
          maxWidth: '1440px',
          height: `${CONTAINER_HEIGHT}px`,
          perspective: '1500px',
          perspectiveOrigin: '50% 35%',
        }}
      >
        <style>{`
          @keyframes border-run-clockwise {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: -100;
            }
          }
          @keyframes border-run-counterclockwise {
            0% {
              stroke-dashoffset: 0;
            }
            100% {
              stroke-dashoffset: 100;
            }
          }
          .animate-border-run-1 {
            animation: border-run-clockwise 6s linear infinite;
          }
          .animate-border-run-2 {
            animation: border-run-counterclockwise 6s linear infinite;
          }
          .glow-rect {
            x: 20px;
            y: 20px;
            width: calc(100% - 40px);
            height: calc(100% - 40px);
          }
        `}</style>

        {/* ── 3D PARALLAX CONTAINER ── */}
        <motion.div
          style={{
            rotateX, rotateY,
            transformStyle: 'preserve-3d',
            position: 'relative',
            width: '100%',
            height: '100%',
          }}
        >

          {/* ══ LAYER A: CLIPPED VIDEO CARD CONTAINER ══ */}
          <div
            className="absolute inset-0 overflow-hidden bg-black rounded-2xl"
            style={{
              transform: 'translateZ(0px)',
              transformStyle: 'preserve-3d',
            }}
          >
            {/* ══ LAYER 1: Deep Background Palace Wall (translateZ -250px) ══ */}
            <motion.div
              style={{
                position: 'absolute', inset: '-15% -25%',
                x: bgParallaxX, y: bgParallaxY,
                transform: 'translateZ(-250px)',
                background: 'radial-gradient(circle at 50% 30%, #1e1b29 0%, #07070a 100%)',
              }}
            >
              <div className="absolute inset-0 opacity-[0.15]" style={{
                backgroundImage: `repeating-linear-gradient(90deg, transparent 0px, transparent 150px, rgba(255,255,255,0.06) 150px, rgba(255,255,255,0.06) 152px)`,
              }} />
              <div className="absolute top-0 left-0 right-0 h-[250px] flex justify-around opacity-40">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} style={{
                    width: 140, height: 140,
                    background: 'radial-gradient(circle, rgba(217,119,6,0.15) 0%, transparent 70%)',
                    filter: 'blur(30px)',
                  }} />
                ))}
              </div>
            </motion.div>

            {/* ══ LAYER 2: FULL-COLOR WEDDING VIDEO ══ */}
            <motion.div
              style={{
                position: 'absolute', inset: '-5% -10%',
                x: bgParallaxX, y: bgParallaxY,
                transform: 'translateZ(-120px)',
                transformStyle: 'preserve-3d',
              }}
            >
              <video
                ref={vidRef}
                src={showcaseVideoUrl}
                autoPlay
                loop
                muted
                playsInline
                onError={handleVideoError}
                className="absolute inset-0 w-full h-full object-cover"
                style={{ filter: 'brightness(1.0) saturate(1.05)' }}
              />
            </motion.div>

            {/* ── CINEMATIC VIEWFINDER HUD OVERLAY ── */}
            <div className="absolute inset-0 z-40 pointer-events-none">
              <div className="absolute top-10 bottom-10 left-10 right-10 border border-white/5" />
              <div className="absolute top-8 left-8 w-6 h-6 border-t-2 border-l-2 border-white/20" />
              <div className="absolute top-8 right-8 w-6 h-6 border-t-2 border-r-2 border-white/20" />
              <div className="absolute bottom-8 left-8 w-6 h-6 border-b-2 border-l-2 border-white/20" />
              <div className="absolute bottom-8 right-8 w-6 h-6 border-b-2 border-r-2 border-white/20" />

              {inView && (
                <>
                  <div style={{ position: 'absolute', top: 24, left: 40, display: 'flex', alignItems: 'center', gap: 8 }}>
                    <motion.div
                      style={{ width: 8, height: 8, borderRadius: '50%', background: '#ef4444', boxShadow: '0 0 8px #ef4444' }}
                      animate={{ opacity: [1, 0.2, 1] }}
                      transition={{ duration: 1.3, repeat: Infinity }}
                    />
                    <span className="text-[10px] font-mono tracking-widest text-white/70">REC DOLLY</span>
                  </div>
                  <div style={{ position: 'absolute', top: 24, right: 40 }}>
                    <span className="text-[10px] font-mono tracking-widest text-white/40">F/1.2 · 50mm · ISO 200 · 1/250s</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 24, left: 40 }}>
                    <span className="text-[9px] font-mono tracking-widest text-white/35">RC STUDIOS · LIVE SCANNING ACTIVE</span>
                  </div>
                  <div style={{ position: 'absolute', bottom: 24, right: 40 }}>
                    <span className="text-[9px] font-mono tracking-widest text-white/30">NELLORE CEREMONY // 2025</span>
                  </div>
                  <div className="absolute top-10 left-12 right-12 flex justify-between opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} style={{ width: 8, height: 5, border: '1px solid #fff', borderRadius: 1 }} />
                    ))}
                  </div>
                  <div className="absolute bottom-10 left-12 right-12 flex justify-between opacity-20">
                    {Array.from({ length: 24 }).map((_, i) => (
                      <div key={i} style={{ width: 8, height: 5, border: '1px solid #fff', borderRadius: 1 }} />
                    ))}
                  </div>
                </>
              )}
            </div>


          </div>


          {/* ══ LAYER C: DOLLY CAMERAMAN WRAPPER (translateZ 140px) ══ */}
          {/* Sibling container - renders on top (zIndex 100) and is NOT clipped by Video Card boundaries */}
          {/* We isolate Framer Motion values on the parent motion.div to prevent style.transform conflicts */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              x: fgParallaxX,
              y: fgParallaxY,
              transformStyle: 'preserve-3d',
              pointerEvents: 'none',
              zIndex: 100,
            }}
          >
            <div
              ref={cameramanWrapperRef}
              style={{
                position: 'absolute',
                bottom: '-25px',
                left: '110%',
                transform: 'translateZ(140px) translateX(-50%)',
                width: CAMERAMAN_SIZE,
                height: CAMERAMAN_SIZE,
                transformStyle: 'preserve-3d',
              }}
            >
              {processedSrc ? (
                <div
                  className="cameraman-inner"
                  style={{
                    transform: 'scaleX(-1) translateY(0px) rotate(0deg)',
                    transition: 'transform 0.03s linear',
                    width: '100%',
                    height: '100%',
                    position: 'relative',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.75))',
                  }}
                >
                  <img
                    src={processedSrc}
                    alt="Cameraman shooting"
                    className="w-full h-full object-contain"
                  />

                  <motion.div
                    style={{
                      position: 'absolute',
                      top: '18%',
                      left: '69%',
                      width: 7,
                      height: 7,
                      borderRadius: '50%',
                      background: '#ffeedd',
                      boxShadow: '0 0 8px 3px rgba(255, 238, 221, 0.6)',
                    }}
                    animate={{ opacity: [0.3, 1, 0.3] }}
                    transition={{ duration: 1.2, repeat: Infinity }}
                  />
                </div>
              ) : (
                <div className="w-full h-full flex items-center justify-center rounded-lg border border-white/10 bg-white/5 backdrop-blur-md">
                  <span className="text-[10px] font-mono tracking-widest text-white/33 uppercase">Calibrating Lens...</span>
                </div>
              )}
            </div>
          </motion.div>

        </motion.div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────
   DRIFT ELEMENT DATA GENERATOR
───────────────────────────────────────────── */
const DRIFT_ELEMENTS = [
  { x: '8%',  zStart: 200,  zEnd: -150, size: 14, dur: 7.5, delay: 0.0, drift: 90,  rotSpeed: 1.2, op: 0.6, type: 'petal' },
  { x: '22%', zStart: -100, zEnd: 150,  size: 8,  dur: 6.2, delay: 1.5, drift: -50, rotSpeed: 2.0, op: 0.4, type: 'sparkle' },
  { x: '35%', zStart: 150,  zEnd: -50,  size: 15, dur: 8.0, delay: 0.5, drift: 70,  rotSpeed: 0.9, op: 0.7, type: 'petal' },
  { x: '48%', zStart: 50,   zEnd: -200, size: 6,  dur: 5.5, delay: 2.2, drift: -60, rotSpeed: 1.5, op: 0.5, type: 'sparkle' },
  { x: '62%', zStart: 180,  zEnd: 20,   size: 12, dur: 7.0, delay: 0.8, drift: 60,  rotSpeed: 1.3, op: 0.6, type: 'petal' },
  { x: '75%', zStart: -150, zEnd: 80,   size: 7,  dur: 5.8, delay: 1.8, drift: -40, rotSpeed: 2.5, op: 0.5, type: 'sparkle' },
  { x: '88%', zStart: 100,  zEnd: -100, size: 13, dur: 6.8, delay: 0.2, drift: 50,  rotSpeed: 1.6, op: 0.6, type: 'petal' },
  { x: '15%', zStart: 0,    zEnd: -180, size: 12, dur: 7.2, delay: 3.0, drift: 80,  rotSpeed: 1.1, op: 0.5, type: 'petal' },
  { x: '58%', zStart: -80,  zEnd: 120,  size: 5,  dur: 6.0, delay: 3.5, drift: -30, rotSpeed: 2.2, op: 0.4, type: 'sparkle' },
  { x: '82%', zStart: 220,  zEnd: -30,  size: 16, dur: 8.5, delay: 2.0, drift: 100, rotSpeed: 0.8, op: 0.8, type: 'petal' },
];
