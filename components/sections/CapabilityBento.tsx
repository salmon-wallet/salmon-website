import { getTranslations } from 'next-intl/server';
import { getValidatorStats } from '@/lib/validator';
import { getRecentCommits } from '@/lib/github';
import ScrollReveal from '@/components/ui/ScrollReveal';
import BentoCard from '@/components/bento/BentoCard';
import {
  SendVisual,
  SwapVisual,
  CustodyVisual,
  NftsVisual,
  DappsVisual,
  ChainsVisual,
} from '@/components/bento/StaticCards';
import { ValidatorVisual, OpenSourceVisual } from '@/components/bento/LiveCards';

/**
 * Capability grid: every card shows the feature idle and "executes" it on
 * hover (in-view on touch). Validator and open-source cards run on live data.
 */
export default async function CapabilityBento() {
  const [validator, commits, t] = await Promise.all([
    getValidatorStats(),
    getRecentCommits(),
    getTranslations('features'),
  ]);

  const card = (key: string) => ({
    title: t(`cards.${key}.title`),
    description: t(`cards.${key}.description`),
  });

  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="relative mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <h2 className="mb-4 text-center text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            {t('heading')}
          </h2>
          <p className="mx-auto mb-14 max-w-2xl text-center text-lg text-text-secondary">
            {t('subheading')}
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.1} duration={1.1}>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <BentoCard {...card('send')} visual={<SendVisual />} />
            <BentoCard {...card('swap')} visual={<SwapVisual />} />
            <BentoCard {...card('custody')} visual={<CustodyVisual />} />
            <BentoCard
              {...card('validator')}
              className="sm:col-span-2"
              visual={
                <ValidatorVisual
                  apy={validator.apy}
                  uptime={validator.uptime}
                  activeStake={validator.activeStake}
                />
              }
            />
            <BentoCard {...card('opensource')} visual={<OpenSourceVisual commits={commits} />} />
            <BentoCard {...card('nfts')} visual={<NftsVisual />} />
            <BentoCard {...card('dapps')} visual={<DappsVisual />} />
            <BentoCard {...card('chains')} visual={<ChainsVisual />} />
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
