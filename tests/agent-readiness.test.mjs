import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import {
  markdownForRoute,
  markdownNotFound,
  prefersMarkdown,
  routeDetails,
} from '../lib/agent-content.mjs';

test('Accept negotiation selects markdown without overriding a preferred HTML type', () => {
  assert.equal(prefersMarkdown('text/markdown'), true);
  assert.equal(prefersMarkdown('text/html, text/markdown;q=0.9'), false);
  assert.equal(prefersMarkdown('text/html;q=0.5, text/markdown'), true);
  assert.equal(prefersMarkdown('text/markdown;q=0'), false);
});

test('localized public routes are recognized and unknown routes are rejected', () => {
  assert.deepEqual(routeDetails('/'), { locale: 'en', route: '/' });
  assert.deepEqual(routeDetails('/es/privacy'), { locale: 'es', route: '/privacy' });
  assert.deepEqual(routeDetails('/pt/terms'), { locale: 'pt', route: '/terms' });
  assert.equal(routeDetails('/missing-page'), null);
});

test('homepage markdown has a hierarchical outline and substantial raw content', () => {
  const markdown = markdownForRoute({ locale: 'en', route: '/' });
  assert.match(markdown, /^# Salmon Wallet/m);
  assert.match(markdown, /^## Integrations/m);
  assert.ok(markdown.length > 500);
  assert.match(markdown, /llms\.txt/);
});

test('markdown 404 gives agents recovery links', () => {
  const markdown = markdownNotFound('/missing-page');
  assert.match(markdown, /^# 404/m);
  assert.match(markdown, /sitemap\.xml/);
  assert.match(markdown, /llms\.txt/);
});

test('published OpenAPI document is OpenAPI 3.1 and describes its paths', () => {
  const spec = JSON.parse(readFileSync(new URL('../public/openapi.json', import.meta.url), 'utf8'));
  assert.equal(spec.openapi, '3.1.0');
  assert.equal(spec.servers[0].url, 'https://salmonwallet.io');
  assert.ok(spec.paths['/llms.txt'].get.responses['200']);
  assert.ok(spec.paths['/openapi.json'].get.responses['200']);
});

test('CLI exposes stable machine-readable links', () => {
  const cli = fileURLToPath(new URL('../packages/salmon-cli/bin/salmon.mjs', import.meta.url));
  const output = execFileSync(process.execPath, [cli, 'links', '--json'], { encoding: 'utf8' });
  const links = JSON.parse(output);
  assert.equal(links.openapi, 'https://salmonwallet.io/openapi.json');
  assert.equal(links.agentIndex, 'https://salmonwallet.io/llms.txt');
  assert.match(links.source, /^https:\/\/github\.com\/Salmon-HQ\//);
});
