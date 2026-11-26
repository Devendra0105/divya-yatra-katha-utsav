import type { ReactNode } from "react";
import { Flower2 } from "lucide-react";

import { katha } from "@/data/katha";

/** Phone-sized column (max 430px). On laptops it stays centred on a neutral backdrop. */
export function PhoneShell({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`phone-shell ${className}`}>{children}</div>;
}

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <PhoneShell className="phone-shell--ornamented text-foreground">
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
      className={`my-4 flex items-center justify-center gap-3 ${light ? "text-secondary" : "text-primary"}`}
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
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="px-5 py-10">
      <div className="text-center">
        <p className="font-display text-base text-primary">{eyebrow}</p>
        <OrnamentalDivider />
        <h2 className="text-[1.65rem] leading-[1.5] text-foreground">{title}</h2>
      </div>
      <div className="mt-6">{children}</div>
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
