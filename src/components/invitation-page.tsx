// Invitation page with per‑guest name on the cover
import { useEffect, useState, type ReactNode } from "react";
import { useSearch } from "@tanstack/react-router";
import { BookOpenText, CalendarDays, Clock3, Flower2, MapPin, Phone, Users } from "lucide-react";
import jagannathArtwork from "@/assets/divya-yatra/jagannath-artwork.jpg.asset.jpeg";
import { DestinationExplorer } from "@/components/destination-explorer";
import { InvitationCover } from "@/components/invitation-cover";
import { Button } from "@/components/ui/button";
import {
  AksharHeader,
  DetailList,
  EmptyDetails,
  OrnamentalDivider,
  PageSection,
  SiteFrame,
} from "@/components/site-chrome";
import { accommodation } from "@/data/accommodation";

import { contactGroups, instructions, yajmanContact } from "@/data/instructions";
import { katha, kathaSchedule, type KathaDay } from "@/data/katha";
import { videos } from "@/data/videos";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { sanitizeInviteeName } from "@/lib/invitation";
import { chiefYajmans, distinguishedYajmans, type YajmanProfile } from "@/data/guests";

const journeyNote = "जयपुर से आरंभ, जयपुर में समापन";

/** Top‑level page component */
export function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const search = useSearch({ strict: false }) as Record<string, unknown>;
  const guestName = sanitizeInviteeName(search["to"]);

  if (!opened) {
  return (
    <InvitationCover
      guestName={guestName}
      onOpened={() => {
        window.scrollTo(0, 0);
        setOpened(true);
      }}
    />
  );
}

  return (
    <SiteFrame>
      <InvitationContent guestName={guestName} />
    </SiteFrame>
  );
}

/** Small button component used throughout the page */
function AnchorButton({
  href,
  variant = "default",
  children,
}: {
  href: string;                 // e.g. "#katha", "#darshan", "#travel"
  variant?: "default" | "outline";
  children: ReactNode;
}) {
  // ---- NEW: click handler that scrolls to the target element ----
  const handleClick = (e: React.MouseEvent) => {
    // Prevent the router from handling this as a route change
    e.preventDefault();

    // Extract the element id (strip the leading "#")
    const targetId = href.replace(/^#/, "");
    const el = document.getElementById(targetId);
    if (el) {
      // Smooth scroll to the target section
      el.scrollIntoView({ behavior: "smooth" });
    }
  };
  // --------------------------------------------------------------

  return (
    <Button
      asChild
      className="press h-auto min-h-12 w-full whitespace-normal py-2"
      variant={variant}
    >
      {/* Attach the custom click handler */}
      <a href={href} onClick={handleClick}>
        {children}
      </a>
    </Button>
  );
}
/** Main content after the cover is opened */
function InvitationContent({ guestName }: { guestName: string | undefined }) {
  useScrollReveal();
  useEffect(() => {
    document.getElementById("invite")?.focus({ preventScroll: true });
  }, []);

  return (
    <>
      <InviteSection />
      <KathaSection />
      <PageSection id="darshan" eyebrow="दर्शन" title="तीर्थ स्थलों के दर्शन" revealBody={false}>
        <DestinationExplorer />
      </PageSection>
      <TravelSection />
      <PageSection id="chief-yajmans" eyebrow="यजमान" title="मुख्य यजमान">
        <YajmanList yajmans={chiefYajmans} title="मुख्य यजमान" variant="chief" />
      </PageSection>
      <PageSection id="distinguished-yajmans" eyebrow="यजमान" title="विशिष्ट यजमान">
        <YajmanList yajmans={distinguishedYajmans} variant="regular" />
      </PageSection>
      <InformationSection />
    </>
  );
}

/** Section that shows the invitation details and navigation buttons */
function InviteSection() {
  return (
    <section id="invite" tabIndex={-1} className="band-top page-enter px-5 pb-10 text-center outline-none sm:px-7">
      <AksharHeader />
      <OrnamentalDivider />
      <h1 className="sheen-text text-[1.9rem] leading-[1.5] text-primary sm:text-[2.15rem]">{katha.title}</h1>
      <p className="mt-2 text-base leading-7 text-foreground">{katha.location}</p>

      <div className="my-8" data-reveal="zoom">
        <div className="arch mx-auto aspect-[5/4] w-full max-w-[19rem]">
          <div className="kenburns h-full w-full">
            <img
              src={jagannathArtwork}
              alt="भगवान श्री जगन्नाथ का चित्र"
              className="h-full w-full scale-[1.06] object-cover object-center"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>

      <ul className="space-y-3 text-sm text-foreground sm:flex sm:flex-wrap sm:justify-center sm:gap-6 sm:space-y-0">
        <li className="flex items-center justify-center gap-2">
          <CalendarDays aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {katha.startDate} – {katha.endDate}
        </li>
        <li className="flex items-center justify-center gap-2">
          <Clock3 aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {katha.durationDays} दिवसीय यात्रा
        </li>
        <li className="flex items-center justify-center gap-2">
          <MapPin aria-hidden="true" className="size-4 shrink-0 text-primary" />
          {journeyNote}
        </li>
      </ul>

      <div className="mt-10" data-reveal="up">
        <h2 className="text-[1.45rem] leading-[1.5] text-foreground">भक्ति, कथा और तीर्थ-दर्शन का पावन संगम</h2>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          {katha.organizers} के तत्वावधान में आयोजित इस दस दिवसीय यात्रा में श्रीमद् भागवत कथा एवं
          जगन्नाथपुरी और गंगासागर तीर्थ क्षेत्र के दर्शनीय स्थलों का लाभ मिलेगा।
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md">
        <AnchorButton href="#katha">कथा विवरण</AnchorButton>
        <AnchorButton href="#darshan" variant="outline">तीर्थ स्थलों के दर्शन</AnchorButton>
        <AnchorButton href="#travel" variant="outline">यात्रा व्यवस्था देखें</AnchorButton>
      </div>
    </section>
  );
}

/** Katha schedule section (zig‑zag layout) */
function KathaSection() {
  return (
    <PageSection id="katha" eyebrow="कथा" title="कथा विवरण" revealBody={false}>
      <div data-reveal="up">
        <DetailList
          items={[
            { label: "कथा", value: katha.title },
            { label: "कथा व्यास", value: `${katha.speaker}, ${katha.speakerAffiliation}` },
            { label: "यात्रा तिथि", value: `${katha.startDate} – ${katha.endDate} (${katha.durationDays} दिवसीय यात्रा)` },
            { label: "कथा आरंभ", value: `${katha.kathaStartDate} (${katha.dailyDurationNote})` },
            { label: "स्थान", value: katha.location },
            { label: "आयोजक", value: katha.organizers },
            { label: "यात्रा मार्ग", value: journeyNote },
          ]}
        />
      </div>

      <div className="mt-10">
        <div className="text-center" data-reveal="up">
          <p className="font-display text-sm tracking-wide text-primary">दैनिक कथा क्रम</p>
          <h3 className="mt-1 text-2xl leading-[1.5] text-foreground">दिवस-वार श्रीमद् भागवत कथा कार्यक्रम</h3>
          <p className="mt-1 text-sm text-muted-foreground">{katha.dailyDurationNote}</p>
        </div>
        <div className="mt-6 space-y-6">
          {kathaSchedule.map((day, index) => (
            <KathaDayCard key={day.dayNumber} day={day} imageLeft={index % 2 === 0} />
          ))}
        </div>
      </div>
    </PageSection>
  );
}

/** Individual day card used by KathaSection */
function KathaDayCard({ day, imageLeft }: { day: KathaDay; imageLeft: boolean }) {
  return (
    <article className="royal-card katha-day overflow-hidden" data-reveal={imageLeft ? "left" : "right"} aria-label={`${day.dayLabel} — ${day.date}`}>
      <div className={`grid md:grid-cols-12 gap-0 ${imageLeft ? "" : "katha-day--reversed"}`}>
        <div
          className={`katha-day__media flex flex-col items-center justify-center border-b border-secondary/40 p-5 md:col-span-5 md:border-b-0 ${
            imageLeft ? "md:order-1 md:border-r" : "md:order-2 md:border-l"
          }`}
        >
          {day.illustration ? (
            <img
              src={day.illustration}
              alt={day.illustrationAlt}
              className="w-full max-w-[380px] md:max-w-[460px] object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex w-full max-w-[14rem] flex-col items-center justify-center rounded-sm border border-dashed border-secondary/75 bg-card/70 px-4 py-6 text-center">
              <BookOpenText aria-hidden="true" className="size-9 text-primary/80" strokeWidth={1.3} />
              <p className="mt-3 font-display text-sm leading-6 text-primary">{day.illustrationPlaceholder}</p>
              <p className="mt-1 text-xs text-muted-foreground">चित्र उपलब्ध होने पर जोड़ा जाएगा</p>
            </div>
          )}
        </div>
        <div className={`flex flex-col justify-between p-5 sm:p-6 md:col-span-7 ${imageLeft ? "md:order-2" : "md:order-1"}`}>
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <span className="inline-flex items-center gap-1.5 border border-secondary/75 bg-primary/10 px-3 py-0.5 font-display text-xs text-primary">
                <Flower2 aria-hidden="true" className="size-3.5" strokeWidth={1.6} />{day.dayLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays aria-hidden="true" className="size-3.5 text-primary" />{day.date}
              </span>
            </div>
            <h4 className="mt-3 font-display text-xl leading-[1.5] text-primary">{day.title}</h4>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-foreground/90">
              {day.points.map((point) => (
                <li key={point} className="flex items-start gap-2">
                  <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="katha-meta-box mt-5 grid gap-2.5 border border-secondary/65 bg-background/65 p-3.5 sm:grid-cols-2">
            <div className="flex items-start gap-2">
              <Clock3 aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-[0.72rem] tracking-wide text-muted-foreground">कथा का समय</p>
                <p className="text-sm font-medium leading-6 text-foreground">{day.timing}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <MapPin aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <div className="min-w-0">
                <p className="text-[0.72rem] tracking-wide text-muted-foreground">कथा का स्थान</p>
                <p className="text-sm font-medium leading-6 text-foreground">{day.venue}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/** Helper component used elsewhere – keep placeholder implementation */
function ChipList({ items }: { items: readonly string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item} className="border border-secondary/70 bg-background/60 px-3 py-1 text-sm">
          {item}
        </li>
      ))}
    </ul>
  );
}
import React from "react";

/* Placeholder data – replace with your real travel‑info later */
const travelInfo = [
  {
    title: "Travel Arrangement",
    description: "All transportation, accommodation & meals are included.",
  },
];

export function TravelSection() {
  return (
    <section id="travel" className="py-12 bg-primary/5" data-reveal="up">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">यात्रा व्यवस्था</h2>
        <div className="grid gap-6">

          {/* Hotel & Room */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-foreground">होटल एवं व्यवस्था</h3>
            <p className="text-foreground mb-1"><strong>{accommodation.puriHotel}</strong></p>
            <p className="text-foreground">{accommodation.roomOccupancy}</p>
          </div>
          {/* Kolkata Stay */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-foreground">कोलकाता में ठहराव</h3>
            <p className="text-foreground">{accommodation.kolkataStay}</p>
          </div>
          {/* Committee Transport */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-foreground">यात्रा समिति द्वारा परिवहन</h3>
            <ul className="list-disc list-inside space-y-1 text-foreground">
              {accommodation.committeeTransport.map((place, idx) => (
                <li key={idx}>{place}</li>
              ))}
            </ul>
          </div>
          {/* Puri Transport */}
          <div className="bg-primary/10 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-2 text-foreground">पुरी में परिवहन</h3>
            <p className="text-foreground">{accommodation.puriTransport}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Placeholder – replace with the real InformationSection when you create it */
export function InformationSection() {
  return (
    <section className="py-12 text-center bg-primary/5">
      <h2 className="text-xl font-semibold text-foreground mb-6">यात्रा निर्देश</h2>
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Instructions table */}
<div className="p-4 bg-primary/10 rounded-lg text-center">
          <thead>
            <tr className="bg-primary/10">
              <th className="p-2 border-b border-primary/20 text-foreground">#</th>
              <th className="p-2 border-b border-primary/20 text-foreground">निर्देश</th>
            </tr>
          </thead>
          <tbody>
            {instructions.map((inst, i) => (
              <tr key={i}>
                <td className="p-2 border-b border-primary/10">{i + 1}</td>
                <td className="p-2 border-b border-primary/10">{inst}</td>
              </tr>
            ))}
          </tbody>
</div>
        {/* Yajman contact */}
        <div className="text-center">
          <h3 className="text-lg font-medium mb-2 text-foreground">यजमान संपर्क</h3>
          <p className="text-foreground">{yajmanContact.name}: {yajmanContact.phone}</p>
        </div>
        {/* Contact groups table */}
<div className="p-4 bg-primary/10 rounded-lg text-center">
          <thead>
            <tr className="bg-primary/10">
              <th className="p-2 border-b border-primary/20 text-foreground">क्षेत्र</th>
              <th className="p-2 border-b border-primary/20 text-foreground">संपर्क</th>
            </tr>
          </thead>
          <tbody>
            {contactGroups.map((group, i) => (
              <tr key={i}>
                <td className="p-2 border-b border-primary/10 align-top font-medium">{group.region}</td>
                <td className="p-2 border-b border-primary/10">
                  <ul className="list-disc list-inside space-y-1">
                    {group.contacts.map((c, j) => (
                      <li key={j}>{c.name}: {c.phone}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
</div>
        {/* Footer spacer */}
        <div className="pt-12"></div>
      </div>
    </section>
  );
}



/** Minimal YajmanList placeholder – shows a simple list of names */
export function YajmanList({
  yajmans,
  title,
  variant,
}: {
  yajmans: YajmanProfile[];
  title: string;
  variant: "chief" | "regular";
}) {
  // "chief" variant: render a single large card
  if (variant === "chief" && yajmans.length > 0) {
    const chief = yajmans[0];
    return (
      <section className="py-12 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4">{title}</h2>
          {chief.image && (
            <img
              src={chief.image}
              alt={chief.name}
              className="w-64 aspect-[4/3] object-cover rounded-md mx-auto mb-4 border-4 border-primary"
            />
          )}
          <p className="text-xl font-medium">{chief.name}</p>
          {chief.title && (
            <p className="text-gray-600 italic">{chief.title}</p>
          )}
        </div>
      </section>
    );
  }

  // "regular" variant: render a responsive grid of cards
  return (
    <section id="travel" className="py-12 bg-primary/5" data-reveal="up">
      <div className="max-w-5xl mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">{title}</h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {yajmans.map((y) => (
            <div
              key={y.id}
              className="flex flex-col items-center bg-primary/5 p-4 rounded-lg border border-primary/30 shadow-sm"
            >
              {y.image && (
                <img
                  src={y.image}
                  alt={y.name}
                  className="w-28 aspect-[4/3] object-cover rounded-md mb-3"
                />
              )}
              <p className="font-medium text-center">{y.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
// Add this import near the other imports


// Route‑map component
function RouteMapSection() {
  return (
    <section className="py-12 bg-primary/5">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-6 text-foreground">
          यात्रा मार्ग मानचित्र
        </h2>
        <img
          src={routeMap}
          alt="India route map showing Jaipur → Jagannathpur → Kolkata → Jaipur"
          className="w-full max-w-4xl mx-auto rounded-lg shadow-md"
        />
        <p className="mt-4 text-foreground">
          यह मानचित्र यात्रा की प्रमुख स्थलों को दर्शाता है – जयपुर से शुरू होकर
          जगन्नाथपुरी, कोलकाता और फिर वापस जयपुर तक।
        </p>
      </div>
    </section>
  );
}