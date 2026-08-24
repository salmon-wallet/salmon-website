import { dmMono, dmSans } from './layout';

export default function GlobalNotFound() {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body className="font-sans bg-bg-primary text-text-primary antialiased">
        <main className="flex min-h-screen items-center justify-center px-6">
          <div className="max-w-xl text-center">
            <p className="eyebrow mb-4 text-accent">404</p>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Page not found</h1>
            <p className="mt-5 text-lg text-text-secondary">
              This address does not match a page on Salmon Wallet.
            </p>
            <nav aria-label="Page recovery" className="mt-8 flex flex-wrap justify-center gap-4 text-sm">
              <a href="/" className="rounded-xl bg-accent px-5 py-3 font-medium text-white">Return home</a>
              <a href="/sitemap.xml" className="rounded-xl border border-border-subtle px-5 py-3 text-text-primary">View sitemap</a>
              <a href="/llms.txt" className="rounded-xl border border-border-subtle px-5 py-3 text-text-primary">Agent index</a>
            </nav>
          </div>
        </main>
      </body>
    </html>
  );
}
