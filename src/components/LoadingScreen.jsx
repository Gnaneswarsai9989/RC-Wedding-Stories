import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * LoadingScreen — premium milky glass cinematic intro
 */
export default function LoadingScreen({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [visible,  setVisible]  = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setVisible(false);
            setTimeout(onComplete, 900);
          }, 400);
          return 100;
        }
        return p + Math.random() * 8 + 2;
      });
    }, 60);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="loading-screen noise-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.9, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ background: '#000000' }}
        >


          <div className="relative z-10 flex flex-col items-center gap-12">
            {/* Animated ring */}
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: [0.34, 1.56, 0.64, 1] }}
            >
              {/* Outer spinning ring */}
              <div
                className="loading-ring"
                style={{ width: 120, height: 120 }}
              />

              {/* Inner brand mark */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center"
              >
                <motion.h1
                  className="text-white"
                  style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 36, fontWeight: 600, lineHeight: 1, letterSpacing: '0.05em' }}
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                  RC
                </motion.h1>
              </div>
            </motion.div>

            {/* Brand text */}
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.5 }}
            >
              {/* Top line */}
              <motion.div
                className="mx-auto mb-5"
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.8, delay: 0.8 }}
                style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,212,240,0.6), transparent)' }}
              />

              <p className="text-xs tracking-[0.45em] mb-2 uppercase"
                style={{ fontFamily: 'Inter, sans-serif', color: 'rgba(200,212,240,0.45)', fontWeight: 300 }}
              >
                Presenting
              </p>

              <p className="tracking-[0.3em] uppercase"
                style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: 'rgba(255,255,255,0.65)', fontWeight: 300 }}
              >
                Wedding Stories
              </p>

              {/* Bottom line */}
              <motion.div
                className="mx-auto mt-5"
                initial={{ width: 0 }}
                animate={{ width: 50 }}
                transition={{ duration: 0.8, delay: 1 }}
                style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(200,212,240,0.6), transparent)' }}
              />
            </motion.div>

            {/* Progress bar */}
            <motion.div
              className="w-48 md:w-64"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              {/* Bar track */}
              <div
                style={{
                  height: 1,
                  background: 'rgba(255,255,255,0.08)',
                  borderRadius: 999,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                {/* Fill */}
                <motion.div
                  style={{
                    height: '100%',
                    width: `${Math.min(progress, 100)}%`,
                    background: 'linear-gradient(90deg, rgba(200,212,240,0.5), rgba(255,255,255,0.9), rgba(200,212,240,0.5))',
                    borderRadius: 999,
                    boxShadow: '0 0 8px rgba(255,255,255,0.4)',
                  }}
                  transition={{ duration: 0.1 }}
                />
                {/* Shimmer on fill */}
                <div
                  style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
                    animation: 'shimmer-text 1.5s linear infinite',
                    backgroundSize: '200% 100%',
                  }}
                />
              </div>
              <p className="text-center text-xs mt-3 tracking-widest"
                style={{ color: 'rgba(200,212,240,0.35)', fontFamily: 'Inter' }}
              >
                {Math.min(Math.round(progress), 100)}%
              </p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
