import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/shared/page-hero";

export interface LegalSection {
  heading: string;
  id?: string;
  body: string[];
}

export function LegalPage({
  eyebrow,
  title,
  updated,
  sections,
}: {
  eyebrow: string;
  title: string;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={eyebrow} title={title} lead={`Last updated: ${updated}`} />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl space-y-12">
          {sections.map((section, index) => (
            <div key={section.heading} id={section.id} className="scroll-mt-28">
              <Reveal delay={index * 0.04}>
                <h2 className="font-display text-2xl uppercase text-white">{section.heading}</h2>
                <div className="mt-4 space-y-3 font-mono text-[13px] leading-relaxed text-white/50">
                  {section.body.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </Reveal>
            </div>
          ))}

          <p className="border-t border-white/10 pt-8 font-mono text-[10px] uppercase tracking-brand text-white/25">
            This page is placeholder copy for a demo storefront. Replace it with policy reviewed by
            your own legal advisor before going live.
          </p>
        </div>
      </section>
    </>
  );
}
