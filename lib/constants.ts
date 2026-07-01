export const LINKS = {
  webWallet: 'https://v2.salmonwallet.io/',
  chrome:
    'https://chromewebstore.google.com/detail/salmon-wallet/ejbidfepgijlcgahbmbckmnaljagjoll',
  firefox: '#',
  appStore: '#',
  playStore: '#',
  github: 'https://github.com/salmon-wallet',
  twitter: 'https://x.com/salmonwallet',
  medium: 'https://medium.com/@salmonwallet',
  mediaKit: 'https://salmonwallet.io/assets/salmonwallet-mediakit.zip',
} as const;

export const NAV_HREFS = [
  '#why',
  '#features',
  '#security',
  '#manifesto',
] as const;

/** Salmon's Solana validator (for live stats in the ValidatorStats section). */
export const VALIDATOR = {
  voteAccount: 'Sa1HXZsn2u6p2dMLZGhfxtsRw7Jo32hF15yBghWJsCz',
  jpool: 'https://app.jpool.one/validators/Sa1HXZsn2u6p2dMLZGhfxtsRw7Jo32hF15yBghWJsCz',
} as const;
