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

const NAV_KEYS = ['why', 'protocols', 'features', 'security', 'manifesto'] as const;

const GITHUB_ICON = (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);

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
          <div className="hidden lg:flex items-center gap-6 ml-auto">
            <div className="flex items-center gap-6">
              {NAV_KEYS.map((key, i) => (
                <a
                  key={key}
                  href={NAV_HREFS[i]}
                  className="text-sm text-text-secondary hover:text-text-primary transition-colors duration-300"
                >
                  {t(key)}
                </a>
              ))}
            </div>

            {/* GitHub */}
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('github')}
              className="text-text-secondary hover:text-text-primary transition-colors duration-300"
            >
              {GITHUB_ICON}
            </a>

            {/* Language switcher */}
            <div className="flex items-center gap-1 border-l border-border-subtle pl-5">
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

            <div className="flex items-center gap-3">
              <GradientButton variant="secondary" href="#get-salmon" className="px-4 py-2">
                {t('getSalmon')}
              </GradientButton>
              <GradientButton variant="primary" href={LINKS.webWallet} className="px-4 py-2">
                {t('accessWebWallet')}
              </GradientButton>
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

              {/* Mobile GitHub link */}
              <motion.a
                href={LINKS.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-2.5 text-xl font-medium text-text-secondary hover:text-text-primary transition-colors"
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
                {GITHUB_ICON}
                {t('github')}
              </motion.a>

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
                <GradientButton variant="secondary" href={LINKS.webWallet}>
                  {t('accessWebWallet')}
                </GradientButton>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
