# @salmonwallet/cli

Official read-only discovery CLI for Salmon Wallet. It returns canonical product and documentation links; it cannot sign transactions, access wallets, or handle keys.

## Commands

```sh
salmon info --json
salmon links --json
salmon openapi
salmon help
```

This package is prepared for public npm release. Until `@salmonwallet/cli` is published by an authorized owner of the `@salmonwallet` scope, run the checked-in executable with Node.js 20 or newer.

```sh
node packages/salmon-cli/bin/salmon.mjs links --json
```
