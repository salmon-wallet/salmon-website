export const supportedLocales: readonly string[];
export function acceptsJson(acceptHeader?: string): boolean;
export function withVary(existing: string | null, value: string): string;
export function prefersMarkdown(acceptHeader?: string): boolean;
export function routeDetails(pathname: string): { locale: string; route: string } | null;
export function markdownForRoute(route: { locale: string; route: string }): string;
export function markdownNotFound(pathname: string): string;
