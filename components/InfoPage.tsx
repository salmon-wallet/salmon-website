import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export type InfoSection = { heading: string; paragraphs: readonly string[] };

export default function InfoPage({ title, intro, sections }: { title: string; intro: string; sections: readonly InfoSection[] }) {
  return (
    <>
      <Navbar />
      <main className="pb-20 pt-28">
        <article className="mx-auto max-w-3xl px-6">
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">{title}</h1>
          <p className="mb-12 text-lg leading-relaxed text-text-secondary">{intro}</p>
          <div className="space-y-10">
            {sections.map((section) => (
              <section key={section.heading}>
                <h2 className="mb-4 text-2xl font-bold text-text-primary">{section.heading}</h2>
                <div className="space-y-4 leading-relaxed text-text-secondary">
                  {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                </div>
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
