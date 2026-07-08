# Product Marketing Context

*Last updated: 2026-07-08 — drafted by Claude from codebase + Luca's answers; pending Luca's corrections.*

## Product Overview
**One-liner:** Open-source, self-custodial Solana wallet — and an open distribution layer for emerging Solana protocols.
**What it does:** Salmon lets users hold, send, swap and stake assets on Solana (expanding to Bitcoin) without giving up custody. All core code is public. The team also operates a Solana validator with live, on-chain-verifiable stats.
**Positioning (Luca's copy drafts, 2026-07-08):** the distribution thesis — closed wallets control what gets integrated/surfaced; Salmon opens that layer so emerging protocols can ship integrations and reach users directly. Two-sided: protocols (need distribution) + their communities (arrive to use what the protocol shipped).
**Product category:** Crypto wallet (Solana ecosystem). Self-positioning: "open wallet infrastructure" / "the open wallet layer".
**Product type:** Consumer app (extension + web + Android) with open-source infrastructure angle.
**Business model:** Free wallet; validator commission. *(TODO Luca: confirm revenue framing.)*

## Target Audience
**Layered (per Luca 2026-07-08, updated same day by his copy drafts):**
1. **Emerging Solana protocols** — need distribution without waiting for a private wallet's roadmap. Star audience of the copy drafts. Need their own CTA ("Integrate with Salmon" — destination TBD).
2. **Contributors / builders** — GitHub conversion (Luca earlier called this #1; his copies use "Get Salmon" as primary CTA — UNRESOLVED, pending his confirmation).
3. **Solana crypto-natives** — currently on Phantom/Solflare; arrive via protocol integrations or open-source pull.
4. **Newcomers** — secondary; hero must still be legible (layered messaging: simple hero, depth below).

**Jobs to be done:**
- "Hold and use my Solana assets without trusting a closed company."
- "Verify — not trust — the software that holds my keys."
- "Contribute to / build on wallet infrastructure that isn't VC-gated."

## Problems & Pain Points
**Core problem:** Every major wallet gives custody but keeps control — closed code, private roadmaps, opaque defaults and integrations.
**Why alternatives fall short:** Phantom/Solflare/Backpack are closed-source consumer apps; users can't inspect what shapes their access.
**Emotional tension:** distrust after wallet-drainer scandals and rug pulls; fear of hidden extraction; ideological discomfort funding closed rails.

## Competitive Landscape
**Direct:** Phantom (polished, 20M+ users, closed, "money app" positioning) · Solflare (feature-max, closed, "stronghold" security narrative) · Backpack (wallet + exchange).
**Secondary:** Rainbow (design-led, Ethereum) · hardware wallets.
**Indirect:** custodial exchanges (Binance, Coinbase).
**Their common gap:** none is fully open-source; none runs visible skin-in-the-game infrastructure like a public validator.

## Differentiation
1. **Fully open-source** — code is inspectable; the trust claim is verifiable, not marketing.
2. **Validator alignment** — live on-chain stats (stake, uptime, commission) = proof of operational skin in the game.
3. **Longevity by structure** — if the team disappears, the code and the wallet survive.

## Objections
| Objection | Response |
|-----------|----------|
| "Is it audited/safe?" | No confirmed third-party audit. NEVER claim one. Use open security model + Pratfall honesty. *(TODO Luca: confirm audit status.)* |
| "Why switch from Phantom?" | Custody ≠ control; open code; no hidden extraction. Reduce switching friction (import seed in minutes). |
| "Will it survive?" | Open-source continuity answer (already in FAQ) — strong, use it earlier. |
| "Fewer features?" | Show concrete capability grid (Clerk-style "everything you need"). |

**Anti-persona:** yield-chasers wanting perps/prediction markets; users wanting custodial convenience.

## Customer Language
**Words to use:** verify, open code, self-custody, keys, on-chain, fork, inspect, "don't trust, verify"; for protocols: distribution, open the wallet layer, no gatekeepers, integrations that bring users.
**Words to avoid:** "high-alignment users" (insider jargon), "trust tax", "closed wallet politics" (reads bitter → "closed wallet roadmaps"), seamless, cutting-edge, revolutionize, any invented metric.
**Luca's best lines (from his 3 copy drafts, keep):** "The problem is not custody. It is control." · "Open code. No gatekeepers." · "Open the wallet layer." · "Open-source is not branding. It is the point." · "Traction first. Narrative second." · "Reach what closed wallets ignore." · "…use the integration that brought you here."
**Glossary:** wallet layer = the software mediating user↔chain; validator = Salmon's node (vote account `Sa1HXZ…JsCz`).

## Brand Voice
**Tone:** technical, direct, sober. No hype, no exclamation points.
**Personality:** verifiable, principled, adversarial-minded, understated.

## Proof Points — VERIFIED ONLY
- Public GitHub org: `github.com/salmon-wallet` (repo, commits, contributors — pull live counts).
- Live validator stats via Stakewiz API (APY, commission, stake, uptime, skip rate, Wiz Score) + on-chain verify link (JPool).
- Live since 2023; shipping on Chrome Web Store, Play Store, web wallet v2.
- **NEVER render (unverified — see memory `unverified-proof-claims`):** Halborn audit, "$200M+ protected", "50k+ users", "4.8★".

## Goals
**Business goal:** grow the open-source project — contributors and credibility first; protocol integrations as the growth engine (distribution thesis).
**Conversion actions:** UNRESOLVED — Luca first said GitHub #1; his copy drafts use "Get Salmon" primary. Proposed split: Get Salmon primary in hero, GitHub persistent in navbar + close, protocols get their own "Integrate with Salmon" CTA. Pending confirmation.
**Open decisions:** SAL token FAQ on landing yes/no (regulatory/expectation implications) · protocol CTA destination (docs/mail/form/GitHub).
**Current metrics:** unknown. *(TODO Luca: GitHub stars, store installs, analytics.)*
