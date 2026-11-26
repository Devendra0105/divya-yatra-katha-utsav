import { useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Flower2, Landmark, Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";

const navigation = [
  { to: "/invite", label: "निमंत्रण" },
  { to: "/katha", label: "कथा" },
  { to: "/darshan", label: "दर्शन" },
  { to: "/travel", label: "यात्रा व्यवस्था" },
  { to: "/chief-guests", label: "मुख्य अतिथि" },
  { to: "/distinguished-guests", label: "विशिष्ट अतिथि" },
  { to: "/information", label: "सूचनाएँ" },
] as const;

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>{children}</main>
      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 sm:flex-row sm:items-center sm:justify-between sm:px-8">
          <div>
            <p className="font-display text-lg">दिव्य यात्रा</p>
            <p className="mt-1 text-sm text-primary-foreground/75">
              {"श्री स्वामिनारायण सत्संग मंडल, दौसा एवं जोधपुर"}
            </p>
          </div>
          <Link
            to="/information" as any
            className="inline-flex items-center gap-2 text-sm text-primary-foreground transition-colors hover:text-secondary"
          >
            संपर्क एवं आवश्यक सूचनाएँ <span aria-hidden="true">↗</span>
          </Link>
        </div>
      </footer>
    </div>
  );
}

function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 backdrop-blur">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" aria-label="दिव्य यात्रा — आरंभ">
          <span className="flex size-10 shrink-0 items-center justify-center border border-secondary text-primary">
            <Landmark aria-hidden="true" className="size-5" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight text-primary">
              दिव्य यात्रा
            </span>
            <span className="block truncate text-xs text-muted-foreground">जगन्नाथपुरी · 2026</span>
          </span>
        </Link>

        <nav aria-label="मुख्य नेविगेशन" className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const isActive = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to as any}
                className={`whitespace-nowrap border-b-2 px-2 py-2 text-sm transition-colors ${
                  isActive
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:border-secondary hover:text-foreground"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <Button
          aria-label={menuOpen ? "नेविगेशन बंद करें" : "नेविगेशन खोलें"}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className="xl:hidden"
          onClick={() => setMenuOpen((current) => !current)}
          size="icon"
          variant="ghost"
        >
          {menuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </Button>
      </div>

      <nav
        id="mobile-navigation"
        aria-label="मोबाइल नेविगेशन"
        className={`${menuOpen ? "grid" : "hidden"} grid-cols-2 border-t border-border px-4 py-3 xl:hidden`}
      >
        {navigation.map((item) => (
          <Link
            key={item.to}
            to={item.to as any}
            onClick={() => setMenuOpen(false)}
            className={`border-b border-border px-2 py-3 text-sm ${
              pathname === item.to ? "font-semibold text-primary" : "text-foreground"
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function PageWidth({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-7xl px-5 sm:px-8 ${className}`}>{children}</div>;
}

export function OrnamentalDivider({ light = false }: { light?: boolean }) {
  return (
    <div
      aria-hidden="true"
      className={`my-5 flex items-center justify-center gap-3 ${light ? "text-secondary" : "text-primary"}`}
    >
      <span className="h-px w-12 bg-current/50" />
      <Flower2 className="size-5" strokeWidth={1.5} />
      <span className="h-px w-12 bg-current/50" />
    </div>
  );
}

export function PageHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <section className="border-b border-border bg-card/60 py-14 sm:py-20">
      <PageWidth className="text-center">
        <p className="text-sm font-semibold text-primary">{eyebrow}</p>
        <OrnamentalDivider />
        <h1 className="mx-auto max-w-4xl font-display text-3xl leading-tight text-foreground sm:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-muted-foreground sm:text-lg">
          {description}
        </p>
      </PageWidth>
    </section>
  );
}

export function EmptyDetails({ title, description }: { title: string; description: string }) {
  return (
    <div className="mx-auto flex max-w-3xl flex-col items-center border border-secondary/70 bg-card/70 px-6 py-12 text-center sm:px-10">
      <Flower2 aria-hidden="true" className="size-8 text-primary" strokeWidth={1.4} />
      <h2 className="mt-5 font-display text-2xl text-foreground">{title}</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-muted-foreground">{description}</p>
    </div>
  );
}