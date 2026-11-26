import { useState } from "react";
import { Link, useSearch } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, Clock3, MapPin, Sparkles } from "lucide-react";

import jagannathArtwork from "@/assets/divya-yatra/jagannath-artwork.jpg.asset.json";
import lotusMandala from "@/assets/divya-yatra/lotus-mandala.jpg.asset.json";
import { Button } from "@/components/ui/button";
import { katha } from "@/data/katha";
import { sanitizeInviteeName } from "@/lib/invitation";
import { OrnamentalDivider, PageWidth, SiteFrame } from "@/components/site-chrome";

export function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const search = useSearch({ strict: false });
  const guestName = sanitizeInviteeName(search["to"]);

  if (!opened) {
    return <InvitationCover guestName={guestName} onOpen={() => setOpened(true)} />;
  }

  return (
    <SiteFrame>
      <InvitationContent />
    </SiteFrame>
  );
}

function InvitationCover({
  guestName,
  onOpen,
}: {
  guestName: string | undefined;
  onOpen: () => void;
}) {
  return (
    <main className="invitation-cover relative isolate flex min-h-svh items-center justify-center overflow-hidden bg-primary px-5 py-10 text-primary-foreground">
      <img
        src={lotusMandala.url}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        fetchPriority="high"
      />
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/80" />
      <div aria-hidden="true" className="absolute inset-3 border border-secondary/80 sm:inset-6" />
      <div aria-hidden="true" className="absolute inset-5 border border-secondary/40 sm:inset-8" />

      <div className="entry-reveal relative z-10 mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <img
          src={jagannathArtwork.url}
          alt="भगवान श्री जगन्नाथ का चित्र"
          className="mb-5 h-36 w-24 border border-secondary/80 object-cover object-center shadow-lg sm:h-44 sm:w-28"
          fetchPriority="high"
        />
        <p className="text-sm font-semibold text-secondary sm:text-base">{katha.organizers}</p>
        <OrnamentalDivider light />
        <p className="text-sm text-primary-foreground/80">सप्रेम आमंत्रण</p>
        <h1 className="mt-3 font-display text-3xl leading-tight text-primary-foreground sm:text-5xl">
          {katha.title}
        </h1>
        <p className="mt-5 font-display text-xl text-secondary sm:text-2xl">
          {guestName ? `आदरणीय ${guestName} जी` : "आप सादर आमंत्रित हैं"}
        </p>
        <p className="mt-3 max-w-xl text-sm leading-7 text-primary-foreground/85 sm:text-base">
          {katha.location}
        </p>
        <p className="mt-1 text-sm text-primary-foreground/75">
          {katha.startDate} से {katha.endDate}
        </p>
        <Button
          className="mt-8 min-h-12 border-secondary bg-transparent px-7 text-primary-foreground hover:bg-primary-foreground/10"
          onClick={onOpen}
          size="lg"
          variant="outline"
        >
          <Sparkles aria-hidden="true" />
          निमंत्रण खोलें
        </Button>
        <p className="mt-5 text-xs text-primary-foreground/70">शुभारंभ हेतु स्पर्श करें</p>
      </div>
    </main>
  );
}

function InvitationContent() {
  return (
    <>
      <section className="relative isolate overflow-hidden bg-primary py-16 text-primary-foreground sm:py-24">
        <img
          src={lotusMandala.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-70"
        />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-primary/85" />
        <PageWidth className="text-center">
          <p className="text-sm font-semibold text-secondary">सप्रेम आमंत्रण</p>
          <OrnamentalDivider light />
          <h1 className="mx-auto max-w-4xl font-display text-3xl leading-tight text-primary-foreground sm:text-5xl">
            {katha.title}
          </h1>
          <p className="mt-4 text-lg text-secondary sm:text-xl">{katha.location}</p>
          <div className="my-8 flex justify-center">
            <img
              src={jagannathArtwork.url}
              alt="भगवान श्री जगन्नाथ का चित्र"
              className="h-64 w-40 border border-secondary/70 object-cover object-center sm:h-80 sm:w-52"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="flex flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm text-primary-foreground/90">
            <span className="inline-flex items-center gap-2">
              <CalendarDays aria-hidden="true" className="size-4 text-secondary" />
              {katha.startDate} – {katha.endDate}
            </span>
            <span className="inline-flex items-center gap-2">
              <Clock3 aria-hidden="true" className="size-4 text-secondary" />
              {katha.durationDays} दिवसीय यात्रा
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin aria-hidden="true" className="size-4 text-secondary" />
              जयपुर से आरंभ, जयपुर में समापन
            </span>
          </div>
          <Link to="/katha" className="mt-8 inline-flex">
            <Button className="min-h-11" size="lg">
              कथा विवरण <ArrowRight aria-hidden="true" />
            </Button>
          </Link>
        </PageWidth>
      </section>

      <section className="py-14 sm:py-20">
        <PageWidth>
          <div className="mx-auto max-w-4xl text-center">
            <p className="text-sm font-semibold text-primary">यात्रा का आमंत्रण</p>
            <OrnamentalDivider />
            <h2 className="font-display text-2xl leading-tight text-foreground sm:text-4xl">
              भक्ति, कथा और तीर्थ-दर्शन का पावन संगम
            </h2>
            <p className="mt-5 text-base leading-8 text-muted-foreground">
              {katha.organizers} के तत्वावधान में आयोजित इस दस दिवसीय यात्रा में श्रीमद् भागवत कथा एवं
              जगन्नाथपुरी और गंगासागर तीर्थ क्षेत्र के दर्शनीय स्थलों का लाभ मिलेगा।
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-2">
            <div className="bg-card px-6 py-8 text-center sm:px-10">
              <p className="text-sm text-muted-foreground">प्रति यात्री मूल किराया</p>
              <p className="mt-2 font-display text-3xl text-primary">₹{katha.farePerTraveler.toLocaleString("en-IN")}/-</p>
            </div>
            <div className="bg-card px-6 py-8 text-center sm:px-10">
              <p className="text-sm text-muted-foreground">प्रति जोड़ा मूल किराया</p>
              <p className="mt-2 font-display text-3xl text-primary">₹{katha.farePerCouple.toLocaleString("en-IN")}/-</p>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-3">
            <Link to="/darshan">
              <Button size="lg" variant="default">
                तीर्थ स्थलों के दर्शन <ArrowRight aria-hidden="true" />
              </Button>
            </Link>
            <Link to="/travel">
              <Button size="lg" variant="outline">
                यात्रा व्यवस्था देखें
              </Button>
            </Link>
          </div>
        </PageWidth>
      </section>
    </>
  );
}