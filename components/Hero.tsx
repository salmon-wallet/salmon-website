'use client';

import { useRef, useState, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  useMotionTemplate,
  type Variants,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import GradientButton from './ui/GradientButton';
import { LINKS } from '@/lib/constants';

// ParticlesBackground moved to page-level (global)

export default function Hero() {
  const t = useTranslations('hero');
  const tNav = useTranslations('nav');
  const prefersReducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Mount guard: avoid FOIC — content visible during SSR, animations after hydration
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: image sinks, shrinks and blurs as you scroll
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, -2]);
  const imageBlur = useTransform(scrollYProgress, [0, 0.5], [0, 15]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const imageFilter = useMotionTemplate`blur(${imageBlur}px)`;

  // Text fades and blurs out on scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, 40]);
  const textBlurPx = useTransform(scrollYProgress, [0, 0.4], [0, 6]);
  const textFilter = useMotionTemplate`blur(${textBlurPx}px)`;

  // Orb grows on scroll
  const orbScale = useTransform(scrollYProgress, [0, 1], [1, 1.6]);
  const orbOpacity = useTransform(scrollYProgress, [0, 0.8], [0.05, 0.02]);

  const stagger: Variants = {
    animate: { transition: { staggerChildren: 0.18 } },
  };

  const fadeBlurUp: Variants = prefersReducedMotion || !mounted
    ? { initial: {}, animate: {} }
    : {
      initial: { opacity: 0, y: 40, filter: 'blur(10px)' },
      animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
    };

  const transition = { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-start overflow-hidden pt-16 sm:pt-12"
    >
      {/* ParticlesBackground now rendered globally at page level */}

      {/* Gradient orb — scroll-linked */}
      <motion.div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-accent blur-[120px] pointer-events-none"
        style={
          prefersReducedMotion
            ? { opacity: 0.05 }
            : { scale: orbScale, opacity: orbOpacity }
        }
      />

      <motion.div
        className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-2 sm:pt-6 pb-10 sm:pb-14 flex flex-col items-center"
        variants={stagger}
        initial="initial"
        animate="animate"
      >
        {/* Wallet image preview with parallax */}
        <motion.div
          variants={fadeBlurUp}
          transition={transition}
          className="relative z-0 mb-[-40px] sm:mb-[-60px]"
          style={
            prefersReducedMotion
              ? undefined
              : {
                y: imageY,
                scale: imageScale,
                rotate: imageRotate,
                filter: imageFilter,
                opacity: imageOpacity
              }
          }
        >
          {/* Width tracks viewport height so the full hero (CTAs included) always fits above the fold. */}
          <div className="relative mx-auto w-[clamp(150px,21vh,260px)] aspect-[9/16] rounded-[2.5rem] border border-card-border bg-card-bg shadow-[0_0_80px_rgba(255,92,69,0.08)] overflow-hidden">
            <Image
              src="/images/hero-app.png"
              alt="Salmon Wallet App"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        {/* Text content — fades out on scroll, layered on top */}
        <motion.div
          className="relative z-10 mt-4"
          style={
            prefersReducedMotion
              ? undefined
              : {
                opacity: textOpacity,
                y: textY,
                filter: textFilter,
              }
          }
        >
          <motion.h1
            variants={fadeBlurUp}
            transition={transition}
            className="text-3xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight whitespace-pre-line mb-4 sm:mb-6"
          >
            {t('heading')}
          </motion.h1>

          <motion.p
            variants={fadeBlurUp}
            transition={transition}
            className="text-base sm:text-xl text-text-secondary max-w-2xl mx-auto mb-6 leading-relaxed"
          >
            {t('subheading')}
          </motion.p>

          <motion.div
            variants={fadeBlurUp}
            transition={transition}
            className="mb-6 flex flex-col sm:flex-row items-center justify-center gap-3"
          >
            <GradientButton href="#get-salmon" variant="primary">
              {tNav('getSalmon')}
            </GradientButton>
            <GradientButton href={LINKS.webWallet} variant="secondary">
              {tNav('accessWebWallet')}
            </GradientButton>
          </motion.div>

          {/* Builder-first util links: code + socials, visible from the top */}
          <motion.div
            variants={fadeBlurUp}
            transition={transition}
            className="mb-6 mt-1 flex items-center justify-center gap-6 text-text-secondary"
          >
            <a
              href={LINKS.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="transition-colors hover:text-text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href={LINKS.twitter}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
              className="transition-colors hover:text-text-primary"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href={LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Telegram"
              className="transition-colors hover:text-text-primary"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
            </a>
          </motion.div>

          <motion.div variants={fadeBlurUp} transition={transition}>
            <span className="inline-block rounded-full border border-border-subtle bg-card-bg px-4 py-1.5 text-xs font-mono text-text-secondary tracking-wider uppercase">
              {t('badge')}
            </span>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
