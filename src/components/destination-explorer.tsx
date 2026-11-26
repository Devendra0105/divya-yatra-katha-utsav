import { useMemo, useState } from "react";
import { ArrowUpRight, ImageOff, MapPinned } from "lucide-react";

import lotusMandala from "@/assets/divya-yatra/lotus-mandala.jpg.asset.json";
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
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-8 flex flex-wrap gap-2" aria-label="क्षेत्र अनुसार स्थल छांटें">
          {regions.map((region) => (
            <Button
              key={region}
              aria-pressed={activeRegion === region}
              onClick={() => setActiveRegion(region)}
              size="sm"
              variant={activeRegion === region ? "default" : "outline"}
            >
              {region}
            </Button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visibleDestinations.map((destination) => (
            <DestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </div>
    </section>
  );
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <Dialog>
      <article className="group overflow-hidden border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
        <DialogTrigger asChild>
          <Button
            aria-label={`${destination.title} का विवरण खोलें`}
            className="h-auto w-full flex-col items-stretch rounded-none p-0 text-left whitespace-normal hover:bg-transparent"
            variant="ghost"
          >
            <DestinationImage destination={destination} className="aspect-[4/3]" />
            <span className="block px-5 pb-5 pt-4">
              <span className="block text-xs font-semibold text-primary">{destination.location}</span>
              <span className="mt-1 block font-display text-xl leading-snug text-foreground">
                {destination.title}
              </span>
              <span className="mt-4 inline-flex items-center gap-2 text-sm text-primary">
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
        src={lotusMandala.url}
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
    <DialogContent className="max-h-[92svh] w-[calc(100vw-1rem)] max-w-5xl gap-0 overflow-y-auto rounded-sm border-secondary p-0 sm:w-[calc(100vw-2rem)]">
      <div className="grid md:grid-cols-[1.05fr_0.95fr]">
        <div className="min-h-64 bg-muted md:min-h-[34rem]">
          <DestinationImage destination={destination} className="h-full min-h-64 object-cover md:min-h-[34rem]" />
        </div>
        <div className="p-6 sm:p-8">
          <DialogHeader className="text-left">
            <p className="text-sm font-semibold text-primary">{destination.location}</p>
            <DialogTitle className="font-display text-2xl leading-tight sm:text-3xl">
              {destination.title}
            </DialogTitle>
            <DialogDescription className="pt-2 text-sm leading-7">
              {destination.verifiedNote ??
                "यह स्थल यात्रा-विवरणिका की दर्शन-सूची में शामिल है। इसके बारे में अतिरिक्त ऐतिहासिक विवरण उपलब्ध नहीं कराया गया है।"}
            </DialogDescription>
          </DialogHeader>

          <div className="mt-6 border-y border-border py-4">
            <p className="text-xs font-semibold text-muted-foreground">स्थान</p>
            <p className="mt-1 text-sm text-foreground">{destination.location}</p>
          </div>

          <Button asChild className="mt-6 w-full sm:w-auto">
            <a href={mapUrl} target="_blank" rel="noreferrer">
              <MapPinned aria-hidden="true" />
              Google Maps पर मार्ग
            </a>
          </Button>

          <div className="mt-8">
            <h3 className="font-display text-lg text-foreground">यात्रा के अन्य दर्शन</h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
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
      </div>
    </DialogContent>
  );
}