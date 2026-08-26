#!/usr/bin/env node

const BASE_URL = 'https://salmonwallet.io';

const product = {
  name: 'Salmon Wallet',
  description: 'Open-source, self-custodial wallet infrastructure for Solana.',
  website: `${BASE_URL}/`,
  webWallet: 'https://v2.salmonwallet.io/',
  browserExtension: 'https://chromewebstore.google.com/detail/salmon-wallet/ejbidfepgijlcgahbmbckmnaljagjoll',
  android: 'https://play.google.com/store/apps/details?id=io.salmonwallet.app',
  source: 'https://github.com/Salmon-HQ/salmon-wallet-frontend',
  agentIndex: `${BASE_URL}/llms.txt`,
  openapi: `${BASE_URL}/openapi.json`,
  discoveryApi: `${BASE_URL}/api/v1/discovery`,
  developerDocs: `${BASE_URL}/developers`,
  about: `${BASE_URL}/about`,
  contact: `${BASE_URL}/contact`,
};

function printHelp() {
  console.log(`Salmon Wallet CLI

Usage:
  salmon info [--json]       Show product and platform information
  salmon links [--json]      Show stable public links
  salmon openapi             Print the published OpenAPI document
  salmon help                Show this help

This discovery CLI does not sign transactions, access wallets, or handle keys.`);
}

function printObject(value, json) {
  if (json) {
    console.log(JSON.stringify(value, null, 2));
    return;
  }

  for (const [key, item] of Object.entries(value)) {
    console.log(`${key}: ${item}`);
  }
}

async function main() {
  const [command = 'help', ...args] = process.argv.slice(2);
  const json = args.includes('--json');

  if (command === 'help' || command === '--help' || command === '-h') {
    printHelp();
    return;
  }

  if (command === 'info') {
    printObject({
      name: product.name,
      description: product.description,
      website: product.website,
      openapi: product.openapi,
    }, json);
    return;
  }

  if (command === 'links') {
    printObject(product, json);
    return;
  }

  if (command === 'openapi') {
    const response = await fetch(product.openapi, {
      headers: { accept: 'application/json', 'user-agent': '@salmonwallet/cli' },
    });
    if (!response.ok) throw new Error(`OpenAPI request failed with HTTP ${response.status}`);
    console.log(JSON.stringify(await response.json(), null, 2));
    return;
  }

  throw new Error(`Unknown command: ${command}. Run \`salmon help\` for usage.`);
}

main().catch((error) => {
  console.error(`salmon: ${error.message}`);
  process.exitCode = 1;
});
