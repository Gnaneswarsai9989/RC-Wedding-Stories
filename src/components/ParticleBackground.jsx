import { useEffect, useRef } from 'react';

/**
 * ParticleBackground — tiny glowing dot particles floating bottom to top.
 * Warm golden-amber and soft white dots, like firefly dust.
 */
export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let w = (canvas.width  = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let animId;

    class Particle {
      constructor(init = false) { this.reset(init); }
      reset(init = false) {
        this.x = Math.random() * w;
        this.y = init ? Math.random() * h : h + Math.random() * 60 + 10;
        // Tiny dot, radius 0.6px – 2.2px
        this.r  = Math.random() * 1.6 + 0.6;
        // Slow upward drift
        this.vy = -(Math.random() * 0.3 + 0.08);
        this.vx = (Math.random() - 0.5) * 0.06;
        this.swaySpeed = Math.random() * 0.002 + 0.001;
        this.swayPhase = Math.random() * Math.PI * 2;
        // Golden-amber or soft warm white
        const isGolden = Math.random() > 0.4;
        this.color = isGolden
          ? 'rgba(245, 185, 80,'   // warm golden
          : 'rgba(255, 248, 220,'; // soft cream white
        this.maxOpacity = Math.random() * 0.45 + 0.15;
      }
      update() {
        this.x += this.vx + Math.sin(Date.now() * this.swaySpeed + this.swayPhase) * 0.12;
        this.y += this.vy;
        if (this.y < -10 || this.x < -20 || this.x > w + 20) this.reset(false);
      }
      draw() {
        let fade = 1;
        if (this.y < 80)      fade = Math.max(0, this.y / 80);
        if (this.y > h - 80)  fade = Math.max(0, (h - this.y) / 80);
        const alpha = this.maxOpacity * fade;
        if (alpha <= 0.01) return;

        // Outer glow halo
        const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 4);
        grd.addColorStop(0,   `${this.color}${alpha})`);
        grd.addColorStop(0.5, `${this.color}${alpha * 0.4})`);
        grd.addColorStop(1,   `${this.color}0)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Solid bright core dot
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color}${Math.min(1, alpha * 2)})`;
        ctx.fill();
      }
    }

    const COUNT = 90;
    const particles = Array.from({ length: COUNT }, () => new Particle(true));

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => { p.update(); p.draw(); });
      animId = requestAnimationFrame(render);
    };
    render();

    const onResize = () => {
      w = canvas.width  = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', onResize);
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ opacity: 0.65 }}
      aria-hidden="true"
    />
  );
}
