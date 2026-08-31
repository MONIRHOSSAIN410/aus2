import type { Metadata } from "next";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { PageHero } from "@/components/shared/page-hero";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqGroups } from "@/lib/faq";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Shipping, sizing, returns and drop rules — everything you need to know about ZENJI.",
};

export default function FaqPage() {
  return (
    <>
      <PageHero eyebrow="FAQ" title={"EVERYTHING YOU\nNEED TO KNOW"} />

      <section className="py-16 md:py-24">
        <div className="container max-w-3xl space-y-16">
          {faqGroups.map((group, groupIndex) => (
            <Reveal key={group.title} delay={groupIndex * 0.05}>
              <p className="zenji-eyebrow">{group.title}</p>
              <Accordion type="single" collapsible className="mt-5 border-t border-white/10">
                {group.items.map((item) => (
                  <AccordionItem key={item.q} value={item.q}>
                    <AccordionTrigger className="normal-case tracking-normal">{item.q}</AccordionTrigger>
                    <AccordionContent>{item.a}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </Reveal>
          ))}

          <Reveal className="border border-white/10 bg-ink-900 p-8 text-center">
            <p className="font-display text-3xl uppercase text-white">STILL STUCK?</p>
            <p className="mt-3 font-mono text-[13px] text-white/45">
              Send it through and we will come back within one business day.
            </p>
            <Link
              href="/contact"
              className="mt-6 inline-flex border border-white/25 px-8 py-4 font-mono text-[11px] uppercase tracking-brand text-white transition-colors hover:border-blood hover:bg-blood"
            >
              CONTACT US →
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
