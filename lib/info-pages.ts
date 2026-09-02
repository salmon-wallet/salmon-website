export const infoPages = {
  about: {
    title: 'About Salmon Wallet',
    intro: 'Salmon Wallet is open-source, self-custodial wallet infrastructure for Solana. The product is available today as a web wallet, browser extension, and Android application.',
    sections: [
      { heading: 'What we build', paragraphs: ['Salmon keeps essential wallet activity clear: create or import a wallet, receive funds, send transactions, review signing requests, and use selected Solana integrations. The wallet core stays focused while optional Powerups can add capabilities when they solve a defined user problem.', 'Self-custodial means Salmon does not hold recovery phrases or control user funds. The source code is public so developers and users can inspect how the wallet is built.'] },
      { heading: 'How we work', paragraphs: ['Salmon gives emerging projects a structured path to integration and measurable use. Applications are reviewed for security, user value, product coherence, technical compatibility, maintainability, partner commitment, and adoption potential. Technical inclusion does not imply endorsement or guaranteed placement.', 'The project is community-driven and develops in public. Salmon also operates a Solana validator with externally verifiable performance data. Public claims on this site are limited to evidence that can be checked through the product, source repository, or live infrastructure.'] },
      { heading: 'Security and accountability', paragraphs: ['Salmon passed a security audit in 2024 sponsored by the Eclipse Foundation and performed by Halborn. Open-source code, a focused core, clear signing information, and review of integrations are part of the project’s approach to accountable wallet infrastructure.'] },
    ],
  },
  contact: {
    title: 'Contact Salmon Wallet',
    intro: 'Contact Salmon through the channel that matches your request. Email is the official route for integration, product, media, privacy, and security enquiries.',
    sections: [
      { heading: 'Integration and product enquiries', paragraphs: ['Write to integrations@salmonwallet.io if you want to propose a Solana integration, discuss a partnership, ask about product availability, or request factual information about Salmon. Include your project name, public website, technical documentation, relevant repositories, intended user journey, and a clear description of the value for wallet users.', 'Salmon reviews proposed integrations for security, user value, product coherence, technical compatibility, maintainability, partner commitment, and adoption potential. Sending an application does not guarantee production access, endorsement, distribution, or prominent placement.'] },
      { heading: 'Privacy and security', paragraphs: ['Privacy questions and requests may also be sent to integrations@salmonwallet.io. Describe the request without including a recovery phrase, private key, password, or other wallet secret. Salmon will never need those secrets to respond.', 'For a suspected security issue, provide reproducible technical detail and affected versions while avoiding public disclosure of an unpatched vulnerability. Never send funds or secret material by email. Because Salmon is self-custodial, the team cannot recover a wallet, reverse a transaction, or restore a recovery phrase.'] },
      { heading: 'Community channels', paragraphs: ['For public project updates, use the official X, Telegram, Medium, and GitHub links in the footer. Treat unsolicited direct messages as unverified. Confirm downloads and source repositories through salmonwallet.io before installing software or following instructions.'] },
    ],
  },
  developers: {
    title: 'Salmon Wallet Developer Resources',
    intro: 'This page indexes Salmon Wallet resources for developers and AI agents. The public website exposes a small, read-only discovery API; it does not expose wallet management, custody, transaction signing, authentication, or webhook APIs.',
    sections: [
      { heading: 'API documentation and OpenAPI', paragraphs: ['The Discovery API is available at /api/v1/discovery and returns canonical product, documentation, and source links as JSON. Its OpenAPI 3.1 description is published at /openapi.json with a unique operationId, typed response schemas, RFC 9457 problem details, versioning policy, and rate-limit headers.', 'No authentication is required because the endpoint returns public metadata only. Clients should send Accept: application/json, inspect the RFC RateLimit fields on every response, and honor Retry-After after HTTP 429. Breaking changes use a new URL major version.'] },
      { heading: 'Agent guidance and CLI', paragraphs: ['The agent index at /llms.txt explains when Salmon is appropriate, identifies canonical routes, and links to machine-readable resources. Public content pages also support Accept: text/markdown for a compact representation.', 'The official read-only @salmonwallet/cli source is maintained in the salmon-website repository. It lists canonical resources and can fetch the OpenAPI document; it cannot access wallets, handle keys, or sign transactions. Registry installation will be documented here after the package is published by an authorized owner.'] },
      { heading: 'Authentication, webhooks, and MCP', paragraphs: ['Salmon does not currently publish an authentication API, webhook API, or MCP server from this website. Agents should not infer that those capabilities exist. Wallet operations remain inside the official wallet applications. For integration work, review the open-source wallet repository and contact the team with a concrete technical proposal.'] },
    ],
  },
} as const;
