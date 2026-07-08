export interface RepoStats {
  stars: number;
  forks: number;
  contributors: number;
  /** true = fetched live, false = static fallback (API unreachable or rate-limited). */
  live: boolean;
}

/** Snapshot fallback (2026-07-08) so the proof strip never renders empty if GitHub is down. */
const FALLBACK: RepoStats = {
  stars: 25,
  forks: 15,
  contributors: 14,
  live: false,
};

const REPO_API = 'https://api.github.com/repos/salmon-wallet/salmon-wallet-v2';

const HEADERS = { Accept: 'application/vnd.github+json' };

/**
 * Live repo stats from the GitHub REST API (unauthenticated, 60 req/h per IP).
 * Cached 1h via Next data cache so the rate limit is never a concern.
 * Always resolves: returns the static snapshot if the API errors or returns junk.
 */
export async function getRepoStats(): Promise<RepoStats> {
  try {
    const [repoRes, contribRes] = await Promise.all([
      fetch(REPO_API, { headers: HEADERS, next: { revalidate: 3600 } }),
      fetch(`${REPO_API}/contributors?per_page=100`, {
        headers: HEADERS,
        next: { revalidate: 3600 },
      }),
    ]);
    if (!repoRes.ok) return FALLBACK;

    const repo = (await repoRes.json()) as {
      stargazers_count?: number;
      forks_count?: number;
    };
    // Validate at the boundary — never trust the shape of external data.
    if (typeof repo.stargazers_count !== 'number') return FALLBACK;

    const contributors = contribRes.ok
      ? ((await contribRes.json()) as unknown[])
      : null;

    return {
      stars: repo.stargazers_count,
      forks: repo.forks_count ?? FALLBACK.forks,
      contributors: Array.isArray(contributors)
        ? contributors.length
        : FALLBACK.contributors,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
