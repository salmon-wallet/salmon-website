type LegalBlockContent = {
  paragraphs?: string[];
  bullets?: string[];
  paragraphsAfterBullets?: string[];
};

type LegalSubsection = LegalBlockContent & {
  heading: string;
};

type LegalSection = LegalBlockContent & {
  heading: string;
  subsections?: LegalSubsection[];
};

type LegalDocumentData = {
  title: string;
  intro: string;
  updatedLabel: string;
  updated: string;
  sections: LegalSection[];
};

function LegalBlock({ paragraphs, bullets, paragraphsAfterBullets }: LegalBlockContent) {
  return (
    <>
      {paragraphs?.map((paragraph) => (
        <p key={paragraph} className="mb-4">
          {paragraph}
        </p>
      ))}
      {bullets?.length ? (
        <ul className="list-disc pl-6 space-y-2 mb-4">
          {bullets.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {paragraphsAfterBullets?.map((paragraph) => (
        <p key={paragraph} className="mb-4">
          {paragraph}
        </p>
      ))}
    </>
  );
}

export default function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    <main className="pt-28 pb-20">
      <article className="mx-auto max-w-3xl px-6">
        <h1 className="text-4xl font-bold mb-6">{document.title}</h1>
        <p className="mb-6 text-text-secondary leading-relaxed">{document.intro}</p>
        <p className="mb-10 text-text-secondary leading-relaxed">
          <strong className="text-text-primary">{document.updatedLabel}:</strong>{' '}
          {document.updated}
        </p>

        <div className="prose prose-invert prose-sm max-w-none text-text-secondary leading-relaxed">
          {document.sections.map((section) => (
            <section key={section.heading} className="mt-10">
              <h2 className="text-xl font-semibold text-text-primary mb-4">
                {section.heading}
              </h2>

              <LegalBlock
                paragraphs={section.paragraphs}
                bullets={section.bullets}
                paragraphsAfterBullets={section.paragraphsAfterBullets}
              />

              {section.subsections?.map((subsection) => (
                <div key={subsection.heading} className="mt-6">
                  <h3 className="text-lg font-semibold text-text-primary mb-3">
                    {subsection.heading}
                  </h3>
                  <LegalBlock
                    paragraphs={subsection.paragraphs}
                    bullets={subsection.bullets}
                    paragraphsAfterBullets={subsection.paragraphsAfterBullets}
                  />
                </div>
              ))}
            </section>
          ))}
        </div>
      </article>
    </main>
  );
}
