'use client';

import { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { LINKS, NAV_HREFS } from '@/lib/constants';
import { routing } from '@/lib/i18n/routing';
import GradientButton from './ui/GradientButton';

const NAV_KEYS = ['why', 'features', 'security', 'manifesto', 'faq'] as const;

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const lastScrollY = useRef(0);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 20);

    // Hide on scroll down, show on scroll up (only after passing 80px)
    if (!mobileOpen) {
      if (latest > 80 && latest > lastScrollY.current) {
        setHidden(true);
      } else {
        setHidden(false);
      }
    }
    lastScrollY.current = latest;
  });

  // Scroll-linked glassmorphic values
  const navBg = useTransform(scrollY, [0, 200], ['rgba(0,0,0,0)', 'rgba(0,0,0,0.6)']);
  const navBlur = useTransform(scrollY, [0, 200], ['blur(0px)', 'blur(20px)']);
  const navBorder = useTransform(
    scrollY,
    [0, 200],
    ['1px solid rgba(255,255,255,0)', '1px solid rgba(255,255,255,0.15)']
  );

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <>
      <motion.nav
        animate={hidden ? { y: '-100%' } : { y: 0 }}
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
        }
        className="fixed top-0 left-0 right-0 z-[100]"
      >
        {/* Scroll-linked glassmorphic background layer */}
        {!prefersReducedMotion ? (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundColor: navBg,
              backdropFilter: navBlur,
              borderBottom: navBorder,
            }}
          />
        ) : (
          <div
            className={`absolute inset-0 pointer-events-none transition-all duration-500 ${scrolled
              ? 'bg-bg-glass backdrop-blur-xl border-b border-border-subtle'
              : ''
              }`}
          />
        )}

        <div className="relative mx-auto max-w-6xl px-6 flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 shrink-0 transition-opacity hover:opacity-90">
            <Image
              src="/images/logo.png"
              alt="Salmon Wallet"
              width={29}
              height={29}
              className="w-[29px] h-[29px]"
            />
            <Image
              src="/images/app-title.png"
              alt="Salmon"
              width={90}
              height={22}
              className="h-[18px] w-auto hidden sm:block"
            />
          </Link>

          {/* Desktop Right Navigation */}
          <div className="hidden lg:flex items-center gap-8 ml-auto">
            <div className="flex items-center gap-8">
              {NAV_KEYS.map((key, i) => (
                <a
                  key={key}
                  href={NAV_HREFS[i]}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {t(key)}
                </a>
              ))}
              <a
                href="#get-salmon"
                className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300 underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
              >
                {t('getSalmon')}
              </a>
            </div>

            {/* Language switcher */}
            <div className="flex items-center gap-1 border-l border-border-subtle pl-6">
              {routing.locales.map((l) => (
                <Link
                  key={l}
                  href={pathname}
                  locale={l}
                  className={`text-xs font-mono px-2 py-1 rounded transition-colors ${locale === l
                    ? 'text-text-primary bg-card-bg'
                    : 'text-text-tertiary hover:text-text-secondary'
                    }`}
                >
                  {l.toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={t('toggleMenu')}
          >
            <motion.span
              animate={mobileOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block w-5 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="block w-5 h-0.5 bg-text-primary"
            />
            <motion.span
              animate={mobileOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="block w-5 h-0.5 bg-text-primary"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
            }
            className="fixed inset-y-0 right-0 w-[80vw] z-[90] bg-bg-primary/95 backdrop-blur-xl pt-28 px-8 lg:hidden shadow-[-20px_0_40px_rgba(0,0,0,0.4)]"
          >
            <motion.div
              className="flex flex-col gap-6"
              initial="initial"
              animate="animate"
              variants={{
                animate: { transition: { staggerChildren: 0.1 } },
              }}
            >
              {NAV_KEYS.map((key, i) => (
                <motion.a
                  key={key}
                  href={NAV_HREFS[i]}
                  onClick={() => setMobileOpen(false)}
                  className="text-xl font-medium text-text-secondary hover:text-text-primary transition-colors"
                  variants={
                    prefersReducedMotion
                      ? {}
                      : {
                        initial: { opacity: 0, x: -20, filter: 'blur(4px)' },
                        animate: { opacity: 1, x: 0, filter: 'blur(0px)' },
                      }
                  }
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {t(key)}
                </motion.a>
              ))}

              {/* Mobile language switcher */}
              <motion.div
                className="flex items-center gap-2"
                variants={
                  prefersReducedMotion
                    ? {}
                    : {
                      initial: { opacity: 0, x: -20 },
                      animate: { opacity: 1, x: 0 },
                    }
                }
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {routing.locales.map((l) => (
                  <Link
                    key={l}
                    href={pathname}
                    locale={l}
                    onClick={() => setMobileOpen(false)}
                    className={`text-sm font-mono px-3 py-1.5 rounded transition-colors ${locale === l
                      ? 'text-text-primary bg-card-bg'
                      : 'text-text-tertiary hover:text-text-secondary'
                      }`}
                  >
                    {l.toUpperCase()}
                  </Link>
                ))}
              </motion.div>

              <motion.div
                className="pt-4 flex flex-col gap-3"
                variants={
                  prefersReducedMotion
                    ? {}
                    : {
                      initial: { opacity: 0, y: 10 },
                      animate: { opacity: 1, y: 0 },
                    }
                }
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <GradientButton variant="primary" href="#get-salmon">
                  {t('getSalmon')}
                </GradientButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
