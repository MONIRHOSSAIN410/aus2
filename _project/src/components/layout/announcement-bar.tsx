import { Marquee } from "@/components/motion/marquee";
import { announcements } from "@/lib/site";

export function AnnouncementBar() {
  return (
    <div className="relative z-50 border-b border-blood-700/50 bg-blood-900/60">
      <Marquee
        items={announcements}
        speed="slow"
        className="py-2"
        itemClassName="font-mono text-[10px] uppercase tracking-brand text-white/85"
      />
    </div>
  );
}
