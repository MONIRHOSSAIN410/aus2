import { Reveal, SplitHeading } from "@/components/motion/reveal";
import { cn } from "@/lib/utils";

export function PageHero({
  eyebrow,
  title,
  lead,
  meta,
  className,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  meta?: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <section className={cn("relative overflow-hidden border-b border-white/10", className)}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_0%,#1e0a0a_0%,#0a0a0a_60%,#050505_100%)]" />
      <div className="absolute inset-0 grid-lines opacity-40" />

      <div className="container relative py-20 md:py-28">
        <Reveal>
          <p className="zenji-eyebrow">{eyebrow}</p>
        </Reveal>

        <h1 className="zenji-display mt-6 text-6xl text-white sm:text-7xl lg:text-8xl">
          <SplitHeading text={title} />
        </h1>

        {lead && (
          <Reveal delay={0.12}>
            <p className="mt-7 max-w-xl font-mono text-[13px] leading-relaxed text-white/45">{lead}</p>
          </Reveal>
        )}

        {meta && meta.length > 0 && (
          <div className="mt-12 flex flex-wrap gap-x-12 gap-y-6">
            {meta.map((item, index) => (
              <Reveal key={item.label} delay={0.18 + index * 0.06}>
                <p className="font-display text-3xl text-white">{item.value}</p>
                <p className="mt-1 font-mono text-[10px] uppercase tracking-brand text-white/30">
                  {item.label}
                </p>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
