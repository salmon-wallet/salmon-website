import { VALIDATOR } from './constants';

export interface ValidatorStats {
  apy: number; // %
  commission: number; // %
  activeStake: number; // SOL
  uptime: number; // %
  skipRate: number; // %
  wizScore: number; // Stakewiz composite 0-100
  active: boolean; // !delinquent
  name: string;
  /** true = fetched live, false = static fallback (API unreachable). */
  live: boolean;
}

/** Snapshot fallback (2026-06-25) so the section never renders empty if Stakewiz is down. */
const FALLBACK: ValidatorStats = {
  apy: 5.44,
  commission: 5,
  activeStake: 18951.8,
  uptime: 94.8,
  skipRate: 0,
  wizScore: 25.08,
  active: true,
  name: 'Salmon Wallet',
  live: false,
};

/** Subset of the Stakewiz validator object we consume. */
interface StakewizValidator {
  apy_estimate: number;
  commission: number;
  activated_stake: number;
  uptime: number;
  skip_rate: number;
  wiz_score: number;
  delinquent: boolean;
  name: string;
}

/**
 * Live Solana validator stats from Stakewiz (no API key).
 * Cached 1h via Next data cache — Stakewiz updates ~every minute and asks callers not to poll hard.
 * Always resolves: returns the static snapshot if the API errors or returns junk.
 */
export async function getValidatorStats(): Promise<ValidatorStats> {
  try {
    const res = await fetch(
      `https://api.stakewiz.com/validator/${VALIDATOR.voteAccount}`,
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return FALLBACK;

    const v = (await res.json()) as Partial<StakewizValidator>;
    // Validate at the boundary — never trust the shape of external data.
    if (typeof v.apy_estimate !== 'number' || typeof v.activated_stake !== 'number') {
      return FALLBACK;
    }

    // Stakewiz switched `commission` from percent to basis points (500 = 5%).
    // A percentage can never exceed 100, so larger values must be bps.
    const rawCommission = v.commission ?? FALLBACK.commission;

    return {
      apy: v.apy_estimate,
      commission: rawCommission > 100 ? rawCommission / 100 : rawCommission,
      activeStake: v.activated_stake,
      uptime: v.uptime ?? FALLBACK.uptime,
      skipRate: v.skip_rate ?? FALLBACK.skipRate,
      wizScore: v.wiz_score ?? FALLBACK.wizScore,
      active: !v.delinquent,
      name: v.name ?? FALLBACK.name,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
