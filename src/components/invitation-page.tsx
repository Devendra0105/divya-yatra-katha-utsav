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
import { chiefYajmans, distinguishedYajmans, type YajmanProfile } from "@/data/guests";
import { contactGroups, instructions, yajmanContact } from "@/data/instructions";
import { katha, kathaSchedule, type KathaDay } from "@/data/katha";
import { videos } from "@/data/videos";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { sanitizeInviteeName } from "@/lib/invitation";
import { cssVars } from "@/lib/utils";

const journeyNote = "जयपुर से आरंभ, जयपुर में समापन";

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
      <InvitationContent />
    </SiteFrame>
  );
}

function AnchorButton({
  href,
  variant = "default",
  children,
}: {
  href: string;
  variant?: "default" | "outline";
  children: ReactNode;
}) {
  return (
    <Button asChild className="press h-auto min-h-12 w-full whitespace-normal py-2" variant={variant}>
      <a href={href}>{children}</a>
    </Button>
  );
}

function InvitationContent() {
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
        <YajmanList yajmans={distinguishedYajmans} title="विशिष्ट यजमान" variant="regular" />
      </PageSection>
      <InformationSection />
    </>
  );
}

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
        <h2 className="text-[1.45rem] leading-[1.5] text-foreground">
          भक्ति, कथा और तीर्थ-दर्शन का पावन संगम
        </h2>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          {katha.organizers} के तत्वावधान में आयोजित इस दस दिवसीय यात्रा में श्रीमद् भागवत कथा एवं
          जगन्नाथपुरी और गंगासागर तीर्थ क्षेत्र के दर्शनीय स्थलों का लाभ मिलेगा।
        </p>
      </div>

      <InvitatorsCard />

      <div className="mt-8 flex flex-col gap-3 sm:mx-auto sm:max-w-md">
        <AnchorButton href="#katha">कथा विवरण</AnchorButton>
        <AnchorButton href="#darshan" variant="outline">
          तीर्थ स्थलों के दर्शन
        </AnchorButton>
        <AnchorButton href="#travel" variant="outline">
          यात्रा व्यवस्था देखें
        </AnchorButton>
      </div>
    </section>
  );
}

function InvitatorsCard() {
  return (
    <div className="royal-card mt-8 px-5 py-6 text-center" data-reveal="up">
      <div className="inline-flex items-center justify-center gap-2 text-primary">
        <Users aria-hidden="true" className="size-4 shrink-0" />
        <h3 className="text-lg leading-[1.5]">आमंत्रणकर्ता एवं निवेदक</h3>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{katha.organizers}</p>

      <div className="mt-5 grid gap-4 text-left sm:grid-cols-3">
        {contactGroups.map((group) => (
          <div
            key={group.region}
            className="border border-secondary/50 bg-background/55 px-4 py-3 text-center"
          >
            <p className="border-b border-border pb-1.5 font-display text-sm text-primary">
              {group.region}
            </p>
            <ul className="mt-2.5 space-y-1.5">
              {group.contacts.map((person) => (
                <li key={person.phone} className="text-base leading-6 text-foreground">
                  {person.name}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

function KathaSection() {
  return (
    <PageSection id="katha" eyebrow="कथा" title="कथा विवरण" revealBody={false}>
      <div data-reveal="up">
        <DetailList
          items={[
            { label: "कथा", value: katha.title },
            {
              label: "कथा व्यास",
              value: `${katha.speaker}, ${katha.speakerAffiliation}`,
            },
            {
              label: "यात्रा तिथि",
              value: `${katha.startDate} – ${katha.endDate} (${katha.durationDays} दिवसीय यात्रा)`,
            },
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
          <h3 className="mt-1 text-2xl leading-[1.5] text-foreground">
            दिवस-वार श्रीमद् भागवत कथा कार्यक्रम
          </h3>
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

function KathaDayCard({ day, imageLeft }: { day: KathaDay; imageLeft: boolean }) {
  return (
    <article
      className="royal-card katha-day overflow-hidden"
      data-reveal={imageLeft ? "left" : "right"}
      aria-label={`${day.dayLabel} — ${day.date}`}
    >
      <div
        className={`grid items-stretch gap-0 md:grid-cols-12 ${
          imageLeft ? "" : "katha-day--reversed"
        }`}
      >
        <div
          className={`katha-day__media flex flex-col items-center justify-center border-b border-secondary/40 p-5 md:col-span-5 md:border-b-0 ${
            imageLeft
              ? "md:order-1 md:border-r"
              : "md:order-2 md:border-l"
          }`}
        >
          {day.illustration ? (
            <img
              src={day.illustration}
              alt={day.illustrationAlt}
              className="mx-auto max-h-48 w-auto max-w-full object-contain drop-shadow-md transition-transform duration-500 hover:scale-[1.03]"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div className="flex w-full max-w-[14rem] flex-col items-center justify-center rounded-sm border border-dashed border-secondary/75 bg-card/70 px-4 py-6 text-center">
              <BookOpenText aria-hidden="true" className="size-9 text-primary/80" strokeWidth={1.3} />
              <p className="mt-3 font-display text-sm leading-6 text-primary">
                {day.illustrationPlaceholder}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">चित्र उपलब्ध होने पर जोड़ा जाएगा</p>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col justify-between p-5 sm:p-6 md:col-span-7 ${
            imageLeft ? "md:order-2" : "md:order-1"
          }`}
        >
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-border pb-3">
              <span className="inline-flex items-center gap-1.5 border border-secondary/75 bg-primary/10 px-3 py-0.5 font-display text-xs text-primary">
                <Flower2 aria-hidden="true" className="size-3.5" strokeWidth={1.6} />
                {day.dayLabel}
              </span>
              <span className="inline-flex items-center gap-1.5 text-sm text-muted-foreground">
                <CalendarDays aria-hidden="true" className="size-3.5 text-primary" />
                {day.date}
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

function TravelSection() {
  return (
    <PageSection id="travel" eyebrow="यात्रा व्यवस्था" title="यात्रा व्यवस्था">
      <ol className="route mb-8" data-observe="" aria-label={accommodation.route.join(" → ")}>
        <li className="route__marker" aria-hidden="true" />
        {accommodation.route.map((stop, index) => (
          <li
            key={`${stop}-${index}`}
            className="route__stop royal-card mb-4 px-5 py-3 font-display text-xl leading-[1.5] text-primary last:mb-0"
            style={cssVars({ "--i": index })}
          >
            <span className="route__node" aria-hidden="true">
              <Flower2 className="size-4" strokeWidth={1.6} />
            </span>
            {stop}
          </li>
        ))}
      </ol>
      <DetailList
        items={[
          { label: "पुरी में आवास", value: accommodation.puriHotel },
          { label: "कमरा व्यवस्था", value: accommodation.roomOccupancy },
          { label: "कोलकाता में विश्राम", value: accommodation.kolkataStay },
          {
            label: "यात्रा समिति द्वारा परिवहन",
            value: <ChipList items={accommodation.committeeTransport} />,
          },
          { label: "पुरी में परिवहन", value: accommodation.puriTransport },
        ]}
      />
    </PageSection>
  );
}

function YajmanList({
  yajmans,
  title,
  variant,
}: {
  yajmans: readonly YajmanProfile[];
  title: string;
  variant: "chief" | "regular";
}) {
  if (yajmans.length === 0) {
    return (
      <EmptyDetails
        title={title}
        description={
          variant === "chief"
            ? "मुख्य यजमान का विवरण एवं छायाचित्र उपलब्ध होने पर यहां जोड़े जाएंगे।"
            : "यजमानों का विवरण एवं छायाचित्र उपलब्ध होने पर यहां जोड़े जाएंगे।"
        }
      />
    );
  }

  const isChief = variant === "chief";

  return (
    <ul
      className={
        isChief
          ? "flex flex-wrap justify-center gap-6"
          : "grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3"
      }
    >
      {yajmans.map((yajman) => (
        <li
          key={yajman.name}
          className={`royal-card yajman-card flex flex-col items-center p-5 text-center ${
            isChief ? "w-full max-w-[16rem] sm:p-6" : ""
          }`}
        >
          {yajman.image ? (
            <div
              className={`yajman-portrait mx-auto mb-4 overflow-hidden border-2 border-secondary bg-card p-1 shadow-md ${
                isChief ? "w-40" : "w-32"
              }`}
            >
              <img
                src={yajman.image}
                alt={yajman.name}
                className="aspect-[3/4] h-full w-full object-cover object-top"
                loading="lazy"
                decoding="async"
              />
            </div>
          ) : null}
          <p
            className={`font-display leading-[1.5] text-foreground ${
              isChief ? "text-xl text-primary" : "text-lg"
            }`}
          >
            {yajman.name}
          </p>
          {yajman.title ? <p className="mt-1 text-sm text-muted-foreground">{yajman.title}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function PhoneLink({ name, phone }: { name: string; phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="flex min-h-12 items-center justify-between gap-3 border-b border-border px-5 py-2 transition-colors hover:bg-accent/30 last:border-b-0"
    >
      <span className="min-w-0 text-base">{name}</span>
      <span className="inline-flex shrink-0 items-center gap-2 text-sm text-primary">
        <Phone aria-hidden="true" className="size-4" />
        {phone}
      </span>
    </a>
  );
}

function InformationSection() {
  return (
    <PageSection id="information" eyebrow="सूचनाएँ" title="आवश्यक नियम व निर्देश">
      <ol className="space-y-px border border-secondary/60 bg-border">
        {instructions.map((instruction, index) => (
          <li key={instruction} className="flex gap-4 bg-card/80 px-5 py-4">
            <span className="font-display text-xl leading-[1.5] text-primary">{index + 1}.</span>
            <span className="min-w-0 text-base leading-7">{instruction}</span>
          </li>
        ))}
      </ol>

      <div className="royal-card mt-8">
        <p className="px-5 pt-4 text-sm leading-7 text-muted-foreground">
          अपने पूर्वजों की पुण्य स्मृति में श्रीमद्भागवत पाठ पारायण के यजमान बनने हेतु संपर्क
        </p>
        <PhoneLink name={yajmanContact.name} phone={yajmanContact.phone} />
      </div>

      <h3 className="mt-10 text-center text-xl leading-[1.5] text-foreground">संपर्क सूत्र</h3>
      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {contactGroups.map((group) => (
          <div key={group.region} className="royal-card">
            <p className="border-b border-border px-5 py-2 font-display text-lg leading-[1.5] text-primary">
              {group.region}
            </p>
            {group.contacts.map((contact) => (
              <PhoneLink key={contact.phone} name={contact.name} phone={contact.phone} />
            ))}
          </div>
        ))}
      </div>

      <h3 className="mt-10 text-center text-xl leading-[1.5] text-foreground">वीडियो गैलरी</h3>
      <div className="mt-4">
        {videos.length === 0 ? (
          <EmptyDetails
            title="वीडियो गैलरी"
            description="वीडियो उपलब्ध होने पर यहां जोड़े जाएंगे।"
          />
        ) : (
          <ul className="grid gap-3 md:grid-cols-2">
            {videos.map((video) => (
              <li key={video.url}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="royal-card block overflow-hidden transition-transform hover:-translate-y-0.5"
                >
                  {video.thumbnail ? (
                    <img
                      src={video.thumbnail}
                      alt=""
                      className="aspect-video w-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  ) : null}
                  <span className="block px-5 py-3 text-base">{video.title}</span>
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </PageSection>
  );
}
