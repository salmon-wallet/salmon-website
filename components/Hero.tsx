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
        className="relative z-10 mx-auto max-w-4xl px-6 text-center pt-2 sm:pt-12 pb-12 sm:pb-20 flex flex-col items-center"
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
          <div className="relative mx-auto w-[200px] sm:w-[260px] aspect-[9/16] rounded-[2.5rem] border border-card-border bg-card-bg shadow-[0_0_80px_rgba(255,92,69,0.08)] overflow-hidden">
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
            className="text-4xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight whitespace-pre-line mb-4 sm:mb-6"
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
            className="mb-8 lg:hidden"
          >
            <GradientButton href="#get-salmon" variant="primary">
              {tNav('getSalmon')}
            </GradientButton>
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
