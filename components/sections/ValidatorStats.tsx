import { getTranslations } from 'next-intl/server';
import { getValidatorStats } from '@/lib/validator';
import { VALIDATOR } from '@/lib/constants';
import NumberTicker from '@/components/ui/NumberTicker';

interface StatProps {
  label: string;
  testId: string;
  children: React.ReactNode;
}

/** One cell of the single-line stat strip. */
function Stat({ label, testId, children }: StatProps) {
  return (
    <div
      role="listitem"
      className="flex shrink-0 snap-start flex-col gap-1.5 px-5 py-5 first:pl-5 sm:px-7 sm:first:pl-7 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-border-subtle"
    >
      <div
        data-testid={testId}
        className="whitespace-nowrap text-2xl font-semibold tracking-tight text-text-primary sm:text-3xl"
      >
        {children}
      </div>
      <p className="eyebrow whitespace-nowrap">{label}</p>
    </div>
  );
}

export default async function ValidatorStats() {
  const [stats, t] = await Promise.all([
    getValidatorStats(),
    getTranslations('validator'),
  ]);

  return (
    <section
      id="validator"
      data-testid="validator-stats"
      aria-labelledby="validator-heading"
      className="relative py-[var(--space-section)]"
    >
      <div className="mx-auto max-w-6xl px-[var(--space-gutter)]">
        <p className="eyebrow mb-4">{t('eyebrow')}</p>
        <h2
          id="validator-heading"
          className="font-display mb-10 max-w-2xl text-[length:var(--text-h2)] font-semibold leading-[1.05]"
        >
          {t('heading')}
        </h2>

        {/* Single line: all stats inline. Mobile → horizontal scroll (stays one line). */}
        <div
          role="list"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-border-subtle bg-card-bg/30 backdrop-blur"
        >
          <Stat label={t('apy')} testId="validator-apy">
            <NumberTicker value={stats.apy} decimals={2} suffix="%" />
          </Stat>
          <Stat label={t('commission')} testId="validator-commission">
            <NumberTicker value={stats.commission} suffix="%" />
          </Stat>
          <Stat label={t('activeStake')} testId="validator-stake">
            <NumberTicker value={stats.activeStake} suffix=" SOL" />
          </Stat>
          <Stat label={t('uptime')} testId="validator-uptime">
            <NumberTicker value={stats.uptime} decimals={1} suffix="%" />
          </Stat>
          <Stat label={t('skipRate')} testId="validator-skiprate">
            <NumberTicker value={stats.skipRate} suffix="%" />
          </Stat>
          <Stat label={t('wizScore')} testId="validator-wizscore">
            <NumberTicker value={stats.wizScore} />
          </Stat>
          <Stat label={t('status')} testId="validator-status">
            <span className="inline-flex items-center gap-2 whitespace-nowrap">
              <span
                className={`h-2.5 w-2.5 rounded-full ${stats.active ? 'bg-success' : 'bg-error'}`}
                aria-hidden="true"
              />
              {t('active')}
            </span>
          </Stat>
        </div>

        {/* Radical transparency: verify the full record yourself. */}
        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2">
          <span className="eyebrow flex items-center gap-2 text-text-tertiary">
            <span
              className={`h-1.5 w-1.5 rounded-full ${stats.live ? 'bg-success' : 'bg-text-tertiary'}`}
              aria-hidden="true"
            />
            {stats.live ? t('live') : t('snapshot')} · {stats.name}
          </span>
          <a
            href={VALIDATOR.jpool}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-accent transition-colors hover:text-accent-soft"
          >
            {t('verify')} ↗
          </a>
        </div>
      </div>
    </section>
  );
}
