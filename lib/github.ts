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

export interface RepoCommit {
  sha: string;
  message: string;
}

const REPO_API = 'https://api.github.com/repos/salmon-wallet/salmon-wallet-v2';

/** v3 is the official frontend repo — the commit feed reads from it. */
const V3_API = 'https://api.github.com/repos/salmon-wallet/salmon-wallet-v3';

/** Snapshot fallback (2026-07-08) so the open-source card never renders empty. */
const COMMITS_FALLBACK: RepoCommit[] = [
  { sha: '40a823a', message: 'Merge pull request #15 from salmon-wallet…' },
  { sha: 'de2ff2e', message: 'docs(qa): add QA runbook' },
  { sha: 'b8e98f6', message: 'perf(web): fix Lighthouse measurement and…' },
];

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

/**
 * Latest commits from the official frontend repo (v3), for the open-source
 * bento card. Cached 1h; always resolves via the static snapshot on error.
 */
export async function getRecentCommits(): Promise<RepoCommit[]> {
  try {
    const res = await fetch(`${V3_API}/commits?per_page=3`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return COMMITS_FALLBACK;

    const commits = (await res.json()) as Array<{
      sha?: string;
      commit?: { message?: string };
    }>;
    if (!Array.isArray(commits) || commits.length === 0) return COMMITS_FALLBACK;

    return commits.slice(0, 3).map((c) => {
      const firstLine = (c.commit?.message ?? '').split('\n')[0];
      return {
        sha: (c.sha ?? '').slice(0, 7),
        message:
          firstLine.length > 44 ? `${firstLine.slice(0, 44)}…` : firstLine,
      };
    });
  } catch {
    return COMMITS_FALLBACK;
  }
}
