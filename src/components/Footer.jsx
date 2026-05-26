import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { RiInstagramLine, RiFacebookBoxLine, RiYoutubeLine, RiWhatsappLine, RiArrowUpLine, RiMailLine, RiPhoneLine, RiMapPinLine } from 'react-icons/ri';
import { socialLinks } from '../data/mediaData';

/**
 * Footer — Premium redesigned footer with clean Inter sans-serif typography
 */
export default function Footer() {
  const ref        = useRef(null);
  const inView     = useInView(ref, { once: true, margin: '-60px' });
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const footerLinks = [
    { label: 'Home',          href: '#home'     },
    { label: 'About Us',      href: '#about'    },
    { label: 'Our Clicks',    href: '#gallery'  },
    { label: 'Services',      href: '#services' },
    { label: 'Book Your Story', href: '#quote'    },
  ];

  const socialIcons = [
    { Icon: RiInstagramLine,   href: socialLinks.instagram, label: 'Instagram' },
    { Icon: RiFacebookBoxLine, href: socialLinks.facebook,  label: 'Facebook'  },
    { Icon: RiYoutubeLine,     href: socialLinks.youtube,   label: 'YouTube'   },
    { Icon: RiWhatsappLine,    href: socialLinks.whatsapp,  label: 'WhatsApp'  },
  ];

  const contactItems = [
    { Icon: RiMailLine,   text: 'rcweddingstoriesnellore@gmail.com', href: 'mailto:rcweddingstoriesnellore@gmail.com' },
    { Icon: RiPhoneLine,  text: '+91 63040 00624',            href: 'tel:+916304000624'                },
    { Icon: RiMapPinLine, text: 'Magunta Layout 1947, 2nd Floor, Nellore, Andhra Pradesh', href: null          },
  ];

  return (
    <footer
      ref={ref}
      className="relative"
      style={{
        background: '#000000',
        borderTop: '1px solid rgba(255,255,255,0.08)',
        overflow: 'hidden',
      }}
    >
      {/* Subtle top shimmer line */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.15) 30%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0.15) 70%, transparent 100%)',
        }}
      />

      {/* ── MAIN FOOTER CONTENT ── */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-14 lg:px-20 pt-12 pb-6 relative z-10">

        {/* ── MAIN COMPACT GRID: Logo (Left) / Links / Contact / Social ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">

          {/* Left Column: Brand Identity */}
          <motion.div
            className="flex flex-col pr-4"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2
              className="text-white mb-1 leading-none"
              style={{
                fontFamily: "Cormorant Garamond, serif",
                fontSize: 34,
                fontWeight: 400,
                letterSpacing: '0.06em',
              }}
            >
              RC
            </h2>
            <p
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 8.5,
                fontWeight: 300,
                letterSpacing: '0.25em',
                color: 'rgba(255,255,255,0.45)',
                textTransform: 'uppercase',
                marginTop: 4,
              }}
            >
              Wedding Stories
            </p>
            <p
              className="leading-relaxed mt-4"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 12,
                fontWeight: 300,
                color: 'rgba(255,255,255,0.4)',
                letterSpacing: '0.02em',
                lineHeight: 1.6,
              }}
            >
              Crafting timeless visual stories of love, emotion, and celebration.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mb-4 uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Navigation
            </p>
            <ul className="space-y-2">
              {footerLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.18 + i * 0.07 }}
                >
                  <a
                    href={link.href}
                    style={{
                      fontFamily: "Inter, sans-serif",
                      fontSize: 13,
                      fontWeight: 300,
                      color: 'rgba(255,255,255,0.65)',
                      textDecoration: 'none',
                      letterSpacing: '0.04em',
                      transition: 'color 0.3s ease',
                      display: 'inline-block',
                    }}
                    onClick={(e) => { e.preventDefault(); window.navigateToSection ? window.navigateToSection(link.href) : window.location.hash = link.href; }}
                    onMouseEnter={e => e.target.style.color = '#ffffff'}
                    onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mb-4 uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Contact
            </p>
            <ul className="space-y-3">
              {contactItems.map(({ Icon, text, href }, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, x: -10 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.26 + i * 0.08 }}
                >
                  <Icon size={14} style={{ color: 'rgba(255,255,255,0.3)', marginTop: 3, flexShrink: 0 }} />
                  {href ? (
                    <a
                      href={href}
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12.5,
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.65)',
                        textDecoration: 'none',
                        transition: 'color 0.3s ease',
                        letterSpacing: '0.02em',
                        wordBreak: 'break-all',
                      }}
                      onMouseEnter={e => e.target.style.color = '#ffffff'}
                      onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.65)'}
                    >
                      {text}
                    </a>
                  ) : (
                    <span
                      style={{
                        fontFamily: "Inter, sans-serif",
                        fontSize: 12.5,
                        fontWeight: 300,
                        color: 'rgba(255,255,255,0.65)',
                        letterSpacing: '0.02em',
                        lineHeight: 1.5,
                      }}
                    >
                      {text}
                    </span>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Follow Us + Back to Top */}
          <motion.div
            className="col-span-2 sm:col-span-2 md:col-span-1"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <p
              className="mb-4 uppercase"
              style={{
                fontFamily: "Inter, sans-serif",
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.35)',
              }}
            >
              Follow Us
            </p>
            <div className="flex gap-3 mb-8 flex-wrap">
              {socialIcons.map(({ Icon, href, label }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center cursor-pointer"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: 'rgba(255,255,255,0.55)',
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                  }}
                  whileHover={{
                    scale: 1.1,
                    y: -3,
                    borderColor: 'rgba(255,255,255,0.6)',
                    color: '#ffffff',
                    boxShadow: '0 0 20px rgba(255,255,255,0.08)',
                  }}
                  whileTap={{ scale: 0.92 }}
                  initial={{ opacity: 0, y: 12 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.38 + i * 0.07 }}
                >
                  <Icon size={15} />
                </motion.a>
              ))}
            </div>

            {/* Back to Top button */}
            <div>
              <p
                className="mb-3 uppercase"
                style={{
                  fontFamily: "Inter, sans-serif",
                  fontSize: 10,
                  fontWeight: 600,
                  letterSpacing: '0.2em',
                  color: 'rgba(255,255,255,0.25)',
                }}
              >
                Back to Top
              </p>
              <motion.button
                onClick={scrollToTop}
                className="flex items-center justify-center cursor-pointer"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  border: '1px solid rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.55)',
                  background: 'transparent',
                  transition: 'all 0.3s ease',
                }}
                whileHover={{
                  scale: 1.1,
                  y: -3,
                  borderColor: 'rgba(255,255,255,0.6)',
                  color: '#ffffff',
                  boxShadow: '0 0 20px rgba(255,255,255,0.08)',
                }}
                whileTap={{ scale: 0.92 }}
                aria-label="Scroll to top"
              >
                <RiArrowUpLine size={15} />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM BAR ── */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 border-t border-white/10"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.35)',
              letterSpacing: '0.04em',
            }}
          >
            © 2025 RC Wedding Stories. All rights reserved.
          </p>
          <p
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12.5,
              fontWeight: 300,
              color: 'rgba(255,255,255,0.25)',
              letterSpacing: '0.04em',
            }}
          >
            Crafted with love &amp; precision
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
