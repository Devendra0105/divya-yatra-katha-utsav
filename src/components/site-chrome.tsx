import type { ReactNode } from "react";
import { Flower2 } from "lucide-react";

import { aksharPurushottamBanner, katha } from "@/data/katha";

/** Phone-first column (430px on mobile, gracefully expanded on tablets/desktop). */
export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`phone-shell ${className}`}>{children}</div>;
}

/** Consistent top emblem for Shree Akshar Purushottam Maharaj across cover and major sections. */
export function AksharHeader({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`akshar-header ${compact ? "mb-3" : "mb-4"} flex flex-col items-center text-center`}>
      {aksharPurushottamBanner.src ? (
        <img
          src={aksharPurushottamBanner.src}
          alt={aksharPurushottamBanner.alt}
          className={`mx-auto w-auto max-w-full object-contain drop-shadow-sm ${
            compact ? "h-12 sm:h-14" : "h-14 sm:h-16"
          }`}
          decoding="async"
        />
      ) : (
        <div
          className="akshar-crest inline-flex items-center gap-2 border border-secondary/75 bg-card/85 px-4 py-1.5 text-xs text-primary shadow-sm sm:text-sm"
          aria-label={aksharPurushottamBanner.title}
        >
          <Flower2 className="size-3.5 shrink-0 text-secondary" strokeWidth={1.6} aria-hidden="true" />
          <span className="font-display tracking-wide">{aksharPurushottamBanner.title}</span>
          <Flower2 className="size-3.5 shrink-0 text-secondary" strokeWidth={1.6} aria-hidden="true" />
        </div>
      )}
    </div>
  );
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <PhoneShell className="phone-shell--ornamented text-foreground">
      <div className="scroll-progress" aria-hidden="true">
        <div className="scroll-progress__bar" />
      </div>
      <main>{children}</main>
      <footer className="band-bottom px-5 pt-8 text-center">
        <OrnamentalDivider />
        <p className="font-display text-xl leading-[1.5] text-primary">दिव्य यात्रा</p>
        <p className="mt-1 text-sm text-muted-foreground">{katha.organizers}</p>
        <a
          href="#information"
          className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm text-primary underline-offset-4 hover:underline"
        >
          संपर्क एवं आवश्यक सूचनाएँ <span aria-hidden="true">↑</span>
        </a>
      </footer>
    </PhoneShell>
  );
}

export function OrnamentalDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      data-observe=""
      className={`orn my-4 flex items-center justify-center gap-3 ${light ? "text-secondary" : "text-primary"}`}
    >
      <span className="h-px w-12 bg-current/50" />
      <Flower2 className="size-5" strokeWidth={1.5} />
      <span className="h-px w-12 bg-current/50" />
    </div>
  );
}

/** One section of the single-page invitation; `id` is the in-page anchor. */
export function PageSection({
  id,
  eyebrow,
  title,
  revealBody = true,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  revealBody?: boolean;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-10 sm:px-7">
      <div className="text-center">
        <AksharHeader compact />
        <p className="font-display text-base text-primary">{eyebrow}</p>
        <OrnamentalDivider />
        <h2 className="text-[1.65rem] leading-[1.5] text-foreground">{title}</h2>
      </div>
      <div className="mt-6" {...(revealBody ? { "data-reveal": "up" } : {})}>
        {children}
      </div>
    </section>
  );
}

export function EmptyDetails({ title, description }: { title: string; description: string }) {
  return (
    <div className="flex flex-col items-center border border-secondary/70 bg-card/70 px-5 py-8 text-center">
      <Flower2 aria-hidden="true" className="size-8 text-primary" strokeWidth={1.4} />
      <h3 className="mt-4 text-xl leading-[1.5] text-foreground">{title}</h3>
      <p className="mt-2 text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}

/** Label/value rows used by the Katha and travel sections. */
export function DetailList({ items }: { items: readonly { label: string; value: ReactNode }[] }) {
  return (
    <dl className="border border-secondary/60 bg-card/70">
      {items.map((item) => (
        <div key={item.label} className="border-b border-border px-5 py-4 last:border-b-0">
          <dt className="text-xs text-muted-foreground">{item.label}</dt>
          <dd className="mt-1 text-base leading-7 text-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  );
}

