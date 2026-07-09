import { getTranslations } from 'next-intl/server';
import { getRepoStats } from '@/lib/github';
import { getValidatorStats } from '@/lib/validator';
import { LINKS, VALIDATOR } from '@/lib/constants';

interface ItemProps {
  label: string;
  value: string;
  href?: string;
  testId: string;
}

/** One cell of the proof strip. Linked cells open their verification source. */
function Item({ label, value, href, testId }: ItemProps) {
  const content = (
    <>
      <div
        data-testid={testId}
        className="whitespace-nowrap text-lg font-semibold tracking-tight text-text-primary sm:text-xl"
      >
        {value}
      </div>
      <p className="eyebrow whitespace-nowrap">{label}</p>
    </>
  );

  const cellClasses =
    'flex shrink-0 snap-start flex-col gap-1 px-5 py-4 sm:px-7 lg:flex-1 lg:shrink lg:px-5 [&:not(:first-child)]:border-l [&:not(:first-child)]:border-border-subtle';

  if (href) {
    return (
      <a
        role="listitem"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${cellClasses} transition-colors hover:bg-card-bg/50`}
      >
        {content}
      </a>
    );
  }
  return (
    <div role="listitem" className={cellClasses}>
      {content}
    </div>
  );
}

/**
 * Slim verifiable-proof bar under the hero: GitHub + validator numbers.
 * Every figure links to its source — the whole point is "verify, don't trust".
 */
export default async function ProofStrip() {
  const [repo, validator, t] = await Promise.all([
    getRepoStats(),
    getValidatorStats(),
    getTranslations('proof'),
  ]);

  return (
    <section
      aria-label={t('eyebrow')}
      data-testid="proof-strip"
      className="relative pb-8 sm:pb-12"
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          role="list"
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto rounded-2xl border border-border-subtle bg-card-bg/30 backdrop-blur"
        >
          <Item
            label={t('openSource')}
            value="GPL-3.0"
            href={LINKS.repo}
            testId="proof-license"
          />
          <Item
            label={t('contributors')}
            value={String(repo.contributors)}
            href={`${LINKS.repo}/graphs/contributors`}
            testId="proof-contributors"
          />
          <Item
            label={t('staked')}
            value={`${Math.round(validator.activeStake).toLocaleString('en-US')} SOL`}
            href={VALIDATOR.jpool}
            testId="proof-stake"
          />
          <Item
            label={t('uptime')}
            value={`${validator.uptime.toFixed(1)}%`}
            href={VALIDATOR.jpool}
            testId="proof-uptime"
          />
          <Item label={t('since')} value="2023" testId="proof-since" />
        </div>
      </div>
    </section>
  );
}
