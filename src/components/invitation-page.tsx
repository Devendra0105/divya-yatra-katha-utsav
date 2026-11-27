import { useEffect, useState, type ReactNode } from "react";
import { useSearch } from "@tanstack/react-router";
import { CalendarDays, Clock3, Flower2, MapPin, Phone } from "lucide-react";

import jagannathArtwork from "@/assets/divya-yatra/jagannath-artwork.jpg.asset.jpeg";
import { DestinationExplorer } from "@/components/destination-explorer";
import { InvitationCover } from "@/components/invitation-cover";
import { Button } from "@/components/ui/button";
import {
  DetailList,
  EmptyDetails,
  OrnamentalDivider,
  PageSection,
  SiteFrame,
} from "@/components/site-chrome";
import { accommodation } from "@/data/accommodation";
import { chiefGuests, distinguishedGuests, type GuestProfile } from "@/data/guests";
import { contactGroups, instructions, yajmanContact } from "@/data/instructions";
import { katha } from "@/data/katha";
import { videos } from "@/data/videos";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { sanitizeInviteeName } from "@/lib/invitation";
import { cssVars } from "@/lib/utils";

const formatRupees = (amount: number) => `₹${amount.toLocaleString("en-IN")}/-`;
const journeyNote = "जयपुर से आरंभ, जयपुर में समापन";

export function InvitationPage() {
  const [opened, setOpened] = useState(false);
  const search = useSearch({ strict: false });
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
    <Button asChild className="h-auto min-h-12 w-full whitespace-normal py-2" variant={variant}>
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
      <PageSection id="chief-guests" eyebrow="अतिथि" title="मुख्य अतिथि">
        <GuestList guests={chiefGuests} title="मुख्य अतिथि" />
      </PageSection>
      <PageSection id="distinguished-guests" eyebrow="अतिथि" title="विशिष्ट अतिथि">
        <GuestList guests={distinguishedGuests} title="विशिष्ट अतिथि" />
      </PageSection>
      <InformationSection />
    </>
  );
}

function InviteSection() {
  return (
    <section id="invite" tabIndex={-1} className="band-top px-5 pb-10 text-center outline-none">
      <p className="font-display text-base text-primary">सप्रेम आमंत्रण</p>
      <OrnamentalDivider />
      <h1 className="text-[1.9rem] leading-[1.5] text-primary">{katha.title}</h1>
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

      <ul className="space-y-3 text-sm text-foreground">
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

      <div className="mt-10">
        <h2 className="text-[1.45rem] leading-[1.5] text-foreground">
          भक्ति, कथा और तीर्थ-दर्शन का पावन संगम
        </h2>
        <p className="mt-3 text-base leading-8 text-muted-foreground">
          {katha.organizers} के तत्वावधान में आयोजित इस दस दिवसीय यात्रा में श्रीमद् भागवत कथा एवं
          जगन्नाथपुरी और गंगासागर तीर्थ क्षेत्र के दर्शनीय स्थलों का लाभ मिलेगा।
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        <div className="royal-card px-5 py-6" data-reveal="zoom">
          <p className="text-sm text-muted-foreground">प्रति यात्री मूल किराया</p>
          <p className="mt-1 font-display text-3xl leading-[1.4] text-primary">
            {formatRupees(katha.farePerTraveler)}
          </p>
        </div>
        <div className="royal-card px-5 py-6" data-reveal="zoom" style={cssVars({ "--d": "120ms" })}>
          <p className="text-sm text-muted-foreground">प्रति जोड़ा मूल किराया</p>
          <p className="mt-1 font-display text-3xl leading-[1.4] text-primary">
            {formatRupees(katha.farePerCouple)}
          </p>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-3">
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

function KathaSection() {
  return (
    <PageSection id="katha" eyebrow="कथा" title="कथा विवरण">
      <DetailList
        items={[
          { label: "कथा", value: katha.title },
          {
            label: "कथा व्यास",
            value: `${katha.speaker}, ${katha.speakerAffiliation}`,
          },
          { label: "तिथि", value: `${katha.startDate} – ${katha.endDate} (${katha.durationDays} दिवसीय यात्रा)` },
          { label: "स्थान", value: katha.location },
          { label: "आयोजक", value: katha.organizers },
          { label: "यात्रा मार्ग", value: journeyNote },
        ]}
      />
    </PageSection>
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
          {
            label: "पर्सनल (अलग) कमरा",
            value: `${formatRupees(accommodation.personalRoomSurcharge)} प्रति यात्री अतिरिक्त शुल्क`,
          },
          { label: "कोलकाता में विश्राम", value: accommodation.kolkataStay },
          {
            label: "ट्रेन किराया",
            value: (
              <>
                <span className="block">{accommodation.trainFare}</span>
                <span className="mt-3 block">
                  <ChipList items={accommodation.trainClasses} />
                </span>
              </>
            ),
          },
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

function GuestList({ guests, title }: { guests: readonly GuestProfile[]; title: string }) {
  if (guests.length === 0) {
    return (
      <EmptyDetails
        title={title}
        description="अतिथियों का विवरण उपलब्ध होने पर यहां जोड़ा जाएगा।"
      />
    );
  }

  return (
    <ul className="grid gap-4">
      {guests.map((guest) => (
        <li key={guest.name} className="royal-card p-5 text-center">
          {guest.image ? (
            <img
              src={guest.image}
              alt={guest.name}
              className="mx-auto mb-4 h-40 w-32 border border-secondary object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : null}
          <p className="font-display text-xl leading-[1.5] text-foreground">{guest.name}</p>
          {guest.title ? <p className="mt-1 text-sm text-muted-foreground">{guest.title}</p> : null}
        </li>
      ))}
    </ul>
  );
}

function PhoneLink({ name, phone }: { name: string; phone: string }) {
  return (
    <a
      href={`tel:${phone}`}
      className="flex min-h-12 items-center justify-between gap-3 border-b border-border px-5 py-2 last:border-b-0"
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
      <div className="mt-4 space-y-4">
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
          <ul className="grid gap-3">
            {videos.map((video) => (
              <li key={video.url}>
                <a
                  href={video.url}
                  target="_blank"
                  rel="noreferrer"
                  className="royal-card block overflow-hidden"
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
