import { useMemo, useState } from "react";
import { ArrowUpRight, ImageOff, MapPinned } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { destinations, type Destination } from "@/data/destinations";

const allRegions = "सभी";

export function DestinationExplorer() {
  const [activeRegion, setActiveRegion] = useState(allRegions);
  const regions = useMemo(
    () => [allRegions, ...new Set(destinations.map((destination) => destination.region))],
    [],
  );
  const visibleDestinations =
    activeRegion === allRegions
      ? destinations
      : destinations.filter((destination) => destination.region === activeRegion);

  return (
    <div>
      <div
        className="mb-6 flex flex-wrap justify-center gap-2"
        aria-label="क्षेत्र अनुसार स्थल छांटें"
      >
        {regions.map((region) => (
          <Button
            key={region}
            aria-pressed={activeRegion === region}
            className="min-h-11 px-4 text-sm"
            onClick={() => setActiveRegion(region)}
            size="sm"
            variant={activeRegion === region ? "default" : "outline"}
          >
            {region}
          </Button>
        ))}
      </div>

      <div className="grid gap-5">
        {visibleDestinations.map((destination) => (
          <DestinationCard key={destination.id} destination={destination} />
        ))}
      </div>
    </div>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Dialog>
      <article className="overflow-hidden border border-secondary/60 bg-card/80 shadow-sm">
        <DialogTrigger asChild>
          <Button
            aria-label={`${destination.title} का विवरण खोलें`}
            className="h-auto w-full flex-col items-stretch rounded-none p-0 text-left whitespace-normal hover:bg-transparent"
            variant="ghost"
          >
            <DestinationImage destination={destination} className="aspect-[4/3]" />
            <span className="block px-5 pb-5 pt-4 text-left">
              <span className="block text-xs text-primary">{destination.location}</span>
              <span className="mt-1 block font-display text-xl leading-[1.5] text-foreground">
                {destination.title}
              </span>
              <span className="mt-3 inline-flex items-center gap-2 text-sm text-primary">
                दर्शन विवरण <ArrowUpRight aria-hidden="true" className="size-4" />
              </span>
            </span>
          </Button>
        </DialogTrigger>
      </article>
      <DestinationDialog destination={destination} />
    </Dialog>
  );
}

function DestinationImage({ destination, className = "" }: { destination: Destination; className?: string }) {
  if (destination.image) {
    return (
      <img
        src={destination.image}
        alt={destination.title}
        loading="lazy"
        decoding="async"
        className={`block w-full object-cover ${className}`}
      />
    );
  }

  return (
    <span
      className={`relative flex w-full flex-col items-center justify-center gap-2 overflow-hidden bg-muted text-muted-foreground ${className}`}
      role="img"
      aria-label={`${destination.title} का फोटो उपलब्ध नहीं है`}
    >
      <img
        src="/background.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover opacity-30"
        loading="lazy"
        decoding="async"
      />
      <ImageOff aria-hidden="true" className="relative size-7" />
      <span className="relative text-xs">फोटो उपलब्ध होने पर जोड़ा जाएगा</span>
    </span>
  );
}

function DestinationDialog({ destination }: { destination: Destination }) {
  const related = destinations
    .filter((item) => item.id !== destination.id && item.region === destination.region && item.image)
    .slice(0, 3);
  const otherTravelViews = related.length
    ? related
    : destinations.filter((item) => item.id !== destination.id && item.image).slice(0, 3);
  const mapUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(destination.englishName)}`;

  return (
    <DialogContent className="max-h-[90svh] w-[calc(100vw-1.5rem)] max-w-[26rem] gap-0 overflow-y-auto rounded-sm border-secondary p-0">
      <div className="bg-muted">
        <DestinationImage destination={destination} className="h-full min-h-52 object-cover" />
      </div>
      <div className="p-5">
        <DialogHeader className="text-left">
          <p className="text-sm text-primary">{destination.location}</p>
          <DialogTitle className="font-display text-2xl font-normal leading-[1.5] tracking-normal">
            {destination.title}
          </DialogTitle>
          <DialogDescription className="pt-2 text-sm leading-7">
            {destination.verifiedNote ??
              "यह स्थल यात्रा-विवरणिका की दर्शन-सूची में शामिल है। इसके बारे में अतिरिक्त ऐतिहासिक विवरण उपलब्ध नहीं कराया गया है।"}
          </DialogDescription>
        </DialogHeader>

        <div className="mt-5 border-y border-border py-4">
          <p className="text-xs text-muted-foreground">स्थान</p>
          <p className="mt-1 text-sm text-foreground">{destination.location}</p>
        </div>

        <Button asChild className="mt-5 h-auto min-h-12 w-full whitespace-normal py-2">
          <a href={mapUrl} target="_blank" rel="noreferrer">
            <MapPinned aria-hidden="true" />
            Google Maps पर मार्ग
          </a>
        </Button>

        <div className="mt-7">
          <h3 className="text-lg leading-[1.5] text-foreground">यात्रा के अन्य दर्शन</h3>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {otherTravelViews.map((item) => (
              <figure key={item.id} className="min-w-0">
                {item.image ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="aspect-[4/3] w-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <figcaption className="mt-1 text-xs leading-5 text-muted-foreground">
                  {item.title}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </DialogContent>
  );
}
