const BASE_URL = 'https://salmonwallet.io';

const content = {
  en: {
    name: 'Salmon Wallet',
    description: 'Open-source, self-custodial wallet infrastructure for Solana. Salmon is available as a web wallet, browser extension, and Android app.',
    sections: [
      ['What Salmon is', 'Salmon keeps the wallet core lightweight and understandable: create or import a wallet, receive funds, send transactions, understand signing requests, and use Solana integrations. Optional Powerups add capabilities without making every feature part of the core.'],
      ['Integrations', 'Projects can apply through an open process. Salmon evaluates security, user value, product coherence, technical compatibility, maintainability, and adoption potential before an integration reaches production. Technical inclusion does not guarantee endorsement or prominent placement.'],
      ['Open infrastructure', 'The wallet is open source and self-custodial. Salmon aims to give emerging Solana projects a structured route from integration to measurable usage while keeping production access curated and accountable.'],
    ],
  },
  es: {
    name: 'Salmon Wallet',
    description: 'Infraestructura de wallet open source y autocustodial para Solana. Salmon está disponible como wallet web, extensión de navegador y aplicación para Android.',
    sections: [
      ['Qué es Salmon', 'Salmon mantiene el núcleo de la wallet liviano y comprensible: crear o importar una wallet, recibir fondos, enviar transacciones, entender solicitudes de firma y usar integraciones de Solana. Los Powerups opcionales agregan capacidades sin sumar cada función al núcleo.'],
      ['Integraciones', 'Los proyectos pueden aplicar mediante un proceso abierto. Salmon evalúa seguridad, valor para usuarios, coherencia de producto, compatibilidad técnica, mantenimiento y potencial de adopción antes de llevar una integración a producción. La inclusión técnica no garantiza respaldo ni visibilidad destacada.'],
      ['Infraestructura abierta', 'La wallet es open source y autocustodial. Salmon busca dar a proyectos emergentes de Solana un camino estructurado desde la integración hasta el uso medible, con acceso a producción curado y responsable.'],
    ],
  },
  pt: {
    name: 'Salmon Wallet',
    description: 'Infraestrutura de carteira open source e de autocustódia para Solana. A Salmon está disponível como carteira web, extensão de navegador e aplicativo Android.',
    sections: [
      ['O que é a Salmon', 'A Salmon mantém o núcleo da carteira leve e compreensível: criar ou importar uma carteira, receber fundos, enviar transações, entender solicitações de assinatura e usar integrações Solana. Powerups opcionais adicionam recursos sem tornar cada função parte do núcleo.'],
      ['Integrações', 'Projetos podem se candidatar por um processo aberto. A Salmon avalia segurança, valor para usuários, coerência de produto, compatibilidade técnica, manutenção e potencial de adoção antes de uma integração chegar à produção. Inclusão técnica não garante endosso nem destaque.'],
      ['Infraestrutura aberta', 'A carteira é open source e de autocustódia. A Salmon busca oferecer a projetos emergentes da Solana um caminho estruturado da integração ao uso mensurável, mantendo o acesso à produção curado e responsável.'],
    ],
  },
};

export const supportedLocales = Object.freeze(Object.keys(content));

export function acceptsJson(acceptHeader = '*/*') {
  const accepted = acceptHeader.toLowerCase();
  return accepted.includes('*/*') || accepted.includes('application/json');
}

export function withVary(existing, value) {
  const values = (existing ?? '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  if (!values.some((item) => item.toLowerCase() === value.toLowerCase())) values.push(value);
  return values.join(', ');
}

export function prefersMarkdown(acceptHeader = '') {
  const accepted = acceptHeader
    .toLowerCase()
    .split(',')
    .map((part, index) => {
      const [type, ...parameters] = part.trim().split(';');
      const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith('q='));
      const quality = qualityParameter ? Number.parseFloat(qualityParameter.split('=')[1]) : 1;
      return { type, quality: Number.isFinite(quality) ? quality : 0, index };
    })
    .filter(({ quality }) => quality > 0)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  const markdown = accepted.find(({ type }) => type === 'text/markdown');
  if (!markdown) return false;

  const html = accepted.find(({ type }) => type === 'text/html' || type === 'application/xhtml+xml');
  return !html || markdown.quality >= html.quality;
}

export function routeDetails(pathname) {
  const segments = pathname.split('/').filter(Boolean);
  const locale = supportedLocales.includes(segments[0]) ? segments.shift() : 'en';
  const route = `/${segments.join('/')}`;

  if (route === '/' || route === '/privacy' || route === '/terms') {
    return { locale, route };
  }

  return null;
}

function links(locale) {
  const prefix = locale === 'en' ? '' : `/${locale}`;
  return [
    `- [Homepage](${BASE_URL}${prefix || '/'})`,
    `- [Privacy policy](${BASE_URL}${prefix}/privacy)`,
    `- [Terms](${BASE_URL}${prefix}/terms)`,
    `- [Sitemap](${BASE_URL}/sitemap.xml)`,
    `- [Agent index](${BASE_URL}/llms.txt)`,
    `- [OpenAPI description](${BASE_URL}/openapi.json)`,
    '- [Source code](https://github.com/Salmon-HQ/salmon-wallet-frontend)',
  ].join('\n');
}

export function markdownForRoute({ locale, route }) {
  const page = content[locale] ?? content.en;

  if (route === '/privacy') {
    return `# ${page.name} privacy policy\n\nThe complete privacy policy is available in the HTML representation of this URL.\n\n## Where to look next\n\n${links(locale)}\n`;
  }

  if (route === '/terms') {
    return `# ${page.name} terms and conditions\n\nThe complete terms and conditions are available in the HTML representation of this URL.\n\n## Where to look next\n\n${links(locale)}\n`;
  }

  const sections = page.sections
    .map(([heading, body]) => `## ${heading}\n\n${body}`)
    .join('\n\n');

  return `# ${page.name}\n\n${page.description}\n\n${sections}\n\n## Product access\n\n- [Web wallet](https://v2.salmonwallet.io/)\n- [Browser extension](https://chromewebstore.google.com/detail/salmon-wallet/ejbidfepgijlcgahbmbckmnaljagjoll)\n- [Android app](https://play.google.com/store/apps/details?id=io.salmonwallet.app)\n\n## Site navigation\n\n${links(locale)}\n`;
}

export function markdownNotFound(pathname) {
  return `# 404 — Page not found\n\nNo Salmon Wallet page exists at \`${pathname}\`.\n\n## Where to look next\n\n- [Homepage](${BASE_URL}/)\n- [Sitemap](${BASE_URL}/sitemap.xml)\n- [Agent index](${BASE_URL}/llms.txt)\n- [OpenAPI description](${BASE_URL}/openapi.json)\n- [Source code](https://github.com/Salmon-HQ/salmon-wallet-frontend)\n`;
}
